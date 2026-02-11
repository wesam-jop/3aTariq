<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function showLogin()
    {
        return Inertia::render('Auth/Login');
    }

    public function login(Request $request)
    {
        $request->validate([
            'identifier' => 'required',
            'password' => 'required',
        ]);

        $field = filter_var($request->identifier, FILTER_VALIDATE_EMAIL) ? 'email' : 'phone';

        if (Auth::attempt([$field => $request->identifier, 'password' => $request->password], $request->boolean('remember'))) {
            $request->session()->regenerate();
            
            $user = Auth::user();
            
            // Redirect based on user role
            switch ($user->role) {
                case 'admin':
                    return redirect()->route('admin.dashboard');
                case 'driver':
                    return redirect()->route('driver.dashboard');
                case 'customer':
                default:
                    return redirect()->route('customer.dashboard');
            }
        }

        return back()->withErrors([
            'identifier' => 'بيانات الدخول غير صحيحة.',
        ])->onlyInput('identifier');
    }

    public function showRegister()
    {
        return Inertia::render('Auth/Register');
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|in:customer,driver',
            'phone' => 'required|string|max:20',
        ]);


        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'phone' => $request->phone,
        ]);

        Auth::login($user);

        // Redirect based on user role
        switch ($user->role) {
            case 'driver':
                return redirect()->route('driver.dashboard');
            case 'customer':
            default:
                return redirect()->route('customer.dashboard');
        }
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        
        return redirect()->route('login');
    }

    // OTP Methods adapted for Web (Session) Auth
    public function sendOtp(Request $request)
    {
        $request->validate([
            'phone' => 'required|string|max:15',
        ]);

        $phone = $request->phone;
        $otp = 123456; // Fixed OTP for testing

        // Delete old OTPs for this phone
        \App\Models\OtpVerification::where('phone', $phone)->delete();

        // Create new OTP
        \App\Models\OtpVerification::create([
            'phone' => $phone,
            'otp_code' => $otp,
            'expires_at' => \Carbon\Carbon::now()->addMinutes(5)
        ]);

        return response()->json([
            'success' => true,
            'message' => 'OTP sent successfully',
            'otp' => $otp // Remove for production
        ]);
    }

    public function sendLoginOtp(Request $request)
    {
        $request->validate([
            'phone' => 'required|string|max:15',
        ]);

        $user = User::where('phone', $request->phone)->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'رقم الهاتف غير مسجل لدينا. يرجى إنشاء حساب جديد.'
            ], 404);
        }

        $phone = $request->phone;
        $otp = 123456; // Fixed OTP for testing

        // Delete old OTPs for this phone
        \App\Models\OtpVerification::where('phone', $phone)->delete();

        // Create new OTP
        \App\Models\OtpVerification::create([
            'phone' => $phone,
            'otp_code' => $otp,
            'expires_at' => \Carbon\Carbon::now()->addMinutes(5)
        ]);

        return response()->json([
            'success' => true,
            'message' => 'OTP sent successfully',
            'otp' => $otp // Remove for production
        ]);
    }

    public function verifyOtp(Request $request)
    {
        try {
            $request->validate([
                'phone' => 'required|string|max:15',
                'otp' => 'required|string|size:6',
                'name' => 'required|string|max:255',
                'user_type' => 'required|in:customer,driver',
                'governorate_id' => 'nullable|exists:governorates,id',
                'region_id' => 'nullable|exists:regions,id',
                'transport_type' => 'nullable|in:internal,external',
                'national_id' => 'nullable|string|max:255',
                'identity_image' => 'nullable',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'بيانات غير صحيحة: ' . implode(', ', $e->errors()),
                'errors' => $e->errors()
            ], 422);
        }


        try {
            $otpVerification = \App\Models\OtpVerification::where('phone', $request->phone)
                ->where('otp_code', $request->otp)
                ->where('expires_at', '>', \Carbon\Carbon::now())
                ->where('is_verified', false)
                ->first();

            if (!$otpVerification) {
                return response()->json([
                    'success' => false,
                    'message' => 'رمز التحقق غير صحيح أو منتهي الصلاحية'
                ], 400);
            }

            $otpVerification->update(['is_verified' => true]);

            $user = User::where('phone', $request->phone)->first();

            if (!$user) {
                $email = $request->phone . '@3atariq.com';
                
                // Check if email already exists (safety against data corruption/collisions)
                $existingByEmail = User::where('email', $email)->first();
                if ($existingByEmail) {
                    $user = $existingByEmail;
                    $user->update([
                        'phone' => $request->phone, // Sync phone if it was different
                        'name' => $request->name,
                        'role' => $request->user_type,
                    ]);
                } else {
                    $userData = [
                        'name' => $request->name,
                        'phone' => $request->phone,
                        'role' => $request->user_type,
                        'email' => $email,
                        'password' => Hash::make(Str::random(16)),
                    ];
                    
                    // Handle location fields for both drivers and customers
                    $governorateName = null;
                    $regionName = null;
                    
                    if ($request->governorate_id) {
                        $governorate = \App\Models\Governorate::find($request->governorate_id);
                        $governorateName = $governorate ? $governorate->name : null;
                    }
                    
                    if ($request->region_id) {
                        $region = \App\Models\Region::find($request->region_id);
                        $regionName = $region ? $region->name : null;
                    }
                    
                    $userData = array_merge($userData, [
                        'governorate' => $governorateName,
                        'region' => $regionName,
                        'governorate_id' => $request->governorate_id ?? null,
                        'region_id' => $request->region_id ?? null,
                    ]);
                    
                    // Add driver-specific fields if user is registering as driver
                    if ($request->user_type === 'driver') {
                        $driverData = [
                            'transport_type' => $request->transport_type ?? null,
                            'national_id' => $request->national_id ?? null,
                            'is_approved' => false, // Drivers need approval
                        ];
                        
                        // Handle identity image upload
                        if ($request->hasFile('identity_image')) {
                            $path = $request->file('identity_image')->store('identity_images', 'public');
                            $driverData['identity_image'] = $path;
                        }
                        
                        $userData = array_merge($userData, $driverData);
                    }
                    
                    $user = User::create($userData);
                }
            } else {
                $user->update([
                    'name' => $request->name,
                    'role' => $request->user_type,
                ]);
            }

            Auth::login($user, true);
            $request->session()->regenerate();

            return response()->json([
                'success' => true,
                'message' => 'تم التسجيل بنجاح',
                'user' => $user,
                'redirect' => route('dashboard')
            ]);
        } catch (\Exception $e) {
            Log::error('OTP Verification Error: ' . $e->getMessage(), [
                'request_data' => $request->all(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'حدث خطأ أثناء معالجة الطلب: ' . $e->getMessage()
            ], 500);
        }
    }

    public function verifyLoginOtp(Request $request)
    {
        $request->validate([
            'phone' => 'required|string|max:15',
            'otp' => 'required|string|size:6',
        ]);

        $otpVerification = \App\Models\OtpVerification::where('phone', $request->phone)
            ->where('otp_code', $request->otp)
            ->where('expires_at', '>', \Carbon\Carbon::now())
            ->where('is_verified', false)
            ->first();

        if (!$otpVerification) {
            return response()->json([
                'success' => false,
                'message' => 'رمز التحقق غير صحيح أو منتهي الصلاحية'
            ], 400);
        }

        $otpVerification->update(['is_verified' => true]);

        $user = User::where('phone', $request->phone)->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'المستخدم غير موجود'
            ], 404);
        }

        Auth::login($user, true);
        $request->session()->regenerate();

        return response()->json([
            'success' => true,
            'message' => 'تم تسجيل الدخول بنجاح',
            'user' => $user,
            'redirect' => route('dashboard')
        ]);
    }
}