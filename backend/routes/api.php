<?php

use App\Http\Controllers\Api\JobApplicationController;
use App\Http\Controllers\Api\PositionController;
use Illuminate\Support\Facades\Route;

Route::get('/positions', [PositionController::class, 'index']);

Route::prefix('job-applications')->group(function () {

    Route::get('/', [JobApplicationController::class, 'index']);

    Route::get('/{id}', [JobApplicationController::class, 'show']);

    Route::post('/', [JobApplicationController::class, 'store']);

    Route::patch('/{id}/status', [JobApplicationController::class, 'updateStatus']);

});