<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Driver extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'license_number',
        'license_image',
        'id_card_front',
        'id_card_back',
        'license_expiry',
        'vehicle_type',
        'vehicle_model',
        'vehicle_plate_number',
        'vehicle_color',
        'vehicle_year',
        'vehicle_image',
        'status',
        'rating',
        'total_trips',
        'total_earnings',
        'is_verified',
        'verified_at',
    ];

    protected function casts(): array
    {
        return [
            'license_expiry' => 'date',
            'rating' => 'decimal:2',
            'total_earnings' => 'decimal:2',
            'is_verified' => 'boolean',
            'verified_at' => 'datetime',
        ];
    }

    // العلاقات
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function cities()
    {
        return $this->belongsToMany(City::class, 'driver_cities');
    }

    public function rides()
    {
        return $this->hasMany(Ride::class, 'driver_id');
    }

    public function packages()
    {
        return $this->hasMany(Package::class, 'driver_id');
    }

    public function reviews()
    {
        return $this->hasMany(DriverReview::class);
    }

    public function completedRides()
    {
        return $this->hasMany(Ride::class, 'driver_id')->where('status', 'completed');
    }

    public function deliveredPackages()
    {
        return $this->hasMany(Package::class, 'driver_id')->where('status', 'delivered');
    }

    // Helper Methods
    public function isAvailable(): bool
    {
        return $this->status === 'available';
    }

    public function isBusy(): bool
    {
        return $this->status === 'busy';
    }

    public function isOffline(): bool
    {
        return $this->status === 'offline';
    }

    public function isVerified(): bool
    {
        return $this->is_verified;
    }
}

