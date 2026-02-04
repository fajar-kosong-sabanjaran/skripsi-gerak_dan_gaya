@extends('layouts.siswa')

@section('content')

<!-- KONTEN -->
<div class="main-content">
  <div class="container">
    <h1>PENGERTIAN GERAK</h1>

    <div class="inner-box">
      <h3>Pengertian Gerak</h3>
      <p>
        <b>Gerak adalah perubahan posisi atau perpindahan suatu benda dari satu tempat ke tempat lainnya.</b>
        Ketika sebuah benda mengalami pergeseran atau berpindah kedudukan, berarti benda tersebut sedang bergerak.
        Gerak merupakan salah satu fenomena alam yang dapat kita amati setiap waktu di sekitar kita.
        Suatu benda dikatakan bergerak apabila posisinya berubah terhadap titik acuan, baik bergerak menjauh maupun mendekat darinya.
        <p>
          Perhatikan video berikut untuk memahami contoh peristiwa gerak:
        </p>
      </p>

      <p>
        <video class="content-video" autoplay muted loop playsinline>
          <source src="{{ asset('aset/17.mp4') }}" type="video/mp4">
          Browser Anda tidak mendukung tag video.
        </video>
      </p>
      <p class="image-caption">Video Gerak</p>

      <p>
        Berdasarkan video di atas, terlihat sebuah bus sekolah yang melaju meninggalkan rumah menuju sekolah.
        Di sini, rumah berperan sebagai titik acuan. Karena posisi bus terus berubah menjauhi rumah seiring berjalannya waktu,
        maka bus tersebut dikatakan bergerak. <b>Jadi, gerak itu terjadi karena adanya perubahan posisi benda terhadap titik acuannya.</b>
      </p>
    </div>

    <div class="inner-box">
      <h3>Gerak Semu dan Gerak Relatif</h3>
      <p>
        Jika dilihat dari acuan pengamatannya, gerak dapat dibedakan menjadi dua jenis, yaitu gerak semu dan gerak relatif.
      </p>
      <br>
      <h4>1. Gerak Semu</h4>
      <p>
        <b>Gerak semu adalah kejadian ketika suatu benda sebenarnya diam, tetapi terlihat seolah-olah bergerak
        bagi orang yang sedang mengamatinya.</b>
        Hal ini terjadi karena orang yang melihat sedang berada di dalam benda lain yang sedang bergerak.
      </p>
      <p>
        Perhatikan animasi berikut untuk lebih jelasnya:
      </p>

      <p>
        <video class="content-video" autoplay muted loop playsinline>
          <source src="{{ asset('aset/18.mp4') }}" type="video/mp4">
          Browser Anda tidak mendukung tag video.
        </video>
      </p>
      <p class="image-caption">Animasi Gerak Semu</p>

      <p>
        Pada animasi di atas, kita melihat pemandangan jalan dan pepohonan seolah-olah bergerak mundur menjauhi kita.
        Padahal sebenarnya pohon-pohon tersebut diam tertanam di tanah. Yang sebenarnya bergerak adalah kita yang berada di dalam kendaraan.
        Ilusi inilah yang disebut dengan gerak semu.
      </p>
      <br>

      <h4>2. Gerak Relatif</h4>
      <p>
        <b>Gerak relatif adalah gerak yang bergantung pada titik acuan atau tempat kita mengamati.</b>
        Artinya, suatu benda bisa dikatakan bergerak oleh satu orang, tapi dikatakan diam oleh orang lain,
        tergantung dari mana mereka melihatnya.
      </p>
      <p>
        Perhatikan animasi berikut untuk memahami contoh peristiwa gerak relatif:
      </p>

      <p>
        <video class="content-video" autoplay muted loop playsinline>
          <source src="{{ asset('aset/19.mp4') }}" type="video/mp4">
          Browser Anda tidak mendukung tag video.
        </video>
      </p>
      <p class="image-caption">Animasi Gerak Relatif</p>

      <p>
        Berdasarkan animasi di atas, bagi anak yang duduk santai di rumput, mobil merah tersebut jelas terlihat bergerak melintasinya.
        Namun, bayangkan jika kamu adalah sopir di dalam mobil itu. Bagi kamu, teman di sebelahmu terlihat diam tidak bergerak,
        karena posisi kalian tetap sama satu sama lain selama perjalanan. Inilah yang dimaksud gerak relatif, status gerak benda bergantung pada siapa yang melihatnya.
      </p>
    </div>

    <div class="inner-box">
      <h3>Mari Mencoba</h3>
      
      <p>
        Yuk, kita uji pemahamanmu! Di bawah ini terdapat beberapa kartu. 
        Tugasmu adalah memilah mana peristiwa yang termasuk Gerak Semu dan mana yang Gerak Relatif.
      </p>

      <div class="kotak-instruksi">
        <p>
          <i class="fas fa-info-circle"></i> Petunjuk Pengerjaan:
        </p>
        <ul>
          <li>Klik dan tahan (drag) kartu pernyataan yang ada di bawah.</li>
          <li>Geser kartu tersebut lalu lepaskan ke dalam kotak kategori yang sesuai.</li>
          <li>Jika sudah yakin, tekan tombol Cek Jawaban untuk melihat hasilnya.</li>
        </ul>
      </div>

      <div class="drag-container">
        <div class="drop-column">
          <div class="drop-header">Gerak Semu</div>
          <div class="drop-zone" id="drop-semu" data-type="semu"></div>
        </div>
        <div class="drop-column">
          <div class="drop-header">Gerak Relatif</div>
          <div class="drop-zone" id="drop-relatif" data-type="relatif"></div>
        </div>
      </div>

      <p class="card-pool-title">Kartu Pernyataan:</p>
      
      <div class="card-pool" id="card-pool" data-type="pool">
        <div class="card-item" id="card1" draggable="true" data-answer="semu">
          Saat berada di kapal, pulau terlihat menjauh dari kita.
        </div>
        <div class="card-item" id="card2" draggable="true" data-answer="relatif">
          Anak di eskalator tampak bergerak bagi orang di lantai bawah.
        </div>
        <div class="card-item" id="card3" draggable="true" data-answer="relatif">
          Orang berlari di treadmill terlihat diam dari luar.
        </div>
        <div class="card-item" id="card4" draggable="true" data-answer="semu">
          Saat berjalan, awan tampak bergerak mengikuti kita.
        </div>
        <div class="card-item" id="card5" draggable="true" data-answer="relatif">
          Dua kapal yang berlayar sejajar tampak tidak bergerak satu sama lain.
        </div>
        <div class="card-item" id="card6" draggable="true" data-answer="semu">
          Saat naik bus, pepohonan di tepi jalan terlihat bergerak mundur.
        </div>
      </div>

      <button type="button" class="btn-check" id="btn-check">Cek Jawaban</button>
      <p id="feedback" class="feedback"></p>
    </div>

  </div>

  <!-- NAVIGASI BAWAH MATERI -->
  <div class="bottom-nav">
    <a href="{{ url('siswa/gerak/pengantargerak') }}" class="nav-btn prev">« Materi Sebelumnya</a>
    <a href="{{ url('siswa/gerak/jaraktempuhdanperpindahan') }}" class="nav-btn next">Materi Selanjutnya »</a>
  </div>
</div>

<!-- MODAL HASIL -->
<div id="result-modal" class="modal">
  <div class="modal-content">
    <h4>Hasil Latihan</h4>
    <p id="modal-text"></p>
    <button type="button" id="close-modal" class="btn-check">Tutup</button>
  </div>
</div>

@endsection