<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreJobApplicationRequest;
use App\Http\Requests\UpdateJobApplicationStatusRequest;
use App\Http\Resources\JobApplicationDetailResource;
use App\Http\Resources\JobApplicationResource;
use App\Services\JobApplicationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Throwable;

class JobApplicationController extends Controller
{
    public function __construct(
        private readonly JobApplicationService $jobApplicationService
    ) {
    }

    /**
     * İş başvurularını listele.
     */
    public function index(Request $request): JsonResponse
    {
        $jobApplications = $this->jobApplicationService
            ->getPaginated($request);

        return response()->json([
            'success' => true,
            'data' => JobApplicationResource::collection($jobApplications),
            'meta' => [
                'current_page' => $jobApplications->currentPage(),
                'last_page' => $jobApplications->lastPage(),
                'per_page' => $jobApplications->perPage(),
                'total' => $jobApplications->total(),
            ],
        ]);
    }

    /**
     * İş başvurusu detayını getir.
     */
    public function show(int $id): JsonResponse
    {
        try {
            $jobApplication = $this->jobApplicationService
                ->findById($id);

            return response()->json([
                'success' => true,
                'data' => new JobApplicationDetailResource(
                    $jobApplication
                ),
            ]);
        } catch (Throwable $exception) {
            report($exception);

            return response()->json([
                'success' => false,
                'message' => 'İş başvurusu bulunamadı.',
            ], 404);
        }
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

            $jobApplication->load('position');

            return response()->json([
                'success' => true,
                'message' => 'Başvurunuz başarıyla alınmıştır.',
                'data' => new JobApplicationResource(
                    $jobApplication
                ),
            ], 201);
        } catch (Throwable $exception) {
            report($exception);

            return response()->json([
                'success' => false,
                'message' => 'Başvuru kaydedilirken bir hata oluştu.',
            ], 500);
        }
    }

    /**
     * İş başvurusu durumunu güncelle.
     */
    public function updateStatus(
        UpdateJobApplicationStatusRequest $request,
        int $id
    ): JsonResponse {
        try {
            $validated = $request->validated();

            $jobApplication = $this->jobApplicationService->updateStatus(
                id: $id,
                status: $validated['status'],
                adminNote: $validated['admin_note'] ?? null,
            );

            return response()->json([
                'success' => true,
                'message' => 'Başvuru durumu başarıyla güncellendi.',
                'data' => new JobApplicationDetailResource(
                    $jobApplication
                ),
            ]);
        } catch (Throwable $exception) {
            report($exception);

            return response()->json([
                'success' => false,
                'message' =>
                    'İş başvurusu bulunamadı veya güncellenemedi.',
            ], 404);
        }
    }
}