<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // مدير النظام
        $admin = User::create([
            'name' => 'مدير النظام',
            'email' => 'admin@wasalni.com',
            'phone' => '0500000000',
            'password' => Hash::make('password'),
            'user_type' => 'admin',
            'phone_verified_at' => now(),
            'is_active' => true,
        ]);
        $admin->assignRole('admin');

        // سائق تجريبي
        $driver1 = User::create([
            'name' => 'أحمد السائق',
            'email' => 'driver1@wasalni.com',
            'phone' => '0501111111',
            'password' => Hash::make('password'),
            'user_type' => 'driver',
            'phone_verified_at' => now(),
            'is_active' => true,
        ]);
        $driver1->assignRole('driver');

        $driver2 = User::create([
            'name' => 'محمد السائق',
            'email' => 'driver2@wasalni.com',
            'phone' => '0502222222',
            'password' => Hash::make('password'),
            'user_type' => 'driver',
            'phone_verified_at' => now(),
            'is_active' => true,
        ]);
        $driver2->assignRole('driver');

        // عملاء تجريبيون
        $customer1 = User::create([
            'name' => 'خالد العميل',
            'email' => 'customer1@wasalni.com',
            'phone' => '0503333333',
            'password' => Hash::make('password'),
            'user_type' => 'customer',
            'phone_verified_at' => now(),
            'wallet_balance' => 1000,
            'is_active' => true,
        ]);
        $customer1->assignRole('customer');

        $customer2 = User::create([
            'name' => 'سارة العميلة',
            'email' => 'customer2@wasalni.com',
            'phone' => '0504444444',
            'password' => Hash::make('password'),
            'user_type' => 'customer',
            'phone_verified_at' => now(),
            'wallet_balance' => 500,
            'is_active' => true,
        ]);
        $customer2->assignRole('customer');
    }
}

