<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProgresBelajar extends Model
{
    use HasFactory;

    // Mengizinkan semua kolom diisi massal kecuali 'id'
    protected $guarded = ['id'];

    // Relasi balik ke model User
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}