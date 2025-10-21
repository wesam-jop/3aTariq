<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('routes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('from_city_id')->constrained('cities')->onDelete('cascade');
            $table->foreignId('to_city_id')->constrained('cities')->onDelete('cascade');
            $table->decimal('distance_km', 8, 2);
            $table->integer('estimated_duration_minutes');
            $table->decimal('base_price', 10, 2);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            
            $table->unique(['from_city_id', 'to_city_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('routes');
    }
};

