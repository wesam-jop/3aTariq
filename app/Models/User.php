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
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'remember_token',
    ];

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
}
