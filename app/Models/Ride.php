<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ride extends Model
{
    use HasFactory;

    protected $fillable = [
        'ride_number',
        'customer_id',
        'driver_id',
        'route_id',
        'pickup_location',
        'dropoff_location',
        'pickup_lat',
        'pickup_lng',
        'dropoff_lat',
        'dropoff_lng',
        'pickup_latitude',
        'pickup_longitude',
        'dropoff_latitude',
        'dropoff_longitude',
        'distance_km',
        'calculated_price',
        'scheduled_at',
        'started_at',
        'completed_at',
        'cancelled_at',
        'status',
        'ride_type',
        'passenger_count',
        'price',
        'driver_earning',
        'commission',
        'payment_method',
        'payment_status',
        'rating',
        'review',
        'notes',
        'cancellation_reason',
    ];

    protected function casts(): array
    {
        return [
            'pickup_lat' => 'decimal:8',
            'pickup_lng' => 'decimal:8',
            'dropoff_lat' => 'decimal:8',
            'dropoff_lng' => 'decimal:8',
            'pickup_latitude' => 'decimal:8',
            'pickup_longitude' => 'decimal:8',
            'dropoff_latitude' => 'decimal:8',
            'dropoff_longitude' => 'decimal:8',
            'distance_km' => 'decimal:2',
            'calculated_price' => 'decimal:2',
            'scheduled_at' => 'datetime',
            'started_at' => 'datetime',
            'completed_at' => 'datetime',
            'cancelled_at' => 'datetime',
            'price' => 'decimal:2',
            'driver_earning' => 'decimal:2',
            'commission' => 'decimal:2',
        ];
    }

    // العلاقات
    public function customer()
    {
        return $this->belongsTo(User::class, 'customer_id');
    }

    public function driver()
    {
        return $this->belongsTo(User::class, 'driver_id');
    }

    public function route()
    {
        return $this->belongsTo(Route::class);
    }

    public function payment()
    {
        return $this->morphOne(Payment::class, 'payable');
    }

    // Helper Methods
    public function isPending(): bool
    {
        return $this->status === 'pending';
    }

    public function isAccepted(): bool
    {
        return $this->status === 'accepted';
    }

    public function isInProgress(): bool
    {
        return $this->status === 'in_progress';
    }

    public function isCompleted(): bool
    {
        return $this->status === 'completed';
    }

    public function isCancelled(): bool
    {
        return $this->status === 'cancelled';
    }

    // Scopes
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeActive($query)
    {
        return $query->whereIn('status', ['accepted', 'in_progress']);
    }
}

