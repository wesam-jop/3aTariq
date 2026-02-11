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
        Schema::table('trips', function (Blueprint $table) {
            $table->decimal('from_latitude', 10, 8)->nullable()->change();
            $table->decimal('from_longitude', 11, 8)->nullable()->change();
            $table->decimal('to_latitude', 10, 8)->nullable()->change();
            $table->decimal('to_longitude', 11, 8)->nullable()->change();
        });

        Schema::table('orders', function (Blueprint $table) {
            $table->decimal('pickup_latitude', 10, 8)->nullable()->change();
            $table->decimal('pickup_longitude', 11, 8)->nullable()->change();
            $table->decimal('delivery_latitude', 10, 8)->nullable()->change();
            $table->decimal('delivery_longitude', 11, 8)->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('trips', function (Blueprint $table) {
            $table->decimal('from_latitude', 10, 8)->nullable(false)->change();
            $table->decimal('from_longitude', 11, 8)->nullable(false)->change();
            $table->decimal('to_latitude', 10, 8)->nullable(false)->change();
            $table->decimal('to_longitude', 11, 8)->nullable(false)->change();
        });

        Schema::table('orders', function (Blueprint $table) {
            $table->decimal('pickup_latitude', 10, 8)->nullable(false)->change();
            $table->decimal('pickup_longitude', 11, 8)->nullable(false)->change();
            $table->decimal('delivery_latitude', 10, 8)->nullable(false)->change();
            $table->decimal('delivery_longitude', 11, 8)->nullable(false)->change();
        });
    }
};
