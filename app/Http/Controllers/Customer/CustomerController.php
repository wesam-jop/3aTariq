<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Trip;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function dashboard()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        
        $orders = Order::where('customer_id', $user->id)
            ->with(['customer', 'driver'])
            ->latest()
            ->take(5)
            ->get();

        $activeOrdersCount = Order::where('customer_id', $user->id)
            ->whereIn('status', ['pending', 'accepted', 'in_progress'])
            ->count();

        $completedOrdersCount = Order::where('customer_id', $user->id)
            ->where('status', 'completed')
            ->count();
            
        $totalSpentOrders = Order::where('customer_id', $user->id)
            ->where('status', 'completed')
            ->sum('price');
            
        $bookings = \App\Models\TripBooking::where('customer_id', $user->id)
            ->with(['trip.driver'])
            ->latest()
            ->take(5)
            ->get();
            
        $totalSpentTrips = \App\Models\TripBooking::where('customer_id', $user->id)
            ->where('status', 'confirmed')
            ->sum('total_price');

        $availableTrips = Trip::where('status', 'active')
            ->where('departure_time', '>', now())
            ->with(['driver'])
            ->latest()
            ->take(6)
            ->get();

        return Inertia::render('Customer/Dashboard', [
            'user' => $user,
            'orders' => $orders,
            'bookings' => $bookings,
            'availableTrips' => $availableTrips,
            'stats' => [
                'active_orders' => $activeOrdersCount,
                'completed_orders' => $completedOrdersCount,
                'total_spent' => $totalSpentOrders + $totalSpentTrips,
                'trips_count' => \App\Models\TripBooking::where('customer_id', $user->id)->count()
            ]
        ]);
    }

    public function settings()
    {
        return Inertia::render('Customer/Settings');
    }

    public function updateProfile(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $request->validate([
            'name' => 'required|string|max:255',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'governorate_id' => 'nullable|exists:governorates,id',
            'region_id' => 'nullable|exists:regions,id',
        ]);

        $data = [
            'name' => $request->name,
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
            'otp' => $otp
        ]);
    }

    public function verifyPhoneChange(Request $request)
    {
        $request->validate([
            'phone' => 'required|string|max:15|unique:users,phone',
            'otp' => 'required|string|size:6'
        ]);

        $verification = \App\Models\OtpVerification::where('phone', $request->phone)
            ->where('otp_code', $request->otp)
            ->where('expires_at', '>', now())
            ->where('is_verified', false)
            ->first();

        if (!$verification) {
            return back()->withErrors(['otp' => 'رمز التحقق غير صحيح أو منتهي الصلاحية']);
        }

        $verification->update(['is_verified' => true]);
        
        /** @var \App\Models\User $user */
        $user = Auth::user();
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

        /** @var \App\Models\User $user */
        $user = Auth::user();

        $verification = \App\Models\OtpVerification::where('phone', $user->phone)
            ->where('otp_code', $request->otp)
            ->where('expires_at', '>', now())
            ->where('is_verified', false)
            ->first();

        if (!$verification) {
            return back()->withErrors(['otp' => 'رمز التحقق غير صحيح']);
        }

        Auth::logout();
        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/')->with('message', 'تم حذف الحساب بنجاح');
    }
}
