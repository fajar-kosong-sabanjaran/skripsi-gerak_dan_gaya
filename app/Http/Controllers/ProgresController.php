<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProgresBelajar;
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
}