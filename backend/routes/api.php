<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\JobApplicationController;
use App\Http\Controllers\Api\PositionController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
*/

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

/*
|--------------------------------------------------------------------------
| Position Routes
|--------------------------------------------------------------------------
*/

Route::get('/positions', [PositionController::class, 'index']);

/*
|--------------------------------------------------------------------------
| Job Application Routes
|--------------------------------------------------------------------------
*/

Route::prefix('job-applications')->group(function () {
    Route::get('/', [JobApplicationController::class, 'index']);

    Route::get('/{id}', [JobApplicationController::class, 'show']);

    Route::post('/', [JobApplicationController::class, 'store']);

    Route::patch(
        '/{id}/status',
        [JobApplicationController::class, 'updateStatus']
    );
});