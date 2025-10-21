<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Ride;
use App\Models\Route;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class RideController extends Controller
{
    public function index(Request $request)
    {
        $rides = $request->user()
            ->ridesAsCustomer()
            ->with(['driver', 'route.fromCity', 'route.toCity'])
            ->latest()
            ->paginate(20);

        return response()->json($rides);
    }

    public function store(Request $request)
    {
        $request->validate([
            'route_id' => 'required|exists:routes,id',
            'pickup_location' => 'required|string',
            'dropoff_location' => 'required|string',
            'pickup_lat' => 'nullable|numeric',
            'pickup_lng' => 'nullable|numeric',
            'dropoff_lat' => 'nullable|numeric',
            'dropoff_lng' => 'nullable|numeric',
            'scheduled_at' => 'nullable|date',
            'passenger_count' => 'required|integer|min:1',
            'payment_method' => 'required|in:cash,wallet,card',
            'notes' => 'nullable|string',
        ]);

        // حساب السعر
        $route = Route::findOrFail($request->route_id);
        $price = $this->calculatePrice($route, $request->passenger_count);

        // التحقق من رصيد المحفظة إذا كانت الدفع عبر المحفظة
        if ($request->payment_method === 'wallet') {
            if ($request->user()->wallet_balance < $price) {
                return response()->json([
                    'message' => 'رصيد المحفظة غير كافٍ'
                ], 400);
            }
        }

        $ride = Ride::create([
            'ride_number' => 'R' . strtoupper(Str::random(8)),
            'customer_id' => $request->user()->id,
            'route_id' => $request->route_id,
            'pickup_location' => $request->pickup_location,
            'dropoff_location' => $request->dropoff_location,
            'pickup_lat' => $request->pickup_lat,
            'pickup_lng' => $request->pickup_lng,
            'dropoff_lat' => $request->dropoff_lat,
            'dropoff_lng' => $request->dropoff_lng,
            'scheduled_at' => $request->scheduled_at,
            'passenger_count' => $request->passenger_count,
            'price' => $price,
            'payment_method' => $request->payment_method,
            'notes' => $request->notes,
        ]);

        return response()->json([
            'message' => 'تم إنشاء الرحلة بنجاح',
            'ride' => $ride->load('route.fromCity', 'route.toCity')
        ], 201);
    }

    public function show(Ride $ride)
    {
        // التحقق من صلاحية الوصول
        if ($ride->customer_id !== request()->user()->id && 
            $ride->driver_id !== request()->user()->id) {
            return response()->json(['message' => 'غير مصرح'], 403);
        }

        return response()->json([
            'ride' => $ride->load(['customer', 'driver', 'route.fromCity', 'route.toCity'])
        ]);
    }

    public function cancel(Request $request, Ride $ride)
    {
        // التحقق من الصلاحية
        if ($ride->customer_id !== $request->user()->id) {
            return response()->json(['message' => 'غير مصرح'], 403);
        }

        if (!$ride->isPending() && !$ride->isAccepted()) {
            return response()->json([
                'message' => 'لا يمكن إلغاء الرحلة'
            ], 400);
        }

        $request->validate([
            'cancellation_reason' => 'required|string',
        ]);

        $ride->update([
            'status' => 'cancelled',
            'cancelled_at' => now(),
            'cancellation_reason' => $request->cancellation_reason,
        ]);

        return response()->json([
            'message' => 'تم إلغاء الرحلة بنجاح',
            'ride' => $ride
        ]);
    }

    public function rate(Request $request, Ride $ride)
    {
        if ($ride->customer_id !== $request->user()->id) {
            return response()->json(['message' => 'غير مصرح'], 403);
        }

        if (!$ride->isCompleted()) {
            return response()->json([
                'message' => 'يمكن التقييم فقط بعد إكمال الرحلة'
            ], 400);
        }

        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'review' => 'nullable|string',
        ]);

        $ride->update([
            'rating' => $request->rating,
            'review' => $request->review,
        ]);

        // تحديث تقييم السائق
        if ($ride->driver) {
            $this->updateDriverRating($ride->driver);
        }

        return response()->json([
            'message' => 'تم التقييم بنجاح',
            'ride' => $ride
        ]);
    }

    private function calculatePrice(Route $route, int $passengerCount): float
    {
        $basePrice = $route->base_price;
        $pricePerPassenger = Setting::get('price_per_passenger', 10);

        return $basePrice + (($passengerCount - 1) * $pricePerPassenger);
    }

    private function updateDriverRating($driver)
    {
        $driverModel = $driver->driver;
        $averageRating = $driver->ridesAsDriver()->whereNotNull('rating')->avg('rating');
        
        $driverModel->update([
            'rating' => round($averageRating, 2)
        ]);
    }
}

