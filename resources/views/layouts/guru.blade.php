<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PANEL GURU - GERAK DAN GAYA</title>
  
  <link rel="stylesheet" href="{{ asset('css/styleguru.css') }}">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>

  <div class="sidebar">
    <div class="sidebar-header">
      <div class="guru-icon">
          <i class="fas fa-chalkboard-teacher"></i>
      </div>
      <h2>PANEL GURU</h2>
    </div>

    <a href="{{ url('guru/datasiswa') }}" 
      class="menu-item {{ request()->is('guru/datasiswa*') ? 'active' : '' }}">
      <span><i class="fas fa-users"></i> Data Siswa</span>
    </a>

    <a href="{{ url('guru/datakelas') }}" 
      class="menu-item {{ request()->is('guru/datakelas*') ? 'active' : '' }}">
      <span><i class="fas fa-chalkboard"></i> Data Kelas</span>
    </a>

    <div class="menu-item has-toggle" data-target="nilai">
      <span><i class="fas fa-chart-bar"></i> Rekap Nilai</span>
    </div>
    <div class="submenu" id="nilai">
      <a href="{{ url('guru/nilai/kuis1') }}" class="{{ request()->is('guru/nilai/kuis1') ? 'active' : '' }}">
          Nilai Kuis 1 (Gerak)
      </a>
      <a href="{{ url('guru/nilai/kuis2') }}" class="{{ request()->is('guru/nilai/kuis2') ? 'active' : '' }}">
          Nilai Kuis 2 (Gaya)
      </a>
      <a href="{{ url('guru/nilai/evaluasi') }}" class="{{ request()->is('guru/nilai/evaluasi') ? 'active' : '' }}">
          Nilai Evaluasi Akhir
      </a>
    </div>

    <div class="menu-item has-toggle" data-target="preview">
      <span><i class="fas fa-book-open"></i> Preview Materi</span>
    </div>
    <div class="submenu" id="preview">
      <a href="{{ url('siswa/gerak/pengantargerak') }}" target="_blank">Lihat Materi Gerak</a>
      <a href="{{ url('siswa/gaya/pengantargaya') }}" target="_blank">Lihat Materi Gaya</a>
    </div>
  </div>

  <div class="content-area" role="main">
    
    <nav class="guru-navbar">
        <div class="navbar-left">
            </div>

        <div class="navbar-right">
            <div class="user-dropdown-wrapper">
                
                <div class="profile-menu" id="userMenuTrigger">
                    <div class="profile-icon">
                        <i class="fas fa-user"></i>
                    </div>
                    <span class="profile-name">Guru</span>
                </div>

                <div class="user-dropdown-content" id="userDropdown">
                    
                    <form id="logout-form" action="{{ url('logout') }}" method="POST" class="logout-form-hidden">
                        @csrf
                    </form>

                    <a href="#" onclick="event.preventDefault(); document.getElementById('logout-form').submit();" class="dropdown-item-logout">
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

  <script src="{{ asset('js/scriptguru.js') }}"></script>

</body>
</html>