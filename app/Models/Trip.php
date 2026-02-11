<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Trip extends Model
{
    protected $fillable = [
        'driver_id',
        'from_location',
        'to_location',
        'from_latitude',
        'from_longitude',
        'to_latitude',
        'to_longitude',
        'departure_time',
        'available_seats',
        'booked_seats',
        'price_per_seat',
        'description',
        'status',
    ];

    protected $casts = [
        'departure_time' => 'datetime',
        'price_per_seat' => 'decimal:2',
        'from_latitude' => 'decimal:8',
        'from_longitude' => 'decimal:8',
        'to_latitude' => 'decimal:8',
        'to_longitude' => 'decimal:8',
    ];

    public function driver()
    {
        return $this->belongsTo(User::class, 'driver_id');
    }

    public function bookings()
    {
        return $this->hasMany(TripBooking::class);
    }
}
