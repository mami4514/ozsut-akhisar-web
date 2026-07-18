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
        Schema::create('job_applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('position_id')
              ->constrained()
              ->cascadeOnDelete();

            $table->string('first_name');
            $table->string('last_name');

            $table->string('phone');
            $table->string('email');

            $table->enum('gender', ['male', 'female'])->nullable();

            $table->date('birth_date')->nullable();

            $table->string('city');
            $table->string('district')->nullable();

            $table->unsignedTinyInteger('experience')->default(0);

            $table->text('about')->nullable();

            $table->string('cv_path');

            $table->string('status')->default('Yeni');

            $table->text('admin_note')->nullable();

            $table->ipAddress('ip_address')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_applications');
    }
};
