<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('packages', function (Blueprint $table) {
            $table->id();
            $table->string('package_number')->unique();
            $table->foreignId('customer_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('driver_id')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('from_city_id')->constrained('cities')->onDelete('cascade');
            $table->foreignId('to_city_id')->constrained('cities')->onDelete('cascade');
            $table->enum('package_type', ['document', 'food', 'medicine', 'goods', 'other'])->default('goods');
            $table->string('package_description')->nullable();
            $table->decimal('weight_kg', 8, 2)->nullable();
            $table->string('sender_name');
            $table->string('sender_phone');
            $table->text('sender_address');
            $table->decimal('sender_lat', 10, 8)->nullable();
            $table->decimal('sender_lng', 11, 8)->nullable();
            $table->string('receiver_name');
            $table->string('receiver_phone');
            $table->text('receiver_address');
            $table->decimal('receiver_lat', 10, 8)->nullable();
            $table->decimal('receiver_lng', 11, 8)->nullable();
            $table->dateTime('scheduled_pickup_at')->nullable();
            $table->dateTime('picked_at')->nullable();
            $table->dateTime('delivered_at')->nullable();
            $table->dateTime('cancelled_at')->nullable();
            $table->enum('status', ['pending', 'accepted', 'picked', 'in_transit', 'delivered', 'cancelled'])->default('pending');
            $table->decimal('price', 10, 2);
            $table->decimal('driver_earning', 10, 2)->nullable();
            $table->decimal('commission', 10, 2)->nullable();
            $table->enum('payment_method', ['cash', 'wallet', 'card'])->default('cash');
            $table->enum('payment_status', ['pending', 'paid', 'refunded'])->default('pending');
            $table->integer('rating')->nullable();
            $table->text('review')->nullable();
            $table->text('notes')->nullable();
            $table->text('cancellation_reason')->nullable();
            $table->string('delivery_image')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('packages');
    }
};

