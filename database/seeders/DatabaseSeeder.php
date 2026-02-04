<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Buat Akun GURU
        User::create([
            'nama_lengkap' => 'Bapak Guru Fisika',
            'email' => 'guru@sekolah.com',
            'password' => Hash::make('password123'), // Passwordnya: password123
            'peran' => 'guru',
            'nomor_induk' => '19850101201001',
            'kelas_id' => null,
        ]);

        // 2. Buat Akun SISWA
        User::create([
            'nama_lengkap' => 'Andi Siswa Teladan',
            'email' => 'siswa@sekolah.com',
            'password' => Hash::make('password123'), // Passwordnya: password123
            'peran' => 'siswa',
            'nomor_induk' => '2024001',
            'kelas_id' => null,
        ]);
    }
}