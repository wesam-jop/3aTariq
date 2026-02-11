<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_id',
        'driver_id',
        'pickup_address',
        'delivery_address',
        'pickup_latitude',
        'pickup_longitude',
        'delivery_latitude',
        'delivery_longitude',
        'description',
        'type',
        'category',
        'trip_type',
        'governorate_id',
        'region_id',
        'price',
        'status',

        'accepted_at',
        'completed_at',
    ];

    protected function casts(): array
    {
        return [
            'accepted_at' => 'datetime',
            'completed_at' => 'datetime',
        ];
    }

    // Relationships
    public function customer()
    {
        return $this->belongsTo(User::class, 'customer_id');
    }

    public function driver()
    {
        return $this->belongsTo(User::class, 'driver_id');
    }

    public function chat()
    {
        return $this->hasOne(Chat::class);
    }

    public function governorate()
    {
        return $this->belongsTo(Governorate::class);
    }

    public function region()
    {
        return $this->belongsTo(Region::class);
    }
}
