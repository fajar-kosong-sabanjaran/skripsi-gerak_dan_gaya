@extends('layouts.siswa')

@section('content')

<div class="main-content">
  <div class="container">
    <h1>PENGERTIAN GAYA</h1>

    <div class="inner-box">
      <h3>Pengertian Gaya</h3>
    
      <p>
        <b>Gaya adalah tarikan atau dorongan yang diberikan pada suatu benda.</b>
        Dalam kehidupan sehari-hari, kita sering melakukan aktivitas yang melibatkan gaya tanpa kita sadari.
        Gaya inilah yang menyebabkan suatu benda yang semula diam menjadi bergerak atau berpindah posisi.
      </p>

      <p>
        Perhatikan animasi berikut untuk membedakan jenis gaya:
      </p>

      <div class="gaya-video-container">
        
        <div class="gaya-video-item">
          <video autoplay muted loop playsinline>
            <source src="{{ asset('aset/2.mp4') }}" type="video/mp4">
            Browser Anda tidak mendukung tag video.
          </video>
          <span class="video-label"><i>Gaya Tarik (Membuka Pintu)</i></span>
        </div>

        <div class="gaya-video-item">
          <video autoplay muted loop playsinline>
            <source src="{{ asset('aset/1.mp4') }}" type="video/mp4">
            Browser Anda tidak mendukung tag video.
          </video>
          <span class="video-label"><i>Gaya Dorong (Mendorong Meja)</i></span>
        </div>

      </div>

      <p>
        Berdasarkan animasi di atas, terlihat dua contoh aktivitas gaya yang berbeda.
        Pada video sebelah kiri, seorang siswa sedang memberikan gaya <b>tarik</b> pada gagang pintu untuk membukanya.
        Sedangkan pada video sebelah kanan, siswa tersebut memberikan gaya <b>dorong</b> pada meja agar berpindah tempat.
        <b>Jadi, intinya gaya itu berupa tarikan atau dorongan yang membuat benda mengalami perubahan gerak.</b>
      </p>
    </div>

    <div class="inner-box">
      <h3>Pengaruh Gaya Terhadap Benda</h3>
      
      <p>
        Selain menggerakkan benda diam, gaya memiliki pengaruh besar terhadap kondisi fisik benda. 
        Secara umum, terdapat tiga pengaruh utama gaya yang dapat kita amati dalam kehidupan sehari-hari.
      </p>
      
      <p><b>1. Gaya Mengubah Arah Gerak Benda</b></p>
      <p>
        Benda yang sedang bergerak lurus dapat berubah arah apabila dikenai gaya. 
        Arah gerak benda akan mengikuti arah gaya yang diberikan padanya.
      </p>
      
      <p>
        <video class="content-video" autoplay muted loop playsinline>
          <source src="{{ asset('aset/34.mp4') }}" type="video/mp4">
          Browser Anda tidak mendukung tag video.
        </video>
      </p>
      <p class="image-caption">Perubahan arah bola akibat tendangan</p>
      
      <p>
        Perhatikan animasi di atas. Bola yang menggelinding lurus menjadi berbelok arah setelah menerima tendangan. 
        Perubahan lintasan bola tersebut membuktikan bahwa gaya mampu mengubah arah gerak benda.
      </p>

      <br>
      <p><b>2. Gaya Mengubah Bentuk Benda</b></p>
      <p>
        Gaya dapat menyebabkan perubahan bentuk pada suatu benda. 
        Hal ini umumnya terjadi pada benda-benda yang bersifat lunak atau elastis.
      </p>
      
      <p>
        <video class="content-video" autoplay muted loop playsinline>
          <source src="{{ asset('aset/35.mp4') }}" type="video/mp4">
          Browser Anda tidak mendukung tag video.
        </video>
      </p>
      <p class="image-caption">Perubahan bentuk slime</p>
      
      <p>
        Berdasarkan animasi, bentuk <i>slime</i> berubah menjadi pipih dan memanjang saat ditarik siswa. 
        Perubahan fisik dari bentuk aslinya ini terjadi akibat gaya tarikan tangan terhadap benda tersebut.
      </p>

      <br>
      <p><b>3. Gaya Mengubah Kecepatan Benda</b></p>
      <p>
        Pemberian gaya dapat mempengaruhi kecepatan gerak benda. 
        Gaya dapat membuat benda bergerak semakin cepat atau justru semakin lambat hingga berhenti.
      </p>
      
      <p>
        <video class="content-video" autoplay muted loop playsinline>
          <source src="{{ asset('aset/36.mp4') }}" type="video/mp4">
          Browser Anda tidak mendukung tag video.
        </video>
      </p>
      <p class="image-caption">Aktivitas bersepeda</p>
      
      <p>
        Perhatikan animasi bersepeda tersebut. Sepeda akan melaju cepat saat pedal dikayuh kuat, dan melambat saat direm. 
        Hal ini menunjukkan bahwa besar kecilnya gaya berpengaruh langsung terhadap perubahan kecepatan benda.
      </p>
    </div>

    <div class="inner-box">
      <h3>Kuis Kilat: Pahamkah Kamu? 🤔</h3>

      <div class="kotak-instruksi">
        <p>
          <i class="fas fa-info-circle"></i> Petunjuk Pengerjaan:
        </p>
        <ul>
          <li>Baca setiap soal dengan teliti.</li>
          <li>Pilih salah satu jawaban yang menurutmu paling tepat dengan mengkliknya.</li>
          <li>Jika jawabanmu benar, tombol akan berubah warna menjadi hijau.</li>
          <li>Jika jawabanmu salah, tombol akan berubah merah.</li>
        </ul>
      </div>

      <div class="kotak-kuis-gaya">
        <p class="teks-soal">1. Apa yang dimaksud dengan gaya dalam ilmu fisika?</p>
        <div class="grup-opsi">
          <button class="tombol-opsi" onclick="cekJawaban(this, 'salah')">A. Energi yang membuat benda menjadi panas</button>
          <button class="tombol-opsi" onclick="cekJawaban(this, 'benar')">B. Tarikan atau dorongan yang menyebabkan benda bergerak</button>
          <button class="tombol-opsi" onclick="cekJawaban(this, 'salah')">C. Kemampuan benda untuk diam selamanya</button>
        </div>
        <p class="teks-respon"></p>
      </div>

      <div class="kotak-kuis-gaya">
        <p class="teks-soal">2. Saat kamu bermain tanah liat atau plastisin lalu menekannya menjadi bentuk pipih, gaya yang kamu berikan menyebabkan...</p>
        <div class="grup-opsi">
          <button class="tombol-opsi" onclick="cekJawaban(this, 'salah')">A. Benda berubah arah</button>
          <button class="tombol-opsi" onclick="cekJawaban(this, 'benar')">B. Benda berubah bentuk</button>
          <button class="tombol-opsi" onclick="cekJawaban(this, 'salah')">C. Benda berubah kecepatan</button>
        </div>
        <p class="teks-respon"></p>
      </div>

      <div class="kotak-kuis-gaya">
        <p class="teks-soal">3. Kiper menepis bola yang ditendang lawan sehingga bola tidak masuk ke gawang melainkan melenceng ke samping. Peristiwa ini menunjukkan gaya dapat...</p>
        <div class="grup-opsi">
          <button class="tombol-opsi" onclick="cekJawaban(this, 'benar')">A. Mengubah arah gerak benda</button>
          <button class="tombol-opsi" onclick="cekJawaban(this, 'salah')">B. Mengubah bentuk benda</button>
          <button class="tombol-opsi" onclick="cekJawaban(this, 'salah')">C. Menambah massa benda</button>
        </div>
        <p class="teks-respon"></p>
      </div>

      <div class="kotak-kuis-gaya">
        <p class="teks-soal">4. Ayah menginjak rem mobil saat mendekati lampu merah. Akibat gaya gesek rem tersebut, mobil mengalami...</p>
        <div class="grup-opsi">
          <button class="tombol-opsi" onclick="cekJawaban(this, 'salah')">A. Perubahan bentuk</button>
          <button class="tombol-opsi" onclick="cekJawaban(this, 'salah')">B. Perubahan arah</button>
          <button class="tombol-opsi" onclick="cekJawaban(this, 'benar')">C. Perubahan kecepatan (menjadi lambat)</button>
        </div>
        <p class="teks-respon"></p>
      </div>
    </div>

  </div>

  <div class="bottom-nav">
    <a href="{{ url('siswa/gaya/pengantargaya') }}" class="nav-btn prev">« Materi Sebelumnya</a>
    
    <a href="{{ url('siswa/gaya/resultangaya') }}" class="nav-btn next">Materi Selanjutnya »</a>
  </div>

</div>
@endsection