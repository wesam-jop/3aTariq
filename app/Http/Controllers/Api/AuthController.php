<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\OtpVerification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Carbon\Carbon;

class AuthController extends Controller
{
    public function sendOtp(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'phone' => 'required|string|max:15',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $phone = $request->phone;
        $otp = rand(100000, 999999);

        // Delete old OTPs for this phone
        OtpVerification::where('phone', $phone)->delete();

        // Create new OTP
        OtpVerification::create([
            'phone' => $phone,
            'otp_code' => $otp,
            'expires_at' => Carbon::now()->addMinutes(5)
        ]);

        // Here you would send SMS with OTP
        // For now, we'll just return it in response for testing
        return response()->json([
            'success' => true,
            'message' => 'OTP sent successfully',
            'otp' => $otp // Remove this in production
        ]);
    }

    public function verifyOtp(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'phone' => 'required|string|max:15',
            'otp' => 'required|string|size:6',
            'name' => 'required|string|max:255',
            'user_type' => 'required|in:customer,driver,admin',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $otpVerification = OtpVerification::where('phone', $request->phone)
            ->where('otp_code', $request->otp)
            ->where('expires_at', '>', Carbon::now())
            ->where('is_verified', false)
            ->first();

        if (!$otpVerification) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid or expired OTP'
            ], 400);
        }

        // Mark OTP as verified
        $otpVerification->update(['is_verified' => true]);

        // Check if user exists
        $user = User::where('phone', $request->phone)->first();

        if (!$user) {
            // Create new user
            $user = User::create([
                'name' => $request->name,
                'phone' => $request->phone,
                'user_type' => $request->user_type,
                'is_verified' => true,
                'phone_verified_at' => Carbon::now(),
            ]);
        } else {
            // Update existing user
            $user->update([
                'name' => $request->name,
                'user_type' => $request->user_type,
                'is_verified' => true,
                'phone_verified_at' => Carbon::now(),
            ]);
        }

        // Create token
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'User registered successfully',
            'user' => $user,
            'token' => $token
        ]);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'phone' => 'required|string|max:15',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = User::where('phone', $request->phone)->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ], 404);
        }

        // Send OTP for login
        $otp = rand(100000, 999999);

        // Delete old OTPs for this phone
        OtpVerification::where('phone', $request->phone)->delete();

        // Create new OTP
        OtpVerification::create([
            'phone' => $request->phone,
            'otp_code' => $otp,
            'expires_at' => Carbon::now()->addMinutes(5)
        ]);

        return response()->json([
            'success' => true,
            'message' => 'OTP sent for login',
            'otp' => $otp // Remove this in production
        ]);
    }

    public function verifyLoginOtp(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'phone' => 'required|string|max:15',
            'otp' => 'required|string|size:6',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $otpVerification = OtpVerification::where('phone', $request->phone)
            ->where('otp_code', $request->otp)
            ->where('expires_at', '>', Carbon::now())
            ->where('is_verified', false)
            ->first();

        if (!$otpVerification) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid or expired OTP'
            ], 400);
        }

        // Mark OTP as verified
        $otpVerification->update(['is_verified' => true]);

        $user = User::where('phone', $request->phone)->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ], 404);
        }

        // Create token
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Login successful',
            'user' => $user,
            'token' => $token
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Logged out successfully'
        ]);
    }

    public function profile(Request $request)
    {
        return response()->json([
            'success' => true,
            'user' => $request->user()
        ]);
    }
}
