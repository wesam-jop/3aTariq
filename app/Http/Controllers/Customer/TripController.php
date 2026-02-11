<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Trip;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TripController extends Controller
{
    public function index()
    {
        $trips = Trip::where('status', 'active')
            ->where('departure_time', '>', now())
            ->with('driver')
            ->latest()
            ->paginate(12);

        return Inertia::render('Customer/Trips/Index', [
            'trips' => $trips
        ]);
    }

    public function show(Trip $trip)
    {
        $trip->load(['driver', 'bookings.customer']);
        
        return Inertia::render('Customer/Trips/Show', [
            'trip' => $trip
        ]);
    }

    public function book(Request $request, Trip $trip)
    {
        $request->validate([
            'seats' => 'required|integer|min:1',
        ]);

        $requestedSeats = $request->seats;
        $remainingSeats = $trip->available_seats - $trip->booked_seats;

        if ($requestedSeats > $remainingSeats) {
            return back()->with('error', 'عذراً، لا يوجد مقاعد كافية متاحة.');
        }

        \App\Models\TripBooking::create([
            'trip_id' => $trip->id,
            'customer_id' => auth()->id(),
            'seats_booked' => $requestedSeats,
            'total_price' => $trip->price_per_seat * $requestedSeats,
            'status' => 'confirmed',
        ]);

        $trip->increment('booked_seats', $requestedSeats);

        return redirect()->route('customer.dashboard')
            ->with('message', 'تم حجز الرحلة بنجاح! يمكنك متابعة التفاصيل من لوحة التحكم.');
    }
}
