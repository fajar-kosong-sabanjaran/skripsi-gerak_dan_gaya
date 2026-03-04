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
        Schema::create('pengaturan_kkms', function (Blueprint $table) {
            $table->id();
            // Kita set default awalnya 70
            $table->integer('kkm_kuis1')->default(70);
            $table->integer('kkm_kuis2')->default(70);
            $table->integer('kkm_evaluasi')->default(70);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengaturan_kkms');
    }
};