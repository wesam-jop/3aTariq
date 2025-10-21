<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // إضافة سعر الكيلومتر للنقل الخاص
        DB::table('settings')->insert([
            'key' => 'private_price_per_km',
            'value' => '1.00', // $1.00 للكيلومتر (نقل خاص)
            'type' => 'number',
            'group' => 'pricing',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // إضافة سعر الكيلومتر للنقل العام
        DB::table('settings')->insert([
            'key' => 'public_price_per_km',
            'value' => '0.50', // $0.50 للكيلومتر (نقل عام)
            'type' => 'number',
            'group' => 'pricing',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::table('settings')->whereIn('key', ['private_price_per_km', 'public_price_per_km'])->delete();
    }
};
