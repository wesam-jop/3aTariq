<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Package;
use App\Models\City;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PackageController extends Controller
{
    public function index(Request $request)
    {
        $packages = $request->user()
            ->packagesAsCustomer()
            ->with(['driver', 'fromCity', 'toCity'])
            ->latest()
            ->paginate(20);

        return response()->json($packages);
    }

    public function store(Request $request)
    {
        $request->validate([
            'from_city_id' => 'required|exists:cities,id',
            'to_city_id' => 'required|exists:cities,id|different:from_city_id',
            'package_type' => 'required|in:document,food,medicine,goods,other',
            'package_description' => 'nullable|string',
            'weight_kg' => 'nullable|numeric|min:0',
            'sender_name' => 'required|string',
            'sender_phone' => 'required|string',
            'sender_address' => 'required|string',
            'sender_lat' => 'nullable|numeric',
            'sender_lng' => 'nullable|numeric',
            'receiver_name' => 'required|string',
            'receiver_phone' => 'required|string',
            'receiver_address' => 'required|string',
            'receiver_lat' => 'nullable|numeric',
            'receiver_lng' => 'nullable|numeric',
            'scheduled_pickup_at' => 'nullable|date',
            'payment_method' => 'required|in:cash,wallet,card',
            'notes' => 'nullable|string',
        ]);

        // حساب السعر
        $price = $this->calculatePrice($request->from_city_id, $request->to_city_id, $request->weight_kg, $request->package_type);

        // التحقق من رصيد المحفظة
        if ($request->payment_method === 'wallet') {
            if ($request->user()->wallet_balance < $price) {
                return response()->json([
                    'message' => 'رصيد المحفظة غير كافٍ'
                ], 400);
            }
        }

        $package = Package::create([
            'package_number' => 'P' . strtoupper(Str::random(8)),
            'customer_id' => $request->user()->id,
            'from_city_id' => $request->from_city_id,
            'to_city_id' => $request->to_city_id,
            'package_type' => $request->package_type,
            'package_description' => $request->package_description,
            'weight_kg' => $request->weight_kg,
            'sender_name' => $request->sender_name,
            'sender_phone' => $request->sender_phone,
            'sender_address' => $request->sender_address,
            'sender_lat' => $request->sender_lat,
            'sender_lng' => $request->sender_lng,
            'receiver_name' => $request->receiver_name,
            'receiver_phone' => $request->receiver_phone,
            'receiver_address' => $request->receiver_address,
            'receiver_lat' => $request->receiver_lat,
            'receiver_lng' => $request->receiver_lng,
            'scheduled_pickup_at' => $request->scheduled_pickup_at,
            'price' => $price,
            'payment_method' => $request->payment_method,
            'notes' => $request->notes,
        ]);

        return response()->json([
            'message' => 'تم إنشاء طلب الشحن بنجاح',
            'package' => $package->load(['fromCity', 'toCity'])
        ], 201);
    }

    public function show(Package $package)
    {
        if ($package->customer_id !== request()->user()->id && 
            $package->driver_id !== request()->user()->id) {
            return response()->json(['message' => 'غير مصرح'], 403);
        }

        return response()->json([
            'package' => $package->load(['customer', 'driver', 'fromCity', 'toCity'])
        ]);
    }

    public function update(Request $request, Package $package)
    {
        if ($package->customer_id !== $request->user()->id) {
            return response()->json(['message' => 'غير مصرح'], 403);
        }

        if (!$package->isPending()) {
            return response()->json([
                'message' => 'لا يمكن تعديل الطلب'
            ], 400);
        }

        $request->validate([
            'sender_address' => 'sometimes|string',
            'receiver_address' => 'sometimes|string',
            'scheduled_pickup_at' => 'sometimes|date',
            'notes' => 'nullable|string',
        ]);

        $package->update($request->only([
            'sender_address',
            'receiver_address',
            'scheduled_pickup_at',
            'notes'
        ]));

        return response()->json([
            'message' => 'تم تحديث الطلب بنجاح',
            'package' => $package
        ]);
    }

    private function calculatePrice($fromCityId, $toCityId, $weight, $packageType): float
    {
        // حساب السعر الأساسي بناءً على المسافة
        $basePrice = Setting::get('base_package_price', 50);
        
        // سعر إضافي حسب الوزن
        $pricePerKg = Setting::get('price_per_kg', 5);
        $weightPrice = $weight ? $weight * $pricePerKg : 0;

        // سعر إضافي حسب نوع الشحنة
        $typeMultipliers = [
            'document' => 1.0,
            'food' => 1.2,
            'medicine' => 1.5,
            'goods' => 1.1,
            'other' => 1.0,
        ];

        $multiplier = $typeMultipliers[$packageType] ?? 1.0;

        return ($basePrice + $weightPrice) * $multiplier;
    }
}

