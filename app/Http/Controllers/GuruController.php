<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Kelas;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class GuruController extends Controller
{
    // =================================================================
    // MANAJEMEN DATA SISWA
    // =================================================================

    public function index()
    {
        $data_siswa = User::where('peran', 'siswa')
                          ->with('kelas') 
                          ->orderBy('nama_lengkap', 'asc')
                          ->get();

        $data_kelas = Kelas::all(); 

        return view('guru.datasiswa', compact('data_siswa', 'data_kelas'));
    }

    public function update(Request $request, $id)
    {
        $siswa = User::find($id);

        if (!$siswa) {
            return response()->json(['success' => false, 'message' => 'Siswa tidak ditemukan'], 404);
        }

        // Validasi Siswa
        $request->validate([
            'nama_lengkap' => 'required|string|max:255',
            'email'        => 'required|email|unique:users,email,'.$id, 
            'nomor_induk'  => 'nullable|string',
            'kelas_id'     => 'nullable|exists:kelas,id',
        ]);

        $siswa->nama_lengkap = $request->nama_lengkap;
        $siswa->email        = $request->email;
        $siswa->nomor_induk  = $request->nomor_induk;
        $siswa->kelas_id     = $request->kelas_id;

        if ($request->filled('password')) {
            $siswa->password = Hash::make($request->password);
        }

        $siswa->save();

        return response()->json(['success' => true]);
    }

    public function destroy($id)
    {
        $siswa = User::find($id);

        if ($siswa) {
            $siswa->delete();
            return response()->json(['success' => true]);
        }

        return response()->json(['success' => false, 'message' => 'Data tidak ditemukan'], 404);
    }


    // =================================================================
    // MANAJEMEN DATA KELAS
    // =================================================================

    public function indexKelas()
    {
        // [REVISI] Menambahkan withCount('users') untuk menghitung jumlah siswa
        $data_kelas = Kelas::withCount('users')
                           ->orderBy('nama', 'asc')
                           ->get();
                           
        return view('guru.datakelas', compact('data_kelas'));
    }

    public function storeKelas(Request $request)
    {
        // 1. Pesan Error Bahasa Indonesia
        $messages = [
            'nama.required' => 'Nama kelas wajib diisi!',
            'nama.unique'   => 'Nama kelas sudah digunakan, silakan pilih nama lain.',
            'nama.max'      => 'Nama kelas maksimal 50 karakter.',
            'deskripsi.max' => 'Deskripsi tidak boleh lebih dari 255 karakter.'
        ];

        // 2. Validasi Manual
        $validator = Validator::make($request->all(), [
            'nama' => 'required|string|max:50|unique:kelas,nama',
            'deskripsi' => 'nullable|string|max:255'
        ], $messages);

        // 3. Jika Gagal, Kirim Error Pertama ke JS
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()->first()
            ]);
        }

        // 4. Simpan Data
        $kelas = new Kelas();
        $kelas->nama = $request->nama;
        $kelas->deskripsi = $request->deskripsi;
        $kelas->save();

        return response()->json(['success' => true]);
    }

    public function updateKelas(Request $request, $id)
    {
        $kelas = Kelas::find($id);
        if (!$kelas) return response()->json(['success' => false, 'message' => 'Data kelas tidak ditemukan.'], 404);

        // 1. Pesan Error Bahasa Indonesia
        $messages = [
            'nama.required' => 'Nama kelas wajib diisi!',
            'nama.unique'   => 'Nama kelas sudah digunakan, silakan pilih nama lain.',
            'nama.max'      => 'Nama kelas maksimal 50 karakter.',
            'deskripsi.max' => 'Deskripsi tidak boleh lebih dari 255 karakter.'
        ];

        // 2. Validasi Manual (Abaikan ID sendiri untuk unique)
        $validator = Validator::make($request->all(), [
            'nama' => 'required|string|max:50|unique:kelas,nama,'.$id,
            'deskripsi' => 'nullable|string|max:255'
        ], $messages);

        // 3. Jika Gagal
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()->first()
            ]);
        }

        // 4. Update Data
        $kelas->nama = $request->nama;
        $kelas->deskripsi = $request->deskripsi;
        $kelas->save();

        return response()->json(['success' => true]);
    }

    public function destroyKelas($id)
    {
        $kelas = Kelas::find($id);
        
        if ($kelas) {
            // Cek apakah ada siswa di kelas ini sebelum menghapus
            if ($kelas->users()->count() > 0) {
                return response()->json([
                    'success' => false, 
                    'message' => 'Gagal! Masih ada siswa yang terdaftar di kelas ini.'
                ], 400);
            }

            $kelas->delete();
            return response()->json(['success' => true]);
        }

        return response()->json(['success' => false, 'message' => 'Data kelas tidak ditemukan.'], 404);
    }
}