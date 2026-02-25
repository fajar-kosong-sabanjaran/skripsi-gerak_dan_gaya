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
            Schema::create('progres_belajars', function (Blueprint $table) {
                $table->id();
                // Menyambungkan ke tabel users
                $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
                
                // Menyimpan nama materi (misal: 'pengertiangerak_completed')
                $table->string('kode_materi'); 
                
                // Status: 1 jika sudah selesai/lulus
                $table->boolean('status')->default(true); 
                
                $table->timestamps();
                
                // Mencegah 1 user memiliki duplikat progres pada materi yang sama
                $table->unique(['user_id', 'kode_materi']); 
            });
        }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('progres_belajars');
    }
};
