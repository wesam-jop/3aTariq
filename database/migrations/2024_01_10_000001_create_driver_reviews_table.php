<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('driver_reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('driver_id')->constrained('drivers')->onDelete('cascade');
            $table->foreignId('customer_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('ride_id')->nullable()->constrained('rides')->onDelete('set null');
            $table->integer('rating'); // من 1 إلى 5
            $table->text('comment')->nullable();
            $table->timestamps();
            
            // منع التقييم المكرر للرحلة الواحدة
            $table->unique(['ride_id', 'customer_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('driver_reviews');
    }
};

