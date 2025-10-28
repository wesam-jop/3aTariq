<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Trip;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('role:customer');
    }

    public function dashboard()
    {
        $user = auth()->user();
        
        $orders = Order::where('customer_id', $user->id)
            ->with(['customer', 'driver'])
            ->latest()
            ->take(5)
            ->get();

        $trips = Trip::where('status', 'active')
            ->with(['driver'])
            ->latest()
            ->take(6)
            ->get();

        return Inertia::render('Customer/Dashboard', [
            'user' => $user,
            'orders' => $orders,
            'trips' => $trips,
        ]);
    }
}
