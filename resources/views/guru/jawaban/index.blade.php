@extends('layouts.guru')

@section('content')
    <div class="card-guru">
        
        <div class="page-header">
            <div class="header-title-wrapper" style="margin-bottom: 5px;">
                <h3 style="margin: 0;">Data Jawaban Latihan Siswa</h3>
                <i class="fas fa-info-circle icon-info-halaman" onclick="showPageInfoJawaban()" title="Klik untuk info halaman"></i>
            </div>
            <br>
        </div>

        <h4 class="kategori-materi-title"></i> Materi Gerak</h4>
        <div class="grid-materi-jawaban">
            
            <a href="{{ route('guru.jawaban.detail', 'pengertian_gerak') }}" class="card-materi-link">
                <div class="card-materi-jawaban">
                    <div class="icon-materi-wrapper">
                        <i class="fas fa-car-side"></i>
                    </div>
                    <h4>Pengertian Gerak</h4>
                    <p>Klik untuk melihat PDF</p>
                </div>
            </a>

            <a href="{{ route('guru.jawaban.detail', 'jarak_tempuh') }}" class="card-materi-link">
                <div class="card-materi-jawaban">
                    <div class="icon-materi-wrapper">
                        <i class="fas fa-route"></i>
                    </div>
                    <h4>Jarak Tempuh & Perpindahan</h4>
                    <p>Klik untuk melihat PDF</p>
                </div>
            </a>

            <a href="{{ route('guru.jawaban.detail', 'kelajuan') }}" class="card-materi-link">
                <div class="card-materi-jawaban">
                    <div class="icon-materi-wrapper">
                        <i class="fas fa-tachometer-alt"></i>
                    </div>
                    <h4>Kelajuan & Kecepatan</h4>
                    <p>Klik untuk melihat PDF</p>
                </div>
            </a>

            <a href="{{ route('guru.jawaban.detail', 'percepatan') }}" class="card-materi-link">
                <div class="card-materi-jawaban">
                    <div class="icon-materi-wrapper">
                        <i class="fas fa-rocket"></i>
                    </div>
                    <h4>Percepatan</h4>
                    <p>Klik untuk melihat PDF</p>
                </div>
            </a>

        </div>

        <br><br>

        <h4 class="kategori-materi-title"></i> Materi Gaya</h4>
        <div class="grid-materi-jawaban">

            <a href="{{ route('guru.jawaban.detail', 'pengertian_gaya') }}" class="card-materi-link">
                <div class="card-materi-jawaban">
                    <div class="icon-materi-wrapper">
                        <i class="fas fa-people-arrows"></i>
                    </div>
                    <h4>Pengertian Gaya</h4>
                    <p>Klik untuk melihat PDF</p>
                </div>
            </a>

            <a href="{{ route('guru.jawaban.detail', 'resultan_gaya') }}" class="card-materi-link">
                <div class="card-materi-jawaban">
                    <div class="icon-materi-wrapper">
                        <i class="fas fa-compress-arrows-alt"></i>
                    </div>
                    <h4>Resultan Gaya</h4>
                    <p>Klik untuk melihat PDF</p>
                </div>
            </a>

            <a href="{{ route('guru.jawaban.detail', 'macam_macam_gaya') }}" class="card-materi-link">
                <div class="card-materi-jawaban">
                    <div class="icon-materi-wrapper">
                        <i class="fas fa-layer-group"></i>
                    </div>
                    <h4>Macam-Macam Gaya</h4>
                    <p>Klik untuk melihat PDF</p>
                </div>
            </a>

            <a href="{{ route('guru.jawaban.detail', 'hukum_newton') }}" class="card-materi-link">
                <div class="card-materi-jawaban">
                    <div class="icon-materi-wrapper">
                        <i class="fas fa-apple-alt"></i>
                    </div>
                    <h4>Hukum Newton</h4>
                    <p>Klik untuk melihat PDF</p>
                </div>
            </a>

        </div>

    </div>
@endsection