<?php

namespace Database\Seeders;

use App\Models\City;
use Illuminate\Database\Seeder;

class CitySeeder extends Seeder
{
    public function run(): void
    {
        $cities = [
            ['name_ar' => 'دمشق', 'name_en' => 'Damascus', 'latitude' => 33.5138, 'longitude' => 36.2765],
            ['name_ar' => 'حلب', 'name_en' => 'Aleppo', 'latitude' => 36.2021, 'longitude' => 37.1343],
            ['name_ar' => 'حمص', 'name_en' => 'Homs', 'latitude' => 34.7298, 'longitude' => 36.7184],
            ['name_ar' => 'حماة', 'name_en' => 'Hama', 'latitude' => 35.1324, 'longitude' => 36.7500],
            ['name_ar' => 'اللاذقية', 'name_en' => 'Latakia', 'latitude' => 35.5310, 'longitude' => 35.7914],
            ['name_ar' => 'طرطوس', 'name_en' => 'Tartus', 'latitude' => 34.8899, 'longitude' => 35.8869],
            ['name_ar' => 'إدلب', 'name_en' => 'Idlib', 'latitude' => 35.9283, 'longitude' => 36.6333],
            ['name_ar' => 'درعا', 'name_en' => 'Daraa', 'latitude' => 32.6189, 'longitude' => 36.1021],
            ['name_ar' => 'السويداء', 'name_en' => 'As-Suwayda', 'latitude' => 32.7094, 'longitude' => 36.5694],
            ['name_ar' => 'القامشلي', 'name_en' => 'Qamishli', 'latitude' => 37.0520, 'longitude' => 41.2260],
        ];

        foreach ($cities as $city) {
            City::create([
                'name_ar' => $city['name_ar'],
                'name_en' => $city['name_en'],
                'latitude' => $city['latitude'],
                'longitude' => $city['longitude'],
                'is_active' => true,
            ]);
        }
    }
}

