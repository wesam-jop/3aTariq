<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class DriverApproved
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!auth()->check()) {
            return redirect()->route('login');
        }

        $driver = auth()->user()->driver;

        if (!$driver) {
            abort(403, 'المستخدم ليس سائقاً');
        }

        // إذا كان السائق غير موافق عليه، إعادة توجيهه لصفحة الانتظار
        if (!$driver->is_verified) {
            return redirect()->route('driver.pending');
        }

        return $next($request);
    }
}

