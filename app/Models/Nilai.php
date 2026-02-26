<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Nilai extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'jenis_kuis',
        'nilai_tertinggi',
        'status_akhir',
        'jumlah_percobaan'
    ];

    // Relasi balik ke User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relasi One to Many ke Riwayat Nilai
    public function riwayat()
    {
        return $this->hasMany(RiwayatNilai::class, 'nilai_id');
    }
}