<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Trip;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('role:admin');
    }

    public function dashboard()
    {
        $stats = [
            'totalUsers' => User::count(),
            'totalOrders' => Order::count(),
            'totalTrips' => Trip::count(),
            'totalRevenue' => Order::where('status', 'completed')->sum('total_amount') ?? 0,
        ];

        return Inertia::render('Admin/Dashboard', [
            'user' => auth()->user(),
            'stats' => $stats,
        ]);
    }
}
