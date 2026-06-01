// INI MERUPAKAN FILE JS GLOBAL (DIGUNAKAN DI SEMUA HALAMAN via siswa.blade.php)

// =========================================================================
// FUNGSI BARU: MENYIMPAN PROGRES KE DATABASE (DIBUAT JADI GLOBAL)
// =========================================================================
window.simpanProgresKeDatabase = function (kodeMateri) {
    const csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        ?.getAttribute("content");

    if (!csrfToken) {
        console.error(
            "CSRF Token tidak ditemukan. Data tidak bisa disimpan ke database.",
        );
        return;
    }

    fetch("/simpan-progres", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
        },
        body: JSON.stringify({ kode_materi: kodeMateri }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data.message);
        })
        .catch((error) => {
            console.error("Error saat menyimpan progres:", error);
        });
};

// =========================================================================
// FUNGSI KONFIRMASI LOGOUT DENGAN SWEETALERT2
// =========================================================================
window.konfirmasiKeluar = function () {
    Swal.fire({
        title: "Apakah kamu yakin?",
        text: "Kamu akan keluar dari akun ini.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#f95c50",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Ya, Keluar!",
        cancelButtonText: "Batal",
    }).then((result) => {
        if (result.isConfirmed) {
            document.getElementById("form-logout").submit();
        }
    });
};

// --- HELPER FUNCTION: UNTUK MEMBUKA SIDEBAR (DIBUAT GLOBAL) ---
window.unlockSidebar = function (elementId) {
    const el = document.getElementById(elementId);
    if (el) {
        el.classList.remove("locked");
        const icon = el.querySelector(".fa-lock");
        if (icon) icon.remove();
    }
};

// --- HELPER FUNCTION: UNTUK MEMBUKA TOMBOL NEXT (DIBUAT GLOBAL) ---
window.unlockNextButtonIfPage = function (pageKeyword) {
    const path = window.location.pathname;
    if (path.includes(pageKeyword)) {
        const btn = document.getElementById("btn-next-materi");
        if (btn) btn.classList.remove("locked");
    }
};

// =========================================================================
// DOM CONTENT LOADED UTAMA
// =========================================================================
document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;

    // =========================================================================
    // 1. FUNGSI CEK MEMORI UNTUK MEMBUKA GEMBOK (MENGGUNAKAN DATABASE)
    // =========================================================================

    function isLulus(kodeMateri) {
        return window.progresSiswa && window.progresSiswa.includes(kodeMateri);
    }

    function checkAllLocks() {
        // --- BAGIAN A: MODUL GERAK ---
        if (isLulus("pengertiangerak_completed")) {
            window.unlockSidebar("nav-jarak");
            window.unlockNextButtonIfPage("pengertiangerak");
        }
        if (isLulus("jarak_completed")) {
            window.unlockSidebar("nav-kelajuan");
            window.unlockNextButtonIfPage("jaraktempuhdanperpindahan");
        }
        if (isLulus("kelajuan_completed")) {
            window.unlockSidebar("nav-percepatan");
            window.unlockNextButtonIfPage("kelajuandankecepatan");
        }
        if (isLulus("percepatan_completed")) {
            window.unlockSidebar("nav-kuis1");
            window.unlockNextButtonIfPage("percepatan");
        }

        // --- BAGIAN B: MODUL GAYA ---
        if (isLulus("kuis1_completed")) {
            window.unlockSidebar("nav-gaya-header");
            window.unlockSidebar("nav-pengantar-gaya");
            window.unlockSidebar("nav-pengertian-gaya");
        }
        if (isLulus("pengertiangaya_completed")) {
            window.unlockSidebar("nav-resultan-gaya");
            window.unlockNextButtonIfPage("pengertiangaya");
        }
        if (isLulus("resultangaya_completed")) {
            window.unlockSidebar("nav-macam-gaya");
            window.unlockNextButtonIfPage("resultangaya");
        }
        if (isLulus("macamgaya_completed")) {
            window.unlockSidebar("nav-newton");
            window.unlockNextButtonIfPage("macam-macamgaya");
        }
        if (isLulus("hukumnewton_completed")) {
            window.unlockSidebar("nav-kuis2");
            window.unlockNextButtonIfPage("hukumnewton");
        }

        // --- BAGIAN C: EVALUASI ---
        if (isLulus("kuis2_completed")) {
            window.unlockSidebar("nav-evaluasi");
        }
    }

    checkAllLocks();

    // =========================================================================
    // 2. SIDEBAR TOGGLE LOGIC & LAIN-LAIN
    // =========================================================================

    const toggleItems = document.querySelectorAll(".menu-item.has-toggle");
    toggleItems.forEach((item) => {
        item.addEventListener("click", () => {
            if (item.classList.contains("locked")) return;
            const targetId = item.dataset.target;
            const submenu = document.getElementById(targetId);
            if (!submenu) return;

            if (!submenu.classList.contains("open")) {
                submenu.classList.add("open");
                item.classList.add("active");
            } else {
                submenu.classList.remove("open");
                item.classList.remove("active");
            }
        });
    });

    if (path.includes("/siswa/gerak")) {
        const submenu = document.getElementById("gerak");
        const header = document.querySelector(
            '.menu-item.has-toggle[data-target="gerak"]',
        );
        if (submenu) submenu.classList.add("open");
        if (header) header.classList.add("active");
    }
    if (path.includes("/siswa/gaya")) {
        const submenu = document.getElementById("gaya");
        const header = document.querySelector(
            '.menu-item.has-toggle[data-target="gaya"]',
        );
        if (submenu) submenu.classList.add("open");
        if (header) header.classList.add("active");
    }

    document.querySelector("body").addEventListener("click", function (e) {
        const lockedItem = e.target.closest(".locked");
        if (lockedItem) {
            e.preventDefault();
            Swal.fire({
                icon: "warning",
                title: "Akses Terkunci",
                text: "Selesaikan materi atau kuis sebelumnya untuk membuka bagian ini!",
                confirmButtonText: "Oke, Siap!",
                confirmButtonColor: "#f95c50",
            });
        }
    });

    window.toggleDropdown = function () {
        document.getElementById("dropdownMenu").classList.toggle("show");
    };

    window.onclick = function (event) {
        if (!event.target.matches(".user-greeting")) {
            const dropdowns =
                document.getElementsByClassName("dropdown-logout");
            for (let i = 0; i < dropdowns.length; i++) {
                const openDropdown = dropdowns[i];
                if (openDropdown.classList.contains("show"))
                    openDropdown.classList.remove("show");
            }
        }
    };

    // =========================================================================
    // 3. LOGIKA SPESIFIK: HALAMAN PENGERTIAN GERAK (DRAG & DROP)
    // =========================================================================

    async function generatePDFPengertianGerak(action = "download") {
        const { jsPDF } = window.jspdf;
        if (!jsPDF) {
            if (action === "download") alert("Library PDF belum siap.");
            return;
        }

        try {
            const doc = new jsPDF("p", "mm", "a4");
            const pageWidth = doc.internal.pageSize.getWidth();
            let yPos = 0;

            doc.setFillColor(249, 92, 80);
            doc.rect(0, 0, pageWidth, 40, "F");
            doc.setTextColor(255, 255, 255);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(22);
            doc.text("Laporan Hasil Latihan", pageWidth / 2, 20, {
                align: "center",
            });
            doc.setFontSize(12);
            doc.setFont("helvetica", "normal");
            doc.text("Materi: Pengertian Gerak", pageWidth / 2, 28, {
                align: "center",
            });

            yPos = 55;
            doc.setTextColor(80, 80, 80);
            doc.setFontSize(9);
            doc.setFont("helvetica", "italic");
            const tgl = new Date().toLocaleDateString("id-ID", {
                dateStyle: "full",
            });
            doc.text(`Tanggal Pengerjaan: ${tgl}`, 20, yPos);
            yPos += 10;

            doc.setFont("helvetica", "normal");
            doc.setFontSize(11);
            doc.setTextColor(0, 0, 0);

            doc.text(
                "Hasil Klasifikasi Gerak Semu dan Gerak Relatif:",
                20,
                yPos,
            );
            yPos += 10;

            // GERAK SEMU
            doc.setFont("helvetica", "bold");
            doc.text("A. Gerak Semu", 20, yPos);
            yPos += 8;
            doc.setFont("helvetica", "normal");

            const semuCards = document.querySelectorAll(
                "#drop-semu .card-item",
            );
            if (semuCards.length === 0) {
                doc.text("- Kosong", 25, yPos);
                yPos += 8;
            } else {
                semuCards.forEach((card, index) => {
                    const text = `${index + 1}. ${card.innerText.trim()}`;
                    const splitText = doc.splitTextToSize(text, pageWidth - 40);
                    doc.text(splitText, 25, yPos);
                    yPos += splitText.length * 6 + 2;
                });
            }

            yPos += 5;

            // GERAK RELATIF
            doc.setFont("helvetica", "bold");
            doc.text("B. Gerak Relatif", 20, yPos);
            yPos += 8;
            doc.setFont("helvetica", "normal");

            const relatifCards = document.querySelectorAll(
                "#drop-relatif .card-item",
            );
            if (relatifCards.length === 0) {
                doc.text("- Kosong", 25, yPos);
                yPos += 8;
            } else {
                relatifCards.forEach((card, index) => {
                    const text = `${index + 1}. ${card.innerText.trim()}`;
                    const splitText = doc.splitTextToSize(text, pageWidth - 40);
                    doc.text(splitText, 25, yPos);
                    yPos += splitText.length * 6 + 2;
                });
            }

            yPos += 15;

            // Kalkulasi Hasil
            let countBenar = 0;
            let countSalah = 0;
            let countKosong = 0;

            const allCards = document.querySelectorAll(".card-item");
            allCards.forEach((card) => {
                const kunci = card.dataset.answer;
                const parentType = card.parentElement.dataset.type;
                if (parentType === kunci) countBenar++;
                else if (parentType === "pool") countKosong++;
                else countSalah++;
            });

            doc.setFont("helvetica", "bold");
            doc.setTextColor(0, 0, 0);
            const summaryText = `Ringkasan: Benar: ${countBenar}  |  Salah: ${countSalah}  |  Belum Dijawab: ${countKosong}`;

            doc.setDrawColor(0, 0, 0);
            doc.setFillColor(255, 255, 255);
            doc.roundedRect(20, yPos, pageWidth - 40, 10, 1, 1, "S");
            doc.text(summaryText, pageWidth / 2, yPos + 7, { align: "center" });

            yPos += 20;
            doc.setFontSize(9);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(150, 150, 150);
            doc.text("Pengertian Gerak", pageWidth / 2, yPos, {
                align: "center",
            });

            // LOGIKA PENCABANGAN: DOWNLOAD vs UPLOAD KE SERVER
            if (action === "download") {
                doc.save("Laporan_Latihan_Pengertian_Gerak.pdf");
            } else if (action === "upload") {
                const pdfBlob = doc.output("blob");
                const formData = new FormData();
                formData.append("kode_materi", "pengertian_gerak");
                formData.append("file_pdf", pdfBlob, "pengertian_gerak.pdf");

                const csrfToken = document
                    .querySelector('meta[name="csrf-token"]')
                    ?.getAttribute("content");

                fetch("/siswa/simpan-pdf-latihan", {
                    method: "POST",
                    headers: {
                        "X-CSRF-TOKEN": csrfToken,
                    },
                    body: formData,
                })
                    .then((response) => response.json())
                    .then((data) =>
                        console.log(
                            "Auto-save PDF Pengertian Gerak sukses:",
                            data,
                        ),
                    )
                    .catch((error) =>
                        console.error("Auto-save PDF error:", error),
                    );
            }
        } catch (err) {
            console.error(err);
            if (action === "download") alert("Gagal membuat PDF.");
        }
    }

    const cards = document.querySelectorAll(".card-item");
    if (cards.length > 0) {
        const zones = document.querySelectorAll(".drop-zone, #card-pool");
        const cardPool = document.getElementById("card-pool");
        const btnCheck = document.getElementById("btn-check");
        const btnRetry = document.getElementById("btn-retry-pengertiangerak");
        const btnUnduhPengertian = document.getElementById(
            "btn-unduh-pengertiangerak",
        );
        const STORAGE_KEY = "pengertiangerak_completed";
        let draggedId = null;

        cards.forEach((card) => {
            card.addEventListener("dragstart", function (e) {
                draggedId = this.id;
                e.dataTransfer.setData("text/plain", this.id);
                setTimeout(() => (this.style.opacity = "0.5"), 0);
            });
            card.addEventListener("dragend", function () {
                this.style.opacity = "1";
                draggedId = null;
            });
        });

        zones.forEach((zone) => {
            zone.addEventListener("dragover", (e) => {
                e.preventDefault();
                zone.classList.add("over");
            });
            zone.addEventListener("dragleave", () =>
                zone.classList.remove("over"),
            );
            zone.addEventListener("drop", (e) => {
                e.preventDefault();
                zone.classList.remove("over");
                const id = e.dataTransfer.getData("text/plain") || draggedId;
                const card = document.getElementById(id);
                if (card) {
                    zone.appendChild(card);
                    card.classList.remove("correct", "incorrect");
                }
            });
        });

        if (btnCheck) {
            btnCheck.addEventListener("click", function () {
                let benar = 0;
                const total = cards.length;
                cards.forEach((card) => {
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
                    window.progresSiswa = window.progresSiswa || [];
                    if (!window.progresSiswa.includes(STORAGE_KEY)) {
                        window.progresSiswa.push(STORAGE_KEY);
                    }
                    window.simpanProgresKeDatabase(STORAGE_KEY);

                    // Memunculkan tombol unduh & Generate PDF ke server
                    if (btnUnduhPengertian)
                        btnUnduhPengertian.style.display = "inline-block";
                    generatePDFPengertianGerak("upload");

                    Swal.fire({
                        title: "Luar Biasa!",
                        text: "Semua jawaban benar. Materi selanjutnya telah terbuka!",
                        icon: "success",
                        confirmButtonText: "Lanjut",
                        confirmButtonColor: "#2ecc71",
                    }).then(() => checkAllLocks());
                    if (btnRetry) btnRetry.classList.add("hidden");
                } else {
                    Swal.fire({
                        title: "Masih Ada yang Kurang Tepat",
                        text: `Kamu baru benar ${benar} dari ${total}.`,
                        icon: "error",
                        confirmButtonText: "Perbaiki",
                        confirmButtonColor: "#f95c50",
                    });
                    if (btnRetry) btnRetry.classList.remove("hidden");
                }
            });
        }

        if (btnRetry) {
            btnRetry.addEventListener("click", function () {
                cards.forEach((card) => {
                    cardPool.appendChild(card);
                    card.classList.remove("correct", "incorrect");
                });
                this.classList.add("hidden");
            });
        }

        if (btnUnduhPengertian) {
            btnUnduhPengertian.addEventListener("click", async () => {
                const originalText = btnUnduhPengertian.innerHTML;
                btnUnduhPengertian.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Memproses...`;
                btnUnduhPengertian.disabled = true;

                await generatePDFPengertianGerak("download");

                btnUnduhPengertian.innerHTML = originalText;
                btnUnduhPengertian.disabled = false;
            });
        }
    }
});

// INI MERUPAKAN FILE JARAK TEMPUH DAN PERPINDAHAN
document.addEventListener("DOMContentLoaded", () => {
    // =========================================================================
    // 0. FUNGSI CEK MEMORI UNTUK MEMBUKA GEMBOK
    // =========================================================================
    function checkAllLocks() {
        const path = window.location.pathname;

        function isLulus(kodeMateri) {
            return (
                window.progresSiswa && window.progresSiswa.includes(kodeMateri)
            );
        }

        // 1. Kelulusan Materi Pengertian Gerak
        if (isLulus("pengertiangerak_completed")) {
            const navJarak = document.getElementById("nav-jarak");
            if (navJarak) {
                navJarak.classList.remove("locked");
                const lockIcon = navJarak.querySelector(".fa-lock");
                if (lockIcon) lockIcon.remove();
            }
            if (path.includes("pengertiangerak")) {
                const btnNextMateri =
                    document.getElementById("btn-next-materi");
                if (btnNextMateri) btnNextMateri.classList.remove("locked");
            }
        }

        // 2. Kelulusan Materi Jarak Tempuh dan Perpindahan
        if (isLulus("jarak_completed")) {
            const navKelajuan = document.getElementById("nav-kelajuan");
            if (navKelajuan) {
                navKelajuan.classList.remove("locked");
                const lockIcon = navKelajuan.querySelector(".fa-lock");
                if (lockIcon) lockIcon.remove();
            }
            if (path.includes("jaraktempuhdanperpindahan")) {
                const btnNextMateri =
                    document.getElementById("btn-next-materi");
                if (btnNextMateri) btnNextMateri.classList.remove("locked");
            }
        }

        // 3. Kelulusan Materi Kelajuan dan Kecepatan
        if (isLulus("kelajuan_completed")) {
            const navPercepatan = document.getElementById("nav-percepatan");
            if (navPercepatan) {
                navPercepatan.classList.remove("locked");
                const lockIcon = navPercepatan.querySelector(".fa-lock");
                if (lockIcon) lockIcon.remove();
            }
            if (path.includes("kelajuandankecepatan")) {
                const btnNextMateri =
                    document.getElementById("btn-next-materi");
                if (btnNextMateri) btnNextMateri.classList.remove("locked");
            }
        }

        // 4. Kelulusan Materi Percepatan
        if (isLulus("percepatan_completed")) {
            const navKuis1 = document.getElementById("nav-kuis1");
            if (navKuis1) {
                navKuis1.classList.remove("locked");
                const lockIcon = navKuis1.querySelector(".fa-lock");
                if (lockIcon) lockIcon.remove();
            }
            if (path.includes("percepatan")) {
                const btnNextMateri =
                    document.getElementById("btn-next-materi");
                if (btnNextMateri) btnNextMateri.classList.remove("locked");
            }
        }
    }

    checkAllLocks();

    // =========================================================================
    // 1. LOGIKA ANIMASI GERAK MOBIL
    // =========================================================================
    const posA = 0;
    const posB = 4;
    const posC = 10;

    const segments = [
        { from: posA, to: posB, distance: 4, label: "A → B" },
        { from: posB, to: posC, distance: 6, label: "B → C" },
        { from: posC, to: posB, distance: 6, label: "C → B" },
    ];

    const car = document.getElementById("car");
    const btnStart = document.getElementById("btn-start");
    const btnReset = document.getElementById("btn-reset");
    const btnLanjutKuis = document.getElementById("btn-lanjut-kuis");

    const closeModal = document.getElementById("close-modal");
    const resultModal = document.getElementById("result-modal");

    const road = document.querySelector(".anim-road");
    const roadLeft = 40;
    const startPos = posA;

    if (car && road) {
        const roadWidth = () => road.clientWidth;

        let totalDistance = 0;
        let currentSegmentIndex = 0;
        let currentSegmentStartTime = null;
        let running = false;

        const speedKmPerSec = 2.0;

        function kmToPx(km) {
            const roadPixelWidth = roadWidth();
            const totalKmSpan = posC - posA;
            const usableWidth = roadPixelWidth - car.clientWidth;
            const ratio = usableWidth / totalKmSpan;
            return roadLeft + km * ratio;
        }

        function setCarPosition(kmPos) {
            car.style.left = kmToPx(kmPos) + "px";
        }

        function resetAnimation() {
            totalDistance = 0;
            currentSegmentIndex = 0;
            currentSegmentStartTime = null;
            running = false;
            setCarPosition(startPos);
            if (btnStart) btnStart.disabled = false;
            if (btnLanjutKuis) btnLanjutKuis.style.display = "none";
        }

        function step(timestamp) {
            if (!running) return;

            const seg = segments[currentSegmentIndex];
            if (!currentSegmentStartTime) {
                currentSegmentStartTime = timestamp;
            }

            const elapsed = (timestamp - currentSegmentStartTime) / 1000;
            const duration = seg.distance / speedKmPerSec;
            let t = elapsed / duration;

            if (t >= 1) t = 1;

            const kmPos = seg.from + (seg.to - seg.from) * t;
            setCarPosition(kmPos);

            const distanceBeforeSeg = segments
                .slice(0, currentSegmentIndex)
                .reduce((acc, s) => acc + s.distance, 0);
            const travelledInSeg = seg.distance * t;
            totalDistance = distanceBeforeSeg + travelledInSeg;

            if (t < 1) {
                requestAnimationFrame(step);
            } else {
                currentSegmentIndex++;
                currentSegmentStartTime = null;

                if (currentSegmentIndex < segments.length) {
                    requestAnimationFrame(step);
                } else {
                    running = false;
                    btnStart.disabled = false;

                    const totalDistanceAll = segments.reduce(
                        (a, s) => a + s.distance,
                        0,
                    );
                    const finalDisplacement = Math.abs(
                        segments[segments.length - 1].to - startPos,
                    );

                    window.finalSummary = {
                        jarak: totalDistanceAll,
                        perpindahan: finalDisplacement,
                    };

                    setTimeout(() => {
                        if (typeof showQuiz === "function") {
                            showQuiz();
                        }
                    }, 500);
                }
            }
        }

        if (btnStart) {
            btnStart.addEventListener("click", () => {
                if (running) return;
                running = true;
                btnStart.disabled = true;
                requestAnimationFrame(step);
            });
        }

        if (btnReset) {
            btnReset.addEventListener("click", () => {
                resetAnimation();
            });
        }

        if (closeModal && resultModal) {
            closeModal.addEventListener("click", () => {
                resultModal.style.display = "none";
            });
        }

        window.addEventListener("resize", () => {
            setCarPosition(startPos);
        });

        resetAnimation();
    }

    // =========================================================================
    // 2. LOGIKA KUIS REFLEKSI (POP-UP)
    // =========================================================================
    const quizModal = document.getElementById("quiz-modal");
    const quizQuestion = document.getElementById("quiz-question");
    const quizInput = document.getElementById("quiz-input");
    const quizFeedback = document.getElementById("quiz-feedback");
    const quizSubmit = document.getElementById("quiz-submit");
    const quizNext = document.getElementById("quiz-next");
    const quizClose = document.getElementById("quiz-close");
    const modalText = document.getElementById("modal-text");

    const quizData = [
        {
            q: "Di mana titik awal mobil bergerak? (A, B, atau C)",
            answer: "A",
            explain: `
        <div class="explain-box">
          <div class="explain-title">Konsep titik awal</div>
          <p>Titik awal adalah posisi pertama suatu benda sebelum bergerak.</p>
          <p>Pada animasi, mobil mulai bergerak dari titik A (Rumah), sehingga titik awal mobil adalah A.</p>
        </div>`,
        },
        {
            q: "Di mana titik akhir mobil bergerak? (A, B, atau C)",
            answer: "B",
            explain: `
        <div class="explain-box">
          <div class="explain-title">Konsep titik akhir</div>
          <p>Titik akhir adalah posisi terakhir benda setelah seluruh gerakan selesai.</p>
          <p>Walaupun mobil sempat bergerak ke titik C, animasi berakhir ketika mobil berhenti di titik B (Toko). Oleh karena itu, titik akhir mobil adalah B.</p>
        </div>`,
        },
        {
            q: "Berapa kilometer jarak tempuh total mobil selama animasi berlangsung?",
            answer: "16",
            explain: `
        <div class="explain-box">
          <div class="explain-title">Konsep jarak tempuh</div>
          <p>Jarak adalah panjang lintasan yang dilalui suatu benda tanpa memedulikan arah geraknya.</p>
          <p>Pada animasi, mobil bergerak A ke B (4km), B ke C (6km), C ke B (6km). Total: 4 + 6 + 6 = 16 km.</p>
        </div>`,
        },
        {
            q: "Berapa kilometer perpindahan mobil dari titik awal hingga titik akhir?",
            answer: "4",
            explain: `
        <div class="explain-box">
          <div class="explain-title">Konsep perpindahan</div>
          <p>Perpindahan adalah jarak lurus antara posisi awal dan posisi akhir benda.</p>
          <p>Awal di A, Akhir di B. Jarak A ke B adalah 4 km.</p>
        </div>`,
        },
    ];

    let quizIndex = 0;

    window.showQuiz = function () {
        if (!quizModal) return;
        quizInput.value = "";
        quizFeedback.textContent = "";
        quizSubmit.style.display = "inline-block";
        quizNext.style.display = "none";
        quizQuestion.textContent = quizData[quizIndex].q;
        quizModal.style.display = "flex";
    };

    if (quizSubmit) {
        quizSubmit.addEventListener("click", () => {
            const userAnswer = quizInput.value.trim().toUpperCase();
            const correctAnswer = quizData[quizIndex].answer;

            if (userAnswer === correctAnswer) {
                quizFeedback.innerHTML = "🎉 Yeay, benar!";
                quizFeedback.style.color = "green";
            } else {
                quizFeedback.innerHTML =
                    "❌ Salah.<br>" + quizData[quizIndex].explain;
                quizFeedback.style.color = "red";
            }

            quizSubmit.style.display = "none";
            quizNext.style.display = "inline-block";
        });
    }

    if (quizNext) {
        quizNext.addEventListener("click", () => {
            quizIndex++;
            if (quizIndex < quizData.length) {
                window.showQuiz();
            } else {
                quizModal.style.display = "none";
                quizIndex = 0;

                if (btnLanjutKuis) btnLanjutKuis.style.display = "none";

                if (modalText && window.finalSummary) {
                    modalText.innerHTML =
                        "Jarak tempuh total: " +
                        window.finalSummary.jarak +
                        " km<br>" +
                        "Perpindahan dari titik awal: " +
                        window.finalSummary.perpindahan +
                        " km";

                    if (resultModal) resultModal.style.display = "flex";
                }
            }
        });
    }

    if (quizClose) {
        quizClose.addEventListener("click", () => {
            quizModal.style.display = "none";
            if (btnLanjutKuis) btnLanjutKuis.style.display = "inline-block";
        });
    }

    if (btnLanjutKuis) {
        btnLanjutKuis.addEventListener("click", () => {
            quizModal.style.display = "flex";
            btnLanjutKuis.style.display = "none";
        });
    }

    // =========================================================================
    // 3. LOGIKA LATIHAN SOAL (ADI DI SIRKUIT)
    // =========================================================================
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
    const btnUnduhAdi = document.getElementById("unduh-adi");

    const inputs = {
        soal1: document.getElementById("soal1"),
        soal2: document.getElementById("soal2"),
        soal3: document.getElementById("soal3"),
        soal4: document.getElementById("soal4"),
        soal5: document.getElementById("soal5"),
    };

    function extractNumber(value) {
        if (!value) return null;
        const m = value.toString().match(/-?\d+(\.\d+)?/);
        return m ? parseFloat(m[0]) : null;
    }

    function resetFieldStyle(el) {
        if (el) {
            el.style.borderColor = "";
            el.style.backgroundColor = "";
        }
    }
    function markCorrect(el) {
        if (el) {
            el.style.borderColor = "#16a34a";
            el.style.backgroundColor = "#ecfdf5";
        }
    }
    function markWrong(el) {
        if (el) {
            el.style.borderColor = "#dc2626";
            el.style.backgroundColor = "#fff1f2";
        }
    }

    function resetAllAdi() {
        Object.values(inputs).forEach((i) => {
            if (i) {
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

    if (btnCekAdi) {
        btnCekAdi.addEventListener("click", () => {
            let benarCount = 0;
            let salahCount = 0;
            let belumCount = 0;

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
                    isCorrect = numVal === kunci;
                } else {
                    isCorrect = val.toUpperCase() === kunci;
                }

                if (isCorrect) {
                    benarCount++;
                    markCorrect(inputEl);
                } else {
                    salahCount++;
                    markWrong(inputEl);
                }
            };

            validateInput(inputs.soal1, "A", false);
            validateInput(inputs.soal2, "A", false);
            validateInput(inputs.soal3, 110, true);
            validateInput(inputs.soal4, 550, true);
            validateInput(inputs.soal5, 0, true);

            if (benarCount === 5) {
                window.progresSiswa = window.progresSiswa || [];

                if (!window.progresSiswa.includes("jarak_completed")) {
                    window.progresSiswa.push("jarak_completed");
                }

                if (window.simpanProgresKeDatabase) {
                    window.simpanProgresKeDatabase("jarak_completed");
                }

                if (window.unlockSidebar) {
                    window.unlockSidebar("nav-kelajuan");
                }
                if (window.unlockNextButtonIfPage) {
                    window.unlockNextButtonIfPage("jaraktempuhdanperpindahan");
                }

                checkAllLocks();

                if (modalLatihan) modalLatihan.style.display = "none";

                // Memunculkan tombol unduh & Generate PDF ke server
                if (btnUnduhAdi) btnUnduhAdi.style.display = "inline-block";
                generatePDFJarak("upload");

                Swal.fire({
                    title: "Luar Biasa!",
                    text: "Semua jawaban benar. Materi selanjutnya telah terbuka!",
                    icon: "success",
                    confirmButtonText: "Lanjut",
                    confirmButtonColor: "#2ecc71",
                });
            } else {
                modalDetail.innerHTML = "";
                modalDetail.style.display = "none";

                modalRingkasan.innerHTML = `
                <div class="hasil-skor-container">
                    <span class="txt-sukses">✔ Benar : ${benarCount}</span>
                    <span class="txt-sep">|</span>
                    <span class="txt-gagal">✖ Salah : ${salahCount}</span>
                    <span class="txt-sep">|</span>
                    <span class="txt-belum">⏳ Belum diisi : ${belumCount}</span>
                </div>
            `;

                modalLatihan.style.display = "flex";
                if (modalTutup) modalTutup.focus();
            }
        });
    }

    if (btnResetAdi) btnResetAdi.addEventListener("click", resetAllAdi);

    if (modalTutup)
        modalTutup.addEventListener(
            "click",
            () => (modalLatihan.style.display = "none"),
        );

    if (modalUlang)
        modalUlang.addEventListener("click", () => {
            resetAllAdi();
            if (btnCekAdi) btnCekAdi.focus();
        });

    if (modalLatihan) {
        modalLatihan.addEventListener("click", (e) => {
            if (e.target === modalLatihan) modalLatihan.style.display = "none";
        });
    }

    // =========================================================================
    // 4. LOGIKA UNDUH PDF
    // =========================================================================
    const getCompressedImage = (el) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.setAttribute("crossOrigin", "anonymous");
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

    const extractNum = (val) => {
        if (!val) return null;
        const m = val.toString().match(/-?\d+(\.\d+)?/);
        return m ? parseFloat(m[0]) : null;
    };

    async function generatePDFJarak(action = "download") {
        const { jsPDF } = window.jspdf;
        if (!jsPDF) {
            if (action === "download") alert("Library PDF error.");
            return;
        }

        try {
            const doc = new jsPDF();
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            const margin = 20;
            let yPos = 0;

            doc.setFillColor(249, 92, 80);
            doc.rect(0, 0, pageWidth, 40, "F");
            doc.setTextColor(255, 255, 255);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(22);
            doc.text("Laporan Hasil Latihan", pageWidth / 2, 20, {
                align: "center",
            });
            doc.setFontSize(12);
            doc.setFont("helvetica", "normal");
            doc.text(
                "Materi: Jarak Tempuh dan Perpindahan",
                pageWidth / 2,
                28,
                { align: "center" },
            );

            yPos = 55;

            doc.setTextColor(80, 80, 80);
            doc.setFontSize(9);
            doc.setFont("helvetica", "italic");

            const tgl = new Date().toLocaleDateString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            });
            doc.text(`Tanggal Pengerjaan: ${tgl}`, margin, yPos);
            yPos += 10;

            doc.setFont("helvetica", "normal");
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0);

            const cerita =
                "Adi sedang mempersiapkan diri untuk mengikuti lomba balap mobil di sirkuit. Satu putaran lintasan memiliki panjang 110 meter. Jika Adi mengendarai mobilnya sebanyak 5 putaran, maka berapakah total jarak yang ditempuh dan berapa besar perpindahannya?";

            const splitCerita = doc.splitTextToSize(
                cerita,
                pageWidth - margin * 2,
            );
            doc.text(splitCerita, margin, yPos);

            yPos += splitCerita.length * 6 + 5;

            const imgElement = document.querySelector(".gambar-latihan");
            if (imgElement) {
                try {
                    const imgData = await getCompressedImage(imgElement);
                    const imgProps = doc.getImageProperties(imgData);
                    const imgWidth = 100;
                    const imgHeight =
                        (imgProps.height * imgWidth) / imgProps.width;
                    const xImg = (pageWidth - imgWidth) / 2;

                    if (yPos + imgHeight > pageHeight - 20) {
                        doc.addPage();
                        yPos = 20;
                    }

                    doc.addImage(
                        imgData,
                        "JPEG",
                        xImg,
                        yPos,
                        imgWidth,
                        imgHeight,
                    );
                    yPos += imgHeight + 10;
                } catch (e) {
                    console.log(e);
                }
            }

            const rawAnswers = [
                {
                    q: "1. Di mana posisi awal Adi saat mulai mengemudi?",
                    el: document.getElementById("soal1"),
                    key: "A",
                    isNum: false,
                    unit: "",
                },
                {
                    q: "2. Di titik mana Adi mengakhiri putarannya?",
                    el: document.getElementById("soal2"),
                    key: "A",
                    isNum: false,
                    unit: "",
                },
                {
                    q: "3. Panjang lintasan satu putaran?",
                    el: document.getElementById("soal3"),
                    key: 110,
                    isNum: true,
                    unit: "meter",
                },
                {
                    q: "4. Total jarak tempuh (5 putaran)?",
                    el: document.getElementById("soal4"),
                    key: 550,
                    isNum: true,
                    unit: "meter",
                },
                {
                    q: "5. Besar perpindahan Adi?",
                    el: document.getElementById("soal5"),
                    key: 0,
                    isNum: true,
                    unit: "meter",
                },
            ];

            let countBenar = 0;
            let countSalah = 0;
            let countKosong = 0;

            doc.setFontSize(11);

            rawAnswers.forEach((item) => {
                const val = item.el.value.trim();
                let status = "kosong";

                if (val !== "") {
                    if (item.isNum) {
                        status =
                            extractNum(val) === item.key ? "benar" : "salah";
                    } else {
                        status =
                            val.toUpperCase() === item.key ? "benar" : "salah";
                    }
                }

                if (status === "benar") countBenar++;
                else if (status === "salah") countSalah++;
                else countKosong++;

                if (yPos > pageHeight - 30) {
                    doc.addPage();
                    yPos = 20;
                }

                doc.setFont("helvetica", "bold");
                doc.setTextColor(0, 0, 0);
                doc.text(item.q, margin, yPos);
                yPos += 6;

                if (status === "benar") {
                    doc.setFillColor(209, 250, 229);
                    doc.setDrawColor(34, 197, 94);
                    doc.setTextColor(21, 128, 61);
                } else if (status === "salah") {
                    doc.setFillColor(254, 226, 226);
                    doc.setDrawColor(239, 68, 68);
                    doc.setTextColor(185, 28, 28);
                } else {
                    doc.setFillColor(245, 245, 245);
                    doc.setDrawColor(200, 200, 200);
                    doc.setTextColor(100, 100, 100);
                }

                doc.roundedRect(
                    margin,
                    yPos - 5,
                    pageWidth - margin * 2,
                    12,
                    1,
                    1,
                    "FD",
                );

                doc.setFont("helvetica", "normal");
                const textAns = val ? `${val} ${item.unit}` : "(Tidak dijawab)";

                // BARIS PREFIX SUDAH DIHAPUS DI SINI
                doc.text(textAns, margin + 5, yPos + 3);

                yPos += 16;
            });

            yPos += 5;
            doc.setFont("helvetica", "bold");
            doc.setTextColor(0, 0, 0);

            const summaryText = `Ringkasan: Benar: ${countBenar}  |  Salah: ${countSalah}  |  Belum Dijawab: ${countKosong}`;

            doc.setDrawColor(0, 0, 0);
            doc.setFillColor(255, 255, 255);
            doc.roundedRect(
                margin,
                yPos - 5,
                pageWidth - margin * 2,
                10,
                1,
                1,
                "S",
            );
            doc.text(summaryText, pageWidth / 2, yPos + 2, { align: "center" });

            yPos += 15;
            doc.setFontSize(9);
            doc.setTextColor(150, 150, 150);
            doc.text("Jarak Tempuh dan Perpindahan", pageWidth / 2, yPos, {
                align: "center",
            });

            // LOGIKA PENCABANGAN: DOWNLOAD vs UPLOAD KE SERVER
            if (action === "download") {
                doc.save("Laporan_Latihan_Jarak_Tempuh_dan_Perpindahan.pdf");
            } else if (action === "upload") {
                const pdfBlob = doc.output("blob");
                const formData = new FormData();
                formData.append("kode_materi", "jarak_tempuh"); // Kode materi sesuai di Controller
                formData.append(
                    "file_pdf",
                    pdfBlob,
                    "jarak_tempuh_dan_perpindahan.pdf",
                );

                const csrfToken = document
                    .querySelector('meta[name="csrf-token"]')
                    ?.getAttribute("content");

                fetch("/siswa/simpan-pdf-latihan", {
                    method: "POST",
                    headers: {
                        "X-CSRF-TOKEN": csrfToken,
                    },
                    body: formData,
                })
                    .then((response) => response.json())
                    .then((data) =>
                        console.log("Auto-save PDF Jarak Tempuh sukses:", data),
                    )
                    .catch((error) =>
                        console.error("Auto-save PDF error:", error),
                    );
            }
        } catch (err) {
            console.error(err);
            if (action === "download") alert("Gagal membuat PDF.");
        }
    }

    if (btnUnduhAdi) {
        btnUnduhAdi.addEventListener("click", async () => {
            const originalText = btnUnduhAdi.innerHTML;
            btnUnduhAdi.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Menilai & Membuat PDF...`;
            btnUnduhAdi.disabled = true;

            await generatePDFJarak("download");

            btnUnduhAdi.innerHTML = originalText;
            btnUnduhAdi.disabled = false;
        });
    }
});

// INI MERUPAKAN FILE KELAJUAN DAN KECEPATAN
// Kunci Jawaban Latihan Soal Isian
const kunciLatihan = [
    { id: "s1", jawaban: "120" },
    { id: "s2", jawaban: "40" },
    { id: "s-total", jawaban: "160" },
    { id: "t", jawaban: "20" },
    { id: "v-atas", jawaban: "160" },
    { id: "v-bawah", jawaban: "20" },
    { id: "v-hasil", jawaban: "8" },

    { id: "x0", jawaban: "40" },
    { id: "xt", jawaban: "120" },
    { id: "delta-s", jawaban: "80" },
    { id: "t2", jawaban: "20" },
    { id: "v2-atas", jawaban: "80" },
    { id: "v2-bawah", jawaban: "20" },
    { id: "v2-hasil", jawaban: "4" },
];

// Kunci Jawaban Praktik Video (Mendukung Multi-Jawaban)
const kunciPraktik = [
    { id: "prak-s-pensil", jawaban: ["10"] },
    { id: "prak-t-pensil", jawaban: ["1,93", "1,9"] },
    { id: "prak-v-pensil", jawaban: ["5,18"] },

    { id: "prak-s-pulpen", jawaban: ["20"] },
    { id: "prak-t-pulpen", jawaban: ["4,09", "4,9"] },
    { id: "prak-v-pulpen", jawaban: ["4,89"] },

    { id: "prak-s-lem", jawaban: ["25"] },
    { id: "prak-t-lem", jawaban: ["8,65", "8,6"] },
    { id: "prak-v-lem", jawaban: ["2,89"] },
];

function tutupPopupQuiz() {
    const popup = document.getElementById("popup-quiz");
    if (popup) popup.classList.remove("show");
}

function resetQuizPopup() {
    document
        .querySelectorAll(".quiz-check")
        .forEach((cb) => (cb.checked = false));
    tutupPopupQuiz();
}

function tutupPopupLatihan() {
    const popup = document.getElementById("popup-latihan");
    if (popup) popup.classList.remove("show");
}

window.cobaLagiLatihan = function () {
    const popup = document.getElementById("popup-latihan");
    const title = popup ? popup.querySelector("h3").innerText : "";

    if (title === "Hasil Evaluasi Praktik") {
        kunciPraktik.forEach((item) => {
            const input = document.getElementById(item.id);
            if (input) {
                input.value = "";
                input.classList.remove("benar", "salah");
            }
        });
        if (popup) popup.querySelector("h3").innerText = "Hasil Latihan";
    } else {
        kunciLatihan.forEach((item) => {
            const input = document.getElementById(item.id);
            if (input) {
                input.value = "";
                input.classList.remove("benar", "salah");
            }
        });
    }
    tutupPopupLatihan();
};

document.addEventListener("DOMContentLoaded", function () {
    // 0. FUNGSI CEK MEMORI UNTUK MEMBUKA GEMBOK
    function checkAllLocks() {
        const path = window.location.pathname;

        function isLulus(kodeMateri) {
            return (
                window.progresSiswa && window.progresSiswa.includes(kodeMateri)
            );
        }

        if (isLulus("jarak_completed")) {
            const navKelajuan = document.getElementById("nav-kelajuan");
            if (navKelajuan) {
                navKelajuan.classList.remove("locked");
                const lockIcon = navKelajuan.querySelector(".fa-lock");
                if (lockIcon) lockIcon.remove();
            }
        }

        if (isLulus("kelajuan_completed")) {
            const navPercepatan = document.getElementById("nav-percepatan");
            if (navPercepatan) {
                navPercepatan.classList.remove("locked");
                const lockIcon = navPercepatan.querySelector(".fa-lock");
                if (lockIcon) lockIcon.remove();
            }

            if (path.includes("kelajuandankecepatan")) {
                const btnNextMateri =
                    document.getElementById("btn-next-materi");
                if (btnNextMateri) btnNextMateri.classList.remove("locked");
            }
        }
    }

    checkAllLocks();

    // 1. LOGIKA KUIS KELAJUAN vs KECEPATAN
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
        9: "kecepatan",
    };

    if (checks.length > 0) {
        checks.forEach((cb) => {
            cb.addEventListener("change", function () {
                const row = this.dataset.row;
                if (this.checked) {
                    document
                        .querySelectorAll('.quiz-check[data-row="' + row + '"]')
                        .forEach((other) => {
                            if (other !== this) other.checked = false;
                        });
                }
            });
        });
    }

    if (btnCekQuiz) {
        btnCekQuiz.addEventListener("click", function () {
            let benar = 0;
            let total = Object.keys(kunciQuiz).length;
            let belumDiisi = 0;

            Object.keys(kunciQuiz).forEach((row) => {
                const benarTipe = kunciQuiz[row];
                const cekKelajuan = document.querySelector(
                    '.quiz-check[data-row="' + row + '"][data-type="kelajuan"]',
                );
                const cekKecepatan = document.querySelector(
                    '.quiz-check[data-row="' +
                        row +
                        '"][data-type="kecepatan"]',
                );

                const dipilih =
                    (cekKelajuan.checked ? "kelajuan" : "") ||
                    (cekKecepatan.checked ? "kecepatan" : "");

                if (!dipilih) belumDiisi++;
                else if (dipilih === benarTipe) benar++;
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

    if (btnResetQuiz) {
        btnResetQuiz.addEventListener("click", function () {
            checks.forEach((cb) => (cb.checked = false));
        });
    }

    // LOGIKA TIMESTAMP VIDEO PRAKTIK
    const videoPraktik = document.getElementById("video-praktik");
    const timeButtons = document.querySelectorAll(".btn-time");

    if (videoPraktik && timeButtons.length > 0) {
        timeButtons.forEach((btn) => {
            btn.addEventListener("click", function () {
                const targetTime = parseFloat(this.getAttribute("data-time"));
                if (!isNaN(targetTime)) {
                    videoPraktik.currentTime = targetTime;
                    videoPraktik.play();
                }
            });
        });
    }

    // LOGIKA PRAKTIK VIDEO (Menghitung Kelajuan)
    const btnCekPraktik = document.getElementById("btn-cek-praktik");
    const btnResetPraktik = document.getElementById("btn-reset-praktik");

    if (btnCekPraktik) {
        btnCekPraktik.addEventListener("click", () => {
            let benar = 0;
            let salah = 0;
            let belumDiisi = 0;

            kunciPraktik.forEach((item) => {
                const input = document.getElementById(item.id);
                if (input) {
                    const nilai = input.value.trim();
                    input.classList.remove("benar", "salah");

                    if (nilai === "") {
                        belumDiisi++;
                    } else if (item.jawaban.includes(nilai)) {
                        // Metode pengecekan berubah menjadi array includes
                        benar++;
                        input.classList.add("benar");
                    } else {
                        salah++;
                        input.classList.add("salah");
                    }
                }
            });

            if (benar === kunciPraktik.length) {
                if (typeof Swal !== "undefined") {
                    Swal.fire({
                        title: "Kerja Bagus!",
                        text: "Semua perhitungan dari video praktik sudah tepat!",
                        icon: "success",
                        confirmButtonText: "Lanjut",
                        confirmButtonColor: "#2ecc71",
                    });
                } else {
                    alert(
                        "Kerja Bagus! Semua perhitungan dari video praktik sudah tepat!",
                    );
                }
            } else {
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
                    popup.querySelector("h3").innerText =
                        "Hasil Evaluasi Praktik";
                    popup.classList.add("show");
                }
            }
        });
    }

    if (btnResetPraktik) {
        btnResetPraktik.addEventListener("click", () => {
            kunciPraktik.forEach((item) => {
                const input = document.getElementById(item.id);
                if (input) {
                    input.value = "";
                    input.classList.remove("benar", "salah");
                }
            });

            const popup = document.getElementById("popup-latihan");
            if (popup) popup.querySelector("h3").innerText = "Hasil Latihan";
        });
    }

    // 2. LOGIKA LATIHAN SOAL ISIAN
    const btnCekLatihan = document.getElementById("btn-cek-latihan");
    const btnResetLatihan = document.getElementById("btn-reset-latihan");

    if (btnCekLatihan) {
        btnCekLatihan.addEventListener("click", () => {
            let benar = 0;
            let salah = 0;
            let belumDiisi = 0;

            kunciLatihan.forEach((item) => {
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

            if (benar === kunciLatihan.length) {
                window.progresSiswa = window.progresSiswa || [];

                if (!window.progresSiswa.includes("kelajuan_completed")) {
                    window.progresSiswa.push("kelajuan_completed");
                }

                if (window.simpanProgresKeDatabase) {
                    window.simpanProgresKeDatabase("kelajuan_completed");
                }

                if (window.unlockSidebar) {
                    window.unlockSidebar("nav-percepatan");
                }
                if (window.unlockNextButtonIfPage) {
                    window.unlockNextButtonIfPage("kelajuandankecepatan");
                }

                checkAllLocks();

                // Munculkan tombol unduh & Generate PDF ke server
                const btnUnduhLatihan =
                    document.getElementById("btn-unduh-latihan");
                if (btnUnduhLatihan)
                    btnUnduhLatihan.style.display = "inline-block";
                generatePDFKelajuan("upload");

                if (typeof Swal !== "undefined") {
                    Swal.fire({
                        title: "Luar Biasa!",
                        text: "Semua jawaban benar. Materi selanjutnya (Percepatan) telah terbuka!",
                        icon: "success",
                        confirmButtonText: "Lanjut",
                        confirmButtonColor: "#2ecc71",
                    });
                } else {
                    alert(
                        "Selamat! Jawaban kamu benar semua. Materi selanjutnya telah terbuka.",
                    );
                }
            } else {
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
                    popup.querySelector("h3").innerText = "Hasil Latihan";
                    popup.classList.add("show");
                }
            }
        });
    }

    if (btnResetLatihan) {
        btnResetLatihan.addEventListener("click", () => {
            window.cobaLagiLatihan();
            const popup = document.getElementById("popup-latihan");
            if (popup) popup.querySelector("h3").innerText = "Hasil Latihan";
        });
    }

    // 3. LOGIKA UNDUH PDF
    const btnUnduhLatihan = document.getElementById("btn-unduh-latihan");

    const getCompressedImage = (el) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.setAttribute("crossOrigin", "anonymous");
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

    async function generatePDFKelajuan(action = "download") {
        const { jsPDF } = window.jspdf;
        if (!jsPDF) {
            if (action === "download") alert("Library PDF belum siap.");
            return;
        }

        try {
            const doc = new jsPDF("p", "mm", "a4");
            const pageWidth = doc.internal.pageSize.getWidth();
            let yPos = 0;

            doc.setFillColor(249, 92, 80);
            doc.rect(0, 0, pageWidth, 40, "F");
            doc.setTextColor(255, 255, 255);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(22);
            doc.text("Laporan Hasil Latihan", pageWidth / 2, 20, {
                align: "center",
            });
            doc.setFontSize(12);
            doc.setFont("helvetica", "normal");
            doc.text("Materi: Kelajuan dan Kecepatan", pageWidth / 2, 28, {
                align: "center",
            });

            yPos = 55;
            doc.setTextColor(80, 80, 80);
            doc.setFontSize(9);
            doc.setFont("helvetica", "italic");
            const tgl = new Date().toLocaleDateString("id-ID", {
                dateStyle: "full",
            });
            doc.text(`Tanggal Pengerjaan: ${tgl}`, 20, yPos);
            yPos += 10;

            doc.setFont("helvetica", "normal");
            doc.setFontSize(11);
            doc.setTextColor(0, 0, 0);
            const cerita =
                "Seorang anak bersepeda ke arah selatan menuju toko sejauh 120 meter, kemudian berbalik arah ke utara menuju sekolah sejauh 40 meter. Waktu yang dihabiskan untuk seluruh perjalanan adalah 20 sekon. Tentukan kelajuan dan kecepatan anak tersebut!";
            const splitCerita = doc.splitTextToSize(cerita, pageWidth - 40);
            doc.text(splitCerita, 20, yPos);
            yPos += splitCerita.length * 5 + 5;

            const images = document.querySelectorAll(".content-image2");
            const imgElement = images[images.length - 1];
            if (imgElement) {
                try {
                    const imgData = await getCompressedImage(imgElement);
                    const imgProps = doc.getImageProperties(imgData);
                    const imgWidth = 80;
                    const imgHeight =
                        (imgProps.height * imgWidth) / imgProps.width;
                    const xImg = (pageWidth - imgWidth) / 2;
                    doc.addImage(
                        imgData,
                        "JPEG",
                        xImg,
                        yPos,
                        imgWidth,
                        imgHeight,
                    );
                    yPos += imgHeight + 10;
                } catch (e) {}
            }

            let countBenar = 0,
                countSalah = 0,
                countKosong = 0;

            const drawAnswerBox = (id, x, y, w = 15, h = 7) => {
                const inputEl = document.getElementById(id);
                const val = inputEl ? inputEl.value.trim() : "";
                const kunci = kunciLatihan.find((k) => k.id === id);

                let bgColor = [245, 245, 245];
                let textColor = [100, 100, 100];
                let borderColor = [200, 200, 200];

                if (val !== "") {
                    if (val === kunci.jawaban) {
                        bgColor = [209, 250, 229];
                        borderColor = [34, 197, 94];
                        textColor = [21, 128, 61];
                        countBenar++;
                    } else {
                        bgColor = [254, 226, 226];
                        borderColor = [239, 68, 68];
                        textColor = [185, 28, 28];
                        countSalah++;
                    }
                } else {
                    countKosong++;
                }

                doc.setFillColor(...bgColor);
                doc.setDrawColor(...borderColor);
                doc.roundedRect(x, y, w, h, 1, 1, "FD");

                doc.setFontSize(10);
                doc.setTextColor(...textColor);
                const textToShow = val !== "" ? val : "(?)";
                doc.text(textToShow, x + w / 2, y + 5, { align: "center" });

                doc.setTextColor(0, 0, 0);
            };

            const startY = yPos;
            let leftY = startY;
            let rightY = startY;
            const colLeft = 20;
            const colRight = 115;

            doc.setFontSize(11);
            doc.setFont("helvetica", "bold");

            // KOLOM KIRI (KELAJUAN)
            doc.text("A. Kelajuan", colLeft, leftY);
            leftY += 8;
            doc.setFont("helvetica", "normal");

            doc.text("Diketahui:", colLeft, leftY);
            leftY += 6;
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

            doc.text("Ditanya: Kelajuan (v) = ?", colLeft, leftY);
            leftY += 10;

            doc.text("Dijawab: v = s / t", colLeft, leftY);
            leftY += 10;

            doc.text("v =", colLeft, leftY + 5);
            drawAnswerBox("v-atas", colLeft + 10, leftY - 2, 15);
            doc.line(colLeft + 10, leftY + 6, colLeft + 25, leftY + 6);
            drawAnswerBox("v-bawah", colLeft + 10, leftY + 7, 15);

            doc.text("=", colLeft + 28, leftY + 5);
            drawAnswerBox("v-hasil", colLeft + 33, leftY + 2, 15);
            doc.text("m/s", colLeft + 50, leftY + 5);

            // KOLOM KANAN (KECEPATAN)
            doc.setFont("helvetica", "bold");
            doc.text("B. Kecepatan", colRight, rightY);
            rightY += 8;
            doc.setFont("helvetica", "normal");

            doc.text("Diketahui:", colRight, rightY);
            rightY += 6;
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

            doc.text("Ditanya: Kecepatan (v) = ?", colRight, rightY);
            rightY += 10;

            doc.text("Dijawab: Cari Perpindahan", colRight, rightY);
            rightY += 8;
            doc.text("Delta s = xt - x0", colRight, rightY);
            rightY += 8;
            doc.text("Delta s =", colRight, rightY);
            drawAnswerBox("delta-s", colRight + 18, rightY - 5, 15);
            doc.text("m", colRight + 35, rightY);
            rightY += 12;

            doc.text("v =", colRight, rightY + 5);
            drawAnswerBox("v2-atas", colRight + 10, rightY - 2, 15);
            doc.line(colRight + 10, rightY + 6, colRight + 25, rightY + 6);
            drawAnswerBox("v2-bawah", colRight + 10, rightY + 7, 15);

            doc.text("=", colRight + 28, rightY + 5);
            drawAnswerBox("v2-hasil", colRight + 33, rightY + 2, 15);
            doc.text("m/s", colRight + 50, rightY + 5);

            yPos = Math.max(leftY, rightY) + 25;

            doc.setFont("helvetica", "bold");
            doc.setTextColor(0, 0, 0);
            const summaryText = `Ringkasan: Benar: ${countBenar}  |  Salah: ${countSalah}  |  Belum Dijawab: ${countKosong}`;

            doc.setDrawColor(0, 0, 0);
            doc.setFillColor(255, 255, 255);
            doc.roundedRect(20, yPos, pageWidth - 40, 10, 1, 1, "S");
            doc.text(summaryText, pageWidth / 2, yPos + 7, { align: "center" });

            doc.setFontSize(9);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(150, 150, 150);
            doc.text("Kelajuan dan Kecepatan", pageWidth / 2, yPos + 20, {
                align: "center",
            });

            // LOGIKA PENCABANGAN: DOWNLOAD vs UPLOAD KE SERVER
            if (action === "download") {
                doc.save("Laporan_Latihan_Kelajuan_Kecepatan.pdf");
            } else if (action === "upload") {
                const pdfBlob = doc.output("blob");
                const formData = new FormData();
                formData.append("kode_materi", "kelajuan"); // Kode materi sesuai di Controller
                formData.append(
                    "file_pdf",
                    pdfBlob,
                    "kelajuan_dan_kecepatan.pdf",
                );

                const csrfToken = document
                    .querySelector('meta[name="csrf-token"]')
                    ?.getAttribute("content");

                fetch("/siswa/simpan-pdf-latihan", {
                    method: "POST",
                    headers: {
                        "X-CSRF-TOKEN": csrfToken,
                    },
                    body: formData,
                })
                    .then((response) => response.json())
                    .then((data) =>
                        console.log("Auto-save PDF Kelajuan sukses:", data),
                    )
                    .catch((error) =>
                        console.error("Auto-save PDF error:", error),
                    );
            }
        } catch (err) {
            console.error(err);
            if (action === "download") alert("Gagal membuat PDF.");
        }
    }

    if (btnUnduhLatihan) {
        btnUnduhLatihan.addEventListener("click", async () => {
            const originalText = btnUnduhLatihan.innerHTML;
            btnUnduhLatihan.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Memproses...`;
            btnUnduhLatihan.disabled = true;

            await generatePDFKelajuan("download");

            btnUnduhLatihan.innerHTML = originalText;
            btnUnduhLatihan.disabled = false;
        });
    }

    // 4. LOGIKA PAGINATION (HALAMAN STEP)
    const step1 = document.getElementById("step-1");
    const step2 = document.getElementById("step-2");

    const btnPrevStep = document.getElementById("btn-prev-step");
    const btnNextStep = document.getElementById("btn-next-step");
    const btnPrevMateri = document.getElementById("btn-prev-materi");
    const btnNextMateri = document.getElementById("btn-next-materi");

    const numSteps = document.querySelectorAll(".num-step");

    let currentStep = 1;

    function updateStep() {
        if (step1) step1.style.display = "none";
        if (step2) step2.style.display = "none";

        numSteps.forEach((btn) => btn.classList.remove("active"));
        const activeBtn = document.querySelector(
            `.num-step[data-step="${currentStep}"]`,
        );
        if (activeBtn) activeBtn.classList.add("active");

        if (currentStep === 1) {
            if (step1) step1.style.display = "block";
            if (btnPrevMateri) btnPrevMateri.style.display = "inline-block";
            if (btnPrevStep) btnPrevStep.style.display = "none";
            if (btnNextStep) btnNextStep.style.display = "inline-block";
            if (btnNextMateri) btnNextMateri.style.display = "none";
        } else {
            if (step2) step2.style.display = "block";
            if (btnPrevMateri) btnPrevMateri.style.display = "none";
            if (btnPrevStep) btnPrevStep.style.display = "inline-block";
            if (btnNextStep) btnNextStep.style.display = "none";
            if (btnNextMateri) btnNextMateri.style.display = "inline-block";
        }

        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    if (btnPrevStep && btnNextStep) {
        btnPrevStep.addEventListener("click", () => {
            if (currentStep > 1) {
                currentStep--;
                updateStep();
            }
        });

        btnNextStep.addEventListener("click", () => {
            if (currentStep < 2) {
                currentStep++;
                updateStep();
            }
        });

        numSteps.forEach((btn) => {
            btn.addEventListener("click", function () {
                currentStep = parseInt(this.getAttribute("data-step"));
                updateStep();
            });
        });

        updateStep();
    }
});

// FILE: PERCEPATAN (LOGIKA LATIHAN & UNDUH PDF)
// 1. HELPER GLOBAL: KOMPRESI GAMBAR
const getCompressedImage = (el) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.setAttribute("crossOrigin", "anonymous");
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
    // =========================================================================
    // 0. FUNGSI CEK MEMORI UNTUK MEMBUKA GEMBOK
    // =========================================================================
    function checkAllLocks() {
        const path = window.location.pathname;

        // Fungsi pembantu untuk mengecek database
        function isLulus(kodeMateri) {
            return (
                window.progresSiswa && window.progresSiswa.includes(kodeMateri)
            );
        }

        // 1. Cek Kelulusan Materi Sebelumnya (Kelajuan & Kecepatan)
        if (isLulus("kelajuan_completed")) {
            const navPercepatan = document.getElementById("nav-percepatan");
            if (navPercepatan) {
                navPercepatan.classList.remove("locked");
                const lockIcon = navPercepatan.querySelector(".fa-lock");
                if (lockIcon) lockIcon.remove();
            }
        }

        // 2. Cek Kelulusan Materi INI (Percepatan)
        if (isLulus("percepatan_completed")) {
            const navKuis = document.getElementById("nav-kuis1");
            if (navKuis) {
                navKuis.classList.remove("locked");
                const lockIcon = navKuis.querySelector(".fa-lock");
                if (lockIcon) lockIcon.remove();
            }

            if (path.includes("percepatan")) {
                const btnNextMateri =
                    document.getElementById("btn-next-materi");
                if (btnNextMateri) {
                    btnNextMateri.classList.remove("locked");
                }
            }
        }
    }

    checkAllLocks();

    // =========================================================================
    // FUNGSI UTAMA: RENDER PDF (BISA UNTUK DOWNLOAD ATAU UPLOAD BACKGROUND)
    // =========================================================================
    async function generatePDFPercepatan(action = "download") {
        const { jsPDF } = window.jspdf;
        if (!jsPDF) {
            if (action === "download") alert("Library PDF belum siap.");
            return;
        }

        try {
            const doc = new jsPDF("p", "mm", "a4");
            const pageWidth = doc.internal.pageSize.getWidth();
            let yPos = 0;

            doc.setFillColor(249, 92, 80);
            doc.rect(0, 0, pageWidth, 40, "F");
            doc.setTextColor(255, 255, 255);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(22);
            doc.text("Laporan Hasil Latihan", pageWidth / 2, 20, {
                align: "center",
            });
            doc.setFontSize(12);
            doc.setFont("helvetica", "normal");
            doc.text("Materi: Percepatan", pageWidth / 2, 28, {
                align: "center",
            });

            yPos = 55;

            doc.setTextColor(80, 80, 80);
            doc.setFontSize(9);
            doc.setFont("helvetica", "italic");
            const tgl = new Date().toLocaleDateString("id-ID", {
                dateStyle: "full",
            });
            doc.text(`Tanggal Pengerjaan: ${tgl}`, 20, yPos);
            yPos += 10;

            doc.setFont("helvetica", "normal");
            doc.setFontSize(11);
            doc.setTextColor(0, 0, 0);
            const cerita =
                "Sebuah sepeda mula-mula berjalan dengan kecepatan 10 m/s, kemudian pada detik ke-20 kecepatannya menjadi 50 m/s. Berapakah percepatan yang dialami sepeda tersebut?";
            const splitCerita = doc.splitTextToSize(cerita, pageWidth - 40);
            doc.text(splitCerita, 20, yPos);
            yPos += splitCerita.length * 6 + 5;

            const images = document.querySelectorAll(".content-image2");
            const imgElement = images[images.length - 1];

            if (imgElement) {
                try {
                    const imgData = await getCompressedImage(imgElement);
                    const imgProps = doc.getImageProperties(imgData);
                    const imgWidth = 80;
                    const imgHeight =
                        (imgProps.height * imgWidth) / imgProps.width;
                    const xImg = (pageWidth - imgWidth) / 2;
                    doc.addImage(
                        imgData,
                        "JPEG",
                        xImg,
                        yPos,
                        imgWidth,
                        imgHeight,
                    );
                    yPos += imgHeight + 15;
                } catch (e) {
                    console.log(e);
                }
            }

            let countBenar = 0,
                countSalah = 0,
                countKosong = 0;

            const drawBox = (id, x, y, w = 15, h = 7) => {
                const inputEl = document.getElementById(id);
                const val = inputEl ? inputEl.value.trim() : "";
                const kunci = kunciPercepatan.find((k) => k.id === id);

                let bg = [245, 245, 245],
                    txt = [100, 100, 100],
                    brd = [200, 200, 200];

                if (val !== "") {
                    if (val === kunci.jawaban) {
                        bg = [209, 250, 229];
                        brd = [34, 197, 94];
                        txt = [21, 128, 61];
                        countBenar++;
                    } else {
                        bg = [254, 226, 226];
                        brd = [239, 68, 68];
                        txt = [185, 28, 28];
                        countSalah++;
                    }
                } else {
                    countKosong++;
                }

                doc.setFillColor(...bg);
                doc.setDrawColor(...brd);
                doc.roundedRect(x, y, w, h, 1, 1, "FD");
                doc.setFontSize(10);
                doc.setTextColor(...txt);
                doc.text(val !== "" ? val : "(?)", x + w / 2, y + 5, {
                    align: "center",
                });
                doc.setTextColor(0, 0, 0);
            };

            let leftX = 20;
            doc.setFontSize(11);
            doc.setFont("helvetica", "normal");

            doc.text("Diketahui:", leftX, yPos);
            yPos += 8;
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

            doc.text("Ditanya: Percepatan (a) = ?", leftX, yPos);
            yPos += 10;
            doc.text("Dijawab: a = (v2 - v1) / t", leftX, yPos);
            yPos += 10;
            doc.text("a =", leftX, yPos + 5);
            drawBox("a-atas", leftX + 10, yPos - 2, 15);
            doc.line(leftX + 10, yPos + 6, leftX + 25, yPos + 6);
            drawBox("a-bawah", leftX + 10, yPos + 7, 15);
            doc.text("=", leftX + 28, yPos + 5);
            drawBox("a-hasil", leftX + 33, yPos + 2, 15);
            doc.text("m/s²", leftX + 50, yPos + 5);

            yPos += 25;

            const summaryText = `Ringkasan: Benar: ${countBenar}  |  Salah: ${countSalah}  |  Belum Dijawab: ${countKosong}`;
            doc.setDrawColor(0, 0, 0);
            doc.setFillColor(255, 255, 255);
            doc.roundedRect(20, yPos, pageWidth - 40, 10, 1, 1, "S");
            doc.setFont("helvetica", "bold");
            doc.text(summaryText, pageWidth / 2, yPos + 7, { align: "center" });

            doc.setFontSize(9);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(150, 150, 150);
            doc.text("Percepatan", pageWidth / 2, yPos + 20, {
                align: "center",
            });

            // LOGIKA PENCABANGAN: DOWNLOAD vs UPLOAD KE SERVER
            if (action === "download") {
                doc.save("Laporan_Latihan_Percepatan.pdf");
            } else if (action === "upload") {
                const pdfBlob = doc.output("blob");
                const formData = new FormData();
                formData.append("kode_materi", "percepatan");
                formData.append("file_pdf", pdfBlob, "percepatan.pdf");

                const csrfToken = document
                    .querySelector('meta[name="csrf-token"]')
                    ?.getAttribute("content");

                fetch("/siswa/simpan-pdf-latihan", {
                    method: "POST",
                    headers: {
                        "X-CSRF-TOKEN": csrfToken,
                    },
                    body: formData,
                })
                    .then((response) => response.json())
                    .then((data) => console.log("Auto-save PDF sukses:", data))
                    .catch((error) =>
                        console.error("Auto-save PDF error:", error),
                    );
            }
        } catch (err) {
            console.error(err);
            if (action === "download") alert("Gagal membuat PDF.");
        }
    }

    // =========================================================================
    // BAGIAN A: LOGIKA LATIHAN SOAL (INTERAKSI WEBSITE)
    // =========================================================================
    const btnCek = document.getElementById("btn-cek-percepatan");
    const btnReset = document.getElementById("btn-reset-percepatan");
    const btnPopupUlang = document.getElementById("btn-popup-ulang-percepatan");
    const btnPopupTutup = document.getElementById("btn-popup-tutup-percepatan");

    const kunciPercepatan = [
        { id: "v1", jawaban: "10" },
        { id: "v2", jawaban: "50" },
        { id: "t", jawaban: "20" },
        { id: "a-atas", jawaban: "40" },
        { id: "a-bawah", jawaban: "20" },
        { id: "a-hasil", jawaban: "2" },
    ];

    function resetPercepatan() {
        kunciPercepatan.forEach((item) => {
            const input = document.getElementById(item.id);
            if (input) {
                input.value = "";
                input.classList.remove("benar", "salah");
            }
        });
        const popupBox = document.getElementById("popup-percepatan");
        if (popupBox) popupBox.classList.remove("show");
    }

    if (btnCek) {
        btnCek.addEventListener("click", () => {
            let benar = 0,
                salah = 0,
                belum = 0;

            kunciPercepatan.forEach((item) => {
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

            // LOGIKA JIKA BENAR SEMUA
            if (benar === kunciPercepatan.length) {
                window.progresSiswa = window.progresSiswa || [];
                if (!window.progresSiswa.includes("percepatan_completed")) {
                    window.progresSiswa.push("percepatan_completed");
                }

                // Panggil fungsi Global
                if (window.simpanProgresKeDatabase) {
                    window.simpanProgresKeDatabase("percepatan_completed");
                }

                // Buka kunci secara manual via Helper Global
                if (window.unlockSidebar) window.unlockSidebar("nav-kuis1");
                if (window.unlockNextButtonIfPage)
                    window.unlockNextButtonIfPage("percepatan");

                checkAllLocks();

                // Munculkan Tombol Unduh
                const btnUnduh = document.getElementById(
                    "btn-unduh-percepatan",
                );
                if (btnUnduh) btnUnduh.style.display = "inline-block";

                // Simpan PDF ke Database secara diam-diam
                generatePDFPercepatan("upload");

                if (typeof Swal !== "undefined") {
                    Swal.fire({
                        title: "Luar Biasa!",
                        text: "Semua jawaban benar. Akses ke Kuis 1 telah terbuka!",
                        icon: "success",
                        confirmButtonText: "Lanjut",
                        confirmButtonColor: "#2ecc71",
                    });
                } else {
                    alert(
                        "Selamat! Jawaban kamu benar semua. Akses ke Kuis 1 telah terbuka.",
                    );
                }
            } else {
                const popupText = document.getElementById(
                    "popup-percepatan-text",
                );
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

    if (btnReset) btnReset.addEventListener("click", resetPercepatan);
    if (btnPopupUlang) btnPopupUlang.addEventListener("click", resetPercepatan);
    if (btnPopupTutup) {
        btnPopupTutup.addEventListener("click", function () {
            const popupBox = document.getElementById("popup-percepatan");
            if (popupBox) popupBox.classList.remove("show");
        });
    }

    // =========================================================================
    // BAGIAN B: LOGIKA KLIK MANUAL UNDUH PDF OLEH SISWA
    // =========================================================================
    const btnUnduhPercepatan = document.getElementById("btn-unduh-percepatan");
    if (btnUnduhPercepatan) {
        btnUnduhPercepatan.addEventListener("click", async () => {
            const originalText = btnUnduhPercepatan.innerHTML;
            btnUnduhPercepatan.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Memproses...`;
            btnUnduhPercepatan.disabled = true;

            await generatePDFPercepatan("download");

            btnUnduhPercepatan.innerHTML = originalText;
            btnUnduhPercepatan.disabled = false;
        });
    }
});

// Js Pengantar Gaya & Pengertian Gaya
document.addEventListener("DOMContentLoaded", function () {
    const path = window.location.pathname;

    // 1. Cek penguncian materi berdasarkan database
    function checkAllLocks() {
        function isLulus(kodeMateri) {
            return (
                window.progresSiswa && window.progresSiswa.includes(kodeMateri)
            );
        }

        if (isLulus("kuis1_completed") && path.includes("pengantargaya")) {
            const btnNext = document.getElementById("btn-next-materi");
            if (btnNext) btnNext.classList.remove("locked");
        }

        if (
            isLulus("pengertiangaya_completed") &&
            path.includes("pengertiangaya")
        ) {
            const btnNext = document.getElementById("btn-next-materi");
            if (btnNext) btnNext.classList.remove("locked");
        }
    }

    checkAllLocks();

    // 2. Evaluasi jawaban TTS saat menekan "Cek Jawaban"
    const btnSubmitGaya = document.getElementById("btn-submit-pengertiangaya");
    const btnUnduhGaya = document.getElementById("btn-unduh-pengertiangaya");

    if (btnSubmitGaya) {
        btnSubmitGaya.addEventListener("click", function () {
            const inputs = document.querySelectorAll(".tts-input");
            let semuaTerisi = true;
            let correctCount = 0;
            const totalInputs = inputs.length;

            inputs.forEach((input) => {
                if (input.value.trim() === "") {
                    semuaTerisi = false;
                }
            });

            if (!semuaTerisi) {
                if (typeof Swal !== "undefined") {
                    Swal.fire({
                        icon: "warning",
                        title: "Belum Lengkap",
                        text: "Silakan isi semua kotak teka-teki silang terlebih dahulu!",
                        confirmButtonColor: "#f95c50",
                    });
                } else {
                    alert("Isi semua kotak teka-teki silang terlebih dahulu!");
                }
                return;
            }

            inputs.forEach((input) => {
                const jawabanBenar = input.getAttribute("data-answer").toUpperCase();
                const jawabanSiswa = input.value.toUpperCase();

                input.classList.remove("benar", "salah");

                if (jawabanSiswa === jawabanBenar) {
                    input.classList.add("benar");
                    input.readOnly = true;
                    correctCount++;
                } else {
                    input.classList.add("salah");
                }
            });

            if (correctCount === totalInputs) {
                window.progresSiswa = window.progresSiswa || [];
                if (!window.progresSiswa.includes("pengertiangaya_completed")) {
                    window.progresSiswa.push("pengertiangaya_completed");
                }
                if (window.simpanProgresKeDatabase) {
                    window.simpanProgresKeDatabase("pengertiangaya_completed");
                }

                const btnNext = document.getElementById("btn-next-materi");
                if (btnNext) btnNext.classList.remove("locked");

                if (window.unlockSidebar) window.unlockSidebar("nav-resultan-gaya");

                if (btnUnduhGaya) btnUnduhGaya.style.display = "inline-block";
                
                generatePDFPengertianGaya("upload");

                if (typeof Swal !== "undefined") {
                    Swal.fire({
                        title: "Luar Biasa!",
                        text: "Semua kata teka-teki silang berhasil dijawab dengan benar. Materi selanjutnya telah terbuka!",
                        icon: "success",
                        confirmButtonText: "Lanjut",
                        confirmButtonColor: "#2ecc71",
                    });
                }
            } else {
                if (typeof Swal !== "undefined") {
                    Swal.fire({
                        title: "Masih Ada yang Kurang Tepat",
                        text: "Periksa kembali kotak yang berwarna merah dan klik 'Coba Lagi' untuk memperbaiki.",
                        icon: "error",
                        confirmButtonText: "Tutup",
                        confirmButtonColor: "#f95c50",
                    });
                }
            }
        });
    }

    // 3. Logika tombol "Coba Lagi"
    const btnRetryGaya = document.getElementById("btn-retry-pengertiangaya");
    if (btnRetryGaya) {
        btnRetryGaya.addEventListener("click", function () {
            const inputs = document.querySelectorAll(".tts-input");
            inputs.forEach((input) => {
                // REVISI: Reset semua kelas dan isian, agar tombol terasa benar-benar "mengulang"
                input.classList.remove("salah", "benar");
                input.value = "";
                input.readOnly = false;
            });
        });
    }

    // 4. Navigasi TTS (Otomatis pindah ke kotak berikutnya)
    const ttsInputs = document.querySelectorAll(".tts-input");
    ttsInputs.forEach((input, index) => {
        input.addEventListener("input", function() {
            if (this.value.length === 1 && index < ttsInputs.length - 1) {
                ttsInputs[index + 1].focus();
            }
        });
    });

    // 5. Fungsi membuat dan Auto-save/Download PDF
    async function generatePDFPengertianGaya(action = "download") {
        const { jsPDF } = window.jspdf;
        if (!jsPDF) {
            if (action === "download") alert("Library PDF belum siap.");
            return;
        }

        try {
            const doc = new jsPDF("p", "mm", "a4");
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            let yPos = 0;

            doc.setFillColor(249, 92, 80);
            doc.rect(0, 0, pageWidth, 40, "F");
            doc.setTextColor(255, 255, 255);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(22);
            doc.text("Laporan Hasil Evaluasi", pageWidth / 2, 20, { align: "center" });
            doc.setFontSize(12);
            doc.setFont("helvetica", "normal");
            doc.text("Materi: Pengertian Gaya (Teka-Teki Silang)", pageWidth / 2, 28, { align: "center" });

            yPos = 55;
            doc.setTextColor(80, 80, 80);
            doc.setFontSize(9);
            doc.setFont("helvetica", "italic");
            const tgl = new Date().toLocaleDateString("id-ID", { dateStyle: "full" });
            doc.text(`Tanggal Pengerjaan: ${tgl}`, 20, yPos);
            yPos += 15;

            const daftarTts = [
                { q: "1 Mendatar: Tarikan atau ..... yang menyebabkan benda bergerak.", a: "DORONGAN" },
                { q: "4 Mendatar: Menginjak rem mobil saat mendekati lampu merah mengakibatkan perubahan .....", a: "KECEPATAN" },
                { q: "2 Menurun: Kiper menepis bola yang ditendang lawan sehingga melenceng membuktikan gaya dapat mengubah ..... gerak benda.", a: "ARAH" },
                { q: "3 Menurun: Saat menekan tanah liat atau plastisin menjadi pipih, gaya menyebabkan perubahan ..... benda.", a: "BENTUK" }
            ];

            doc.setFontSize(11);
            
            daftarTts.forEach((item) => {
                doc.setFont("helvetica", "bold");
                doc.setTextColor(0, 0, 0);
                const splitSoal = doc.splitTextToSize(item.q, pageWidth - 40);
                doc.text(splitSoal, 20, yPos);
                yPos += (splitSoal.length * 6) + 2;

                doc.setFont("helvetica", "normal");
                doc.setTextColor(21, 128, 61);
                doc.text("Jawaban: " + item.a, 20, yPos);
                doc.setTextColor(0, 0, 0);
                
                yPos += 12;

                if (yPos > pageHeight - 30) {
                    doc.addPage();
                    yPos = 20;
                }
            });

            if (action === "download") {
                doc.save("Laporan_Latihan_Pengertian_Gaya.pdf");
            } else if (action === "upload") {
                const pdfBlob = doc.output("blob");
                const formData = new FormData();
                formData.append("kode_materi", "pengertian_gaya");
                formData.append("file_pdf", pdfBlob, "pengertian_gaya.pdf");

                const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");

                fetch("/siswa/simpan-pdf-latihan", {
                    method: "POST",
                    headers: { "X-CSRF-TOKEN": csrfToken },
                    body: formData,
                })
                .then((response) => response.json())
                .then((data) => console.log("Auto-save PDF Pengertian Gaya sukses:", data))
                .catch((error) => console.error("Auto-save PDF error:", error));
            }
        } catch (err) {
            console.error(err);
            if (action === "download") alert("Gagal membuat PDF.");
        }
    }

    if (btnUnduhGaya) {
        btnUnduhGaya.addEventListener("click", async () => {
            const originalText = btnUnduhGaya.innerHTML;
            btnUnduhGaya.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Memproses...`;
            btnUnduhGaya.disabled = true;

            await generatePDFPengertianGaya("download");

            btnUnduhGaya.innerHTML = originalText;
            btnUnduhGaya.disabled = false;
        });
    }
});

// Js Resultan Gaya
document.addEventListener("DOMContentLoaded", function () {
    const path = window.location.pathname;

    if (path.includes("resultangaya")) {
        const btnSubmitResultan = document.getElementById(
            "btn-submit-resultangaya",
        );
        const btnRetryResultan = document.getElementById(
            "btn-retry-resultangaya",
        );
        const btnUnduhResultan = document.getElementById(
            "btn-unduh-resultangaya",
        );
        const btnNext = document.getElementById("btn-next-materi");

        let originalHref = "";

        // Logika Gembok Tombol Navigasi
        if (btnNext) {
            originalHref = btnNext.getAttribute("href") || "";

            if (btnNext.classList.contains("locked")) {
                btnNext.removeAttribute("href");
                btnNext.style.backgroundColor = "#6c757d";
                btnNext.style.borderColor = "#6c757d";
                btnNext.style.cursor = "not-allowed";
            }

            btnNext.addEventListener("click", function (e) {
                if (this.classList.contains("locked")) {
                    e.preventDefault();
                    if (typeof Swal !== "undefined") {
                        Swal.fire({
                            icon: "warning",
                            title: "Materi Terkunci",
                            text: "Selesaikan latihan resultan gaya terlebih dahulu!",
                            confirmButtonColor: "#f95c50",
                        });
                    }
                }
            });
        }

        const kunciJawaban = {
            1: 40,
            2: 0,
        };

        // Evaluasi Jawaban Latihan
        if (btnSubmitResultan) {
            btnSubmitResultan.addEventListener("click", function () {
                const input1 = document.getElementById("jawaban1");
                const input2 = document.getElementById("jawaban2");

                if (!input1 || !input2) return;

                const val1 = input1.value.trim();
                const val2 = input2.value.trim();

                if (val1 === "" || val2 === "") {
                    if (typeof Swal !== "undefined") {
                        Swal.fire({
                            icon: "warning",
                            title: "Belum Lengkap",
                            text: "Silakan isi semua jawaban terlebih dahulu!",
                            confirmButtonColor: "#f95c50",
                        });
                    } else {
                        alert("Isi semua jawaban terlebih dahulu!");
                    }
                    return;
                }

                input1.readOnly = true;
                input2.readOnly = true;

                let correctCount = 0;

                if (Number(val1) === kunciJawaban[1]) {
                    input1.classList.add("jawaban-benar");
                    correctCount++;
                } else {
                    input1.classList.add("jawaban-salah");
                }

                if (Number(val2) === kunciJawaban[2]) {
                    input2.classList.add("jawaban-benar");
                    correctCount++;
                } else {
                    input2.classList.add("jawaban-salah");
                }

                if (correctCount === 2) {
                    window.progresSiswa = window.progresSiswa || [];
                    if (
                        !window.progresSiswa.includes("resultangaya_completed")
                    ) {
                        window.progresSiswa.push("resultangaya_completed");
                    }

                    if (window.simpanProgresKeDatabase) {
                        window.simpanProgresKeDatabase(
                            "resultangaya_completed",
                        );
                    }

                    if (window.unlockSidebar) {
                        window.unlockSidebar("nav-macam-gaya");
                    }

                    if (btnNext) {
                        btnNext.classList.remove("locked");
                        btnNext.setAttribute("href", originalHref);
                        btnNext.style.backgroundColor = "";
                        btnNext.style.borderColor = "";
                        btnNext.style.cursor = "pointer";
                    }

                    // Tampilkan Tombol PDF & Upload Otomatis
                    if (btnUnduhResultan)
                        btnUnduhResultan.style.display = "inline-block";
                    generatePDFResultanGaya("upload");

                    if (typeof Swal !== "undefined") {
                        Swal.fire({
                            title: "Luar Biasa!",
                            text: "Semua jawaban benar. Materi selanjutnya telah terbuka!",
                            icon: "success",
                            confirmButtonText: "Lanjut",
                            confirmButtonColor: "#2ecc71",
                        });
                    }
                } else {
                    if (typeof Swal !== "undefined") {
                        Swal.fire({
                            title: "Masih Ada yang Kurang Tepat",
                            text: "Silakan klik 'Coba Lagi' untuk memperbaiki jawabanmu yang salah.",
                            icon: "error",
                            confirmButtonText: "Tutup",
                            confirmButtonColor: "#f95c50",
                        });
                    }
                }
            });
        }

        if (btnRetryResultan) {
            btnRetryResultan.addEventListener("click", function () {
                const input1 = document.getElementById("jawaban1");
                const input2 = document.getElementById("jawaban2");

                if (input1) {
                    input1.readOnly = false;
                    input1.classList.remove("jawaban-benar", "jawaban-salah");
                    input1.value = "";
                }
                if (input2) {
                    input2.readOnly = false;
                    input2.classList.remove("jawaban-benar", "jawaban-salah");
                    input2.value = "";
                }
            });
        }

        // Helper Ekstraksi Gambar
        const getCompressedImage = (el) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.setAttribute("crossOrigin", "anonymous");
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

        // Pembuatan Dokumen PDF
        async function generatePDFResultanGaya(action = "download") {
            const { jsPDF } = window.jspdf;
            if (!jsPDF) return;

            try {
                const doc = new jsPDF("p", "mm", "a4");
                const pageWidth = doc.internal.pageSize.getWidth();
                const pageHeight = doc.internal.pageSize.getHeight();
                let yPos = 0;

                doc.setFillColor(249, 92, 80);
                doc.rect(0, 0, pageWidth, 40, "F");
                doc.setTextColor(255, 255, 255);
                doc.setFont("helvetica", "bold");
                doc.setFontSize(22);
                doc.text("Laporan Hasil Latihan", pageWidth / 2, 20, {
                    align: "center",
                });
                doc.setFontSize(12);
                doc.setFont("helvetica", "normal");
                doc.text("Materi: Resultan Gaya", pageWidth / 2, 28, {
                    align: "center",
                });

                yPos = 55;
                doc.setTextColor(80, 80, 80);
                doc.setFontSize(9);
                doc.setFont("helvetica", "italic");
                const tgl = new Date().toLocaleDateString("id-ID", {
                    dateStyle: "full",
                });
                doc.text(`Tanggal Pengerjaan: ${tgl}`, 20, yPos);
                yPos += 10;

                const images = document.querySelectorAll(".gambar-soal");

                // Fungsi perender blok soal
                const drawSoal = async (
                    num,
                    soalText,
                    imgEl,
                    inputId,
                    expectedKey,
                ) => {
                    doc.setFont("helvetica", "bold");
                    doc.setFontSize(11);
                    doc.setTextColor(0, 0, 0);
                    doc.text(`Latihan ${num}`, 20, yPos);
                    yPos += 6;

                    doc.setFont("helvetica", "normal");
                    const splitText = doc.splitTextToSize(
                        soalText,
                        pageWidth - 40,
                    );
                    doc.text(splitText, 20, yPos);
                    yPos += splitText.length * 5 + 5;

                    if (imgEl) {
                        try {
                            const imgData = await getCompressedImage(imgEl);
                            const imgProps = doc.getImageProperties(imgData);
                            const imgWidth = 80;
                            const imgHeight =
                                (imgProps.height * imgWidth) / imgProps.width;
                            const xImg = (pageWidth - imgWidth) / 2;
                            doc.addImage(
                                imgData,
                                "JPEG",
                                xImg,
                                yPos,
                                imgWidth,
                                imgHeight,
                            );
                            yPos += imgHeight + 10;
                        } catch (e) {}
                    }

                    const inputEl = document.getElementById(inputId);
                    const val = inputEl ? inputEl.value.trim() : "";
                    const isBenar = Number(val) === expectedKey && val !== "";

                    doc.setFont("helvetica", "bold");
                    doc.text("Penyelesaian:", 20, yPos);
                    doc.setFont("helvetica", "normal");
                    doc.text("Resultan Gaya (N) =", 50, yPos);

                    let bgColor =
                        val === ""
                            ? [245, 245, 245]
                            : isBenar
                              ? [209, 250, 229]
                              : [254, 226, 226];
                    let borderColor =
                        val === ""
                            ? [200, 200, 200]
                            : isBenar
                              ? [34, 197, 94]
                              : [239, 68, 68];
                    let textColor =
                        val === ""
                            ? [100, 100, 100]
                            : isBenar
                              ? [21, 128, 61]
                              : [185, 28, 28];

                    doc.setFillColor(...bgColor);
                    doc.setDrawColor(...borderColor);
                    doc.roundedRect(85, yPos - 4, 30, 7, 1, 1, "FD");

                    doc.setTextColor(...textColor);
                    doc.text(val || "(?)", 100, yPos + 1, { align: "center" });
                    doc.setTextColor(0, 0, 0);

                    yPos += 15;
                };

                await drawSoal(
                    1,
                    "Alif dan Fajar sedang memindahkan sebuah kotak. Alif berusaha mendorongnya dengan gaya 15 N, sedangkan Fajar berusaha menariknya dengan gaya 25 N. Berapakah resultan gaya yang diterima kotak?",
                    images[0],
                    "jawaban1",
                    40,
                );
                await drawSoal(
                    2,
                    "Fajar dan Fadhil memberi gaya yang sama besar yaitu 30 N dengan arah yang berlawanan. Berapakah gaya yang diterima meja?",
                    images[1],
                    "jawaban2",
                    0,
                );

                const input1 = document.getElementById("jawaban1");
                const input2 = document.getElementById("jawaban2");
                let countBenar = 0,
                    countSalah = 0,
                    countKosong = 0;

                [input1, input2].forEach((inp, idx) => {
                    let val = inp ? inp.value.trim() : "";
                    if (val === "") countKosong++;
                    else if (Number(val) === kunciJawaban[idx + 1])
                        countBenar++;
                    else countSalah++;
                });

                if (yPos > pageHeight - 30) {
                    doc.addPage();
                    yPos = 20;
                }

                doc.setFont("helvetica", "bold");
                const summaryText = `Ringkasan: Benar: ${countBenar}  |  Salah: ${countSalah}  |  Belum Dijawab: ${countKosong}`;
                doc.setDrawColor(0, 0, 0);
                doc.setFillColor(255, 255, 255);
                doc.roundedRect(20, yPos, pageWidth - 40, 10, 1, 1, "S");
                doc.text(summaryText, pageWidth / 2, yPos + 7, {
                    align: "center",
                });

                yPos += 20;
                doc.setFontSize(9);
                doc.setFont("helvetica", "normal");
                doc.setTextColor(150, 150, 150);
                doc.text("Resultan Gaya", pageWidth / 2, yPos, {
                    align: "center",
                });

                if (action === "download") {
                    doc.save("Laporan_Latihan_Resultan_Gaya.pdf");
                } else if (action === "upload") {
                    const pdfBlob = doc.output("blob");
                    const formData = new FormData();
                    formData.append("kode_materi", "resultan_gaya");
                    formData.append("file_pdf", pdfBlob, "resultan_gaya.pdf");

                    const csrfToken = document
                        .querySelector('meta[name="csrf-token"]')
                        ?.getAttribute("content");
                    fetch("/siswa/simpan-pdf-latihan", {
                        method: "POST",
                        headers: { "X-CSRF-TOKEN": csrfToken },
                        body: formData,
                    }).catch(console.error);
                }
            } catch (err) {
                console.error(err);
            }
        }

        if (btnUnduhResultan) {
            btnUnduhResultan.addEventListener("click", async () => {
                const originalText = btnUnduhResultan.innerHTML;
                btnUnduhResultan.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Memproses...`;
                btnUnduhResultan.disabled = true;

                await generatePDFResultanGaya("download");

                btnUnduhResultan.innerHTML = originalText;
                btnUnduhResultan.disabled = false;
            });
        }
    }
});

// Js Macam - macam Gaya
document.addEventListener("DOMContentLoaded", function () {
    const path = window.location.pathname;

    if (path.includes("macam-macamgaya")) {
        const containerMacam = document.getElementById("drag-container-macam");
        const poolMacam = document.getElementById("card-pool-macam");
        const btnCekMacam = document.getElementById("btn-cek-macam");
        const btnRetryMacam = document.getElementById("btn-retry-macam");
        const btnUnduhMacam = document.getElementById("btn-unduh-macam");
        const btnNext = document.getElementById("btn-next-materi");

        let originalHref = "";

        if (btnNext) {
            originalHref = btnNext.getAttribute("href") || "";

            if (btnNext.classList.contains("locked")) {
                btnNext.removeAttribute("href");
                btnNext.style.backgroundColor = "#6c757d";
                btnNext.style.borderColor = "#6c757d";
                btnNext.style.cursor = "not-allowed";
            }

            btnNext.addEventListener("click", function (e) {
                if (this.classList.contains("locked")) {
                    e.preventDefault();
                    if (typeof Swal !== "undefined") {
                        Swal.fire({
                            icon: "warning",
                            title: "Materi Terkunci",
                            text: "Susun semua kartu gaya ke kotak yang tepat untuk membuka materi selanjutnya!",
                            confirmButtonColor: "#f95c50",
                        });
                    }
                }
            });
        }

        if (containerMacam && poolMacam && btnCekMacam) {
            const zones = document.querySelectorAll(
                "#drag-container-macam .drop-zone, #card-pool-macam",
            );
            const cards = document.querySelectorAll(
                "#card-pool-macam .card-item",
            );
            const modal = document.getElementById("modal-macam");
            const modalText = document.getElementById("modal-text-macam");
            const closeModal = document.getElementById("close-modal-macam");

            let draggedIdMacam = null;

            cards.forEach((card) => {
                card.addEventListener("dragstart", function (e) {
                    draggedIdMacam = this.id;
                    e.dataTransfer.setData("text/plain", this.id);
                    setTimeout(() => (this.style.opacity = "0.5"), 0);
                });

                card.addEventListener("dragend", function () {
                    this.style.opacity = "1";
                    draggedIdMacam = null;
                });
            });

            zones.forEach((zone) => {
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

                    const id =
                        e.dataTransfer.getData("text/plain") || draggedIdMacam;
                    const card = document.getElementById(id);

                    if (card) {
                        this.appendChild(card);
                        card.classList.remove("correct", "incorrect");
                    }
                });
            });

            btnCekMacam.addEventListener("click", function () {
                let benar = 0;
                const total = cards.length;

                cards.forEach((card) => {
                    const jawaban = card.dataset.answer;
                    const parent = card.parentElement;
                    const target = parent.dataset.type;

                    if (target === jawaban) {
                        benar++;
                        card.classList.add("correct");
                        card.classList.remove("incorrect");
                    } else if (target === "pool") {
                        card.classList.remove("correct", "incorrect");
                    } else {
                        card.classList.add("incorrect");
                        card.classList.remove("correct");
                    }
                });

                const salah = total - benar;

                if (benar === total) {
                    window.progresSiswa = window.progresSiswa || [];
                    if (!window.progresSiswa.includes("macamgaya_completed")) {
                        window.progresSiswa.push("macamgaya_completed");
                    }

                    if (window.simpanProgresKeDatabase) {
                        window.simpanProgresKeDatabase("macamgaya_completed");
                    }

                    if (window.unlockSidebar)
                        window.unlockSidebar("nav-newton");

                    if (btnNext) {
                        btnNext.classList.remove("locked");
                        btnNext.setAttribute("href", originalHref);
                        btnNext.style.backgroundColor = "";
                        btnNext.style.borderColor = "";
                        btnNext.style.cursor = "pointer";
                    }

                    if (btnUnduhMacam)
                        btnUnduhMacam.style.display = "inline-block";
                    generatePDFMacamGaya("upload");

                    if (typeof Swal !== "undefined") {
                        Swal.fire({
                            title: "Luar Biasa!",
                            text: "Semua jawaban benar! Materi selanjutnya (Hukum Newton) telah terbuka.",
                            icon: "success",
                            confirmButtonText: "Lanjut",
                            confirmButtonColor: "#2ecc71",
                        });
                    }
                } else {
                    if (typeof Swal !== "undefined") {
                        Swal.fire({
                            title: "Hasil Latihan",
                            html: `<b style="color: #28a745;">Benar: ${benar}</b> <br> <b style="color: #dc3545;">Salah: ${salah}</b> <br><br> Silakan perbaiki jawaban yang salah.`,
                            icon: "info",
                            confirmButtonText: "Tutup",
                            confirmButtonColor: "#f95c50",
                        });
                    } else if (modalText && modal) {
                        modalText.innerHTML = `
                            <span class="hasil-benar">✔ Benar : ${benar}</span><br>
                            <span class="hasil-salah">✖ Salah : ${salah}</span>
                        `;
                        modal.style.display = "flex";
                    }
                }
            });

            if (btnRetryMacam) {
                btnRetryMacam.addEventListener("click", function () {
                    cards.forEach((card) => {
                        poolMacam.appendChild(card);
                        card.classList.remove("correct", "incorrect");
                    });
                });
            }

            if (closeModal) {
                closeModal.addEventListener("click", function () {
                    modal.style.display = "none";
                });
            }

            window.addEventListener("click", function (e) {
                if (e.target === modal) modal.style.display = "none";
            });

            async function generatePDFMacamGaya(action = "download") {
                const { jsPDF } = window.jspdf;
                if (!jsPDF) return;

                try {
                    const doc = new jsPDF("p", "mm", "a4");
                    const pageWidth = doc.internal.pageSize.getWidth();
                    const pageHeight = doc.internal.pageSize.getHeight();
                    let yPos = 0;

                    doc.setFillColor(249, 92, 80);
                    doc.rect(0, 0, pageWidth, 40, "F");
                    doc.setTextColor(255, 255, 255);
                    doc.setFont("helvetica", "bold");
                    doc.setFontSize(22);
                    doc.text("Laporan Hasil Latihan", pageWidth / 2, 20, {
                        align: "center",
                    });
                    doc.setFontSize(12);
                    doc.setFont("helvetica", "normal");
                    doc.text("Materi: Macam-Macam Gaya", pageWidth / 2, 28, {
                        align: "center",
                    });

                    yPos = 55;
                    doc.setTextColor(80, 80, 80);
                    doc.setFontSize(9);
                    doc.setFont("helvetica", "italic");
                    const tgl = new Date().toLocaleDateString("id-ID", {
                        dateStyle: "full",
                    });
                    doc.text(`Tanggal Pengerjaan: ${tgl}`, 20, yPos);
                    yPos += 10;

                    doc.setFont("helvetica", "normal");
                    doc.setFontSize(11);
                    doc.setTextColor(0, 0, 0);
                    doc.text("Hasil Klasifikasi Macam-Macam Gaya:", 20, yPos);
                    yPos += 10;

                    const printCategory = (title, selector) => {
                        if (yPos > pageHeight - 30) {
                            doc.addPage();
                            yPos = 20;
                        }
                        doc.setFont("helvetica", "bold");
                        doc.text(title, 20, yPos);
                        yPos += 8;
                        doc.setFont("helvetica", "normal");

                        const dropCards = document.querySelectorAll(
                            `${selector} .card-item`,
                        );
                        if (dropCards.length === 0) {
                            doc.text("- Kosong", 25, yPos);
                            yPos += 8;
                        } else {
                            dropCards.forEach((card, index) => {
                                const text = `${index + 1}. ${card.innerText.trim()}`;
                                const splitText = doc.splitTextToSize(
                                    text,
                                    pageWidth - 40,
                                );
                                doc.text(splitText, 25, yPos);
                                yPos += splitText.length * 6 + 2;
                            });
                        }
                        yPos += 5;
                    };

                    printCategory(
                        "A. Gaya Gesek",
                        '.drop-zone[data-type="gesek"]',
                    );
                    printCategory(
                        "B. Gaya Gravitasi",
                        '.drop-zone[data-type="gravitasi"]',
                    );
                    printCategory(
                        "C. Gaya Pegas",
                        '.drop-zone[data-type="pegas"]',
                    );
                    printCategory(
                        "D. Gaya Otot",
                        '.drop-zone[data-type="otot"]',
                    );

                    let countBenar = 0,
                        countSalah = 0,
                        countKosong = 0;
                    const allCards = document.querySelectorAll(
                        "#drag-container-macam .card-item, #card-pool-macam .card-item",
                    );

                    allCards.forEach((card) => {
                        const kunci = card.dataset.answer;
                        const parentType = card.parentElement.dataset.type;
                        if (parentType === kunci) countBenar++;
                        else if (parentType === "pool") countKosong++;
                        else countSalah++;
                    });

                    if (yPos > pageHeight - 30) {
                        doc.addPage();
                        yPos = 20;
                    }

                    doc.setFont("helvetica", "bold");
                    doc.setTextColor(0, 0, 0);
                    const summaryText = `Ringkasan: Benar: ${countBenar}  |  Salah: ${countSalah}  |  Belum Dijawab: ${countKosong}`;
                    doc.setDrawColor(0, 0, 0);
                    doc.setFillColor(255, 255, 255);
                    doc.roundedRect(20, yPos, pageWidth - 40, 10, 1, 1, "S");
                    doc.text(summaryText, pageWidth / 2, yPos + 7, {
                        align: "center",
                    });

                    yPos += 20;
                    doc.setFontSize(9);
                    doc.setFont("helvetica", "normal");
                    doc.setTextColor(150, 150, 150);
                    doc.text("Macam-Macam Gaya", pageWidth / 2, yPos, {
                        align: "center",
                    });

                    if (action === "download") {
                        doc.save("Laporan_Latihan_Macam_Macam_Gaya.pdf");
                    } else if (action === "upload") {
                        const pdfBlob = doc.output("blob");
                        const formData = new FormData();
                        formData.append("kode_materi", "macam_macam_gaya");
                        formData.append(
                            "file_pdf",
                            pdfBlob,
                            "macam_macam_gaya.pdf",
                        );

                        const csrfToken = document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute("content");
                        fetch("/siswa/simpan-pdf-latihan", {
                            method: "POST",
                            headers: { "X-CSRF-TOKEN": csrfToken },
                            body: formData,
                        }).catch(console.error);
                    }
                } catch (err) {
                    console.error(err);
                }
            }

            if (btnUnduhMacam) {
                btnUnduhMacam.addEventListener("click", async () => {
                    const originalText = btnUnduhMacam.innerHTML;
                    btnUnduhMacam.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Memproses...`;
                    btnUnduhMacam.disabled = true;

                    await generatePDFMacamGaya("download");

                    btnUnduhMacam.innerHTML = originalText;
                    btnUnduhMacam.disabled = false;
                });
            }
        }
    }
});

// Js Hukum Newton
document.addEventListener("DOMContentLoaded", function () {
    const path = window.location.pathname;

    if (path.includes("hukumnewton")) {
        const videoPraktikGaya = document.getElementById("video-praktik-gaya");
        const timeButtonsGaya = document.querySelectorAll(".btn-time");
        const btnCekNewton = document.getElementById("btn-cek-newton");
        const btnResetNewton = document.getElementById("btn-reset-newton");
        const btnTutupNewton = document.getElementById("btn-tutup-newton");
        const btnUnduhNewton = document.getElementById("btn-unduh-newton");
        const btnNext = document.getElementById("btn-next-materi");

        let originalHref = "";
        if (btnNext) {
            originalHref = btnNext.getAttribute("href") || "";

            if (btnNext.classList.contains("locked")) {
                btnNext.removeAttribute("href");
                btnNext.style.backgroundColor = "#6c757d";
                btnNext.style.borderColor = "#6c757d";
                btnNext.style.cursor = "not-allowed";
            }

            btnNext.addEventListener("click", function (e) {
                if (this.classList.contains("locked")) {
                    e.preventDefault();
                    if (typeof Swal !== "undefined") {
                        Swal.fire({
                            icon: "warning",
                            title: "Materi Terkunci",
                            text: "Jawab semua soal latihan Hukum Newton dengan benar untuk membuka kuis selanjutnya!",
                            confirmButtonColor: "#f95c50",
                        });
                    }
                }
            });
        }

        if (
            window.progresSiswa &&
            window.progresSiswa.includes("hukumnewton_completed")
        ) {
            if (btnNext) {
                btnNext.classList.remove("locked");
                btnNext.setAttribute("href", originalHref);
                btnNext.style.backgroundColor = "";
                btnNext.style.borderColor = "";
                btnNext.style.cursor = "pointer";
            }
        }

        if (videoPraktikGaya && timeButtonsGaya.length > 0) {
            timeButtonsGaya.forEach((btn) => {
                btn.addEventListener("click", function () {
                    const targetTime = parseFloat(
                        this.getAttribute("data-time"),
                    );
                    if (!isNaN(targetTime)) {
                        videoPraktikGaya.currentTime = targetTime;
                        videoPraktikGaya.play();
                    }
                });
            });
        }

        if (btnCekNewton) {
            document
                .querySelectorAll(".grup-opsi .tombol-opsi")
                .forEach((btn) => {
                    btn.addEventListener("click", () => {
                        const grup = btn.parentElement;
                        if (grup.classList.contains("terkunci")) return;

                        grup.querySelectorAll(".tombol-opsi").forEach((b) =>
                            b.classList.remove("dipilih"),
                        );

                        btn.classList.add("dipilih");
                        grup.dataset.jawaban = btn.dataset.pilihan;
                    });
                });

            btnCekNewton.addEventListener("click", () => {
                let benar = 0;
                let totalSoal = 0;
                const semuaGrup = document.querySelectorAll(".grup-opsi");

                let belumDiisi = false;
                semuaGrup.forEach((grup) => {
                    if (!grup.dataset.jawaban) belumDiisi = true;
                });

                if (belumDiisi) {
                    if (typeof Swal !== "undefined") {
                        Swal.fire({
                            icon: "warning",
                            title: "Belum Lengkap",
                            text: "Silakan pilih jawaban untuk semua soal terlebih dahulu!",
                            confirmButtonColor: "#f95c50",
                        });
                    }
                    return;
                }

                semuaGrup.forEach((grup) => {
                    totalSoal++;
                    const jawabanSiswa = grup.dataset.jawaban;
                    const kunci = grup.dataset.kunci;

                    grup.classList.add("terkunci");
                    grup.querySelectorAll(".tombol-opsi").forEach((b) =>
                        b.classList.remove("jawaban-benar", "jawaban-salah"),
                    );

                    if (jawabanSiswa === kunci) {
                        benar++;
                        grup.querySelector(
                            `[data-pilihan="${jawabanSiswa}"]`,
                        ).classList.add("jawaban-benar");
                    } else {
                        const btnSalah = grup.querySelector(
                            `[data-pilihan="${jawabanSiswa}"]`,
                        );
                        if (btnSalah) btnSalah.classList.add("jawaban-salah");
                    }
                });

                const popupText = document.getElementById("popup-newton-text");
                const popupBox = document.getElementById("popup-newton");

                if (popupText && popupBox) {
                    let salah = totalSoal - benar;
                    popupText.innerHTML = `
                      <span class="hasil-benar">✔ Benar : ${benar}</span>
                      <span class="pemisah">|</span>
                      <span class="hasil-salah">✖ Salah : ${salah}</span>
                    `;
                    popupBox.classList.add("show");
                }

                if (benar === totalSoal) {
                    window.progresSiswa = window.progresSiswa || [];
                    if (
                        !window.progresSiswa.includes("hukumnewton_completed")
                    ) {
                        window.progresSiswa.push("hukumnewton_completed");
                    }

                    if (window.simpanProgresKeDatabase) {
                        window.simpanProgresKeDatabase("hukumnewton_completed");
                    }

                    if (window.unlockSidebar) window.unlockSidebar("nav-kuis2");

                    if (btnNext) {
                        btnNext.classList.remove("locked");
                        btnNext.setAttribute("href", originalHref);
                        btnNext.style.backgroundColor = "";
                        btnNext.style.borderColor = "";
                        btnNext.style.cursor = "pointer";

                        setTimeout(() => {
                            if (popupBox) popupBox.classList.remove("show");
                            if (typeof Swal !== "undefined") {
                                Swal.fire({
                                    title: "Luar Biasa!",
                                    text: "Kamu berhasil menguasai Hukum Newton! Silakan lanjut ke Kuis 2.",
                                    icon: "success",
                                    confirmButtonText: "Lanjut",
                                    confirmButtonColor: "#2ecc71",
                                });
                            }
                        }, 1200);
                    }

                    if (btnUnduhNewton)
                        btnUnduhNewton.style.display = "inline-block";
                    generatePDFHukumNewton("upload");
                }
            });

            btnResetNewton.addEventListener("click", () => {
                document.querySelectorAll(".grup-opsi").forEach((grup) => {
                    delete grup.dataset.jawaban;
                    grup.classList.remove("terkunci");
                    grup.querySelectorAll(".tombol-opsi").forEach((b) =>
                        b.classList.remove(
                            "dipilih",
                            "jawaban-benar",
                            "jawaban-salah",
                        ),
                    );
                });

                const popupBox = document.getElementById("popup-newton");
                if (popupBox) popupBox.classList.remove("show");
            });

            if (btnTutupNewton) {
                btnTutupNewton.addEventListener("click", () => {
                    const popupBox = document.getElementById("popup-newton");
                    if (popupBox) popupBox.classList.remove("show");
                });
            }

            // Fungsi Auto-save dan Download PDF
            async function generatePDFHukumNewton(action = "download") {
                const { jsPDF } = window.jspdf;
                if (!jsPDF) return;

                try {
                    const doc = new jsPDF("p", "mm", "a4");
                    const pageWidth = doc.internal.pageSize.getWidth();
                    const pageHeight = doc.internal.pageSize.getHeight();
                    let yPos = 0;

                    doc.setFillColor(249, 92, 80);
                    doc.rect(0, 0, pageWidth, 40, "F");
                    doc.setTextColor(255, 255, 255);
                    doc.setFont("helvetica", "bold");
                    doc.setFontSize(22);
                    doc.text("Laporan Hasil Latihan", pageWidth / 2, 20, {
                        align: "center",
                    });
                    doc.setFontSize(12);
                    doc.setFont("helvetica", "normal");
                    doc.text("Materi: Hukum Newton", pageWidth / 2, 28, {
                        align: "center",
                    });

                    yPos = 55;
                    doc.setTextColor(80, 80, 80);
                    doc.setFontSize(9);
                    doc.setFont("helvetica", "italic");
                    const tgl = new Date().toLocaleDateString("id-ID", {
                        dateStyle: "full",
                    });
                    doc.text(`Tanggal Pengerjaan: ${tgl}`, 20, yPos);
                    yPos += 10;

                    let countBenar = 0,
                        countSalah = 0,
                        countKosong = 0;
                    const semuaKotak = document.querySelectorAll(".kotak-kuis");

                    semuaKotak.forEach((kotak) => {
                        const soalText =
                            kotak.querySelector(".teks-soal").innerText;
                        const terpilih = kotak.querySelector(
                            ".tombol-opsi.jawaban-benar, .tombol-opsi.jawaban-salah, .tombol-opsi.dipilih",
                        );

                        let status = "kosong";
                        let teksJawaban = "(Tidak dijawab)";

                        if (terpilih) {
                            teksJawaban = terpilih.innerText.trim();
                            if (terpilih.classList.contains("jawaban-benar")) {
                                status = "benar";
                                countBenar++;
                            } else {
                                status = "salah";
                                countSalah++;
                            }
                        } else {
                            countKosong++;
                        }

                        if (yPos > pageHeight - 35) {
                            doc.addPage();
                            yPos = 20;
                        }

                        doc.setFont("helvetica", "bold");
                        doc.setTextColor(0, 0, 0);
                        const splitSoal = doc.splitTextToSize(
                            soalText,
                            pageWidth - 40,
                        );
                        doc.text(splitSoal, 20, yPos);
                        yPos += splitSoal.length * 6;

                        if (status === "benar") {
                            doc.setFillColor(209, 250, 229);
                            doc.setDrawColor(34, 197, 94);
                            doc.setTextColor(21, 128, 61);
                        } else if (status === "salah") {
                            doc.setFillColor(254, 226, 226);
                            doc.setDrawColor(239, 68, 68);
                            doc.setTextColor(185, 28, 28);
                        } else {
                            doc.setFillColor(245, 245, 245);
                            doc.setDrawColor(200, 200, 200);
                            doc.setTextColor(100, 100, 100);
                        }

                        const splitAns = doc.splitTextToSize(
                            teksJawaban,
                            pageWidth - 50,
                        );
                        const rectHeight = splitAns.length * 5 + 6;

                        doc.roundedRect(
                            20,
                            yPos - 5,
                            pageWidth - 40,
                            rectHeight,
                            1,
                            1,
                            "FD",
                        );
                        doc.setFont("helvetica", "normal");
                        doc.text(splitAns, 25, yPos + 1);

                        yPos += rectHeight + 8;
                    });

                    if (yPos > pageHeight - 30) {
                        doc.addPage();
                        yPos = 20;
                    }

                    doc.setFont("helvetica", "bold");
                    doc.setTextColor(0, 0, 0);
                    const summaryText = `Ringkasan: Benar: ${countBenar}  |  Salah: ${countSalah}  |  Belum Dijawab: ${countKosong}`;

                    doc.setDrawColor(0, 0, 0);
                    doc.setFillColor(255, 255, 255);
                    doc.roundedRect(20, yPos, pageWidth - 40, 10, 1, 1, "S");
                    doc.text(summaryText, pageWidth / 2, yPos + 7, {
                        align: "center",
                    });

                    yPos += 20;
                    doc.setFontSize(9);
                    doc.setFont("helvetica", "normal");
                    doc.setTextColor(150, 150, 150);
                    doc.text("Hukum Newton", pageWidth / 2, yPos, {
                        align: "center",
                    });

                    if (action === "download") {
                        doc.save("Laporan_Latihan_Hukum_Newton.pdf");
                    } else if (action === "upload") {
                        const pdfBlob = doc.output("blob");
                        const formData = new FormData();
                        formData.append("kode_materi", "hukum_newton"); // Kode materi GuruController
                        formData.append(
                            "file_pdf",
                            pdfBlob,
                            "hukum_newton.pdf",
                        );

                        const csrfToken = document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute("content");

                        fetch("/siswa/simpan-pdf-latihan", {
                            method: "POST",
                            headers: { "X-CSRF-TOKEN": csrfToken },
                            body: formData,
                        }).catch(console.error);
                    }
                } catch (err) {
                    console.error(err);
                }
            }

            if (btnUnduhNewton) {
                btnUnduhNewton.addEventListener("click", async () => {
                    const originalText = btnUnduhNewton.innerHTML;
                    btnUnduhNewton.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Memproses...`;
                    btnUnduhNewton.disabled = true;

                    await generatePDFHukumNewton("download");

                    btnUnduhNewton.innerHTML = originalText;
                    btnUnduhNewton.disabled = false;
                });
            }
        }
    }
});

// Js Kuis 1 (Materi Gerak)
document.addEventListener("DOMContentLoaded", function () {
    if (document.querySelector(".body-kuis-fullscreen")) {
        // FUNGSI MENYIMPAN NILAI KE DATABASE
        function simpanNilaiKeDatabase(jenisKuis, nilaiSkala100, arrayDetail) {
            const csrfToken = document
                .querySelector('meta[name="csrf-token"]')
                ?.getAttribute("content");

            if (!csrfToken) {
                console.error(
                    "CSRF Token tidak ditemukan. Nilai gagal disimpan.",
                );
                return;
            }

            fetch("/simpan-nilai", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": csrfToken,
                },
                body: JSON.stringify({
                    jenis_kuis: jenisKuis,
                    nilai_percobaan: nilaiSkala100,
                    detail_jawaban: arrayDetail,
                }),
            })
                .then((response) => response.json())
                .then((data) => console.log(data.message))
                .catch((error) =>
                    console.error("Error menyimpan nilai:", error),
                );
        }

        // 1. DATA SOAL KUIS 1
        const questions = [
            {
                q: "Suatu benda dikatakan bergerak apabila …",
                options: [
                    "Kedudukan benda selalu tetap",
                    "Jarak benda tidak berubah terhadap benda lain",
                    "Kedudukan benda berubah terhadap titik acuan",
                    "Kecepatan benda selalu tetap",
                ],
                answer: 2,
            },
            {
                q: "Saat berkendara di malam hari, kita sering melihat bulan seolah-olah bergerak mengikuti arah lari kita. Fenomena ini merupakan contoh dari...",
                options: [
                    "Gerak lurus beraturan",
                    "Gerak semu",
                    "Gerak relatif",
                    "Gerak dipercepat",
                ],
                answer: 1,
            },
            {
                q: "Perpindahan didefinisikan sebagai ...",
                options: [
                    "Panjang lintasan yang ditempuh tanpa memedulikan arah.",
                    "Waktu yang diperlukan benda untuk berpindah tempat.",
                    "Jarak antara posisi awal dan posisi akhir dengan memperhatikan arah.",
                    "Selisih antara kecepatan awal dan kecepatan akhir.",
                ],
                answer: 2,
            },
            {
                q: "Budi berlari berkeliling lapangan bola yang memiliki keliling 400 meter. Jika Budi berlari tepat satu putaran dan kembali ke posisi awal, maka ...",
                options: [
                    "Jarak = 0 m, perpindahan = 400 m",
                    "Jarak = 400 m, perpindahan = 0 m",
                    "Jarak = 400 m, perpindahan = 400 m",
                    "Jarak = 0 m, perpindahan = 0 m",
                ],
                answer: 1,
            },
            {
                q: "Seorang anak bersepeda ke arah selatan sejauh 120 meter, kemudian berbalik arah ke utara menuju sekolah sejauh 40 meter. Jika waktu yang dihabiskan adalah 20 sekon, maka besar kecepatan rata-rata anak tersebut adalah...",
                options: [
                    "8 m/s ke arah selatan",
                    "8 m/s ke arah utara",
                    "4 m/s ke arah utara",
                    "4 m/s ke arah selatan",
                ],
                answer: 3,
            },
            {
                q: "Sebuah bus sekolah menempuh jarak total 150 meter untuk menjemput siswa dalam waktu 25 sekon. Kelajuan bus tersebut adalah …",
                options: ["2 m/s", "4 m/s", "6 m/s", "8 m/s"],
                answer: 2,
            },
            {
                q: "Perbedaan mendasar antara kelajuan dan kecepatan berdasarkan sifat besarannya adalah...",
                options: [
                    "Kelajuan memiliki arah, sedangkan kecepatan tidak memiliki arah.",
                    "Kelajuan dihitung berdasarkan perpindahan, sedangkan kecepatan berdasarkan jarak.",
                    "Kelajuan adalah besaran skalar, sedangkan kecepatan adalah besaran vektor.",
                    "Kelajuan selalu memiliki nilai yang lebih kecil daripada kecepatan.",
                ],
                answer: 2,
            },
            {
                q: "Besaran yang menyatakan adanya perubahan kecepatan suatu benda, baik menjadi lebih cepat maupun lebih lambat dalam selang waktu tertentu, disebut...",
                options: [
                    "Kelajuan rata-rata",
                    "Kecepatan tetap",
                    "Percepatan",
                    "Perpindahan",
                ],
                answer: 2,
            },
            {
                q: "Sebuah sepeda mula-mula bergerak dengan kecepatan 10 m/s, kemudian pada detik ke-20 kecepatannya menjadi 50 m/s. Besar percepatan yang dialami sepeda tersebut adalah …",
                options: ["2 m/s²", "3 m/s²", "4 m/s²", "5 m/s²"],
                answer: 0,
            },
            {
                q: "Seorang pelari maraton yang telah melewati garis finis perlahan-lahan mengurangi kecepatannya dari berlari kencang menjadi jalan santai hingga akhirnya berhenti untuk mengatur napas. Berdasarkan konsep percepatan, peristiwa yang dialami pelari setelah melewati garis finis tersebut adalah...",
                options: [
                    "Gerak dipercepat karena pelari tersebut masih memiliki energi untuk bergerak.",
                    "Gerak dengan kecepatan tetap karena perpindahannya terus bertambah.",
                    "Gerak diperlambat karena terjadi perubahan kecepatan yang nilainya negatif.",
                    "Gerak semu karena pelari merasa garis finis menjauh darinya.",
                ],
                answer: 2,
            },
        ];

        // 2. STATE & DOM ELEMENTS
        let currentIndex = 0;
        const userAnswers = new Array(questions.length).fill(null);
        let lastResultTuntas = false;

        const navSoal = document.getElementById("navSoal");
        const questionNumber = document.getElementById("questionNumber");
        const questionText = document.getElementById("questionText");
        const optionsList = document.getElementById("optionsList");
        const prevBtn = document.getElementById("prevBtn");
        const nextBtn = document.getElementById("nextBtn");
        const finishBtn = document.getElementById("finishBtn");
        const timerEl = document.getElementById("timer");

        // 3. FUNGSI LOGIKA KUIS
        function renderNav() {
            navSoal.innerHTML = "";
            questions.forEach((_, i) => {
                const btn = document.createElement("button");
                btn.textContent = i + 1;
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

        function loadQuestion() {
            const q = questions[currentIndex];
            questionNumber.textContent = "Nomor " + (currentIndex + 1);
            questionText.textContent = q.q;

            optionsList.innerHTML = "";

            q.options.forEach((opt, idx) => {
                const li = document.createElement("li");
                const isChecked = userAnswers[currentIndex] === idx;
                const checkedAttr = isChecked ? "checked" : "";

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

            prevBtn.disabled = currentIndex === 0;
            prevBtn.style.opacity = currentIndex === 0 ? "0.5" : "1";

            // Modifikasi tombol di soal terakhir
            if (currentIndex === questions.length - 1) {
                nextBtn.innerHTML =
                    '<span class="nav-text-hide">Selesaikan Kuis</span> ✓';
                nextBtn.style.backgroundColor = "#2ecc71";
                nextBtn.style.borderColor = "#2ecc71";
            } else {
                nextBtn.innerHTML =
                    '<span class="nav-text-hide">Selanjutnya</span> →';
                nextBtn.style.backgroundColor = "";
                nextBtn.style.borderColor = "";
            }
        }

        optionsList.addEventListener("change", function (e) {
            if (e.target.name === "option") {
                userAnswers[currentIndex] = Number(e.target.value);
                renderNav();
            }
        });

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
            } else {
                finishBtn.click(); // Memicu tombol selesaikan kuis jika di soal terakhir
            }
        });

        // 4. HASIL KUIS & PENYIMPANAN PROGRES
        function showSweetAlertResult(tuntas, score100, scoreAsli, totalSoal) {
            lastResultTuntas = tuntas;

            let titleText = tuntas ? "Luar Biasa!" : "Belum Tuntas";
            let iconType = tuntas ? "success" : "error";

            let messageHtml = tuntas
                ? `Nilai kamu: <b style="font-size: 24px; color: #2ecc71;">${score100}</b><br><br>Kamu hebat! Materi gerak sudah dikuasai. Siap lanjut ke Gaya?`
                : `Nilai kamu: <b style="font-size: 24px; color: #e74c3c;">${score100}</b><br><br>Jangan menyerah! Yuk, pelajari ulang materi Gerak agar lebih paham.`;

            Swal.fire({
                title: titleText,
                html: messageHtml,
                icon: iconType,
                confirmButtonText: tuntas
                    ? "Lanjut Materi Berikutnya 🚀"
                    : "Belajar Ulang 📚",
                confirmButtonColor: tuntas ? "#f95c50" : "#65676b",
                allowOutsideClick: false,
                backdrop: `rgba(0,0,123,0.4)`,
            }).then((result) => {
                if (result.isConfirmed) {
                    if (lastResultTuntas) {
                        window.progresSiswa = window.progresSiswa || [];

                        if (!window.progresSiswa.includes("kuis1_completed")) {
                            window.progresSiswa.push("kuis1_completed");
                        }

                        if (window.simpanProgresKeDatabase) {
                            window.simpanProgresKeDatabase("kuis1_completed");
                        }

                        window.location.href = window.GAYA_PAGE;
                    } else {
                        window.location.href = window.PENGERTIAN_PAGE;
                    }
                }
            });
        }

        function hitungDanKirimNilai() {
            let score = 0;
            let arrayDetail = [];

            questions.forEach((q, i) => {
                let isBenar = userAnswers[i] === q.answer;
                if (isBenar) score++;
                arrayDetail.push(isBenar);
            });

            let score100 = Math.round((score / questions.length) * 100);
            const nilaiKkm = window.KKM_KUIS || 70;
            const tuntas = score100 >= nilaiKkm;

            simpanNilaiKeDatabase("Kuis 1", score100, arrayDetail);
            showSweetAlertResult(tuntas, score100, score, questions.length);
        }

        finishBtn.addEventListener("click", () => {
            if (userAnswers.includes(null)) {
                Swal.fire({
                    title: "Belum Selesai!",
                    text: "Masih ada soal yang belum dijawab. Cek nomor yang berwarna putih.",
                    icon: "warning",
                    confirmButtonText: "Oke, saya lengkapi",
                    confirmButtonColor: "#f95c50",
                });
                return;
            }

            Swal.fire({
                title: "Yakin mau mengumpulkan?",
                text: "Pastikan semua jawaban sudah diperiksa ya!",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#2ecc71",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ya, Kumpulkan!",
                cancelButtonText: "Cek lagi",
            }).then((result) => {
                if (result.isConfirmed) {
                    clearInterval(timerInterval);
                    hitungDanKirimNilai();
                }
            });
        });

        // 5. TIMER KUIS
        let timeLeft = 20 * 60; // 20 Menit

        const timerInterval = setInterval(() => {
            const m = Math.floor(timeLeft / 60);
            const s = timeLeft % 60;
            timerEl.textContent = m + ":" + s.toString().padStart(2, "0");

            if (timeLeft > 0) {
                timeLeft--;
            } else {
                clearInterval(timerInterval);

                Swal.fire({
                    title: "Waktu Habis!",
                    text: "Kuis akan otomatis dikumpulkan.",
                    icon: "info",
                    timer: 2000,
                    showConfirmButton: false,
                    allowOutsideClick: false,
                }).then(() => {
                    hitungDanKirimNilai();
                });
            }
        }, 1000);

        renderNav();
        loadQuestion();
    }
});

// Js Kuis 2 (Materi Gaya)
document.addEventListener("DOMContentLoaded", function () {
    // 1. CEK IDENTITAS HALAMAN
    const halamanKuis2 = document.getElementById("halaman-kuis-2");

    if (halamanKuis2) {
        // FUNGSI MENYIMPAN NILAI KE DATABASE
        function simpanNilaiKeDatabase(jenisKuis, nilaiSkala100, arrayDetail) {
            const csrfToken = document
                .querySelector('meta[name="csrf-token"]')
                ?.getAttribute("content");

            if (!csrfToken) {
                console.error(
                    "CSRF Token tidak ditemukan. Nilai gagal disimpan.",
                );
                return;
            }

            fetch("/simpan-nilai", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": csrfToken,
                },
                body: JSON.stringify({
                    jenis_kuis: jenisKuis,
                    nilai_percobaan: nilaiSkala100,
                    detail_jawaban: arrayDetail,
                }),
            })
                .then((response) => response.json())
                .then((data) => console.log(data.message))
                .catch((error) =>
                    console.error("Error menyimpan nilai:", error),
                );
        }

        // 2. DATA SOAL
        const questions = [
            {
                q: "Berdasarkan materi yang telah dipelajari, pengertian gaya adalah...",
                options: [
                    "Energi yang dimiliki benda agar tetap panas",
                    "Tarikan atau dorongan yang diberikan pada suatu benda",
                    "Sifat benda yang menyebabkannya selalu ingin diam",
                    "Massa benda yang menyebabkan benda jatuh ke bawah",
                ],
                answer: 1,
            },
            {
                q: "Seorang pengrajin gerabah menekan sekepal tanah liat hingga menjadi sebuah vas bunga yang cantik. Peristiwa ini merupakan bukti nyata bahwa gaya dapat...",
                options: [
                    "Mengubah arah gerak benda",
                    "Mengubah bentuk benda",
                    "Mengubah massa benda",
                    "Mengubah benda diam menjadi bergerak",
                ],
                answer: 1,
            },
            {
                q: "Seorang pemain bola voli melakukan smash dengan memukul bola yang datang ke arahnya menuju ke area lawan. Berdasarkan konsep gaya, tindakan pemain tersebut bertujuan untuk...",
                options: [
                    "Menambah gaya gravitasi pada bola",
                    "Mengubah arah gerak bola",
                    "Membuat gaya gesek bola menjadi statis",
                    "Menghilangkan inersia pada bola",
                ],
                answer: 1,
            },
            {
                q: "Dua orang kurir sedang berebut mendorong sebuah peti kayu besar di gudang. Kurir A mendorong peti ke arah kanan dengan gaya 75 N, sedangkan Kurir B mendorong peti ke arah kiri dengan gaya 45 N. Berdasarkan aturan arah gaya, apa yang akan terjadi pada peti tersebut?",
                options: [
                    "Peti tetap diam karena kedua gaya saling meniadakan",
                    "Peti bergerak ke kiri dengan resultan gaya sebesar 120 N",
                    "Peti bergerak ke kanan dengan resultan gaya sebesar 30 N",
                    "Peti bergerak ke kanan dengan resultan gaya sebesar 120 N",
                ],
                answer: 2,
            },
            {
                q: "Dalam sebuah video ilustrasi, tiga anak bekerja sama memindahkan kotak. Dua anak mendorong dari belakang dengan gaya F₁ = 25 N dan F₂ = 30 N, sementara satu anak menarik dari depan dengan gaya F₃ = 45 N. Berapakah total resultan gaya yang bekerja pada kotak tersebut?",
                options: ["10 N", "55 N", "100 N", "15 N"],
                answer: 2,
            },
            {
                q: "Mengapa saat kita baru mulai mendorong sebuah lemari pakaian yang berat terasa sangat sulit, namun setelah lemari itu bergeser, dorongan kita terasa sedikit lebih ringan?",
                options: [
                    "Karena saat diam bekerja gaya gesek statis yang lebih besar dari gaya gesek kinetis",
                    "Karena gaya gravitasi lemari hilang saat benda mulai bergerak",
                    "Karena gaya otot manusia meningkat secara otomatis saat benda meluncur",
                    "Karena gaya pegas lantai membantu mendorong lemari",
                ],
                answer: 0,
            },
            {
                q: "Seorang atlet panahan menarik tali busur sehingga busur melengkung, lalu melepaskannya hingga anak panah melesat. Jenis gaya yang bekerja secara berturut-turut pada saat menarik tali dan saat anak panah melesat adalah...",
                options: [
                    "Gaya gesek dan gaya gravitasi",
                    "Gaya otot dan gaya pegas",
                    "Gaya pegas dan gaya otot",
                    "Gaya otot dan gaya gesek",
                ],
                answer: 1,
            },
            {
                q: "Andi sedang berdiri santai di atas bus yang sedang berhenti. Tiba-tiba, sopir bus menginjak gas dan menjalankan bus ke depan secara mendadak. Hal ini menyebabkan tubuh Andi terdorong ke arah belakang. Fenomena ini terjadi karena...",
                options: [
                    "Tubuh Andi memiliki sifat inersia untuk mempertahankan posisi diamnya",
                    "Ada gaya gravitasi bumi yang menarik Andi ke belakang",
                    "Gaya aksi dari bus lebih kecil daripada gaya reaksi Andi",
                    "Terjadi perubahan massa pada tubuh Andi saat bus bergerak",
                ],
                answer: 0,
            },
            {
                q: "Dua buah balok, balok A (2 kg) dan balok B (10 kg), diberikan gaya dorong yang sama besar. Pernyataan yang paling tepat mengenai percepatan kedua balok adalah...",
                options: [
                    "Balok B bergerak lebih cepat karena massanya besar",
                    "Balok A memiliki percepatan lebih besar karena massanya lebih ringan",
                    "Kedua balok memiliki percepatan yang sama karena gayanya sama",
                    "Balok A tetap diam karena kelembamannya lebih besar",
                ],
                answer: 1,
            },
            {
                q: "Saat kamu sedang mendayung perahu di danau, kamu menggerakkan dayung dengan cara mendorong air ke arah belakang (aksi). Akibatnya, perahu akan bergerak maju ke depan (reaksi). Hal ini membuktikan bahwa...",
                options: [
                    "Gaya aksi (dorongan air ke belakang) menghasilkan gaya reaksi (perahu maju ke depan)",
                    "Perahu bergerak karena gaya gravitasi air lebih besar",
                    "Dayung menghilangkan gaya gesek antara perahu dan air",
                    "Resultan gaya pada perahu harus selalu bernilai nol agar dapat bergerak lurus",
                ],
                answer: 2,
            },
        ];

        // 3. STATE
        let currentIndex = 0;
        const userAnswers = new Array(questions.length).fill(null);
        let lastResultTuntas = false;

        // 4. DOM ELEMENTS (MENGGUNAKAN ID BARU YANG ADA SUFFIX -kuis2)
        const navSoal = document.getElementById("navSoal-kuis2");
        const questionNumber = document.getElementById("questionNumber-kuis2");
        const questionText = document.getElementById("questionText-kuis2");
        const optionsList = document.getElementById("optionsList-kuis2");
        const prevBtn = document.getElementById("prevBtn-kuis2");
        const nextBtn = document.getElementById("nextBtn-kuis2");
        const finishBtn = document.getElementById("finishBtn-kuis2");
        const timerEl = document.getElementById("timer-kuis2");

        // 5. FUNGSI RENDER NAVIGASI
        function renderNav() {
            if (!navSoal) return;

            navSoal.innerHTML = "";
            questions.forEach((_, i) => {
                const btn = document.createElement("button");
                btn.textContent = i + 1;
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

        // 6. FUNGSI LOAD SOAL
        function loadQuestion() {
            if (!questionText || !optionsList) return;

            const q = questions[currentIndex];
            questionNumber.textContent = "Nomor " + (currentIndex + 1);
            questionText.textContent = q.q;

            optionsList.innerHTML = "";

            q.options.forEach((opt, idx) => {
                const li = document.createElement("li");

                const isChecked = userAnswers[currentIndex] === idx;
                const checkedAttr = isChecked ? "checked" : "";

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
                if (currentIndex === questions.length - 1) {
                    nextBtn.innerHTML =
                        '<span class="nav-text-hide">Selesaikan Kuis</span> ✓';
                    nextBtn.style.backgroundColor = "#2ecc71";
                    nextBtn.style.borderColor = "#2ecc71";
                } else {
                    nextBtn.innerHTML =
                        '<span class="nav-text-hide">Selanjutnya</span> →';
                    nextBtn.style.backgroundColor = "";
                    nextBtn.style.borderColor = "";
                }
            }
        }

        // 7. EVENT HANDLERS
        if (optionsList) {
            optionsList.addEventListener("change", function (e) {
                if (e.target.name === "option-kuis2") {
                    userAnswers[currentIndex] = Number(e.target.value);
                    renderNav();
                }
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener("click", () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    loadQuestion();
                }
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener("click", () => {
                if (currentIndex < questions.length - 1) {
                    currentIndex++;
                    loadQuestion();
                } else {
                    if (finishBtn) finishBtn.click();
                }
            });
        }

        // 8. LOGIKA HASIL & POPUP
        function showSweetAlertResult(tuntas, score100, scoreAsli, totalSoal) {
            lastResultTuntas = tuntas;

            let titleText = tuntas ? "Luar Biasa!" : "Belum Tuntas";
            let iconType = tuntas ? "success" : "error";
            let messageHtml = tuntas
                ? `Nilai kamu: <b style="font-size: 24px; color: #2ecc71;">${score100}</b><br><br>Selamat! Materi Gaya Selesai.`
                : `Nilai kamu: <b style="font-size: 24px; color: #e74c3c;">${score100}</b><br><br>Nilai belum mencapai target. Yuk, pelajari lagi!`;

            const urlLulus = window.NEXT_PAGE || "/siswa/dashboard";
            const urlGagal = window.RETRY_PAGE || "/siswa/gaya/pengertiangaya";

            Swal.fire({
                title: titleText,
                html: messageHtml,
                icon: iconType,
                confirmButtonText: tuntas
                    ? "Lanjut ke Dashboard 🏠"
                    : "Pelajari Ulang 📚",
                confirmButtonColor: tuntas ? "#2ecc71" : "#65676b",
                allowOutsideClick: false,
                backdrop: `rgba(0,0,123,0.4)`,
            }).then((result) => {
                if (result.isConfirmed) {
                    if (tuntas) {
                        window.progresSiswa = window.progresSiswa || [];
                        if (!window.progresSiswa.includes("kuis2_completed")) {
                            window.progresSiswa.push("kuis2_completed");
                        }

                        if (window.simpanProgresKeDatabase) {
                            window.simpanProgresKeDatabase("kuis2_completed");
                        }
                        window.location.href = urlLulus;
                    } else {
                        window.location.href = urlGagal;
                    }
                }
            });
        }

        function hitungDanTampilkanNilai() {
            let score = 0;
            let arrayDetail = [];

            questions.forEach((q, i) => {
                let isBenar = userAnswers[i] === q.answer;
                if (isBenar) score++;
                arrayDetail.push(isBenar);
            });

            let score100 = Math.round((score / questions.length) * 100);
            const nilaiKkm = window.KKM_KUIS || 70;
            const tuntas = score100 >= nilaiKkm;

            simpanNilaiKeDatabase("Kuis 2", score100, arrayDetail);
            showSweetAlertResult(tuntas, score100, score, questions.length);
        }

        if (finishBtn) {
            finishBtn.addEventListener("click", () => {
                if (userAnswers.includes(null)) {
                    Swal.fire({
                        title: "Belum Selesai!",
                        text: "Masih ada soal yang belum dijawab. Cek nomor yang berwarna putih.",
                        icon: "warning",
                        confirmButtonText: "Oke",
                        confirmButtonColor: "#f95c50",
                    });
                    return;
                }

                Swal.fire({
                    title: "Yakin mau mengumpulkan?",
                    text: "Jawaban yang sudah dikirim tidak dapat diubah.",
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonText: "Ya, Kumpulkan!",
                    cancelButtonText: "Cek lagi",
                    confirmButtonColor: "#2ecc71",
                    cancelButtonColor: "#d33",
                }).then((result) => {
                    if (result.isConfirmed) {
                        clearInterval(timerInterval);
                        hitungDanTampilkanNilai();
                    }
                });
            });
        }

        // 9. TIMER
        let timeLeft = 20 * 60; // Diubah ke 20 Menit
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
                    title: "Waktu Habis!",
                    text: "Kuis akan otomatis dikumpulkan.",
                    icon: "info",
                    timer: 2000,
                    showConfirmButton: false,
                    allowOutsideClick: false,
                }).then(() => {
                    hitungDanTampilkanNilai();
                });
            }
        }, 1000);

        // 10. JALANKAN FUNGSI PERTAMA KALI
        renderNav();
        loadQuestion();
    }
});

// Js Evaluasi
document.addEventListener("DOMContentLoaded", function () {
    const halamanEvaluasi = document.getElementById("halaman-evaluasi");

    if (halamanEvaluasi) {
        // FUNGSI MENYIMPAN NILAI KE DATABASE
        function simpanNilaiKeDatabase(jenisKuis, nilaiSkala100, arrayDetail) {
            const csrfToken = document
                .querySelector('meta[name="csrf-token"]')
                ?.getAttribute("content");

            if (!csrfToken) {
                console.error(
                    "CSRF Token tidak ditemukan. Nilai gagal disimpan.",
                );
                return;
            }

            fetch("/simpan-nilai", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": csrfToken,
                },
                body: JSON.stringify({
                    jenis_kuis: jenisKuis,
                    nilai_percobaan: nilaiSkala100,
                    detail_jawaban: arrayDetail,
                }),
            })
                .then((response) => response.json())
                .then((data) => console.log(data.message))
                .catch((error) =>
                    console.error("Error menyimpan nilai:", error),
                );
        }

        // 1. DATA SOAL EVALUASI
        const questions = [
            {
                q: "Seorang anak sedang duduk di dalam bus yang melaju meninggalkan terminal. Jika kita menggunakan terminal sebagai titik acuannya, maka pernyataan yang paling tepat di bawah ini adalah...",
                options: [
                    "Bus diam terhadap terminal",
                    "Anak tersebut diam terhadap terminal",
                    "Anak tersebut bergerak terhadap bus",
                    "Terminal bergerak menjauhi bus (terjadi gerak semu)",
                ],
                answer: 3,
            },
            {
                q: "Saat kamu naik mobil di jalan raya, kamu akan melihat tiang-tiang listrik di pinggir jalan seolah-olah bergerak berlari ke arah belakang mobil. Fenomena ini membuktikan bahwa...",
                options: [
                    "Tiang listrik sebenarnya bergerak aktif terhadap bumi",
                    "Terjadi gerak semu karena kamu berada di dalam mobil (acuan) yang bergerak",
                    "Mobil kamu sebenarnya diam terhadap tiang listrik tersebut",
                    "Kecepatan tiang listrik jauh lebih besar daripada kecepatan mobil kamu",
                ],
                answer: 1,
            },
            {
                q: "Seekor kucing berlari ke arah timur sejauh 9 meter, lalu tiba-tiba berbalik arah ke barat sejauh 4 meter. Total jarak dan besar perpindahan yang dialami kucing tersebut secara berturut-turut adalah...",
                options: [
                    "13 meter dan 5 meter",
                    "13 meter dan 13 meter",
                    "5 meter dan 13 meter",
                    "5 meter dan 5 meter",
                ],
                answer: 0,
            },
            {
                q: "Seorang pelari maraton menempuh lintasan lari yang berbentuk lingkaran dengan keliling tepat 400 meter. Jika ia berhasil menyelesaikan 2 putaran penuh dan kembali lagi ke posisi start, maka...",
                options: [
                    "Jarak yang ditempuh adalah 0 meter",
                    "Perpindahannya adalah 800 meter",
                    "Jarak yang ditempuh 800 meter dan perpindahannya 0 meter",
                    "Pelari tersebut tidak dianggap bergerak karena kembali ke awal",
                ],
                answer: 2,
            },
            {
                q: "Di dalam IPA, kita mengenal istilah kelajuan dan kecepatan. Hal utama yang membedakan antara kecepatan (besaran vektor) dengan kelajuan (besaran skalar) adalah...",
                options: [
                    "Kecepatan hanya memiliki nilai saja tanpa arah",
                    "Kecepatan sangat bergantung pada nilai dan arah perpindahan benda",
                    "Kelajuan dihitung berdasarkan posisi awal dan akhir saja",
                    "Kelajuan selalu bernilai negatif jika benda berbalik arah",
                ],
                answer: 1,
            },
            {
                q: "Sebuah sepeda motor bergerak lurus dengan kecepatan tetap sebesar 20 m/s ke arah utara. Setelah motor tersebut bergerak selama 10 sekon, besar perpindahan yang dialaminya adalah...",
                options: [
                    "2 meter ke arah utara",
                    "30 meter ke arah utara",
                    "200 meter ke arah utara",
                    "200 meter ke arah selatan",
                ],
                answer: 2,
            },
            {
                q: "Perhatikan beberapa peristiwa berikut ini:\n(1) Buah kelapa jatuh bebas dari pohonnya menuju tanah.\n(2) Mobil yang melaju kencang tiba-tiba direm hingga berhenti di depan lampu merah.\n(3) Pesawat terbang bergerak semakin cepat saat lepas landas (take off).\n\nPeristiwa yang menunjukkan terjadinya percepatan positif (gerak dipercepat) ditunjukkan oleh nomor...",
                options: [
                    "(1) dan (2)",
                    "(1) dan (3)",
                    "(2) dan (3)",
                    "(1), (2), dan (3)",
                ],
                answer: 1,
            },
            {
                q: "Sebuah sepeda yang awalnya bergerak santai dengan kecepatan 2 m/s, kemudian dikayuh lebih kencang hingga kecepatannya menjadi 10 m/s dalam waktu 4 sekon. Besar percepatan sepeda tersebut adalah...",
                options: ["2 m/s²", "4 m/s²", "8 m/s²", "12 m/s²"],
                answer: 0,
            },
            {
                q: "Gaya dapat memberikan beberapa pengaruh terhadap suatu benda. Peristiwa di bawah ini yang menunjukkan pengaruh gaya berupa perubahan bentuk benda adalah...",
                options: [
                    "Menepis bola voli yang sedang melambung di udara",
                    "Mengerem sepeda saat jalanan sedang ramai",
                    "Meremas kaleng minuman bekas hingga penyok",
                    "Menendang bola plastik hingga menggelinding jauh",
                ],
                answer: 2,
            },
            {
                q: "Rian dan Dino sedang mencoba memindahkan sebuah lemari kayu. Rian mendorong lemari ke arah kanan dengan gaya 50 N. Di saat yang sama, Dino menahan lemari tersebut dengan mendorongnya dari arah berlawanan (ke arah kiri) dengan gaya 30 N. Resultan gaya yang bekerja pada lemari adalah...",
                options: [
                    "80 N ke arah kanan",
                    "20 N ke arah kanan",
                    "20 N ke arah kiri",
                    "0 N (lemari tidak bergerak)",
                ],
                answer: 1,
            },
            {
                q: "Tiga buah gaya bekerja pada sebuah kotak kayu yang berada di atas lantai. Gaya pertama sebesar 20 N ke arah kanan, gaya kedua sebesar 30 N ke arah kanan, dan gaya ketiga sebesar 50 N ke arah kiri. Berdasarkan analisis kamu, keadaan kotak tersebut adalah...",
                options: [
                    "Bergerak ke arah kanan karena ditarik oleh dua gaya sekaligus",
                    "Bergerak ke arah kiri karena gaya kirinya memiliki angka paling besar",
                    "Tetap diam di tempatnya karena total resultan gayanya sama dengan nol",
                    "Bergerak bolak-balik karena gaya di kanan dan kiri saling tarik-menarik",
                ],
                answer: 2,
            },
            {
                q: "Mengapa lantai di gedung olahraga sengaja dibuat agak kasar dan para pemain basket disarankan menggunakan sepatu beralas karet?",
                options: [
                    "Untuk memperkecil gaya gesek agar pemain mudah meluncur",
                    "Untuk memperbesar gaya gesek agar pemain tidak mudah terpeleset saat berlari",
                    "Agar gaya gravitasi bumi yang diterima oleh pemain berkurang",
                    "Untuk mengubah gaya gesek kinetis menjadi gaya pegas yang elastis",
                ],
                answer: 1,
            },
            {
                q: "Ketika seorang atlet panahan menarik tali busur hingga melengkung lalu melepaskannya, anak panah akan melesat maju dengan kencang. Jenis gaya yang menyebabkan anak panah tersebut dapat melesat ke depan adalah...",
                options: [
                    "Gaya otot",
                    "Gaya gesek",
                    "Gaya pegas",
                    "Gaya gravitasi",
                ],
                answer: 2,
            },
            {
                q: "Berdasarkan Hukum I Newton, jika selembar kertas yang berada di bawah gelas kaca ditarik secara sangat cepat dan mendatar, maka gelas akan tetap diam di posisinya semula. Hal ini terjadi karena...",
                options: [
                    "Gelas memiliki sifat inersia (kelembaman) untuk mempertahankan posisinya",
                    "Gaya tarik pada kertas jauh lebih kecil dari gaya berat yang dimiliki gelas",
                    "Terjadi gaya aksi-reaksi yang seimbang antara permukaan gelas dan kertas",
                    "Gelas mengalami percepatan yang sangat tinggi sehingga tidak sempat pindah",
                ],
                answer: 0,
            },
            {
                q: "Perhatikan dua buah benda di laboratorium sekolah: Benda A memiliki massa 5 kg dan Benda B memiliki massa 20 kg. Jika kedua benda tersebut didorong dengan besar gaya yang sama, maka kesimpulan yang paling tepat adalah...",
                options: [
                    "Benda B akan melaju lebih cepat karena massanya yang besar memberikan dorongan ekstra",
                    "Benda A akan memiliki percepatan yang lebih besar karena massanya lebih ringan",
                    "Percepatan kedua benda akan persis sama karena gaya dorong yang diberikan tidak berbeda",
                    "Benda A akan lebih sulit untuk digerakkan karena sifat kelembamannya sangat kecil",
                ],
                answer: 1,
            },
            {
                q: "Sebuah balok bermassa 2 kg diletakkan di atas lantai yang licin. Balok tersebut ditarik dengan gaya yang berubah-ubah sehingga menghasilkan data percepatan sebagai berikut: Saat gaya sebesar 4 N diberikan, percepatannya adalah 2 m/s². Saat gaya sebesar 8 N diberikan, percepatannya adalah 4 m/s². Berdasarkan analisis data di atas, berapakah percepatan yang akan dialami balok jika gaya yang diberikan diperbesar menjadi 12 N?",
                options: ["2 m/s²", "4 m/s²", "6 m/s²", "8 m/s²"],
                answer: 2,
            },
            {
                q: "Hukum III Newton menjelaskan tentang adanya pasangan gaya aksi dan reaksi. Contoh penerapan Hukum III Newton yang benar dalam kehidupan sehari-hari di bawah ini adalah...",
                options: [
                    "Tubuh kita otomatis terdorong ke depan saat bus yang kita tumpangi direm mendadak",
                    "Sebuah meja belajar tetap diam di kamar meskipun tidak ada orang yang menyentuhnya",
                    "Telapak tangan kita terasa sakit atau panas setelah memukul tembok rumah dengan keras",
                    "Kelereng yang menggelinding lama-kelamaan berhenti sendiri karena bergesekan dengan lantai",
                ],
                answer: 2,
            },
            {
                q: "Saat kita mendayung perahu di sungai, kita menggerakkan dayung untuk mendorong air ke arah belakang. Akibatnya, perahu justru bergerak maju ke arah depan. Analisis yang paling tepat mengenai peristiwa ini adalah...",
                options: [
                    "Gaya aksi (dorongan dayung ke belakang) menghasilkan gaya reaksi (perahu terdorong maju)",
                    "Perahu dapat bergerak maju karena gaya gravitasi air jauh lebih besar dari gaya berat perahu",
                    "Dayung tersebut berhasil menghilangkan seluruh gaya gesek antara perahu dan permukaan air",
                    "Resultan gaya yang bekerja pada perahu selalu bernilai nol sehingga perahu bisa meluncur bebas",
                ],
                answer: 0,
            },
            {
                q: "Sebuah bola basket dijatuhkan di atas meja hingga bola tersebut memantul kembali ke atas. Pasangan gaya aksi dan reaksi yang tepat pada fenomena tersebut adalah...",
                options: [
                    "Berat bola menekan ke bawah karena gravitasi dan gaya tarik bumi menarik meja ke bawah.",
                    "Bola memberikan gaya aksi ke arah bawah terhadap meja dan meja memberikan gaya reaksi ke atas terhadap bola.",
                    "Gaya gesek udara menahan bola ke arah atas dan kecepatan memantul bola bertambah besar.",
                    "Bola mendorong udara di sekitarnya ke bawah dan meja menarik bola kembali ke bawah.",
                ],
                answer: 1,
            },
            {
                q: "Sebuah mobil bermassa 1.000 kg mula-mula diam di depan lampu merah. Saat lampu hijau menyala, mobil tersebut digas hingga bergerak dengan percepatan tetap sebesar 2 m/s². Besar gaya mesin yang bekerja untuk menggerakkan mobil tersebut adalah...",
                options: ["500 N", "1.002 N", "2.000 N", "4.000 N"],
                answer: 2,
            },
        ];

        // 2. STATE & DOM ELEMENTS
        let currentIndex = 0;
        const userAnswers = new Array(questions.length).fill(null);
        const scorePerSoal = 5;

        const navSoal = document.getElementById("navSoal-evaluasi");
        const questionNumber = document.getElementById(
            "questionNumber-evaluasi",
        );
        const questionText = document.getElementById("questionText-evaluasi");
        const optionsList = document.getElementById("optionsList-evaluasi");
        const prevBtn = document.getElementById("prevBtn-evaluasi");
        const nextBtn = document.getElementById("nextBtn-evaluasi");
        const finishBtn = document.getElementById("finishBtn-evaluasi");
        const timerEl = document.getElementById("timer-evaluasi");

        // 3. FUNGSI RENDER NAVIGASI
        function renderNav() {
            if (!navSoal) return;

            navSoal.innerHTML = "";
            questions.forEach((_, i) => {
                const btn = document.createElement("button");
                btn.textContent = i + 1;
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

        // 4. FUNGSI LOAD SOAL
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
                if (currentIndex === questions.length - 1) {
                    nextBtn.innerHTML =
                        '<span class="nav-text-hide">Selesaikan Kuis</span> ✓';
                    nextBtn.style.backgroundColor = "#2ecc71";
                    nextBtn.style.borderColor = "#2ecc71";
                } else {
                    nextBtn.innerHTML =
                        '<span class="nav-text-hide">Selanjutnya</span> →';
                    nextBtn.style.backgroundColor = "";
                    nextBtn.style.borderColor = "";
                }
            }
        }

        // 5. EVENT HANDLERS
        if (optionsList) {
            optionsList.addEventListener("change", function (e) {
                if (e.target.name === "option-evaluasi") {
                    userAnswers[currentIndex] = Number(e.target.value);
                    renderNav();
                }
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener("click", () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    loadQuestion();
                }
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener("click", () => {
                if (currentIndex < questions.length - 1) {
                    currentIndex++;
                    loadQuestion();
                } else {
                    if (finishBtn) finishBtn.click();
                }
            });
        }

        // 6. LOGIKA HASIL (SIMPAN KE DB)
        function tampilkanHasilAkhir(score, totalScore) {
            const urlKeluar = window.EXIT_PAGE || "/";

            Swal.fire({
                title: "Evaluasi Selesai!",
                html: `
          <div style="font-size: 1.1rem; margin-bottom: 10px;">Nilai Akhir Kamu:</div>
          <div style="font-size: 3rem; font-weight: bold; color: #ff6b01;">${score}</div>
        `,
                icon: "info",
                confirmButtonText: "Kembali ke Beranda 🏠",
                confirmButtonColor: "#ff6b01",
                allowOutsideClick: false,
                backdrop: `rgba(0,0,0,0.5)`,
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = urlKeluar;
                }
            });
        }

        function hitungNilai() {
            let jumlahBenar = 0;
            let arrayDetail = [];

            questions.forEach((q, i) => {
                let isBenar = userAnswers[i] === q.answer;
                if (isBenar) jumlahBenar++;
                arrayDetail.push(isBenar);
            });

            const finalScore = jumlahBenar * scorePerSoal;
            const maxScore = questions.length * scorePerSoal;

            let score100 = Math.round((jumlahBenar / questions.length) * 100);

            const nilaiKkm = window.KKM_KUIS || 70;
            const tuntas = score100 >= nilaiKkm;

            window.progresSiswa = window.progresSiswa || [];

            if (tuntas) {
                if (!window.progresSiswa.includes("evaluasi_completed")) {
                    window.progresSiswa.push("evaluasi_completed");
                }
                if (window.simpanProgresKeDatabase) {
                    window.simpanProgresKeDatabase("evaluasi_completed");
                }
            }

            simpanNilaiKeDatabase("Evaluasi", score100, arrayDetail);

            tampilkanHasilAkhir(finalScore, maxScore);
        }

        if (finishBtn) {
            finishBtn.addEventListener("click", () => {
                if (userAnswers.includes(null)) {
                    Swal.fire({
                        title: "Belum Selesai!",
                        text: "Masih ada soal yang belum dijawab. Cek nomor yang berwarna putih.",
                        icon: "warning",
                        confirmButtonText: "Oke",
                        confirmButtonColor: "#f95c50",
                    });
                    return;
                }

                Swal.fire({
                    title: "Yakin mau mengumpulkan?",
                    text: "Jawaban yang sudah dikirim tidak dapat diubah.",
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonText: "Ya, Kumpulkan!",
                    cancelButtonText: "Cek lagi",
                    confirmButtonColor: "#2ecc71",
                    cancelButtonColor: "#d33",
                }).then((result) => {
                    if (result.isConfirmed) {
                        clearInterval(timerInterval);
                        hitungNilai();
                    }
                });
            });
        }

        // 7. TIMER
        let timeLeft = 40 * 60; // Diubah ke 20 Menit

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
                    title: "Waktu Habis!",
                    text: "Jawaban akan otomatis dikumpulkan.",
                    icon: "info",
                    timer: 3000,
                    showConfirmButton: false,
                    allowOutsideClick: false,
                }).then(() => {
                    hitungNilai();
                });
            }
        }, 1000);

        renderNav();
        loadQuestion();
    }
});
