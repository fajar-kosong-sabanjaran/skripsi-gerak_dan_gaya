<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class PerbaikiIsiPdfDummySeeder extends Seeder
{
    public function run(): void
    {
        // 1. Ambil data file Fadhil (user_id = 14) sebagai file sumber yang BENAR
        $file_master_fadhil = DB::table('latihan_siswas')
            ->where('user_id', 14)
            ->pluck('file_pdf', 'kode_materi');

        // 2. Ambil semua data file dummy yang isinya salah (mengandung kata 'dummy_system')
        $dummy_records = DB::table('latihan_siswas')
            ->where('file_pdf', 'like', '%dummy_system%')
            ->get();

        $count = 0;

        foreach ($dummy_records as $dummy) {
            $materi = $dummy->kode_materi;

            // Jika Fadhil punya file PDF untuk materi ini, kita pakai isinya
            if (isset($file_master_fadhil[$materi])) {
                $path_sumber = $file_master_fadhil[$materi];
                $path_target = $dummy->file_pdf;

                // Mengecek apakah file fadhil benar-benar ada di folder
                if (Storage::disk('public')->exists($path_sumber)) {
                    
                    // Ambil isi konten PDF Fadhil
                    $isi_pdf_asli = Storage::disk('public')->get($path_sumber);
                    
                    // TIMPA isi konten file dummy dengan konten PDF Fadhil
                    // Trik ini mereplace fisik filenya tanpa mengubah database sama sekali!
                    Storage::disk('public')->put($path_target, $isi_pdf_asli);
                    
                    $count++;
                }
            }
        }

        $this->command->info("Selesai! Berhasil menyuntikkan isi PDF Fadhil ke $count file dummy.");
        $this->command->info("Database tidak disentuh & File tidak bertambah. Silakan cek di web!");
    }
}