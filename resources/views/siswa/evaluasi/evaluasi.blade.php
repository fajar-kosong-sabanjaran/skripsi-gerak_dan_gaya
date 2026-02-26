<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <meta name="csrf-token" content="{{ csrf_token() }}">

  <title>Evaluasi Akhir – Gerak dan Gaya</title>
  
  <link rel="stylesheet" href="{{ asset('css/style.css') }}">
  
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">
</head>

<body class="body-evaluasi-fullscreen" id="halaman-evaluasi">

  <div class="evaluasi-container-full">
    
    <aside class="evaluasi-sidebar">
      <div class="evaluasi-sidebar-header">
        <h3>Evaluasi Akhir</h3>
      </div>
      
      <div class="evaluasi-sidebar-content">
        <p class="evaluasi-sidebar-label">Navigasi Soal</p>
        
        <div class="evaluasi-nomor-soal-grid" id="navSoal-evaluasi"></div>

        <div class="evaluasi-legend">
          <div class="evaluasi-legend-item">
            <span class="evaluasi-dot evaluasi-dot-white"></span> Belum dijawab
          </div>
          <div class="evaluasi-legend-item">
            <span class="evaluasi-dot evaluasi-dot-orange"></span> Sedang dikerjakan
          </div>
          <div class="evaluasi-legend-item">
            <span class="evaluasi-dot evaluasi-dot-green"></span> Sudah dijawab
          </div>
        </div>
      </div>
    </aside>

    <main class="evaluasi-main-area">
      
      <header class="evaluasi-top-header">
        <div class="evaluasi-timer-box">
          <i class="fas fa-stopwatch"></i> Sisa Waktu: <span id="timer-evaluasi">45:00</span>
        </div>
        
        <button class="evaluasi-btn-finish" id="finishBtn-evaluasi">
          Selesaikan Evaluasi ✓
        </button>
      </header>

      <section class="evaluasi-question-wrapper">
        <div class="evaluasi-question-box">
          
          <h2 class="evaluasi-question-number" id="questionNumber-evaluasi">Nomor 1</h2>
          
          <div class="evaluasi-question-text" id="questionText-evaluasi">
            Memuat soal...
          </div>

          <ul class="evaluasi-options-list" id="optionsList-evaluasi"></ul>

          <div class="evaluasi-nav-actions">
            <button class="evaluasi-btn-nav prev" id="prevBtn-evaluasi">← Sebelumnya</button>
            <button class="evaluasi-btn-nav next" id="nextBtn-evaluasi">Selanjutnya →</button>
          </div>
        </div>
      </section>

    </main>
  </div>

  <script>
    // URL ini digunakan jika siswa selesai mengerjakan (misal kembali ke beranda)
    window.EXIT_PAGE = "{{ url('/') }}"; 
  </script>

  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  
  <script src="{{ asset('js/script.js') }}"></script>
</body>
</html>