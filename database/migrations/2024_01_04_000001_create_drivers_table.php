<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('drivers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('license_number')->unique();
            $table->string('license_image')->nullable();
            $table->date('license_expiry');
            $table->enum('vehicle_type', ['car', 'motorcycle', 'van', 'truck'])->default('car');
            $table->string('vehicle_model')->nullable();
            $table->string('vehicle_plate_number')->unique();
            $table->string('vehicle_color')->nullable();
            $table->integer('vehicle_year')->nullable();
            $table->string('vehicle_image')->nullable();
            $table->enum('status', ['available', 'busy', 'offline'])->default('offline');
            $table->decimal('rating', 3, 2)->default(0);
            $table->integer('total_trips')->default(0);
            $table->decimal('total_earnings', 10, 2)->default(0);
            $table->boolean('is_verified')->default(false);
            $table->timestamp('verified_at')->nullable();
            $table->timestamps();
        });

        // جدول ربط السائقين بالمدن التي يعملون بها
        Schema::create('driver_cities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('driver_id')->constrained()->onDelete('cascade');
            $table->foreignId('city_id')->constrained()->onDelete('cascade');
            $table->timestamps();
            
            $table->unique(['driver_id', 'city_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('driver_cities');
        Schema::dropIfExists('drivers');
    }
};

