<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            ['key' => 'commission_percentage', 'value' => '10', 'type' => 'number', 'group' => 'pricing'],
            ['key' => 'base_price_per_km', 'value' => '5', 'type' => 'number', 'group' => 'pricing'],
            ['key' => 'price_per_passenger', 'value' => '10', 'type' => 'number', 'group' => 'pricing'],
            ['key' => 'base_package_price', 'value' => '50', 'type' => 'number', 'group' => 'pricing'],
            ['key' => 'price_per_kg', 'value' => '5', 'type' => 'number', 'group' => 'pricing'],
            ['key' => 'app_name', 'value' => 'وصلني', 'type' => 'string', 'group' => 'general'],
            ['key' => 'support_phone', 'value' => '0500000000', 'type' => 'string', 'group' => 'general'],
            ['key' => 'support_email', 'value' => 'support@wasalni.com', 'type' => 'string', 'group' => 'general'],
            ['key' => 'maintenance_mode', 'value' => 'false', 'type' => 'boolean', 'group' => 'general'],
        ];

        foreach ($settings as $setting) {
            Setting::create($setting);
        }
    }
}

