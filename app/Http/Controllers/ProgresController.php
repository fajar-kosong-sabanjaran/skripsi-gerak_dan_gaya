<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProgresBelajar;
use App\Models\Nilai; // [DITAMBAHKAN] Panggil model Nilai
use App\Models\RiwayatNilai; // [DITAMBAHKAN] Panggil model RiwayatNilai
use Illuminate\Support\Facades\Auth;

class ProgresController extends Controller
{
    public function simpanProgres(Request $request)
    {
        // 1. Validasi data yang dikirim dari JavaScript (harus ada 'kode_materi')
        $request->validate([
            'kode_materi' => 'required|string',
        ]);

        // 2. Pastikan user yang mengirim data sudah login
        if (Auth::check()) {
            
            // 3. Simpan ke database (updateOrCreate mencegah data duplikat untuk user dan materi yang sama)
            ProgresBelajar::updateOrCreate(
                [
                    'user_id' => Auth::id(),
                    'kode_materi' => $request->kode_materi,
                ],
                [
                    'status' => true
                ]
            );

            // 4. Kirim balasan ke JavaScript bahwa penyimpanan sukses
            return response()->json([
                'success' => true, 
                'message' => 'Progres ' . $request->kode_materi . ' berhasil disimpan!'
            ]);
        }

        // Jika belum login, kirim pesan error
        return response()->json(['success' => false, 'message' => 'User belum login'], 401);
    }

    // =========================================================================
    // FUNGSI BARU: MENYIMPAN NILAI DAN RIWAYAT
    // =========================================================================
    public function simpanNilai(Request $request)
    {
        $user = Auth::user();
        
        // 1. Validasi data yang dikirim dari JavaScript
        $request->validate([
            'jenis_kuis'      => 'required|string',
            'nilai_percobaan' => 'required|integer',
            'detail_jawaban'  => 'required|array',
            // Waktu mulai dan selesai akan kita set otomatis dari controller jika tidak dikirim dari JS
        ]);

        $kkm = 70; // Set KKM Kelulusan
        $skor = $request->nilai_percobaan;
        $status_percobaan = ($skor >= $kkm) ? 'Lulus' : 'Tidak Lulus';

        // 2. Cek apakah siswa sudah punya tabel rekap (Nilai) untuk kuis ini?
        $rekapNilai = Nilai::where('user_id', $user->id)
                           ->where('jenis_kuis', $request->jenis_kuis)
                           ->first();

        if (!$rekapNilai) {
            // Jika belum pernah mencoba sama sekali, buat baru
            $rekapNilai = new Nilai();
            $rekapNilai->user_id = $user->id;
            $rekapNilai->jenis_kuis = $request->jenis_kuis;
            $rekapNilai->nilai_tertinggi = $skor;
            $rekapNilai->status_akhir = $status_percobaan;
            $rekapNilai->jumlah_percobaan = 1;
            $rekapNilai->save();
        } else {
            // Jika sudah pernah mencoba, update data rekapnya
            $rekapNilai->jumlah_percobaan += 1; // Tambah jumlah percobaan
            
            // Jika nilai sekarang lebih besar dari nilai tertinggi sebelumnya, update!
            if ($skor > $rekapNilai->nilai_tertinggi) {
                $rekapNilai->nilai_tertinggi = $skor;
                $rekapNilai->status_akhir = $status_percobaan;
            }
            $rekapNilai->save();
        }

        // 3. Simpan ke Tabel Riwayat Nilai (Setiap kali klik selesai = buat baris baru)
        $riwayat = new RiwayatNilai();
        $riwayat->nilai_id = $rekapNilai->id;
        $riwayat->percobaan_ke = $rekapNilai->jumlah_percobaan; // Ambil dari jumlah percobaan saat ini
        $riwayat->waktu_mulai = $request->waktu_mulai ?? now()->subMinutes(10); // Default jika tidak dikirim
        $riwayat->waktu_selesai = now(); // Waktu saat ini
        $riwayat->nilai_percobaan = $skor;
        $riwayat->status = $status_percobaan;
        $riwayat->detail_jawaban = $request->detail_jawaban; // Disimpan otomatis sebagai JSON oleh model
        $riwayat->save();

        return response()->json([
            'success' => true,
            'message' => 'Nilai dan riwayat berhasil disimpan!',
            'data' => [
                'nilai_tertinggi' => $rekapNilai->nilai_tertinggi,
                'percobaan_ke' => $riwayat->percobaan_ke
            ]
        ]);
    }
}