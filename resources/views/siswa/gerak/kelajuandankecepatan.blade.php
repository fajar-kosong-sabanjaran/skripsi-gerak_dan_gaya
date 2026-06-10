@extends('layouts.siswa')

@section('content')
    <div class="main-content">
        <div class="container">
            <h1>KELAJUAN DAN KECEPATAN</h1>

            <div class="page-step" id="step-1">
                <div class="inner-box">
                    <h3>Kelajuan dan Kecepatan</h3>

                    <p>
                        <b>Kelajuan adalah besaran yang menyatakan seberapa cepat suatu benda menempuh jarak dalam selang
                            waktu
                            tertentu tanpa memperhitungkan arah geraknya.</b> Ketika membahas kelajuan, kita hanya fokus
                        pada
                        jarak yang ditempuh dan waktu yang diperlukan, tanpa memedulikan ke arah mana benda tersebut
                        bergerak.
                        Oleh karena itu, <b>kelajuan termasuk besaran skalar, yaitu besaran yang hanya memiliki nilai dan
                            satuan
                            tanpa arah.</b>
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
                        Berdasarkan video di atas, terlihat sebuah bus melaju dengan kelajuan 60 km/jam. Angka tersebut
                        hanya
                        menunjukkan seberapa cepat bus itu bergerak, tanpa memberikan informasi ke mana arah tujuannya.
                        Inilah
                        yang disebut kelajuan, di mana informasi arah tidak diperlukan.
                    </p>

                    <hr><br>

                    <p>
                        Sementara itu, <b>kecepatan adalah besaran yang menyatakan besarnya perpindahan yang terjadi dalam
                            setiap satuan waktu.</b> Berbeda dengan kelajuan, kecepatan tidak hanya menunjukkan seberapa
                        cepat
                        benda bergerak, tetapi juga ke arah mana benda tersebut bergerak. Oleh karena itu, <b>kecepatan
                            termasuk
                            besaran vektor, yaitu besaran yang memiliki nilai, satuan, dan arah.</b>
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
                        Pada video di atas, bus tersebut melaju dengan kecepatan 60 km/jam ke arah timur. Perhatikan adanya
                        simbol arah mata angin yang menunjukkan arah gerak bus. Informasi lengkap yang mencakup nilai (60
                        km/jam) dan arah (ke timur) inilah yang membedakan kecepatan dengan kelajuan.
                    </p>

                    <hr><br>

                    <p>
                        Berdasarkan penjelasan tersebut, perbedaan mendasar antara kelajuan dan kecepatan dapat dirangkum
                        sebagai berikut:
                    </p>
                    <ul>
                        <li>
                            Kelajuan berkaitan dengan jarak tempuh dan waktu tanpa memperhatikan arah (skalar).
                        </li>
                        <li>
                            Kecepatan berkaitan dengan perpindahan, waktu, serta arah gerak benda (vektor).
                        </li>
                    </ul>

                </div>

                <div class="inner-box">
                    <h3>Rumus Kelajuan</h3>
                    <p>
                        Setelah memahami pengertian kelajuan dan kecepatan beserta perbedaannya, langkah selanjutnya adalah
                        mempelajari rumus dasar yang digunakan untuk menghitung kelajuan. Untuk menentukan kelajuan,
                        diperlukan informasi mengenai jarak yang ditempuh dan waktu yang digunakan.
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
                        <p>Keterangan:</p>
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
                        mengenai besar perpindahan dan waktu.
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
                        <p>Keterangan:</p>
                        <ul>
                            <li>\( \vec{v} \) : Kecepatan (m/s)</li>
                            <li>\( \Delta s \) : Perpindahan (m)</li>
                            <li>\( t \) : Waktu tempuh (s)</li>
                        </ul>
                    </div>
                </div>
                
            </div>
            <div class="page-step" id="step-2" style="display: none;">
                <div class="inner-box">
                    <h3>Ayo, Kita Pahami!</h3>
                    <p>
                        Sebuah mobil bergerak lurus ke arah timur menuju sekolah sejauh 100 m,
                        kemudian kembali ke arah barat menuju taman sejauh 50 m.
                        Waktu yang dibutuhkan untuk seluruh perjalanan tersebut adalah
                        25 sekon.
                        Tentukan kelajuan dan kecepatan benda tersebut!
                    </p>

                    <p>
                        <img src="{{ asset('aset/25.jpg') }}" alt="Contoh soal kelajuan dan kecepatan"
                            class="content-image2">
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
                                Jadi, kelajuan benda tersebut adalah 6 m/s.
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
                                2 m/s ke arah timur.
                            </p>
                        </div>
                    </div>
                </div>

                <div class="inner-box">
                    <h3>Ayo Praktik: Menghitung Kelajuan</h3>

                    <div class="kotak-instruksi">
                        <p>
                            <i class="fas fa-info-circle"></i> Petunjuk Pengerjaan:
                        </p>
                        <ul>
                            <li>Tonton video praktik kelajuan dengan saksama, lalu catat jarak dan waktu tempuh untuk setiap
                                benda (Pensil, Pulpen, dan Lem Stik).</li>
                            <li>Gunakan menu 'Lompat ke bagian' agar lebih mudah menemukan bagian video yang kamu inginkan.</li>
                            <li>Hitung kelajuan setiap benda menggunakan rumus \((v = \frac{s}{t})\) lalu isi tabel hanya
                                dengan angka dalam satuan cm dan sekon.
                            </li>
                            <li>Klik "Cek Jawaban Praktik" untuk melihat hasil (<b style="color: #16a34a;">Hijau</b>: Benar, <b
                                    style="color: #dc2626;">Merah</b>: Salah) dan pilih "Ulangi" untuk menghapus serta mengulang kembali jawaban.</li>
                        </ul>
                    </div>

                    <p>
                        <video id="video-praktik" class="content-video" controls preload="auto">
                            <source src="{{ url('stream-video/praktik_gerak.mp4') }}#t=0.001" type="video/mp4">
                            Browser Anda tidak mendukung tag video.
                        </video>
                    </p>
                    <p class="image-caption">Video Praktik Menghitung Kelajuan</p>

                    <div class="video-timestamps">
                        <span class="timestamp-label"><i class="fas fa-list-ul"></i> Lompat ke bagian:</span>
                        <div class="timestamp-buttons">
                            <button type="button" class="btn-time" data-time="5">Tujuan Percobaan</button>
                            <button type="button" class="btn-time" data-time="18">Alat & Bahan</button>
                            <button type="button" class="btn-time" data-time="44">Percobaan 1 (Pensil)</button>
                            <button type="button" class="btn-time" data-time="65">Percobaan 2 (Pulpen)</button>
                            <button type="button" class="btn-time" data-time="86">Percobaan 3 (Lem stik)</button>
                        </div>
                    </div>

                    <hr><br>

                    <p style="font-size: 14px; color: #666; font-style: italic; margin-bottom: 10px;">
                        *Catatan: Hitunglah kelajuan (v) dengan pembulatan 2 angka di belakang koma. Gunakan tanda koma ( ,
                        ) bukan titik. Contoh: 5,18
                    </p>

                    <table class="quiz-table" style="text-align: center;">
                        <thead>
                            <tr>
                                {{-- Menghilangkan bold (font-weight: normal) pada <th> --}}
                                <th style="width: 25%; font-weight: normal;">Benda</th>
                                <th style="width: 25%; font-weight: normal;">Jarak (\(s\))<br><small>dalam cm</small></th>
                                <th style="width: 25%; font-weight: normal;">Waktu (\(t\))<br><small>dalam sekon</small>
                                </th>
                                <th style="width: 25%; font-weight: normal;">Kelajuan (\(v\))<br><small>dalam cm/s</small>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {{-- Menghapus <strong> --}}
                                <td>Pensil</td>
                                <td><input class="isian-ayo" id="prak-s-pensil" placeholder="..."></td>
                                {{-- Mengosongkan isian waktu --}}
                                <td><input class="isian-ayo" id="prak-t-pensil" placeholder="..."></td>
                                <td><input class="isian-ayo" id="prak-v-pensil" placeholder="..."></td>
                            </tr>
                            <tr>
                                <td>Pulpen</td>
                                <td><input class="isian-ayo" id="prak-s-pulpen" placeholder="..."></td>
                                <td><input class="isian-ayo" id="prak-t-pulpen" placeholder="..."></td>
                                <td><input class="isian-ayo" id="prak-v-pulpen" placeholder="..."></td>
                            </tr>
                            <tr>
                                <td>Lem Stik</td>
                                <td><input class="isian-ayo" id="prak-s-lem" placeholder="..."></td>
                                <td><input class="isian-ayo" id="prak-t-lem" placeholder="..."></td>
                                <td><input class="isian-ayo" id="prak-v-lem" placeholder="..."></td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="latihan-actions" style="margin-top: 20px;">
                        <button type="button" id="btn-cek-praktik" class="btn-cek">Cek Jawaban Praktik</button>
                        <button type="button" id="btn-reset-praktik" class="btn-reset">Ulangi</button>
                    </div>
                </div>
                <div class="inner-box quiz-wrapper">
                    <h3>Ayo Bedakan Kelajuan dan Kecepatan</h3>

                    <div class="kotak-instruksi">
                        <p>
                            <i class="fas fa-info-circle"></i> Petunjuk Pengerjaan:
                        </p>
                        <ul>
                            <li>Tentukan apakah pernyataan tersebut termasuk ciri Kelajuan atau Kecepatan.</li>
                            <li>Berikan tanda centang (✔) pada kolom yang sesuai.</li>
                            <li>Tekan tombol "Cek Jawaban" untuk melihat hasil kerjamu, atau tombol "Ulangi" untuk menghapus serta mengulang kembali jawaban.</li>
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
                        <button type="button" class="btn-reset" id="btn-reset-quiz">Ulangi</button>
                    </div>
                </div>

                <div class="inner-box">
                    <h3>Ayo Berlatih</h3>

                    <div class="kotak-instruksi">
                        <p>
                            <i class="fas fa-info-circle"></i> Petunjuk Pengerjaan:
                        </p>
                        <ul>
                            <li>Isikan jawabanmu pada kolom yang tersedia (titik-titik).</li>
                            <li>Gunakan angka saja untuk mengisi jawaban (contoh: 120, bukan 120 m).</li>
                            <li>Klik "Cek Jawaban" untuk melihat hasil (<b style="color: #16a34a;">Hijau</b>: Benar, <b
                                    style="color: #dc2626;">Merah</b>: Salah) dan pilih "Ulangi" untuk menghapus serta mengulang kembali jawaban.</li>
                            <li>Jika semua jawaban sudah benar, pilih "Unduh Jawaban" untuk menyimpan hasilnya.</li>
                        </ul>
                    </div>

                    <p>
                        Seorang anak bersepeda ke arah selatan menuju toko sejauh 120 meter,
                        kemudian berbalik arah ke utara menuju sekolah sejauh 40 meter.
                        Waktu yang dihabiskan anak tersebut untuk seluruh perjalanan adalah
                        20 sekon.
                        Tentukan kelajuan dan kecepatan anak tersebut!
                    </p>

                    <p>
                        <img src="{{ asset('aset/26.jpg') }}" alt="Contoh soal kelajuan dan kecepatan"
                            class="content-image2">
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
                        <button type="button" id="btn-reset-latihan" class="btn-reset">Ulangi</button>

                        <button type="button" id="btn-unduh-latihan" class="tombol-unduh" style="display: none;">
                            <i class="fas fa-file-pdf"></i> Unduh Jawaban
                        </button>
                    </div>
                </div>
            </div>

            <div class="bottom-nav">

                <div id="nav-left">
                    <a href="{{ url('siswa/gerak/jaraktempuhdanperpindahan') }}" id="btn-prev-materi"
                        class="nav-btn prev">« Materi Sebelumnya</a>
                    <button type="button" id="btn-prev-step" class="nav-btn prev"
                        style="display: none; border:none; cursor:pointer; font-family:inherit;">« Halaman
                        Sebelumnya</button>
                </div>

                <div class="pagination-container" style="display: flex; gap: 8px; margin: 0;">
                    <button type="button" class="num-step active" data-step="1">1</button>
                    <button type="button" class="num-step" data-step="2">2</button>
                </div>

                <div id="nav-right">
                    <button type="button" id="btn-next-step" class="nav-btn next"
                        style="border:none; cursor:pointer; font-family:inherit;">Halaman Selanjutnya »</button>
                    <a href="{{ url('siswa/gerak/percepatan') }}" id="btn-next-materi" class="nav-btn next locked"
                        style="display: none;">Materi Selanjutnya »</a>
                </div>

            </div>

        </div>
    </div>
@endsection