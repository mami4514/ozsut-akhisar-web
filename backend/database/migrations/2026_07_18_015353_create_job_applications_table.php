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

            // Applied position
            $table->foreignId('position_id')
                ->constrained()
                ->cascadeOnDelete();

            // Personal information
            $table->string('first_name');
            $table->string('last_name');
            $table->string('phone');
            $table->string('email')->index();

            $table->enum('gender', [
                'male',
                'female',
            ])->nullable();

            $table->date('birth_date')->nullable();

            $table->string('city');
            $table->string('district')->nullable();

            // Career information
            $table->unsignedTinyInteger('experience')->default(0);

            $table->enum('education_level', [
                'primary_school',
                'middle_school',
                'high_school',
                'associate_degree',
                'bachelor_degree',
                'master_degree',
                'doctorate',
            ]);

            $table->enum('employment_type', [
                'full_time',
                'part_time',
            ]);

            $table->enum('military_status', [
                'completed',
                'deferred',
                'exempt',
                'not_completed',
            ])->nullable();

            $table->string('driver_license')->nullable();

            $table->boolean('smoker')->nullable();

            $table->boolean('shift_available')->default(false);

            // Candidate description
            $table->text('about')->nullable();

            // Uploaded CV path
            $table->string('cv_path');

            // Privacy consent
            $table->boolean('kvkk_approved')->default(false);

            // Application management
            $table->timestamp('applied_at')->useCurrent();

            $table->enum('status', [
                'new',
                'reviewing',
                'interview',
                'accepted',
                'rejected',
            ])->default('new');

            $table->text('admin_note')->nullable();

            $table->ipAddress('ip_address')->nullable();

            $table->timestamps();

            // Useful admin panel indexes
            $table->index(['status', 'created_at']);
            $table->index(['position_id', 'status']);
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