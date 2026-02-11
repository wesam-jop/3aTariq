<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('user_type')->nullable()->after('role');
            $table->string('profile_image')->nullable()->after('user_type');
            $table->boolean('is_verified')->default(false)->after('profile_image');
            $table->boolean('is_active')->default(true)->after('is_verified');
            $table->string('fcm_token')->nullable()->after('is_active');
            $table->decimal('latitude', 10, 8)->nullable()->after('fcm_token');
            $table->decimal('longitude', 11, 8)->nullable()->after('latitude');
            $table->timestamp('phone_verified_at')->nullable()->after('longitude');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'user_type',
                'profile_image',
                'is_verified',
                'is_active',
                'fcm_token',
                'latitude',
                'longitude',
                'phone_verified_at',
            ]);
        });
    }

};
