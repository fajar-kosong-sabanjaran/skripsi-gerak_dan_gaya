@extends('layouts.siswa')

@section('content')
    <div class="main-content">
        <div class="container">
            <h1>MACAM - MACAM GAYA</h1>

            <div class="inner-box">
                <h3>Macam-Macam Gaya di Sekitar Kita</h3>

                <div class="jg-grid-wrapper">

                    <div class="jg-card">
                        <h4>1. Gaya Gesek</h4>
                        <div class="jg-img-box has-video">
                            <video autoplay muted loop playsinline>
                                <source src="{{ asset('aset/6.mp4') }}" type="video/mp4">
                                Browser Anda tidak mendukung tag video.
                            </video>
                        </div>
                        <p class="jg-video-caption">Ilustrasi gaya gesek saat mendorong meja</p>

                        <p>
                            <b>Gaya Gesek</b> adalah <b>gaya yang timbul akibat sentuhan langsung antara dua permukaan
                                benda</b>. Arah gaya ini unik karena selalu berlawanan dengan arah gerak benda.
                        </p>
                        <p>
                            Contohnya adalah gesekan antara kaki meja dan lantai saat meja didorong, atau gesekan antara ban
                            sepeda dengan aspal saat direm.
                        </p>
                        <p>Gaya ini terbagi menjadi dua jenis:</p>
                        <ul>
                            <li>
                                Gaya Gesek Statis: Bekerja saat benda masih diam. Inilah alasannya mengapa saat kamu baru
                                mulai mendorong meja, rasanya sangat berat.
                            </li>
                            <li>
                                Gaya Gesek Kinetis: Bekerja saat benda sudah bergerak. Ketika meja tersebut sudah berhasil
                                bergeser (meluncur), gaya geseknya menjadi lebih kecil sehingga doronganmu terasa lebih
                                ringan.
                            </li>
                        </ul>
                    </div>

                    <div class="jg-card">
                        <h4>2. Gaya Gravitasi</h4>
                        <div class="jg-img-box has-video">
                            <video autoplay muted loop playsinline>
                                <source src="{{ asset('aset/7.mp4') }}" type="video/mp4">
                                Browser Anda tidak mendukung tag video.
                            </video>
                        </div>
                        <p class="jg-video-caption">Ilustrasi gaya gravitasi pada apel yang jatuh</p>

                        <p>
                            <b>Gaya Gravitasi</b> adalah <b>gaya tarik bumi yang menyebabkan segala sesuatu jatuh ke bawah
                                menuju pusat bumi</b>.
                        </p>
                        <p>
                            Contoh paling nyata adalah saat buah matang jatuh dari pohonnya ke tanah. Selain itu, gaya
                            inilah yang menjaga kaki kita tetap menapak di lantai saat berjalan. Tanpa gaya ini, kita semua
                            akan melayang-layang di udara.
                        </p>
                    </div>

                    <div class="jg-card">
                        <h4>3. Gaya Pegas</h4>
                        <div class="jg-img-box has-video">
                            <video autoplay muted loop playsinline>
                                <source src="{{ asset('aset/8.mp4') }}" type="video/mp4">
                                Browser Anda tidak mendukung tag video.
                            </video>
                        </div>
                        <p class="jg-video-caption">Ilustrasi gaya pegas pada benda elastis</p>

                        <p>
                            <b>Gaya Pegas</b> adalah <b>gaya yang dihasilkan oleh benda-benda yang bersifat elastis</b>.
                            Benda elastis adalah benda yang bisa kembali ke bentuk semula setelah ditarik atau ditekan.
                        </p>
                        <p>Contoh benda yang menghasilkan gaya pegas:</p>
                        <ul>
                            <li>Karet ketapel yang ditarik akan melontarkan batu.</li>
                            <li>Per (pegas) pada kasur spring bed yang memantul saat diduduki.</li>
                            <li>Busur panah yang melengkung saat ditarik.</li>
                        </ul>
                    </div>

                    <div class="jg-card">
                        <h4>4. Gaya Otot</h4>
                        <div class="jg-img-box has-video">
                            <video autoplay muted loop playsinline>
                                <source src="{{ asset('aset/9.mp4') }}" type="video/mp4">
                                Browser Anda tidak mendukung tag video.
                            </video>
                        </div>
                        <p class="jg-video-caption">Gaya otot saat mengangkat beban</p>

                        <p>
                            <b>Gaya Otot</b> adalah <b>gaya yang dihasilkan oleh kerja otot tubuh</b> manusia atau hewan
                            saat melakukan aktivitas fisik untuk mendorong atau menarik sesuatu.
                        </p>
                        <p>Contoh kegiatannya dalam kehidupan sehari-hari:</p>
                        <ul>
                            <li>Seseorang yang sedang mengangkat beban atau tas sekolah.</li>
                            <li>Sekelompok orang yang sedang bermain tarik tambang.</li>
                            <li>Hewan seperti kerbau atau kuda yang membajak sawah.</li>
                        </ul>
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
                        <li>Klik dan tahan (drag) pernyataan yang ada di bawah</li>
                        <li>Geser pernyataan ke dalam kotak kategori yang sesuai.</li>
                        <li>Klik "Cek Jawaban" untuk melihat hasil (<b style="color: #16a34a;">Hijau</b>: Benar, <b
                                style="color: #dc2626;">Merah</b>: Salah) dan Pilih "Coba Lagi" untuk mengulang </li>
                        <li>Jika semua jawaban sudah benar, pilih "Unduh Jawaban" untuk menyimpan hasilnya.</li>
                    </ul>
                </div>

                <div class="drag-container" id="drag-container-macam">
                    <div class="drop-column">
                        <div class="drop-header">Gaya Gesek</div>
                        <div class="drop-zone" data-type="gesek"></div>
                    </div>

                    <div class="drop-column">
                        <div class="drop-header">Gaya Gravitasi</div>
                        <div class="drop-zone" data-type="gravitasi"></div>
                    </div>

                    <div class="drop-column">
                        <div class="drop-header">Gaya Pegas</div>
                        <div class="drop-zone" data-type="pegas"></div>
                    </div>

                    <div class="drop-column">
                        <div class="drop-header">Gaya Otot</div>
                        <div class="drop-zone" data-type="otot"></div>
                    </div>
                </div>

                <p class="card-pool-title"><b>Pernyataan:</b></p>

                <div class="card-pool" id="card-pool-macam" data-type="pool">
                    <div class="card-item" id="card-macam1" draggable="true" data-answer="gesek">
                        Ban sepeda bergesekan dengan jalan saat direm.
                    </div>
                    <div class="card-item" id="card-macam2" draggable="true" data-answer="gravitasi">
                        Buah jatuh dari pohon ke tanah.
                    </div>
                    <div class="card-item" id="card-macam3" draggable="true" data-answer="pegas">
                        Ketapel ditarik lalu melontarkan batu.
                    </div>
                    <div class="card-item" id="card-macam4" draggable="true" data-answer="otot">
                        Seseorang mengangkat tas sekolah.
                    </div>
                </div>

                <div class="action-container-macamgaya" style="display: flex; gap: 10px;">
                    <button type="button" class="btn-cek-macamgaya" id="btn-cek-macam">Cek Jawaban</button>
                    <button type="button" class="btn-reset-macamgaya" id="btn-retry-macam">Coba Lagi</button>
                    <button type="button" id="btn-unduh-macam" class="tombol-unduh" style="display: none;">
                        <i class="fas fa-file-pdf"></i> Unduh Jawaban
                    </button>
                </div>

            </div>

            <div id="modal-macam" class="modal">
                <div class="modal-content">
                    <h4 style="margin-bottom: 5px;">Hasil Latihan</h4>
                    <p id="modal-text-macam"></p>
                    <button type="button" id="close-modal-macam" class="btn-cek-macamgaya">Tutup</button>
                </div>
            </div>

        </div>

        <div class="bottom-nav">
            <a href="{{ url('siswa/gaya/resultangaya') }}" class="nav-btn prev">« Materi Sebelumnya</a>

            <a href="{{ url('siswa/gaya/hukumnewton') }}" id="btn-next-materi" class="nav-btn next locked">Materi
                Selanjutnya »</a>
        </div>

    </div>
@endsection
