<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens, SoftDeletes, HasRoles;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'phone_verified_at',
        'password',
        'user_type',
        'avatar',
        'wallet_balance',
        'is_active',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'phone_verified_at' => 'datetime',
            'password' => 'hashed',
            'wallet_balance' => 'decimal:2',
            'is_active' => 'boolean',
        ];
    }

    // العلاقات
    public function driver()
    {
        return $this->hasOne(Driver::class);
    }

    public function ridesAsCustomer()
    {
        return $this->hasMany(Ride::class, 'customer_id');
    }

    public function ridesAsDriver()
    {
        return $this->hasMany(Ride::class, 'driver_id');
    }

    public function packagesAsCustomer()
    {
        return $this->hasMany(Package::class, 'customer_id');
    }

    public function packagesAsDriver()
    {
        return $this->hasMany(Package::class, 'driver_id');
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    public function deviceTokens()
    {
        return $this->hasMany(DeviceToken::class);
    }

    // Helper Methods
    public function isDriver(): bool
    {
        return $this->user_type === 'driver';
    }

    public function isCustomer(): bool
    {
        return $this->user_type === 'customer';
    }

    public function isAdmin(): bool
    {
        return $this->user_type === 'admin';
    }
}

