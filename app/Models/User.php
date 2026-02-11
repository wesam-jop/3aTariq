<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'phone',
        'email',
        'password',
        'role',
        'user_type',
        'profile_image',
        'is_verified',
        'is_active',
        'fcm_token',
        'latitude',
        'longitude',
        'phone_verified_at',
        'avatar',
        'governorate',
        'region',
        'governorate_id',
        'region_id',
        'license_plate',
        'national_id',
        'car_type',
        'car_model',
        'transport_type',
        'identity_image',
        'license_image',
        'is_approved',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'remember_token',
    ];

    protected $appends = ['avatar_url'];

    public function getAvatarUrlAttribute()
    {
        return $this->avatar ? asset('storage/' . $this->avatar) : null;
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'phone_verified_at' => 'datetime',
            'is_verified' => 'boolean',
            'is_active' => 'boolean',
        ];
    }

    // Relationships
    public function orders()
    {
        return $this->hasMany(Order::class, 'customer_id');
    }

    public function driverOrders()
    {
        return $this->hasMany(Order::class, 'driver_id');
    }

    public function trips()
    {
        return $this->hasMany(Trip::class, 'driver_id');
    }

    public function tripBookings()
    {
        return $this->hasMany(TripBooking::class, 'customer_id');
    }

    public function chatsAsCustomer()
    {
        return $this->hasMany(Chat::class, 'customer_id');
    }

    public function chatsAsDriver()
    {
        return $this->hasMany(Chat::class, 'driver_id');
    }

    public function savedAddresses()
    {
        return $this->hasMany(SavedAddress::class);
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
