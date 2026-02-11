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
            $table->string('category')->default('goods')->after('driver_id'); // passenger, goods
            // Note: In SQLite, changing columns involves recreating the table. 
            // We'll use a string for status in migrations if we were starting fresh, 
            // but for now let's try to add the column. 
            // If the user is on SQLite, adding a default 'pending' is safe.
            // We'll handle 'pending_review' logic in the application layer or via a new migration if needed.
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn('category');
        });
    }

};
