<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    use HasFactory;

    protected $fillable = [
        'name_ar',
        'name_en',
        'latitude',
        'longitude',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'latitude' => 'decimal:8',
            'longitude' => 'decimal:8',
            'is_active' => 'boolean',
        ];
    }

    // العلاقات
    public function routesFrom()
    {
        return $this->hasMany(Route::class, 'from_city_id');
    }

    public function routesTo()
    {
        return $this->hasMany(Route::class, 'to_city_id');
    }

    public function drivers()
    {
        return $this->belongsToMany(Driver::class, 'driver_cities');
    }

    public function packagesFrom()
    {
        return $this->hasMany(Package::class, 'from_city_id');
    }

    public function packagesTo()
    {
        return $this->hasMany(Package::class, 'to_city_id');
    }

    // Accessor
    public function getNameAttribute()
    {
        return app()->getLocale() === 'ar' ? $this->name_ar : $this->name_en;
    }
}

