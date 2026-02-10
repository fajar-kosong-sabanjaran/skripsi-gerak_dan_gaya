<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Media Pembelajaran Gerak & Gaya</title>
    
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">

    <style>
    /* ================= RESET & VARIABLE ================= */
    :root {
        --primary: #f95c50;
        --primary-dark: #e44a3f;
        --text: #333;
        --bg-light: #fffcfb;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Poppins', sans-serif;
    }

    body {
        background-color: var(--bg-light);
        color: var(--text);
        overflow: hidden;
        height: 100vh;
        width: 100vw;
        position: relative;
    }

    a { text-decoration: none; }

    /* ================= NAVBAR ================= */
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
        box-shadow: 0 2px 20px rgba(0,0,0,0.03);
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

    /* Style Link Default */
    .nav-links {
        display: flex;
        align-items: center;
    }

    .nav-links a {
        margin-left: 30px;
        color: var(--text);
        font-weight: 500;
        transition: 0.3s;
        position: relative;
    }

    /* Efek Hover Garis Bawah Menu */
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

    .nav-links a:not(.btn-daftar):not(.btn-masuk):not(.user-greeting):not(.btn-logout):hover { color: var(--primary); }


    /* ================= DROPDOWN USER (SISTEM KLIK JS) ================= */
    
    .user-menu-container {
        position: relative;
        display: inline-block;
        margin-left: 30px;
    }

    /* Tombol Halo */
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
        background: #fff5f3;
    }

    /* Dropdown Logout (Default: Sembunyi) */
    .dropdown-logout {
        display: none; 
        position: absolute;
        top: 110%; 
        right: 0;
        background: white;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        width: 160px;
        overflow: hidden;
        z-index: 1100;
        border: 1px solid #eee;
    }

    /* Class 'show' ini akan ditambahkan oleh Javascript saat diklik */
    .dropdown-logout.show {
        display: block;
        animation: fadeIn 0.3s;
    }

    /* Tombol Logout */
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
        background: #fff5f3;
        color: var(--primary);
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }


    /* ================= TOMBOL LOGIN/REGISTER ================= */
    .btn-daftar {
        background: white;
        color: var(--primary) !important;
        border: 2px solid var(--primary);
        padding: 10px 25px;
        border-radius: 50px;
        font-weight: 600;
        box-shadow: 0 4px 10px rgba(0,0,0,0.05);
    }

    .btn-masuk {
        background: var(--primary);
        color: white !important;
        padding: 10px 25px;
        border-radius: 50px;
        box-shadow: 0 4px 15px rgba(249, 92, 80, 0.3);
    }

    .btn-masuk:hover {
        background: var(--primary-dark);
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(249, 92, 80, 0.4);
    }

    .nav-links .btn-masuk {
        margin-left: 15px; 
    }


    /* ================= HERO SECTION (ANIMASI ASLI) ================= */
    .hero {
        height: 100vh;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 80px;
        background: radial-gradient(circle at top left, #fff5f3, #fffcfb);
        position: relative;
        z-index: 1;
    }

    .animated-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: -1; 
        pointer-events: none;
    }

    .bg-icon {
        position: absolute;
        opacity: 0.15;
        user-select: none;
        filter: grayscale(10%);
    }

    .icon-1 { top: 5%; left: 5%; font-size: 70px; animation: fallingApple 5s ease-in infinite; }
    .icon-2 { bottom: 5%; left: -10%; font-size: 90px; opacity: 0.2; animation: driveCar 20s linear infinite; }
    .icon-3 { top: 20%; right: 12%; font-size: 80px; animation: pushPull 2s ease-in-out infinite; }
    .icon-4 { bottom: 25%; right: 10%; font-size: 100px; transform-origin: top center; animation: pendulumSwing 3s ease-in-out infinite; }
    /* ICON-5 TELAH DIHAPUS */
    .icon-6 { top: 80%; left: 10%; font-size: 60px; opacity: 0; animation: flyRocket 12s linear infinite; animation-delay: 2s; }

    /* KEYFRAMES */
    @keyframes fallingApple { 0% { transform: translateY(0); opacity: 0; } 10% { opacity: 0.30; transform: translateY(0); } 30% { opacity: 0.30; transform: translateY(0); } 100% { transform: translateY(80vh) rotate(20deg); opacity: 0; } }
    @keyframes driveCar { 0% { left: -15%; transform: scaleX(-1); } 45% { left: 110%; transform: scaleX(-1); } 50% { left: 110%; transform: scaleX(1); } 95% { left: -15%; transform: scaleX(1); } 100% { left: -15%; transform: scaleX(-1); } }
    @keyframes pushPull { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(25px); } }
    @keyframes pendulumSwing { 0% { transform: rotate(15deg); } 50% { transform: rotate(-15deg); } 100% { transform: rotate(15deg); } }
    /* ANIMASI ORBIT CIRCLE (ICON-5) TELAH DIHAPUS */
    @keyframes flyRocket { 0% { transform: translate(0, 0) rotate(45deg); opacity: 0; } 10% { opacity: 0.2; } 80% { opacity: 0.2; } 100% { transform: translate(80vw, -80vh) rotate(45deg); opacity: 0; } }

    .hero-text { flex: 1; max-width: 650px; z-index: 2; }
    .hero-text h1 { font-size: 54px; line-height: 1.15; margin-bottom: 25px; color: #2c3e50; font-weight: 700; }
    .hero-text span { color: var(--primary); position: relative; display: inline-block; }
    .hero-text span::after { content: ''; position: absolute; width: 100%; height: 12px; background: #ffcdc9; bottom: 8px; left: 0; z-index: -1; border-radius: 4px; opacity: 0.6; }
    .hero-text p { font-size: 18px; color: #555; margin-bottom: 45px; line-height: 1.7; max-width: 90%; }
    
    .cta-button { display: inline-block; background: var(--primary); color: white; padding: 18px 45px; font-size: 20px; font-weight: 600; border-radius: 50px; box-shadow: 0 10px 25px rgba(249, 92, 80, 0.4); transition: all 0.3s ease; position: relative; overflow: hidden; animation: pulseBtn 2s infinite; cursor: pointer;}
    .cta-button:hover { transform: translateY(-5px) scale(1.02); box-shadow: 0 15px 35px rgba(249, 92, 80, 0.6); background: var(--primary-dark); animation: none; }
    @keyframes pulseBtn { 0% { box-shadow: 0 0 0 0 rgba(249, 92, 80, 0.7); } 70% { box-shadow: 0 0 0 15px rgba(249, 92, 80, 0); } 100% { box-shadow: 0 0 0 0 rgba(249, 92, 80, 0); } }

    .hero-image { flex: 1; display: flex; justify-content: center; align-items: center; height: 100%; position: relative; }
    .hero-image img { width: 100%; max-width: 750px; z-index: 2; animation: floatingHero 5s ease-in-out infinite; filter: drop-shadow(0 20px 40px rgba(0,0,0,0.1)); }
    @keyframes floatingHero { 0% { transform: translateY(0px); } 50% { transform: translateY(-25px); } 100% { transform: translateY(0px); } }

    @media (max-width: 1024px) { .hero { padding: 0 40px; } .hero-text h1 { font-size: 42px; } }
    @media (max-width: 768px) { .navbar { padding: 15px 20px; } .nav-links { display: none; } .hero { flex-direction: column-reverse; justify-content: center; padding: 20px; text-align: center; } .hero-text h1 { font-size: 34px; margin-top: 30px; } .hero-text p { font-size: 16px; margin: 0 auto 30px auto; max-width: 100%; } .hero-image img { max-width: 85%; } .bg-icon { opacity: 0.1; } }
    </style>

</head>
<body>

    <nav class="navbar">
        <div class="logo">
            ⚡ GERAK & GAYA
        </div>
        <div class="nav-links">
            
            @auth
                <a href="{{ url('siswa/gerak/pengantargerak') }}">yap</a>
                <a href="{{ url('siswa/gaya/pengantargaya') }}">yap</a>
                <a href="{{ url('siswa/gerak/kuis1') }}">yap</a>
            @else
                {{-- <a href="javascript:void(0);" onclick="showLoginAlert()">yap</a>
                <a href="javascript:void(0);" onclick="showLoginAlert()">yap</a>
                <a href="javascript:void(0);" onclick="showLoginAlert()">yap</a> --}}
            @endauth


            @auth
                <div class="user-menu-container">
                    <div class="user-greeting" onclick="toggleDropdown()">
                        Halo, {{ Auth::user()->nama_lengkap }} 👋
                    </div>
                    
                    <div class="dropdown-logout" id="dropdownMenu">
                        <form action="{{ route('logout') }}" method="POST">
                            @csrf
                            <button type="submit" class="btn-logout">
                                🚪 Keluar
                            </button>
                        </form>
                    </div>
                </div>

            @else
                <a href="{{ route('register') }}" class="btn-daftar">Daftar</a>
                <a href="{{ route('login') }}" class="btn-masuk">Masuk</a>
            @endauth
        </div>
    </nav>

    <header class="hero">
        
        <div class="animated-bg">
            <div class="bg-icon icon-1">🍎</div>
            <div class="bg-icon icon-2">🚗</div>
            <div class="bg-icon icon-3">➡️</div>
            <div class="bg-icon icon-4">⏱️</div>
            <div class="bg-icon icon-6">🚀</div>
        </div>

        <div class="hero-text" data-aos="fade-right" data-aos-duration="1200">
            <h1>Yuk, Jelajahi Dunia <br> Gerak & Gaya <span>Sekarang!</span></h1>
            
            <p>
                Pernah penasaran kenapa benda bisa bergerak? Ayo temukan jawabannya di sini! 
                Pelajari konsep seru gerak dan gaya lewat materi, gambar dan animasi yang bikin kamu paham.
            </p>
            
            @auth
                <a href="{{ url('siswa/gerak/pengantargerak') }}" class="cta-button">
                    Mulai Petualangan 🚀
                </a>
            @else
                <a href="javascript:void(0);" class="cta-button" onclick="showLoginAlert()">
                    Mulai Petualangan 🚀
                </a>
            @endauth

        </div>
        
        <div class="hero-image" data-aos="fade-left" data-aos-duration="1200">
            <img src="{{ asset('aset/38.svg') }}" alt="Ilustrasi Belajar Gerak dan Gaya">
        </div>
    </header>

    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <script>
        AOS.init();

        // 1. FUNGSI DROPDOWN MENU USER (KLIK)
        function toggleDropdown() {
            var dropdown = document.getElementById("dropdownMenu");
            dropdown.classList.toggle("show");
        }

        // 2. TUTUP DROPDOWN JIKA KLIK DI LUAR
        window.onclick = function(event) {
            if (!event.target.matches('.user-greeting')) {
                var dropdowns = document.getElementsByClassName("dropdown-logout");
                for (var i = 0; i < dropdowns.length; i++) {
                    var openDropdown = dropdowns[i];
                    if (openDropdown.classList.contains('show')) {
                        openDropdown.classList.remove('show');
                    }
                }
            }
        }

        // 3. FUNGSI SWEETALERT FORMAL
        function showLoginAlert() {
            Swal.fire({
                title: 'Akses Dibatasi',
                text: 'Mohon maaf, Kamu harus masuk ke akun Kamu terlebih dahulu untuk mengakses materi pembelajaran.',
                icon: 'info', // Icon tetap 'info'
                showCancelButton: true,
                confirmButtonColor: '#f95c50',
                cancelButtonColor: '#6c757d', // Warna abu-abu (formal) untuk batal
                confirmButtonText: 'Masuk Sekarang',
                cancelButtonText: 'Tutup',
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "{{ route('login') }}"; 
                }
            });
        }
    </script>

</body>
</html>