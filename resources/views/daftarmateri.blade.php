<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Daftar Materi - Gerak & Gaya</title>
    
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">

    <style>
    :root {
        --primary: #f95c50;
        --primary-dark: #e44a3f;
        --text: #333;
        --text-light: #666;
        --bg-light: #fffcfb;
    }

    * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Poppins', sans-serif; }
    
    /* MENGUNCI LAYAR AGAR TIDAK BISA SCROLL */
    body { 
        background-color: var(--bg-light); 
        color: var(--text); 
        overflow: hidden; 
        height: 100vh; 
        width: 100vw;
        display: flex;
        flex-direction: column;
    }
    
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

    /* DROPDOWN USER & AUTH BUTTONS */
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
    .btn-masuk:hover { background: var(--primary-dark); transform: translateY(-2px); box-shadow: 0 6px 20px rgba(249, 92, 80, 0.4); }
    .nav-links .btn-masuk { margin-left: 15px; }

    /* CONTENT SECTION */
    .page-wrapper { 
        flex: 1; 
        display: flex;
        flex-direction: column;
        justify-content: center; 
        padding: 80px 80px 0 80px; 
        max-width: 1400px; 
        margin: 0 auto; 
        width: 100%;
    }
    
    .section-header { text-align: center; margin-bottom: 50px; } 
    .section-header h2 { font-size: 36px; color: #2c3e50; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; position: relative; display: inline-block; padding-bottom: 10px; }
    .section-header h2::after { content: ''; position: absolute; width: 60px; height: 4px; background: var(--primary); bottom: 0; left: 50%; transform: translateX(-50%); border-radius: 2px; }

    /* MATERI GRID */
    .materi-grid { 
        display: grid; 
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
        gap: 40px; 
    }
    
    /* MODIFIKASI KARTU MATERI */
    .materi-card { 
        background: white; 
        border-radius: 16px; 
        padding: 40px 35px; 
        box-shadow: 0 4px 15px rgba(0,0,0,0.03); 
        border: 2px solid transparent; 
        transition: all 0.3s ease; 
    }
    
    /* Efek hover kartu HANYA memunculkan border (Tanpa pergeseran) */
    .materi-card:hover { 
        border-color: rgba(249, 92, 80, 0.5); 
        box-shadow: 0 8px 25px rgba(249, 92, 80, 0.08); 
    }
    
    .materi-card h3 { 
        display: inline-block;
        background-color: var(--primary);
        color: white; 
        padding: 6px 15px;
        border-radius: 8px;
        font-size: 14px; 
        font-weight: 600; 
        margin-bottom: 15px; 
        text-transform: uppercase; 
        letter-spacing: 0.5px;
    }
    
    .materi-card h4 { font-size: 22px; color: #2c3e50; margin-bottom: 30px; font-weight: 600; }
    .materi-card ul { list-style: none; }
    
    /* Efek hover pada list DIHAPUS agar murni informatif (statis) */
    .materi-card ul li { 
        color: var(--text-light); 
        margin-bottom: 15px; 
        font-size: 15px; 
        display: flex; 
        align-items: center; 
        /* Transisi dan Kursor Pointer Dihapus */
    }
    
    .materi-card ul li::before { 
        content: ''; 
        display: inline-block; 
        width: 6px; 
        height: 6px; 
        background-color: var(--primary); 
        border-radius: 50%; 
        margin-right: 15px; 
    }

    @media (max-width: 1024px) { .page-wrapper { padding: 80px 40px 0 40px; } }
    @media (max-width: 768px) { .navbar { padding: 15px 20px; } .nav-links { display: none; } body { overflow-y: auto; height: auto; } .page-wrapper { padding: 100px 20px 60px 20px; justify-content: flex-start; } .section-header h2 { font-size: 28px; } }
    </style>
</head>
<body>

    <nav class="navbar">
        <div class="logo">⚡ GERAK & GAYA</div>
        <div class="nav-links">
            <a href="{{ url('/') }}">Beranda</a>
            <a href="{{ url('/daftar-materi') }}" class="active">Daftar Materi</a>
            <a href="{{ url('/petunjuk') }}">Petunjuk Penggunaan</a>
            <a href="{{ url('/tentang') }}">Tentang</a>

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
            <h2>Daftar Isi Materi</h2>
        </div>
        
        <div class="materi-grid">
            
            <!-- BAB 1 -->
            <div class="materi-card" data-aos="fade-up" data-aos-delay="100">
                <h3>Bab 1</h3>
                <h4>Gerak Benda</h4>
                <ul>
                    <li>Pengantar Gerak</li>
                    <li>Pengertian Gerak</li>
                    <li>Jarak Tempuh dan Perpindahan</li>
                    <li>Kelajuan dan Kecepatan</li>
                    <li>Percepatan</li>
                    <li>Kuis 1 (Gerak)</li>
                </ul>
            </div>
            
            <!-- BAB 2 -->
            <div class="materi-card" data-aos="fade-up" data-aos-delay="200">
                <h3>Bab 2</h3>
                <h4>Gaya</h4>
                <ul>
                    <li>Pengantar Gaya</li>
                    <li>Pengertian Gaya</li>
                    <li>Macam-macam Gaya</li>
                    <li>Resultan Gaya</li>
                    <li>Hukum Newton</li>
                    <li>Kuis 2 (Gaya)</li>
                </ul>
            </div>
            
            <!-- EVALUASI -->
            <div class="materi-card" data-aos="fade-up" data-aos-delay="300">
                <h3>Evaluasi</h3>
                <h4>Uji Pemahaman</h4>
                <ul>
                    <li>Evaluasi Akhir</li>
                </ul>
            </div>
            
        </div>
    </div>

    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script>
        AOS.init({ once: true, offset: 50 });
        function toggleDropdown() { document.getElementById("dropdownMenu").classList.toggle("show"); }
        window.onclick = function(event) { if (!event.target.matches('.user-greeting')) { var dropdowns = document.getElementsByClassName("dropdown-logout"); for (var i = 0; i < dropdowns.length; i++) { var openDropdown = dropdowns[i]; if (openDropdown.classList.contains('show')) { openDropdown.classList.remove('show'); } } } }
    </script>
</body>
</html>