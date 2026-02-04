<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // ================= PROSES REGISTER =================
    public function register(Request $request)
    {
        // 1. Validasi Input (DENGAN PESAN BAHASA INDONESIA)
        $validated = $request->validate([
            'nama_lengkap' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6|confirmed', 
            'peran' => 'required|in:siswa,guru',
        ], [
            // Custom Error Messages (Bahasa Indonesia)
            'nama_lengkap.required' => 'Nama lengkap wajib diisi.',
            'email.required' => 'Email wajib diisi.',
            'email.email' => 'Format email tidak valid.',
            'email.unique' => 'Email ini sudah terdaftar, silakan gunakan email lain.',
            'password.required' => 'Kata sandi wajib diisi.',
            'password.min' => 'Kata sandi minimal harus 6 karakter.',
            'password.confirmed' => 'Konfirmasi kata sandi tidak cocok.',
        ]);

        // 2. Simpan ke Database
        $user = User::create([
            'nama_lengkap' => $validated['nama_lengkap'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'peran' => $validated['peran'],
            'nomor_induk' => $request->nomor_induk ?? null, 
        ]);

        // 3. Otomatis Login setelah daftar
        Auth::login($user);

        // 4. Redirect ke Halaman Utama (Beranda)
        $request->session()->regenerate();
        return redirect('/'); 
    }

    // ================= PROSES LOGIN =================
    public function login(Request $request)
    {
        // 1. Validasi Input (Bahasa Indonesia)
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ], [
            'email.required' => 'Email wajib diisi.',
            'password.required' => 'Kata sandi wajib diisi.',
        ]);

        // 2. Cek apakah email & password cocok
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            
            // Jika sukses, arahkan kembali ke Beranda
            return redirect()->intended('/'); 
        }

        // 3. Jika gagal, kembalikan ke halaman login dengan pesan error
        return back()->withErrors([
            'email' => 'Email atau kata sandi salah.',
        ])->onlyInput('email');
    }

    // ================= PROSES LOGOUT =================
    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/'); // Kembali ke halaman depan
    }
}