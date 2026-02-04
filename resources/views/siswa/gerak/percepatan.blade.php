@extends('layouts.siswa')

@section('content')

<script>
  window.MathJax = {
    tex: {
      inlineMath: [['$', '$'], ['\\(', '\\)']]
    }
  };
</script>
<script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>

<div class="main-content">
  <div class="container">
    <h1>PERCEPATAN</h1>

    <div class="inner-box">
      <h3>Percepatan</h3>
      
      <p>
        <b>Percepatan adalah besaran yang menyatakan perubahan kecepatan suatu benda dalam selang waktu tertentu.</b> Karena kecepatan merupakan besaran vektor, maka percepatan juga termasuk besaran vektor yang memiliki nilai dan arah. Dalam kehidupan sehari-hari, benda jarang bergerak dengan kecepatan yang selalu tetap. Kadang benda bergerak semakin cepat, kadang juga semakin lambat. Perubahan inilah yang disebut dengan percepatan.
      </p>

      <p>
        Perhatikan video berikut untuk memahaminya:
      </p>

      <p>
        <video class="content-video" autoplay muted loop playsinline>
          <source src="{{ asset('aset/27.mp4') }}" type="video/mp4">
          Browser Anda tidak mendukung tag video.
        </video>
      </p>
      <p class="image-caption">Sebuah mobil ketika dipercepat dan diperlambat</p>

      <p>
        Berdasarkan video di atas, terlihat sebuah mobil yang mengalami perubahan kecepatan saat melaju di jalan raya. Perubahan kecepatan ini bisa berupa pertambahan kecepatan ataupun pengurangan kecepatan. Berdasarkan perubahannya, percepatan dapat dibedakan menjadi dua jenis, yaitu:
      </p>

      <ul>
        <li>
          Gerak Dipercepat
          <br>
          Terjadi jika kecepatan benda bertambah setiap waktu. Pada kondisi ini, nilai percepatan adalah positif. Contohnya adalah mobil yang awalnya pelan kemudian digas sehingga melaju semakin kencang. 
          <br>
          <i>Sebagai contoh soal,</i> sebuah sepeda awalnya diam, lalu kecepatannya menjadi 10 m/s dalam 5 sekon. Peristiwa ini termasuk gerak dipercepat karena memiliki ciri-ciri nilai percepatan positif dan benda bergerak makin cepat.
        </li>
        <li>
          Gerak Diperlambat
          <br>
          Terjadi jika kecepatan benda berkurang setiap waktu. Pada kondisi ini, nilai percepatan adalah negatif atau sering disebut perlambatan. Contohnya adalah mobil yang sedang melaju kencang kemudian mengerem hingga berhenti di lampu merah. 
          <br>
          <i>Sebagai contoh soal,</i> sebuah mobil melaju 20 m/s, lalu berhenti dalam 4 sekon. Peristiwa ini termasuk gerak diperlambat karena memiliki ciri-ciri nilai percepatan negatif dan benda bergerak makin lambat.
        </li>
      </ul>
    </div>

    <div class="inner-box">
      <h3>Rumus Percepatan</h3>
      <p>
        Untuk menentukan percepatan suatu benda, kita memerlukan informasi mengenai perubahan kecepatan
        dan waktu tempuh.
      </p>

      <p>Rumus percepatan adalah:</p>

        <div class="rumus-box" id="rumus-percepatan">
          \[
          a = \frac{v_2 - v_1}{t_2 - t_1}
          \]
        </div>

        <div class="rumus-keterangan" id="ket-percepatan">
          <p><b>Keterangan:</b></p>
          <ul>
            <li>\( a \) = percepatan (m/s²)</li>
            <li>\( v_1 \) = kecepatan awal benda (m/s)</li>
            <li>\( v_2 \) = kecepatan akhir benda (m/s)</li>
            <li>\( t_1 \) = waktu awal (s)</li>
            <li>\( t_2 \) = waktu akhir (s)</li>
          </ul>
        </div>

        <p class="catatan-percepatan">
          Percepatan bernilai positif jika kecepatan bertambah, dan negatif jika kecepatan berkurang (perlambatan).
        </p>
    </div>

    <div class="inner-box">
      <h3>Ayo, Kita Pahami!</h3>

      <p>
        Kakak mengendarai sepeda dari rumah menuju persimpangan jalan.
        Setelah <b>10 sekon</b>, sepeda yang dikendarai kakak mencapai
        kecepatan <b>10 m/s</b>.
        Berapakah besar <b>percepatan</b> sepeda tersebut?
      </p>

        <p>
          <img src="{{ asset('aset/28.jpg') }}" alt="Contoh soal percepatan" class="content-image2">
        </p>
        <p class="image-caption">Contoh soal percepatan</p>

      <hr>

      <div class="penyelesaian-dua-kolom">
        <div class="penyelesaian">
          <p><b>✔ Penyelesaian</b></p>

          <p><b>Diketahui:</b></p>
          <p>Kecepatan awal, \( v_1 = 0 \, \text{m/s} \)</p>
          <p>Kecepatan akhir, \( v_2 = 10 \, \text{m/s} \)</p>
          <p>Waktu awal, \( t_1 = 0 \, \text{s} \)</p>
          <p>Waktu akhir, \( t_2 = 10 \, \text{s} \)</p>

          <p><b>Ditanya:</b></p>
          <p>Percepatan (a) = ?</p>

          <p><b>Dijawab:</b></p>

          <div class="rumus-besar">
            \[
            \begin{aligned}
            a &= \frac{v_2 - v_1}{t_2 - t_1} \\
              &= \frac{10 - 0}{10 - 0} \\
              &= 1 \, \text{m/s}^2
            \end{aligned}
            \]
          </div>

          <p>
            Jadi, besar percepatan sepeda tersebut adalah
            <b>1 m/s²</b>.
          </p>
        </div>

        <div></div>
      </div>
    </div>

    <div class="inner-box">
      <h3>Ayo Berlatih</h3>

      <div class="kotak-instruksi">
        <p>
          <i class="fas fa-info-circle"></i> Petunjuk Pengerjaan:
        </p>
        <ul>
          <li>Baca soal cerita tentang percepatan sepeda dengan teliti.</li>
          <li>Isikan jawabanmu pada kolom yang tersedia (titik-titik).</li>
          <li>Gunakan angka saja untuk mengisi jawaban (contoh: 50, bukan 50 m/s).</li>
          <li>Tekan tombol "Cek Jawaban" untuk melihat hasil kerjamu, atau tombol "Coba Lagi" jika ingin mengulang.</li>
        </ul>
      </div>

      <p>
        Sebuah sepeda mula-mula berjalan dengan kecepatan
        <b>10 m/s</b>, kemudian pada detik ke-<b>20</b>
        kecepatannya menjadi <b>50 m/s</b>.
        Berapakah <b>percepatan</b> yang dialami sepeda tersebut?
      </p>

        <p>
          <img src="{{ asset('aset/29.jpg') }}" alt="Latihan soal percepatan" class="content-image2">
        </p>
        <p class="image-caption">Latihan soal percepatan</p>

      <hr>
      <div class="penyelesaian-dua-kolom">
        <div class="penyelesaian">
          <p><b>✔ Penyelesaian</b></p>

          <p><b>Diketahui:</b></p>
          <p>Kecepatan awal \( v_1 \) =
            <input class="isian-ayo" id="v1" placeholder="..."> m/s
          </p>
          <p>Kecepatan akhir \( v_2 \) =
            <input class="isian-ayo" id="v2" placeholder="..."> m/s
          </p>
          <p>Waktu \( t \) =
            <input class="isian-ayo" id="t" placeholder="..."> s
          </p>

          <p><b>Ditanya:</b></p>
          <p>Percepatan (a) = ?</p>

          <p><b>Dijawab:</b></p>
          <div class="rumus-besar">
            \[
            a = \frac{v_2 - v_1}{t_2 - t_1}
            \]
          </div>

          <div class="baris-rumus">
            <span>\( a = \)</span>
            <div class="pecahan">
              <input class="isian-ayo" id="a-atas" placeholder="...">
              <div class="garis"></div>
              <input class="isian-ayo" id="a-bawah" placeholder="...">
            </div>
            <span>=</span>
            <input class="isian-ayo" id="a-hasil" placeholder="...">
            <span>m/s²</span>
          </div>
        </div>
        <div></div>
      </div>

      <div class="latihan-actions">
        <button class="btn-cek" id="btn-cek-percepatan">Cek Jawaban</button>
        <button class="btn-reset" id="btn-reset-percepatan">Coba Lagi</button>
        
        <button class="tombol-unduh" id="btn-unduh-percepatan">
           <i class="fas fa-file-pdf"></i> Unduh Jawaban
        </button>
      </div>

    </div>

    <div id="popup-percepatan" class="popup">
      <div class="popup-box">
        <h3>Hasil Latihan</h3>
        <div id="popup-percepatan-text" class="hasil-ringkas"></div>
        <div class="popup-actions">
          <button type="button" id="btn-popup-ulang-percepatan" class="btn-cek">
            Coba Lagi
          </button>
          <button type="button" id="btn-popup-tutup-percepatan" class="btn-reset">
            Tutup
          </button>
        </div>
      </div>
  </div>
</div>

  <div class="bottom-nav">
    <a href="{{ url('siswa/gerak/kelajuandankecepatan') }}" class="nav-btn prev">« Materi Sebelumnya</a>
    <a href="{{ url('siswa/gerak/petunjukpengerjaan') }}" class="nav-btn next">Ke Kuis 1 »</a>
  </div>

</div>

@endsection