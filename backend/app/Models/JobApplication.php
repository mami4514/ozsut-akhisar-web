<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class JobApplication extends Model
{
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
        'about',
        'cv_path',
        'status',
        'admin_note',
        'ip_address',
    ];

    public function position(): BelongsTo
    {
        return $this->belongsTo(Position::class);
    }
}