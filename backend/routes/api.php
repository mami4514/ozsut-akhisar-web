<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\JobApplicationController;
use App\Http\Controllers\Api\PositionController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
*/

Route::post('/login', [
    AuthController::class,
    'login',
]);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [
        AuthController::class,
        'me',
    ]);

    Route::post('/logout', [
        AuthController::class,
        'logout',
    ]);

    /*
    |--------------------------------------------------------------------------
    | Dashboard Routes
    |--------------------------------------------------------------------------
    */

    Route::get('/dashboard', [
        DashboardController::class,
        'index',
    ]);
});

/*
|--------------------------------------------------------------------------
| Position Routes
|--------------------------------------------------------------------------
*/

Route::get('/positions', [
    PositionController::class,
    'index',
]);

/*
|--------------------------------------------------------------------------
| Public Job Application Routes
|--------------------------------------------------------------------------
*/

Route::post('/job-applications', [
    JobApplicationController::class,
    'store',
])->middleware('throttle:2,10');

/*
|--------------------------------------------------------------------------
| Protected Job Application Routes
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')
    ->prefix('job-applications')
    ->group(function () {
        Route::get('/', [
            JobApplicationController::class,
            'index',
        ]);

        Route::get('/archive', [
            JobApplicationController::class,
            'archiveIndex',
        ]);

        Route::get('/{id}', [
            JobApplicationController::class,
            'show',
        ]);

        Route::patch('/{id}/status', [
            JobApplicationController::class,
            'updateStatus',
        ]);

        Route::patch('/{id}/archive', [
            JobApplicationController::class,
            'archive',
        ]);

        Route::patch('/{id}/restore', [
            JobApplicationController::class,
            'restore',
        ]);

        Route::delete('/{id}', [
            JobApplicationController::class,
            'forceDelete',
        ]);
    });