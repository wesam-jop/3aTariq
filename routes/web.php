<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Customer\CustomerController;
use App\Http\Controllers\Customer\OrderController;
use App\Http\Controllers\Customer\TripController;
use App\Http\Controllers\Driver\DriverController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public routes
Route::get('/', function () {
    $ordersCount = \App\Models\Order::count() + 15000; // Multiplier for marketing feel as requested
    $driversCount = \App\Models\User::where('role', 'driver')->count() + 800; // Multiplier for marketing feel
    
    return Inertia::render('Welcome', [
        'stats' => [
            'orders' => number_format($ordersCount / 1000, 1) . 'K',
            'drivers' => '+' . $driversCount,
            'cities' => '14',
            'rating' => '98%',
        ]
    ]);
})->name('home');

Route::get('/services', function () {
    return Inertia::render('Services');
})->name('services');

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

Route::get('/terms', function () {
    return Inertia::render('Terms');
})->name('terms');

Route::get('/privacy', function () {
    return Inertia::render('PrivacyPolicy');
})->name('privacy');

// Test route
Route::get('/test', function () {
    return Inertia::render('Welcome');
});

// Auth routes
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::get('/admin/login', function () {
        return Inertia::render('Admin/Login');
    })->name('admin.login');
    Route::post('/login', [AuthController::class, 'login']);

    Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
    Route::post('/register', [AuthController::class, 'register']);
    
    // OTP Routes (Web/Session based)
    Route::post('/send-otp', [AuthController::class, 'sendOtp']);
    Route::post('/send-login-otp', [AuthController::class, 'sendLoginOtp']);
    Route::post('/verify-otp', [AuthController::class, 'verifyOtp']);
    Route::post('/verify-login-otp', [AuthController::class, 'verifyLoginOtp']);
    
    // Governorate and Region routes for registration form
    Route::get('/governorates', function() {
        return App\Models\Governorate::with('regions')->get();
    })->name('governorates.index');
    
    Route::get('/governorates/{id}/regions', function($id) {
        return App\Models\Region::where('governorate_id', $id)->get();
    })->name('governorates.regions');
});

Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

// Protected routes
Route::middleware('auth')->group(function () {
    // Dashboard redirect
    Route::get('/dashboard', function () {
        $user = Auth::user();
        if ($user->role === 'admin') {
            return redirect()->route('admin.dashboard');
        } elseif ($user->role === 'driver') {
            return redirect()->route('driver.dashboard');
        }
        return redirect()->route('customer.dashboard');
    })->name('dashboard');

    // Admin routes
    Route::prefix('admin')->middleware('role:admin')->group(function () {
        Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
        Route::get('/users', [AdminController::class, 'usersIndex'])->name('admin.users.index');
        Route::post('/users', [AdminController::class, 'storeUser'])->name('admin.users.store');
        Route::post('/users/{user}/toggle', [AdminController::class, 'toggleUserStatus'])->name('admin.users.toggle');
        Route::post('/users/{user}/verify', [AdminController::class, 'verifyDriver'])->name('admin.users.verify');
        Route::get('/users/{user}/details', [AdminController::class, 'getUserDetails'])->name('admin.users.details');
        // Temporary debug route
        Route::get('/debug-user/{phone}', function($phone) {
            $user = \App\Models\User::where('phone', $phone)->first();
            if ($user) {
                return response()->json([
                    'user' => $user->toArray(),
                    'identity_image_exists' => !empty($user->identity_image),
                    'avatar_exists' => !empty($user->avatar),
                    'full_identity_path' => $user->identity_image ? storage_path('app/public/' . $user->identity_image) : null,
                    'full_avatar_path' => $user->avatar ? storage_path('app/public/' . $user->avatar) : null,
                    'identity_file_exists' => $user->identity_image ? file_exists(storage_path('app/public/' . $user->identity_image)) : false,
                    'avatar_file_exists' => $user->avatar ? file_exists(storage_path('app/public/' . $user->avatar)) : false,
                ]);
            }
            return response()->json(['error' => 'User not found'], 404);
        });
        
        // Orders management
        Route::get('/orders', [AdminController::class, 'ordersIndex'])->name('admin.orders.index');
        Route::post('/orders/{order}/approve', [AdminController::class, 'approveOrder'])->name('admin.orders.approve');

        // Location management
        Route::get('/locations', [AdminController::class, 'locationsIndex'])->name('admin.locations.index');
        Route::post('/governorates', [AdminController::class, 'storeGovernorate'])->name('admin.governorates.store');
        Route::delete('/governorates/{governorate}', [AdminController::class, 'deleteGovernorate'])->name('admin.governorates.delete');
        Route::post('/regions', [AdminController::class, 'storeRegion'])->name('admin.regions.store');
        Route::delete('/regions/{region}', [AdminController::class, 'deleteRegion'])->name('admin.regions.delete');


    });


    // Customer routes
    Route::prefix('customer')->middleware('role:customer')->group(function () {
        Route::get('/dashboard', [CustomerController::class, 'dashboard'])->name('customer.dashboard');
        
        // Orders
        Route::get('/orders', [OrderController::class, 'index'])->name('customer.orders.index');
        Route::get('/orders/create', [OrderController::class, 'create'])->name('customer.orders.create');
        Route::post('/orders', [OrderController::class, 'store'])->name('customer.orders.store');
        Route::post('/orders/{order}/cancel', [OrderController::class, 'cancel'])->name('customer.orders.cancel');
        Route::get('/orders/{order}', [OrderController::class, 'show'])->name('customer.orders.show');

        // Trips
        Route::get('/trips', [TripController::class, 'index'])->name('customer.trips.index');
        Route::get('/trips/{trip}', [TripController::class, 'show'])->name('customer.trips.show');
        Route::post('/trips/{trip}/book', [TripController::class, 'book'])->name('customer.trips.book');

        // Other
        Route::get('/settings', [CustomerController::class, 'settings'])->name('customer.settings');
        Route::post('/settings/profile', [CustomerController::class, 'updateProfile'])->name('customer.settings.profile');
        Route::post('/settings/send-otp', [CustomerController::class, 'sendSettingsOtp'])->name('customer.settings.send-otp');
        Route::post('/settings/verify-phone', [CustomerController::class, 'verifyPhoneChange'])->name('customer.settings.verify-phone');
        Route::delete('/settings', [CustomerController::class, 'destroy'])->name('customer.settings.destroy');

        // Saved Addresses
        Route::get('/saved-addresses', [\App\Http\Controllers\SavedAddressController::class, 'index'])->name('customer.saved-addresses.index');
        Route::post('/saved-addresses', [\App\Http\Controllers\SavedAddressController::class, 'store'])->name('customer.saved-addresses.store');
        Route::put('/saved-addresses/{savedAddress}', [\App\Http\Controllers\SavedAddressController::class, 'update'])->name('customer.saved-addresses.update');
        Route::delete('/saved-addresses/{savedAddress}', [\App\Http\Controllers\SavedAddressController::class, 'destroy'])->name('customer.saved-addresses.destroy');
        Route::post('/saved-addresses/{savedAddress}/default', [\App\Http\Controllers\SavedAddressController::class, 'setDefault'])->name('customer.saved-addresses.default');
    });

    // Driver routes
    Route::prefix('driver')->middleware('role:driver')->group(function () {
        Route::get('/dashboard', [DriverController::class, 'dashboard'])->name('driver.dashboard');
        
        // Trips
        Route::get('/trips', [\App\Http\Controllers\Driver\TripController::class, 'index'])->name('driver.trips.index');
        Route::get('/trips/create', [\App\Http\Controllers\Driver\TripController::class, 'create'])->name('driver.trips.create');
        Route::post('/trips', [\App\Http\Controllers\Driver\TripController::class, 'store'])->name('driver.trips.store');
        
        // Orders
        Route::get('/orders', [\App\Http\Controllers\Driver\OrderController::class, 'index'])->name('driver.orders.index');
        Route::get('/orders/available', [\App\Http\Controllers\Driver\OrderController::class, 'available'])->name('driver.orders.available');
        Route::post('/orders/{order}/accept', [\App\Http\Controllers\Driver\OrderController::class, 'accept'])->name('driver.orders.accept');
        Route::get('/orders/{order}', [\App\Http\Controllers\Driver\OrderController::class, 'show'])->name('driver.orders.show');
        Route::post('/orders/{order}/status', [\App\Http\Controllers\Driver\OrderController::class, 'updateStatus'])->name('driver.orders.status');

        // Settings
        Route::get('/settings', [\App\Http\Controllers\Driver\DriverController::class, 'settings'])->name('driver.settings');
        Route::post('/settings/profile', [\App\Http\Controllers\Driver\DriverController::class, 'updateProfile'])->name('driver.settings.profile');
        Route::post('/settings/send-otp', [\App\Http\Controllers\Driver\DriverController::class, 'sendSettingsOtp'])->name('driver.settings.send-otp');
        Route::post('/settings/verify-phone', [\App\Http\Controllers\Driver\DriverController::class, 'verifyPhoneChange'])->name('driver.settings.verify-phone');
        Route::delete('/settings', [\App\Http\Controllers\Driver\DriverController::class, 'destroy'])->name('driver.settings.destroy');
    });
});
