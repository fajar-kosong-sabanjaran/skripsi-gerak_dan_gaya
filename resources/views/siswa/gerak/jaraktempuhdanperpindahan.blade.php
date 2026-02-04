@extends('layouts.siswa')

@section('content')

<div class="main-content">
  <div class="container">
    <h1>JARAK TEMPUH DAN PERPINDAHAN</h1>

    <div class="inner-box">
      <h3>JARAK TEMPUH DAN PERPINDAHAN</h3>
      
      <p>
        <b>Jarak tempuh adalah panjang lintasan yang dilalui suatu benda tanpa memedulikan arah geraknya.</b> Artinya, seluruh panjang jalan yang dilewati benda tersebut dihitung sebagai jarak. Sementara itu, <b>perpindahan adalah jarak antara posisi awal dan posisi akhir benda dengan memperhatikan arah gerak.</b> Perpindahan dapat digambarkan sebagai garis lurus terpendek yang menghubungkan posisi awal dan posisi akhir. Jadi, dapat disimpulkan bahwa jarak dan perpindahan memiliki makna yang berbeda meskipun keduanya sama-sama menggambarkan perubahan posisi benda. 
      </p>

      <p>Perhatikan ilustrasi berikut untuk membedakannya:</p>

      <p>
        <img src="{{ asset('aset/22.jpg') }}" alt="Ilustrasi Jarak dan Perpindahan Budi" class="content-image2">
      </p>
      <p class="image-caption">Ilustrasi Perjalanan Pulang-Pergi</p>

      <p>
        Berdasarkan ilustrasi di atas, dimisalkan Budi pergi dari rumah ke sekolah dengan jarak 10 km. Setelah sekolahnya selesai, Budi kembali lagi dari sekolah menuju ke rumah melewati jalan yang sama sejauh 10 km.
        Maka perhitungannya adalah:
        <br>
        1. Jarak Tempuh:
        <br>
        Karena jarak menghitung total panjang lintasan yang dilalui, maka kita menjumlahkan perjalanan berangkat dan pulang.
        <br>
        10 km (berangkat) + 10 km (pulang) = 20 km.
        <br>
        2. Perpindahan:
        <br>
        Perpindahan hanya melihat posisi awal dan posisi akhir. Budi bermula di rumah dan berakhir kembali di rumah. Karena posisi awal dan posisi akhirnya sama, maka Budi dianggap tidak mengalami perubahan posisi.
        <br>
        Perpindahan = 0 km.
      </p>
    </div>

    <div class="inner-box">
      <h3>Animasi jarak tempuh dan perpindahan</h3>

      <div class="kotak-instruksi">
        <p>
          <i class="fas fa-info-circle"></i> Petunjuk Penggunaan:
        </p>
        <ul>
          <li>Perhatikan alur gerak mobil dan ingat jarak antar-titik (A–B = 4 km, B–C = 6 km).</li>
          <li>Klik tombol "Mulai Animasi" untuk melihat pergerakan mobil dari awal hingga akhir dan tombol "Reset" untuk mengulang animasi.</li>
          <li>Selesaikan pertanyaan yang muncul setelah animasi selesai untuk menguji pemahamanmu.</li>
        </ul>
      </div>

      <p>
        Untuk memudahkanmu memahami perbedaan antara <b>jarak tempuh</b> dan
        <b>perpindahan</b>, perhatikan lintasan gerak pada animasi berikut.
        Mobil akan bergerak dari titik A (Rumah) ke B (Toko), kemudian ke C (Sekolah),
        dan kembali lagi ke B (Toko).
      </p>

      <div class="anim-wrapper">
        <h2>Animasi Gerak Mobil</h2>
        <p class="anim-desc">
          Mobil bergerak dari titik A → B → C → kembali ke B.  
          Perhatikan bagaimana <b>jarak tempuh</b> dan <b>perpindahan</b> berubah.
        </p>

        <div class="anim-scene">
          <div class="anim-road"></div>

          <div class="anim-point" id="pointA" style="left: 40px;">
            <img src="/aset/rumah.jpg" alt="Ikon Rumah (A)" class="ikon-titik">
            <div class="label-titik"><strong>A</strong><br><span>Rumah</span></div>
          </div>

          <div class="anim-point" id="pointB" style="left: 41%;">
            <img src="/aset/toko.jpg" alt="Ikon Toko (B)" class="ikon-titik">
            <div class="label-titik"><strong>B</strong><br><span>Toko</span></div>
          </div>

          <div class="anim-point" id="pointC" style="right: 40px; transform: translateX(50%);">
            <img src="/aset/sekolah.jpg" alt="Ikon Sekolah (C)" class="ikon-titik">
            <div class="label-titik"><strong>C</strong><br><span>Sekolah</span></div>
          </div>

          <div class="anim-label-dist" style="left: 20%;">A → B = 4 km</div>
          <div class="anim-label-dist" style="left: 80%;">B → C = 6 km</div>

          <img src="/aset/mobil.jpg" id="car" class="anim-car" alt="Mobil">
        </div>

        <div class="anim-controls">
          <button class="anim-btn" id="btn-start">Mulai Animasi</button>
          <button class="anim-btn secondary" id="btn-reset">Reset</button>
        </div>
      </div>
    </div>

    <div class="inner-box">
      <h3>Ayo Berlatih</h3>

      <div class="kotak-instruksi">
        <p>
          <i class="fas fa-info-circle"></i> Petunjuk Pengerjaan:
        </p>
        <ul>
          <li>Baca cerita Adi di sirkuit balap dengan teliti.</li>
          <li>Isikan jawabanmu pada kolom yang tersedia (titik-titik).</li>
          <li>Gunakan huruf kapital (A, B) untuk jawaban posisi dan angka saja untuk jawaban hitungan (contoh: 100).</li>
          <li>Tekan tombol "Cek Jawaban" untuk melihat hasil kerjamu, atau tombol "Coba Lagi" jika ingin mengulang.</li>
        </ul>
      </div>

      <p>
        Adi sedang mempersiapkan diri untuk mengikuti lomba balap mobil di sirkuit. Satu putaran lintasan memiliki panjang <b>110 meter.</b> 
        Jika Adi mengendarai mobilnya sebanyak <b>5 putaran</b>, maka berapakah total jarak yang ditempuh dan berapa besar perpindahannya?
      </p>

      <img src="{{ asset('aset/sirkuit.png') }}" class="gambar-latihan" alt="Sirkuit Adi">
      <p class="keterangan-gambar">Latihan soal jarak tempuh dan perpindahan</p>

      <p>
        <b>Pertanyaan : </b> 
      </p>

      <div class="baris-soal">
        <label for="soal1">1. Di mana posisi awal Adi saat mulai mengemudi ?</label>
        <input type="text" id="soal1" class="isian-pendek" placeholder="...">
      </div>

      <div class="baris-soal">
        <label for="soal2">2. Di titik mana Adi mengakhiri putarannya?</label>
        <input type="text" id="soal2" class="isian-pendek" placeholder="...">
      </div>

      <div class="baris-soal">
        <label for="soal3">3. Berapa panjang lintasan Adi dalam satu putaran?</label>
        <div style="display:flex; align-items:center; gap:8px;">
          <input type="text" id="soal3" class="isian-sedang" placeholder="...">
          <span class="satuan-meter">meter</span>
        </div>
      </div>

      <div class="baris-soal">
        <label for="soal4">4. Berapa total jarak yang ditempuh jika ia mengemudi 5 putaran?</label>
        <div style="display:flex; align-items:center; gap:8px;">
          <input type="text" id="soal4" class="isian-sedang" placeholder="...">
          <span class="satuan-meter">meter</span>
        </div>
      </div>

      <div class="baris-soal">
        <label for="soal5">5. Berapa besar perpindahan Adi selama menyelesaikan putaran?</label>
        <div style="display:flex; align-items:center; gap:8px;">
          <input type="text" id="soal5" class="isian-sedang" placeholder="...">
          <span class="satuan-meter">meter</span>
        </div>
      </div>

      <div class="aksi-latihan">
        <button class="tombol-cek" id="cek-adi">Cek Jawaban</button>
        <button class="tombol-reset" id="reset-adi">Coba Lagi</button>
        
        <button class="tombol-unduh" id="unduh-adi">
          <i class="fas fa-file-pdf"></i> Unduh Jawaban
        </button>
      </div>

      <div class="umpan-balik" id="umpan-balik-adi" aria-live="polite"></div>
    </div>

  </div>

  <div class="bottom-nav">
    <a href="{{ url('siswa/gerak/pengertiangerak') }}" class="nav-btn prev">« Materi Sebelumnya</a>
    <a href="{{ url('siswa/gerak/kelajuandankecepatan') }}" class="nav-btn next">Materi Selanjutnya »</a>
  </div>

</div>

<div class="anim-modal" id="quiz-modal">
  <div class="anim-modal-content">
    <h3 id="quiz-question"></h3>

    <input type="text" id="quiz-input"
           placeholder="Jawaban Kamu..."
           style="width:100%;padding:10px;margin-top:10px;">

    <p id="quiz-feedback" style="margin-top:10px;"></p>

    <div style="margin-top:15px;">
      <button class="anim-btn" id="quiz-submit">Jawab</button>
      <button class="anim-btn" id="quiz-next" style="display:none;">Lanjut</button>
    </div>
  </div>
</div>

<div class="anim-modal" id="result-modal">
  <div class="anim-modal-content">
    <h3>Ringkasan Gerak</h3>
    <p id="modal-text"></p>
    <button class="anim-btn" id="close-modal">Tutup</button>
  </div>
</div>

@endsection