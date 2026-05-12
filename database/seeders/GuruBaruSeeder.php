<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class GuruBaruSeeder extends Seeder
{
    public function run()
    {
        DB::table('users')->insert([
            'nama_lengkap' => 'Guru',
            'email' => 'guru@gmail.com',
            'password' => Hash::make('password'),
            'peran' => 'guru',
            'nomor_induk' => '19850101202602', // NIP/Nomor Induk buatan
            'kelas_id' => null, // Guru tidak terikat pada satu kelas
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}