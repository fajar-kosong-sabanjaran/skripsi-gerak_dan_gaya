@extends('layouts.guru')

@section('content')
    <div class="card-guru">
        <div class="header-title-wrapper">
            <h3>Data Jawaban Latihan Siswa</h3>
        </div>
        
        <p style="color: #64748b; margin-bottom: 25px;">
            Silakan pilih materi di bawah ini untuk melihat file PDF jawaban yang telah diselesaikan oleh siswa.
        </p>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px;">
            
            @foreach ($daftar_materi as $kode => $judul)
                <a href="{{ route('guru.jawaban.detail', $kode) }}" style="text-decoration: none; color: inherit;">
                    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 25px 20px; text-align: center; transition: all 0.3s ease; cursor: pointer; box-shadow: 0 4px 6px rgba(0,0,0,0.02);" 
                         onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 10px 20px rgba(0,0,0,0.08)'; this.style.borderColor='#f95c50';" 
                         onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 6px rgba(0,0,0,0.02)'; this.style.borderColor='#e2e8f0';">
                        
                        <div style="width: 60px; height: 60px; background: #fee2e2; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px auto;">
                            <i class="fas fa-book-open" style="font-size: 24px; color: #ef4444;"></i>
                        </div>
                        
                        <h4 style="margin: 0; font-size: 16px; font-weight: 700; color: #1e293b;">{{ $judul }}</h4>
                        <p style="margin: 8px 0 0 0; font-size: 13px; color: #64748b;">Klik untuk melihat PDF</p>
                    </div>
                </a>
            @endforeach

        </div>
    </div>
@endsection