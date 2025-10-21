<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class DriverOnly
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!auth()->check()) {
            if ($request->expectsJson()) {
                return response()->json(['message' => 'غير مصرح'], 401);
            }
            return redirect()->route('login');
        }

        if (auth()->user()->user_type !== 'driver') {
            if ($request->expectsJson()) {
                return response()->json(['message' => 'هذه الصفحة مخصصة للسائقين فقط.'], 403);
            }
            abort(403, 'هذه الصفحة مخصصة للسائقين فقط.');
        }

        return $next($request);
    }
}

