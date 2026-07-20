<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class JobApplicationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,

            'full_name' => trim(
                "{$this->first_name} {$this->last_name}"
            ),

            'position' => [
                'id' => $this->position->id,
                'name' => $this->position->name,
            ],

            'phone' => $this->phone,

            'email' => $this->email,

            'status' => $this->status,

            'applied_at' => $this->applied_at,
        ];
    }
}
