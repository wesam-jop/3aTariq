<?php

namespace App\Http\Controllers\Driver;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Trip;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DriverController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('role:driver');
    }

    public function dashboard()
    {
        $user = auth()->user();
        
        $trips = Trip::where('driver_id', $user->id)
            ->with(['driver'])
            ->latest()
            ->take(5)
            ->get();

        $orders = Order::where('driver_id', $user->id)
            ->with(['customer', 'driver'])
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('Driver/Dashboard', [
            'user' => $user,
            'trips' => $trips,
            'orders' => $orders,
        ]);
    }
}
