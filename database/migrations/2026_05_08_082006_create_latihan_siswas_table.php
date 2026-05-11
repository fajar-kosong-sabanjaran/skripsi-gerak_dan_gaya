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
        Schema::create('latihan_siswas', function (Blueprint $table) {
            $table->id();
            // user_id tetap kita buat di sini sebagai FK yang terhubung ke tabel users
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            // Menyimpan kode dari materi yang dikerjakan
            $table->string('kode_materi');
            // Menyimpan path file PDF di dalam storage
            $table->string('file_pdf');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('latihan_siswas');
    }
};