<?php

namespace App\Http\Controllers\Driver;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        
        $orders = Order::where('driver_id', $user->id)
            ->with(['customer'])
            ->latest()
            ->paginate(10);

        return Inertia::render('Driver/Orders/Index', [
            'orders' => $orders
        ]);
    }

    public function available()
    {
        /** @var \App\Models\User $driver */
        $driver = Auth::user();
        
        // Base query for available orders
        $query = Order::where('status', 'pending')
            ->whereNull('driver_id')
            ->with(['customer', 'governorate', 'region']);

        // For internal transport drivers, filter by their location
        if ($driver->transport_type === 'internal' && $driver->governorate_id && $driver->region_id) {
            $query->where(function($q) use ($driver) {
                // Show internal orders that match driver's location
                $q->where(function($internal) use ($driver) {
                    $internal->where('trip_type', 'internal')
                             ->where('governorate_id', $driver->governorate_id)
                             ->where('region_id', $driver->region_id);
                })
                // Also show external transport orders (not location-specific)
                ->orWhere('trip_type', 'external')
                // And goods orders
                ->orWhere('category', 'goods');
            });
        }
        // For external transport drivers, show all non-internal orders
        elseif ($driver->transport_type === 'external') {
            $query->where(function($q) {
                $q->where('trip_type', 'external')
                  ->orWhere('category', 'goods');
            });
        }

        $orders = $query->latest()->paginate(10);

        return Inertia::render('Driver/Orders/Available', [
            'orders' => $orders
        ]);
    }

    /**
     * @param Order $order
     */
    public function accept(Order $order)
    {
        if ($order->status !== 'pending' || !is_null($order->driver_id)) {
            return back()->with('error', 'هذا الطلب لم يعد متاحاً أو تم قبوله من قبل سائق آخر.');
        }

        /** @var \App\Models\User $user */
        $user = Auth::user();
                
        $order->update([
            'driver_id' => $user->id,
            'status' => 'active',
            'accepted_at' => now(),
        ]);

        return redirect()->route('driver.orders.show', $order->id)
            ->with('message', 'تم قبول الطلب بنجاح، يمكنك الآن التواصل مع العميل وبدء التوصيل.');
    }

    /**
     * @param Order $order
     */
    public function show(Order $order)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        
        if ($order->driver_id !== $user->id) {
            abort(403);
        }

        return Inertia::render('Driver/Orders/Show', [
            'order' => $order->load(['customer'])
        ]);
    }

    /**
     * @param Request $request
     * @param Order $order
     */
    public function updateStatus(Request $request, Order $order)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        
        if ($order->driver_id !== $user->id) {
            abort(403);
        }

        $request->validate([
            'status' => 'required|in:in_progress,delivered,cancelled',
        ]);

        $order->update([
            'status' => $request->status,
            'completed_at' => $request->status === 'delivered' ? now() : $order->completed_at,
        ]);

        return back()->with('success', 'تم تحديث حالة الطلب بنجاح');
    }
}
