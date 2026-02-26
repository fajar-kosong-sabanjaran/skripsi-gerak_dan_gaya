<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('nilais', function (Blueprint $table) {
            $table->id();
            // Menghubungkan ke tabel users
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('jenis_kuis', 50); // Contoh: 'Kuis 1', 'Kuis 2', 'Evaluasi'
            $table->integer('nilai_tertinggi')->default(0);
            $table->string('status_akhir', 20)->default('Tidak Lulus');
            $table->integer('jumlah_percobaan')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nilais');
    }
};