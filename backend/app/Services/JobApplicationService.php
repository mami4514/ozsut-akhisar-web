<?php

namespace App\Services;

use App\Models\JobApplication;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Throwable;

class JobApplicationService
{
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