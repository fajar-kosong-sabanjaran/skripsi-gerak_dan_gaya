@extends('layouts.siswa')

@section('content')

<script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>

<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

<div class="main-content">
  <div class="container">
    <h1>KELAJUAN DAN KECEPATAN</h1>

    <div class="inner-box">
      <h3>Kelajuan dan Kecepatan</h3>
      
      <p>
        <b>Kelajuan adalah besaran yang menyatakan seberapa cepat suatu benda menempuh jarak dalam selang waktu tertentu tanpa memperhitungkan arah geraknya.</b> Ketika membahas kelajuan, kita hanya fokus pada jarak yang ditempuh dan waktu yang diperlukan, tanpa memedulikan ke arah mana benda tersebut bergerak. Oleh karena itu, <b>kelajuan termasuk besaran skalar, yaitu besaran yang hanya memiliki nilai dan satuan tanpa arah.</b>
      </p>
      
      <p>
        Perhatikan video berikut untuk memahami konsep kelajuan:
      </p>

      <p>
        <video class="content-video" autoplay muted loop playsinline>
          <source src="{{ asset('aset/23.mp4') }}" type="video/mp4">
          Browser Anda tidak mendukung tag video.
        </video>
      </p>
      <p class="image-caption">Video Kelajuan</p>

      <p>
        Berdasarkan video di atas, terlihat sebuah bus melaju dengan kelajuan 60 km/jam. Angka tersebut hanya menunjukkan seberapa cepat bus itu bergerak, tanpa memberikan informasi ke mana arah tujuannya. Inilah yang disebut kelajuan, di mana informasi arah tidak diperlukan.
      </p>

      <hr><br>

      <p>
        Sementara itu, <b>kecepatan adalah besaran yang menyatakan besarnya perpindahan yang terjadi dalam setiap satuan waktu.</b> Berbeda dengan kelajuan, kecepatan tidak hanya menunjukkan seberapa cepat benda bergerak, tetapi juga ke arah mana benda tersebut bergerak. Oleh karena itu, <b>kecepatan termasuk besaran vektor, yaitu besaran yang memiliki nilai, satuan, dan arah.</b>
      </p>
      
      <p>
        Perhatikan video berikut untuk memahami konsep kecepatan:
      </p>

      <p>
        <video class="content-video" autoplay muted loop playsinline>
          <source src="{{ asset('aset/24.mp4') }}" type="video/mp4">
          Browser Anda tidak mendukung tag video.
        </video>
      </p>
      <p class="image-caption">Video Kecepatan</p>

      <p>
        Pada video di atas, bus tersebut melaju dengan kecepatan 60 km/jam ke arah timur. Perhatikan adanya simbol arah mata angin yang menunjukkan arah gerak bus. Informasi lengkap yang mencakup nilai (60 km/jam) dan arah (ke timur) inilah yang membedakan kecepatan dengan kelajuan.
      </p>

      <hr><br>

      <p>
        Berdasarkan penjelasan tersebut, perbedaan mendasar antara kelajuan dan kecepatan dapat dirangkum sebagai berikut:
      </p>
      <ul>
        <li>
          <b>Kelajuan</b> berkaitan dengan jarak tempuh dan waktu tanpa memperhatikan arah (skalar).
        </li>
        <li>
          <b>Kecepatan</b> berkaitan dengan perpindahan, waktu, serta arah gerak benda (vektor).
        </li>
      </ul>

    </div>

    <div class="inner-box">
      <h3>Rumus Kelajuan</h3>
      <p>
        Setelah memahami pengertian kelajuan dan kecepatan beserta perbedaannya, langkah selanjutnya adalah
        mempelajari rumus dasar yang digunakan untuk menghitung kelajuan. Untuk menentukan kelajuan,
        diperlukan informasi mengenai <b>jarak yang ditempuh</b> dan <b>waktu yang digunakan</b>.
      </p>
      <p>Berikut adalah rumus-rumus yang berkaitan dengan kelajuan:</p>

      <div class="rumus-container-kelajuandankecepatan">
        
        <div class="rumus-card-kelajuandankecepatan kelajuan">
          <p class="judul-rumus">Mencari Kelajuan</p>
          <div class="math-expr">
            \[ v = \frac{s}{t} \]
          </div>
        </div>

        <div class="rumus-card-kelajuandankecepatan jarak">
          <p class="judul-rumus">Mencari Jarak</p>
          <div class="math-expr">
            \[ s = v \times t \]
          </div>
        </div>

        <div class="rumus-card-kelajuandankecepatan waktu">
          <p class="judul-rumus">Mencari Waktu</p>
          <div class="math-expr">
            \[ t = \frac{s}{v} \]
          </div>
        </div>

      </div>

      <div class="rumus-keterangan">
        <p><b>Keterangan:</b></p>
        <ul>
          <li>\( v \) : Kelajuan (m/s)</li>
          <li>\( s \) : Jarak yang ditempuh (m)</li>
          <li>\( t \) : Waktu tempuh (s)</li>
        </ul>
      </div>
    </div>

    <div class="inner-box">
      <h3>Rumus Kecepatan</h3>
      <p>
        Kecepatan berkaitan dengan perpindahan dan memperhitungkan arah gerak.
        Oleh karena itu, untuk menentukan kecepatan suatu benda diperlukan informasi
        mengenai <b>besar perpindahan</b> dan <b>waktu</b>.
      </p>
      <p>Berikut adalah rumus-rumus yang berkaitan dengan kecepatan:</p>

      <div class="rumus-container-kelajuandankecepatan">
        
        <div class="rumus-card-kelajuandankecepatan kecepatan">
          <p class="judul-rumus">Mencari Kecepatan</p>
          <div class="math-expr">
            \[ \vec{v} = \frac{\Delta s}{t} \]
          </div>
        </div>

        <div class="rumus-card-kelajuandankecepatan perpindahan">
          <p class="judul-rumus">Mencari Perpindahan</p>
          <div class="math-expr">
            \[ \Delta s = \vec{v} \times t \]
          </div>
        </div>

        <div class="rumus-card-kelajuandankecepatan waktu">
          <p class="judul-rumus">Mencari Waktu</p>
          <div class="math-expr">
            \[ t = \frac{\Delta s}{\vec{v}} \]
          </div>
        </div>

      </div>

      <div class="rumus-keterangan">
        <p><b>Keterangan:</b></p>
        <ul>
          <li>\( \vec{v} \) : Kecepatan (m/s)</li>
          <li>\( \Delta s \) : Perpindahan (m)</li>
          <li>\( t \) : Waktu tempuh (s)</li>
        </ul>
      </div>
    </div>

    <div class="inner-box">
      <h3>Ayo, Kita Pahami!</h3>
      <p>
        Sebuah mobil bergerak lurus ke arah timur menuju sekolah sejauh <b>100 m</b>,
        kemudian kembali ke arah barat menuju taman sejauh <b>50 m</b>.
        Waktu yang dibutuhkan untuk seluruh perjalanan tersebut adalah
        <b>25 sekon</b>.
        Tentukan <b>kelajuan</b> dan <b>kecepatan</b> benda tersebut!
      </p>

        <p>
          <img src="{{ asset('aset/25.jpg') }}" alt="Contoh soal kelajuan dan kecepatan" class="content-image2">
        </p>
        <p class="image-caption">Contoh soal kelajuan dan kecepatan</p>

      <hr>

      <div class="penyelesaian-dua-kolom">
        <div class="penyelesaian">
          <p><b>✔ Kelajuan</b></p>
          <p><b>Diketahui:</b></p>
          <p>Jarak tempuh = 100 m + 50 m = 150 m</p>
          <p>Waktu = 25 sekon</p>

          <p><b>Ditanya:</b></p>
          <p>Kelajuan (v) = ?</p>

          <p><b>Dijawab:</b></p>
          <div class="rumus-besar">
            \[
            \begin{aligned}
            v &= \frac{\text{jarak tempuh}}{t} \\
            &= \frac{150}{25} \\
            &= 6 \text{ m/s}
            \end{aligned}
            \]
          </div>
          <p>
            Jadi, kelajuan benda tersebut adalah <b>6 m/s</b>.
          </p>
        </div>

        <div class="penyelesaian">
          <p><b>✔ Kecepatan</b></p>
          <p><b>Diketahui:</b></p>
          <p>Perpindahan ke timur = 100 m − 50 m</p>
          <p>Waktu = 25 sekon</p>

          <p><b>Ditanya:</b></p>
          <p>Kecepatan (v) = ?</p>

          <p><b>Dijawab:</b></p>
          <p>Menentukan perpindahan:</p>
          <div class="rumus-besar">
            \[
            \begin{aligned}
            \Delta s &= x_t - x_0 \\
            &= 100 - 50 \\
            &= 50 \text{ m ke timur}
            \end{aligned}
            \]
          </div>
          <div class="rumus-besar">
            \[
            \begin{aligned}
            v &= \frac{\Delta s}{t} \\
            &= \frac{50}{25} \\
            &= 2 \text{ m/s ke timur}
            \end{aligned}
            \]
          </div>
          <p>
            Jadi, kecepatan benda tersebut adalah
            <b>2 m/s ke arah timur</b>.
          </p>
        </div>
      </div>
    </div>


    <div class="inner-box quiz-wrapper">
      <h3>Ayo Bedakan Kelajuan dan Kecepatan</h3>

      <div class="kotak-instruksi">
        <p>
          <i class="fas fa-info-circle"></i> Petunjuk Pengerjaan:
        </p>
        <ul>
          <li>Baca setiap pernyataan dengan seksama.</li>
          <li>Tentukan apakah pernyataan tersebut termasuk ciri Kelajuan atau Kecepatan.</li>
          <li>Berikan tanda centang (✔) pada kolom yang sesuai.</li>
          <li>Tekan tombol "Cek Jawaban" untuk melihat hasil kerjamu, atau tombol "Coba Lagi" jika ingin mengulang.</li>
        </ul>
      </div>

      <table class="quiz-table">
        <thead>
          <tr>
            <th style="width:50px;">No</th>
            <th>Pernyataan</th>
            <th style="width:120px;">Kelajuan</th>
            <th style="width:120px;">Kecepatan</th>
          </tr>
        </thead>
        <tbody>
          <tr data-row="1">
            <td>1</td>
            <td>Menyatakan perpindahan yang terjadi setiap satuan waktu.</td>
            <td><input type="checkbox" class="quiz-check" data-row="1" data-type="kelajuan"></td>
            <td><input type="checkbox" class="quiz-check" data-row="1" data-type="kecepatan"></td>
          </tr>
          <tr data-row="2">
            <td>2</td>
            <td>Tidak memperhatikan arah gerak benda.</td>
            <td><input type="checkbox" class="quiz-check" data-row="2" data-type="kelajuan"></td>
            <td><input type="checkbox" class="quiz-check" data-row="2" data-type="kecepatan"></td>
          </tr>
          <tr data-row="3">
            <td>3</td>
            <td>Dihitung menggunakan rumus \( v = \frac{s}{t} \).</td>
            <td><input type="checkbox" class="quiz-check" data-row="3" data-type="kelajuan"></td>
            <td><input type="checkbox" class="quiz-check" data-row="3" data-type="kecepatan"></td>
          </tr>
          <tr data-row="4">
            <td>4</td>
            <td>Besaran yang memiliki nilai, satuan, dan arah.</td>
            <td><input type="checkbox" class="quiz-check" data-row="4" data-type="kelajuan"></td>
            <td><input type="checkbox" class="quiz-check" data-row="4" data-type="kecepatan"></td>
          </tr>
          <tr data-row="5">
            <td>5</td>
            <td>Harus disertai keterangan arah gerak.</td>
            <td><input type="checkbox" class="quiz-check" data-row="5" data-type="kelajuan"></td>
            <td><input type="checkbox" class="quiz-check" data-row="5" data-type="kecepatan"></td>
          </tr>
          <tr data-row="6">
            <td>6</td>
            <td>Menyatakan jarak yang ditempuh setiap satuan waktu.</td>
            <td><input type="checkbox" class="quiz-check" data-row="6" data-type="kelajuan"></td>
            <td><input type="checkbox" class="quiz-check" data-row="6" data-type="kecepatan"></td>
          </tr>
          <tr data-row="7">
            <td>7</td>
            <td>Besaran vektor.</td>
            <td><input type="checkbox" class="quiz-check" data-row="7" data-type="kelajuan"></td>
            <td><input type="checkbox" class="quiz-check" data-row="7" data-type="kecepatan"></td>
          </tr>
          <tr data-row="8">
            <td>8</td>
            <td>Besaran skalar.</td>
            <td><input type="checkbox" class="quiz-check" data-row="8" data-type="kelajuan"></td>
            <td><input type="checkbox" class="quiz-check" data-row="8" data-type="kecepatan"></td>
          </tr>
          <tr data-row="9">
            <td>9</td>
            <td>Dihitung menggunakan rumus \( \vec{v} = \frac{\Delta s}{t} \).</td>
            <td><input type="checkbox" class="quiz-check" data-row="9" data-type="kelajuan"></td>
            <td><input type="checkbox" class="quiz-check" data-row="9" data-type="kecepatan"></td>
          </tr>
        </tbody>
      </table>

      <div class="quiz-buttons">
        <button type="button" class="btn-cek" id="btn-cek-quiz">Cek Jawaban</button>
        <button type="button" class="btn-reset" id="btn-reset-quiz">Coba Lagi</button>
      </div>
    </div>

    
    <div class="inner-box">
      <h3>Ayo Berlatih</h3>

      <div class="kotak-instruksi">
        <p>
          <i class="fas fa-info-circle"></i> Petunjuk Pengerjaan:
        </p>
        <ul>
          <li>Baca soal cerita tentang perjalanan anak bersepeda dengan teliti.</li>
          <li>Isikan jawabanmu pada kolom yang tersedia (titik-titik).</li>
          <li>Gunakan angka saja untuk mengisi jawaban (contoh: 120, bukan 120 m).</li>
          <li>Tekan tombol "Cek Jawaban" untuk melihat hasil kerjamu, atau tombol "Coba Lagi" jika ingin mengulang.</li>
        </ul>
      </div>

      <p>
        Seorang anak bersepeda ke arah <b>selatan</b> menuju toko sejauh <b>120 meter</b>,
        kemudian berbalik arah ke <b>utara</b> menuju sekolah sejauh <b>40 meter</b>.
        Waktu yang dihabiskan anak tersebut untuk seluruh perjalanan adalah
        <b>20 sekon</b>.
        Tentukan <b>kelajuan</b> dan <b>kecepatan</b> anak tersebut!
      </p>

        <p>
          <img src="{{ asset('aset/26.jpg') }}" alt="Contoh soal kelajuan dan kecepatan" class="content-image2">
        </p>
        <p class="image-caption">Latihan soal kelajuan dan kecepatan</p>

      <hr>

      <div class="penyelesaian-dua-kolom">
        <div class="penyelesaian">
          <p><b>✔ Kelajuan</b></p>
          <p><b>Diketahui:</b></p>
          <p>
            Jarak tempuh =
            <input class="isian-ayo" id="s1" placeholder="..."> +
            <input class="isian-ayo" id="s2" placeholder="...">
            =
            <input class="isian-ayo" id="s-total" placeholder="..."> m
          </p>
          <p>
            Waktu =
            <input class="isian-ayo" id="t" placeholder="..."> sekon
          </p>

          <p><b>Ditanya:</b></p>
          <p>Kelajuan (v) = ?</p>

          <p><b>Dijawab:</b></p>
          <p>\( v = \dfrac{s}{t} \)</p>

          <div class="baris-rumus">
            <span>\( v = \)</span>
            <div class="pecahan">
              <input class="isian-ayo" id="v-atas" placeholder="...">
              <div class="garis"></div>
              <input class="isian-ayo" id="v-bawah" placeholder="...">
            </div>
            <span>=</span>
            <input class="isian-ayo" id="v-hasil" placeholder="...">
            <span>m/s</span>
          </div>
        </div>

        <div class="penyelesaian">
          <p><b>✔ Kecepatan</b></p>
          <p><b>Diketahui:</b></p>
          <p>
            Ke arah selatan sejauh \(x_0\) =
            <input class="isian-ayo" id="x0" placeholder="..."> m
          </p>
          <p>
            Ke arah utara sejauh \(x_t\) =
            <input class="isian-ayo" id="xt" placeholder="..."> m
          </p>
          <p>
            Waktu =
            <input class="isian-ayo" id="t2" placeholder="..."> sekon
          </p>

          <p><b>Ditanya:</b></p>
          <p>Kecepatan (\( \vec{v} \)) = ?</p>

          <p><b>Dijawab:</b></p>

          <p>Menentukan perpindahan:</p>
          <p>\( \Delta s = x_t - x_0 \)</p>

          <div class="baris-rumus">
            <span>\( \Delta s = \)</span>
            <input class="isian-ayo" id="delta-s" placeholder="...">
            <span>m</span>
          </div>

          <p>\( \vec{v} = \dfrac{\Delta s}{t} \)</p>

          <div class="baris-rumus">
            <span>\( \vec{v} = \)</span>
            <div class="pecahan">
              <input class="isian-ayo" id="v2-atas" placeholder="...">
              <div class="garis"></div>
              <input class="isian-ayo" id="v2-bawah" placeholder="...">
            </div>
            <span>=</span>
            <input class="isian-ayo" id="v2-hasil" placeholder="...">
            <span>m/s</span>
          </div>
        </div>
      </div>

      <div class="latihan-actions">
        <button type="button" id="btn-cek-latihan" class="btn-cek">Cek Jawaban</button>
        <button type="button" id="btn-reset-latihan" class="btn-reset">Coba Lagi</button>
        
        <button type="button" id="btn-unduh-latihan" class="tombol-unduh">
           <i class="fas fa-file-pdf"></i> Unduh Jawaban
        </button>
      </div>
      
    </div>
    
  </div>

  <div id="popup-quiz" class="popup">
    <div class="popup-box">
      <h3>Hasil Klasifikasi</h3>
      <div id="popup-quiz-text" class="hasil-ringkas"></div>
      <div class="popup-actions">
        <button type="button" onclick="resetQuizPopup()" class="btn-cek">Coba Lagi</button>
        <button type="button" onclick="tutupPopupQuiz()" class="btn-reset">Tutup</button>
      </div>
    </div>
  </div>

  <div id="popup-latihan" class="popup">
    <div class="popup-box">
      <h3>Hasil Latihan</h3>
      <div id="popup-latihan-text" class="hasil-ringkas"></div>
      <div class="popup-actions">
        <button type="button" onclick="cobaLagiLatihan()" class="btn-cek">Coba Lagi</button>
        <button type="button" onclick="tutupPopupLatihan()" class="btn-reset">Tutup</button>
      </div>
    </div>
  </div>

  <div class="bottom-nav">
    <a href="{{ url('siswa/gerak/jaraktempuhdanperpindahan') }}" class="nav-btn prev">« Materi Sebelumnya</a>
    
    <a href="{{ url('siswa/gerak/percepatan') }}" id="btn-next-materi" class="nav-btn next locked">Materi Selanjutnya »</a>
  </div>
</div>

@endsection