<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Models\User;
use App\Http\Controllers\GuruController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// 1. HALAMAN UTAMA (BERANDA)
// Ini adalah halaman tujuan setelah login
Route::get('/', function () {
    return view('beranda');
})->name('home');


// 2. ROUTE TAMPILAN (VIEW)
// Menampilkan halaman form saat tombol diklik
Route::get('/login', function () {
    return view('auth.login');
})->name('login');

Route::get('/register', function () {
    return view('auth.register');
})->name('register');


// 3. ROUTE PROSES (CONTROLLER)
// Menangani data yang dikirim saat tombol "Submit" ditekan
Route::post('/login', [AuthController::class, 'login']); 
Route::post('/register', [AuthController::class, 'register']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');


// --- GROUP ROUTE SISWA (MATERI GERAK) ---
// Middleware auth memastikan hanya user login yang bisa akses
Route::middleware(['auth'])->prefix('siswa/gerak')->group(function () {
    Route::view('pengantargerak', 'siswa.gerak.pengantargerak');
    Route::view('pengertiangerak', 'siswa.gerak.pengertiangerak');
    Route::view('jaraktempuhdanperpindahan', 'siswa.gerak.jaraktempuhdanperpindahan');
    Route::view('kelajuandankecepatan', 'siswa.gerak.kelajuandankecepatan');
    Route::view('percepatan', 'siswa.gerak.percepatan');
    Route::view('petunjukpengerjaan', 'siswa.gerak.petunjukpengerjaan');
    Route::view('kuis1', 'siswa.gerak.kuis1');
});

// --- GROUP ROUTE SISWA (MATERI GAYA) ---
Route::middleware(['auth'])->prefix('siswa/gaya')->group(function () {
    Route::view('pengantargaya', 'siswa.gaya.pengantargaya');
    Route::view('pengertiangaya', 'siswa.gaya.pengertiangaya');
    Route::view('resultangaya', 'siswa.gaya.resultangaya');
    Route::view('macam-macamgaya', 'siswa.gaya.macam-macamgaya');
    Route::view('hukumnewton', 'siswa.gaya.hukumnewton');
    Route::view('petunjukpengerjaan', 'siswa.gaya.petunjukpengerjaan');
    Route::view('kuis2', 'siswa.gaya.kuis2');
});

// --- GROUP ROUTE EVALUASI ---
Route::middleware(['auth'])->prefix('siswa/evaluasi')->group(function () {
    Route::view('petunjukpengerjaan', 'siswa.evaluasi.petunjukpengerjaan');
    Route::view('mulai', 'siswa.evaluasi.evaluasi'); 
});


// --- GROUP ROUTE GURU ---
Route::prefix('guru')->group(function () {
    
    // =============================================================
    // 1. MANAJEMEN DATA SISWA
    // =============================================================
    
    // Tampil Data Siswa (GET)
    Route::get('/datasiswa', [GuruController::class, 'index'])->name('guru.datasiswa.index');

    // Hapus Data Siswa (DELETE)
    Route::delete('/datasiswa/{id}', [GuruController::class, 'destroy'])->name('guru.datasiswa.destroy');

    // Update Data Siswa (PUT)
    Route::put('/datasiswa/{id}', [GuruController::class, 'update'])->name('guru.datasiswa.update');


    // =============================================================
    // 2. MANAJEMEN DATA KELAS [BARU]
    // =============================================================
    
    // Tampil Halaman Data Kelas (GET)
    Route::get('/datakelas', [GuruController::class, 'indexKelas'])->name('guru.datakelas.index');
    
    // Simpan Kelas Baru (POST)
    Route::post('/datakelas', [GuruController::class, 'storeKelas'])->name('guru.datakelas.store');

    // Update Data Kelas (PUT)
    Route::put('/datakelas/{id}', [GuruController::class, 'updateKelas'])->name('guru.datakelas.update');

    // Hapus Data Kelas (DELETE)
    Route::delete('/datakelas/{id}', [GuruController::class, 'destroyKelas'])->name('guru.datakelas.destroy');


    // =============================================================
    // 3. ROUTE NILAI (Placeholder)
    // =============================================================
    Route::get('/nilai/kuis1', function() { return "Halaman Nilai Kuis 1"; });
    Route::get('/nilai/kuis2', function() { return "Halaman Nilai Kuis 2"; });
    Route::get('/nilai/evaluasi', function() { return "Halaman Nilai Evaluasi"; });
});