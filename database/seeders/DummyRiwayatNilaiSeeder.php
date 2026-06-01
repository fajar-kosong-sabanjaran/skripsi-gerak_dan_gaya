<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DummyRiwayatNilaiSeeder extends Seeder
{
    public function run(): void
    {
        $semuaNilai = DB::table('nilais')->get();

        foreach ($semuaNilai as $nilai) {
            // 1. PROTEKSI DATA ASLI (Fadhil, Guru, Andi, dkk)
            // Siswa asli memiliki user_id <= 14. 
            // Kita skip data ini agar riwayat manual Anda tidak terhapus atau berubah.
            if ($nilai->user_id <= 14) {
                continue; 
            }

            // --- MULAI PERBAIKAN UNTUK DATA DUMMY ---
            
            $jenisKuis = $nilai->jenis_kuis;
            // Kuis 1 & 2 = 10 poin/soal. Evaluasi = 5 poin/soal.
            $multiplier = ($jenisKuis === 'Evaluasi') ? 5 : 10;
            $totalSoal = ($jenisKuis === 'Evaluasi') ? 20 : 10;

            // 2. BERSIHKAN RIWAYAT LAMA (Jika sebelumnya sempat terbuat 1x percobaan)
            DB::table('riwayat_nilais')->where('nilai_id', $nilai->id)->delete();

            // 3. PERBAIKI NILAI YANG TIDAK MASUK AKAL (Misal 57 dibulatkan ke 60)
            $nilaiAsli = $nilai->nilai_tertinggi;
            $nilaiMasukAkal = round($nilaiAsli / $multiplier) * $multiplier;
            if ($nilaiMasukAkal > 100) $nilaiMasukAkal = 100; // Maksimal tetap 100
            
            $statusAkhir = ($nilaiMasukAkal >= 70) ? 'Lulus' : 'Tidak Lulus';

            // 4. BUAT BEBERAPA KALI PERCOBAAN (Acak antara 2 sampai 4 kali percobaan)
            $jumlahPercobaan = rand(2, 4);

            // Update tabel nilais agar nilainya berubah jadi logis dan percobaan sinkron
            DB::table('nilais')->where('id', $nilai->id)->update([
                'nilai_tertinggi' => $nilaiMasukAkal,
                'status_akhir' => $statusAkhir,
                'jumlah_percobaan' => $jumlahPercobaan,
            ]);

            // 5. GENERATE RIWAYAT DETAIL (Banyak Percobaan)
            for ($i = 1; $i <= $jumlahPercobaan; $i++) {
                
                if ($i == $jumlahPercobaan) {
                    // Percobaan terakhir: Siswa mendapatkan nilai puncaknya
                    $skorPercobaan = $nilaiMasukAkal;
                } else {
                    // Percobaan sebelum-sebelumnya: Simulasi nilai lebih kecil & tidak lulus (maks 60)
                    $maksGagal = min($nilaiMasukAkal, 60);
                    $skorPercobaan = rand(0, floor($maksGagal / $multiplier)) * $multiplier;
                }

                $statusPercobaan = ($skorPercobaan >= 70) ? 'Lulus' : 'Tidak Lulus';
                $jumlahBenar = (int) ($skorPercobaan / $multiplier);

                // Susun array jawaban ceklis (true) dan silang (false)
                $detailJawaban = [];
                for ($j = 0; $j < $totalSoal; $j++) {
                    $detailJawaban[] = ($j < $jumlahBenar);
                }
                shuffle($detailJawaban); // Acak urutan soal mana yang benar/salah

                // Set waktu agar terlihat berurutan per harinya
                $waktuMulai = Carbon::now()->subDays($jumlahPercobaan - $i)->subMinutes(rand(20, 60));
                $waktuSelesai = (clone $waktuMulai)->addMinutes(rand(10, 20));

                DB::table('riwayat_nilais')->insert([
                    'nilai_id' => $nilai->id,
                    'percobaan_ke' => $i,
                    'waktu_mulai' => $waktuMulai,
                    'waktu_selesai' => $waktuSelesai,
                    'nilai_percobaan' => $skorPercobaan,
                    'status' => $statusPercobaan,
                    'detail_jawaban' => json_encode($detailJawaban),
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ]);
            }
        }
    }
}