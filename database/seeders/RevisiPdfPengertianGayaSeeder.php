<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RevisiPdfPengertianGayaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('latihan_siswas')
            ->where('kode_materi', 'pengertian_gaya')
            ->update([
                'file_pdf' => 'jawaban_siswa/tts_pengertian_gaya_dummy.pdf',
                'updated_at' => now(),
            ]);

        $this->command->info('Aman! Data PDF Pengertian Gaya untuk semua siswa berhasil diupdate ke versi TTS.');
    }
}