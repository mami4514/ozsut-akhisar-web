<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class JobApplication extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'position_id',
        'first_name',
        'last_name',
        'phone',
        'email',
        'gender',
        'birth_date',
        'city',
        'district',
        'experience',
        'education_level',
        'employment_type',
        'military_status',
        'driver_license',
        'smoker',
        'shift_available',
        'about',

        'reference_name',
        'reference_phone',

        'cv_path',
        'kvkk_approved',
        'status',
        'admin_note',
        'ip_address',
        'applied_at',
    ];

    protected function casts(): array
    {
        return [
            'birth_date' => 'date',
            'experience' => 'integer',
            'smoker' => 'boolean',
            'shift_available' => 'boolean',
            'kvkk_approved' => 'boolean',
            'applied_at' => 'datetime',
            'deleted_at' => 'datetime',
        ];
    }

    public function position(): BelongsTo
    {
        return $this->belongsTo(Position::class);
    }
}