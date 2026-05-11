<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LatihanSiswa extends Model
{
    use HasFactory;

    protected $table = 'latihan_siswas';

    // Mengizinkan penyimpanan data secara massal
    protected $fillable = [
        'user_id',
        'kode_materi',
        'file_pdf',
    ];

    // Relasi balik (Belongs To) ke tabel User (Siswa)
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}