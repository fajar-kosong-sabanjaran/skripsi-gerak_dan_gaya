@extends('layouts.siswa')

@section('content')

<!-- KONTEN -->
<div class="main-content">
  <div class="container">
    <h1>PENGANTAR GERAK</h1>

    <div class="inner-box">
      <h3>Tujuan Pembelajaran</h3> 
      <ul>
        <li>Peserta didik mampu menjelaskan konsep gerak dalam kehidupan sehari - hari.</li>
        <li>Peserta didik dapat mengidentifikasi perbedaan antara kelajuan dan kecepatan melalui peristiwa gerak.</li>
        <li>Peserta didik dapat menerapkan rumus gerak untuk menghitung kelajuan, kecepatan, dan percepatan pada contoh peristiwa dalam kehidupan sehari-hari.</li>
      </ul>
    </div>

<div class="inner-box">
      <h3>Pernahkah Kamu Perhatikan?</h3>
      
      <p>
        Bagaimana cara kamu pergi ke sekolah setiap hari? Apakah kamu menggunakan mobil, motor,
        atau berjalan kaki? Pernahkah kamu memperhatikan seberapa jauh jarak dari rumahmu ke sekolah,
        serta berapa lama waktu yang kamu butuhkan untuk sampai di sana?
      </p>
      
      <p>
        <video class="content-video" autoplay muted loop playsinline>
          <source src="{{ asset('aset/20.mp4') }}" type="video/mp4">
          Browser Anda tidak mendukung tag video.
        </video>
      </p>
      <p class="image-caption">Dua Anak Pergi ke Sekolah</p>

      <p>
        Berdasarkan animasi di atas, terlihat dua anak sedang berjalan. Aktivitas ini menunjukkan bahwa mereka mengalami perubahan posisi dari tempat asalnya. Nah, saat posisi suatu benda berubah terhadap titik awalnya, benda tersebut dikatakan bergerak. Selain itu, perjalanan mereka tentu menempuh jarak tertentu dan memerlukan waktu. Hubungan antara ketiga hal inilah yang akan kita pelajari pada bab ini.
      </p>
    </div>
  </div>

  <!-- NAVIGASI BAWAH MATERI -->
  <div class="bottom-nav">
    <a href="{{ url('siswa/gerak/pengertiangerak') }}" class="nav-btn next">Materi Selanjutnya »</a>
  </div>

</div>

@endsection