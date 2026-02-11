<?php

namespace App\Http\Controllers\Driver;

use App\Http\Controllers\Controller;
use App\Models\Trip;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TripController extends Controller
{
    public function index()
    {
        $trips = Trip::where('driver_id', auth()->id())
            ->latest()
            ->paginate(10);

        return Inertia::render('Driver/Trips/Index', [
            'trips' => $trips
        ]);
    }

    public function create()
    {
        return Inertia::render('Driver/Trips/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'from_location' => 'required|string|max:255',
            'to_location' => 'required|string|max:255',
            'departure_time' => 'required|date|after:now',
            'available_seats' => 'required|integer|min:1',
            'price_per_seat' => 'required|numeric|min:0',
            'description' => 'nullable|string',
        ]);

        Trip::create([
            'driver_id' => auth()->id(),
            'from_location' => $request->from_location,
            'to_location' => $request->to_location,
            'departure_time' => $request->departure_time,
            'available_seats' => $request->available_seats,
            'price_per_seat' => $request->price_per_seat,
            'description' => $request->description,
            'status' => 'active',
        ]);

        return redirect()->route('driver.dashboard')->with('success', 'تم إنشاء الرحلة بنجاح');
    }
}
