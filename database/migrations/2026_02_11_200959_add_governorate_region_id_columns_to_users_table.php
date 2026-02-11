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
        Schema::table('users', function (Blueprint $table) {
            if (!Schema::hasColumn('users', 'governorate_id')) {
                $table->unsignedBigInteger('governorate_id')->nullable()->after('governorate');
                $table->foreign('governorate_id')->references('id')->on('governorates')->onDelete('set null');
            }
            
            if (!Schema::hasColumn('users', 'region_id')) {
                $table->unsignedBigInteger('region_id')->nullable()->after('region');
                $table->foreign('region_id')->references('id')->on('regions')->onDelete('set null');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            if (Schema::hasColumn('users', 'governorate_id')) {
                $table->dropForeign(['governorate_id']);
                $table->dropColumn('governorate_id');
            }
            
            if (Schema::hasColumn('users', 'region_id')) {
                $table->dropForeign(['region_id']);
                $table->dropColumn('region_id');
            }
        });
    }
};
