<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('riwayat_nilais', function (Blueprint $table) {
            $table->id();
            // Menghubungkan ke tabel nilais
            $table->foreignId('nilai_id')->constrained('nilais')->onDelete('cascade');
            $table->integer('percobaan_ke');
            $table->dateTime('waktu_mulai')->nullable();
            $table->dateTime('waktu_selesai')->nullable();
            $table->integer('nilai_percobaan');
            $table->string('status', 20); // 'Lulus' atau 'Tidak Lulus'
            $table->json('detail_jawaban')->nullable(); // Menyimpan array [true, false, true...]
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('riwayat_nilais');
    }
};
