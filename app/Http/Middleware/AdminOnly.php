<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminOnly
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // التحقق من أن المستخدم مسجل دخول
        if (!auth()->check()) {
            return redirect()->route('login');
        }

        // التحقق من أن المستخدم مدير
        if (auth()->user()->user_type !== 'admin') {
            abort(403, 'غير مصرح لك بالوصول إلى هذه الصفحة. هذه الصفحة للمدراء فقط.');
        }

        return $next($request);
    }
}

