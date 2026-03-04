<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PengaturanKkm extends Model
{
    use HasFactory;

    // Tambahkan baris ini untuk mengizinkan penyimpanan data
    protected $fillable = [
        'kkm_kuis1',
        'kkm_kuis2',
        'kkm_evaluasi',
    ];
}