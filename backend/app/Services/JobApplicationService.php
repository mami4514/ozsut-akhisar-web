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
     * İş başvurularını arama, filtreleme ve sayfalama ile getirir.
     */
    public function getPaginated(Request $request): LengthAwarePaginator
    {
        $search = trim((string) $request->query('search', ''));
        $status = $request->query('status');
        $positionId = $request->query('position_id');

        return JobApplication::query()
            ->with('position')
            ->when(
                $search !== '',
                function ($query) use ($search): void {
                    $query->where(function ($subQuery) use ($search): void {
                        $subQuery
                            ->where('first_name', 'like', "%{$search}%")
                            ->orWhere('last_name', 'like', "%{$search}%")
                            ->orWhere('phone', 'like', "%{$search}%")
                            ->orWhere('email', 'like', "%{$search}%");
                    });
                }
            )
            ->when(
                filled($status),
                fn ($query) => $query->where('status', $status)
            )
            ->when(
                filled($positionId),
                fn ($query) => $query->where('position_id', $positionId)
            )
            ->latest('applied_at')
            ->paginate(10)
            ->withQueryString();
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

                unset($applicationData['cv']);

                $applicationData['cv_path'] = $cvPath;
                $applicationData['status'] = 'new';
                $applicationData['ip_address'] = $ipAddress;
                $applicationData['applied_at'] = now();

                return JobApplication::create($applicationData);
            });
        } catch (Throwable $exception) {
            if ($cvPath !== null) {
                Storage::disk('public')->delete($cvPath);
            }

            throw $exception;
        }
    }
}