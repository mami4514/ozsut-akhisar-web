<?php

namespace Database\Seeders;

use App\Models\Position;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PositionSeeder extends Seeder
{
    public function run(): void
    {
        $positions = [
            'Garson',
            'Barista',
            'Komi',
            'Aşçı',
            'Şef',
            'Kasiyer',
            'Temizlik Görevlisi',
        ];

        foreach ($positions as $index => $position) {
            Position::create([
                'name' => $position,
                'slug' => Str::slug($position),
                'description' => null,
                'is_active' => true,
                'sort_order' => $index + 1,
            ]);
        }
    }
}