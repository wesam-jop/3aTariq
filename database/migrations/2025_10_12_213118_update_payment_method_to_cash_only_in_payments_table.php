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
        // First, update any non-cash payment methods to cash
        DB::table('payments')
            ->whereNotIn('payment_method', ['cash'])
            ->update(['payment_method' => 'cash']);
            
        // Modify the column to only accept 'cash'
        DB::statement("ALTER TABLE payments MODIFY COLUMN payment_method ENUM('cash') NOT NULL DEFAULT 'cash'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Restore the original enum values
        DB::statement("ALTER TABLE payments MODIFY COLUMN payment_method ENUM('cash', 'wallet', 'card', 'stripe') NOT NULL DEFAULT 'cash'");
    }
};
