/* INI MERUPAKAN FILE PENGANTAR GERAK dan SISWA BLADE (LOGIKA GLOBAL) */
document.addEventListener("DOMContentLoaded", () => {

    /* FUNGSI CEK MEMORI UNTUK MEMBUKA GEMBOK */
    function checkAllLocks() {
        /* 1. Cek Kelulusan Materi Pengertian Gerak */
        if (localStorage.getItem('pengertiangerak_completed') === 'true') {
            /* Buka Link di Sidebar */
            const navJarak = document.getElementById('nav-jarak');
            if (navJarak) {
                navJarak.classList.remove('locked');
                const lockIcon = navJarak.querySelector('.fa-lock');
                if (lockIcon) lockIcon.remove();
            }

            /* Buka Tombol Next di dalam halaman Pengertian Gerak */
            const btnNext = document.getElementById("btn-next-materi");
            if (btnNext) {
                btnNext.classList.remove('locked');
            }
        }

        /* Di masa depan, Anda bisa menambah logika untuk materi lain di sini */
        /* Contoh: if (localStorage.getItem('jarak_completed') === 'true') { ... } */
    }

    /* Jalankan pengecekan gembok saat halaman pertama kali dimuat */
    checkAllLocks();

    /* SIDEBAR TOGGLE */
    const toggleItems = document.querySelectorAll(".menu-item.has-toggle");
    toggleItems.forEach(item => {
        item.addEventListener("click", () => {
            /* Jangan buka submenu jika header menu-item tersebut masih terkunci */
            if (item.classList.contains('locked')) return;

            const targetId = item.dataset.target;
            const submenu = document.getElementById(targetId);
            if (!submenu) return;

            const isOpen = submenu.classList.contains("open");
            document.querySelectorAll(".submenu.open").forEach(s => s.classList.remove("open"));
            document.querySelectorAll(".menu-item.has-toggle.active").forEach(h => h.classList.remove("active"));

            if (!isOpen) {
                submenu.classList.add("open");
                item.classList.add("active");
            }
        });
    });

    /* AUTO OPEN SIDEBAR BERDASARKAN URL */
    const path = window.location.pathname;
    if (path.includes("/siswa/gerak")) {
        const submenu = document.getElementById("gerak");
        const header = document.querySelector('.menu-item.has-toggle[data-target="gerak"]');
        if (submenu) submenu.classList.add("open");
        if (header) header.classList.add("active");
    }
    if (path.includes("/siswa/gaya")) {
        const submenu = document.getElementById("gaya");
        const header = document.querySelector('.menu-item.has-toggle[data-target="gaya"]');
        if (submenu) submenu.classList.add("open");
        if (header) header.classList.add("active");
    }

    /* LOCKED MENU ALERT (SWEETALERT GLOBAL) */
    const body = document.querySelector('body');
    body.addEventListener('click', function(e) {
        const lockedItem = e.target.closest('.locked');
        if (lockedItem) {
            e.preventDefault();
            Swal.fire({
                icon: 'warning',
                title: 'Akses Terkunci',
                text: 'Jawab semua soal dengan benar untuk membuka materi selanjutnya!',
                confirmButtonText: 'Oke, Siap!',
                confirmButtonColor: '#f95c50'
            });
        }
    });

    /* USER DROPDOWN */
    window.toggleDropdown = function() {
        var dropdown = document.getElementById("dropdownMenu");
        if (dropdown) dropdown.classList.toggle("show");
    };

    window.onclick = function(event) {
        if (!event.target.matches('.user-greeting')) {
            var dropdowns = document.getElementsByClassName("dropdown-logout");
            for (var i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) openDropdown.classList.remove('show');
            }
        }
    };

    /* LOGIKA SPESIFIK: HALAMAN PENGERTIAN GERAK (DRAG & DROP) */
    const cards = document.querySelectorAll(".card-item");
    if (cards.length > 0) {
        const zones = document.querySelectorAll(".drop-zone, #card-pool");
        const cardPool = document.getElementById("card-pool");
        const btnCheck = document.getElementById("btn-check");
        const btnRetry = document.getElementById("btn-retry-pengertiangerak");

        let draggedId = null;
        const STORAGE_KEY = 'pengertiangerak_completed';

        /* EVENT DRAG & DROP */
        cards.forEach(card => {
            card.addEventListener("dragstart", function (e) {
                draggedId = this.id;
                e.dataTransfer.setData("text/plain", this.id);
                setTimeout(() => this.style.opacity = '0.5', 0);
            });
            card.addEventListener("dragend", function () {
                this.style.opacity = '1';
                draggedId = null;
            });
        });

        zones.forEach(zone => {
            zone.addEventListener("dragover", function (e) {
                e.preventDefault();
                this.classList.add("over");
            });
            zone.addEventListener("dragleave", function () {
                this.classList.remove("over");
            });
            zone.addEventListener("drop", function (e) {
                e.preventDefault();
                this.classList.remove("over");
                const id = e.dataTransfer.getData("text/plain") || draggedId;
                const card = document.getElementById(id);
                if (card) {
                    this.appendChild(card);
                    card.classList.remove("correct", "incorrect");
                }
            });
        });

        /* LOGIKA TOMBOL CEK JAWABAN */
        if(btnCheck) {
            btnCheck.addEventListener("click", function () {
                let benar = 0;
                const total = cards.length;

                cards.forEach(card => {
                    const kunci = card.dataset.answer;
                    const parentType = card.parentElement.dataset.type;

                    if (parentType === kunci) {
                        benar++;
                        card.classList.add("correct");
                        card.classList.remove("incorrect");
                    } else if (parentType !== "pool") {
                        card.classList.add("incorrect");
                        card.classList.remove("correct");
                    }
                });

                if (benar === total) {
                    /* Simpan status ke memori browser */
                    localStorage.setItem(STORAGE_KEY, 'true');

                    Swal.fire({
                        title: 'Luar Biasa!',
                        text: 'Semua jawaban benar. Materi selanjutnya telah terbuka!',
                        icon: 'success',
                        confirmButtonText: 'Lanjut',
                        confirmButtonColor: '#2ecc71'
                    }).then(() => {
                        /* Jalankan fungsi buka gembok secara instan tanpa reload */
                        checkAllLocks();
                    });

                    if(btnRetry) btnRetry.classList.add("hidden");
                } else {
                    Swal.fire({
                        title: 'Masih Ada yang Kurang Tepat',
                        text: `Kamu baru benar ${benar} dari ${total}.`,
                        icon: 'error',
                        confirmButtonText: 'Oke, Saya Perbaiki',
                        confirmButtonColor: '#f95c50'
                    });
                    if(btnRetry) btnRetry.classList.remove("hidden");
                }
            });
        }

        /* LOGIKA TOMBOL COBA LAGI */
        if(btnRetry) {
            btnRetry.addEventListener("click", function() {
                cards.forEach(card => {
                    cardPool.appendChild(card);
                    card.classList.remove("correct", "incorrect");
                });
                this.classList.add("hidden");
            });
        }
    }
});



// INI MERUPAKAN FILE JARAK TEMPUH DAN PERPINDAHAN
document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     0. FUNGSI CEK MEMORI UNTUK MEMBUKA GEMBOK
     ========================================= */
  function checkAllLocks() {
      // Deteksi URL saat ini agar tombol Next yang dibuka tidak salah alamat
      const path = window.location.pathname;

      // 1. Cek Kelulusan Materi Pengertian Gerak (Untuk referensi global jika digabung)
      if (localStorage.getItem('pengertiangerak_completed') === 'true') {
          const navJarak = document.getElementById('nav-jarak');
          if (navJarak) {
              navJarak.classList.remove('locked');
              const lockIcon = navJarak.querySelector('.fa-lock');
              if (lockIcon) lockIcon.remove();
          }
          // Buka Tombol Next HANYA jika sedang di halaman Pengertian Gerak
          if (path.includes('pengertiangerak')) {
              const btnNextMateri = document.getElementById("btn-next-materi");
              if (btnNextMateri) btnNextMateri.classList.remove('locked');
          }
      }

      // 2. Cek Kelulusan Materi Jarak Tempuh dan Perpindahan
      if (localStorage.getItem('jarak_completed') === 'true') {
          // Buka menu sidebar Kelajuan & Kecepatan
          const navKelajuan = document.getElementById('nav-kelajuan');
          if (navKelajuan) {
              navKelajuan.classList.remove('locked');
              const lockIcon = navKelajuan.querySelector('.fa-lock');
              if (lockIcon) lockIcon.remove();
          }

          // Buka tombol materi selanjutnya di bagian bawah halaman
          // Buka Tombol Next HANYA jika sedang di halaman Jarak Tempuh
          if (path.includes('jaraktempuhdanperpindahan')) {
              const btnNextMateri = document.getElementById("btn-next-materi");
              if (btnNextMateri) {
                  btnNextMateri.classList.remove('locked');
              }
          }
      }

      // 3. Cek Kelulusan Materi Kelajuan dan Kecepatan (Persiapan)
      if (localStorage.getItem('kelajuan_completed') === 'true') {
          const navPercepatan = document.getElementById('nav-percepatan');
          if (navPercepatan) {
              navPercepatan.classList.remove('locked');
              const lockIcon = navPercepatan.querySelector('.fa-lock');
              if (lockIcon) lockIcon.remove();
          }
          // Buka Tombol Next HANYA jika sedang di halaman Kelajuan
          if (path.includes('kelajuandankecepatan')) {
              const btnNextMateri = document.getElementById("btn-next-materi");
              if (btnNextMateri) btnNextMateri.classList.remove('locked');
          }
      }

      // 4. Cek Kelulusan Materi Percepatan (Persiapan)
      if (localStorage.getItem('percepatan_completed') === 'true') {
          const navKuis1 = document.getElementById('nav-kuis1');
          if (navKuis1) {
              navKuis1.classList.remove('locked');
              const lockIcon = navKuis1.querySelector('.fa-lock');
              if (lockIcon) lockIcon.remove();
          }
          // Buka Tombol Next HANYA jika sedang di halaman Percepatan
          if (path.includes('percepatan')) {
              const btnNextMateri = document.getElementById("btn-next-materi");
              if (btnNextMateri) btnNextMateri.classList.remove('locked');
          }
      }
  }

  // Jalankan pengecekan saat halaman pertama kali dimuat
  checkAllLocks();


  /* =========================================
     1. LOGIKA ANIMASI GERAK MOBIL
     ========================================= */
  const posA = 0;
  const posB = 4;   // A → B = 4 km
  const posC = 10;  // B → C = 6 km → total A → C = 10 km

  // Jalur perjalanan: A → B → C → B
  const segments = [
    { from: posA, to: posB, distance: 4, label: "A → B" },
    { from: posB, to: posC, distance: 6, label: "B → C" },
    { from: posC, to: posB, distance: 6, label: "C → B" }
  ];

  const car = document.getElementById("car");
  const btnStart = document.getElementById("btn-start");
  const btnReset = document.getElementById("btn-reset");
  
  const closeModal = document.getElementById("close-modal"); // Tombol tutup modal hasil animasi
  const resultModal = document.getElementById("result-modal"); // Modal hasil animasi
  
  const road = document.querySelector(".anim-road");
  const roadLeft = 40;  // sesuai CSS .anim-road { left: 40px; }
  const startPos = posA;

  // Cek keberadaan elemen agar tidak error
  if(car && road) {
      const roadWidth = () => road.clientWidth;

      let totalDistance = 0;   // jarak tempuh
      let currentSegmentIndex = 0;
      let currentSegmentStartTime = null;
      let running = false;

      // kecepatan animasi: km per detik
      const speedKmPerSec = 2.0;

      // konversi posisi (km) ke piksel di layar
      function kmToPx(km) {
        const roadPixelWidth = roadWidth();
        const totalKmSpan = posC - posA; // 10 km
        const usableWidth = roadPixelWidth - car.clientWidth;
        const ratio = usableWidth / totalKmSpan;
        return roadLeft + km * ratio;
      }

      // set posisi mobil
      function setCarPosition(kmPos) {
        car.style.left = kmToPx(kmPos) + "px";
      }

      // reset ke awal
      function resetAnimation() {
        totalDistance = 0;
        currentSegmentIndex = 0;
        currentSegmentStartTime = null;
        running = false;
        setCarPosition(startPos);
        if(btnStart) btnStart.disabled = false;
      }

      // loop animasi
      function step(timestamp) {
        if (!running) return;

        const seg = segments[currentSegmentIndex];
        if (!currentSegmentStartTime) {
          currentSegmentStartTime = timestamp;
        }

        const elapsed = (timestamp - currentSegmentStartTime) / 1000; // detik
        const duration = seg.distance / speedKmPerSec;
        let t = elapsed / duration;

        if (t >= 1) t = 1;

        // posisi sekarang (km)
        const kmPos = seg.from + (seg.to - seg.from) * t;
        setCarPosition(kmPos);

        // update jarak & perpindahan
        const distanceBeforeSeg = segments
          .slice(0, currentSegmentIndex)
          .reduce((acc, s) => acc + s.distance, 0);
        const travelledInSeg = seg.distance * t;
        totalDistance = distanceBeforeSeg + travelledInSeg;

        if (t < 1) {
          requestAnimationFrame(step);
        } else {
          // segmen selesai
          currentSegmentIndex++;
          currentSegmentStartTime = null;

          if (currentSegmentIndex < segments.length) {
            requestAnimationFrame(step);
          } else {
            // selesai semua segmen
            running = false;
            btnStart.disabled = false;

            // Hitung hasil akhir untuk ditampilkan
            const totalDistanceAll = segments.reduce((a, s) => a + s.distance, 0);
            const finalDisplacement = Math.abs(segments[segments.length - 1].to - startPos);

            // Simpan ke window agar bisa diakses fungsi kuis
            window.finalSummary = {
              jarak: totalDistanceAll,
              perpindahan: finalDisplacement
            };

            // Munculkan kuis setelah jeda sedikit
            setTimeout(() => {
              if(typeof showQuiz === 'function') {
                  showQuiz();
              }
            }, 500);
          }
        }
      }

      // Event Listeners Animasi
      if(btnStart) {
          btnStart.addEventListener("click", () => {
            if (running) return;
            running = true;
            btnStart.disabled = true;
            requestAnimationFrame(step);
          });
      }

      if(btnReset) {
          btnReset.addEventListener("click", () => {
            resetAnimation();
          });
      }

      if(closeModal && resultModal) {
          closeModal.addEventListener("click", () => {
            resultModal.style.display = "none";
          });
      }
      
      // Handle resize layar (responsif)
      window.addEventListener("resize", () => {
        setCarPosition(startPos);
      });

      // Inisialisasi awal
      resetAnimation();
  }


  /* =========================================
     2. LOGIKA KUIS REFLEKSI (POP-UP)
     ========================================= */
  const quizModal = document.getElementById("quiz-modal");
  const quizQuestion = document.getElementById("quiz-question");
  const quizInput = document.getElementById("quiz-input");
  const quizFeedback = document.getElementById("quiz-feedback");
  const quizSubmit = document.getElementById("quiz-submit");
  const quizNext = document.getElementById("quiz-next");
  const modalText = document.getElementById("modal-text"); // Text di modal hasil akhir

  // Data Soal Kuis
  const quizData = [
    {
      q: "Di mana titik awal mobil bergerak? (A, B, atau C)",
      answer: "A",
      explain: `
        <div class="explain-box">
          <div class="explain-title">Konsep titik awal</div>
          <p>Titik awal adalah posisi pertama suatu benda sebelum bergerak.</p>
          <p>Pada animasi, mobil mulai bergerak dari titik A (Rumah), sehingga titik awal mobil adalah A.</p>
        </div>`
    },
    {
      q: "Di mana titik akhir mobil bergerak? (A, B, atau C)",
      answer: "B",
      explain: `
        <div class="explain-box">
          <div class="explain-title">Konsep titik akhir</div>
          <p>Titik akhir adalah posisi terakhir benda setelah seluruh gerakan selesai.</p>
          <p>Walaupun mobil sempat bergerak ke titik C, animasi berakhir ketika mobil berhenti di titik B (Toko). Oleh karena itu, titik akhir mobil adalah B.</p>
        </div>`
    },
    {
      q: "Berapa kilometer jarak tempuh total mobil selama animasi berlangsung?",
      answer: "16",
      explain: `
        <div class="explain-box">
          <div class="explain-title">Konsep jarak tempuh</div>
          <p>Jarak adalah panjang lintasan yang dilalui suatu benda tanpa memedulikan arah geraknya.</p>
          <p>Pada animasi, mobil bergerak A ke B (4km), B ke C (6km), C ke B (6km). Total: 4 + 6 + 6 = 16 km.</p>
        </div>`
    },
    {
      q: "Berapa kilometer perpindahan mobil dari titik awal hingga titik akhir?",
      answer: "4",
      explain: `
        <div class="explain-box">
          <div class="explain-title">Konsep perpindahan</div>
          <p>Perpindahan adalah jarak lurus antara posisi awal dan posisi akhir benda.</p>
          <p>Awal di A, Akhir di B. Jarak A ke B adalah 4 km.</p>
        </div>`
    }
  ];

  let quizIndex = 0;

  // Fungsi Global agar bisa dipanggil dari animasi
  window.showQuiz = function() {
    if(!quizModal) return;
    quizInput.value = "";
    quizFeedback.textContent = "";
    quizSubmit.style.display = "inline-block";
    quizNext.style.display = "none";
    quizQuestion.textContent = quizData[quizIndex].q;
    quizModal.style.display = "flex";
  }

  if(quizSubmit) {
      quizSubmit.addEventListener("click", () => {
        const userAnswer = quizInput.value.trim().toUpperCase();
        const correctAnswer = quizData[quizIndex].answer;

        if (userAnswer === correctAnswer) {
          quizFeedback.innerHTML = "🎉 Yeay, benar!";
          quizFeedback.style.color = "green";
        } else {
          quizFeedback.innerHTML = "❌ Salah.<br>" + quizData[quizIndex].explain;
          quizFeedback.style.color = "red";
        }

        quizSubmit.style.display = "none";
        quizNext.style.display = "inline-block";
      });
  }

  if(quizNext) {
      quizNext.addEventListener("click", () => {
        quizIndex++;
        if (quizIndex < quizData.length) {
          window.showQuiz();
        } else {
          quizModal.style.display = "none";
          quizIndex = 0;

          // Tampilkan ringkasan akhir
          if(modalText && window.finalSummary) {
              modalText.innerHTML =
                "Jarak tempuh total: " + window.finalSummary.jarak + " km<br>" +
                "Perpindahan dari titik awal: " + window.finalSummary.perpindahan + " km";
              
              if(resultModal) resultModal.style.display = "flex";
          }
        }
      });
  }


  /* =========================================
     3. LOGIKA LATIHAN SOAL (ADI DI SIRKUIT)
     ========================================= */
  
  // Buat modal latihan secara dinamis jika belum ada (antisipasi)
  if (!document.getElementById("latihan-modal")) {
    const modalEl = document.createElement("div");
    modalEl.id = "latihan-modal";
    modalEl.innerHTML = `
      <div class="latihan-modal-konten" role="dialog" aria-modal="true" aria-labelledby="latihan-modal-judul">
        <div class="latihan-modal-judul" id="latihan-modal-judul">Hasil Latihan</div>
        <div class="latihan-modal-ringkasan" id="latihan-modal-ringkasan"></div>
        <ul class="latihan-modal-detail" id="latihan-modal-detail"></ul>
        <div class="latihan-modal-tombol">
          <button class="latihan-modal-ulang" id="latihan-modal-ulang">Coba Lagi</button>
          <button class="latihan-modal-tutup" id="latihan-modal-tutup">Tutup</button>
        </div>
      </div>`;
    document.body.appendChild(modalEl);
  }

  const modalLatihan = document.getElementById("latihan-modal");
  const modalRingkasan = document.getElementById("latihan-modal-ringkasan");
  const modalDetail = document.getElementById("latihan-modal-detail");
  const modalTutup = document.getElementById("latihan-modal-tutup");
  const modalUlang = document.getElementById("latihan-modal-ulang");

  const btnCekAdi = document.getElementById("cek-adi");
  const btnResetAdi = document.getElementById("reset-adi");

  const inputs = {
    soal1: document.getElementById("soal1"),
    soal2: document.getElementById("soal2"),
    soal3: document.getElementById("soal3"),
    soal4: document.getElementById("soal4"),
    soal5: document.getElementById("soal5")
  };

  // Helper Functions
  function extractNumber(value) {
    if (!value) return null;
    const m = value.toString().match(/-?\d+(\.\d+)?/);
    return m ? parseFloat(m[0]) : null;
  }

  function resetFieldStyle(el) {
    if(el) {
        el.style.borderColor = "";
        el.style.backgroundColor = "";
    }
  }
  function markCorrect(el) {
    if(el) {
        el.style.borderColor = "#16a34a";
        el.style.backgroundColor = "#ecfdf5";
    }
  }
  function markWrong(el) {
    if(el) {
        el.style.borderColor = "#dc2626";
        el.style.backgroundColor = "#fff1f2";
    }
  }

  function resetAllAdi() {
    Object.values(inputs).forEach(i => {
      if(i) {
          i.value = "";
          resetFieldStyle(i);
      }
    });
    if (modalLatihan) {
      modalLatihan.style.display = "none";
      modalDetail.innerHTML = "";
      modalRingkasan.textContent = "";
    }
  }

  // Logic Tombol Cek
  // =========================================
  // LOGIKA TOMBOL CEK & MODAL
  // =========================================
  if (btnCekAdi) {
      btnCekAdi.addEventListener("click", () => {
        let benarCount = 0;
        let salahCount = 0;
        let belumCount = 0;

        // Fungsi Helper untuk memvalidasi satu input
        const validateInput = (inputEl, kunci, isAngka) => {
            resetFieldStyle(inputEl);
            const val = inputEl.value.trim();

            if (val === "") {
                belumCount++;
                return;
            }

            let isCorrect = false;
            if (isAngka) {
                const numVal = extractNumber(val);
                isCorrect = (numVal === kunci);
            } else {
                isCorrect = (val.toUpperCase() === kunci);
            }

            if (isCorrect) {
                benarCount++;
                markCorrect(inputEl);
            } else {
                salahCount++;
                markWrong(inputEl);
            }
        };

        // --- 1. Validasi Setiap Soal ---
        validateInput(inputs.soal1, "A", false);   
        validateInput(inputs.soal2, "A", false);   
        validateInput(inputs.soal3, 110, true);    
        validateInput(inputs.soal4, 550, true);    
        validateInput(inputs.soal5, 0, true);      

        // --- 2. CEK APAKAH SEMUA BENAR ---
        if (benarCount === 5) {
            
            // Simpan status ke memori browser
            localStorage.setItem('jarak_completed', 'true');
            
            // Jalankan pengecekan gembok untuk langsung membuka menu sidebar dan tombol next
            checkAllLocks();

            // Sembunyikan modal biasa jika kebetulan terbuka
            if(modalLatihan) modalLatihan.style.display = "none";

            // Munculkan SweetAlert
            Swal.fire({
                title: 'Luar Biasa!',
                text: 'Semua jawaban benar. Materi selanjutnya telah terbuka!',
                icon: 'success',
                confirmButtonText: 'Lanjut',
                confirmButtonColor: '#2ecc71'
            });

        } else {
            
            // Jika belum benar semua, munculkan Pop-up Hasil Latihan
            
            // Sembunyikan list detail lama
            modalDetail.innerHTML = ""; 
            modalDetail.style.display = "none"; 

            // Masukkan HTML dengan Class CSS (Styling ada di file CSS)
            modalRingkasan.innerHTML = `
                <div class="hasil-skor-container">
                    <span class="txt-sukses">✔ Benar : ${benarCount}</span>
                    <span class="txt-sep">|</span>
                    <span class="txt-gagal">✖ Salah : ${salahCount}</span>
                    <span class="txt-sep">|</span>
                    <span class="txt-belum">⏳ Belum diisi : ${belumCount}</span>
                </div>
            `;

            // Tampilkan Modal
            modalLatihan.style.display = "flex";
            if (modalTutup) modalTutup.focus();
        }
      });
  }

  // --- Logic Tombol Reset & Controls ---
  if (btnResetAdi) btnResetAdi.addEventListener("click", resetAllAdi);
  
  if (modalTutup) modalTutup.addEventListener("click", () => modalLatihan.style.display = "none");
  
  if (modalUlang) modalUlang.addEventListener("click", () => {
      resetAllAdi();
      if (btnCekAdi) btnCekAdi.focus();
  });

  // Klik di luar modal untuk menutup
  if (modalLatihan) {
      modalLatihan.addEventListener("click", (e) => {
        if (e.target === modalLatihan) modalLatihan.style.display = "none";
      });
  }

  /* =========================================
     4. LOGIKA UNDUH PDF
     ========================================= */
  
  const btnUnduhAdi = document.getElementById("unduh-adi");

  // Helper: Mengompres Gambar
  const getCompressedImage = (el) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.setAttribute('crossOrigin', 'anonymous');
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxWidth = 800; 
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.7));
      };
      img.onerror = (err) => reject(err);
      img.src = el.src; 
    });
  };

  // Helper: Ekstrak Angka
  const extractNum = (val) => {
    if (!val) return null;
    const m = val.toString().match(/-?\d+(\.\d+)?/);
    return m ? parseFloat(m[0]) : null;
  };

  if (btnUnduhAdi) {
    btnUnduhAdi.addEventListener("click", async () => {
      const { jsPDF } = window.jspdf;
      if (!jsPDF) { alert("Library PDF error."); return; }

      const originalText = btnUnduhAdi.innerHTML;
      btnUnduhAdi.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Menilai & Membuat PDF...`;
      btnUnduhAdi.disabled = true;

      try {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 20;
        let yPos = 0;

        // --- 1. HEADER (Orange) ---
        doc.setFillColor(249, 92, 80);
        doc.rect(0, 0, pageWidth, 40, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(22);
        doc.text("Laporan Hasil Latihan", pageWidth / 2, 20, { align: "center" });
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text("Materi: Jarak Tempuh dan Perpindahan", pageWidth / 2, 28, { align: "center" });
        
        yPos = 55;

        // --- 2. INFO IDENTITAS (REVISI: KECIL & MIRING) ---
        doc.setTextColor(80, 80, 80); // Abu agak tua
        doc.setFontSize(9);           // Ukuran lebih kecil
        doc.setFont("helvetica", "italic"); // Gaya Miring
        
        const tgl = new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        doc.text(`Tanggal Pengerjaan: ${tgl}`, margin, yPos);
        yPos += 10;

        // --- 3. CERITA SOAL (REVISI: UKURAN LEBIH BESAR) ---
        doc.setFont("helvetica", "normal"); // Kembalikan ke normal (tidak miring)
        doc.setFontSize(12);                // Ukuran font diperbesar (Standar baca nyaman)
        doc.setTextColor(0, 0, 0);          // Hitam pekat
        
        const cerita = "Adi sedang mempersiapkan diri untuk mengikuti lomba balap mobil di sirkuit. Satu putaran lintasan memiliki panjang 110 meter. Jika Adi mengendarai mobilnya sebanyak 5 putaran, maka berapakah total jarak yang ditempuh dan berapa besar perpindahannya?";
        
        // Memecah teks agar rapi (Word Wrap)
        const splitCerita = doc.splitTextToSize(cerita, pageWidth - (margin * 2));
        doc.text(splitCerita, margin, yPos);
        
        // Update yPos berdasarkan tinggi teks cerita
        yPos += (splitCerita.length * 6) + 5; 

        // --- 4. GAMBAR (Di Bawah Cerita) ---
        const imgElement = document.querySelector('.gambar-latihan');
        if (imgElement) {
          try {
            const imgData = await getCompressedImage(imgElement);
            const imgProps = doc.getImageProperties(imgData);
            const imgWidth = 100; 
            const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
            const xImg = (pageWidth - imgWidth) / 2;
            
            // Cek sisa halaman
            if (yPos + imgHeight > pageHeight - 20) { doc.addPage(); yPos = 20; }
            
            doc.addImage(imgData, 'JPEG', xImg, yPos, imgWidth, imgHeight);
            yPos += imgHeight + 10;
          } catch (e) { console.log(e); }
        }

        // --- 5. VALIDASI & LIST JAWABAN ---
        const rawAnswers = [
          { q: "1. Di mana posisi awal Adi saat mulai mengemudi?", el: document.getElementById("soal1"), key: "A", isNum: false, unit: "" },
          { q: "2. Di titik mana Adi mengakhiri putarannya?", el: document.getElementById("soal2"), key: "A", isNum: false, unit: "" },
          { q: "3. Panjang lintasan satu putaran?", el: document.getElementById("soal3"), key: 110, isNum: true, unit: "meter" },
          { q: "4. Total jarak tempuh (5 putaran)?", el: document.getElementById("soal4"), key: 550, isNum: true, unit: "meter" },
          { q: "5. Besar perpindahan Adi?", el: document.getElementById("soal5"), key: 0, isNum: true, unit: "meter" }
        ];

        let countBenar = 0;
        let countSalah = 0;
        let countKosong = 0;

        doc.setFontSize(11); // Ukuran font soal kembali normal

        rawAnswers.forEach(item => {
           const val = item.el.value.trim();
           let status = "kosong"; 
           
           if (val !== "") {
             if (item.isNum) {
               status = (extractNum(val) === item.key) ? "benar" : "salah";
             } else {
               status = (val.toUpperCase() === item.key) ? "benar" : "salah";
             }
           }

           if (status === "benar") countBenar++;
           else if (status === "salah") countSalah++;
           else countKosong++;

           // Cek halaman
           if (yPos > pageHeight - 30) { doc.addPage(); yPos = 20; }
           
           // Teks Soal
           doc.setFont("helvetica", "bold");
           doc.setTextColor(0,0,0);
           doc.text(item.q, margin, yPos);
           yPos += 6;

           // Styling Kotak
           if (status === "benar") {
             doc.setFillColor(209, 250, 229); // Hijau Muda
             doc.setDrawColor(34, 197, 94);   // Hijau Tua
             doc.setTextColor(21, 128, 61);   // Teks Hijau
           } else if (status === "salah") {
             doc.setFillColor(254, 226, 226); // Merah Muda
             doc.setDrawColor(239, 68, 68);   // Merah Tua
             doc.setTextColor(185, 28, 28);   // Teks Merah
           } else {
             doc.setFillColor(245, 245, 245); // Abu
             doc.setDrawColor(200, 200, 200); 
             doc.setTextColor(100, 100, 100);
           }

           // Gambar Kotak
           doc.roundedRect(margin, yPos - 5, pageWidth - (margin*2), 12, 1, 1, 'FD');

           // Tulis Jawaban
           doc.setFont("helvetica", "normal");
           const textAns = val ? `${val} ${item.unit}` : "(Tidak dijawab)";
           const prefix = status === 'benar' ? "(BENAR) " : status === 'salah' ? "(SALAH) " : "";
           doc.text(prefix + textAns, margin + 5, yPos + 3);

           yPos += 16;
        });

        // --- 6. RINGKASAN SKOR ---
        yPos += 5;
        doc.setFont("helvetica", "bold");
        doc.setTextColor(0, 0, 0);
        
        const summaryText = `Ringkasan: Benar: ${countBenar}  |  Salah: ${countSalah}  |  Belum Dijawab: ${countKosong}`;
        
        doc.setDrawColor(0, 0, 0);
        doc.setFillColor(255, 255, 255);
        doc.roundedRect(margin, yPos - 5, pageWidth - (margin * 2), 10, 1, 1, 'S'); 
        doc.text(summaryText, pageWidth / 2, yPos + 2, { align: "center" });

        // --- 7. FOOTER ---
        yPos += 15;
        doc.setFontSize(9);
        doc.setTextColor(150, 150, 150);
        doc.text("Jarak Tempuh dan Perpindahan", pageWidth / 2, yPos, { align: "center" });

        doc.save("Laporan_Latihan_Jarak tempuh dan perpindahan.pdf");

      } catch (err) {
        console.error(err);
        alert("Gagal membuat PDF.");
      } finally {
        btnUnduhAdi.innerHTML = originalText;
        btnUnduhAdi.disabled = false;
      }
    });
  }

});




// INI MERUPAKAN FILE KELAJUAN DAN KECEPATAN (REVISI LOCKING SYSTEM)
// Kunci Jawaban Latihan Soal Isian
const kunciLatihan = [
  // ===== KELAJUAN =====
  { id: "s1", jawaban: "120" },
  { id: "s2", jawaban: "40" },
  { id: "s-total", jawaban: "160" },
  { id: "t", jawaban: "20" },
  { id: "v-atas", jawaban: "160" },
  { id: "v-bawah", jawaban: "20" },
  { id: "v-hasil", jawaban: "8" },

  // ===== KECEPATAN =====
  { id: "x0", jawaban: "40" },
  { id: "xt", jawaban: "120" },
  { id: "delta-s", jawaban: "80" },
  { id: "t2", jawaban: "20" },
  { id: "v2-atas", jawaban: "80" },
  { id: "v2-bawah", jawaban: "20" },
  { id: "v2-hasil", jawaban: "4" }
];

// Fungsi Popup Global
function tutupPopupQuiz() {
  const popup = document.getElementById("popup-quiz");
  if (popup) popup.classList.remove("show");
}

function resetQuizPopup() {
  document.querySelectorAll(".quiz-check").forEach(cb => cb.checked = false);
  tutupPopupQuiz();
}

function tutupPopupLatihan() {
  const popup = document.getElementById("popup-latihan");
  if (popup) popup.classList.remove("show");
}

// Fungsi Coba Lagi Latihan (Global)
window.cobaLagiLatihan = function() {
  kunciLatihan.forEach(item => {
    const input = document.getElementById(item.id);
    if (input) {
      input.value = "";
      input.classList.remove("benar", "salah");
    }
  });
  tutupPopupLatihan();
};


/* ========================================================
   MAIN LOGIC (DOM CONTENT LOADED)
   ======================================================== */
document.addEventListener("DOMContentLoaded", function () {

  /* =========================================
     0. FUNGSI CEK MEMORI UNTUK MEMBUKA GEMBOK (SISTEM PENGUNCIAN)
     ========================================= */
  function checkAllLocks() {
      // 1. Cek Kelulusan Materi Sebelumnya (Jarak Tempuh)
      // Jika sudah lulus Jarak Tempuh, pastikan menu Kelajuan (sidebar) terbuka
      if (localStorage.getItem('jarak_completed') === 'true') {
          const navKelajuan = document.getElementById('nav-kelajuan');
          if (navKelajuan) {
              navKelajuan.classList.remove('locked');
              const lockIcon = navKelajuan.querySelector('.fa-lock');
              if (lockIcon) lockIcon.remove();
          }
      }

      // 2. Cek Kelulusan Materi INI (Kelajuan dan Kecepatan)
      // Jika siswa sudah lulus materi ini, buka akses ke materi berikutnya (Percepatan)
      if (localStorage.getItem('kelajuan_completed') === 'true') {
          
          // Buka Sidebar Materi Selanjutnya (Percepatan)
          const navPercepatan = document.getElementById('nav-percepatan');
          if (navPercepatan) {
              navPercepatan.classList.remove('locked');
              const lockIcon = navPercepatan.querySelector('.fa-lock');
              if (lockIcon) lockIcon.remove();
          }

          // Buka Tombol "Materi Selanjutnya" di halaman ini
          const btnNextMateri = document.getElementById("btn-next-materi");
          if (btnNextMateri) {
            btnNextMateri.classList.remove('locked');
          }
      }
  }

  // Jalankan pengecekan gembok saat halaman dimuat
  checkAllLocks();


  /* ========================================================
     1. LOGIKA KUIS KELAJUAN vs KECEPATAN
     ======================================================== */
  const checks = document.querySelectorAll(".quiz-check");
  const btnCekQuiz = document.getElementById("btn-cek-quiz");
  const btnResetQuiz = document.getElementById("btn-reset-quiz");

  const kunciQuiz = {
    1: "kecepatan",
    2: "kelajuan",
    3: "kelajuan",
    4: "kecepatan",
    5: "kecepatan",
    6: "kelajuan",
    7: "kecepatan",
    8: "kelajuan", 
    9: "kecepatan"
  };

  // Checkbox behavior (hanya boleh pilih satu per baris)
  if (checks.length > 0) {
    checks.forEach(cb => {
      cb.addEventListener("change", function () {
        const row = this.dataset.row;
        if (this.checked) {
          document.querySelectorAll('.quiz-check[data-row="' + row + '"]').forEach(other => {
            if (other !== this) other.checked = false;
          });
        }
      });
    });
  }

  // Tombol Cek Kuis
  if (btnCekQuiz) {
    btnCekQuiz.addEventListener("click", function () {
      let benar = 0;
      let total = Object.keys(kunciQuiz).length;
      let belumDiisi = 0;

      Object.keys(kunciQuiz).forEach(row => {
        const benarTipe = kunciQuiz[row];
        const cekKelajuan = document.querySelector('.quiz-check[data-row="' + row + '"][data-type="kelajuan"]');
        const cekKecepatan = document.querySelector('.quiz-check[data-row="' + row + '"][data-type="kecepatan"]');

        const dipilih =
          (cekKelajuan.checked ? "kelajuan" : "") ||
          (cekKecepatan.checked ? "kecepatan" : "");

        if (!dipilih) {
          belumDiisi++;
        } else if (dipilih === benarTipe) {
          benar++;
        }
      });

      const salah = total - benar - belumDiisi;

      const popupText = document.getElementById("popup-quiz-text");
      if (popupText) {
        popupText.innerHTML = `
          <span class="hasil-benar">✔ Benar : ${benar}</span>
          <span class="pemisah">|</span>
          <span class="hasil-salah">✖ Salah : ${salah}</span>
          <span class="pemisah">|</span>
          <span class="hasil-belum">⏳ Belum diisi : ${belumDiisi}</span>
        `;
        document.getElementById("popup-quiz").classList.add("show");
      }
    });
  }

  // Tombol Reset Kuis
  if (btnResetQuiz) {
    btnResetQuiz.addEventListener("click", function () {
      checks.forEach(cb => cb.checked = false);
    });
  }

  /* ========================================================
     2. LOGIKA LATIHAN SOAL ISIAN (UPDATED: BUKA KUNCI JIKA BENAR)
     ======================================================== */
  const btnCekLatihan = document.getElementById("btn-cek-latihan");
  const btnResetLatihan = document.getElementById("btn-reset-latihan");

  if (btnCekLatihan) {
    btnCekLatihan.addEventListener("click", () => {
      let benar = 0;
      let salah = 0;
      let belumDiisi = 0;

      kunciLatihan.forEach(item => {
        const input = document.getElementById(item.id);
        if (input) {
          const nilai = input.value.trim();
          input.classList.remove("benar", "salah");

          if (nilai === "") {
            belumDiisi++;
          } else if (nilai === item.jawaban) {
            benar++;
            input.classList.add("benar");
          } else {
            salah++;
            input.classList.add("salah");
          }
        }
      });

      // --- CEK APAKAH SEMUA JAWABAN BENAR ---
      if (benar === kunciLatihan.length) {
          // 1. Simpan Status Lulus ke Memori Browser
          localStorage.setItem('kelajuan_completed', 'true');

          // 2. Jalankan fungsi buka gembok (agar tombol next langsung aktif tanpa refresh)
          checkAllLocks();

          // 3. Tampilkan Notifikasi Sukses (SweetAlert)
          if (typeof Swal !== 'undefined') {
              Swal.fire({
                  title: 'Luar Biasa!',
                  text: 'Semua jawaban benar. Materi selanjutnya (Percepatan) telah terbuka!',
                  icon: 'success',
                  confirmButtonText: 'Lanjut',
                  confirmButtonColor: '#2ecc71'
              });
          } else {
              // Fallback jika SweetAlert tidak terload
              alert("Selamat! Jawaban kamu benar semua. Materi selanjutnya telah terbuka.");
          }
      } else {
          // Jika belum benar semua, tampilkan popup skor biasa
          const popupText = document.getElementById("popup-latihan-text");
          const popup = document.getElementById("popup-latihan");

          if (popupText && popup) {
            popupText.innerHTML = `
              <span class="hasil-benar">✔ Benar : ${benar}</span>
              <span class="pemisah">|</span>
              <span class="hasil-salah">✖ Salah : ${salah}</span>
              <span class="pemisah">|</span>
              <span class="hasil-belum">⏳ Belum diisi : ${belumDiisi}</span>
            `;
            popup.classList.add("show");
          }
      }
    });
  }

  if (btnResetLatihan) {
    btnResetLatihan.addEventListener("click", () => {
      window.cobaLagiLatihan();
    });
  }

  /* ========================================================
     3. LOGIKA UNDUH PDF
     ======================================================== */
  const btnUnduhLatihan = document.getElementById("btn-unduh-latihan");

  // Helper Kompresi Gambar
  const getCompressedImage = (el) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.setAttribute('crossOrigin', 'anonymous');
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxWidth = 800; 
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.7));
      };
      img.onerror = (err) => reject(err);
      img.src = el.src; 
    });
  };

  if (btnUnduhLatihan) {
    btnUnduhLatihan.addEventListener("click", async () => {
      const { jsPDF } = window.jspdf;
      if (!jsPDF) { alert("Library PDF belum siap."); return; }

      const originalText = btnUnduhLatihan.innerHTML;
      btnUnduhLatihan.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Memproses...`;
      btnUnduhLatihan.disabled = true;

      try {
        const doc = new jsPDF('p', 'mm', 'a4'); // Portrait, Millimeters
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        let yPos = 0;

        // --- 1. HEADER ---
        doc.setFillColor(249, 92, 80);
        doc.rect(0, 0, pageWidth, 40, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(22);
        doc.text("Laporan Hasil Latihan", pageWidth / 2, 20, { align: "center" });
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text("Materi: Kelajuan dan Kecepatan", pageWidth / 2, 28, { align: "center" });

        yPos = 55;

        // --- 2. INFO IDENTITAS ---
        doc.setTextColor(80, 80, 80);
        doc.setFontSize(9);
        doc.setFont("helvetica", "italic");
        const tgl = new Date().toLocaleDateString('id-ID', { dateStyle: 'full' });
        doc.text(`Tanggal Pengerjaan: ${tgl}`, 20, yPos);
        yPos += 10;

        // --- 3. SOAL CERITA ---
        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        const cerita = "Seorang anak bersepeda ke arah selatan menuju toko sejauh 120 meter, kemudian berbalik arah ke utara menuju sekolah sejauh 40 meter. Waktu yang dihabiskan untuk seluruh perjalanan adalah 20 sekon. Tentukan kelajuan dan kecepatan anak tersebut!";
        const splitCerita = doc.splitTextToSize(cerita, pageWidth - 40);
        doc.text(splitCerita, 20, yPos);
        yPos += (splitCerita.length * 5) + 5;

        // --- 4. GAMBAR ---
        const images = document.querySelectorAll('.content-image2');
        const imgElement = images[images.length - 1]; // Ambil gambar terakhir di halaman
        if (imgElement) {
          try {
            const imgData = await getCompressedImage(imgElement);
            const imgProps = doc.getImageProperties(imgData);
            const imgWidth = 80; // Gambar lebih kecil agar muat
            const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
            const xImg = (pageWidth - imgWidth) / 2;
            doc.addImage(imgData, 'JPEG', xImg, yPos, imgWidth, imgHeight);
            yPos += imgHeight + 10;
          } catch (e) {}
        }

        // --- 5. LOGIKA GAMBAR KOTAK JAWABAN (HELPER) ---
        
        let countBenar = 0, countSalah = 0, countKosong = 0;

        // Fungsi menggambar kotak jawaban di koordinat spesifik
        const drawAnswerBox = (id, x, y, w = 15, h = 7) => {
          const inputEl = document.getElementById(id);
          const val = inputEl ? inputEl.value.trim() : "";
          // Mencari kunci jawaban dari array kunciLatihan
          const kunci = kunciLatihan.find(k => k.id === id);
          
          let bgColor = [245, 245, 245]; // Abu (Kosong)
          let textColor = [100, 100, 100];
          let borderColor = [200, 200, 200];

          if (val !== "") {
            if (val === kunci.jawaban) {
              bgColor = [209, 250, 229]; // Hijau Muda
              borderColor = [34, 197, 94];
              textColor = [21, 128, 61];
              countBenar++;
            } else {
              bgColor = [254, 226, 226]; // Merah Muda
              borderColor = [239, 68, 68];
              textColor = [185, 28, 28];
              countSalah++;
            }
          } else {
            countKosong++;
          }

          doc.setFillColor(...bgColor);
          doc.setDrawColor(...borderColor);
          doc.roundedRect(x, y, w, h, 1, 1, 'FD');
          
          doc.setFontSize(10);
          doc.setTextColor(...textColor);
          const textToShow = val !== "" ? val : "(?)";
          doc.text(textToShow, x + (w/2), y + 5, { align: "center" });
          
          // Reset warna ke hitam untuk teks biasa berikutnya
          doc.setTextColor(0, 0, 0); 
        };

        // --- 6. LAYOUT DUA KOLOM (KELAJUAN & KECEPATAN) ---
        // Kita akan menggambar secara manual menggunakan koordinat
        // Kolom Kiri: X = 20, Kolom Kanan: X = 115
        
        const startY = yPos;
        let leftY = startY;
        let rightY = startY;
        const colLeft = 20;
        const colRight = 115;

        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");

        // === KOLOM KIRI (KELAJUAN) ===
        doc.text("A. Kelajuan", colLeft, leftY); leftY += 8;
        doc.setFont("helvetica", "normal");
        
        // Diketahui
        doc.text("Diketahui:", colLeft, leftY); leftY += 6;
        doc.text("Jarak =", colLeft, leftY);
        drawAnswerBox("s1", colLeft + 15, leftY - 5, 15);
        doc.text("+", colLeft + 32, leftY);
        drawAnswerBox("s2", colLeft + 37, leftY - 5, 15);
        doc.text("=", colLeft + 54, leftY);
        drawAnswerBox("s-total", colLeft + 59, leftY - 5, 15);
        doc.text("m", colLeft + 76, leftY);
        leftY += 10;

        doc.text("Waktu =", colLeft, leftY);
        drawAnswerBox("t", colLeft + 15, leftY - 5, 15);
        doc.text("sekon", colLeft + 32, leftY);
        leftY += 10;

        // Ditanya
        doc.text("Ditanya: Kelajuan (v) = ?", colLeft, leftY); leftY += 10;

        // Dijawab
        doc.text("Dijawab: v = s / t", colLeft, leftY); leftY += 10;
        
        // Pecahan
        doc.text("v =", colLeft, leftY + 5);
        drawAnswerBox("v-atas", colLeft + 10, leftY - 2, 15); // Atas
        doc.line(colLeft + 10, leftY + 6, colLeft + 25, leftY + 6); // Garis bagi
        drawAnswerBox("v-bawah", colLeft + 10, leftY + 7, 15); // Bawah
        
        doc.text("=", colLeft + 28, leftY + 5);
        drawAnswerBox("v-hasil", colLeft + 33, leftY + 2, 15); // Hasil
        doc.text("m/s", colLeft + 50, leftY + 5);


        // === KOLOM KANAN (KECEPATAN) ===
        doc.setFont("helvetica", "bold");
        doc.text("B. Kecepatan", colRight, rightY); rightY += 8;
        doc.setFont("helvetica", "normal");

        // Diketahui
        doc.text("Diketahui:", colRight, rightY); rightY += 6;
        doc.text("Selatan (x0) =", colRight, rightY);
        drawAnswerBox("x0", colRight + 25, rightY - 5, 15);
        doc.text("m", colRight + 42, rightY);
        rightY += 8;

        doc.text("Utara (xt) =", colRight, rightY);
        drawAnswerBox("xt", colRight + 25, rightY - 5, 15);
        doc.text("m", colRight + 42, rightY);
        rightY += 8;

        doc.text("Waktu =", colRight, rightY);
        drawAnswerBox("t2", colRight + 15, rightY - 5, 15);
        doc.text("s", colRight + 32, rightY);
        rightY += 10;

        // Ditanya
        doc.text("Ditanya: Kecepatan (v) = ?", colRight, rightY); rightY += 10;

        // Dijawab
        doc.text("Dijawab: Cari Perpindahan", colRight, rightY); rightY += 8;
        doc.text("Delta s = xt - x0", colRight, rightY); rightY += 8;
        doc.text("Delta s =", colRight, rightY);
        drawAnswerBox("delta-s", colRight + 18, rightY - 5, 15);
        doc.text("m", colRight + 35, rightY);
        rightY += 12;

        // Pecahan Kecepatan
        doc.text("v =", colRight, rightY + 5);
        drawAnswerBox("v2-atas", colRight + 10, rightY - 2, 15); // Atas
        doc.line(colRight + 10, rightY + 6, colRight + 25, rightY + 6); // Garis bagi
        drawAnswerBox("v2-bawah", colRight + 10, rightY + 7, 15); // Bawah
        
        doc.text("=", colRight + 28, rightY + 5);
        drawAnswerBox("v2-hasil", colRight + 33, rightY + 2, 15); // Hasil
        doc.text("m/s", colRight + 50, rightY + 5);

        
        // --- 7. RINGKASAN SKOR ---
        // Cari posisi Y paling bawah antara kolom kiri atau kanan
        yPos = Math.max(leftY, rightY) + 25; 

        doc.setFont("helvetica", "bold");
        doc.setTextColor(0, 0, 0);
        const summaryText = `Ringkasan: Benar: ${countBenar}  |  Salah: ${countSalah}  |  Belum Dijawab: ${countKosong}`;
        
        doc.setDrawColor(0, 0, 0);
        doc.setFillColor(255, 255, 255);
        doc.roundedRect(20, yPos, pageWidth - 40, 10, 1, 1, 'S');
        doc.text(summaryText, pageWidth / 2, yPos + 7, { align: "center" });

        // Footer
        doc.setFontSize(9);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(150, 150, 150);
        doc.text("Kelajuan dan Kecepatan", pageWidth / 2, yPos + 20, { align: "center" });

        doc.save("Laporan_Latihan_Kelajuan_Kecepatan.pdf");

      } catch (err) {
        console.error(err);
        alert("Gagal membuat PDF.");
      } finally {
        btnUnduhLatihan.innerHTML = originalText;
        btnUnduhLatihan.disabled = false;
      }
    });
  }
  
});




/* ========================================================
   FILE: PERCEPATAN (LOGIKA LATIHAN & UNDUH PDF - REVISI LOCK SYSTEM)
   ======================================================== */

// --- 1. HELPER GLOBAL: KOMPRESI GAMBAR ---
const getCompressedImage = (el) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.setAttribute('crossOrigin', 'anonymous');
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const maxWidth = 800;
      let width = img.width;
      let height = img.height;
      if (width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL("image/jpeg", 0.7));
    };
    img.onerror = (err) => reject(err);
    img.src = el.src;
  });
};

document.addEventListener("DOMContentLoaded", function () {

  /* =========================================
     0. FUNGSI CEK MEMORI UNTUK MEMBUKA GEMBOK (SISTEM PENGUNCIAN)
     ========================================= */
  function checkAllLocks() {
      // 1. Cek Kelulusan Materi Sebelumnya (Kelajuan & Kecepatan)
      // Jika sudah lulus materi sebelumnya, pastikan menu Percepatan di sidebar terbuka
      if (localStorage.getItem('kelajuan_completed') === 'true') {
          const navPercepatan = document.getElementById('nav-percepatan');
          if (navPercepatan) {
              navPercepatan.classList.remove('locked');
              const lockIcon = navPercepatan.querySelector('.fa-lock');
              if (lockIcon) lockIcon.remove();
          }
      }

      // 2. Cek Kelulusan Materi INI (Percepatan)
      // Jika siswa sudah lulus materi ini, buka akses ke Kuis 1
      if (localStorage.getItem('percepatan_completed') === 'true') {
          
          // Buka Sidebar Kuis 1 (jika ada di layout utama)
          const navKuis = document.getElementById('nav-kuis1');
          if (navKuis) {
              navKuis.classList.remove('locked');
              const lockIcon = navKuis.querySelector('.fa-lock');
              if (lockIcon) lockIcon.remove();
          }

          // Buka Tombol "Ke Kuis 1" di halaman ini
          const btnNextMateri = document.getElementById("btn-next-materi");
          if (btnNextMateri) {
            btnNextMateri.classList.remove('locked');
          }
      }
  }

  // Jalankan pengecekan gembok saat halaman dimuat
  checkAllLocks();


  /* ========================================================
     BAGIAN A: LOGIKA LATIHAN SOAL (INTERAKSI WEBSITE)
     ======================================================== */
  
  const btnCek = document.getElementById("btn-cek-percepatan");
  const btnReset = document.getElementById("btn-reset-percepatan");
  const btnPopupUlang = document.getElementById("btn-popup-ulang-percepatan");
  const btnPopupTutup = document.getElementById("btn-popup-tutup-percepatan");

  // Kunci Jawaban Soal Percepatan
  const kunciPercepatan = [
    { id: "v1", jawaban: "10" },
    { id: "v2", jawaban: "50" },
    { id: "t", jawaban: "20" },
    { id: "a-atas", jawaban: "40" },
    { id: "a-bawah", jawaban: "20" },
    { id: "a-hasil", jawaban: "2" }
  ];

  // Fungsi Reset Input
  function resetPercepatan() {
    kunciPercepatan.forEach(item => {
      const input = document.getElementById(item.id);
      if (input) {
        input.value = "";
        input.classList.remove("benar", "salah");
      }
    });
    const popupBox = document.getElementById("popup-percepatan");
    if (popupBox) popupBox.classList.remove("show");
  }

  // Event Listener: Cek Jawaban
  if (btnCek) {
    btnCek.addEventListener("click", () => {
      let benar = 0;
      let salah = 0;
      let belum = 0;

      kunciPercepatan.forEach(item => {
        const input = document.getElementById(item.id);
        if (input) {
          const nilai = input.value.trim();
          input.classList.remove("benar", "salah");

          if (nilai === "") {
            belum++;
          } else if (nilai === item.jawaban) {
            benar++;
            input.classList.add("benar");
          } else {
            salah++;
            input.classList.add("salah");
          }
        }
      });

      // --- LOGIKA BARU: JIKA BENAR SEMUA, BUKA KUNCI ---
      if (benar === kunciPercepatan.length) {
          // 1. Simpan Status Lulus ke Memori Browser
          localStorage.setItem('percepatan_completed', 'true');

          // 2. Jalankan fungsi buka gembok (agar tombol next langsung aktif)
          checkAllLocks();

          // 3. Tampilkan Notifikasi Sukses (SweetAlert)
          if (typeof Swal !== 'undefined') {
              Swal.fire({
                  title: 'Luar Biasa!',
                  text: 'Semua jawaban benar. Akses ke Kuis 1 telah terbuka!',
                  icon: 'success',
                  confirmButtonText: 'Lanjut',
                  confirmButtonColor: '#2ecc71'
              });
          } else {
              // Fallback jika SweetAlert tidak terload
              alert("Selamat! Jawaban kamu benar semua. Akses ke Kuis 1 telah terbuka.");
          }

      } else {
          // Jika belum benar semua, tampilkan popup skor biasa
          const popupText = document.getElementById("popup-percepatan-text");
          const popupBox = document.getElementById("popup-percepatan");

          if (popupText && popupBox) {
            popupText.innerHTML = `
              <span class="hasil-benar">✔ Benar : ${benar}</span>
              <span class="pemisah">|</span>
              <span class="hasil-salah">✖ Salah : ${salah}</span>
              <span class="pemisah">|</span>
              <span class="hasil-belum">⏳ Belum diisi : ${belum}</span>
            `;
            popupBox.classList.add("show");
          }
      }
    });
  }

  // Event Listener: Tombol Reset & Tutup
  if (btnReset) btnReset.addEventListener("click", resetPercepatan);
  if (btnPopupUlang) btnPopupUlang.addEventListener("click", resetPercepatan);
  if (btnPopupTutup) {
    btnPopupTutup.addEventListener("click", function () {
      const popupBox = document.getElementById("popup-percepatan");
      if (popupBox) popupBox.classList.remove("show");
    });
  }


  /* ========================================================
     BAGIAN B: LOGIKA UNDUH PDF (LAYOUT KHUSUS PERCEPATAN)
     ======================================================== */
  
  const btnUnduhPercepatan = document.getElementById("btn-unduh-percepatan");

  if (btnUnduhPercepatan) {
    btnUnduhPercepatan.addEventListener("click", async () => {
      const { jsPDF } = window.jspdf;
      if (!jsPDF) { alert("Library PDF belum siap."); return; }

      // Ubah status tombol saat proses
      const originalText = btnUnduhPercepatan.innerHTML;
      btnUnduhPercepatan.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Memproses...`;
      btnUnduhPercepatan.disabled = true;

      try {
        const doc = new jsPDF('p', 'mm', 'a4');
        const pageWidth = doc.internal.pageSize.getWidth();
        let yPos = 0;

        // --- 1. HEADER (Orange Theme) ---
        doc.setFillColor(249, 92, 80);
        doc.rect(0, 0, pageWidth, 40, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(22);
        doc.text("Laporan Hasil Latihan", pageWidth / 2, 20, { align: "center" });
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text("Materi: Percepatan", pageWidth / 2, 28, { align: "center" });

        yPos = 55;

        // --- 2. IDENTITAS & TANGGAL ---
        doc.setTextColor(80, 80, 80);
        doc.setFontSize(9);
        doc.setFont("helvetica", "italic");
        const tgl = new Date().toLocaleDateString('id-ID', { dateStyle: 'full' });
        doc.text(`Tanggal Pengerjaan: ${tgl}`, 20, yPos);
        yPos += 10;

        // --- 3. SOAL CERITA ---
        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        const cerita = "Sebuah sepeda mula-mula berjalan dengan kecepatan 10 m/s, kemudian pada detik ke-20 kecepatannya menjadi 50 m/s. Berapakah percepatan yang dialami sepeda tersebut?";
        const splitCerita = doc.splitTextToSize(cerita, pageWidth - 40);
        doc.text(splitCerita, 20, yPos);
        yPos += (splitCerita.length * 6) + 5;

        // --- 4. GAMBAR ILUSTRASI ---
        const images = document.querySelectorAll('.content-image2');
        // Mengambil gambar terakhir di halaman (asumsi gambar latihan ada di bawah)
        const imgElement = images[images.length - 1]; 

        if (imgElement) {
          try {
            const imgData = await getCompressedImage(imgElement);
            const imgProps = doc.getImageProperties(imgData);
            const imgWidth = 80; 
            const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
            const xImg = (pageWidth - imgWidth) / 2;
            doc.addImage(imgData, 'JPEG', xImg, yPos, imgWidth, imgHeight);
            yPos += imgHeight + 15;
          } catch (e) { console.log(e); }
        }

        // --- 5. LOGIKA GAMBAR KOTAK (VALIDASI) ---
        let countBenar = 0, countSalah = 0, countKosong = 0;

        const drawBox = (id, x, y, w = 15, h = 7) => {
          const inputEl = document.getElementById(id);
          const val = inputEl ? inputEl.value.trim() : "";
          const kunci = kunciPercepatan.find(k => k.id === id);
          
          let bg = [245, 245, 245], txt = [100, 100, 100], brd = [200, 200, 200];

          if (val !== "") {
            if (val === kunci.jawaban) {
              bg = [209, 250, 229]; brd = [34, 197, 94]; txt = [21, 128, 61]; countBenar++;
            } else {
              bg = [254, 226, 226]; brd = [239, 68, 68]; txt = [185, 28, 28]; countSalah++;
            }
          } else {
            countKosong++;
          }

          doc.setFillColor(...bg); doc.setDrawColor(...brd);
          doc.roundedRect(x, y, w, h, 1, 1, 'FD');
          doc.setFontSize(10); doc.setTextColor(...txt);
          doc.text(val !== "" ? val : "(?)", x + (w/2), y + 5, { align: "center" });
          doc.setTextColor(0, 0, 0); // Reset warna hitam
        };

        // --- 6. LAYOUT JAWABAN (MANUAL DRAWING) ---
        let leftX = 20;
        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");

        // Bagian Diketahui
        doc.text("Diketahui:", leftX, yPos); yPos += 8;
        
        doc.text("Kecepatan awal (v1) =", leftX, yPos);
        drawBox("v1", leftX + 45, yPos - 5, 15);
        doc.text("m/s", leftX + 62, yPos);
        yPos += 10;

        doc.text("Kecepatan akhir (v2) =", leftX, yPos);
        drawBox("v2", leftX + 45, yPos - 5, 15);
        doc.text("m/s", leftX + 62, yPos);
        yPos += 10;

        doc.text("Waktu (t) =", leftX, yPos);
        drawBox("t", leftX + 45, yPos - 5, 15);
        doc.text("s", leftX + 62, yPos);
        yPos += 12;

        // Bagian Ditanya
        doc.text("Ditanya: Percepatan (a) = ?", leftX, yPos); yPos += 10;

        // Bagian Dijawab
        doc.text("Dijawab: a = (v2 - v1) / t", leftX, yPos); yPos += 10;

        // Rumus Pecahan Hasil
        doc.text("a =", leftX, yPos + 5);
        
        // Kotak Atas (Selisih Kecepatan)
        drawBox("a-atas", leftX + 10, yPos - 2, 15);
        // Garis Pembagi
        doc.line(leftX + 10, yPos + 6, leftX + 25, yPos + 6);
        // Kotak Bawah (Waktu)
        drawBox("a-bawah", leftX + 10, yPos + 7, 15);
        
        doc.text("=", leftX + 28, yPos + 5);
        // Kotak Hasil Akhir
        drawBox("a-hasil", leftX + 33, yPos + 2, 15);
        doc.text("m/s²", leftX + 50, yPos + 5);

        yPos += 25; // Spasi ke footer

        // --- 7. RINGKASAN & FOOTER ---
        const summaryText = `Ringkasan: Benar: ${countBenar}  |  Salah: ${countSalah}  |  Belum Dijawab: ${countKosong}`;
        
        doc.setDrawColor(0, 0, 0); doc.setFillColor(255, 255, 255);
        doc.roundedRect(20, yPos, pageWidth - 40, 10, 1, 1, 'S');
        doc.setFont("helvetica", "bold");
        doc.text(summaryText, pageWidth / 2, yPos + 7, { align: "center" });

        doc.setFontSize(9); doc.setFont("helvetica", "normal"); doc.setTextColor(150, 150, 150);
        doc.text("Percepatan", pageWidth / 2, yPos + 20, { align: "center" });

        // Simpan File PDF
        doc.save("Laporan_Latihan_Percepatan.pdf");

      } catch (err) {
        console.error(err);
        alert("Gagal membuat PDF.");
      } finally {
        btnUnduhPercepatan.innerHTML = originalText;
        btnUnduhPercepatan.disabled = false;
      }
    });
  }

});









// INI MERUPAKAN FILE PENGERTIAN GAYA
/* =========================================
   LOGIKA KUIS PILIHAN GANDA (GAYA)
   ========================================= */
function cekJawaban(tombol, status) {
  // 1. Ambil elemen induk (grup tombol)
  const grupTombol = tombol.parentElement;
  const semuaTombol = grupTombol.querySelectorAll('.tombol-opsi');
  const respon = grupTombol.nextElementSibling; // Elemen <p> untuk pesan respon

  // 2. Matikan semua tombol di soal ini agar tidak bisa diklik lagi
  semuaTombol.forEach(btn => {
    btn.disabled = true;
    btn.style.pointerEvents = "none"; // Hilangkan efek kursor
  });

  // 3. Cek apakah jawaban Benar atau Salah
  if (status === 'benar') {
    // Jika Benar
    tombol.classList.add('jawaban-benar');
    respon.innerHTML = "✅ Benar! Bagus sekali."; 
    respon.style.color = "#28a745"; // Warna hijau
  } else {
    // Jika Salah
    tombol.classList.add('jawaban-salah');
    respon.innerHTML = "❌ Kurang tepat. Jawaban yang benar ditandai hijau.";
    respon.style.color = "#dc3545"; // Warna merah
    
    // Fitur Tambahan: Otomatis beritahu mana yang benar
    semuaTombol.forEach(btn => {
      // Cek onclick attribute untuk mencari yang 'benar'
      if (btn.getAttribute('onclick').includes("'benar'")) {
        btn.classList.add('jawaban-benar'); 
      }
    });
  }
}




// INI MERUPAKAN FILE RESULTAN GAYA
/* =========================================
   LOGIKA LATIHAN RESULTAN GAYA
   ========================================= */
function cekJawabanResultan(no) {
  const kunciJawaban = {
    1: 40,
    2: 0
  };

  const inputEl = document.getElementById("jawaban" + no);
  const feedbackEl = document.getElementById("feedback" + no);

  if (!inputEl || !feedbackEl) return; // Defensive check

  const nilaiInput = inputEl.value.trim();

  if (nilaiInput === "") {
    feedbackEl.textContent = "⚠️ Masukkan jawaban terlebih dahulu.";
    feedbackEl.className = "feedback salah";
    // Gunakan warna oranye/kuning dari style CSS jika ada, atau biarkan class mengatur
    feedbackEl.style.color = "#d97706"; 
    return;
  }

  if (Number(nilaiInput) === kunciJawaban[no]) {
    feedbackEl.textContent = "✅ Jawaban benar!";
    feedbackEl.className = "feedback benar";
    feedbackEl.style.color = "green";
  } else {
    feedbackEl.textContent = "❌ Jawaban salah, coba lagi.";
    feedbackEl.className = "feedback salah";
    feedbackEl.style.color = "red";
  }
}




// INI MERUPAKAN FILE MACAM - MACAM GAYA 
// ==========================================
// LOGIKA DRAG & DROP HALAMAN MACAM-MACAM GAYA
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
  
  const containerMacam = document.getElementById("drag-container-macam");
  const poolMacam = document.getElementById("card-pool-macam");
  const btnCekMacam = document.getElementById("btn-cek-macam");
  
  // Cek keberadaan elemen agar tidak error di halaman lain
  if (containerMacam && poolMacam && btnCekMacam) {
      
      const zones = document.querySelectorAll("#drag-container-macam .drop-zone, #card-pool-macam");
      const cards = document.querySelectorAll("#card-pool-macam .card-item");
      const modal = document.getElementById("modal-macam");
      const modalText = document.getElementById("modal-text-macam");
      const closeModal = document.getElementById("close-modal-macam");
      
      let draggedCard = null;

      // 1. Event Drag Start
      cards.forEach(card => {
        card.addEventListener("dragstart", function () {
          draggedCard = this;
          // Gunakan timeout agar elemen visual tetap ada saat didrag
          setTimeout(() => this.style.opacity = '0.5', 0);
        });
        
        card.addEventListener("dragend", function () {
          this.style.opacity = '1';
          draggedCard = null;
        });
      });

      // 2. Event Drop Zone
      zones.forEach(zone => {
        zone.addEventListener("dragover", function (e) {
          e.preventDefault(); // Wajib agar bisa di-drop
          this.classList.add("over");
        });

        zone.addEventListener("dragleave", function () {
          this.classList.remove("over");
        });

        zone.addEventListener("drop", function (e) {
          e.preventDefault();
          this.classList.remove("over");
          
          if (draggedCard) {
            this.appendChild(draggedCard);
            draggedCard.classList.remove("correct", "incorrect");
          }
        });
      });

      // 3. Tombol Cek Jawaban
      btnCekMacam.addEventListener("click", function () {
        let benar = 0;
        const total = cards.length;

        cards.forEach(card => {
          const jawaban = card.dataset.answer; // gesek, otot, dll
          const parent = card.parentElement;
          const target = parent.dataset.type;  // gesek, otot, pool

          if (target === jawaban) {
            benar++;
            card.classList.add("correct");
            card.classList.remove("incorrect");
          } else if (target === "pool") {
            // Masih di kotak asal
            card.classList.remove("correct", "incorrect");
          } else {
            // Salah kamar
            card.classList.add("incorrect");
            card.classList.remove("correct");
          }
        });

        const salah = total - benar;

        // Tampilkan Popup
        if(modalText && modal) {
            modalText.innerHTML = `
              <span class="hasil-benar">✔ Benar : ${benar}</span><br>
              <span class="hasil-salah">✖ Salah : ${salah}</span>
            `;
            modal.style.display = "flex";
        }
      });

      // 4. Tutup Modal
      if(closeModal) {
          closeModal.addEventListener("click", function () {
            modal.style.display = "none";
          });
      }

      window.addEventListener("click", function (e) {
        if (e.target === modal) {
          modal.style.display = "none";
        }
      });
  }
});




// INI MERUPAKAN FILE RESULTAN GAYA


// INI MERUPAKAN FILE HUKUM NEWTON
// ==========================================
// LOGIKA HALAMAN HUKUM NEWTON
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
  
  const btnCekNewton = document.getElementById("btn-cek-newton");
  const btnResetNewton = document.getElementById("btn-reset-newton");
  const btnTutupNewton = document.getElementById("btn-tutup-newton");
  
  // Pastikan kita berada di halaman Hukum Newton (tombol cek ada)
  if (btnCekNewton) {

    // --- 1. Logika Klik Pilihan Ganda ---
    document.querySelectorAll(".grup-opsi .tombol-opsi").forEach(btn => {
      btn.addEventListener("click", () => {
        // Ambil grup induknya
        const grup = btn.parentElement;
        
        // Hapus kelas 'dipilih' dari semua tombol di grup ini
        grup.querySelectorAll(".tombol-opsi").forEach(b => b.classList.remove("dipilih"));
        
        // Tambahkan kelas 'dipilih' ke tombol yang diklik
        btn.classList.add("dipilih");
        
        // Simpan jawaban siswa di dataset grup
        grup.dataset.jawaban = btn.dataset.pilihan;
      });
    });

    // --- 2. Logika Cek Jawaban (Hanya Pilihan Ganda) ---
    btnCekNewton.addEventListener("click", () => {
      let benar = 0;
      let salah = 0;

      // Cek setiap grup soal
      document.querySelectorAll(".grup-opsi").forEach(grup => {
        const jawabanSiswa = grup.dataset.jawaban;
        const kunci = grup.dataset.kunci;

        // Reset warna/status sebelumnya
        grup.querySelectorAll(".tombol-opsi").forEach(b => b.classList.remove("jawaban-benar", "jawaban-salah"));

        if (!jawabanSiswa) {
          salah++; // Belum diisi dianggap salah/belum selesai
        } else if (jawabanSiswa === kunci) {
          benar++;
          // Beri warna hijau pada pilihan siswa
          grup.querySelector(`[data-pilihan="${jawabanSiswa}"]`).classList.add("jawaban-benar");
        } else {
          salah++;
          // Beri warna merah pada pilihan siswa yang salah
          grup.querySelector(`[data-pilihan="${jawabanSiswa}"]`).classList.add("jawaban-salah");
          // Opsional: Tunjukkan jawaban yang benar
          grup.querySelector(`[data-pilihan="${kunci}"]`).classList.add("jawaban-benar");
        }
      });

      // --- 3. Tampilkan Popup Hasil ---
      const popupText = document.getElementById("popup-newton-text");
      const popupBox = document.getElementById("popup-newton");

      if (popupText && popupBox) {
        popupText.innerHTML = `
          <span class="hasil-benar">✔ Benar : ${benar}</span>
          <span class="pemisah">|</span>
          <span class="hasil-salah">✖ Salah : ${salah}</span>
        `;
        popupBox.classList.add("show");
      }
    });

    // --- 4. Logika Reset / Coba Lagi ---
    btnResetNewton.addEventListener("click", () => {
      // Reset Pilihan Ganda: Hapus dataset jawaban dan kelas styling
      document.querySelectorAll(".grup-opsi").forEach(grup => {
        delete grup.dataset.jawaban;
        grup.querySelectorAll(".tombol-opsi").forEach(b => b.classList.remove("dipilih", "jawaban-benar", "jawaban-salah"));
      });

      // Tutup Popup jika masih terbuka
      const popupBox = document.getElementById("popup-newton");
      if (popupBox) popupBox.classList.remove("show");
    });

    // --- 5. Logika Tutup Popup ---
    if (btnTutupNewton) {
      btnTutupNewton.addEventListener("click", () => {
        const popupBox = document.getElementById("popup-newton");
        if (popupBox) popupBox.classList.remove("show");
      });
    }
  }
});





// INI MERUPAKAN FILE QUIZ 1 (REVISI LOCKING SYSTEM)
document.addEventListener("DOMContentLoaded", function () {
  
  // Cek apakah halaman ini adalah halaman kuis fullscreen
  if (document.querySelector('.body-kuis-fullscreen')) {
    
    // --- 1. DATA SOAL ---
    const questions = [
      {
        q: "Suatu benda dikatakan bergerak apabila …",
        options: [
          "Kedudukan benda selalu tetap",
          "Jarak benda tidak berubah terhadap benda lain",
          "Kedudukan benda berubah terhadap titik acuan",
          "Kecepatan benda selalu tetap",
        ],
        answer: 2, // Jawaban c
      },
      {
        q: "Saat berkendara di malam hari, kita sering melihat bulan seolah-olah bergerak mengikuti arah lari kita. Fenomena ini merupakan contoh dari...",
        options: [
          "Gerak lurus beraturan",
          "Gerak semu",
          "Gerak relatif",
          "Gerak dipercepat",
        ],
        answer: 1, // Jawaban B
      },
      {
        q: "Perpindahan didefinisikan sebagai ...",
        options: [
          "Panjang lintasan yang ditempuh tanpa memedulikan arah.",
          "Waktu yang diperlukan benda untuk berpindah tempat.",
          "Jarak antara posisi awal dan posisi akhir dengan memperhatikan arah.",
          "Selisih antara kecepatan awal dan kecepatan akhir.",
        ],
        answer: 2, // Jawaban C
      },
      {
        q: "Budi berlari berkeliling lapangan bola yang memiliki keliling 400 meter. Jika Budi berlari tepat satu putaran dan kembali ke posisi awal, maka ...",
        options: [
          "Jarak = 0 m, perpindahan = 400 m",
          "Jarak = 400 m, perpindahan = 0 m",
          "Jarak = 400 m, perpindahan = 400 m",
          "Jarak = 0 m, perpindahan = 0 m",
        ],
        answer: 1, // Jawaban b
      },
      {
        q: "Seorang anak bersepeda ke arah selatan sejauh 120 meter, kemudian berbalik arah ke utara menuju sekolah sejauh 40 meter. Jika waktu yang dihabiskan adalah 20 sekon, maka besar kecepatan rata-rata anak tersebut adalah...",
        options: [
          "8 m/s ke arah selatan",
          "8 m/s ke arah utara",
          "4 m/s ke arah utara",
          "4 m/s ke arah selatan",
        ],
        answer: 3, // Jawaban d
      },
      {
        q: "Sebuah bus sekolah menempuh jarak total 150 meter untuk menjemput siswa dalam waktu 25 sekon. Kelajuan bus tersebut adalah …",
        options: ["2 m/s", "4 m/s", "6 m/s", "8 m/s"],
        answer: 2, // Jawaban c
      },
      {
        q: "Perbedaan mendasar antara kelajuan dan kecepatan berdasarkan sifat besarannya adalah...",
        options: [
          "Kelajuan memiliki arah, sedangkan kecepatan tidak memiliki arah.",
          "Kelajuan dihitung berdasarkan perpindahan, sedangkan kecepatan berdasarkan jarak.",
          "Kelajuan adalah besaran skalar, sedangkan kecepatan adalah besaran vektor.",
          "Kelajuan selalu memiliki nilai yang lebih kecil daripada kecepatan.",
        ],
        answer: 2, // Jawaban c
      },
      {
        q: "Besaran yang menyatakan adanya perubahan kecepatan suatu benda, baik menjadi lebih cepat maupun lebih lambat dalam selang waktu tertentu, disebut...",
        options: [
          "Kelajuan rata-rata",
          "Kecepatan tetap",
          "Percepatan",
          "Perpindahan",
        ],
        answer: 2, // Jawaban c
      },
      {
        q: "Sebuah sepeda mula-mula bergerak dengan kecepatan 10 m/s, kemudian pada detik ke-20 kecepatannya menjadi 50 m/s. Besar percepatan yang dialami sepeda tersebut adalah …",
        options: ["2 m/s²", "3 m/s²", "4 m/s²", "5 m/s²"],
        answer: 0, // Jawaban a
      },
      {
        q: "Seorang pelari maraton yang telah melewati garis finis perlahan-lahan mengurangi kecepatannya dari berlari kencang menjadi jalan santai hingga akhirnya berhenti untuk mengatur napas. Berdasarkan konsep percepatan, peristiwa yang dialami pelari setelah melewati garis finis tersebut adalah...",
        options: [
          "Gerak dipercepat karena pelari tersebut masih memiliki energi untuk bergerak.",
          "Gerak dengan kecepatan tetap karena perpindahannya terus bertambah.",
          "Gerak diperlambat karena terjadi perubahan kecepatan yang nilainya negatif.",
          "Gerak semu karena pelari merasa garis finis menjauh darinya.",
        ],
        answer: 2, // Jawaban c
      },
    ];

    // --- 2. STATE (VARIABLE) ---
    let currentIndex = 0;
    const userAnswers = new Array(questions.length).fill(null);
    let lastResultTuntas = false;

    // --- 3. DOM ELEMENTS ---
    const navSoal = document.getElementById("navSoal");
    const questionNumber = document.getElementById("questionNumber");
    const questionText = document.getElementById("questionText");
    const optionsList = document.getElementById("optionsList");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const finishBtn = document.getElementById("finishBtn");
    const timerEl = document.getElementById("timer");

    // --- 4. FUNGSI RENDER NAVIGASI ---
    function renderNav() {
      navSoal.innerHTML = "";
      questions.forEach((_, i) => {
        const btn = document.createElement("button");
        btn.textContent = i + 1;
        // Gunakan class 'kuis-'
        btn.classList.add("kuis-btn-num");

        if (i === currentIndex) {
          btn.classList.add("current");
        } else if (userAnswers[i] !== null) {
          btn.classList.add("answered");
        } 

        btn.addEventListener("click", () => {
          currentIndex = i;
          loadQuestion();
        });

        navSoal.appendChild(btn);
      });
    }

    // --- 5. FUNGSI LOAD SOAL ---
    function loadQuestion() {
      const q = questions[currentIndex];
      questionNumber.textContent = "Nomor " + (currentIndex + 1);
      questionText.textContent = q.q;

      optionsList.innerHTML = ""; // Bersihkan opsi lama

      q.options.forEach((opt, idx) => {
        const li = document.createElement("li");
        const isChecked = userAnswers[currentIndex] === idx;
        const checkedAttr = isChecked ? "checked" : "";

        // Render struktur HTML opsi (menggunakan class 'kuis-')
        li.innerHTML = `
          <label class="kuis-option-label">
            <input type="radio" name="option" value="${idx}" ${checkedAttr}>
            <span class="kuis-radio-indicator"></span>
            <span class="kuis-option-text">${opt}</span>
          </label>
        `;
        optionsList.appendChild(li);
      });

      renderNav();
      
      // Update status tombol prev/next
      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex === questions.length - 1;
      prevBtn.style.opacity = currentIndex === 0 ? "0.5" : "1";
      nextBtn.style.opacity = currentIndex === questions.length - 1 ? "0.5" : "1";
    }

    // --- 6. EVENT LISTENER: PILIH JAWABAN ---
    optionsList.addEventListener("change", function (e) {
      if (e.target.name === "option") {
        userAnswers[currentIndex] = Number(e.target.value);
        renderNav();
      }
    });

    // --- 7. NAVIGASI (PREV/NEXT) ---
    prevBtn.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        loadQuestion();
      }
    });

    nextBtn.addEventListener("click", () => {
      if (currentIndex < questions.length - 1) {
        currentIndex++;
        loadQuestion();
      }
    });

    // --- 8. FUNGSI TAMPILKAN HASIL (SWEETALERT2) ---
    function showSweetAlertResult(tuntas, score, total) {
      lastResultTuntas = tuntas;
      
      let titleText = tuntas ? "Luar Biasa!" : "Belum Tuntas";
      let iconType = tuntas ? "success" : "error";
      // Pesan HTML Custom
      let messageHtml = tuntas 
        ? `Nilai kamu: <b style="font-size: 24px; color: #2ecc71;">${score}/${total}</b><br><br>Kamu hebat! Materi gerak sudah dikuasai. Siap lanjut ke Gaya?`
        : `Nilai kamu: <b style="font-size: 24px; color: #e74c3c;">${score}/${total}</b><br><br>Jangan menyerah! Yuk, pelajari ulang materi Gerak agar lebih paham.`;

      Swal.fire({
        title: titleText,
        html: messageHtml,
        icon: iconType,
        confirmButtonText: tuntas ? 'Lanjut Materi Berikutnya 🚀' : 'Belajar Ulang 📚',
        confirmButtonColor: tuntas ? '#f95c50' : '#65676b',
        allowOutsideClick: false,
        backdrop: `rgba(0,0,123,0.4)`
      }).then((result) => {
        if (result.isConfirmed) {
          if (lastResultTuntas) {
            
            // --- [REVISI] LOCKING SYSTEM ---
            // Simpan status kelulusan ke memori browser agar materi selanjutnya (Gaya) terbuka
            localStorage.setItem('kuis1_completed', 'true');

            // Redirect ke materi Gaya (Ambil URL dari variabel global Blade)
            window.location.href = window.GAYA_PAGE;
          
          } else {
            // Jika belum tuntas, redirect ulang ke materi Gerak
            window.location.href = window.PENGERTIAN_PAGE;
          }
        }
      });
    }

    // --- 9. TOMBOL SELESAI (VALIDASI & KONFIRMASI) ---
    finishBtn.addEventListener("click", () => {
      // Cek apakah ada jawaban kosong
      if (userAnswers.includes(null)) {
        Swal.fire({
          title: 'Belum Selesai!',
          text: 'Masih ada soal yang belum dijawab. Cek nomor yang berwarna putih.',
          icon: 'warning',
          confirmButtonText: 'Oke, saya lengkapi',
          confirmButtonColor: '#f95c50'
        });
        return;
      }

      // Konfirmasi sebelum submit
      Swal.fire({
        title: 'Yakin mau mengumpulkan?',
        text: "Pastikan semua jawaban sudah diperiksa ya!",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#2ecc71',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, Kumpulkan!',
        cancelButtonText: 'Cek lagi'
      }).then((result) => {
        if (result.isConfirmed) {
          // Hitung Skor
          let score = 0;
          questions.forEach((q, i) => {
            if (userAnswers[i] === q.answer) score++;
          });
          // Kriteria ketuntasan (minimal 70% benar)
          const tuntas = score >= Math.ceil(questions.length * 0.7);
          
          // Tampilkan Hasil via SweetAlert
          showSweetAlertResult(tuntas, score, questions.length);
        }
      });
    });

    // --- 10. TIMER ---
    // [PERMINTAAN PENGGUNA]: Biarkan durasi 2 menit (2 * 60)
    let timeLeft = 2 * 60; 
    
    // Simpan interval ke dalam variabel agar bisa dihentikan
    const timerInterval = setInterval(() => {
      const m = Math.floor(timeLeft / 60);
      const s = timeLeft % 60;
      timerEl.textContent = m + ":" + s.toString().padStart(2, "0");
      
      if (timeLeft > 0) {
        timeLeft--;
      } else {
        // STOP TIMER AGAR TIDAK LOOPING
        clearInterval(timerInterval); 

        // Tampilkan Popup Waktu Habis
        Swal.fire({
            title: 'Waktu Habis!',
            text: 'Kuis akan otomatis dikumpulkan.',
            icon: 'info',
            timer: 2000, // Durasi popup muncul (2 detik)
            showConfirmButton: false,
            allowOutsideClick: false
        }).then(() => {
            // Hitung nilai otomatis
            let score = 0;
            questions.forEach((q, i) => { if (userAnswers[i] === q.answer) score++; });
            const tuntas = score >= Math.ceil(questions.length * 0.7);
            
            // Tampilkan Hasil
            showSweetAlertResult(tuntas, score, questions.length);
        });
      }
    }, 1000);

    // --- 11. INITIALIZE ---
    renderNav();
    loadQuestion();
  }
});





// INI MERUPAKAN FILE KUIS 2

document.addEventListener("DOMContentLoaded", function () {
  
  // 1. CEK IDENTITAS HALAMAN (Target ID di Body)
  const halamanKuis2 = document.getElementById("halaman-kuis-2");

  // Jika elemen ini ada, berarti kita sedang di halaman Kuis 2
  if (halamanKuis2) {
    
    // --- 2. DATA SOAL ---
    const questions = [
      { q: "Berdasarkan materi yang telah dipelajari, pengertian gaya adalah...", options: ["Energi yang dimiliki benda agar tetap panas", "Tarikan atau dorongan yang diberikan pada suatu benda", "Sifat benda yang menyebabkannya selalu ingin diam", "Massa benda yang menyebabkan benda jatuh ke bawah"], answer: 1 }, 
      { q: "Seorang pengrajin gerabah menekan sekepal tanah liat hingga menjadi sebuah vas bunga yang cantik. Peristiwa ini merupakan bukti nyata bahwa gaya dapat...", options: ["Mengubah arah gerak benda", "Mengubah bentuk benda", "Mengubah massa benda", "Mengubah benda diam menjadi bergerak"], answer: 1 }, 
      { q: "Seorang pemain bola voli melakukan smash dengan memukul bola yang datang ke arahnya menuju ke area lawan. Berdasarkan konsep gaya, tindakan pemain tersebut bertujuan untuk...", options: ["Menambah gaya gravitasi pada bola", "Mengubah arah gerak bola", "Membuat gaya gesek bola menjadi statis", "Menghilangkan inersia pada bola"], answer: 1 }, 
      { q: "Dua orang kurir sedang berebut mendorong sebuah peti kayu besar di gudang. Kurir A mendorong peti ke arah kanan dengan gaya 75 N, sedangkan Kurir B mendorong peti ke arah kiri dengan gaya 45 N. Berdasarkan aturan arah gaya, apa yang akan terjadi pada peti tersebut?", options: ["Peti tetap diam karena kedua gaya saling meniadakan", "Peti bergerak ke kiri dengan resultan gaya sebesar 120 N", "Peti bergerak ke kanan dengan resultan gaya sebesar 30 N", "Peti bergerak ke kanan dengan resultan gaya sebesar 120 N"], answer: 2 }, 
      { q: "Dalam sebuah video ilustrasi, tiga anak bekerja sama memindahkan kotak. Dua anak mendorong dari belakang dengan gaya F₁ = 25 N dan F₂ = 30 N, sementara satu anak menarik dari depan dengan gaya F₃ = 45 N. Berapakah total resultan gaya yang bekerja pada kotak tersebut?", options: ["10 N", "55 N", "100 N", "15 N"], answer: 2 }, 
      { q: "Mengapa saat kita baru mulai mendorong sebuah lemari pakaian yang berat terasa sangat sulit, namun setelah lemari itu bergeser, dorongan kita terasa sedikit lebih ringan?", options: ["Karena saat diam bekerja gaya gesek statis yang lebih besar dari gaya gesek kinetis", "Karena gaya gravitasi lemari hilang saat benda mulai bergerak", "Karena gaya otot manusia meningkat secara otomatis saat benda meluncur", "Karena gaya pegas lantai membantu mendorong lemari"], answer: 0 }, 
      { q: "Seorang atlet panahan menarik tali busur sehingga busur melengkung, lalu melepaskannya hingga anak panah melesat. Jenis gaya yang bekerja secara berturut-turut pada saat menarik tali dan saat anak panah melesat adalah...", options: ["Gaya gesek dan gaya gravitasi", "Gaya otot dan gaya pegas", "Gaya pegas dan gaya otot", "Gaya otot dan gaya gesek"], answer: 1 }, 
      { q: "Andi sedang berdiri santai di atas bus yang sedang berhenti. Tiba-tiba, sopir bus menginjak gas dan menjalankan bus ke depan secara mendadak. Hal ini menyebabkan tubuh Andi terdorong ke arah belakang. Fenomena ini terjadi karena...", options: ["Tubuh Andi memiliki sifat inersia untuk mempertahankan posisi diamnya", "Ada gaya gravitasi bumi yang menarik Andi ke belakang", "Gaya aksi dari bus lebih kecil daripada gaya reaksi Andi", "Terjadi perubahan massa pada tubuh Andi saat bus bergerak"], answer: 0 }, 
      { q: "Dua buah balok, balok A (2 kg) dan balok B (10 kg), diberikan gaya dorong yang sama besar. Pernyataan yang paling tepat mengenai percepatan kedua balok adalah...", options: ["Balok B bergerak lebih cepat karena massanya besar", "Balok A memiliki percepatan lebih besar karena massanya lebih ringan", "Kedua balok memiliki percepatan yang sama karena gayanya sama", "Balok A tetap diam karena kelembamannya lebih besar"], answer: 1 }, 
      { q: "Saat kamu sedang mendayung perahu di danau, kamu menggerakkan dayung dengan cara mendorong air ke arah belakang (aksi). Akibatnya, perahu akan bergerak maju ke depan (reaksi). Hal ini membuktikan bahwa...", options: ["Gaya gesek air lebih kecil daripada gaya otot tangan", "Gaya gravitasi membantu perahu tetap terapung di permukaan air", "Air memberikan gaya balasan kepada dayung yang besarnya sama namun berlawanan arah", "Resultan gaya pada perahu harus selalu bernilai nol agar dapat bergerak lurus"], answer: 2 }, 
    ];

    // --- 3. STATE ---
    let currentIndex = 0;
    const userAnswers = new Array(questions.length).fill(null);
    let lastResultTuntas = false;

    // --- 4. DOM ELEMENTS (MENGGUNAKAN ID BARU YANG ADA SUFFIX -kuis2) ---
    const navSoal = document.getElementById("navSoal-kuis2");
    const questionNumber = document.getElementById("questionNumber-kuis2");
    const questionText = document.getElementById("questionText-kuis2");
    const optionsList = document.getElementById("optionsList-kuis2");
    const prevBtn = document.getElementById("prevBtn-kuis2");
    const nextBtn = document.getElementById("nextBtn-kuis2");
    const finishBtn = document.getElementById("finishBtn-kuis2");
    const timerEl = document.getElementById("timer-kuis2");

    // --- 5. FUNGSI RENDER NAVIGASI ---
    function renderNav() {
      // Safety check: jika elemen tidak ada, hentikan
      if (!navSoal) return;

      navSoal.innerHTML = "";
      questions.forEach((_, i) => {
        const btn = document.createElement("button");
        btn.textContent = i + 1;
        // Gunakan class CSS yang sesuai: kuis2-btn-num
        btn.classList.add("kuis2-btn-num");

        if (i === currentIndex) {
          btn.classList.add("current");
        } else if (userAnswers[i] !== null) {
          btn.classList.add("answered");
        } 

        btn.addEventListener("click", () => {
          currentIndex = i;
          loadQuestion();
        });

        navSoal.appendChild(btn);
      });
    }

    // --- 6. FUNGSI LOAD SOAL ---
    function loadQuestion() {
      // Safety check
      if (!questionText || !optionsList) return;

      const q = questions[currentIndex];
      questionNumber.textContent = "Nomor " + (currentIndex + 1);
      questionText.textContent = q.q;

      optionsList.innerHTML = ""; 

      q.options.forEach((opt, idx) => {
        const li = document.createElement("li");
        
        const isChecked = userAnswers[currentIndex] === idx;
        const checkedAttr = isChecked ? "checked" : "";

        // Menggunakan class CSS baru: kuis2-option-label, dll
        li.innerHTML = `
          <label class="kuis2-option-label">
            <input type="radio" name="option-kuis2" value="${idx}" ${checkedAttr}>
            <span class="kuis2-radio-indicator"></span>
            <span class="kuis2-option-text">${opt}</span>
          </label>
        `;
        optionsList.appendChild(li);
      });

      renderNav();
      
      // Update tombol Prev/Next
      if (prevBtn) {
        prevBtn.disabled = currentIndex === 0;
        prevBtn.style.opacity = currentIndex === 0 ? "0.5" : "1";
      }
      if (nextBtn) {
        nextBtn.disabled = currentIndex === questions.length - 1;
        nextBtn.style.opacity = currentIndex === questions.length - 1 ? "0.5" : "1";
      }
    }

    // --- 7. EVENT HANDLERS ---
    
    // Saat Opsi Dipilih
    if (optionsList) {
      optionsList.addEventListener("change", function (e) {
        if (e.target.name === "option-kuis2") {
          userAnswers[currentIndex] = Number(e.target.value);
          renderNav();
        }
      });
    }

    // Tombol Prev
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        if (currentIndex > 0) {
          currentIndex--;
          loadQuestion();
        }
      });
    }

    // Tombol Next
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (currentIndex < questions.length - 1) {
          currentIndex++;
          loadQuestion();
        }
      });
    }

    // --- 8. LOGIKA HASIL & POPUP ---
    function showSweetAlertResult(tuntas, score, total) {
      lastResultTuntas = tuntas;
      
      let titleText = tuntas ? "Luar Biasa!" : "Belum Tuntas";
      let iconType = tuntas ? "success" : "error";
      let messageHtml = tuntas 
        ? `Nilai kamu: <b style="font-size: 24px; color: #2ecc71;">${score}/${total}</b><br><br>Selamat! Materi Gaya Selesai.`
        : `Nilai kamu: <b style="font-size: 24px; color: #e74c3c;">${score}/${total}</b><br><br>Nilai belum mencapai target. Yuk, pelajari lagi!`;

      // Mengambil URL dari variabel global Blade
      // Fallback url jika variabel window tidak terbaca
      const urlLulus = window.NEXT_PAGE || "/siswa/dashboard";
      const urlGagal = window.RETRY_PAGE || "/siswa/gaya/pengertiangaya";

      Swal.fire({
        title: titleText,
        html: messageHtml,
        icon: iconType,
        confirmButtonText: tuntas ? 'Lanjut ke Dashboard 🏠' : 'Pelajari Ulang 📚',
        confirmButtonColor: tuntas ? '#2ecc71' : '#65676b',
        allowOutsideClick: false,
        backdrop: `rgba(0,0,123,0.4)`
      }).then((result) => {
        if (result.isConfirmed) {
          if (tuntas) {
             window.location.href = urlLulus;
          } else {
             window.location.href = urlGagal;
          }
        }
      });
    }

    function hitungDanTampilkanNilai() {
      let score = 0;
      questions.forEach((q, i) => {
        if (userAnswers[i] === q.answer) score++;
      });
      // KKM: 70%
      const tuntas = score >= Math.ceil(questions.length * 0.7);
      
      showSweetAlertResult(tuntas, score, questions.length);
    }

    // Tombol Selesai
    if (finishBtn) {
      finishBtn.addEventListener("click", () => {
        // Cek jawaban kosong
        if (userAnswers.includes(null)) {
          Swal.fire({
            title: 'Belum Selesai!',
            text: 'Masih ada soal yang belum dijawab. Cek nomor yang berwarna putih.',
            icon: 'warning',
            confirmButtonText: 'Oke',
            confirmButtonColor: '#f95c50'
          });
          return;
        }

        Swal.fire({
          title: 'Yakin mau mengumpulkan?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Ya, Kumpulkan!',
          cancelButtonText: 'Cek lagi',
          confirmButtonColor: '#2ecc71',
          cancelButtonColor: '#d33'
        }).then((result) => {
          if (result.isConfirmed) {
            hitungDanTampilkanNilai();
          }
        });
      });
    }

    // --- 9. TIMER (10 Menit) ---
    let timeLeft = 2 * 60; 
    const timerInterval = setInterval(() => {
      // Cek apakah elemen timer ada (untuk menghindari error di console)
      if (!timerEl) {
        clearInterval(timerInterval);
        return;
      }

      const m = Math.floor(timeLeft / 60);
      const s = timeLeft % 60;
      timerEl.textContent = m + ":" + s.toString().padStart(2, "0");
      
      if (timeLeft > 0) {
        timeLeft--;
      } else {
        clearInterval(timerInterval); 
        Swal.fire({
            title: 'Waktu Habis!',
            text: 'Kuis akan otomatis dikumpulkan.',
            icon: 'info',
            timer: 2000,
            showConfirmButton: false,
            allowOutsideClick: false
        }).then(() => {
            hitungDanTampilkanNilai();
        });
      }
    }, 1000);

    // --- 10. JALANKAN FUNGSI PERTAMA KALI ---
    renderNav();
    loadQuestion();
  }
});





// INI MERUPAKAN FILE EVALUASI 
/* ============================================================
   LOGIKA EVALUASI AKHIR (GERAK DAN GAYA)
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {
  
  // 1. CEK IDENTITAS HALAMAN (Target ID di Body Evaluasi)
  const halamanEvaluasi = document.getElementById("halaman-evaluasi");

  // Jika elemen ini ada, berarti kita sedang di halaman Evaluasi Akhir
  if (halamanEvaluasi) {
    
    // --- 2. DATA SOAL (20 SOAL) ---
    const questions = [
      { 
        q: "Seorang peserta didik sedang duduk di dalam bus yang melaju meninggalkan terminal. Jika terminal dianggap sebagai titik acuan, maka pernyataan yang benar adalah...", 
        options: ["Bus diam terhadap terminal", "Peserta didik diam terhadap terminal", "Peserta didik bergerak terhadap bus", "Terminal bergerak menjauhi bus (gerak semu)"], 
        answer: 3 // D
      },
      { 
        q: "Saat melakukan perjalanan jauh dengan mobil, Andi melihat deretan tiang listrik di pinggir jalan seolah-olah berlari ke arah belakang mobil. Peristiwa ini membuktikan bahwa...", 
        options: ["Tiang listrik mengalami gerak relatif terhadap bumi", "Terjadi gerak semu karena Andi berada di dalam bingkai acuan yang bergerak", "Mobil Andi diam terhadap tiang listrik", "Kecepatan tiang listrik lebih besar dari kecepatan mobil"], 
        answer: 1 // B
      },
      { 
        q: "Seekor kucing berlari ke arah timur sejauh 9 meter, kemudian berbalik arah ke barat sejauh 4 meter. Total jarak dan besar perpindahan kucing tersebut secara berturut-turut adalah...", 
        options: ["13 meter dan 5 meter", "13 meter dan 13 meter", "5 meter dan 13 meter", "5 meter dan 5 meter"], 
        answer: 0 // A
      },
      { 
        q: "Seorang pelari maraton menempuh lintasan lari yang berbentuk lingkaran dengan keliling 400 meter. Jika ia berhasil menyelesaikan tepat 2 putaran dan kembali ke posisi start, maka...", 
        options: ["Jarak yang ditempuh adalah 0 meter", "Perpindahannya adalah 800 meter", "Jarak yang ditempuh 800 meter dan perpindahannya 0 meter", "Pelari tersebut tidak mengalami gerak karena kembali ke awal"], 
        answer: 2 // C
      },
      { 
        q: "Perbedaan utama yang menjadikan kecepatan sebagai besaran vektor, sedangkan kelajuan sebagai besaran skalar adalah...", 
        options: ["Kecepatan hanya memiliki nilai tanpa arah", "Kecepatan sangat bergantung pada arah perpindahan benda", "Kelajuan dihitung berdasarkan posisi awal dan akhir saja", "Kelajuan selalu bernilai negatif jika benda berbalik arah"], 
        answer: 1 // B
      },
      { 
        q: "Sebuah motor bergerak dengan kecepatan tetap 20 m/s ke arah utara selama 10 sekon. Besar perpindahan yang dialami motor tersebut adalah...", 
        options: ["2 meter ke arah utara", "30 meter ke arah utara", "200 meter ke arah utara", "200 meter ke arah selatan"], 
        answer: 2 // C
      },
      { 
        q: "Perhatikan fenomena berikut:\n(1) Buah kelapa jatuh dari pohonnya ke tanah.\n(2) Mobil yang sedang melaju kencang tiba-tiba direm hingga berhenti.\n(3) Pesawat lepas landas hingga mencapai ketinggian tertentu.\n\nPeristiwa yang menunjukkan terjadinya percepatan positif (gerak dipercepat) ditunjukkan oleh nomor...", 
        options: ["(1) dan (2)", "(1) dan (3)", "(2) dan (3)", "(1), (2), dan (3)"], 
        answer: 1 // B
      },
      { 
        q: "Sebuah sepeda yang awalnya bergerak dengan kecepatan 2 m/s dipercepat hingga kecepatannya menjadi 10 m/s dalam waktu 4 sekon. Besar percepatan sepeda tersebut adalah...", 
        options: ["2 m/s²", "4 m/s²", "8 m/s²", "12 m/s²"], 
        answer: 0 // A
      },
      { 
        q: "Manakah dari peristiwa berikut yang merupakan pengaruh gaya terhadap perubahan bentuk benda?", 
        options: ["Menepis bola voli yang sedang melambung", "Mengerem sepeda saat mendekati lampu merah", "Menekan kaleng minuman bekas hingga penyok", "Menendang bola hingga menggelinding jauh"], 
        answer: 2 // C
      },
      { 
        q: "Dua orang anak, Rian dan Dino, sedang mendorong lemari kayu. Rian mendorong ke kanan dengan gaya 50 N, sedangkan Dino menarik dari arah berlawanan (ke arah kiri) dengan gaya 30 N. Resultan gaya yang bekerja pada lemari adalah...", 
        options: ["80 N ke arah kanan", "20 N ke arah kanan", "20 N ke arah kiri", "0 N (lemari diam)"], 
        answer: 1 // B
      },
      { 
        q: "Tiga buah gaya bekerja pada sebuah kotak: ke kanan, ke kanan, dan ke kiri. Keadaan kotak tersebut adalah...", 
        options: ["Bergerak ke kanan dengan gaya 80 N", "Bergerak ke kiri dengan gaya 10 N", "Tetap diam karena resultan gayanya nol", "Bergerak ke kanan dengan gaya 40 N"], 
        answer: 2 // C
      },
      { 
        q: "Mengapa lantai di gedung olahraga sering kali memiliki permukaan yang agak kasar atau menggunakan sepatu beralas karet bagi pemainnya?", 
        options: ["Untuk memperkecil gaya gesek agar pemain mudah terpeleset", "Untuk memperbesar gaya gesek agar pemain tidak mudah jatuh saat berlari", "Agar gaya gravitasi bumi terhadap pemain berkurang", "Untuk mengubah gaya gesek kinetis menjadi gaya pegas"], 
        answer: 1 // B
      },
      { 
        q: "Seorang pemanah menarik tali busur sehingga melengkung sebelum melepaskan anak panah. Gaya yang menyebabkan anak panah tersebut melesat ke depan adalah...", 
        options: ["Gaya Otot", "Gaya Gesek", "Gaya Pegas", "Gaya Gravitasi"], 
        answer: 2 // C
      },
      { 
        q: "Berdasarkan Hukum I Newton, jika sebuah kertas di bawah gelas ditarik secara sangat cepat dan mendatar, maka gelas akan tetap diam di posisinya. Hal ini terjadi karena...", 
        options: ["Gelas memiliki sifat inersia (kelembaman)", "Gaya tarik kertas lebih kecil dari gaya berat gelas", "Terjadi gaya aksi-reaksi antara gelas dan kertas", "Gelas mengalami percepatan yang sangat tinggi"], 
        answer: 0 // A
      },
      { 
        q: "Perhatikan dua buah benda: Benda A massanya 5 kg dan Benda B massanya 20 kg. Jika keduanya diberi gaya dorong yang sama besar, maka...", 
        options: ["Benda B akan melaju lebih cepat karena massanya besar", "Benda A akan memiliki percepatan lebih besar karena massanya kecil", "Percepatan kedua benda akan sama karena gayanya sama", "Benda A akan sulit bergerak karena kelembamannya kecil"], 
        answer: 1 // B
      },
      { 
        q: "Sebuah balok bermassa 2 kg diberi gaya sebesar 10 N. Besar percepatan yang dialami balok tersebut adalah...", 
        options: ["0,2 m/s²", "5 m/s²", "12 m/s²", "20 m/s²"], 
        answer: 1 // B
      },
      { 
        q: "Contoh penerapan Hukum III Newton (Aksi-Reaksi) yang benar dalam kehidupan sehari-hari adalah...", 
        options: ["Tubuh terdorong ke depan saat bus direm mendadak", "Meja tetap diam meskipun tidak ada yang menyentuhnya", "Tangan terasa sakit saat memukul tembok dengan keras", "Kelereng berhenti menggelinding karena gesekan lantai"], 
        answer: 2 // C
      },
      { 
        q: "Saat kita mendayung perahu, kita mendorong air ke arah belakang menggunakan dayung. Akibatnya, perahu bergerak maju ke depan. Hal ini menunjukkan bahwa...", 
        options: ["Gaya aksi (dorongan air ke belakang) menghasilkan gaya reaksi (perahu maju ke depan)", "Perahu bergerak karena gaya gravitasi air lebih besar", "Dayung menghilangkan gaya gesek antara perahu dan air", "Resultan gaya pada perahu selalu nol saat mendayung"], 
        answer: 0 // A
      },
      { 
        q: "Seorang anak melempar bola kasti ke arah tembok. Bola tersebut memantul kembali ke arah anak tersebut. Pasangan aksi-reaksi pada peristiwa ini adalah...", 
        options: ["Berat bola dan gaya tarik bumi", "Gaya dorong bola ke tembok dan gaya dorong balik tembok ke bola", "Gaya gesek udara dan kecepatan bola", "Kecepatan bola saat dilempar dan saat memantul"], 
        answer: 1 // B
      },
      { 
        q: "Sebuah mobil mula-mula diam, kemudian digas sehingga bergerak dengan percepatan 2 m/s². Jika massa mobil adalah 1.000 kg, maka besar gaya mesin yang bekerja pada mobil tersebut adalah...", 
        options: ["500 N", "1.002 N", "2.000 N", "2.000 m/s"], 
        answer: 2 // C
      }
    ];

    // --- 3. STATE ---
    let currentIndex = 0;
    const userAnswers = new Array(questions.length).fill(null);
    const scorePerSoal = 5; // Bobot per soal

    // --- 4. DOM ELEMENTS (ID dengan suffix -evaluasi) ---
    const navSoal = document.getElementById("navSoal-evaluasi");
    const questionNumber = document.getElementById("questionNumber-evaluasi");
    const questionText = document.getElementById("questionText-evaluasi");
    const optionsList = document.getElementById("optionsList-evaluasi");
    const prevBtn = document.getElementById("prevBtn-evaluasi");
    const nextBtn = document.getElementById("nextBtn-evaluasi");
    const finishBtn = document.getElementById("finishBtn-evaluasi");
    const timerEl = document.getElementById("timer-evaluasi");

    // --- 5. FUNGSI RENDER NAVIGASI ---
    function renderNav() {
      if (!navSoal) return;

      navSoal.innerHTML = "";
      questions.forEach((_, i) => {
        const btn = document.createElement("button");
        btn.textContent = i + 1;
        // Gunakan class evaluasi-btn-num
        btn.classList.add("evaluasi-btn-num");

        if (i === currentIndex) {
          btn.classList.add("current");
        } else if (userAnswers[i] !== null) {
          btn.classList.add("answered");
        } 

        btn.addEventListener("click", () => {
          currentIndex = i;
          loadQuestion();
        });

        navSoal.appendChild(btn);
      });
    }

    // --- 6. FUNGSI LOAD SOAL ---
    function loadQuestion() {
      if (!questionText || !optionsList) return;

      const q = questions[currentIndex];
      questionNumber.textContent = "Nomor " + (currentIndex + 1);
      
      // Mengubah \n menjadi <br> agar baris baru terbaca di HTML
      questionText.innerHTML = q.q.replace(/\n/g, "<br>");

      optionsList.innerHTML = ""; 

      q.options.forEach((opt, idx) => {
        const li = document.createElement("li");
        
        const isChecked = userAnswers[currentIndex] === idx;
        const checkedAttr = isChecked ? "checked" : "";

        // Gunakan class evaluasi-option-label
        li.innerHTML = `
          <label class="evaluasi-option-label">
            <input type="radio" name="option-evaluasi" value="${idx}" ${checkedAttr}>
            <span class="evaluasi-radio-indicator"></span>
            <span class="evaluasi-option-text">${opt}</span>
          </label>
        `;
        optionsList.appendChild(li);
      });

      renderNav();
      
      // Update tombol Prev/Next
      if (prevBtn) {
        prevBtn.disabled = currentIndex === 0;
        prevBtn.style.opacity = currentIndex === 0 ? "0.5" : "1";
      }
      if (nextBtn) {
        nextBtn.disabled = currentIndex === questions.length - 1;
        nextBtn.style.opacity = currentIndex === questions.length - 1 ? "0.5" : "1";
      }
    }

    // --- 7. EVENT HANDLERS ---
    
    // Saat Opsi Dipilih
    if (optionsList) {
      optionsList.addEventListener("change", function (e) {
        if (e.target.name === "option-evaluasi") {
          userAnswers[currentIndex] = Number(e.target.value);
          renderNav();
        }
      });
    }

    // Tombol Prev
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        if (currentIndex > 0) {
          currentIndex--;
          loadQuestion();
        }
      });
    }

    // Tombol Next
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (currentIndex < questions.length - 1) {
          currentIndex++;
          loadQuestion();
        }
      });
    }

    // --- 8. LOGIKA HASIL (Hanya Tampilkan Nilai) ---
    function tampilkanHasilAkhir(score, totalScore) {
      
      // URL redirect (misal: kembali ke Dashboard/Beranda)
      const urlKeluar = window.EXIT_PAGE || "/"; 

      // WARNA DISESUAIKAN DENGAN CSS: #ff6b01 (Deep Orange)
      Swal.fire({
        title: "Evaluasi Selesai!",
        html: `
          <div style="font-size: 1.1rem; margin-bottom: 10px;">Skor Akhir Kamu:</div>
          <div style="font-size: 3rem; font-weight: bold; color: #ff6b01;">${score}</div>
          <div style="font-size: 0.9rem; color: #666;">dari total ${totalScore} poin</div>
        `,
        icon: "info",
        confirmButtonText: "Kembali ke Beranda 🏠",
        confirmButtonColor: "#ff6b01", // Update warna tombol jadi Orange
        allowOutsideClick: false,
        backdrop: `rgba(0,0,0,0.5)`
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = urlKeluar;
        }
      });
    }

    function hitungNilai() {
      let jumlahBenar = 0;
      questions.forEach((q, i) => {
        if (userAnswers[i] === q.answer) jumlahBenar++;
      });

      // Hitung skor (Benar * 5)
      const finalScore = jumlahBenar * scorePerSoal;
      const maxScore = questions.length * scorePerSoal; // Seharusnya 100

      tampilkanHasilAkhir(finalScore, maxScore);
    }

    // Tombol Selesai
    if (finishBtn) {
      finishBtn.addEventListener("click", () => {
        // Cek jawaban kosong
        if (userAnswers.includes(null)) {
          Swal.fire({
            title: 'Belum Selesai!',
            text: 'Masih ada soal yang belum dijawab. Cek nomor yang berwarna putih.',
            icon: 'warning',
            confirmButtonText: 'Oke',
            confirmButtonColor: '#f95c50' // Orange standard
          });
          return;
        }

        Swal.fire({
          title: 'Yakin mau mengumpulkan?',
          text: 'Jawaban yang sudah dikirim tidak dapat diubah.',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Ya, Kumpulkan!',
          cancelButtonText: 'Cek lagi',
          confirmButtonColor: '#2ecc71', // Hijau (Positif)
          cancelButtonColor: '#d33' // Merah (Batal)
        }).then((result) => {
          if (result.isConfirmed) {
            clearInterval(timerInterval); // Hentikan timer
            hitungNilai();
          }
        });
      });
    }

    // --- 9. TIMER (45 Menit) ---
    let timeLeft = 10 * 60; // 45 menit dalam detik
    
    const timerInterval = setInterval(() => {
      if (!timerEl) {
        clearInterval(timerInterval);
        return;
      }

      const m = Math.floor(timeLeft / 60);
      const s = timeLeft % 60;
      timerEl.textContent = m + ":" + s.toString().padStart(2, "0");
      
      if (timeLeft > 0) {
        timeLeft--;
      } else {
        clearInterval(timerInterval); 
        Swal.fire({
            title: 'Waktu Habis!',
            text: 'Jawaban akan otomatis dikumpulkan.',
            icon: 'info',
            timer: 3000,
            showConfirmButton: false,
            allowOutsideClick: false
        }).then(() => {
            hitungNilai();
        });
      }
    }, 1000);

    // --- 10. JALANKAN FUNGSI PERTAMA KALI ---
    renderNav();
    loadQuestion();
  }
});