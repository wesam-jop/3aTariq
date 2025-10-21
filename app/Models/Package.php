<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Package extends Model
{
    use HasFactory;

    protected $fillable = [
        'package_number',
        'customer_id',
        'driver_id',
        'from_city_id',
        'to_city_id',
        'package_type',
        'package_description',
        'weight_kg',
        'sender_name',
        'sender_phone',
        'sender_address',
        'sender_lat',
        'sender_lng',
        'receiver_name',
        'receiver_phone',
        'receiver_address',
        'receiver_lat',
        'receiver_lng',
        'scheduled_pickup_at',
        'picked_at',
        'delivered_at',
        'cancelled_at',
        'status',
        'price',
        'driver_earning',
        'commission',
        'payment_method',
        'payment_status',
        'rating',
        'review',
        'notes',
        'cancellation_reason',
        'delivery_image',
    ];

    protected function casts(): array
    {
        return [
            'weight_kg' => 'decimal:2',
            'sender_lat' => 'decimal:8',
            'sender_lng' => 'decimal:8',
            'receiver_lat' => 'decimal:8',
            'receiver_lng' => 'decimal:8',
            'scheduled_pickup_at' => 'datetime',
            'picked_at' => 'datetime',
            'delivered_at' => 'datetime',
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

    public function fromCity()
    {
        return $this->belongsTo(City::class, 'from_city_id');
    }

    public function toCity()
    {
        return $this->belongsTo(City::class, 'to_city_id');
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

    public function isPicked(): bool
    {
        return $this->status === 'picked';
    }

    public function isInTransit(): bool
    {
        return $this->status === 'in_transit';
    }

    public function isDelivered(): bool
    {
        return $this->status === 'delivered';
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
        return $query->whereIn('status', ['accepted', 'picked', 'in_transit']);
    }
}

