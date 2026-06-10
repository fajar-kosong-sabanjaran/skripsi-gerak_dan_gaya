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
                    Pada video sebelah kiri, seorang siswa sedang memberikan gaya <b>tarik</b> pada gagang pintu untuk
                    membukanya.
                    Sedangkan pada video sebelah kanan, siswa tersebut memberikan gaya <b>dorong</b> pada meja agar
                    berpindah tempat.
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
                    Perhatikan animasi di atas. Bola yang menggelinding lurus menjadi berbelok arah setelah menerima
                    tendangan.
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
                <p class="image-caption">Perubahan kecepatan dari aktivitas bersepeda</p>

                <p>
                    Perhatikan animasi bersepeda tersebut. Sepeda akan melaju cepat saat pedal dikayuh kuat, dan melambat
                    saat direm.
                    Hal ini menunjukkan bahwa besar kecilnya gaya berpengaruh langsung terhadap perubahan kecepatan benda.
                </p>
            </div>

            <div class="inner-box">
                <h3>Ayo Berlatih</h3>

                <div class="kotak-instruksi">
                    <p>
                        <i class="fas fa-info-circle"></i> Petunjuk Pengerjaan:
                    </p>
                    <ul>
                        <li>Isilah kotak-kotak teka-teki silang berikut sesuai dengan petunjuk mendatar dan menurun.</li>
                        <li>Klik "Cek Jawaban" untuk melihat hasil (<b style="color: #16a34a;">Hijau</b>: Benar, <b
                                style="color: #dc2626;">Merah</b>: Salah) dan pilih "Ulangi" untuk menghapus serta mengulang kembali jawaban.</li>
                        <li>Jika semua jawaban sudah benar, pilih "Unduh Jawaban" untuk menyimpan hasilnya.</li>
                    </ul>
                </div>

                <div class="tts-container">
                    <div class="tts-board">
                        <div class="tts-cell" style="grid-area: 1 / 5;"><span class="tts-num">3</span><input type="text"
                                maxlength="1" class="tts-input" data-answer="B"></div>
                        <div class="tts-cell" style="grid-area: 2 / 5;"><input type="text" maxlength="1"
                                class="tts-input" data-answer="E"></div>

                        <div class="tts-cell" style="grid-area: 2 / 3;"><span class="tts-num">2</span><input type="text"
                                maxlength="1" class="tts-input" data-answer="A"></div>

                        <div class="tts-cell" style="grid-area: 3 / 1;"><span class="tts-num">1</span><input type="text"
                                maxlength="1" class="tts-input" data-answer="D"></div>
                        <div class="tts-cell" style="grid-area: 3 / 2;"><input type="text" maxlength="1"
                                class="tts-input" data-answer="O"></div>
                        <div class="tts-cell" style="grid-area: 3 / 3;"><input type="text" maxlength="1"
                                class="tts-input" data-answer="R"></div>
                        <div class="tts-cell" style="grid-area: 3 / 4;"><input type="text" maxlength="1"
                                class="tts-input" data-answer="O"></div>
                        <div class="tts-cell" style="grid-area: 3 / 5;"><input type="text" maxlength="1"
                                class="tts-input" data-answer="N"></div>
                        <div class="tts-cell" style="grid-area: 3 / 6;"><input type="text" maxlength="1"
                                class="tts-input" data-answer="G"></div>
                        <div class="tts-cell" style="grid-area: 3 / 7;"><input type="text" maxlength="1"
                                class="tts-input" data-answer="A"></div>
                        <div class="tts-cell" style="grid-area: 3 / 8;"><input type="text" maxlength="1"
                                class="tts-input" data-answer="N"></div>

                        <div class="tts-cell" style="grid-area: 4 / 3;"><input type="text" maxlength="1"
                                class="tts-input" data-answer="A"></div>
                        <div class="tts-cell" style="grid-area: 5 / 3;"><input type="text" maxlength="1"
                                class="tts-input" data-answer="H"></div>

                        <div class="tts-cell" style="grid-area: 4 / 5;"><input type="text" maxlength="1"
                                class="tts-input" data-answer="T"></div>
                        <div class="tts-cell" style="grid-area: 5 / 5;"><input type="text" maxlength="1"
                                class="tts-input" data-answer="U"></div>

                        <div class="tts-cell" style="grid-area: 6 / 5;"><span class="tts-num">4</span><input
                                type="text" maxlength="1" class="tts-input" data-answer="K"></div>
                        <div class="tts-cell" style="grid-area: 6 / 6;"><input type="text" maxlength="1"
                                class="tts-input" data-answer="E"></div>
                        <div class="tts-cell" style="grid-area: 6 / 7;"><input type="text" maxlength="1"
                                class="tts-input" data-answer="C"></div>
                        <div class="tts-cell" style="grid-area: 6 / 8;"><input type="text" maxlength="1"
                                class="tts-input" data-answer="E"></div>
                        <div class="tts-cell" style="grid-area: 6 / 9;"><input type="text" maxlength="1"
                                class="tts-input" data-answer="P"></div>
                        <div class="tts-cell" style="grid-area: 6 / 10;"><input type="text" maxlength="1"
                                class="tts-input" data-answer="A"></div>
                        <div class="tts-cell" style="grid-area: 6 / 11;"><input type="text" maxlength="1"
                                class="tts-input" data-answer="T"></div>
                        <div class="tts-cell" style="grid-area: 6 / 12;"><input type="text" maxlength="1"
                                class="tts-input" data-answer="A"></div>
                        <div class="tts-cell" style="grid-area: 6 / 13;"><input type="text" maxlength="1"
                                class="tts-input" data-answer="N"></div>
                    </div>

                    <div class="tts-clues">
                        <div class="clue-col">
                            <h4>Mendatar</h4>
                            <p><b>1.</b> Tarikan atau _____ yang menyebabkan benda bergerak.</p>
                            <p><b>4.</b> Menginjak rem mobil saat mendekati lampu merah mengakibatkan perubahan _____</p>
                        </div>
                        <div class="clue-col">
                            <h4>Menurun</h4>
                            <p><b>2.</b> Kiper menepis bola yang ditendang lawan sehingga melenceng membuktikan gaya dapat
                                mengubah _____ gerak benda.</p>
                            <p><b>3.</b> Saat menekan tanah liat atau plastisin menjadi pipih, gaya menyebabkan perubahan
                                _____ benda.</p>
                        </div>
                    </div>
                </div>

                <div class="action-container-pengertiangaya" style="display: flex; gap: 10px; margin-top: 20px;">
                    <button type="button" class="btn-cek-pengertiangaya" id="btn-submit-pengertiangaya">Cek
                        Jawaban</button>
                    <button type="button" class="btn-reset-pengertiangaya" id="btn-retry-pengertiangaya">Ulangi</button>
                    <button type="button" id="btn-unduh-pengertiangaya" class="tombol-unduh" style="display: none;">
                        <i class="fas fa-file-pdf"></i> Unduh Jawaban
                    </button>
                </div>
            </div>

        </div>

        <div class="bottom-nav">
            <a href="{{ url('siswa/gaya/pengantargaya') }}" class="nav-btn prev">« Materi Sebelumnya</a>

            <a href="{{ url('siswa/gaya/resultangaya') }}" id="btn-next-materi" class="nav-btn next locked">Materi
                Selanjutnya »</a>
        </div>

    </div>
@endsection