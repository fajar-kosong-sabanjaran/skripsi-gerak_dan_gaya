@extends('layouts.siswa')

@section('content')
    <script>
        window.MathJax = {
            tex: {
                inlineMath: [
                    ['$', '$'],
                    ['\\(', '\\)']
                ]
            }
        };
    </script>
    <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>

    <div class="main-content">
        <div class="container">
            <h1>RESULTAN GAYA</h1>

            <div class="inner-box">
                <h3>Resultan Gaya</h3>

                <p>
                    <b>Resultan gaya</b> adalah <b>besar gabungan atau hasil penjumlahan dari seluruh gaya yang bekerja pada
                        suatu benda</b>.
                    Kata <b>resultan</b> sendiri dapat diartikan sebagai <b>jumlah</b>, sehingga dalam mempelajari gaya,
                    kita akan menjumlahkan gaya-gaya yang ada.
                    Penjumlahan ini sangat bergantung pada arah masing-masing gaya, apakah searah atau berlawanan.
                </p>

                <p>
                    Perhatikan video berikut untuk memahami resultan gaya:
                </p>

                <p>
                    <video class="content-video" autoplay muted loop playsinline>
                        <source src="{{ asset('aset/33.mp4') }}" type="video/mp4">
                        Browser Anda tidak mendukung tag video.
                    </video>
                </p>
                <p class="image-caption">Resultan Gaya</p>

                <p>
                    Berdasarkan video di atas, terlihat tiga orang anak sedang bekerja sama memindahkan sebuah kotak.
                    Dua anak memberikan gaya dorong (\( F_1 \) dan \( F_2 \)) dari belakang, sedangkan satu anak memberikan
                    gaya tarik (\( F_3 \)) dari depan.
                    Ketiga gaya tersebut bekerja pada garis lurus dan memiliki arah yang sama, yaitu ke kanan.
                    Karena searah, maka gaya-gaya tersebut saling menguatkan, sehingga resultan gayanya adalah hasil
                    penjumlahan dari ketiganya (\( R = F_1 + F_2 + F_3 \)).
                </p>

                <br>
                <hr>
                <p>
                    Secara matematis, besar resultan gaya dapat dihitung menggunakan perumusan berikut:
                </p>

                <div class="rumus-box">
                    \[
                    R = F_1 + F_2 + \dots + F_n
                    \]
                </div>

                <p>Keterangan:</p>
                <ul>
                    <li>\( R \) : Resultan gaya.</li>
                    <li>\( F_1, F_2, \dots \) : Gaya pertama, gaya kedua, dan seterusnya (tergantung banyaknya gaya).</li>
                </ul>

                <br>

                <p>
                    Ketentuan Arah (Positif & Negatif)<br>
                    Dalam perhitungan, nilai gaya (\( F \)) memiliki aturan tanda berdasarkan arahnya:
                </p>
                <ul>
                    <li>
                        Nilai Positif (+): Jika gaya-gaya tersebut bekerja secara searah (misalnya, sama-sama ke arah
                        kanan).
                    </li>
                    <li>
                        Nilai Negatif (-): Jika gaya bekerja berlawanan arah. Contohnya, jika \( F_1 \) ke kanan dan \( F_2
                        \) ke kiri, maka perhitungannya menjadi \( F_1 + (-F_2) \).
                    </li>
                </ul>

                <p>
                    Penting: Tanda positif dan negatif ini hanya berfungsi sebagai penanda arah, bukan berarti ada gaya yang
                    bernilai minus secara matematis murni.
                </p>
            </div>

            <div class="inner-box">
                <h3>Ayo Kita Pahami</h3>

                <div class="container-soal">

                    <div class="box-soal">
                        <span class="judul-soal">Contoh 1</span>
                        <p>
                            Fajar dan Fadhil sedang memindahkan sebuah meja dengan cara mendorongnya.
                            Gaya yang diberikan Fajar adalah <b>20 N</b>, sedangkan gaya yang diberikan Fadhil adalah <b>35
                                N</b>.
                            Berapakah resultan gaya yang diterima meja?
                        </p>

                        <figure class="figure-soal">
                            <img src="{{ asset('aset/4.jpg') }}" alt="Ilustrasi dua anak mendorong meja searah"
                                class="gambar-soal">
                            <figcaption class="caption-soal">Ilustrasi dua gaya yang bekerja searah.</figcaption>
                        </figure>
                        <div class="box-jawaban">
                            <span class="label-penyelesaian">Penyelesaian:</span>
                            Rumus: $R = F_1 + F_2$ <br>
                            $R = 20 + 35$ <br>
                            <b>$R = 55 \text{ N}$</b> (Searah ke kanan)
                        </div>
                    </div>

                    <div class="box-soal">
                        <span class="judul-soal">Contoh 2</span>
                        <p>
                            Fajar dan Fadhil sedang mendorong sebuah meja dengan arah yang berlawanan.
                            Fajar mendorong ke kanan dengan gaya sebesar <b>10 N</b>, sedangkan Fadhil mendorong ke kiri
                            dengan gaya sebesar <b>35 N</b>.
                            Berapakah resultan gaya yang diterima meja?
                        </p>

                        <figure class="figure-soal">
                            <img src="{{ asset('aset/5.jpg') }}" alt="Ilustrasi dua anak mendorong meja berlawanan arah"
                                class="gambar-soal">
                            <figcaption class="caption-soal">Ilustrasi dua gaya yang bekerja berlawanan arah.</figcaption>
                        </figure>
                        <div class="box-jawaban">
                            <span class="label-penyelesaian">Penyelesaian:</span>
                            Rumus: $R = F_1 + F_2$ <br>
                            $R = 10 + (-35)$ <br>
                            <b>$R = -25 \text{ N}$</b> (Arah ke kiri)
                        </div>
                    </div>

                </div>
            </div>

            <div class="inner-box">
                <h3>Ayo berlatih</h3>

                <div class="kotak-instruksi">
                    <p>
                        <i class="fas fa-info-circle"></i> Petunjuk Pengerjaan:
                    </p>
                    <ul>
                        <li>Perhatikan arah gaya pada gambar dan cerita di setiap latihan.</li>
                        <li>Hitung resultan gaya: jumlahkan jika searah, kurangkan jika berlawanan.</li>
                        <li>Isikan jawabanmu berupa angka saja pada kolom yang tersedia (contoh: 40).</li>
                        <li>Tekan tombol "Cek Jawaban" untuk melihat hasil kerjamu.</li>
                    </ul>
                </div>

                <div class="container-soal">

                    <div class="box-soal">
                        <span class="judul-soal">Latihan 1</span>
                        <p>
                            Alif dan Fajar sedang memindahkan sebuah kotak. Alif berusaha mendorongnya dengan gaya 15 N,
                            sedangkan Fajar berusaha menariknya dengan gaya 25 N. Berapakah resultan gaya yang diterima
                            kotak?
                        </p>

                        <figure class="figure-soal">
                            <img src="{{ asset('aset/15.jpg') }}" alt="Ilustrasi dua anak mendorong meja searah"
                                class="gambar-soal">
                        </figure>
                        <div class="box-jawaban">
                            <span class="label-penyelesaian">Penyelesaian (Isikan jawabanmu):</span>

                            <label>Resultan Gaya (N):</label>
                            <input type="text" id="jawaban1" class="input-jawaban"
                                placeholder="Masukkan hasil resultan">

                            <button class="btn-cek-resultan" onclick="cekJawabanResultan(1)">Cek Jawaban</button>

                            <p id="feedback1" class="feedback"></p>
                        </div>

                    </div>

                    <div class="box-soal">
                        <span class="judul-soal">Latihan 2</span>
                        <p>
                            Fajar dan Fadhil memberi gaya yang sama besar dengan arah yang berlawanan.
                            Berapakah gaya yang diterima meja?
                        </p>

                        <figure class="figure-soal">
                            <img src="{{ asset('aset/16.jpg') }}" alt="Ilustrasi dua anak mendorong meja berlawanan arah"
                                class="gambar-soal">
                        </figure>
                        <div class="box-jawaban">
                            <span class="label-penyelesaian">Penyelesaian (Isikan jawabanmu):</span>

                            <label>Resultan Gaya (N):</label>
                            <input type="text" id="jawaban2" class="input-jawaban"
                                placeholder="Masukkan hasil resultan">

                            <button class="btn-cek-resultan" onclick="cekJawabanResultan(2)">Cek Jawaban</button>

                            <p id="feedback2" class="feedback"></p>
                        </div>
                    </div>

                </div>
            </div>

        </div>

        <div class="bottom-nav">
            <a href="{{ url('siswa/gaya/pengertiangaya') }}" class="nav-btn prev">« Materi Sebelumnya</a>

            <a href="{{ url('siswa/gaya/macam-macamgaya') }}" id="btn-next-materi" class="nav-btn next locked">Materi
                Selanjutnya »</a>
        </div>

    </div>
@endsection
