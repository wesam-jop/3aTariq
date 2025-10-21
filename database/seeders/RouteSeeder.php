<?php

namespace Database\Seeders;

use App\Models\Route;
use App\Models\City;
use Illuminate\Database\Seeder;

class RouteSeeder extends Seeder
{
    public function run(): void
    {
        // الحصول على المدن السورية
        $damascus = City::where('name_en', 'Damascus')->first();
        $aleppo = City::where('name_en', 'Aleppo')->first();
        $homs = City::where('name_en', 'Homs')->first();
        $hama = City::where('name_en', 'Hama')->first();
        $latakia = City::where('name_en', 'Latakia')->first();

        $routes = [
            [
                'from_city_id' => $damascus->id,
                'to_city_id' => $aleppo->id,
                'distance_km' => 355,
                'estimated_duration_minutes' => 240,
                'base_price' => 50,
            ],
            [
                'from_city_id' => $aleppo->id,
                'to_city_id' => $damascus->id,
                'distance_km' => 355,
                'estimated_duration_minutes' => 240,
                'base_price' => 50,
            ],
            [
                'from_city_id' => $damascus->id,
                'to_city_id' => $homs->id,
                'distance_km' => 162,
                'estimated_duration_minutes' => 120,
                'base_price' => 25,
            ],
            [
                'from_city_id' => $homs->id,
                'to_city_id' => $damascus->id,
                'distance_km' => 162,
                'estimated_duration_minutes' => 120,
                'base_price' => 25,
            ],
            [
                'from_city_id' => $homs->id,
                'to_city_id' => $hama->id,
                'distance_km' => 47,
                'estimated_duration_minutes' => 40,
                'base_price' => 10,
            ],
            [
                'from_city_id' => $hama->id,
                'to_city_id' => $homs->id,
                'distance_km' => 47,
                'estimated_duration_minutes' => 40,
                'base_price' => 10,
            ],
            [
                'from_city_id' => $damascus->id,
                'to_city_id' => $latakia->id,
                'distance_km' => 331,
                'estimated_duration_minutes' => 240,
                'base_price' => 45,
            ],
            [
                'from_city_id' => $latakia->id,
                'to_city_id' => $damascus->id,
                'distance_km' => 331,
                'estimated_duration_minutes' => 240,
                'base_price' => 45,
            ],
        ];

        foreach ($routes as $route) {
            Route::create($route);
        }
    }
}

