<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RiwayatNilai extends Model
{
    use HasFactory;

    protected $fillable = [
        'nilai_id',
        'percobaan_ke',
        'waktu_mulai',
        'waktu_selesai',
        'nilai_percobaan',
        'status',
        'detail_jawaban'
    ];

    // Memberitahu Laravel bahwa detail_jawaban itu berbentuk array/JSON
    protected function casts(): array
    {
        return [
            'waktu_mulai' => 'datetime',
            'waktu_selesai' => 'datetime',
            'detail_jawaban' => 'array',
        ];
    }

    // Relasi balik ke Nilai
    public function nilai()
    {
        return $this->belongsTo(Nilai::class, 'nilai_id');
    }
}