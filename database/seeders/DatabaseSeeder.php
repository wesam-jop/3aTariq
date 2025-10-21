<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            UserSeeder::class,
            CitySeeder::class,
            RouteSeeder::class,
            DriverSeeder::class,
            ReviewSeeder::class,
            SettingSeeder::class,
        ]);
    }
}

