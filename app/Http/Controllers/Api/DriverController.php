<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Ride;
use App\Models\Package;
use App\Models\Setting;
use Illuminate\Http\Request;

class DriverController extends Controller
{
    public function availableRides(Request $request)
    {
        $driver = $request->user()->driver;

        if (!$driver || !$driver->isVerified()) {
            return response()->json([
                'message' => 'يجب أن يكون السائق موثقاً'
            ], 403);
        }

        // الحصول على المدن التي يعمل بها السائق
        $cityIds = $driver->cities->pluck('id');

        $rides = Ride::pending()
            ->whereHas('route', function ($query) use ($cityIds) {
                $query->whereIn('from_city_id', $cityIds)
                    ->orWhereIn('to_city_id', $cityIds);
            })
            ->with(['customer', 'route.fromCity', 'route.toCity'])
            ->latest()
            ->paginate(20);

        return response()->json($rides);
    }

    public function availablePackages(Request $request)
    {
        $driver = $request->user()->driver;

        if (!$driver || !$driver->isVerified()) {
            return response()->json([
                'message' => 'يجب أن يكون السائق موثقاً'
            ], 403);
        }

        $cityIds = $driver->cities->pluck('id');

        $packages = Package::pending()
            ->where(function ($query) use ($cityIds) {
                $query->whereIn('from_city_id', $cityIds)
                    ->orWhereIn('to_city_id', $cityIds);
            })
            ->with(['customer', 'fromCity', 'toCity'])
            ->latest()
            ->paginate(20);

        return response()->json($packages);
    }

    public function acceptRide(Request $request, Ride $ride)
    {
        $driver = $request->user()->driver;

        if (!$driver || !$driver->isVerified()) {
            return response()->json([
                'message' => 'يجب أن يكون السائق موثقاً'
            ], 403);
        }

        if (!$ride->isPending()) {
            return response()->json([
                'message' => 'الرحلة غير متاحة'
            ], 400);
        }

        // حساب أرباح السائق والعمولة
        $commission = $this->calculateCommission($ride->price);
        $driverEarning = $ride->price - $commission;

        $ride->update([
            'driver_id' => $request->user()->id,
            'status' => 'accepted',
            'driver_earning' => $driverEarning,
            'commission' => $commission,
        ]);

        // تحديث حالة السائق
        $driver->update(['status' => 'busy']);

        return response()->json([
            'message' => 'تم قبول الرحلة بنجاح',
            'ride' => $ride->load(['customer', 'route'])
        ]);
    }

    public function completeRide(Request $request, Ride $ride)
    {
        if ($ride->driver_id !== $request->user()->id) {
            return response()->json(['message' => 'غير مصرح'], 403);
        }

        if (!$ride->isAccepted() && !$ride->isInProgress()) {
            return response()->json([
                'message' => 'لا يمكن إتمام الرحلة'
            ], 400);
        }

        $ride->update([
            'status' => 'completed',
            'completed_at' => now(),
        ]);

        // تحديث إحصائيات السائق
        $driver = $request->user()->driver;
        $driver->increment('total_trips');
        $driver->increment('total_earnings', $ride->driver_earning);
        $driver->update(['status' => 'available']);

        return response()->json([
            'message' => 'تم إتمام الرحلة بنجاح',
            'ride' => $ride
        ]);
    }

    public function acceptPackage(Request $request, Package $package)
    {
        $driver = $request->user()->driver;

        if (!$driver || !$driver->isVerified()) {
            return response()->json([
                'message' => 'يجب أن يكون السائق موثقاً'
            ], 403);
        }

        if (!$package->isPending()) {
            return response()->json([
                'message' => 'الطلب غير متاح'
            ], 400);
        }

        $commission = $this->calculateCommission($package->price);
        $driverEarning = $package->price - $commission;

        $package->update([
            'driver_id' => $request->user()->id,
            'status' => 'accepted',
            'driver_earning' => $driverEarning,
            'commission' => $commission,
        ]);

        $driver->update(['status' => 'busy']);

        return response()->json([
            'message' => 'تم قبول الطلب بنجاح',
            'package' => $package->load(['customer', 'fromCity', 'toCity'])
        ]);
    }

    public function completePackage(Request $request, Package $package)
    {
        if ($package->driver_id !== $request->user()->id) {
            return response()->json(['message' => 'غير مصرح'], 403);
        }

        $request->validate([
            'delivery_image' => 'nullable|image|max:2048',
        ]);

        if (!$package->isAccepted() && !$package->isPicked() && !$package->isInTransit()) {
            return response()->json([
                'message' => 'لا يمكن إتمام التوصيل'
            ], 400);
        }

        $deliveryImage = null;
        if ($request->hasFile('delivery_image')) {
            $deliveryImage = $request->file('delivery_image')->store('deliveries', 'public');
        }

        $package->update([
            'status' => 'delivered',
            'delivered_at' => now(),
            'delivery_image' => $deliveryImage,
        ]);

        $driver = $request->user()->driver;
        $driver->increment('total_trips');
        $driver->increment('total_earnings', $package->driver_earning);
        $driver->update(['status' => 'available']);

        return response()->json([
            'message' => 'تم إتمام التوصيل بنجاح',
            'package' => $package
        ]);
    }

    public function earnings(Request $request)
    {
        $driver = $request->user()->driver;

        if (!$driver) {
            return response()->json([
                'message' => 'المستخدم ليس سائقاً'
            ], 403);
        }

        $completedRides = Ride::where('driver_id', $request->user()->id)
            ->where('status', 'completed')
            ->get();

        $completedPackages = Package::where('driver_id', $request->user()->id)
            ->where('status', 'delivered')
            ->get();

        $totalRidesEarning = $completedRides->sum('driver_earning');
        $totalPackagesEarning = $completedPackages->sum('driver_earning');

        return response()->json([
            'total_earnings' => $driver->total_earnings,
            'total_trips' => $driver->total_trips,
            'rides_earning' => $totalRidesEarning,
            'packages_earning' => $totalPackagesEarning,
            'rating' => $driver->rating,
        ]);
    }

    public function updateStatus(Request $request)
    {
        $driver = $request->user()->driver;

        if (!$driver) {
            return response()->json([
                'message' => 'المستخدم ليس سائقاً'
            ], 403);
        }

        $request->validate([
            'status' => 'required|in:available,offline'
        ]);

        $driver->update(['status' => $request->status]);

        return response()->json([
            'message' => 'تم تحديث الحالة بنجاح',
            'status' => $driver->status
        ]);
    }

    public function getDashboardData(Request $request)
    {
        $driver = $request->user()->driver;

        if (!$driver) {
            return response()->json([
                'message' => 'المستخدم ليس سائقاً'
            ], 403);
        }

        // إحصائيات اليوم
        $todayRides = Ride::where('driver_id', $request->user()->id)
            ->whereDate('created_at', today())
            ->where('status', 'completed')
            ->count();

        $todayEarnings = Ride::where('driver_id', $request->user()->id)
            ->whereDate('completed_at', today())
            ->where('status', 'completed')
            ->sum('driver_earning');

        $todayPackages = Package::where('driver_id', $request->user()->id)
            ->whereDate('delivered_at', today())
            ->where('status', 'delivered')
            ->sum('driver_earning');

        $todayTotalEarnings = $todayEarnings + $todayPackages;

        // الرحلات المتاحة
        $cityIds = $driver->cities->pluck('id');
        
        $availableRides = Ride::pending()
            ->whereHas('route', function ($query) use ($cityIds) {
                $query->whereIn('from_city_id', $cityIds)
                    ->orWhereIn('to_city_id', $cityIds);
            })
            ->with(['customer.user', 'route.fromCity', 'route.toCity'])
            ->latest()
            ->take(5)
            ->get();

        return response()->json([
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
    }

    private function calculateCommission($price): float
    {
        $commissionPercentage = Setting::get('commission_percentage', 10);
        return ($price * $commissionPercentage) / 100;
    }
}

