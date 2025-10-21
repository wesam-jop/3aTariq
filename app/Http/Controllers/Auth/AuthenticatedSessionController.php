<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthenticatedSessionController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'phone' => 'required|string',
            'password' => 'required|string',
        ]);

        if (!Auth::attempt($request->only('phone', 'password'), $request->boolean('remember'))) {
            throw ValidationException::withMessages([
                'phone' => __('auth.failed'),
            ]);
        }

        $request->session()->regenerate();

        return redirect()->intended(
            $request->user()->isDriver() ? '/driver/dashboard' : '/customer/dashboard'
        );
    }

    public function destroy(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}

