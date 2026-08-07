<?php

namespace App\Services;

use App\Models\JobApplication;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Throwable;

class JobApplicationService
{
    /**
     * Aktif iş başvurularını arama, filtreleme ve sayfalama ile getirir.
     */
    public function getPaginated(
        Request $request
    ): LengthAwarePaginator {
        $search = trim(
            (string) $request->query('search', '')
        );

        $status = $request->query('status');
        $positionId = $request->query('position_id');

        return JobApplication::query()
            ->with('position')
            ->when(
                $search !== '',
                function ($query) use ($search): void {
                    $query->where(
                        function ($subQuery) use ($search): void {
                            $subQuery
                                ->where(
                                    'first_name',
                                    'like',
                                    "%{$search}%"
                                )
                                ->orWhere(
                                    'last_name',
                                    'like',
                                    "%{$search}%"
                                )
                                ->orWhere(
                                    'phone',
                                    'like',
                                    "%{$search}%"
                                )
                                ->orWhere(
                                    'email',
                                    'like',
                                    "%{$search}%"
                                );
                        }
                    );
                }
            )
            ->when(
                filled($status),
                fn ($query) => $query->where(
                    'status',
                    $status
                )
            )
            ->when(
                filled($positionId),
                fn ($query) => $query->where(
                    'position_id',
                    $positionId
                )
            )
            ->latest('applied_at')
            ->paginate(10)
            ->withQueryString();
    }

    /**
     * Arşivlenmiş iş başvurularını arama,
     * filtreleme ve sayfalama ile getirir.
     */
    public function getArchivedPaginated(
        Request $request
    ): LengthAwarePaginator {
        $search = trim(
            (string) $request->query('search', '')
        );

        $status = $request->query('status');
        $positionId = $request->query('position_id');

        return JobApplication::onlyTrashed()
            ->with('position')
            ->when(
                $search !== '',
                function ($query) use ($search): void {
                    $query->where(
                        function ($subQuery) use ($search): void {
                            $subQuery
                                ->where(
                                    'first_name',
                                    'like',
                                    "%{$search}%"
                                )
                                ->orWhere(
                                    'last_name',
                                    'like',
                                    "%{$search}%"
                                )
                                ->orWhere(
                                    'phone',
                                    'like',
                                    "%{$search}%"
                                )
                                ->orWhere(
                                    'email',
                                    'like',
                                    "%{$search}%"
                                );
                        }
                    );
                }
            )
            ->when(
                filled($status),
                fn ($query) => $query->where(
                    'status',
                    $status
                )
            )
            ->when(
                filled($positionId),
                fn ($query) => $query->where(
                    'position_id',
                    $positionId
                )
            )
            ->latest('deleted_at')
            ->paginate(10)
            ->withQueryString();
    }

    /**
     * ID'ye göre aktif iş başvurusunu getirir.
     */
    public function findById(int $id): JobApplication
    {
        return JobApplication::query()
            ->with('position')
            ->findOrFail($id);
    }

    /**
     * Son 24 saat içerisinde aynı e-posta veya telefon
     * numarası ile başvuru yapılıp yapılmadığını kontrol eder.
     */
    public function hasRecentApplication(
        string $email,
        string $phone
    ): bool {
        $normalizedEmail = mb_strtolower(
            trim($email)
        );

        $normalizedPhone = trim($phone);

        return JobApplication::query()
            ->where(
                'applied_at',
                '>=',
                now()->subHours(24)
            )
            ->where(function ($query) use (
                $normalizedEmail,
                $normalizedPhone
            ): void {
                $query
                    ->whereRaw(
                        'LOWER(email) = ?',
                        [$normalizedEmail]
                    )
                    ->orWhere(
                        'phone',
                        $normalizedPhone
                    );
            })
            ->exists();
    }

    /**
     * Yeni iş başvurusu oluşturur.
     *
     * @param array<string, mixed> $data
     */
    public function create(
        array $data,
        UploadedFile $cv,
        ?string $ipAddress = null
    ): JobApplication {
        $cvPath = null;

        try {
            return DB::transaction(function () use (
                $data,
                $cv,
                $ipAddress,
                &$cvPath
            ): JobApplication {
                $cvPath = $cv->store(
                    'job-applications/cvs',
                    'public'
                );

                $applicationData = $data;

                unset(
                    $applicationData['cv'],
                    $applicationData['turnstile_token']
                );

                $applicationData['email'] = mb_strtolower(
                    trim(
                        (string) $applicationData['email']
                    )
                );

                $applicationData['phone'] = trim(
                    (string) $applicationData['phone']
                );

                $applicationData['cv_path'] = $cvPath;
                $applicationData['status'] = 'new';
                $applicationData['ip_address'] = $ipAddress;
                $applicationData['applied_at'] = now();

                $jobApplication = JobApplication::create(
                    $applicationData
                );

                return $jobApplication->load('position');
            });
        } catch (Throwable $exception) {
            if ($cvPath !== null) {
                Storage::disk('public')->delete($cvPath);
            }

            throw $exception;
        }
    }

    /**
     * İş başvurusu durumunu günceller.
     */
    public function updateStatus(
        int $id,
        string $status,
        ?string $adminNote = null
    ): JobApplication {
        $jobApplication = JobApplication::query()
            ->findOrFail($id);

        $jobApplication->update([
            'status' => $status,
            'admin_note' => $adminNote,
        ]);

        return $jobApplication->fresh(['position']);
    }

    /**
     * İş başvurusunu arşivler.
     */
    public function archive(int $id): JobApplication
    {
        $jobApplication = JobApplication::query()
            ->with('position')
            ->findOrFail($id);

        $jobApplication->delete();

        return $jobApplication;
    }

    /**
     * Arşivlenmiş iş başvurusunu geri yükler.
     */
    public function restore(int $id): JobApplication
    {
        $jobApplication = JobApplication::onlyTrashed()
            ->with('position')
            ->findOrFail($id);

        $jobApplication->restore();

        return $jobApplication->fresh(['position']);
    }

    /**
     * Arşivlenmiş iş başvurusunu ve CV dosyasını
     * kalıcı olarak siler.
     */
    public function forceDelete(int $id): void
    {
        $jobApplication = JobApplication::onlyTrashed()
            ->findOrFail($id);

        $cvPath = $jobApplication->cv_path;

        DB::transaction(function () use (
            $jobApplication
        ): void {
            $jobApplication->forceDelete();
        });

        if ($cvPath) {
            Storage::disk('public')->delete($cvPath);
        }
    }
}