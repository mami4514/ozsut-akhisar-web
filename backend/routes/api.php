<?php

use App\Http\Controllers\Api\JobApplicationController;
use App\Http\Controllers\Api\PositionController;
use Illuminate\Support\Facades\Route;

Route::get('/positions', [PositionController::class, 'index']);

Route::post(
    '/job-applications',
    [JobApplicationController::class, 'store']
);
Route::get(
    '/job-applications',
    [JobApplicationController::class, 'index']
);