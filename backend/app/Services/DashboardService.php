<?php

namespace App\Services;

use App\Models\JobApplication;
use App\Models\Position;
use App\Models\User;

class DashboardService
{
    public function getDashboardData(): array
    {
        return [
            'statistics' => [
                'totalApplications' => JobApplication::count(),

                'newApplications' => JobApplication::where(
                    'status',
                    'new'
                )->count(),

                'activePositions' => Position::count(),

                'totalUsers' => User::count(),
            ],

            'latestApplications' => JobApplication::with('position')
                ->latest('applied_at')
                ->take(5)
                ->get()
                ->map(function ($application) {
                    return [
                        'id' => $application->id,

                        'full_name' => $application->first_name . ' ' . $application->last_name,

                        'position' => $application->position?->name,

                        'status' => $application->status,

                        'applied_at' => optional($application->applied_at)
                            ->format('Y-m-d H:i'),
                    ];
                })
                ->values(),
        ];
    }
}