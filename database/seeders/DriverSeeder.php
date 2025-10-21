<?php

namespace Database\Seeders;

use App\Models\Driver;
use App\Models\User;
use App\Models\City;
use Illuminate\Database\Seeder;

class DriverSeeder extends Seeder
{
    public function run(): void
    {
        $drivers = User::where('user_type', 'driver')->get();
        $cities = City::all();
        
        $vehicleTypes = ['car', 'van', 'motorcycle'];
        $vehicleModels = [
            'car' => ['تويوتا كامري', 'هيونداي النترا', 'كيا سيراتو', 'مازدا 3'],
            'van' => ['هيونداي H1', 'كيا كارنفال', 'تويوتا هايس'],
            'motorcycle' => ['هوندا', 'ياماها', 'سوزوكي'],
        ];
        $vehicleColors = ['أبيض', 'أسود', 'فضي', 'أزرق', 'أحمر', 'رمادي'];

        foreach ($drivers as $index => $driverUser) {
            $vehicleType = $vehicleTypes[$index % count($vehicleTypes)];
            $models = $vehicleModels[$vehicleType];
            $vehicleModel = $models[$index % count($models)];
            
            // أول سائق موافق عليه، والباقي في انتظار الموافقة
            $isVerified = $index === 0;
            
            $driver = Driver::create([
                'user_id' => $driverUser->id,
                'license_number' => 'LIC' . str_pad($index + 1, 6, '0', STR_PAD_LEFT),
                'license_image' => 'licenses/sample-license-' . ($index + 1) . '.jpg',
                'id_card_front' => 'id_cards/front-' . ($index + 1) . '.jpg',
                'id_card_back' => 'id_cards/back-' . ($index + 1) . '.jpg',
                'license_expiry' => now()->addYears(rand(1, 3)),
                'vehicle_type' => $vehicleType,
                'vehicle_model' => $vehicleModel,
                'vehicle_plate_number' => 'SYR' . str_pad($index + 1, 4, '0', STR_PAD_LEFT),
                'vehicle_color' => $vehicleColors[$index % count($vehicleColors)],
                'vehicle_year' => rand(2015, 2024),
                'vehicle_image' => 'vehicles/sample-vehicle-' . ($index + 1) . '.jpg',
                'status' => $isVerified ? 'available' : 'offline',
                'rating' => $isVerified ? (4.0 + (rand(0, 10) / 10)) : 0,
                'total_trips' => $isVerified ? rand(10, 100) : 0,
                'total_earnings' => $isVerified ? rand(500, 5000) : 0,
                'is_verified' => $isVerified,
                'verified_at' => $isVerified ? now() : null,
            ]);

            // ربط السائق بالمدن (1-3 مدن عشوائية)
            $randomCities = $cities->random(rand(1, min(3, $cities->count())));
            $driver->cities()->attach($randomCities->pluck('id'));
        }
    }
}

