<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Laravel\Sanctum\PersonalAccessToken;

class AuthService
{
    /**
     * Kullanıcı girişini gerçekleştir ve access token oluştur.
     *
     * @param  array{email: string, password: string}  $credentials
     * @return array{
     *     user: User,
     *     token: string,
     *     token_type: string
     * }
     *
     * @throws ValidationException
     */
    public function login(array $credentials): array
    {
        $user = User::query()
            ->where('email', $credentials['email'])
            ->first();

        if (
            ! $user ||
            ! Hash::check($credentials['password'], $user->password)
        ) {
            throw ValidationException::withMessages([
                'email' => [
                    'E-posta adresi veya şifre hatalı.',
                ],
            ]);
        }

        // Bu proje şimdilik hesap başına tek aktif oturum kullanıyor.
        $user->tokens()->delete();

        $token = $user
            ->createToken('admin-panel')
            ->plainTextToken;

        return [
            'user' => $user,
            'token' => $token,
            'token_type' => 'Bearer',
        ];
    }

    /**
     * Kullanıcının mevcut access token'ını silerek çıkış yap.
     */
    public function logout(User $user): void
    {
        $currentAccessToken = $user->currentAccessToken();

        if ($currentAccessToken instanceof PersonalAccessToken) {
            $currentAccessToken->delete();
        }
    }

    /**
     * Giriş yapmış kullanıcıyı getir.
     */
    public function me(User $user): User
    {
        return $user;
    }
}