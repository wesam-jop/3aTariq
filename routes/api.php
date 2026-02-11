<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\TripController;
use App\Http\Controllers\Api\ChatController;
use App\Http\Controllers\Api\DashboardController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public routes
Route::post('/send-otp', [AuthController::class, 'sendOtp']);
Route::post('/verify-otp', [AuthController::class, 'verifyOtp']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/verify-login-otp', [AuthController::class, 'verifyLoginOtp']);

// Governorate and Region routes - Public access
Route::get('/governorates', function() {
    return App\Models\Governorate::with('regions')->get();
});
Route::get('/governorates/{id}/regions', function($id) {
    return App\Models\Region::where('governorate_id', $id)->get();
});

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth routes
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/profile', [AuthController::class, 'profile']);
    
    // Dashboard routes
    Route::get('/dashboard', [DashboardController::class, 'index']);
    
    // Order routes
    Route::apiResource('orders', OrderController::class);
    Route::post('/orders/{order}/accept', [OrderController::class, 'accept']);
    Route::post('/orders/{order}/complete', [OrderController::class, 'complete']);
    Route::post('/orders/{order}/cancel', [OrderController::class, 'cancel']);
    
    // Trip routes
    Route::apiResource('trips', TripController::class);
    Route::post('/trips/{trip}/book', [TripController::class, 'book']);
    Route::post('/trips/{trip}/cancel-booking', [TripController::class, 'cancelBooking']);
    
    // Chat routes
    Route::apiResource('chats', ChatController::class);
    Route::get('/chats/{chat}/messages', [ChatController::class, 'messages']);
    Route::post('/chats/{chat}/messages', [ChatController::class, 'sendMessage']);
    Route::post('/chats/{chat}/mark-read', [ChatController::class, 'markAsRead']);
});
