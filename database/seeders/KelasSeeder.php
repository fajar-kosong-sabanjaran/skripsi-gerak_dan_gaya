<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Kelas; // PENTING: Import Model Kelas agar terbaca

class KelasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Membuat data kelas contoh
        Kelas::create([
            'nama' => 'VIII-A',
            'deskripsi' => 'Kelas 8 A'
        ]);

        Kelas::create([
            'nama' => 'VIII-B',
            'deskripsi' => 'Kelas 8 B'
        ]);
        
        Kelas::create([
            'nama' => 'VIII-C',
            'deskripsi' => 'Kelas 8 C'
        ]);
    }
}