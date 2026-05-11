<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LatihanSiswa;
use Illuminate\Support\Facades\Auth;

class LatihanSiswaController extends Controller
{
    public function simpanPdf(Request $request)
    {
        // 1. Validasi data (Batas ukuran dinaikkan menjadi 5MB agar aman dari error)
        $request->validate([
            'kode_materi' => 'required|string',
            'file_pdf' => 'required|mimes:pdf|max:5120', 
        ]);

        $user = Auth::user();
        $kodeMateri = $request->kode_materi;

        // 2. Ambil file yang dikirim oleh Javascript
        $file = $request->file('file_pdf');
        
        // 3. Buat penamaan file yang unik
        $namaFile = $user->id . '_' . $kodeMateri . '_' . time() . '.pdf';

        // 4. SIMPAN FILE (Gunakan parameter 'public' agar langsung masuk ke storage/app/public/)
        $path = $file->storeAs('jawaban_siswa', $namaFile, 'public');

        // 5. Cek keamanan: Jika file gagal masuk ke folder Windows, hentikan proses!
        if (!$path) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal menyimpan file fisik PDF ke dalam folder.'
            ], 500);
        }

        // 6. Jika file sukses masuk folder, barulah kita simpan datanya ke Database
        LatihanSiswa::updateOrCreate(
            [
                'user_id' => $user->id,
                'kode_materi' => $kodeMateri
            ],
            [
                'file_pdf' => 'jawaban_siswa/' . $namaFile
            ]
        );

        // Beri respon sukses ke Javascript
        return response()->json([
            'status' => 'success',
            'message' => 'PDF berhasil disimpan secara otomatis'
        ]);
    }
}