<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\GuruController;
use App\Http\Controllers\ProgresController; // [DITAMBAHKAN] Memanggil ProgresController
use App\Http\Middleware\CekGuru;

// =============================================================
// 1. PUBLIC ROUTES (Bisa diakses siapa saja)
// =============================================================

Route::get('/', function () {
    return view('beranda');
})->name('home');

Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
    Route::post('/login', [AuthController::class, 'login']); 
    
    Route::get('/register', [AuthController::class, 'showRegisterForm'])->name('register');
    Route::post('/register', [AuthController::class, 'register']);
});

Route::post('/logout', [AuthController::class, 'logout'])->name('logout')->middleware('auth');

// =============================================================
// 2. GROUP ROUTE SISWA & PROGRES (Wajib Login)
// =============================================================

Route::middleware(['auth'])->group(function () {

    // [DITAMBAHKAN] Route untuk menyimpan progres belajar via AJAX/Fetch API
    Route::post('/simpan-progres', [ProgresController::class, 'simpanProgres'])->name('simpan.progres');

    // Route khusus halaman materi siswa (menggunakan prefix /siswa)
    Route::prefix('siswa')->group(function () {
        
        // Materi Gerak
        Route::prefix('gerak')->group(function () {
            Route::view('pengantargerak', 'siswa.gerak.pengantargerak');
            Route::view('pengertiangerak', 'siswa.gerak.pengertiangerak');
            Route::view('jaraktempuhdanperpindahan', 'siswa.gerak.jaraktempuhdanperpindahan');
            Route::view('kelajuandankecepatan', 'siswa.gerak.kelajuandankecepatan');
            Route::view('percepatan', 'siswa.gerak.percepatan');
            Route::view('petunjukpengerjaan', 'siswa.gerak.petunjukpengerjaan');
            Route::view('kuis1', 'siswa.gerak.kuis1');
        });

        // Materi Gaya
        Route::prefix('gaya')->group(function () {
            Route::view('pengantargaya', 'siswa.gaya.pengantargaya');
            Route::view('pengertiangaya', 'siswa.gaya.pengertiangaya');
            Route::view('resultangaya', 'siswa.gaya.resultangaya');
            Route::view('macam-macamgaya', 'siswa.gaya.macam-macamgaya');
            Route::view('hukumnewton', 'siswa.gaya.hukumnewton');
            Route::view('petunjukpengerjaan', 'siswa.gaya.petunjukpengerjaan');
            Route::view('kuis2', 'siswa.gaya.kuis2');
        });

        // Evaluasi
        Route::prefix('evaluasi')->group(function () {
            Route::view('petunjukpengerjaan', 'siswa.evaluasi.petunjukpengerjaan');
            Route::view('mulai', 'siswa.evaluasi.evaluasi'); 
        });
    });
});

// =============================================================
// 3. GROUP ROUTE GURU (Wajib Login & Wajib Peran GURU)
// =============================================================

Route::middleware(['auth', CekGuru::class])->prefix('guru')->group(function () {
    
    // --- MANAJEMEN DATA SISWA ---
    Route::get('/datasiswa', [GuruController::class, 'index'])->name('guru.datasiswa.index');
    Route::delete('/datasiswa/{id}', [GuruController::class, 'destroy'])->name('guru.datasiswa.destroy');
    Route::put('/datasiswa/{id}', [GuruController::class, 'update'])->name('guru.datasiswa.update');

    // --- MANAJEMEN DATA KELAS ---
    Route::get('/datakelas', [GuruController::class, 'indexKelas'])->name('guru.datakelas.index');
    Route::post('/datakelas', [GuruController::class, 'storeKelas'])->name('guru.datakelas.store');
    Route::put('/datakelas/{id}', [GuruController::class, 'updateKelas'])->name('guru.datakelas.update');
    Route::delete('/datakelas/{id}', [GuruController::class, 'destroyKelas'])->name('guru.datakelas.destroy');

    // --- MANAJEMEN PROGRES BELAJAR ---
    Route::get('/progresbelajar', [GuruController::class, 'progresBelajar'])->name('guru.progresbelajar');

    // --- ROUTE NILAI ---
    Route::get('/nilai/kuis1', function() { return "Halaman Nilai Kuis 1"; });
    Route::get('/nilai/kuis2', function() { return "Halaman Nilai Kuis 2"; });
    Route::get('/nilai/evaluasi', function() { return "Halaman Nilai Evaluasi"; });
});