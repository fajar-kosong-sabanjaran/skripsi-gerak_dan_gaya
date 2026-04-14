<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HALAMAN GURU - GERAK DAN GAYA</title>

    <link rel="stylesheet" href="{{ asset('css/styleguru.css') }}?v={{ filemtime(public_path('css/styleguru.css')) }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>

<body>

    <div class="sidebar-overlay" id="sidebarOverlay"></div>

    <div class="sidebar">
        <div class="sidebar-header">
            <div class="guru-icon">
                <i class="fas fa-chalkboard-teacher"></i>
            </div>
            <h2>HALAMAN GURU</h2>
        </div>

        <a href="{{ url('guru/datasiswa') }}" class="menu-item {{ request()->is('guru/datasiswa*') ? 'active' : '' }}">
            <span><i class="fas fa-users"></i> Data Siswa</span>
        </a>

        <a href="{{ url('guru/datakelas') }}" class="menu-item {{ request()->is('guru/datakelas*') ? 'active' : '' }}">
            <span><i class="fas fa-chalkboard"></i> Data Kelas</span>
        </a>

        <a href="{{ url('guru/progresbelajar') }}"
            class="menu-item {{ request()->is('guru/progresbelajar*') ? 'active' : '' }}">
            <span><i class="fas fa-tasks"></i> Progres Belajar</span>
        </a>

        <a href="{{ url('guru/datanilai') }}" class="menu-item {{ request()->is('guru/datanilai*') ? 'active' : '' }}">
            <span><i class="fas fa-star"></i> Data Nilai</span>
        </a>

        <a href="{{ url('guru/pengaturan-kkm') }}"
            class="menu-item {{ request()->is('guru/pengaturan-kkm*') ? 'active' : '' }}">
            <span><i class="fas fa-cog"></i> Pengaturan KKM</span>
        </a>
    </div>

    <div class="content-area" role="main">

        <nav class="guru-navbar">
            <div class="navbar-left">
                <button class="mobile-menu-btn" id="mobileMenuBtn">
                    <i class="fas fa-bars"></i>
                </button>
            </div>

            <div class="navbar-right">
                <div class="top-nav-links">
                    <a href="{{ url('/') }}">Beranda</a>
                    <a href="{{ url('/daftar-materi') }}">Daftar Materi</a>
                    <a href="{{ url('/petunjuk') }}">Petunjuk Penggunaan</a>
                    <a href="{{ url('/tentang') }}">Tentang</a>
                </div>

                <div class="user-dropdown-wrapper">

                    <div class="profile-menu" id="userMenuTrigger">
                        Halo, {{ Auth::user()->nama_lengkap ?? 'Guru' }} 👋
                    </div>

                    <div class="user-dropdown-content" id="userDropdown">

                        <div class="mobile-dropdown-links">
                            <a href="{{ url('/') }}" class="dropdown-item">
                                Beranda
                            </a>
                            <a href="{{ url('/daftar-materi') }}" class="dropdown-item">
                                Daftar Materi
                            </a>
                            <a href="{{ url('/petunjuk') }}" class="dropdown-item">
                                Petunjuk Penggunaan
                            </a>
                            <a href="{{ url('/tentang') }}" class="dropdown-item">
                                Tentang
                            </a>
                            <div class="dropdown-divider"></div>
                        </div>

                        <form id="logout-form" action="{{ url('logout') }}" method="POST" class="logout-form-hidden">
                            @csrf
                        </form>

                        <a href="#"
                            onclick="event.preventDefault(); document.getElementById('logout-form').submit();"
                            class="dropdown-item-logout">
                            <i class="fas fa-sign-out-alt"></i> Keluar
                        </a>

                    </div>

                </div>
            </div>
        </nav>

        <main class="content-wrapper">
            @yield('content')
        </main>
    </div>

    <script src="{{ asset('js/scriptguru.js') }}?v={{ filemtime(public_path('js/scriptguru.js')) }}"></script>

</body>

</html>