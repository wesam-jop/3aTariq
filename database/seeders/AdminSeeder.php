<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['phone' => '0912345678'],
            [
                'name' => 'مدير النظام',
                'email' => 'admin@3atariq.com',
                'password' => Hash::make('admin123'),
                'role' => 'admin',
                'is_verified' => true,
                'is_active' => true,
            ]
        );
    }
}
