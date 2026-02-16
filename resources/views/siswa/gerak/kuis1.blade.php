<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Kuis 1 – Gerak dan Gaya</title>
  
  <link rel="stylesheet" href="{{ asset('css/style.css') }}">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">
</head>
<body class="body-kuis-fullscreen">

  <div class="kuis-container-full">
    
    <aside class="kuis-sidebar">
      <div class="kuis-sidebar-header">
        <h3>Kuis 1: Gerak</h3>
      </div>
      
      <div class="kuis-sidebar-content">
        <p class="kuis-sidebar-label">Navigasi Soal</p>
        <div class="kuis-nomor-soal-grid" id="navSoal">
          </div>

        <div class="kuis-legend">
          <div class="kuis-legend-item">
            <span class="kuis-dot kuis-dot-white"></span> Belum dijawab
          </div>
          <div class="kuis-legend-item">
            <span class="kuis-dot kuis-dot-orange"></span> Sedang dikerjakan
          </div>
          <div class="kuis-legend-item">
            <span class="kuis-dot kuis-dot-green"></span> Sudah dijawab
          </div>
        </div>
      </div>
    </aside>

    <main class="kuis-main-area">
      
      <header class="kuis-top-header">
        <div class="kuis-timer-box">
          <i class="fas fa-stopwatch"></i> Sisa Waktu: <span id="timer">30:00</span>
        </div>
        <button class="kuis-btn-finish" id="finishBtn">
          Selesaikan Kuis ✓
        </button>
      </header>

      <section class="kuis-question-wrapper">
        <div class="kuis-question-box">
          <h2 class="kuis-question-number" id="questionNumber">Nomor 1</h2>
          
          <div class="kuis-question-text" id="questionText">
            Memuat soal...
          </div>

          <ul class="kuis-options-list" id="optionsList"></ul>

          <div class="kuis-nav-actions">
            <button class="kuis-btn-nav prev" id="prevBtn">← Sebelumnya</button>
            <button class="kuis-btn-nav next" id="nextBtn">Selanjutnya →</button>
          </div>
        </div>
      </section>

    </main>
  </div>

  <script>
    // [REVISI] Link disamakan dengan file petunjuk (pengertiangerak)
    window.PENGERTIAN_PAGE = "{{ url('siswa/gerak/pengertiangerak') }}"; 
    window.GAYA_PAGE = "{{ url('siswa/gaya/pengantargaya') }}"; 
  </script>

  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

  <script src="{{ asset('js/script.js') }}"></script>
</body>
</html>