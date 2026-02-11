<?php

namespace App\Http\Controllers\Driver;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Trip;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class DriverController extends Controller
{
    public function dashboard()
    {
        /** @var \Illuminate\Contracts\Auth\Guard|\Illuminate\Contracts\Auth\StatefulGuard $auth */
        $auth = auth();
        /** @var User|null $user */
        $user = $auth->user();
        
        if (!$user) {
            return redirect()->route('login');
        }
        
        $trips = Trip::where('driver_id', $user->id)
            ->with(['driver'])
            ->latest()
            ->take(5)
            ->get();

        $orders = Order::where('driver_id', $user->id)
            ->with(['customer', 'driver'])
            ->latest()
            ->take(5)
            ->get();

        // Calculate Stats
        $stats = [
            'total_earnings' => Order::where('driver_id', $user->id)->where('status', 'completed')->sum('price') + 
                               Trip::where('driver_id', $user->id)->where('status', 'completed')->sum(DB::raw('price_per_seat * booked_seats')),
            'completed_orders' => Order::where('driver_id', $user->id)->where('status', 'completed')->count(),
            'active_orders' => Order::where('driver_id', $user->id)->whereIn('status', ['assigned', 'in_progress'])->count(),
            'completed_trips' => Trip::where('driver_id', $user->id)->where('status', 'completed')->count(),
        ];

        return Inertia::render('Driver/Dashboard', [
            'user' => $user,
            'trips' => $trips,
            'orders' => $orders,
            'stats' => $stats,
        ]);
    }

    public function settings()
    {
        /** @var User|null $user */
        $user = Auth::user();
        
        if (!$user) {
            return redirect()->route('login');
        }
        
        // Load relationships
        $user->load(['governorate', 'region']);
        
        // Load governorates with regions (same as admin locations)
        $governorates = \App\Models\Governorate::with('regions')->get();
        
        return Inertia::render('Driver/Settings/Index', [
            'user' => $user,
            'governorates' => $governorates,
        ]);
    }

    public function updateProfile(Request $request)
    {
        /** @var User|null $user */
        $user = Auth::user();
        
        if (!$user) {
            return redirect()->route('login');
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'governorate_id' => 'nullable|exists:governorates,id',
            'region_id' => 'nullable|exists:regions,id',
            'national_id' => 'nullable|string|max:255',
            'license_plate' => 'nullable|string|max:255',
            'car_type' => 'nullable|string|max:255',
            'car_model' => 'nullable|string|max:255',
            'transport_type' => 'nullable|in:internal,external',
        ]);

        $data = [
            'name' => $request->name,
            'national_id' => $request->national_id,
            'license_plate' => $request->license_plate,
            'car_type' => $request->car_type,
            'car_model' => $request->car_model,
            'transport_type' => $request->transport_type,
        ];

        // Handle location fields
        if ($request->filled('governorate_id')) {
            $governorate = \App\Models\Governorate::find($request->governorate_id);
            $data['governorate_id'] = $request->governorate_id;
            $data['governorate'] = $governorate ? $governorate->name : null;
        }
        
        if ($request->filled('region_id')) {
            $region = \App\Models\Region::find($request->region_id);
            $data['region_id'] = $request->region_id;
            $data['region'] = $region ? $region->name : null;
        }

        if ($request->hasFile('avatar')) {
            // Delete old avatar if exists
            if ($user->avatar) {
                Storage::disk('public')->delete($user->avatar);
            }
            $path = $request->file('avatar')->store('avatars', 'public');
            $data['avatar'] = $path;
        }

        $user->update($data);

        return back()->with('message', 'تم تحديث الملف الشخصي بنجاح');
    }

    public function sendSettingsOtp(Request $request)
    {
        $request->validate([
            'phone' => 'required|string|max:15',
            'type' => 'required|in:change_phone,delete_account'
        ]);

        $otp = 123456; // Fixed for testing as per AuthController

        \App\Models\OtpVerification::create([
            'phone' => $request->phone,
            'otp_code' => $otp,
            'expires_at' => \Carbon\Carbon::now()->addMinutes(10)
        ]);

        return response()->json([
            'success' => true,
            'message' => 'تم إرسال رمز التحقق',
            'otp' => $otp // Remove for production
        ]);
    }

    public function verifyPhoneChange(Request $request)
    {
        $request->validate([
            'phone' => 'required|string|max:15',
            'otp' => 'required|string|size:6'
        ]);

        $verification = \App\Models\OtpVerification::where('phone', $request->phone)
            ->where('otp_code', $request->otp)
            ->where('expires_at', '>', \Carbon\Carbon::now())
            ->where('is_verified', false)
            ->first();

        if (!$verification) {
            return back()->withErrors(['otp' => 'رمز التحقق غير صحيح']);
        }

        $verification->update(['is_verified' => true]);
        
        /** @var \App\Models\User|null $user */
        $user = Auth::user();
        
        if (!$user) {
            return redirect()->route('login');
        }
        
        $user->update([
            'phone' => $request->phone
        ]);

        return back()->with('message', 'تم تغيير رقم الهاتف بنجاح');
    }

    public function destroy(Request $request)
    {
        $request->validate([
            'otp' => 'required|string|size:6'
        ]);

        /** @var \App\Models\User|null $user */
        $user = Auth::user();
        
        if (!$user) {
            return redirect()->route('login');
        }

        $verification = \App\Models\OtpVerification::where('phone', $user->phone)
            ->where('otp_code', $request->otp)
            ->where('expires_at', '>', \Carbon\Carbon::now())
            ->where('is_verified', false)
            ->first();

        if (!$verification) {
            return back()->withErrors(['otp' => 'رمز التحقق غير صحيح']);
        }

        $verification->update(['is_verified' => true]);
        Auth::logout();
        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/')->with('message', 'تم حذف الحساب بنجاح');
    }
}
