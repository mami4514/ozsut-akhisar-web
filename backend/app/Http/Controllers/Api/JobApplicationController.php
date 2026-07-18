<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreJobApplicationRequest;
use App\Services\JobApplicationService;
use Illuminate\Http\JsonResponse;
use Throwable;

class JobApplicationController extends Controller
{
    public function __construct(
        private readonly JobApplicationService $jobApplicationService
    ) {
    }

    /**
     * Yeni iş başvurusu oluştur.
     */
    public function store(
        StoreJobApplicationRequest $request
    ): JsonResponse {
        try {
            $jobApplication = $this->jobApplicationService->create(
                data: $request->validated(),
                cv: $request->file('cv'),
                ipAddress: $request->ip(),
            );

            return response()->json([
                'success' => true,
                'message' => 'Başvurunuz başarıyla alınmıştır.',
                'data' => [
                    'id' => $jobApplication->id,
                    'status' => $jobApplication->status,
                    'applied_at' => $jobApplication->applied_at,
                ],
            ], 201);
        } catch (Throwable $exception) {
            report($exception);

            return response()->json([
                'success' => false,
                'message' => 'Başvuru kaydedilirken bir hata oluştu.',
            ], 500);
        }
    }
}