<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Customer\CustomerController;
use App\Http\Controllers\Driver\DriverController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public routes
Route::get('/', function () {
    return Inertia::render('Welcome');
});

// Test route
Route::get('/test', function () {
    return Inertia::render('Welcome');
});

// Auth routes
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
    Route::post('/register', [AuthController::class, 'register']);
});

Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

// Protected routes
Route::middleware('auth')->group(function () {
    // Admin routes
    Route::prefix('admin')->middleware('role:admin')->group(function () {
        Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    });

    // Customer routes
    Route::prefix('customer')->middleware('role:customer')->group(function () {
        Route::get('/dashboard', [CustomerController::class, 'dashboard'])->name('customer.dashboard');
    });

    // Driver routes
    Route::prefix('driver')->middleware('role:driver')->group(function () {
        Route::get('/dashboard', [DriverController::class, 'dashboard'])->name('driver.dashboard');
    });
});
