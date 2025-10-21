<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Driver;

// Language Switcher Route
Route::post('/language/{locale}', function ($locale) {
    if (!in_array($locale, ['ar', 'en'])) {
        $locale = 'ar';
    }
    
    session(['locale' => $locale]);
    
    return back()->withCookie(cookie()->forever('locale', $locale));
})->name('language.switch');

Route::get('/', function () {
    // أكثر 3 سائقين طلبات (الأكثر شعبية)
    $drivers = Driver::with('user')
        ->where('is_verified', true)
        ->where('status', 'available')
        ->withCount(['completedRides', 'deliveredPackages'])
        ->get()
        ->sortByDesc(function ($driver) {
            return $driver->completed_rides_count + $driver->delivered_packages_count;
        })
        ->take(3)
        ->values();
    
    // جلب آخر التقييمات - فقط للسائقين الموافق عليهم
    $reviews = \App\Models\DriverReview::with(['customer', 'driver.user'])
        ->whereHas('driver', function($query) {
            $query->where('is_verified', true);
        })
        ->whereNotNull('comment')
        ->latest()
        ->take(12)
        ->get();
    
    return Inertia::render('Welcome', [
        'drivers' => $drivers,
        'reviews' => $reviews
    ]);
})->name('home');

// صفحة جميع السائقين
Route::get('/drivers', function () {
    $drivers = Driver::with('user', 'cities')
        ->where('is_verified', true)
        ->withCount(['completedRides', 'deliveredPackages'])
        ->get()
        ->sortByDesc(function ($driver) {
            return $driver->completed_rides_count + $driver->delivered_packages_count;
        })
        ->values();
    
    return Inertia::render('AllDrivers', [
        'drivers' => $drivers
    ]);
})->name('drivers.index');

// مسارات المستخدم (العميل) - محمية للعملاء فقط
Route::middleware(['auth:sanctum', 'customer.only'])->prefix('customer')->name('customer.')->group(function () {
    Route::get('/dashboard', function () {
        $user = auth()->user();
        
        // إحصائيات العميل
        $activeRides = \App\Models\Ride::where('customer_id', $user->id)
            ->whereIn('status', ['pending', 'accepted', 'in_progress'])
            ->with(['driver.user', 'route.fromCity', 'route.toCity'])
            ->latest()
            ->get();
        
        $completedRides = \App\Models\Ride::where('customer_id', $user->id)
            ->where('status', 'completed')
            ->count();
        
        $activePackages = \App\Models\Package::where('customer_id', $user->id)
            ->whereIn('status', ['pending', 'accepted', 'picked', 'in_transit'])
            ->with(['driver.user', 'fromCity', 'toCity'])
            ->latest()
            ->get();
        
        $deliveredPackages = \App\Models\Package::where('customer_id', $user->id)
            ->where('status', 'delivered')
            ->count();
        
        return Inertia::render('Customer/Dashboard', [
            'stats' => [
                'active_rides' => $activeRides->count(),
                'completed_rides' => $completedRides,
                'active_packages' => $activePackages->count(),
                'delivered_packages' => $deliveredPackages,
                'wallet_balance' => $user->wallet_balance,
            ],
            'activeRides' => $activeRides->take(5),
            'activePackages' => $activePackages->take(5),
        ]);
    })->name('dashboard');
    
    Route::get('/rides', function () {
        $user = auth()->user();
        
        // جلب جميع الرحلات
        $rides = \App\Models\Ride::where('customer_id', $user->id)
            ->with(['driver.user', 'route.fromCity', 'route.toCity'])
            ->latest()
            ->get();
        
        // جلب المسارات المتاحة
        $routes = \App\Models\Route::with(['fromCity', 'toCity'])
            ->where('is_active', true)
            ->get();
        
        // جلب أسعار الكيلومتر من الإعدادات
        $privatePricePerKm = \App\Models\Setting::where('key', 'private_price_per_km')->value('value') ?? 1.00;
        $publicPricePerKm = \App\Models\Setting::where('key', 'public_price_per_km')->value('value') ?? 0.50;
        
        return Inertia::render('Customer/Rides', [
            'rides' => $rides,
            'routes' => $routes,
            'privatePricePerKm' => (float) $privatePricePerKm,
            'publicPricePerKm' => (float) $publicPricePerKm,
        ]);
    })->name('rides');
    
    Route::post('/rides/create', function (\Illuminate\Http\Request $request) {
        $request->validate([
            'pickup_location' => 'required|string',
            'dropoff_location' => 'required|string',
            'pickup_latitude' => 'required|numeric',
            'pickup_longitude' => 'required|numeric',
            'dropoff_latitude' => 'required|numeric',
            'dropoff_longitude' => 'required|numeric',
            'distance_km' => 'required|numeric|min:0.1',
            'ride_type' => 'required|in:private,public',
            'passenger_count' => 'required|integer|min:1|max:10',
            'scheduled_at' => 'nullable|date|after:now',
            'payment_method' => 'required|in:cash',
            'notes' => 'nullable|string|max:500',
            'price' => 'required|numeric|min:0',
            'calculated_price' => 'required|numeric|min:0',
        ]);

        // السعر من الحساب بناءً على المسافة (لا حاجة لحسابه مرة أخرى)
        $price = $request->calculated_price;

        $ride = \App\Models\Ride::create([
            'ride_number' => 'R' . strtoupper(\Illuminate\Support\Str::random(8)),
            'customer_id' => $request->user()->id,
            'pickup_location' => $request->pickup_location,
            'dropoff_location' => $request->dropoff_location,
            'pickup_latitude' => $request->pickup_latitude,
            'pickup_longitude' => $request->pickup_longitude,
            'dropoff_latitude' => $request->dropoff_latitude,
            'dropoff_longitude' => $request->dropoff_longitude,
            'distance_km' => $request->distance_km,
            'calculated_price' => $price,
            'ride_type' => $request->ride_type,
            'scheduled_at' => $request->scheduled_at,
            'passenger_count' => $request->passenger_count,
            'price' => $price,
            'payment_method' => $request->payment_method,
            'notes' => $request->notes,
            'status' => 'pending',
        ]);

        // خصم من المحفظة إذا الدفع عبر المحفظة
        if ($request->payment_method === 'wallet') {
            $request->user()->decrement('wallet_balance', $price);
            $ride->update(['payment_status' => 'paid']);
        }

        return back()->with('success', 'تم إنشاء الرحلة بنجاح! في انتظار قبول سائق.');
    })->name('rides.create');
    
    Route::get('/packages', function () {
        return Inertia::render('Customer/Packages');
    })->name('packages');
    
    // ملف شخصي العميل
    Route::get('/profile', [\App\Http\Controllers\Customer\ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile', [\App\Http\Controllers\Customer\ProfileController::class, 'update'])->name('profile.update');
});

// مسار انتظار الموافقة (للسائقين غير الموافق عليهم)
Route::middleware(['auth:sanctum', 'driver.only'])->group(function () {
    Route::get('/driver/pending', function () {
        $driver = auth()->user()->driver;
        
        // إذا كان موافق عليه، تحويله للداش بورد
        if ($driver && $driver->is_verified) {
            return redirect()->route('driver.dashboard');
        }
        
        return Inertia::render('Driver/Pending', [
            'driver' => $driver
        ]);
    })->name('driver.pending');
});

// مسارات السائق - محمية للسائقين الموافق عليهم فقط
Route::middleware(['auth:sanctum', 'driver.only', 'driver.approved'])->prefix('driver')->name('driver.')->group(function () {
    Route::get('/dashboard', function () {
        $driver = auth()->user()->driver;
        
        // إحصائيات اليوم - استخدام completed_at للرحلات المكتملة
        $todayRides = \App\Models\Ride::where('driver_id', auth()->id())
            ->whereDate('completed_at', today())
            ->where('status', 'completed')
            ->count();

        $todayRidesEarnings = \App\Models\Ride::where('driver_id', auth()->id())
            ->whereDate('completed_at', today())
            ->where('status', 'completed')
            ->sum('driver_earning');

        $todayPackagesEarnings = \App\Models\Package::where('driver_id', auth()->id())
            ->whereDate('delivered_at', today())
            ->where('status', 'delivered')
            ->sum('driver_earning');

        $todayTotalEarnings = $todayRidesEarnings + $todayPackagesEarnings;

        // الرحلات المتاحة - فقط إذا كان السائق متاحاً
        $availableRides = [];
        
        if ($driver->status === 'available') {
            $cityIds = $driver->cities->pluck('id');
            
            $availableRides = \App\Models\Ride::where('status', 'pending')
                ->whereHas('route', function ($query) use ($cityIds) {
                    $query->whereIn('from_city_id', $cityIds)
                        ->orWhereIn('to_city_id', $cityIds);
                })
                ->with(['customer', 'route.fromCity', 'route.toCity'])
                ->latest()
                ->take(5)
                ->get();
        }

        return Inertia::render('Driver/Dashboard', [
            'driver' => $driver->load('user'),
            'stats' => [
                'today_rides' => $todayRides,
                'today_earnings' => $todayTotalEarnings,
                'total_trips' => $driver->total_trips,
                'total_earnings' => $driver->total_earnings,
                'rating' => $driver->rating ?? 5.0,
            ],
            'available_rides' => $availableRides,
        ]);
    })->name('dashboard');
    
    Route::get('/rides', function () {
        $driver = auth()->user()->driver;
        $cityIds = $driver->cities->pluck('id');
        
        // الرحلات المتاحة
        $availableRides = \App\Models\Ride::where('status', 'pending')
            ->whereHas('route', function ($query) use ($cityIds) {
                $query->whereIn('from_city_id', $cityIds)
                    ->orWhereIn('to_city_id', $cityIds);
            })
            ->with(['customer', 'route.fromCity', 'route.toCity'])
            ->latest()
            ->get();
        
        // الطرود المتاحة
        $availablePackages = \App\Models\Package::where('status', 'pending')
            ->where(function ($query) use ($cityIds) {
                $query->whereIn('from_city_id', $cityIds)
                    ->orWhereIn('to_city_id', $cityIds);
            })
            ->with(['customer', 'fromCity', 'toCity'])
            ->latest()
            ->get();
        
        // الرحلات النشطة (المقبولة أو قيد التنفيذ)
        $activeRides = \App\Models\Ride::where('driver_id', auth()->id())
            ->whereIn('status', ['accepted', 'in_progress'])
            ->with(['customer', 'route.fromCity', 'route.toCity'])
            ->latest()
            ->get();
        
        // الطرود النشطة
        $activePackages = \App\Models\Package::where('driver_id', auth()->id())
            ->whereIn('status', ['accepted', 'picked', 'in_transit'])
            ->with(['customer', 'fromCity', 'toCity'])
            ->latest()
            ->get();
        
        return Inertia::render('Driver/Rides', [
            'availableRides' => $availableRides,
            'availablePackages' => $availablePackages,
            'activeRides' => $activeRides,
            'activePackages' => $activePackages,
        ]);
    })->name('rides');
    
    Route::get('/earnings', function () {
        $driver = auth()->user()->driver;
        
        // الرحلات المكتملة
        $completedRides = \App\Models\Ride::where('driver_id', auth()->id())
            ->where('status', 'completed')
            ->with(['customer', 'route.fromCity', 'route.toCity'])
            ->latest('completed_at')
            ->get();
        
        // الطرود المسلمة
        $deliveredPackages = \App\Models\Package::where('driver_id', auth()->id())
            ->where('status', 'delivered')
            ->with(['customer', 'fromCity', 'toCity'])
            ->latest('delivered_at')
            ->get();
        
        // حساب الأرباح
        $totalRidesEarning = $completedRides->sum('driver_earning');
        $totalPackagesEarning = $deliveredPackages->sum('driver_earning');
        $totalEarnings = $totalRidesEarning + $totalPackagesEarning;
        
        // أرباح الشهر الحالي
        $monthRidesEarning = $completedRides->where('completed_at', '>=', now()->startOfMonth())->sum('driver_earning');
        $monthPackagesEarning = $deliveredPackages->where('delivered_at', '>=', now()->startOfMonth())->sum('driver_earning');
        $monthEarnings = $monthRidesEarning + $monthPackagesEarning;
        
        // أرباح اليوم
        $todayRidesEarning = $completedRides->where('completed_at', '>=', today())->sum('driver_earning');
        $todayPackagesEarning = $deliveredPackages->where('delivered_at', '>=', today())->sum('driver_earning');
        $todayEarnings = $todayRidesEarning + $todayPackagesEarning;
        
        return Inertia::render('Driver/Earnings', [
            'stats' => [
                'total_earnings' => $totalEarnings,
                'month_earnings' => $monthEarnings,
                'today_earnings' => $todayEarnings,
                'total_trips' => $completedRides->count() + $deliveredPackages->count(),
                'total_rides' => $completedRides->count(),
                'total_packages' => $deliveredPackages->count(),
                'rides_earning' => $totalRidesEarning,
                'packages_earning' => $totalPackagesEarning,
            ],
            'completedRides' => $completedRides->take(10),
            'deliveredPackages' => $deliveredPackages->take(10),
        ]);
    })->name('earnings');
    
    Route::post('/update-status', function () {
        $driver = auth()->user()->driver;
        
        if (!$driver) {
            return back()->with('error', 'المستخدم ليس سائقاً');
        }
        
        $newStatus = $driver->status === 'available' ? 'offline' : 'available';
        $driver->update(['status' => $newStatus]);
        
        return back()->with('success', 'تم تحديث الحالة بنجاح');
    })->name('update-status');
    
    // ملف شخصي السائق
    Route::get('/profile', [\App\Http\Controllers\Driver\ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile', [\App\Http\Controllers\Driver\ProfileController::class, 'update'])->name('profile.update');
});

// مسارات المصادقة
Route::middleware('guest')->group(function () {
    Route::get('/login', function () {
        return Inertia::render('Auth/Login');
    })->name('login');
    
    Route::get('/register', function () {
        return Inertia::render('Auth/Register');
    })->name('register');
});

// مسار عرض صفحة السائق (متاح للجميع)
Route::get('/driver/{driver}', [\App\Http\Controllers\DriverProfileController::class, 'show'])
    ->name('driver.profile');

// مسار إضافة تقييم (محمي لأي مستخدم مسجل)
Route::post('/driver/{driver}/review', [\App\Http\Controllers\DriverProfileController::class, 'storeReview'])
    ->middleware(['auth:sanctum'])
    ->name('driver.review');

require __DIR__.'/auth.php';

// Test route (للتطوير فقط)
Route::get('/test-reviews', function () {
    $reviews = \App\Models\DriverReview::with(['customer', 'driver.user'])->get();
    $drivers = \App\Models\Driver::with('user')->get();
    
    return response()->json([
        'total_reviews' => $reviews->count(),
        'reviews' => $reviews->map(function($r) {
            return [
                'id' => $r->id,
                'customer' => $r->customer->name,
                'driver' => $r->driver->user->name,
                'rating' => $r->rating,
                'comment' => $r->comment,
                'created_at' => $r->created_at->format('Y-m-d H:i:s'),
            ];
        }),
        'drivers' => $drivers->map(function($d) {
            $reviewCount = \App\Models\DriverReview::where('driver_id', $d->id)->count();
            $avgRating = \App\Models\DriverReview::where('driver_id', $d->id)->avg('rating');
            return [
                'id' => $d->id,
                'name' => $d->user->name,
                'rating_in_db' => $d->rating,
                'calculated_avg' => $avgRating ? round($avgRating, 2) : 0,
                'review_count' => $reviewCount,
            ];
        }),
    ]);
});
