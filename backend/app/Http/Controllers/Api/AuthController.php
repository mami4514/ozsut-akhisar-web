<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use App\Services\AuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    /**
     * AuthService bağımlılığını controller'a enjekte et.
     */
    public function __construct(
        private readonly AuthService $authService
    ) {
    }

    /**
     * Kullanıcı girişini gerçekleştir.
     */
    public function login(LoginRequest $request): JsonResponse
    {
        $result = $this->authService->login(
            $request->validated()
        );

        return response()->json([
            'success' => true,
            'message' => 'Giriş başarıyla gerçekleştirildi.',
            'data' => [
                'user' => [
                    'id' => $result['user']->id,
                    'name' => $result['user']->name,
                    'email' => $result['user']->email,
                ],
                'access_token' => $result['token'],
                'token_type' => $result['token_type'],
            ],
        ]);
    }

    /**
     * Giriş yapmış kullanıcıyı getir.
     */
    public function me(Request $request): JsonResponse
    {
        /** @var User $user */
        $user = $request->user();

        $authenticatedUser = $this->authService->me($user);

        return response()->json([
            'success' => true,
            'message' => 'Kullanıcı bilgileri başarıyla getirildi.',
            'data' => [
                'user' => [
                    'id' => $authenticatedUser->id,
                    'name' => $authenticatedUser->name,
                    'email' => $authenticatedUser->email,
                ],
            ],
        ]);
    }

    /**
     * Kullanıcının mevcut access token'ını iptal et.
     */
    public function logout(Request $request): JsonResponse
    {
        /** @var User $user */
        $user = $request->user();

        $this->authService->logout($user);

        return response()->json([
            'success' => true,
            'message' => 'Çıkış başarıyla gerçekleştirildi.',
        ]);
    }
}