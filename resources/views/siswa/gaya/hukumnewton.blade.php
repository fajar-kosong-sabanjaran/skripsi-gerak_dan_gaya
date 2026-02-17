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
            <h1>HUKUM NEWTON</h1>

            <div class="inner-box">
                <h3>Hukum Newton</h3>
                <p>
                    Hukum Newton merupakan hukum dasar yang menggambarkan hubungan antara gaya yang bekerja pada suatu benda
                    dan gerak yang disebabkannya. Prinsip-prinsip ini dikemukakan oleh seorang ilmuwan bernama <b>Sir Isaac
                        Newton (1643 - 1727)</b>. Terdapat tiga hukum Newton tentang gerak, yaitu:
                </p>
            </div>

            <div class="inner-box">
                <h3>1. Hukum I Newton (Hukum Kelembaman)</h3>

                <p>
                    <b>Bunyi Hukum:</b><br>
                    "Jika resultan gaya yang bekerja pada benda sama dengan nol, maka benda yang semula diam akan tetap
                    diam. Sedangkan benda yang bergerak lurus beraturan akan terus bergerak lurus beraturan."
                </p>

                <p>
                    Hukum ini menjelaskan bahwa setiap benda sebenarnya memiliki sifat "malas" untuk mengubah keadaannya.
                    Benda yang sedang diam akan berusaha untuk tetap diam, dan benda yang sedang bergerak akan berusaha
                    untuk terus bergerak.
                    Kemampuan benda untuk mempertahankan keadaan aslinya inilah yang disebut dengan inersia atau kelembaman.
                </p>

                <p>Secara matematis, Hukum I Newton dituliskan sebagai berikut:</p>
                <div class="rumus-box">
                    \[ \sum F = 0 \]
                </div>

                <p>Keterangan:</p>
                <ul class="rumus-legend">
                    <li>\( \sum F \) : Total gaya yang bekerja pada benda (Newton).</li>
                </ul>

                <p>
                    Untuk lebih memahaminya, perhatikan contoh peristiwa berikut:
                </p>
                <p>
                    <img src="{{ asset('aset/12.jpg') }}" class="content-image4" alt="Ilustrasi Hukum Newton 1">
                </p>
                <p class="image-caption">Bola diam di atas lantai</p>

                <p>
                    Pada gambar di atas, terlihat sebuah bola diletakkan di atas lantai.
                    Bola tersebut akan tetap diam di tempatnya dan tidak akan berpindah sendiri, kecuali ada gaya dari luar
                    (seperti tendangan kaki) yang mengenainya.
                    Kecenderungan bola untuk tetap diam inilah bukti penerapan Hukum I Newton dalam kehidupan sehari-hari.
                </p>

                <div class="note-box">
                    Hukum Newton 1 tentang sifat kelembaman benda yang cenderung mempertahankan keadaan awalnya, baik itu
                    tetap diam atau bergerak lurus beraturan.
                </div>
            </div>

            <div class="inner-box">
                <h3>2. Hukum II Newton</h3>

                <p>
                    <b>Bunyi Hukum:</b><br>
                    "Percepatan yang dihasilkan oleh resultan gaya yang bekerja pada suatu benda sebanding dengan resultan
                    gayanya dan berbanding terbalik dengan massa bendanya."
                </p>

                <p>
                    Hukum ini menjelaskan hubungan erat antara gaya, massa, dan gerakan benda.
                    Sederhananya, jika kamu memberikan gaya dorong yang besar pada sebuah benda, benda tersebut akan
                    bergerak dengan percepatan yang tinggi.
                    Namun, jika benda tersebut memiliki massa yang besar (berat), maka akan lebih sulit untuk dipercepat
                    dibandingkan benda yang ringan.
                    Berlakunya hukum ini menyebabkan benda bergerak lurus berubah beraturan (GLBB).
                </p>

                <p>Secara matematis, Hukum II Newton dirumuskan sebagai berikut:</p>
                <div class="rumus-box">
                    \[ a = \frac{\sum F}{m} \quad \text{atau} \quad \sum F = m \cdot a \]
                </div>

                <p>Keterangan:</p>
                <ul class="rumus-legend">
                    <li>\( \sum F \) : Resultan gaya (Newton/N)</li>
                    <li>\( m \) : Massa benda (kg)</li>
                    <li>\( a \) : Percepatan benda (\( m/s^2 \))</li>
                </ul>

                <p>
                    Untuk gambaran yang lebih jelas, perhatikan contoh berikut:
                </p>
                <p>
                    <img src="{{ asset('aset/13.jpg') }}" class="content-image4" alt="Ilustrasi Hukum Newton 2">
                </p>
                <p class="image-caption">Seseorang menendang bola</p>

                <p>
                    Perhatikan gambar di atas. Saat pemain menendang bola, ia memberikan gaya dorong pada bola tersebut.
                    Semakin kuat tendangannya (gaya semakin besar), maka bola akan melesat dengan percepatan yang semakin
                    tinggi.
                    Sebaliknya, jika bola tersebut diganti dengan bola besi yang massanya jauh lebih besar, maka dengan
                    kekuatan tendangan yang sama, percepatan gerak bola akan menjadi lambat.
                </p>

                <div class="note-box">
                    Hukum Newton 2 tentang hubungan gaya, massa, dan percepatan benda, di mana gaya berbanding lurus dengan
                    percepatan.
                </div>
            </div>

            <div class="inner-box">
                <h3>3. Hukum III Newton (Hukum Aksi-Reaksi)</h3>

                <p>
                    <b>Bunyi Hukum:</b><br>
                    "Jika benda A mengerjakan gaya pada benda B, maka benda B akan mengerjakan gaya pada benda A yang
                    besarnya sama namun dengan arah yang berlawanan."
                </p>

                <p>
                    Hukum ini dikenal sebagai <b>Hukum Aksi-Reaksi</b>.
                    Konsep utamanya adalah bahwa gaya di alam semesta selalu muncul secara berpasangan; tidak ada gaya yang
                    bekerja sendirian.
                    Setiap kali kita memberikan aksi pada suatu benda, benda tersebut pasti akan memberikan reaksi balik
                    kepada kita dengan kekuatan yang sama persis.
                </p>

                <p>Secara matematis, Hukum III Newton dituliskan:</p>
                <div class="rumus-box">
                    \[ F_{\text{aksi}} = -F_{\text{reaksi}} \]
                </div>

                <p>Keterangan:</p>
                <ul class="rumus-legend">
                    <li>\( F_{\text{aksi}} \) : Gaya yang diberikan benda pertama (aksi).</li>
                    <li>\( F_{\text{reaksi}} \) : Gaya balasan dari benda kedua (reaksi).</li>
                    <li>Tanda negatif (-) menunjukkan arah gaya yang berlawanan.</li>
                </ul>

                <p>
                    Contoh penerapan nyata dari hukum ini dapat dilihat pada ilustrasi berikut:
                </p>
                <p>
                    <img src="{{ asset('aset/14.jpg') }}" class="content-image4" alt="Ilustrasi Hukum Newton 3">
                </p>
                <p class="image-caption">Bola memantul pada tiang</p>

                <p>
                    Perhatikan ilustrasi di atas. Ketika bola bergerak dan menabrak tiang gawang, bola memberikan gaya
                    dorong (aksi) pada tiang.
                    Pada saat yang bersamaan, tiang gawang memberikan gaya balasan (reaksi) yang sama besarnya terhadap
                    bola.
                    Akibat adanya gaya reaksi inilah bola dapat memantul kembali ke arah yang berlawanan setelah menabrak
                    tiang.
                </p>

                <div class="note-box">
                    Hukum Newton 3 tentang gaya aksi dan reaksi yang selalu timbul berpasangan dengan besar yang sama namun
                    berlawanan arah.
                </div>
            </div>

            <div class="inner-box">
                <h3>Ayo Berlatih – Hukum Newton</h3>

                <div class="kotak-instruksi">
                    <p>
                        <i class="fas fa-info-circle"></i> Petunjuk Pengerjaan:
                    </p>
                    <ul>
                        <li>Baca setiap soal dengan seksama.</li>
                        <li>Analisis peristiwa yang dijelaskan, apakah termasuk Hukum I, II, atau III Newton.</li>
                        <li>Klik pada salah satu tombol jawaban (Hukum I, II, atau III) yang menurutmu benar.</li>
                        <li>Tekan tombol "Cek Jawaban" untuk melihat hasil kerjamu, atau tombol "Coba Lagi" jika ingin
                            mengulang.</li>
                    </ul>
                </div>

                <div class="kotak-kuis">
                    <p class="teks-soal">
                        <b>1.</b> Ketika seorang siswa meloncat dari perahu, perahu terdorong ke arah berlawanan. Peristiwa
                        ini menunjukkan bahwa...
                    </p>
                    <div class="grup-opsi" data-soal="1" data-kunci="III">
                        <button class="tombol-opsi" data-pilihan="I">Hukum I Newton</button>
                        <button class="tombol-opsi" data-pilihan="II">Hukum II Newton</button>
                        <button class="tombol-opsi" data-pilihan="III">Hukum III Newton</button>
                    </div>
                </div>

                <br>
                <div class="kotak-kuis">
                    <p class="teks-soal">
                        <b>2.</b> Sebuah buku di atas meja tetap diam selama tidak ada gaya yang bekerja padanya. Hal ini
                        sesuai dengan...
                    </p>
                    <div class="grup-opsi" data-soal="2" data-kunci="I">
                        <button class="tombol-opsi" data-pilihan="I">Hukum I Newton</button>
                        <button class="tombol-opsi" data-pilihan="II">Hukum II Newton</button>
                        <button class="tombol-opsi" data-pilihan="III">Hukum III Newton</button>
                    </div>
                </div>

                <br>
                <div class="kotak-kuis">
                    <p class="teks-soal">
                        <b>3.</b> Sebuah bola ditendang semakin kuat sehingga bergerak semakin cepat. Pernyataan tersebut
                        menunjukkan...
                    </p>
                    <div class="grup-opsi" data-soal="3" data-kunci="II">
                        <button class="tombol-opsi" data-pilihan="I">Hukum I Newton</button>
                        <button class="tombol-opsi" data-pilihan="II">Hukum II Newton</button>
                        <button class="tombol-opsi" data-pilihan="III">Hukum III Newton</button>
                    </div>
                </div>

                <div class="latihan-actions">
                    <button class="btn-cek" id="btn-cek-newton">Cek Jawaban</button>
                    <button class="btn-reset" id="btn-reset-newton">Coba Lagi</button>
                </div>
            </div>

        </div>

        <div id="popup-newton" class="popup">
            <div class="popup-box">
                <h3>Hasil Latihan</h3>
                <div id="popup-newton-text" class="hasil-ringkas"></div>
                <div class="popup-actions">
                    <button class="btn-reset" id="btn-tutup-newton">Tutup</button>
                </div>
            </div>
        </div>

        <div class="bottom-nav">
            <a href="{{ url('siswa/gaya/macam-macamgaya') }}" class="nav-btn prev">« Materi Sebelumnya</a>

            <a href="{{ url('siswa/gaya/petunjukpengerjaan') }}" id="btn-next-materi" class="nav-btn next locked">Ke Kuis 2
                »</a>
        </div>

    </div>
@endsection
