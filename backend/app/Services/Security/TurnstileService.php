<?php

namespace App\Services\Security;

use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\PendingRequest;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class TurnstileService
{
    private const VERIFY_URL =
        'https://challenges.cloudflare.com/turnstile/v0/siteverify';

    /**
     * Turnstile token'ını Cloudflare üzerinden doğrular.
     */
    public function verify(
        string $token,
        ?string $ipAddress = null
    ): bool {
        $secretKey = config('services.turnstile.secret_key');

        if (!is_string($secretKey) || trim($secretKey) === '') {
            Log::error(
                'Turnstile secret key yapılandırılmamış.'
            );

            return false;
        }

        if (trim($token) === '') {
            return false;
        }

        try {
            $request = Http::asForm();

            /*
             * Windows localhost ortamındaki CA sertifikası
             * probleminden dolayı yalnızca local ortamda
             * SSL sertifika doğrulamasını kapatıyoruz.
             *
             * Production ortamında SSL doğrulaması açık kalır.
             */
            if (app()->isLocal()) {
                $request = $request->withoutVerifying();
            }

            $response = $this
                ->configureRequest($request)
                ->post(self::VERIFY_URL, [
                    'secret' => $secretKey,
                    'response' => $token,
                    'remoteip' => $ipAddress,
                ]);
        } catch (ConnectionException $exception) {
            Log::warning(
                'Turnstile doğrulama servisine bağlanılamadı.',
                [
                    'message' => $exception->getMessage(),
                    'ip_address' => $ipAddress,
                ]
            );

            return false;
        }

        if (!$response->successful()) {
            Log::warning(
                'Turnstile doğrulama servisi başarısız HTTP cevabı döndürdü.',
                [
                    'status' => $response->status(),
                    'ip_address' => $ipAddress,
                ]
            );

            return false;
        }

        $result = $response->json();

        if (!is_array($result)) {
            Log::warning(
                'Turnstile doğrulama cevabı geçersiz formatta.'
            );

            return false;
        }

        $isSuccessful = (bool) ($result['success'] ?? false);

        if (!$isSuccessful) {
            Log::notice(
                'Turnstile doğrulaması başarısız.',
                [
                    'error_codes' =>
                        $result['error-codes'] ?? [],
                    'hostname' =>
                        $result['hostname'] ?? null,
                    'ip_address' => $ipAddress,
                ]
            );
        }

        return $isSuccessful;
    }

    /**
     * Turnstile HTTP isteğini yapılandırır.
     */
    private function configureRequest(
        PendingRequest $request
    ): PendingRequest {
        return $request
            ->timeout(10)
            ->retry(
                times: 2,
                sleepMilliseconds: 250,
                throw: false
            );
    }
}