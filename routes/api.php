<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CityController;
use App\Http\Controllers\Api\RouteController;
use App\Http\Controllers\Api\RideController;
use App\Http\Controllers\Api\PackageController;
use App\Http\Controllers\Api\DriverController;

// مسارات المصادقة (بدون حماية)
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/verify-otp', [AuthController::class, 'verifyOtp']);
});

// مسارات محمية بـ Sanctum
Route::middleware('auth:sanctum')->group(function () {
    
    // معلومات المستخدم
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    
    // المدن والمسارات (عامة للجميع)
    Route::apiResource('cities', CityController::class)->only(['index', 'show']);
    Route::apiResource('routes', RouteController::class)->only(['index', 'show']);
    
    // مسارات العملاء
    Route::prefix('customer')->group(function () {
        Route::apiResource('rides', RideController::class);
        Route::apiResource('packages', PackageController::class);
        Route::post('rides/{ride}/cancel', [RideController::class, 'cancel']);
        Route::post('rides/{ride}/rate', [RideController::class, 'rate']);
    });
    
    // مسارات السائقين
    Route::prefix('driver')->middleware('driver.only')->group(function () {
        Route::get('/dashboard', [DriverController::class, 'getDashboardData']);
        Route::post('/update-status', [DriverController::class, 'updateStatus']);
        Route::get('/available-rides', [DriverController::class, 'availableRides']);
        Route::get('/available-packages', [DriverController::class, 'availablePackages']);
        Route::post('/rides/{ride}/accept', [DriverController::class, 'acceptRide']);
        Route::post('/rides/{ride}/complete', [DriverController::class, 'completeRide']);
        Route::post('/packages/{package}/accept', [DriverController::class, 'acceptPackage']);
        Route::post('/packages/{package}/complete', [DriverController::class, 'completePackage']);
        Route::get('/earnings', [DriverController::class, 'earnings']);
    });
});

