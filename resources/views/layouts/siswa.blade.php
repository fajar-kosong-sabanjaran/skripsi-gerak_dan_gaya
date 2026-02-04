<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GERAK DAN GAYA</title>
  <link rel="stylesheet" href="{{ asset('css/style.css') }}">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
</head>
<body>

<div class="sidebar">
  <h2>GERAK DAN GAYA</h2>

  <div class="menu-item has-toggle" data-target="gerak">
    🏃‍♂ Gerak
  </div>
  <div class="submenu" id="gerak">
    <a href="{{ url('siswa/gerak/pengantargerak') }}" 
       class="{{ request()->is('siswa/gerak/pengantargerak') ? 'active' : '' }}">
       Pengantar
    </a>

    <a href="{{ url('siswa/gerak/pengertiangerak') }}" 
       class="{{ request()->is('siswa/gerak/pengertiangerak') ? 'active' : '' }}">
       Pengertian Gerak
    </a>

    <a href="{{ url('siswa/gerak/jaraktempuhdanperpindahan') }}" 
       class="{{ request()->is('siswa/gerak/jaraktempuhdanperpindahan') ? 'active' : '' }}">
       Jarak Tempuh dan Perpindahan
    </a>

    <a href="{{ url('siswa/gerak/kelajuandankecepatan') }}" 
       class="{{ request()->is('siswa/gerak/kelajuandankecepatan') ? 'active' : '' }}">
       Kelajuan dan Kecepatan
    </a>

    <a href="{{ url('siswa/gerak/percepatan') }}" 
       class="{{ request()->is('siswa/gerak/percepatan') ? 'active' : '' }}">
       Percepatan
    </a>

    <a href="{{ url('siswa/gerak/petunjukpengerjaan') }}"
       class="{{ request()->is('siswa/gerak/petunjukpengerjaan') ? 'active' : '' }}">
       Kuis 1
    </a>
  </div>

  <div class="menu-item has-toggle" data-target="gaya">
    ⚡ Gaya
  </div>
  <div class="submenu" id="gaya">
    
    <a href="{{ url('siswa/gaya/pengantargaya') }}" 
       class="{{ request()->is('siswa/gaya/pengantargaya') ? 'active' : '' }}">
       Pengantar
    </a>

    <a href="{{ url('siswa/gaya/pengertiangaya') }}" 
       class="{{ request()->is('siswa/gaya/pengertiangaya') ? 'active' : '' }}">
       Pengertian Gaya
    </a> 

    <a href="{{ url('siswa/gaya/resultangaya') }}" 
       class="{{ request()->is('siswa/gaya/resultangaya') ? 'active' : '' }}">
       Resultan Gaya
    </a>

    <a href="{{ url('siswa/gaya/macam-macamgaya') }}" 
       class="{{ request()->is('siswa/gaya/macam-macamgaya') ? 'active' : '' }}">
       Macam - Macam Gaya
    </a>

    <a href="{{ url('siswa/gaya/hukumnewton') }}" 
       class="{{ request()->is('siswa/gaya/hukumnewton') ? 'active' : '' }}">
       Hukum Newton
    </a>

    <a href="{{ url('siswa/gaya/petunjukpengerjaan') }}"
       class="{{ request()->is('siswa/gaya/petunjukpengerjaan') ? 'active' : '' }}">
       Kuis 2
    </a>

  </div>
  
  <a href="{{ url('siswa/evaluasi/petunjukpengerjaan') }}" 
     class="menu-item {{ request()->is('siswa/evaluasi*') ? 'active' : '' }}" 
     style="text-decoration: none; color: inherit;">
    🧩 Evaluasi
  </a>
  
</div>

<div class="content-area" role="main">
  <main class="content-wrapper">
    @yield('content')
  </main>
</div>

<script src="{{ asset('js/script.js') }}"></script>

</body>
</html>