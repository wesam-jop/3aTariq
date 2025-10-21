<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\OtpCode;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|unique:users,phone',
            'password' => 'required|string|min:8|confirmed',
            'user_type' => 'required|in:customer,driver',
        ]);

        $user = User::create([
            'name' => $request->name,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
            'user_type' => $request->user_type,
        ]);

        // إنشاء كود OTP
        $otp = OtpCode::generate($request->phone);

        // TODO: إرسال الكود عبر SMS (المرحلة الثانية)
        
        return response()->json([
            'message' => 'تم التسجيل بنجاح. يرجى التحقق من رقم الهاتف.',
            'user' => $user,
            'otp_code' => $otp->code, // للاختبار فقط - يجب إزالته في الإنتاج
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'phone' => 'required|string',
            'password' => 'required|string',
        ]);

        $user = User::where('phone', $request->phone)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'phone' => ['بيانات الدخول غير صحيحة.'],
            ]);
        }

        if (!$user->is_active) {
            throw ValidationException::withMessages([
                'phone' => ['حسابك غير نشط. يرجى التواصل مع الإدارة.'],
            ]);
        }

        // إنشاء token
        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'message' => 'تم تسجيل الدخول بنجاح',
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function verifyOtp(Request $request)
    {
        $request->validate([
            'phone' => 'required|string',
            'code' => 'required|string|size:6',
        ]);

        $otp = OtpCode::where('phone', $request->phone)
            ->where('is_verified', false)
            ->latest()
            ->first();

        if (!$otp) {
            return response()->json([
                'message' => 'لم يتم العثور على كود التحقق'
            ], 404);
        }

        if ($otp->isExpired()) {
            return response()->json([
                'message' => 'انتهت صلاحية الكود'
            ], 400);
        }

        if (!$otp->verify($request->code)) {
            return response()->json([
                'message' => 'الكود غير صحيح'
            ], 400);
        }

        // تحديث حالة المستخدم
        $user = User::where('phone', $request->phone)->first();
        $user->update(['phone_verified_at' => now()]);

        // إنشاء token
        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'message' => 'تم التحقق بنجاح',
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'تم تسجيل الخروج بنجاح'
        ]);
    }
}

