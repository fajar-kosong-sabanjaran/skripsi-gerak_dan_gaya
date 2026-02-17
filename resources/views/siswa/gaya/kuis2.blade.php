<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Kuis 2 – Gaya dan Hukum Newton</title>
  
  <link rel="stylesheet" href="{{ asset('css/style.css') }}">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">
</head>

<body class="body-kuis2-fullscreen" id="halaman-kuis-2">

  <div class="kuis2-container-full">
    
    <aside class="kuis2-sidebar">
      <div class="kuis2-sidebar-header">
        <h3>Kuis 2: Gaya</h3>
      </div>
      
      <div class="kuis2-sidebar-content">
        <p class="kuis2-sidebar-label">Navigasi Soal</p>
        <div class="kuis2-nomor-soal-grid" id="navSoal-kuis2"></div>

        <div class="kuis2-legend">
          <div class="kuis2-legend-item">
            <span class="kuis2-dot kuis2-dot-white"></span> Belum dijawab
          </div>
          <div class="kuis2-legend-item">
            <span class="kuis2-dot kuis2-dot-orange"></span> Sedang dikerjakan
          </div>
          <div class="kuis2-legend-item">
            <span class="kuis2-dot kuis2-dot-green"></span> Sudah dijawab
          </div>
        </div>
      </div>
    </aside>

    <main class="kuis2-main-area">
      
      <header class="kuis2-top-header">
        <div class="kuis2-timer-box">
          <i class="fas fa-stopwatch"></i> Sisa Waktu: <span id="timer-kuis2">30:00</span>
        </div>
        <button class="kuis2-btn-finish" id="finishBtn-kuis2">
          Selesaikan Kuis ✓
        </button>
      </header>

      <section class="kuis2-question-wrapper">
        <div class="kuis2-question-box">
          <h2 class="kuis2-question-number" id="questionNumber-kuis2">Nomor 1</h2>
          
          <div class="kuis2-question-text" id="questionText-kuis2">
            Memuat soal...
          </div>

          <ul class="kuis2-options-list" id="optionsList-kuis2"></ul>

          <div class="kuis2-nav-actions">
            <button class="kuis2-btn-nav prev" id="prevBtn-kuis2">← Sebelumnya</button>
            <button class="kuis2-btn-nav next" id="nextBtn-kuis2">Selanjutnya →</button>
          </div>
        </div>
      </section>

    </main>
  </div>

  <script>
    // Konfigurasi Link Redirect
    // Jika GAGAL, kembali ke materi awal Gaya
    window.RETRY_PAGE = "{{ url('siswa/gaya/pengertiangaya') }}"; 
    
    // Jika LULUS, lanjut ke Petunjuk Evaluasi
    window.NEXT_PAGE = "{{ url('siswa/evaluasi/petunjukpengerjaan') }}"; 
  </script>

  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  
  <script src="{{ asset('js/script.js') }}"></script>
</body>
</html>