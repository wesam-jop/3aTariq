<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        // إنشاء الأدوار
        $adminRole = Role::create(['name' => 'admin']);
        $driverRole = Role::create(['name' => 'driver']);
        $customerRole = Role::create(['name' => 'customer']);

        // إنشاء الصلاحيات
        $permissions = [
            'view_users',
            'create_users',
            'edit_users',
            'delete_users',
            'view_rides',
            'create_rides',
            'edit_rides',
            'delete_rides',
            'view_packages',
            'create_packages',
            'edit_packages',
            'delete_packages',
            'view_cities',
            'create_cities',
            'edit_cities',
            'delete_cities',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // منح صلاحيات للمدير
        $adminRole->givePermissionTo(Permission::all());
    }
}

