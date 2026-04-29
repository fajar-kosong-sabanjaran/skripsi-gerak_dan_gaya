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
                <p class="image-caption">Bola diam di rumput</p>

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
                <h3>Ayo Praktik: Pengamatan Hukum Newton</h3>

                <div class="kotak-instruksi">
                    <p>
                        <i class="fas fa-info-circle"></i> Petunjuk Pengerjaan:
                    </p>
                    <ul>
                        <li>Tonton video pengujian Hukum Newton di bawah ini dengan saksama.</li>
                        <li>Gunakan tombol "Lompat ke bagian" untuk melihat masing-masing perlakuan.</li>
                        <li>Analisis setiap peristiwa yang terjadi pada video.</li>
                        <li>Jawablah 5 pertanyaan pilihan ganda di bawah video berdasarkan pengamatanmu.</li>
                    </ul>
                </div>

                <p>
                    {{-- CATATAN: Pastikan URL video ini merujuk ke lokasi file Gaya.mp4 Anda --}}
                    <video id="video-praktik-gaya" class="content-video" controls preload="auto">
                        <source src="{{ url('stream-video/Gaya.mp4') }}#t=0.001" type="video/mp4">
                        Browser Anda tidak mendukung tag video.
                    </video>
                </p>
                <p class="image-caption">Video Praktik Hukum Newton</p>

                <div class="video-timestamps">
                    <span class="timestamp-label"><i class="fas fa-list-ul"></i> Lompat ke bagian:</span>
                    <div class="timestamp-buttons">
                        {{-- Tombol disesuaikan dengan waktu (detik) pada video Gaya.mp4 --}}
                        <button type="button" class="btn-time" data-time="7">Tujuan Percobaan</button>
                        <button type="button" class="btn-time" data-time="22">Hukum 1 Newton</button>
                        <button type="button" class="btn-time" data-time="67">Hukum 2 Newton</button>
                        <button type="button" class="btn-time" data-time="166">Hukum 3 Newton</button>
                    </div>
                </div>

                <hr><br>

                {{-- KUIS DISESUAIKAN DENGAN ISI VIDEO GAYA.MP4 --}}
                <div class="kotak-kuis">
                    <p class="teks-soal">
                        <b>1.</b> Pada percobaan Hukum I Newton, apa yang terjadi pada gelas saat kertas di bawahnya ditarik dengan sangat cepat?
                    </p>
                    <div class="grup-opsi" data-soal="1" data-kunci="B">
                        <button class="tombol-opsi" data-pilihan="A">A. Gelas ikut bergerak searah tarikan kertas</button>
                        <button class="tombol-opsi" data-pilihan="B">B. Gelas tetap diam di tempat asalnya</button>
                        <button class="tombol-opsi" data-pilihan="C">C. Gelas terlempar ke udara</button>
                    </div>
                </div>

                <br>
                <div class="kotak-kuis">
                    <p class="teks-soal">
                        <b>2.</b> Sifat gelas yang "malas" bergerak dan cenderung mempertahankan keadaan awalnya (tetap diam) saat kertas ditarik secara cepat disebut dengan...
                    </p>
                    <div class="grup-opsi" data-soal="2" data-kunci="B">
                        <button class="tombol-opsi" data-pilihan="A">A. Percepatan</button>
                        <button class="tombol-opsi" data-pilihan="B">B. Kelembaman (Inersia)</button>
                        <button class="tombol-opsi" data-pilihan="C">C. Gaya Aksi-Reaksi</button>
                    </div>
                </div>

                <br>
                <div class="kotak-kuis">
                    <p class="teks-soal">
                        <b>3.</b> Pada percobaan Hukum II Newton, mengapa uang logam yang diluncurkan pada permukaan halus meluncur lebih cepat dibandingkan pada permukaan kasar?
                    </p>
                    <div class="grup-opsi" data-soal="3" data-kunci="A">
                        <button class="tombol-opsi" data-pilihan="A">A. Karena gaya gesek pada permukaan halus lebih kecil</button>
                        <button class="tombol-opsi" data-pilihan="B">B. Karena gaya gesek pada permukaan halus lebih besar</button>
                        <button class="tombol-opsi" data-pilihan="C">C. Karena massa uang logam berubah saat menyentuh permukaan</button>
                    </div>
                </div>

                <br>
                <div class="kotak-kuis">
                    <p class="teks-soal">
                        <b>4.</b> Pada percobaan Hukum III Newton, bola yang dijatuhkan dan menabrak meja (aksi) akan memantul kembali ke atas. Dorongan meja ke atas yang membuat bola memantul dinamakan...
                    </p>
                    <div class="grup-opsi" data-soal="4" data-kunci="C">
                        <button class="tombol-opsi" data-pilihan="A">A. Gaya Gesek</button>
                        <button class="tombol-opsi" data-pilihan="B">B. Gaya Tarik</button>
                        <button class="tombol-opsi" data-pilihan="C">C. Gaya Reaksi</button>
                    </div>
                </div>

                <br>
                <div class="kotak-kuis">
                    <p class="teks-soal">
                        <b>5.</b> Dari ketiga percobaan di dalam video, manakah peristiwa yang paling tepat membuktikan Hukum III Newton (Aksi-Reaksi)?
                    </p>
                    <div class="grup-opsi" data-soal="5" data-kunci="C">
                        <button class="tombol-opsi" data-pilihan="A">A. Menarik kertas di bawah gelas secara pelan</button>
                        <button class="tombol-opsi" data-pilihan="B">B. Meluncurkan uang logam di bidang miring</button>
                        <button class="tombol-opsi" data-pilihan="C">C. Memantulkan bola kuning ke meja kayu</button>
                    </div>
                </div>

                <div class="action-container-newton">
                    <button type="button" class="btn-cek-newton" id="btn-cek-newton">Cek Jawaban</button>
                    <button type="button" class="btn-reset-newton" id="btn-reset-newton">Coba Lagi</button>
                </div>
            </div>

        </div>

        <div id="popup-newton" class="popup">
            <div class="popup-box">
                <h3>Hasil Observasi</h3>
                <div id="popup-newton-text" class="hasil-ringkas"></div>
                <div class="popup-actions">
                    <button class="btn-reset-newton" id="btn-tutup-newton">Tutup</button>
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