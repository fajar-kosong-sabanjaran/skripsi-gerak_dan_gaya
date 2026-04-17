<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Kuis 1 – Gerak dan Gaya</title>

    <link rel="stylesheet" href="{{ asset('css/style.css') }}?v={{ filemtime(public_path('css/style.css')) }}">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">
</head>

<body class="body-kuis-fullscreen">

    <div class="kuis-sidebar-overlay" id="kuisSidebarOverlay"></div>

    <div class="kuis-container-full">

        <aside class="kuis-sidebar" id="kuisSidebar">
            <div class="kuis-sidebar-header">
                <h3>Kuis 1: Gerak</h3>
                <span class="kuis-close-sidebar" id="kuisCloseBtn">&times;</span>
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
                <button class="kuis-mobile-nav-btn" id="kuisMobileNavBtn">
                    <i class="fas fa-th-large"></i> Navigasi Soal
                </button>

                <div class="kuis-timer-box">
                    <i class="fas fa-stopwatch"></i> <span class="timer-text-hide">Sisa Waktu:</span> <span
                        id="timer">30:00</span>
                </div>

                <button class="kuis-btn-finish" id="finishBtn">
                    <span class="finish-text-hide">Selesaikan Kuis</span> ✓
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
                        <button class="kuis-btn-nav prev" id="prevBtn">← <span
                                class="nav-text-hide">Sebelumnya</span></button>
                        <button class="kuis-btn-nav next" id="nextBtn"><span class="nav-text-hide">Selanjutnya</span>
                            →</button>
                    </div>
                </div>
            </section>

        </main>
    </div>

    <script>
        window.PENGERTIAN_PAGE = "{{ url('siswa/gerak/pengertiangerak') }}";
        window.GAYA_PAGE = "{{ url('siswa/gaya/pengantargaya') }}";

        // [TAMBAHAN] Menangkap nilai KKM dari database untuk Kuis 1
        window.KKM_KUIS = {{ $kkm }};

        // Logika Toggle Sidebar Kuis di Mobile
        document.addEventListener("DOMContentLoaded", function() {
            const mobileBtn = document.getElementById("kuisMobileNavBtn");
            const closeBtn = document.getElementById("kuisCloseBtn");
            const sidebar = document.getElementById("kuisSidebar");
            const overlay = document.getElementById("kuisSidebarOverlay");

            if (mobileBtn && sidebar && overlay && closeBtn) {
                mobileBtn.addEventListener("click", () => {
                    sidebar.classList.add("active");
                    overlay.classList.add("show");
                });

                closeBtn.addEventListener("click", () => {
                    sidebar.classList.remove("active");
                    overlay.classList.remove("show");
                });

                overlay.addEventListener("click", () => {
                    sidebar.classList.remove("active");
                    overlay.classList.remove("show");
                });
            }
        });
    </script>

    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="{{ asset('js/script.js') }}?v={{ filemtime(public_path('js/script.js')) }}"></script>
</body>

</html>
