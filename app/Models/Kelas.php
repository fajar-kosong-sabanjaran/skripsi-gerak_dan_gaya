<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kelas extends Model
{
    use HasFactory;

    // Menentukan nama tabel secara eksplisit (opsional tapi disarankan)
    protected $table = 'kelas';

    // Mengizinkan semua kolom untuk diisi (kecuali id)
    protected $guarded = ['id'];

    /**
     * Relasi: Satu Kelas memiliki banyak Siswa (User)
     * Ini menghubungkan id di tabel 'kelas' dengan kelas_id di tabel 'users'
     */
    public function users()
    {
        return $this->hasMany(User::class, 'kelas_id');
    }
}