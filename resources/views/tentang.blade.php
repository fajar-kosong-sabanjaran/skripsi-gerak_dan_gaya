<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tentang - Gerak & Gaya</title>
    
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">

    <style>
    :root { --primary: #f95c50; --primary-dark: #e44a3f; --text: #333; --text-light: #666; --bg-light: #fffcfb; }
    * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Poppins', sans-serif; }
    body { background-color: var(--bg-light); color: var(--text); overflow-x: hidden; }
    a { text-decoration: none; }

    /* NAVBAR */
    .navbar { display: flex; justify-content: space-between; align-items: center; padding: 20px 50px; background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(15px); position: fixed; width: 100%; top: 0; z-index: 1000; box-shadow: 0 2px 20px rgba(0,0,0,0.03); }
    .logo { font-size: 24px; font-weight: 800; color: var(--primary); display: flex; align-items: center; gap: 10px; text-transform: uppercase; letter-spacing: 1px; }
    .nav-links { display: flex; align-items: center; }
    .nav-links > a.active { color: var(--primary) !important; }
    .nav-links > a.active::after { width: 100% !important; }
    .nav-links a { margin-left: 30px; color: var(--text); font-weight: 500; transition: 0.3s; position: relative; }
    .nav-links a:not(.btn-daftar):not(.btn-masuk):not(.user-greeting):not(.btn-logout)::after { content: ''; position: absolute; width: 0; height: 2px; bottom: -5px; left: 0; background-color: var(--primary); transition: width 0.3s; }
    .nav-links a:not(.btn-daftar):not(.btn-masuk):not(.user-greeting):not(.btn-logout):hover::after { width: 100%; }
    .nav-links a:not(.btn-daftar):not(.btn-masuk):not(.user-greeting):not(.btn-logout):hover { color: var(--primary); }

    .user-menu-container { position: relative; display: inline-block; margin-left: 30px; }
    .user-greeting { font-weight: 600; color: var(--primary) !important; background: #fff; padding: 8px 20px; border-radius: 50px; border: 2px solid var(--primary); transition: 0.3s; cursor: pointer; display: block; user-select: none; }
    .user-greeting:hover { background: #fff5f3; }
    .dropdown-logout { display: none; position: absolute; top: 110%; right: 0; background: white; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.15); width: 160px; overflow: hidden; z-index: 1100; border: 1px solid #eee; }
    .dropdown-logout.show { display: block; animation: fadeIn 0.3s; }
    .btn-logout { display: block; width: 100%; padding: 12px 20px; border: none; background: transparent; text-align: left; color: #333; font-weight: 500; font-family: 'Poppins', sans-serif; font-size: 14px; cursor: pointer; transition: 0.2s; }
    .btn-logout:hover { background: #fff5f3; color: var(--primary); }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
    .btn-daftar { background: white; color: var(--primary) !important; border: 2px solid var(--primary); padding: 8px 25px; border-radius: 50px; font-weight: 600; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
    .btn-masuk { background: var(--primary); color: white !important; padding: 8px 25px; border-radius: 50px; box-shadow: 0 4px 15px rgba(249, 92, 80, 0.3); }
    .btn-masuk:hover { background: var(--primary-dark); transform: translateY(-2px); }
    .nav-links .btn-masuk { margin-left: 15px; }

    /* CONTENT SECTION */
    .page-wrapper { padding: 120px 80px 60px 80px; min-height: 100vh; max-width: 1400px; margin: 0 auto; } 
    
    .section-header { text-align: center; margin-bottom: 30px; }
    .section-header h2 { font-size: 36px; color: #2c3e50; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; position: relative; display: inline-block; padding-bottom: 10px; }
    .section-header h2::after { content: ''; position: absolute; width: 60px; height: 4px; background: var(--primary); bottom: 0; left: 50%; transform: translateX(-50%); border-radius: 2px; }

    /* TENTANG KONTEN - DIBERIKAN CIRI KHAS ORANGE */
    .info-box { 
        background: white; 
        border-radius: 16px; /* Sudut lebih bulat seperti kartu materi */
        overflow: hidden; 
        box-shadow: 0 4px 20px rgba(0,0,0,0.04); 
        margin-bottom: 30px; 
        width: 100%; 
        border: 1px solid #f0f0f0;
        /* Garis orange khas di bagian atas kotak */
        border-top: 5px solid var(--primary); 
    }
    
    .info-header { 
        /* Background header diberi sedikit sentuhan warna orange sangat muda */
        background: #fffcfb; 
        padding: 20px 30px; 
        font-weight: 600; 
        color: #2c3e50; /* Warna judul lebih gelap */
        display: flex; 
        align-items: center; 
        gap: 12px; 
        border-bottom: 1px solid #f0f0f0; 
        font-size: 18px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    
    /* Mengubah warna emoji/ikon bawaan agar senada jika memungkinkan (menggunakan filter) */
    .info-header-icon {
        font-size: 22px;
    }

    .info-body { padding: 40px 50px; text-align: center; }
    .info-body p.intro { font-size: 16px; color: var(--text-light); margin-bottom: 25px; }
    
    /* Judul Skripsi ditekankan */
    .info-body h3 { 
        font-size: 22px; 
        color: #1e293b; 
        text-transform: uppercase; 
        letter-spacing: 0.5px; 
        margin-bottom: 40px; 
        line-height: 1.6; 
        font-weight: 700; 
    }
    
    .detail-table { width: 100%; max-width: 1100px; margin: 0 auto; text-align: left; border-collapse: collapse; }
    .detail-table td { padding: 15px 10px; font-size: 16px; color: #475569; border-bottom: 1px dashed #e2e8f0; }
    .detail-table td:first-child { font-weight: 600; color: #1e293b; width: 25%; } 
    .detail-table tr:last-child td { border-bottom: none; }
    .detail-table a { color: var(--primary); font-weight: 500; }
    .detail-table a:hover { text-decoration: underline; }

    /* TENTANG KONTEN - DAFTAR PUSTAKA */
    .pustaka-body { padding: 30px 40px; text-align: left; }
    .pustaka-body p { color: var(--text-light); font-size: 16px; line-height: 1.8; margin-left: 10px; }

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
        .section-header h2 { font-size: 28px; } 
        .info-body, .pustaka-body { padding: 25px; } 
        
        /* Agar tabel biodata responsif di HP */
        .detail-table td { display: block; width: 100% !important; padding: 8px 0; } 
        .detail-table td:first-child { padding-top: 15px; border-bottom: none; font-size: 14px; color: #64748b;} 
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
            <a href="{{ url('/petunjuk') }}">Petunjuk Penggunaan</a>
            <a href="{{ url('/tentang') }}" class="active">Tentang</a>

            @auth
                <div class="user-menu-container">
                    <div class="user-greeting" onclick="toggleDropdown()">Halo, {{ Auth::user()->nama_lengkap }} 👋</div>
                    <div class="dropdown-logout" id="dropdownMenu">
                        <form action="{{ route('logout') }}" method="POST">
                            @csrf
                            <button type="submit" class="btn-logout">🚪 Keluar</button>
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
            <h2>Tentang Media Ini</h2>
        </div>

        <div class="info-box" data-aos="fade-up">
            <div class="info-header">
                <span class="info-header-icon">ℹ️</span> Informasi Pengembangan
            </div>
            <div class="info-body">
                <p class="intro">Media pembelajaran ini dibuat untuk memenuhi persyaratan penyelesaian studi Program Strata-1 Pendidikan Komputer.</p>
                
                <h3>PENGEMBANGAN MEDIA PEMBELAJARAN BERBASIS WEB PADA MATERI GERAK DAN GAYA MENGGUNAKAN MODEL TUTORIAL UNTUK SISWA SMP</h3>

                <table class="detail-table">
                    <tr>
                        <td>Nama</td>
                        <td>: Fajar aulia</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>: <a href="mailto:2210131210008@mhs.ulm.ac.id">2210131210008@mhs.ulm.ac.id</a> / <a href="mailto:fajarkosongsabanjaran@gmail.com">fajarkosongsabanjaran@gmail.com</a></td>
                    </tr>
                    <tr>
                        <td>Dosen Pembimbing 1</td>
                        <td>: Dr. Andi Ichsan Mahardika, M.Pd.</td>
                    </tr>
                    <tr>
                        <td>Dosen Pembimbing 2</td>
                        <td>: Novan Alkaf Bahraini Saputra, S.Kom., M.T.</td>
                    </tr>
                    <tr>
                        <td>Program Studi</td>
                        <td>: S-1 Pendidikan Komputer</td>
                    </tr>
                    <tr>
                        <td>Instansi</td>
                        <td>: Universitas Lambung Mangkurat</td>
                    </tr>
                </table>
            </div>
        </div>

        <div class="info-box" data-aos="fade-up" data-aos-delay="100">
            <div class="info-header">
                <span class="info-header-icon">📚</span> Daftar Pustaka & Atribusi
            </div>
            <div class="pustaka-body">
                <p>-</p>
            </div>
        </div>

    </div>

    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script>
        AOS.init({ once: true, offset: 50 });
        function toggleDropdown() { document.getElementById("dropdownMenu").classList.toggle("show"); }
        window.onclick = function(event) { if (!event.target.matches('.user-greeting')) { var dropdowns = document.getElementsByClassName("dropdown-logout"); for (var i = 0; i < dropdowns.length; i++) { var openDropdown = dropdowns[i]; if (openDropdown.classList.contains('show')) { openDropdown.classList.remove('show'); } } } }
        
        // TAMBAHAN REVISI: FUNGSI HAMBURGER MENU
        const mobileMenu = document.getElementById('mobile-menu');
        const navLinks = document.getElementById('nav-links');

        if (mobileMenu) {
            mobileMenu.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });
        }
    </script>
</body>
</html>