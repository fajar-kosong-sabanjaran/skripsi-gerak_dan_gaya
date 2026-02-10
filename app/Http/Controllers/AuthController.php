<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Kelas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // ================= MENAMPILKAN HALAMAN =================
    
    public function showRegisterForm()
    {
        $data_kelas = Kelas::all(); 
        return view('auth.register', compact('data_kelas'));
    }

    public function showLoginForm()
    {
        $data_kelas = Kelas::all(); 
        return view('auth.login', compact('data_kelas'));
    }

    // ================= PROSES REGISTER =================
    public function register(Request $request)
    {
        $validated = $request->validate([
            'nama_lengkap' => 'required|string|max:255',
            'email'        => 'required|email|unique:users',
            'password'     => 'required|min:6|confirmed', 
            'peran'        => 'required|in:siswa,guru',
            'kelas_id'     => 'required_if:peran,siswa|exists:kelas,id', 
        ], [
            'nama_lengkap.required' => 'Nama lengkap wajib diisi.',
            'email.required'        => 'Email wajib diisi.',
            'email.email'           => 'Format email tidak valid.',
            'email.unique'          => 'Email ini sudah terdaftar.',
            'password.required'     => 'Kata sandi wajib diisi.',
            'password.min'          => 'Kata sandi minimal 6 karakter.',
            'password.confirmed'    => 'Konfirmasi kata sandi tidak cocok.',
            'kelas_id.required_if'  => 'Silakan pilih kelas terlebih dahulu.',
        ]);

        $user = User::create([
            'nama_lengkap' => $validated['nama_lengkap'],
            'email'        => $validated['email'],
            'password'     => Hash::make($validated['password']),
            'peran'        => $validated['peran'],
            'nomor_induk'  => $request->nomor_induk ?? null, 
            'kelas_id'     => $request->kelas_id, 
        ]);

        Auth::login($user);
        $request->session()->regenerate();

        if ($user->peran === 'guru') {
            return redirect()->route('guru.datasiswa.index');
        }

        return redirect('/'); 
    }

    // =========================================================================
    // PROSES LOGIN (REVISI FINAL: MEMPERTAHANKAN INPUT DROPWDOWN)
    // =========================================================================
    public function login(Request $request)
    {
        // 1. Validasi Input Dasar
        $request->validate([
            'email'       => 'required|email',
            'password'    => 'required',
            'peran_login' => 'required|in:siswa,guru' 
        ], [
            'email.required'       => 'Email wajib diisi.',
            'password.required'    => 'Kata sandi wajib diisi.',
            'peran_login.required' => 'Silakan pilih peran (Siswa/Guru).'
        ]);

        // 2. Cek Email di Database
        $user = User::where('email', $request->email)->first();

        // JIKA EMAIL TIDAK DITEMUKAN
        if (!$user) {
            return back()->withErrors([
                'email' => 'Email tidak terdaftar dalam sistem.',
            ])->withInput($request->except('password')); // Kembalikan input agar dropdown tidak reset
        }

        // 3. CEK KECOCOKAN PERAN (PENTING!)
        $peranInput = $request->peran_login; 
        
        if ($user->peran !== $peranInput) {
            $pesanError = "Email ini terdaftar sebagai " . ucfirst($user->peran) . ", bukan " . ucfirst($peranInput) . ". Silakan ganti pilihan 'Masuk Sebagai'.";
            
            return back()->withErrors([
                'email' => $pesanError,
            ])->withInput($request->except('password')); // Kembalikan input agar dropdown tidak reset
        }

        // 4. Cek Password
        if (!Hash::check($request->password, $user->password)) {
            return back()->withErrors([
                'password' => 'Kata sandi yang Anda masukkan salah.',
            ])->withInput($request->except('password')); // Kembalikan input agar dropdown tidak reset
        }

        // 5. Validasi KHUSUS SISWA
        if ($user->peran === 'siswa') {
            $inputKelasId = $request->kelas_id_login; 

            if (!$inputKelasId) {
                return back()->withErrors([
                    'kelas_id_login' => 'Akun ini adalah akun Siswa. Silakan pilih kelas Anda.',
                ])->withInput($request->except('password'));
            }

            if ((int)$inputKelasId !== (int)$user->kelas_id) {
                $kelasAsli = $user->kelas->nama ?? 'Lainnya';
                return back()->withErrors([
                    'kelas_id_login' => "Kelas salah! Data Anda terdaftar di kelas $kelasAsli.",
                ])->withInput($request->except('password'));
            }
        }

        // 6. Login Sukses
        Auth::login($user);
        $request->session()->regenerate();

        if ($user->peran === 'guru') {
            return redirect()->route('guru.datasiswa.index');
        }

        return redirect()->intended('/'); 
    }

    // ================= PROSES LOGOUT =================
    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/'); 
    }
}