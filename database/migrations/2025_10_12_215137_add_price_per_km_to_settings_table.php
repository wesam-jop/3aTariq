<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // إضافة إعداد سعر الكيلومتر
        DB::table('settings')->insert([
            'key' => 'price_per_km',
            'value' => '5000', // السعر الافتراضي 5000 ليرة سورية للكيلومتر
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::table('settings')->where('key', 'price_per_km')->delete();
    }
};
