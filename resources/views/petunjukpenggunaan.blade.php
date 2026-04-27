<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Petunjuk Penggunaan - Gerak & Gaya</title>

    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">

    <style>
        :root {
            --primary: #f95c50;
            --primary-dark: #e44a3f;
            --primary-light: #fff5f3;
            --text: #333;
            --text-light: #666;
            --bg-light: #fffcfb;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Poppins', sans-serif;
        }

        /* HALAMAN INI HARUS BISA SCROLL KARENA KONTENNYA BISA PANJANG SAAT DIBUKA */
        body {
            background-color: var(--bg-light);
            color: var(--text);
            overflow-x: hidden;
            min-height: 100vh;
        }

        a {
            text-decoration: none;
        }

        /* NAVBAR */
        .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 50px;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(15px);
            position: fixed;
            width: 100%;
            top: 0;
            z-index: 1000;
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.03);
        }

        .logo {
            font-size: 24px;
            font-weight: 800;
            color: var(--primary);
            display: flex;
            align-items: center;
            gap: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .nav-links {
            display: flex;
            align-items: center;
        }

        .nav-links>a.active {
            color: var(--primary) !important;
        }

        .nav-links>a.active::after {
            width: 100% !important;
        }

        .nav-links a {
            margin-left: 30px;
            color: var(--text);
            font-weight: 500;
            transition: 0.3s;
            position: relative;
        }

        .nav-links a:not(.btn-daftar):not(.btn-masuk):not(.user-greeting):not(.btn-logout)::after {
            content: '';
            position: absolute;
            width: 0;
            height: 2px;
            bottom: -5px;
            left: 0;
            background-color: var(--primary);
            transition: width 0.3s;
        }

        .nav-links a:not(.btn-daftar):not(.btn-masuk):not(.user-greeting):not(.btn-logout):hover::after {
            width: 100%;
        }

        .nav-links a:not(.btn-daftar):not(.btn-masuk):not(.user-greeting):not(.btn-logout):hover {
            color: var(--primary);
        }

        /* USER & AUTH BUTTONS */
        .user-menu-container {
            position: relative;
            display: inline-block;
            margin-left: 30px;
        }

        .user-greeting {
            font-weight: 600;
            color: var(--primary) !important;
            background: #fff;
            padding: 8px 20px;
            border-radius: 50px;
            border: 2px solid var(--primary);
            transition: 0.3s;
            cursor: pointer;
            display: block;
            user-select: none;
        }

        .user-greeting:hover {
            background: var(--primary-light);
        }

        .dropdown-logout {
            display: none;
            position: absolute;
            top: 110%;
            right: 0;
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
            width: 160px;
            overflow: hidden;
            z-index: 1100;
            border: 1px solid #eee;
        }

        .dropdown-logout.show {
            display: block;
            animation: fadeIn 0.3s;
        }

        .btn-logout {
            display: block;
            width: 100%;
            padding: 12px 20px;
            border: none;
            background: transparent;
            text-align: left;
            color: #333;
            font-weight: 500;
            font-family: 'Poppins', sans-serif;
            font-size: 14px;
            cursor: pointer;
            transition: 0.2s;
        }

        .btn-logout:hover {
            background: var(--primary-light);
            color: var(--primary);
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .btn-daftar {
            background: white;
            color: var(--primary) !important;
            border: 2px solid var(--primary);
            padding: 8px 25px;
            border-radius: 50px;
            font-weight: 600;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        }

        .btn-masuk {
            background: var(--primary);
            color: white !important;
            padding: 8px 25px;
            border-radius: 50px;
            box-shadow: 0 4px 15px rgba(249, 92, 80, 0.3);
        }

        .btn-masuk:hover {
            background: var(--primary-dark);
            transform: translateY(-2px);
        }

        .nav-links .btn-masuk {
            margin-left: 15px;
        }

        /* CONTENT WRAPPER */
        .page-wrapper {
            padding: 120px 80px 80px 80px;
            max-width: 1400px;
            margin: 0 auto;
        }

        .section-header {
            text-align: center;
            margin-bottom: 40px;
        }

        .section-header h2 {
            font-size: 32px;
            color: #2c3e50;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            position: relative;
            display: inline-block;
            padding-bottom: 10px;
        }

        .section-header h2::after {
            content: '';
            position: absolute;
            width: 60px;
            height: 4px;
            background: var(--primary);
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            border-radius: 2px;
        }

        .desc-text {
            text-align: center;
            color: var(--text-light);
            margin-bottom: 40px;
            font-size: 16px;
        }

        /* ACCORDION (GAYA DROPDOWN PETUNJUK) */
        .accordion-container {
            display: flex;
            flex-direction: column;
            gap: 15px;
            width: 100%;
        }

        .accordion-item {
            background: white;
            border-radius: 12px;
            border: 1px solid #e2e8f0;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
            transition: all 0.3s;
        }

        .accordion-header {
            width: 100%;
            background: white;
            border: none;
            padding: 20px 25px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
            font-size: 16px;
            font-weight: 600;
            color: #334155;
            transition: 0.3s;
        }

        .accordion-header .title-wrapper {
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .accordion-header .icon {
            font-size: 20px;
        }

        .accordion-header .arrow {
            font-size: 14px;
            color: #94a3b8;
            transition: transform 0.3s ease;
        }

        /* Saat Accordion Aktif/Diklik */
        .accordion-item.active {
            border-color: var(--primary);
            box-shadow: 0 8px 25px rgba(249, 92, 80, 0.1);
        }

        .accordion-item.active .accordion-header {
            background-color: var(--primary-light);
            color: var(--primary);
        }

        .accordion-item.active .arrow {
            transform: rotate(180deg);
            color: var(--primary);
        }

        /* Konten di dalam Accordion */
        .accordion-content {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.4s ease-out;
            background-color: white;
        }

        .accordion-inner {
            padding: 30px;
            border-top: 1px solid #f1f5f9;
        }

        /* GAYA ISI KONTEN (GAMBAR & TEKS) */
        .step-img-placeholder {
            width: 100%;
            height: 350px;
            background-color: #f8fafc;
            border: 2px dashed #cbd5e1;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #94a3b8;
            font-weight: 500;
            margin-bottom: 25px;
        }

        .step-img {
            width: 100%;
            max-height: 500px;
            object-fit: contain;
            background-color: #f8fafc;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
            margin-bottom: 25px;
        }

        .step-list {
            list-style: none;
            padding-left: 0;
        }

        .step-list li {
            position: relative;
            padding-left: 45px;
            margin-bottom: 15px;
            color: #475569;
            font-size: 16px;
            line-height: 1.6;
        }

        .step-list li::before {
            content: counter(step-counter);
            counter-increment: step-counter;
            position: absolute;
            left: 0;
            top: 0;
            width: 28px;
            height: 28px;
            background-color: var(--primary);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            font-weight: bold;
        }

        .step-list {
            counter-reset: step-counter;
        }

        .step-list b {
            color: #1e293b;
        }

        .step-list a {
            color: var(--primary);
            font-weight: 600;
        }

        .step-list a:hover {
            text-decoration: underline;
        }
        
        /* Tambahan khusus untuk judul sub-bagian di dalam accordion */
        .sub-title {
            font-size: 18px;
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 15px;
            margin-top: 10px;
        }

        /* ================= TAMBAHAN REVISI RESPONSIVE ================= */
        .menu-toggle {
            display: none;
            flex-direction: column;
            cursor: pointer;
            gap: 5px;
        }

        .menu-toggle .bar {
            width: 25px;
            height: 3px;
            background-color: var(--primary);
            border-radius: 3px;
            transition: 0.3s;
        }

        @media (max-width: 850px) {
            .navbar { padding: 15px 20px; }

            .menu-toggle {
                display: flex;
            }
            
            .nav-links {
                display: flex !important;
                position: absolute;
                top: 70px;
                right: -100%;
                flex-direction: column;
                background: rgba(255, 255, 255, 0.98);
                width: 250px;
                text-align: center;
                transition: 0.4s ease-in-out;
                box-shadow: -5px 10px 20px rgba(0,0,0,0.05);
                padding: 20px 0;
                border-radius: 0 0 0 15px;
            }

            .nav-links.active {
                right: 0;
            }
            
            .nav-links a {
                margin: 15px 0;
                display: inline-block;
            }
            
            .nav-links .btn-masuk, .nav-links .btn-daftar {
                margin: 10px auto;
                display: inline-block;
                width: max-content;
            }

            .user-menu-container {
                margin-left: 0;
                margin-top: 10px;
            }

            .dropdown-logout {
                position: relative;
                top: 0;
                box-shadow: none;
                border: none;
                margin: 10px auto;
            }

            .btn-logout {
                text-align: center;
            }

            .page-wrapper { padding: 100px 20px 60px 20px; }
            .section-header h2 { font-size: 26px; }
            .step-img-placeholder { height: 200px; }
        }

        /* ================= TAMBAHAN SWEETALERT RESPONSIVE KUSTOM ================= */
        @media (max-width: 600px) {
            div:where(.swal2-container) div:where(.swal2-popup) {
                width: 85% !important;
                padding: 1em !important;
            }

            div:where(.swal2-container) h2:where(.swal2-title) {
                font-size: 1.4em !important;
                padding: 0.5em 0 0 !important;
            }

            div:where(.swal2-container) div:where(.swal2-html-container) {
                font-size: 0.95em !important;
                margin: 1em 0 !important;
            }

            div:where(.swal2-container) button:where(.swal2-styled) {
                padding: 8px 20px !important;
                font-size: 14px !important;
            }

            div:where(.swal2-container) div:where(.swal2-icon) {
                width: 4em !important;
                height: 4em !important;
                margin: 1em auto .5em !important;
            }

            div:where(.swal2-container) div:where(.swal2-icon) div:where(.swal2-icon-content) {
                font-size: 2.5em !important;
            }
        }
    </style>
</head>

<body>

    <nav class="navbar">
        <div class="logo">⚡ GERAK & GAYA</div>
        
        <div class="menu-toggle" id="mobile-menu">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        </div>

        <div class="nav-links" id="nav-links">
            
            @if(Auth::check() && Auth::user()->peran === 'guru')
                <a href="{{ url('/guru/datasiswa') }}">Halaman Guru</a>
            @endif

            <a href="{{ url('/') }}">Beranda</a>
            <a href="{{ url('/daftar-materi') }}">Daftar Materi</a>
            <a href="{{ url('/petunjuk') }}" class="active">Petunjuk Penggunaan</a>
            <a href="{{ url('/tentang') }}">Tentang</a>

            @auth
                <div class="user-menu-container">
                    <div class="user-greeting" onclick="toggleDropdown()">Halo, {{ Auth::user()->nama_lengkap }} 👋</div>
                    <div class="dropdown-logout" id="dropdownMenu">
                        <form id="form-logout" action="{{ route('logout') }}" method="POST">
                            @csrf
                            <button type="button" class="btn-logout" onclick="konfirmasiKeluar()">🚪 Keluar</button>
                        </form>
                    </div>
                </div>
            @else
                <a href="{{ route('register') }}" class="btn-daftar">Daftar</a>
                <a href="{{ route('login') }}" class="btn-masuk">Masuk</a>
            @endauth
        </div>
    </nav>

    <div class="page-wrapper">
        <div class="section-header" data-aos="fade-down">
            <h2>Petunjuk Penggunaan</h2>
        </div>

        <p class="desc-text" data-aos="fade-in" data-aos-delay="100">
            Pilih salah satu daftar di bawah untuk melihat petunjuk penggunaan media pembelajaran.
        </p>

        <div class="accordion-container" data-aos="fade-up" data-aos-delay="200">

            @if(Auth::check() && Auth::user()->peran === 'guru')
            <div class="accordion-item">
                <button class="accordion-header">
                    <div class="title-wrapper">
                        <span class="icon">👨‍🏫</span> Halaman Guru
                    </div>
                    <span class="arrow">▼</span>
                </button>
                <div class="accordion-content">
                    <div class="accordion-inner">
                        <img src="{{ asset('aset/halaman guru.jpg') }}" class="step-img" alt="Halaman Guru">
                        
                        <ul class="step-list">
                            <li><b>Navigasi Atas:</b> Berisi tautan cepat untuk mengakses halaman materi pembelajaran secara bebas tanpa terhalang sistem kuncian (gembok), serta menu profil untuk keluar dari akun.</li>
                            <li><b>Sidebar Halaman Guru:</b> Berisi menu-menu utama untuk mengelola aktivitas pembelajaran, antara lain mengelola Data Siswa, Data Kelas, Progres Belajar, Data Nilai, dan Pengaturan KKM.</li>
                            <li><b>Area Konten:</b> Menampilkan rincian tabel data sesuai dengan menu yang dipilih pada sidebar, di mana guru dapat melakukan aksi seperti mencari, menambah, mengedit, atau menghapus data terkait.</li>
                        </ul>
                    </div>
                </div>
            </div>
            @endif

            <div class="accordion-item">
                <button class="accordion-header">
                    <div class="title-wrapper">
                        <span class="icon">🏠</span> Halaman Beranda
                    </div>
                    <span class="arrow">▼</span>
                </button>
                <div class="accordion-content">
                    <div class="accordion-inner">
                        <img src="{{ asset('aset/beranda.jpg') }}" class="step-img" alt="Halaman Beranda">
                        
                        <ul class="step-list">
                            <li><b>Navigasi Atas:</b> Digunakan untuk berpindah dan mengakses halaman seperti Beranda, Daftar Materi, Petunjuk, dan Tentang.</li>
                            <li><b>Tombol Mulai Petualangan:</b> Digunakan untuk memulai pembelajaran. Jika belum memiliki akun, kamu akan diminta untuk masuk atau mendaftar terlebih dahulu.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="accordion-item">
                <button class="accordion-header">
                    <div class="title-wrapper">
                        <span class="icon">👤</span> Cara Mendaftar Akun
                    </div>
                    <span class="arrow">▼</span>
                </button>
                <div class="accordion-content">
                    <div class="accordion-inner">
                        <img src="{{ asset('aset/daftar akun.jpg') }}" class="step-img" alt="Cara Mendaftar Akun">
                        
                        <ul class="step-list">
                            <li>Isi data diri kamu meliputi <b>Nama Lengkap</b>, <b>Email</b>, pilih <b>Kelas</b>, masukkan <b>Kata Sandi</b> dan konfirmasi ulang kata sandi tersebut.</li>
                            <li>Setelah semua data terisi dengan benar, klik tombol <b>Daftar Sekarang</b> untuk membuat akun kamu. Selanjutnya, materi bisa kamu akses dan pelajari.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="accordion-item">
                <button class="accordion-header">
                    <div class="title-wrapper">
                        <span class="icon">📖</span> Halaman Materi Belajar
                    </div>
                    <span class="arrow">▼</span>
                </button>
                <div class="accordion-content">
                    <div class="accordion-inner">
                        <img src="{{ asset('aset/halaman materi.jpg') }}" class="step-img" alt="Halaman Materi Belajar">
                        
                        <ul class="step-list">
                            <li><b>Nama Pengguna</b> ditampilkan sebagai identitas bahwa kamu telah berhasil masuk ke dalam sistem.</li>
                            <li><b>Sidebar materi</b> berada di sebelah kiri, digunakan untuk menavigasi bab pembelajaran. Pilih salah satu bab dari menu <b>Daftar Materi</b>. Kamu harus membaca materi secara berurutan. Baca teks penjelasan dan amati gambar atau animasi yang disediakan dengan saksama. Jika terdapat sub materi yang masih terkunci (ikon gembok), kamu harus menyelesaikan <b>Latihan Soal</b> di sub materi sebelumnya dengan benar untuk membukanya.</li>
                            <li><b>Navigasi halaman</b> berada di bagian bawah, menyediakan tombol <b>Materi Sebelumnya</b> dan <b>Materi Selanjutnya</b> untuk berpindah antar halaman materi dengan mudah. Jika jawaban latihan sudah benar dan gembok telah terbuka, klik tombol <b>Materi Selanjutnya</b> untuk melangkah ke sub bab berikutnya.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="accordion-item">
                <button class="accordion-header">
                    <div class="title-wrapper">
                        <span class="icon">🏆</span> Kuis dan Syarat Kelulusan
                    </div>
                    <span class="arrow">▼</span>
                </button>
                <div class="accordion-content">
                    <div class="accordion-inner">
                        <ul class="step-list">
                            <li><b>Kuis:</b> Digunakan untuk mengukur pemahaman di setiap akhir Bab (Kuis 1 untuk Gerak, Kuis 2 untuk Gaya).</li>
                            <li><b>Evaluasi:</b> Merupakan tes keseluruhan yang ada di menu Evaluasi.</li>
                            <li><b>Syarat Kelulusan:</b> Pastikan nilai kuis kamu memenuhi standar KKM agar bisa melanjutkan ke bab atau tahap berikutnya. Jika gagal, kamu bisa mengulanginya kembali.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="accordion-item">
                <button class="accordion-header">
                    <div class="title-wrapper">
                        <span class="icon">📞</span> Hubungi Kami
                    </div>
                    <span class="arrow">▼</span>
                </button>
                <div class="accordion-content">
                    <div class="accordion-inner">
                        <p style="margin-bottom: 15px; color: #475569;">Jika mengalami kendala teknis atau memiliki pertanyaan, silakan hubungi kontak bantuan berikut:</p>
                        <ul class="step-list" style="list-style: none;">
                            <style>
                                .no-counter li::before { display: none; }
                                .no-counter li { padding-left: 0; }
                            </style>
                            <div class="no-counter">
                                <li>📧 <b>Email:</b> <a href="mailto:fajarkosongsabanjaran@gmail.com">fajarkosongsabanjaran@gmail.com</a></li>
                                <li>💬 <b>WhatsApp:</b> <a href="https://wa.me/62895338818379" target="_blank">+62895338818379</a></li>
                                <li>🎓 <b>Universitas:</b> Universitas Lambung Mangkurat, Pendidikan Komputer</li>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    
    <script>
        AOS.init({
            once: true,
            offset: 50
        });

        // LOGIKA DROPDOWN MENU USER (NAVBAR)
        function toggleDropdown() {
            document.getElementById("dropdownMenu").classList.toggle("show");
        }
        
        window.onclick = function(event) {
            // Logika tutup dropdown user
            if (!event.target.matches('.user-greeting')) {
                var dropdowns = document.getElementsByClassName("dropdown-logout");
                for (var i = 0; i < dropdowns.length; i++) {
                    var openDropdown = dropdowns[i];
                    if (openDropdown.classList.contains('show')) {
                        openDropdown.classList.remove('show');
                    }
                }
            }

            // Logika tutup menu hamburger (responsive)
            const mobileMenu = document.getElementById('mobile-menu');
            const navLinks = document.getElementById('nav-links');
            
            if (mobileMenu && navLinks && navLinks.classList.contains('active')) {
                if (!mobileMenu.contains(event.target) && !navLinks.contains(event.target)) {
                    navLinks.classList.remove('active');
                }
            }
        }

        // LOGIKA ACCORDION PETUNJUK PENGGUNAAN
        document.addEventListener("DOMContentLoaded", function() {
            const accordionHeaders = document.querySelectorAll(".accordion-header");

            accordionHeaders.forEach(header => {
                header.addEventListener("click", function() {
                    const item = this.parentElement;
                    const content = this.nextElementSibling;
                    const isActive = item.classList.contains("active");

                    // Opsional: Tutup semua accordion yang sedang terbuka
                    document.querySelectorAll(".accordion-item").forEach(otherItem => {
                        otherItem.classList.remove("active");
                        otherItem.querySelector(".accordion-content").style.maxHeight = null;
                    });

                    // Jika yang diklik sebelumnya tidak aktif, maka buka
                    if (!isActive) {
                        item.classList.add("active");
                        // Mengatur max-height sesuai tinggi asli konten agar animasi smooth
                        content.style.maxHeight = content.scrollHeight + "px";
                    }
                });
            });
        });

        // TAMBAHAN REVISI: FUNGSI HAMBURGER MENU
        const mobileMenuBtn = document.getElementById('mobile-menu');
        const navLinksContainer = document.getElementById('nav-links');

        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                navLinksContainer.classList.toggle('active');
            });
        }

        // FUNGSI SWEETALERT KONFIRMASI LOGOUT
        function konfirmasiKeluar() {
            Swal.fire({
                title: 'Apakah kamu yakin?',
                text: 'Kamu akan keluar dari akun ini.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#f95c50',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Ya, Keluar!',
                cancelButtonText: 'Batal'
            }).then((result) => {
                if (result.isConfirmed) {
                    document.getElementById('form-logout').submit();
                }
            });
        }
    </script>
</body>

</html>