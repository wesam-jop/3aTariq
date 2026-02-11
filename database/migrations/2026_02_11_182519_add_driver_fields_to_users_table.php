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
            $table->string('governorate')->nullable()->after('phone_verified_at');
            $table->string('region')->nullable()->after('governorate');
            $table->string('license_plate')->nullable()->after('region');
            $table->string('national_id')->nullable()->after('license_plate');
            $table->string('car_type')->nullable()->after('national_id');
            $table->string('car_model')->nullable()->after('car_type');
            $table->string('transport_type')->nullable()->comment('internal or external')->after('car_model');
            $table->string('identity_image')->nullable()->after('transport_type');
            $table->string('license_image')->nullable()->after('identity_image');
            $table->boolean('is_approved')->default(false)->after('license_image');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'governorate',
                'region',
                'license_plate',
                'national_id',
                'car_type',
                'car_model',
                'transport_type',
                'identity_image',
                'license_image',
                'is_approved',
            ]);
        });
    }
};
