<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <meta name="csrf-token" content="{{ csrf_token() }}">
    
    <title>GERAK DAN GAYA</title>

    <link rel="stylesheet" href="{{ asset('css/style.css') }}?v={{ filemtime(public_path('css/style.css')) }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mobile-drag-drop@2.3.0-rc.2/default.css">
    <script src="https://cdn.jsdelivr.net/npm/mobile-drag-drop@2.3.0-rc.2/index.min.js"></script>

    <script>
        MobileDragDrop.polyfill({
            dragImageTranslateOverride: MobileDragDrop.scrollBehaviourDragImageTranslateOverride
        });
        
        window.addEventListener( 'touchmove', function() {}, {passive: false});
    </script>
</head>

<body>

    <div class="sidebar-overlay" id="sidebarOverlay"></div>

    <div class="sidebar">
        <h2>GERAK DAN GAYA</h2>

        <div class="menu-item has-toggle" data-target="gerak" id="nav-gerak-header">
            🏃‍♂️ Gerak
        </div>
        <div class="submenu" id="gerak">
            <a href="{{ url('siswa/gerak/pengantargerak') }}" id="nav-pengantar"
                class="{{ request()->is('siswa/gerak/pengantargerak') ? 'active' : '' }}">
                Pengantar
            </a>

            <a href="{{ url('siswa/gerak/pengertiangerak') }}" id="nav-pengertian"
                class="{{ request()->is('siswa/gerak/pengertiangerak') ? 'active' : '' }}">
                Pengertian Gerak
            </a>

            <a href="{{ url('siswa/gerak/jaraktempuhdanperpindahan') }}" id="nav-jarak"
                class="locked {{ request()->is('siswa/gerak/jaraktempuhdanperpindahan') ? 'active' : '' }}">
                Jarak Tempuh dan Perpindahan <i class="fas fa-lock"></i>
            </a>

            <a href="{{ url('siswa/gerak/kelajuandankecepatan') }}" id="nav-kelajuan"
                class="locked {{ request()->is('siswa/gerak/kelajuandankecepatan') ? 'active' : '' }}">
                Kelajuan & Kecepatan <i class="fas fa-lock"></i>
            </a>

            <a href="{{ url('siswa/gerak/percepatan') }}" id="nav-percepatan"
                class="locked {{ request()->is('siswa/gerak/percepatan') ? 'active' : '' }}">
                Percepatan <i class="fas fa-lock"></i>
            </a>

            <a href="{{ url('siswa/gerak/petunjukpengerjaan') }}" id="nav-kuis1"
                class="menu-link locked {{ request()->is('siswa/gerak/petunjukpengerjaan') || request()->is('siswa/gerak/kuis1') ? 'active' : '' }}">
                Kuis 1 <i class="fas fa-lock"></i>
            </a>
        </div>

        <div class="menu-item has-toggle locked" data-target="gaya" id="nav-gaya-header">
            <span>⚡ Gaya</span> <i class="fas fa-lock"></i>
        </div>
        <div class="submenu" id="gaya">
            <a href="{{ url('siswa/gaya/pengantargaya') }}" id="nav-pengantar-gaya"
                class="locked {{ request()->is('siswa/gaya/pengantargaya') ? 'active' : '' }}">
                Pengantar <i class="fas fa-lock"></i>
            </a>

            <a href="{{ url('siswa/gaya/pengertiangaya') }}" id="nav-pengertian-gaya"
                class="locked {{ request()->is('siswa/gaya/pengertiangaya') ? 'active' : '' }}">
                Pengertian Gaya <i class="fas fa-lock"></i>
            </a>

            <a href="{{ url('siswa/gaya/resultangaya') }}" id="nav-resultan-gaya"
                class="locked {{ request()->is('siswa/gaya/resultangaya') ? 'active' : '' }}">
                Resultan Gaya <i class="fas fa-lock"></i>
            </a>

            <a href="{{ url('siswa/gaya/macam-macamgaya') }}" id="nav-macam-gaya"
                class="locked {{ request()->is('siswa/gaya/macam-macamgaya') ? 'active' : '' }}">
                Macam-Macam Gaya <i class="fas fa-lock"></i>
            </a>

            <a href="{{ url('siswa/gaya/hukumnewton') }}" id="nav-newton"
                class="locked {{ request()->is('siswa/gaya/hukumnewton') ? 'active' : '' }}">
                Hukum Newton <i class="fas fa-lock"></i>
            </a>

            <a href="{{ url('siswa/gaya/petunjukpengerjaan') }}" id="nav-kuis2"
                class="locked {{ request()->is('siswa/gaya/petunjukpengerjaan') || request()->is('siswa/gaya/kuis2') ? 'active' : '' }}">
                Kuis 2 <i class="fas fa-lock"></i>
            </a>
        </div>

        <a href="{{ url('siswa/evaluasi/petunjukpengerjaan') }}" id="nav-evaluasi"
            class="menu-item locked {{ request()->is('siswa/evaluasi*') ? 'active' : '' }}"
            style="text-decoration: none; color: inherit;">
            <span>🧩 Evaluasi</span> <i class="fas fa-lock"></i>
        </a>
    </div>

    <div class="content-area">
        <div class="top-bar">
            
            <div class="top-bar-left">
                <button class="mobile-menu-btn" id="mobileMenuBtn">
                    <i class="fas fa-bars"></i>
                </button>
            </div>
            
            <div class="top-bar-right">
                {{-- Menu Navigasi Utama --}}
                <div class="top-nav-links">
                    @if(Auth::check() && Auth::user()->peran === 'guru')
                        <a href="{{ url('/guru/datasiswa') }}">Halaman Guru</a>
                    @endif
                    <a href="{{ url('/') }}">Beranda</a>
                    <a href="{{ url('/daftar-materi') }}">Daftar Materi</a>
                    <a href="{{ url('/petunjuk') }}">Petunjuk Penggunaan</a>
                    <a href="{{ url('/tentang') }}">Tentang</a>
                </div>

                {{-- Bagian User Menu --}}
                <div class="user-menu-container">
                    <div class="user-greeting" onclick="toggleDropdown()">
                        Halo, {{ Auth::user()->nama_lengkap }} 👋
                    </div>

                    <div class="dropdown-logout" id="dropdownMenu">
                        
                        <div class="mobile-dropdown-links">
                            @if(Auth::check() && Auth::user()->peran === 'guru')
                                <a href="{{ url('/guru/datasiswa') }}" class="dropdown-item">Halaman Guru</a>
                            @endif
                            <a href="{{ url('/') }}" class="dropdown-item">Beranda</a>
                            <a href="{{ url('/daftar-materi') }}" class="dropdown-item">Daftar Materi</a>
                            <a href="{{ url('/petunjuk') }}" class="dropdown-item">Petunjuk Penggunaan</a>
                            <a href="{{ url('/tentang') }}" class="dropdown-item">Tentang</a>
                            <div class="dropdown-divider"></div>
                        </div>

                        <form action="{{ route('logout') }}" method="POST">
                            @csrf
                            <button type="submit" class="btn-logout">
                                🚪 Keluar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <main class="content-wrapper">
            @yield('content')
        </main>
    </div>

    <script>
        // Mengambil data progres dari database dan menjadikannya array di JavaScript (untuk siswa)
        // Ditambahkan pengecekan agar tidak error jika relasi progres kosong (biasanya pada Guru)
        window.progresSiswa = @json(Auth::check() && Auth::user()->progres ? Auth::user()->progres->pluck('kode_materi')->toArray() : []);

        // =====================================================================
        // LOGIKA BYPASS KHUSUS GURU
        // =====================================================================
        @if(Auth::check() && Auth::user()->peran === 'guru')
            document.addEventListener("DOMContentLoaded", function() {
                // 1. Hapus semua class 'locked' dari sidebar maupun tombol 'Materi Selanjutnya'
                const lockedElements = document.querySelectorAll('.locked');
                lockedElements.forEach(function(el) {
                    el.classList.remove('locked');
                });
                
                // 2. Hapus semua icon gembok
                const lockIcons = document.querySelectorAll('.fa-lock');
                lockIcons.forEach(function(icon) {
                    icon.remove();
                });
            });
        @endif

        // Logika Hamburger Menu Mobile
        document.addEventListener("DOMContentLoaded", function() {
            const mobileMenuBtn = document.getElementById("mobileMenuBtn");
            const sidebar = document.querySelector(".sidebar");
            const sidebarOverlay = document.getElementById("sidebarOverlay");

            if (mobileMenuBtn && sidebar && sidebarOverlay) {
                mobileMenuBtn.addEventListener("click", () => {
                    sidebar.classList.add("active");
                    sidebarOverlay.classList.add("show");
                });

                sidebarOverlay.addEventListener("click", () => {
                    sidebar.classList.remove("active");
                    sidebarOverlay.classList.remove("show");
                });
            }
        });
    </script>

    <script src="{{ asset('js/script.js') }}?v={{ filemtime(public_path('js/script.js')) }}"></script>

</body>

</html>