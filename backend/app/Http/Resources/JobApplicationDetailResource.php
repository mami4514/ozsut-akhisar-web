<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class JobApplicationDetailResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,

            'first_name' => $this->first_name,
            'last_name' => $this->last_name,

            'full_name' => trim(
                "{$this->first_name} {$this->last_name}"
            ),

            'position' => [
                'id' => $this->position->id,
                'name' => $this->position->name,
            ],

            'phone' => $this->phone,
            'email' => $this->email,
            'gender' => $this->gender,
            'birth_date' => $this->birth_date,

            'location' => [
                'city' => $this->city,
                'district' => $this->district,
            ],

            'experience' => $this->experience,
            'education_level' => $this->education_level,
            'employment_type' => $this->employment_type,
            'military_status' => $this->military_status,
            'driver_license' => $this->driver_license,

            'smoker' => $this->smoker,
            'shift_available' => $this->shift_available,

            'about' => $this->about,

            'cv' => [
                'path' => $this->cv_path,
                'url' => $this->cv_path
                    ? Storage::url($this->cv_path)
                    : null,
            ],

            'kvkk_approved' => $this->kvkk_approved,

            'status' => $this->status,
            'admin_note' => $this->admin_note,

            'ip_address' => $this->ip_address,
            'applied_at' => $this->applied_at,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}