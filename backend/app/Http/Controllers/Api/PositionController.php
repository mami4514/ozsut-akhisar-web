<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Position;
use Illuminate\Http\JsonResponse;

class PositionController extends Controller
{
    /**
     * Aktif pozisyonları listele.
     */
    public function index(): JsonResponse
    {
        $positions = Position::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->get([
                'id',
                'name',
                'slug',
            ]);

        return response()->json([
            'success' => true,
            'data' => $positions,
        ]);
    }
}