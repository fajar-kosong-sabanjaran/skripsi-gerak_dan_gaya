<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Kelas;
use App\Models\Nilai;
use App\Models\RiwayatNilai;
use App\Models\PengaturanKkm;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use App\Exports\SiswaExport;
use Maatwebsite\Excel\Facades\Excel;

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

    // [REVISI] Menambahkan fungsi export Excel (.xlsx) menggunakan Maatwebsite
    public function exportExcel(Request $request)
    {
        // Tangkap parameter kelas dari URL (berisi nama kelas atau 'semua')
        $kelasFilter = $request->query('kelas', 'semua');

        // Penamaan file dinamis
        $namaKelasFile = $kelasFilter === 'semua' ? 'Semua_Kelas' : str_replace(' ', '_', $kelasFilter);
        $fileName = "Data_Siswa_{$namaKelasFile}.xlsx"; // Ekstensi sudah .xlsx

        // Memanggil library Excel untuk men-download
        return Excel::download(new SiswaExport($kelasFilter), $fileName);
    }

    public function update(Request $request, $id)
    {
        $siswa = User::find($id);

        if (!$siswa) {
            return response()->json(['success' => false, 'message' => 'Siswa tidak ditemukan'], 404);
        }

        $request->validate([
            'nama_lengkap' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $id,
            'nomor_induk' => 'nullable|string',
            'kelas_id' => 'nullable|exists:kelas,id',
        ]);

        $siswa->nama_lengkap = $request->nama_lengkap;
        $siswa->email = $request->email;
        $siswa->nomor_induk = $request->nomor_induk;
        $siswa->kelas_id = $request->kelas_id;

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
        $data_kelas = Kelas::withCount('users')
            ->orderBy('nama', 'asc')
            ->get();

        return view('guru.datakelas', compact('data_kelas'));
    }

    public function storeKelas(Request $request)
    {
        $messages = [
            'nama.required' => 'Nama kelas wajib diisi!',
            // [REVISI] Ubah pesan error agar lebih jelas
            'nama.unique' => 'Nama kelas pada tahun ajaran tersebut sudah digunakan, silakan pilih nama atau tahun lain.',
            'nama.max' => 'Nama kelas maksimal 50 karakter.',
            'tahun.max' => 'Tahun tidak boleh lebih dari 255 karakter.'
        ];

        // [REVISI] Mengubah validasi unique agar mengecek kombinasi nama dan tahun
        $validator = Validator::make($request->all(), [
            'nama' => [
                'required',
                'string',
                'max:50',
                Rule::unique('kelas', 'nama')->where(function ($query) use ($request) {
                    return $query->where('tahun', $request->tahun);
                })
            ],
            'tahun' => 'nullable|string|max:255'
        ], $messages);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()->first()
            ]);
        }

        $kelas = new Kelas();
        $kelas->nama = $request->nama;
        $kelas->tahun = $request->tahun;
        $kelas->save();

        return response()->json(['success' => true]);
    }

    public function updateKelas(Request $request, $id)
    {
        $kelas = Kelas::find($id);
        if (!$kelas)
            return response()->json(['success' => false, 'message' => 'Data kelas tidak ditemukan.'], 404);

        $messages = [
            'nama.required' => 'Nama kelas wajib diisi!',
            // [REVISI] Ubah pesan error
            'nama.unique' => 'Nama kelas pada tahun ajaran tersebut sudah digunakan, silakan pilih nama atau tahun lain.',
            'nama.max' => 'Nama kelas maksimal 50 karakter.',
            'tahun.max' => 'Tahun tidak boleh lebih dari 255 karakter.'
        ];

        // [REVISI] Mengubah validasi unique dengan kombinasi nama dan tahun, dan ignore ID kelas saat ini
        $validator = Validator::make($request->all(), [
            'nama' => [
                'required',
                'string',
                'max:50',
                Rule::unique('kelas', 'nama')->ignore($id)->where(function ($query) use ($request) {
                    return $query->where('tahun', $request->tahun);
                })
            ],
            'tahun' => 'nullable|string|max:255'
        ], $messages);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()->first()
            ]);
        }

        $kelas->nama = $request->nama;
        $kelas->tahun = $request->tahun;
        $kelas->save();

        return response()->json(['success' => true]);
    }

    public function destroyKelas($id)
    {
        $kelas = Kelas::find($id);

        if ($kelas) {
            // Putuskan relasi siswa dengan kelas yang akan dihapus
            User::where('kelas_id', $id)->update(['kelas_id' => null]);

            $kelas->delete();
            return response()->json(['success' => true]);
        }

        return response()->json(['success' => false, 'message' => 'Data kelas tidak ditemukan.'], 404);
    }

    // =================================================================
    // MANAJEMEN PROGRES BELAJAR
    // =================================================================

    public function progresBelajar()
    {
        $data_siswa = User::where('peran', 'siswa')
            ->with(['kelas', 'progres'])
            ->get();

        $data_kelas = Kelas::orderBy('nama', 'asc')->get();

        return view('guru.progresbelajar', compact('data_siswa', 'data_kelas'));
    }

    // =================================================================
    // MANAJEMEN DATA NILAI
    // =================================================================

    public function dataNilai()
    {
        $data_siswa = User::where('peran', 'siswa')
            ->with(['kelas', 'nilais'])
            ->orderBy('nama_lengkap', 'asc')
            ->get();

        $data_kelas = Kelas::orderBy('nama', 'asc')->get();
        $kkm = PengaturanKkm::first();

        return view('guru.datanilai', compact('data_siswa', 'data_kelas', 'kkm'));
    }

    public function riwayatNilai($user_id, $jenis_kuis)
    {
        $nilai = Nilai::where('user_id', $user_id)
            ->where('jenis_kuis', $jenis_kuis)
            ->first();

        if (!$nilai) {
            return response()->json([
                'success' => false,
                'message' => 'Belum ada riwayat pengerjaan.'
            ]);
        }

        $riwayat = RiwayatNilai::where('nilai_id', $nilai->id)
            ->orderBy('percobaan_ke', 'asc')
            ->get();

        // Hitung ulang status kelulusan berdasarkan KKM dinamis terbaru
        $pengaturan = PengaturanKkm::first();
        $kkm_sekarang = 70;

        if ($pengaturan) {
            if ($jenis_kuis === 'Kuis 1')
                $kkm_sekarang = $pengaturan->kkm_kuis1;
            elseif ($jenis_kuis === 'Kuis 2')
                $kkm_sekarang = $pengaturan->kkm_kuis2;
            elseif ($jenis_kuis === 'Evaluasi')
                $kkm_sekarang = $pengaturan->kkm_evaluasi;
        }

        foreach ($riwayat as $r) {
            $r->status = ($r->nilai_percobaan >= $kkm_sekarang) ? 'Lulus' : 'Tidak Lulus';
        }

        return response()->json([
            'success' => true,
            'data' => $riwayat,
            'kkm' => $kkm_sekarang // [REVISI] Ikut kirim nilai KKM ke Javascript
        ]);
    }

    // =================================================================
    // MANAJEMEN PENGATURAN KKM
    // =================================================================

    public function pengaturanKkm()
    {
        $kkm = PengaturanKkm::first();
        return view('guru.pengaturankkm', compact('kkm'));
    }

    public function updateKkm(Request $request)
    {
        $request->validate([
            'kkm_kuis1' => 'required|integer|min:0|max:100',
            'kkm_kuis2' => 'required|integer|min:0|max:100',
            'kkm_evaluasi' => 'required|integer|min:0|max:100',
        ]);

        $kkm = PengaturanKkm::first();

        if ($kkm) {
            $kkm->update([
                'kkm_kuis1' => $request->kkm_kuis1,
                'kkm_kuis2' => $request->kkm_kuis2,
                'kkm_evaluasi' => $request->kkm_evaluasi,
            ]);
        } else {
            PengaturanKkm::create($request->only(['kkm_kuis1', 'kkm_kuis2', 'kkm_evaluasi']));
        }

        return redirect()->back()->with('success', 'Nilai KKM berhasil diperbarui!');
    }
}