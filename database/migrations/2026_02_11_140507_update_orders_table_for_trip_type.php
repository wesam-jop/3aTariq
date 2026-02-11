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
        Schema::table('orders', function (Blueprint $table) {
            $table->enum('trip_type', ['internal', 'external'])->default('external')->after('category');
            $table->foreignId('governorate_id')->nullable()->after('trip_type')->constrained()->onDelete('set null');
            $table->foreignId('region_id')->nullable()->after('governorate_id')->constrained()->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropConstrainedForeignId('governorate_id');
            $table->dropConstrainedForeignId('region_id');
            $table->dropColumn(['trip_type']);
        });
    }
};
