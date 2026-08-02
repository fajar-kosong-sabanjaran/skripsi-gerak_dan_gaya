<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProgresBelajar;
use App\Models\Nilai; 
use App\Models\RiwayatNilai; 
use App\Models\PengaturanKkm;
use Illuminate\Support\Facades\Auth;

class ProgresController extends Controller
{
    public function simpanProgres(Request $request)
    {
        $request->validate([
            'kode_materi' => 'required|string',
        ]);

        if (Auth::check()) {
            // Simpan atau update progres belajar agar tidak duplikat
            ProgresBelajar::updateOrCreate(
                [
                    'user_id' => Auth::id(),
                    'kode_materi' => $request->kode_materi,
                ],
                [
                    'status' => true
                ]
            );

            return response()->json([
                'success' => true, 
                'message' => 'Progres ' . $request->kode_materi . ' berhasil disimpan!'
            ]);
        }

        return response()->json(['success' => false, 'message' => 'User belum login'], 401);
    }

    // FUNGSI MENYIMPAN NILAI DAN RIWAYAT (DENGAN LOGIKA REMEDIAL)
    public function simpanNilai(Request $request)
    {
        $user = Auth::user();
        
        $request->validate([
            'jenis_kuis'      => 'required|string',
            'nilai_percobaan' => 'required|integer',
            'detail_jawaban'  => 'required|array',
            // Waktu mulai dan selesai diset otomatis dari controller
        ]);

        // Ambil KKM dari database sesuai jenis kuis
        $pengaturan = PengaturanKkm::first();
        $kkm = 70; 
        if ($pengaturan) {
            if ($request->jenis_kuis === 'Kuis 1') {
                $kkm = $pengaturan->kkm_kuis1;
            } elseif ($request->jenis_kuis === 'Kuis 2') {
                $kkm = $pengaturan->kkm_kuis2;
            } elseif ($request->jenis_kuis === 'Evaluasi') {
                $kkm = $pengaturan->kkm_evaluasi;
            }
        }

        $skor = $request->nilai_percobaan;
        $status_percobaan = ($skor >= $kkm) ? 'Lulus' : 'Tidak Lulus';

        $rekapNilai = Nilai::where('user_id', $user->id)
                           ->where('jenis_kuis', $request->jenis_kuis)
                           ->first();

        if (!$rekapNilai) {
            $rekapNilai = new Nilai();
            $rekapNilai->user_id = $user->id;
            $rekapNilai->jenis_kuis = $request->jenis_kuis;
            $rekapNilai->nilai_tertinggi = 0; 
            $rekapNilai->status_akhir = 'Tidak Lulus'; 
            $rekapNilai->jumlah_percobaan = 0;
            $rekapNilai->save();
        }
        
        $rekapNilai->jumlah_percobaan += 1;
        $rekapNilai->save();

        // Simpan ke Tabel Riwayat Nilai TERLEBIH DAHULU agar masuk ke perhitungan remedial
        $riwayat = new RiwayatNilai();
        $riwayat->nilai_id = $rekapNilai->id;
        $riwayat->percobaan_ke = $rekapNilai->jumlah_percobaan; 
        $riwayat->waktu_mulai = $request->waktu_mulai ?? now()->subMinutes(10); 
        $riwayat->waktu_selesai = now(); 
        $riwayat->nilai_percobaan = $skor;
        $riwayat->status = $status_percobaan;
        $riwayat->detail_jawaban = $request->detail_jawaban; 
        $riwayat->save();

        // HITUNG ULANG NILAI AKHIR MENGGUNAKAN LOGIKA REMEDIAL
        $semuaRiwayat = RiwayatNilai::where('nilai_id', $rekapNilai->id)
            ->orderBy('percobaan_ke', 'asc')
            ->get();

        $nilaiAkhir = 0;
        $statusAkhir = 'Tidak Lulus';

        if ($semuaRiwayat->count() > 0) {
            $percobaanPertama = $semuaRiwayat->first()->nilai_percobaan;

            if ($percobaanPertama >= $kkm) {
                // Aturan 1: Langsung lulus di percobaan pertama, ambil nilai aslinya
                $nilaiAkhir = $percobaanPertama;
                $statusAkhir = 'Lulus';
            } else {
                // Aturan 2 & 3: Siswa gagal di percobaan pertama (Remedial)
                $lulusRemedial = false;
                $nilaiTertinggiGagal = $percobaanPertama;

                foreach ($semuaRiwayat as $r) {
                    if ($r->nilai_percobaan >= $kkm) {
                        $lulusRemedial = true;
                        break; 
                    }
                    // Cari nilai tertinggi dari percobaan-percobaan yang gagal
                    if ($r->nilai_percobaan > $nilaiTertinggiGagal) {
                        $nilaiTertinggiGagal = $r->nilai_percobaan;
                    }
                }

                if ($lulusRemedial) {
                    // Aturan 2: Berhasil remedial, nilai mentok KKM
                    $nilaiAkhir = $kkm;
                    $statusAkhir = 'Lulus';
                } else {
                    // Aturan 3: Diremedial berkali-kali tetap gagal, ambil tertinggi
                    $nilaiAkhir = $nilaiTertinggiGagal;
                    $statusAkhir = 'Tidak Lulus';
                }
            }
        }

        // Update tabel Nilai dengan Nilai Akhir hasil kalkulasi
        $rekapNilai->nilai_tertinggi = $nilaiAkhir;
        $rekapNilai->status_akhir = $statusAkhir;
        $rekapNilai->save();

        return response()->json([
            'success' => true,
            'message' => 'Nilai dan riwayat berhasil disimpan!',
            'data' => [
                'nilai_tertinggi' => $rekapNilai->nilai_tertinggi,
                'percobaan_ke' => $riwayat->percobaan_ke
            ]
        ]);
    }

    // TAMPILAN KUIS (MENYISIPKAN DATA KKM)
    
    public function tampilKuis1()
    {
        $kkm = PengaturanKkm::first()->kkm_kuis1 ?? 70;
        return view('siswa.gerak.kuis1', compact('kkm'));
    }

    public function tampilKuis2()
    {
        $kkm = PengaturanKkm::first()->kkm_kuis2 ?? 70;
        return view('siswa.gaya.kuis2', compact('kkm'));
    }

    public function tampilEvaluasi()
    {
        $kkm = PengaturanKkm::first()->kkm_evaluasi ?? 70;
        return view('siswa.evaluasi.evaluasi', compact('kkm'));
    }
}