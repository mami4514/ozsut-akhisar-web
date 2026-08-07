<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Symfony\Component\HttpKernel\Exception\TooManyRequestsHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        //
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->render(
            function (
                TooManyRequestsHttpException $exception
            ) {
                return response()->json([
                    'success' => false,
                    'message' =>
                        'Çok fazla başvuru gönderdiniz. Lütfen 10 dakika sonra tekrar deneyiniz.',
                ], 429);
            }
        );
    })
    ->create();