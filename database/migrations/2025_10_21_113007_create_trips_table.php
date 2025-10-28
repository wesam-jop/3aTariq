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
        Schema::create('trips', function (Blueprint $table) {
            $table->id();
            $table->foreignId('driver_id')->constrained('users')->onDelete('cascade');
            $table->string('from_location');
            $table->string('to_location');
            $table->decimal('from_latitude', 10, 8);
            $table->decimal('from_longitude', 11, 8);
            $table->decimal('to_latitude', 10, 8);
            $table->decimal('to_longitude', 11, 8);
            $table->datetime('departure_time');
            $table->integer('available_seats');
            $table->integer('booked_seats')->default(0);
            $table->decimal('price_per_seat', 10, 2);
            $table->text('description')->nullable();
            $table->enum('status', ['active', 'completed', 'cancelled'])->default('active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trips');
    }
};
