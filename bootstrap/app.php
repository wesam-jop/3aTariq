<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
        ]);
        
        $middleware->alias([
            'role' => \App\Http\Middleware\RoleMiddleware::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->respond(function (\Symfony\Component\HttpFoundation\Response $response) {
            if ($response->getStatusCode() === 403) {
                return \Inertia\Inertia::render('Error403')->toResponse(request());
            }
            
            if ($response->getStatusCode() === 404) {
                return \Inertia\Inertia::render('Error404')->toResponse(request());
            }
            
            if ($response->getStatusCode() === 500) {
                return \Inertia\Inertia::render('Error500')->toResponse(request());
            }
            
            if ($response->getStatusCode() === 503) {
                return \Inertia\Inertia::render('Error503')->toResponse(request());
            }
            
            return $response;
        });
    })->create();
