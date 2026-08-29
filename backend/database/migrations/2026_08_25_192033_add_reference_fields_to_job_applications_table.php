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
        Schema::table('job_applications', function (Blueprint $table) {
            $table
                ->string('reference_name', 200)
                ->nullable()
                ->after('about');

            $table
                ->string('reference_phone', 30)
                ->nullable()
                ->after('reference_name');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('job_applications', function (Blueprint $table) {
            $table->dropColumn([
                'reference_name',
                'reference_phone',
            ]);
        });
    }
};