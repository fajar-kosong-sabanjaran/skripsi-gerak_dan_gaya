<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as Faker;

class DummySiswaSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create('id_ID');

        // Ambil ID kelas yang ada di pangkalan data
        $kelasIds = DB::table('kelas')->pluck('id')->toArray();
        if (empty($kelasIds)) {
            $kelasIds = [1]; 
        }

        $materiList = [
            ['progres' => 'pengertiangerak_completed', 'latihan' => 'pengertian_gerak'],
            ['progres' => 'jarak_completed', 'latihan' => 'jarak_tempuh'],
            ['progres' => 'kelajuan_completed', 'latihan' => 'kelajuan'],
            ['progres' => 'percepatan_completed', 'latihan' => 'percepatan'],
            ['progres' => 'kuis1_completed', 'kuis' => 'Kuis 1'],
            ['progres' => 'pengertiangaya_completed', 'latihan' => 'pengertian_gaya'],
            ['progres' => 'resultangaya_completed', 'latihan' => 'resultan_gaya'],
            ['progres' => 'macamgaya_completed', 'latihan' => 'macam_macam_gaya'],
            ['progres' => 'hukumnewton_completed', 'latihan' => 'hukum_newton'],
            ['progres' => 'kuis2_completed', 'kuis' => 'Kuis 2'],
            ['progres' => 'evaluasi_completed', 'kuis' => 'Evaluasi'],
        ];

        // Senarai nama pelajar Indonesia tanpa gelaran
        $senaraiNama = [
            "Abdul Hayyi", "Bima Arya", "Citra Kirana", "Dian Sastrowardoyo", 
            "Eka Saputra", "Fitri Rahmawati", "Gilang Dirga", "Hana Pertiwi",
            "Iqbal Ramadhan", "Jihan Fahira"
        ];

        // Looping untuk membuat 10 siswa
        for ($i = 0; $i < 10; $i++) {
            
            $namaLengkap = $senaraiNama[$i];
            
            // Ambil nama hadapan sahaja dan tukar kepada huruf kecil untuk e-mel
            $pecahanNama = explode(' ', $namaLengkap);
            $namaHadapan = strtolower($pecahanNama[0]); // contoh: abdul
            $email = $namaHadapan . '@gmail.com';

            // 1. Insert Data User (Siswa)
            $userId = DB::table('users')->insertGetId([
                'nama_lengkap' => $namaLengkap,
                'email' => $email,
                'password' => Hash::make('password123'),
                'peran' => 'siswa',
                'nomor_induk' => '2412345' . str_pad($i + 50, 3, '0', STR_PAD_LEFT),
                'kelas_id' => $faker->randomElement($kelasIds),
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // 2. Tentukan Batas Progres
            // 2 Siswa pertama ($i = 0 dan 1) akan diset full sampai evaluasi
            $batasProgress = ($i < 2) ? count($materiList) : rand(1, count($materiList) - 1);

            // 3. Insert Progres, PDF Latihan, dan Nilai
            for ($j = 0; $j < $batasProgress; $j++) {
                $materi = $materiList[$j];

                DB::table('progres_belajars')->insert([
                    'user_id' => $userId,
                    'kode_materi' => $materi['progres'],
                    'status' => 1,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                if (isset($materi['latihan'])) {
                    DB::table('latihan_siswas')->insert([
                        'user_id' => $userId,
                        'kode_materi' => $materi['latihan'],
                        'file_pdf' => "jawaban_siswa/{$userId}_{$materi['latihan']}_dummy_system.pdf",
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }

                if (isset($materi['kuis'])) {
                    $nilai = ($i < 2) ? rand(80, 100) : rand(30, 90); 
                    $statusAkhir = ($nilai >= 70) ? 'Lulus' : 'Tidak Lulus';

                    DB::table('nilais')->insert([
                        'user_id' => $userId,
                        'jenis_kuis' => $materi['kuis'],
                        'nilai_tertinggi' => $nilai,
                        'status_akhir' => $statusAkhir,
                        'jumlah_percobaan' => rand(1, 3),
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }
        }
    }
}