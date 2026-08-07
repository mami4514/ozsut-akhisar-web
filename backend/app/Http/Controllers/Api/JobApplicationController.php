<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreJobApplicationRequest;
use App\Http\Requests\UpdateJobApplicationStatusRequest;
use App\Http\Resources\JobApplicationDetailResource;
use App\Http\Resources\JobApplicationResource;
use App\Services\JobApplicationService;
use App\Services\Security\TurnstileService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Throwable;

class JobApplicationController extends Controller
{
    public function __construct(
        private readonly JobApplicationService $jobApplicationService,
        private readonly TurnstileService $turnstileService,
    ) {
    }

    /**
     * Aktif iş başvurularını listele.
     */
    public function index(Request $request): JsonResponse
    {
        $jobApplications = $this->jobApplicationService
            ->getPaginated($request);

        return response()->json([
            'success' => true,
            'data' => JobApplicationResource::collection(
                $jobApplications
            ),
            'meta' => [
                'current_page' => $jobApplications->currentPage(),
                'last_page' => $jobApplications->lastPage(),
                'per_page' => $jobApplications->perPage(),
                'total' => $jobApplications->total(),
            ],
        ]);
    }

    /**
     * Arşivlenmiş iş başvurularını listele.
     */
    public function archiveIndex(
        Request $request
    ): JsonResponse {
        $jobApplications = $this->jobApplicationService
            ->getArchivedPaginated($request);

        return response()->json([
            'success' => true,
            'data' => JobApplicationResource::collection(
                $jobApplications
            ),
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
                'message' =>
                    'İş başvurusu bulunamadı.',
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
            /*
             * Aynı e-posta veya telefon numarası ile
             * son 24 saat içinde tekrar başvuru yapılmasını
             * engelliyoruz.
             */
            $hasRecentApplication =
                $this->jobApplicationService
                    ->hasRecentApplication(
                        email: $request
                            ->string('email')
                            ->toString(),
                        phone: $request
                            ->string('phone')
                            ->toString(),
                    );

            if ($hasRecentApplication) {
                return response()->json([
                    'success' => false,
                    'message' =>
                        'Bu e-posta adresi veya telefon numarası ile son 24 saat içerisinde bir başvuru yapılmıştır. Lütfen daha sonra tekrar deneyiniz.',
                ], 409);
            }

            /*
             * Cloudflare Turnstile doğrulaması.
             */
            $isVerified = $this->turnstileService->verify(
                token: $request
                    ->string('turnstile_token')
                    ->toString(),
                ipAddress: $request->ip(),
            );

            if (!$isVerified) {
                return response()->json([
                    'success' => false,
                    'message' =>
                        'Robot doğrulaması başarısız. Lütfen tekrar deneyiniz.',
                ], 403);
            }

            $jobApplication =
                $this->jobApplicationService->create(
                    data: $request->validated(),
                    cv: $request->file('cv'),
                    ipAddress: $request->ip(),
                );

            $jobApplication->load('position');

            return response()->json([
                'success' => true,
                'message' =>
                    'Başvurunuz başarıyla alınmıştır.',
                'data' => new JobApplicationResource(
                    $jobApplication
                ),
            ], 201);
        } catch (Throwable $exception) {
            report($exception);

            return response()->json([
                'success' => false,
                'message' =>
                    'Başvuru kaydedilirken bir hata oluştu.',
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

            $jobApplication =
                $this->jobApplicationService->updateStatus(
                    id: $id,
                    status: $validated['status'],
                    adminNote:
                        $validated['admin_note'] ?? null,
                );

            return response()->json([
                'success' => true,
                'message' =>
                    'Başvuru durumu başarıyla güncellendi.',
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

    /**
     * İş başvurusunu arşivle.
     */
    public function archive(int $id): JsonResponse
    {
        try {
            $this->jobApplicationService->archive($id);

            return response()->json([
                'success' => true,
                'message' =>
                    'İş başvurusu başarıyla arşivlendi.',
            ]);
        } catch (Throwable $exception) {
            report($exception);

            return response()->json([
                'success' => false,
                'message' =>
                    'İş başvurusu bulunamadı veya arşivlenemedi.',
            ], 404);
        }
    }

    /**
     * Arşivlenmiş iş başvurusunu geri yükle.
     */
    public function restore(int $id): JsonResponse
    {
        try {
            $jobApplication =
                $this->jobApplicationService->restore($id);

            return response()->json([
                'success' => true,
                'message' =>
                    'İş başvurusu başarıyla geri yüklendi.',
                'data' => new JobApplicationDetailResource(
                    $jobApplication
                ),
            ]);
        } catch (Throwable $exception) {
            report($exception);

            return response()->json([
                'success' => false,
                'message' =>
                    'Arşivlenmiş iş başvurusu bulunamadı.',
            ], 404);
        }
    }

    /**
     * Arşivlenmiş iş başvurusunu kalıcı sil.
     */
    public function forceDelete(int $id): JsonResponse
    {
        try {
            $this->jobApplicationService->forceDelete($id);

            return response()->json([
                'success' => true,
                'message' =>
                    'İş başvurusu kalıcı olarak silindi.',
            ]);
        } catch (Throwable $exception) {
            report($exception);

            return response()->json([
                'success' => false,
                'message' =>
                    'Arşivlenmiş iş başvurusu bulunamadı veya silinemedi.',
            ], 404);
        }
    }
}