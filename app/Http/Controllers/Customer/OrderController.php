<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Governorate;
use App\Models\Region;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::where('customer_id', Auth::id())
            ->with(['driver'])
            ->latest()
            ->paginate(10);

        return Inertia::render('Customer/Orders/Index', [
            'orders' => $orders
        ]);
    }

    public function create()
    {
        $governorates = Governorate::with('regions')->get();
        return Inertia::render('Customer/Orders/Create', [
            'governorates' => $governorates
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'pickup_address' => 'nullable|string|max:500',
            'delivery_address' => 'nullable|string|max:500',
            'pickup_latitude' => 'nullable|numeric|between:-90,90',
            'pickup_longitude' => 'nullable|numeric|between:-180,180',
            'delivery_latitude' => 'nullable|numeric|between:-90,90',
            'delivery_longitude' => 'nullable|numeric|between:-180,180',
            'description' => 'nullable|string',
            'type' => 'required|string', // vehicle type
            'category' => 'required|string|in:passenger,goods',
            'trip_type' => 'required_if:category,passenger|in:internal,external',
            'governorate_id' => 'required_if:trip_type,internal|exists:governorates,id',
            'region_id' => 'required_if:trip_type,internal|exists:regions,id',
            'price' => 'required|numeric|min:0',
        ]);

        // Additional validation based on trip type
        if ($validated['trip_type'] === 'internal') {
            // For internal trips, coordinates are mandatory
            if (empty($validated['pickup_latitude']) || empty($validated['pickup_longitude'])) {
                return back()->withErrors(['pickup_latitude' => 'يجب تحديد نقطة الانطلاق من الخريطة']);
            }
            if (empty($validated['delivery_latitude']) || empty($validated['delivery_longitude'])) {
                return back()->withErrors(['delivery_latitude' => 'يجب تحديد نقطة التسليم من الخريطة']);
            }
            // Governorate and region are also required
            if (empty($validated['governorate_id'])) {
                return back()->withErrors(['governorate_id' => 'يجب اختيار المحافظة']);
            }
            if (empty($validated['region_id'])) {
                return back()->withErrors(['region_id' => 'يجب اختيار المنطقة']);
            }
        } else {
            // For external trips or goods, pickup location is required but delivery location is optional
            if (empty($validated['pickup_address']) && (empty($validated['pickup_latitude']) || empty($validated['pickup_longitude']))) {
                return back()->withErrors(['pickup_address' => 'يجب تحديد نقطة الانطلاق إما بالعنوان أو من الخريطة']);
            }
            // Delivery location is optional for external trips, so no validation needed
        }


        $status = $validated['category'] === 'goods' ? 'pending_review' : 'pending';

        $order = Order::create([
            'customer_id' => Auth::id(),
            'pickup_address' => $validated['pickup_address'],
            'delivery_address' => $validated['delivery_address'],
            'pickup_latitude' => $validated['pickup_latitude'] ?? null,
            'pickup_longitude' => $validated['pickup_longitude'] ?? null,
            'delivery_latitude' => $validated['delivery_latitude'] ?? null,
            'delivery_longitude' => $validated['delivery_longitude'] ?? null,
            'description' => $validated['description'],
            'type' => $validated['type'],
            'category' => $validated['category'],
            'trip_type' => $validated['trip_type'] ?? 'external',
            'governorate_id' => $validated['governorate_id'] ?? null,
            'region_id' => $validated['region_id'] ?? null,
            'price' => $validated['price'],
            'status' => $status,
        ]);

        $msg = $validated['category'] === 'goods' 
            ? 'تم إنشاء الطلب بنجاح، بانتظار مراجعة الإدارة' 
            : 'تم إنشاء الطلب بنجاح، بانتظار قبول السائقين';

        return redirect()->route('customer.orders.index')
            ->with('message', $msg);
    }


    public function show(Order $order)
    {
        if ($order->customer_id !== Auth::id()) {
            abort(403);
        }

        $order->load(['driver', 'customer']);

        return Inertia::render('Customer/Orders/Show', [
            'order' => $order
        ]);
    }

    public function cancel(Order $order)
    {
        if ($order->customer_id !== Auth::id()) {
            abort(403);
        }

        if ($order->status !== 'pending') {
            return back()->with('error', 'لا يمكن إلغاء الطلب بعد قبوله من قبل السائق');
        }

        $order->update([
            'status' => 'cancelled'
        ]);

        return back()->with('message', 'تم إلغاء الطلب بنجاح');
    }
}
