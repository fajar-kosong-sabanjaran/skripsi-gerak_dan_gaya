document.addEventListener("DOMContentLoaded", () => {
    // =======================================================================
    // ini js untuk Responsive Mobile Sidebar
    // =======================================================================
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

    // =======================================================================
    // ini js guru.blade (Sidebar & Navbar)
    // =======================================================================
    const toggleItems = document.querySelectorAll(".menu-item.has-toggle");
    const path = window.location.pathname;

    toggleItems.forEach((item) => {
        item.addEventListener("click", () => {
            const targetId = item.dataset.target;
            const submenu = document.getElementById(targetId);
            if (!submenu) return;

            const isOpen = submenu.classList.contains("open");

            if (!isOpen) {
                submenu.classList.add("open");
                item.classList.add("active");
            } else {
                submenu.classList.remove("open");
                item.classList.remove("active");
            }
        });
    });

    if (path.includes("/guru/nilai")) {
        const submenu = document.getElementById("nilai");
        const header = document.querySelector(
            '.menu-item.has-toggle[data-target="nilai"]',
        );
        if (submenu) submenu.classList.add("open");
        if (header) header.classList.add("active");
    }

    if (path.includes("/preview") || path.includes("/siswa/")) {
        const submenu = document.getElementById("preview");
        const header = document.querySelector(
            '.menu-item.has-toggle[data-target="preview"]',
        );
        if (submenu) submenu.classList.add("open");
        if (header) header.classList.add("active");
    }

    const userMenuTrigger = document.getElementById("userMenuTrigger");
    const userDropdown = document.getElementById("userDropdown");

    if (userMenuTrigger && userDropdown) {
        userMenuTrigger.addEventListener("click", (e) => {
            e.stopPropagation();
            userDropdown.classList.toggle("active");
        });
    }

    window.addEventListener("click", (e) => {
        if (userDropdown && userDropdown.classList.contains("active")) {
            if (
                !userDropdown.contains(e.target) &&
                !userMenuTrigger.contains(e.target)
            ) {
                userDropdown.classList.remove("active");
            }
        }
    });

    // =======================================================================
    // ini js untuk Table (Search, Filter Kelas, Pagination) - Dipakai di semua tabel
    // =======================================================================
    const tableBody = document.getElementById("tableBody");

    if (tableBody) {
        const originalRows = Array.from(
            tableBody.querySelectorAll("tr.searchable-row"),
        );

        const searchInput = document.getElementById("searchInput");
        const entriesSelect = document.getElementById("entriesSelect");
        const filterKelas = document.getElementById("filterKelas");
        const btnPrev = document.getElementById("btnPrev");
        const btnNext = document.getElementById("btnNext");
        const dataInfo = document.getElementById("dataInfo");
        const paginationNumbers = document.getElementById("paginationNumbers");

        let currentPage = 1;
        let rowsPerPage = entriesSelect ? parseInt(entriesSelect.value) : 10;
        let processedRows = [...originalRows];

        function updateTable() {
            const query = searchInput ? searchInput.value.toLowerCase() : "";
            const kelasDipilih = filterKelas
                ? filterKelas.value.toLowerCase()
                : "semua";

            processedRows = originalRows.filter((row) => {
                const namaEl = row.querySelector(".row-name");
                const nisEl = row.querySelector(".row-nis");
                const teksNama = namaEl ? namaEl.innerText.toLowerCase() : "";
                const teksNis = nisEl ? nisEl.innerText.toLowerCase() : "";
                const cocokKata =
                    teksNama.includes(query) || teksNis.includes(query);

                let teksKelas = row.getAttribute("data-kelas");

                if (!teksKelas) {
                    const elKelas = row.querySelector(".row-kelas");
                    if (elKelas) {
                        const spanKelas = elKelas.querySelector(".badge-kelas");
                        teksKelas = spanKelas
                            ? spanKelas.innerText.trim().toLowerCase()
                            : elKelas.innerText.trim().toLowerCase();
                    } else {
                        teksKelas = "";
                    }
                } else {
                    teksKelas = teksKelas.toLowerCase();
                }

                const cocokKelas =
                    kelasDipilih === "semua" || teksKelas === kelasDipilih;

                return cocokKata && cocokKelas;
            });

            currentPage = 1;
            renderTable();
        }

        function renderTable() {
            const totalPages = Math.ceil(processedRows.length / rowsPerPage);

            if (currentPage < 1) currentPage = 1;
            if (currentPage > totalPages && totalPages > 0)
                currentPage = totalPages;

            const start = (currentPage - 1) * rowsPerPage;
            const end = start + rowsPerPage;
            const rowsToShow = processedRows.slice(start, end);

            tableBody.innerHTML = "";

            if (rowsToShow.length > 0) {
                rowsToShow.forEach((row, index) => {
                    const noCell = row.querySelector(".row-number");
                    if (noCell) noCell.innerText = start + index + 1;
                    tableBody.appendChild(row);
                });
            } else {
                const colCount =
                    originalRows.length > 0
                        ? originalRows[0].children.length
                        : 6;
                tableBody.innerHTML = `<tr><td colspan="${colCount}" style="text-align:center; padding: 20px;">Data tidak ditemukan</td></tr>`;
            }

            const showStart = processedRows.length > 0 ? start + 1 : 0;
            const showEnd =
                end > processedRows.length ? processedRows.length : end;

            if (dataInfo) {
                const dataType = window.location.href.includes("datakelas")
                    ? "kelas"
                    : "siswa";
                dataInfo.innerText = `Menampilkan ${showStart} - ${showEnd} dari ${processedRows.length} ${dataType}`;
            }

            if (btnPrev) {
                btnPrev.disabled = currentPage === 1 || totalPages === 0;
                btnPrev.style.opacity = btnPrev.disabled ? "0.5" : "1";
            }
            if (btnNext) {
                btnNext.disabled =
                    currentPage === totalPages || totalPages === 0;
                btnNext.style.opacity = btnNext.disabled ? "0.5" : "1";
            }

            if (paginationNumbers) {
                paginationNumbers.innerHTML = "";
                if (totalPages > 0) {
                    const btnPage = document.createElement("button");
                    btnPage.className = "btn-page active";
                    btnPage.innerText = currentPage;
                    paginationNumbers.appendChild(btnPage);
                }
            }
        }

        if (searchInput) {
            searchInput.addEventListener("keyup", () => {
                updateTable();
            });
        }

        if (filterKelas) {
            filterKelas.addEventListener("change", () => {
                updateTable();
            });
        }

        if (entriesSelect) {
            entriesSelect.addEventListener("change", function () {
                rowsPerPage = parseInt(this.value);
                updateTable();
            });
        }

        if (btnPrev) {
            btnPrev.addEventListener("click", function () {
                if (currentPage > 1) {
                    currentPage--;
                    renderTable();
                }
            });
        }

        if (btnNext) {
            btnNext.addEventListener("click", function () {
                const totalPages = Math.ceil(
                    processedRows.length / rowsPerPage,
                );
                if (currentPage < totalPages) {
                    currentPage++;
                    renderTable();
                }
            });
        }

        updateTable();
    }

    // =======================================================================
    // ini js untuk Fitur Export Excel
    // =======================================================================
    const btnExportExcel = document.getElementById("btnExportExcel");
    if (btnExportExcel) {
        btnExportExcel.addEventListener("click", function () {
            const filterKelas = document.getElementById("filterKelas");
            // Ambil value dari dropdown kelas. Jika tidak ada, default 'semua'
            const kelasPilihan = filterKelas ? filterKelas.value : "semua";
            
            // Redirect ke route Laravel untuk export, mengirimkan parameter kelas
            window.location.href = `/guru/datasiswa/export?kelas=${encodeURIComponent(kelasPilihan)}`;
        });
    }
});

// =======================================================================
// ini js datasiswa.blade (Fungsi Hapus / Delete)
// =======================================================================

function confirmDelete(button, id) {
    Swal.fire({
        title: "Apakah Anda yakin?",
        text: "Data siswa ini akan dihapus permanen!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ef4444",
        cancelButtonColor: "#3b82f6",
        confirmButtonText: "Ya, Hapus!",
        cancelButtonText: "Batal",
    }).then((result) => {
        if (result.isConfirmed) {
            const tokenElement = document.querySelector(
                'meta[name="csrf-token"]',
            );
            if (!tokenElement) return;
            const token = tokenElement.getAttribute("content");

            fetch(`/guru/datasiswa/${id}`, {
                method: "DELETE",
                headers: {
                    "X-CSRF-TOKEN": token,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            })
                .then((response) => {
                    if (!response.ok) throw new Error("Network error");
                    return response.json();
                })
                .then((data) => {
                    if (data.success) {
                        Swal.fire(
                            "Terhapus!",
                            "Data siswa telah dihapus.",
                            "success",
                        ).then(() => location.reload());
                    } else {
                        Swal.fire("Gagal!", "Terjadi kesalahan.", "error");
                    }
                })
                .catch((error) => {
                    console.error(error);
                    Swal.fire("Error!", "Gagal menghubungi server.", "error");
                });
        }
    });
}

// =======================================================================
// ini js datasiswa.blade (Fungsi Edit / Update Modal)
// =======================================================================

const editModal = document.getElementById("editModal");
const editId = document.getElementById("editId");
const editNama = document.getElementById("editNama");
const editNis = document.getElementById("editNis");
const editKelas = document.getElementById("editKelas");
const editEmail = document.getElementById("editEmail");
const editPassword = document.getElementById("editPassword");

function openEditModal(button) {
    const id = button.dataset.id;
    const nama = button.dataset.nama;
    const nis = button.dataset.nis;
    const email = button.dataset.email;
    const kelas = button.dataset.kelas;

    if (editId) editId.value = id;
    if (editNama) editNama.value = nama;
    if (editNis) editNis.value = nis || "";
    if (editEmail) editEmail.value = email;
    if (editKelas) editKelas.value = kelas || "";
    if (editPassword) editPassword.value = "";

    if (editModal) {
        editModal.classList.add("show");
    }
}

function closeEditModal() {
    if (editModal) {
        editModal.classList.remove("show");
    }
}

function saveEditData() {
    const id = editId.value;
    const tokenElement = document.querySelector('meta[name="csrf-token"]');
    const token = tokenElement ? tokenElement.getAttribute("content") : "";

    const payload = {
        nama_lengkap: editNama.value,
        nomor_induk: editNis.value,
        kelas_id: editKelas.value,
        email: editEmail.value,
        password: editPassword.value,
    };

    fetch(`/guru/datasiswa/${id}`, {
        method: "PUT",
        headers: {
            "X-CSRF-TOKEN": token,
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(payload),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                closeEditModal();
                Swal.fire({
                    icon: "success",
                    title: "Berhasil!",
                    text: "Data siswa berhasil diperbarui",
                    timer: 1500,
                    showConfirmButton: false,
                }).then(() => location.reload());
            } else {
                Swal.fire(
                    "Gagal",
                    data.message || "Terjadi kesalahan validasi",
                    "error",
                );
            }
        })
        .catch((error) => {
            console.error(error);
            Swal.fire("Error", "Gagal menghubungi server", "error");
        });
}

// =======================================================================
// ini js datakelas.blade (CRUD KELAS)
// =======================================================================

const createKelasModal = document.getElementById("createKelasModal");
const createNama = document.getElementById("createNama");
const createTahun = document.getElementById("createTahun");

function openCreateKelasModal() {
    if (createNama) createNama.value = "";
    if (createTahun) createTahun.value = "";
    if (createKelasModal) createKelasModal.classList.add("show");
}

function closeCreateKelasModal() {
    if (createKelasModal) createKelasModal.classList.remove("show");
}

function storeKelasData() {
    const tokenElement = document.querySelector('meta[name="csrf-token"]');
    const token = tokenElement ? tokenElement.getAttribute("content") : "";

    const payload = {
        nama: createNama.value,
        tahun: createTahun.value,
    };

    fetch("/guru/datakelas", {
        method: "POST",
        headers: {
            "X-CSRF-TOKEN": token,
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(payload),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                closeCreateKelasModal();
                Swal.fire({
                    icon: "success",
                    title: "Berhasil!",
                    text: "Kelas baru berhasil ditambahkan.",
                    timer: 1500,
                    showConfirmButton: false,
                }).then(() => location.reload());
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Gagal!",
                    text: data.message || "Terjadi kesalahan pada input data.",
                    confirmButtonColor: "#ef4444",
                    confirmButtonText: "OK",
                });
            }
        })
        .catch((error) => {
            console.error(error);
            Swal.fire("Error", "Gagal menghubungi server.", "error");
        });
}

// LOGIKA EDIT KELAS (UPDATE)
const editKelasModal = document.getElementById("editKelasModal");
const editKelasId = document.getElementById("editKelasId");
const editNamaKelas = document.getElementById("editNamaKelas");
const editTahunKelas = document.getElementById("editTahunKelas");

function openEditKelasModal(button) {
    const id = button.dataset.id;
    const nama = button.dataset.nama;
    const tahun = button.dataset.tahun;

    if (editKelasId) editKelasId.value = id;
    if (editNamaKelas) editNamaKelas.value = nama;
    if (editTahunKelas) editTahunKelas.value = tahun || "";

    if (editKelasModal) editKelasModal.classList.add("show");
}

function closeEditKelasModal() {
    if (editKelasModal) editKelasModal.classList.remove("show");
}

function updateKelasData() {
    const id = editKelasId.value;
    const tokenElement = document.querySelector('meta[name="csrf-token"]');
    const token = tokenElement ? tokenElement.getAttribute("content") : "";

    const payload = {
        nama: editNamaKelas.value,
        tahun: editTahunKelas.value,
    };

    fetch(`/guru/datakelas/${id}`, {
        method: "PUT",
        headers: {
            "X-CSRF-TOKEN": token,
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(payload),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                closeEditKelasModal();
                Swal.fire({
                    icon: "success",
                    title: "Berhasil!",
                    text: "Data kelas berhasil diperbarui.",
                    timer: 1500,
                    showConfirmButton: false,
                }).then(() => location.reload());
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Gagal!",
                    text: data.message || "Gagal memperbarui data.",
                    confirmButtonColor: "#ef4444",
                    confirmButtonText: "OK",
                });
            }
        })
        .catch((error) => {
            console.error(error);
            Swal.fire("Error", "Gagal menghubungi server.", "error");
        });
}

// LOGIKA HAPUS KELAS (DELETE)
function confirmDeleteKelas(button, id) {
    Swal.fire({
        title: "Hapus Kelas?",
        text: "Data kelas akan dihapus secara permanen!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ef4444",
        cancelButtonColor: "#3b82f6",
        confirmButtonText: "Ya, Hapus!",
        cancelButtonText: "Batal",
    }).then((result) => {
        if (result.isConfirmed) {
            const tokenElement = document.querySelector(
                'meta[name="csrf-token"]',
            );
            const token = tokenElement
                ? tokenElement.getAttribute("content")
                : "";

            fetch(`/guru/datakelas/${id}`, {
                method: "DELETE",
                headers: {
                    "X-CSRF-TOKEN": token,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        Swal.fire(
                            "Terhapus!",
                            "Kelas berhasil dihapus.",
                            "success",
                        ).then(() => location.reload());
                    } else {
                        Swal.fire(
                            "Gagal!",
                            data.message || "Terjadi kesalahan saat menghapus.",
                            "error",
                        );
                    }
                })
                .catch((error) => {
                    console.error(error);
                    Swal.fire("Error!", "Gagal menghubungi server.", "error");
                });
        }
    });
}

// =======================================================================
// ini js datanilai.blade (Modal Riwayat AJAX & Detail Jawaban)
// =======================================================================

// --- 1. DATA MASTER SOAL ---
const bankSoal = {
    "Kuis 1": [
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
    ],
    "Kuis 2": [
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
    ],
    Evaluasi: [
        {
            q: "Seorang peserta didik sedang duduk di dalam bus yang melaju meninggalkan terminal. Jika terminal dianggap sebagai titik acuan, maka pernyataan yang benar adalah...",
            options: [
                "Bus diam terhadap terminal",
                "Peserta didik diam terhadap terminal",
                "Peserta didik bergerak terhadap bus",
                "Terminal bergerak menjauhi bus (gerak semu)",
            ],
            answer: 3,
        },
        {
            q: "Saat melakukan perjalanan jauh dengan mobil, Andi melihat deretan tiang listrik di pinggir jalan seolah-olah berlari ke arah belakang mobil. Peristiwa ini membuktikan bahwa...",
            options: [
                "Tiang listrik mengalami gerak relatif terhadap bumi",
                "Terjadi gerak semu karena Andi berada di dalam bingkai acuan yang bergerak",
                "Mobil Andi diam terhadap tiang listrik",
                "Kecepatan tiang listrik lebih besar dari kecepatan mobil",
            ],
            answer: 1,
        },
        {
            q: "Seekor kucing berlari ke arah timur sejauh 9 meter, kemudian berbalik arah ke barat sejauh 4 meter. Total jarak dan besar perpindahan kucing tersebut secara berturut-turut adalah...",
            options: [
                "13 meter dan 5 meter",
                "13 meter dan 13 meter",
                "5 meter dan 13 meter",
                "5 meter dan 5 meter",
            ],
            answer: 0,
        },
        {
            q: "Seorang pelari maraton menempuh lintasan lari yang berbentuk lingkaran dengan keliling 400 meter. Jika ia berhasil menyelesaikan tepat 2 putaran dan kembali ke posisi start, maka...",
            options: [
                "Jarak yang ditempuh adalah 0 meter",
                "Perpindahannya adalah 800 meter",
                "Jarak yang ditempuh 800 meter dan perpindahannya 0 meter",
                "Pelari tersebut tidak mengalami gerak karena kembali ke awal",
            ],
            answer: 2,
        },
        {
            q: "Perbedaan utama yang menjadikan kecepatan sebagai besaran vektor, sedangkan kelajuan sebagai besaran skalar adalah...",
            options: [
                "Kecepatan hanya memiliki nilai tanpa arah",
                "Kecepatan sangat bergantung pada arah perpindahan benda",
                "Kelajuan dihitung berdasarkan posisi awal dan akhir saja",
                "Kelajuan selalu bernilai negatif jika benda berbalik arah",
            ],
            answer: 1,
        },
        {
            q: "Sebuah motor bergerak dengan kecepatan tetap 20 m/s ke arah utara selama 10 sekon. Besar perpindahan yang dialami motor tersebut adalah...",
            options: [
                "2 meter ke arah utara",
                "30 meter ke arah utara",
                "200 meter ke arah utara",
                "200 meter ke arah selatan",
            ],
            answer: 2,
        },
        {
            q: "Perhatikan fenomena berikut:\n(1) Buah kelapa jatuh dari pohonnya ke tanah.\n(2) Mobil yang sedang melaju kencang tiba-tiba direm hingga berhenti.\n(3) Pesawat lepas landas hingga mencapai ketinggian tertentu.\n\nPeristiwa yang menunjukkan terjadinya percepatan positif (gerak dipercepat) ditunjukkan oleh nomor...",
            options: [
                "(1) dan (2)",
                "(1) dan (3)",
                "(2) dan (3)",
                "(1), (2), dan (3)",
            ],
            answer: 1,
        },
        {
            q: "Sebuah sepeda yang awalnya bergerak dengan kecepatan 2 m/s dipercepat hingga kecepatannya menjadi 10 m/s dalam waktu 4 sekon. Besar percepatan sepeda tersebut adalah...",
            options: ["2 m/s²", "4 m/s²", "8 m/s²", "12 m/s²"],
            answer: 0,
        },
        {
            q: "Manakah dari peristiwa berikut yang merupakan pengaruh gaya terhadap perubahan bentuk benda?",
            options: [
                "Menepis bola voli yang sedang melambung",
                "Mengerem sepeda saat mendekati lampu merah",
                "Menekan kaleng minuman bekas hingga penyok",
                "Menendang bola hingga menggelinding jauh",
            ],
            answer: 2,
        },
        {
            q: "Dua orang anak, Rian dan Dino, sedang mendorong lemari kayu. Rian mendorong ke kanan dengan gaya 50 N, sedangkan Dino menarik dari arah berlawanan (ke arah kiri) dengan gaya 30 N. Resultan gaya yang bekerja pada lemari adalah...",
            options: [
                "80 N ke arah kanan",
                "20 N ke arah kanan",
                "20 N ke arah kiri",
                "0 N (lemari diam)",
            ],
            answer: 1,
        },
        {
            q: "Tiga buah gaya bekerja pada sebuah kotak: ke kanan, ke kanan, dan ke kiri. Keadaan kotak tersebut adalah...",
            options: [
                "Bergerak ke kanan dengan gaya 80 N",
                "Bergerak ke kiri dengan gaya 10 N",
                "Tetap diam karena resultan gayanya nol",
                "Bergerak ke kanan dengan gaya 40 N",
            ],
            answer: 2,
        },
        {
            q: "Mengapa lantai di gedung olahraga sering kali memiliki permukaan yang agak kasar atau menggunakan sepatu beralas karet bagi pemainnya?",
            options: [
                "Untuk memperkecil gaya gesek agar pemain mudah terpeleset",
                "Untuk memperbesar gaya gesek agar pemain tidak mudah jatuh saat berlari",
                "Agar gaya gravitasi bumi terhadap pemain berkurang",
                "Untuk mengubah gaya gesek kinetis menjadi gaya pegas",
            ],
            answer: 1,
        },
        {
            q: "Seorang pemanah menarik tali busur sehingga melengkung sebelum melepaskan anak panah. Gaya yang menyebabkan anak panah tersebut melesat ke depan adalah...",
            options: [
                "Gaya Otot",
                "Gaya Gesek",
                "Gaya Pegas",
                "Gaya Gravitasi",
            ],
            answer: 2,
        },
        {
            q: "Berdasarkan Hukum I Newton, jika sebuah kertas di bawah gelas ditarik secara sangat cepat dan mendatar, maka gelas akan tetap diam di posisinya. Hal ini terjadi karena...",
            options: [
                "Gelas memiliki sifat inersia (kelembaman)",
                "Gaya tarik kertas lebih kecil dari gaya berat gelas",
                "Terjadi gaya aksi-reaksi antara gelas dan kertas",
                "Gelas mengalami percepatan yang sangat tinggi",
            ],
            answer: 0,
        },
        {
            q: "Perhatikan dua buah benda: Benda A massanya 5 kg dan Benda B massanya 20 kg. Jika keduanya diberi gaya dorong yang sama besar, maka...",
            options: [
                "Benda B akan melaju lebih cepat karena massanya besar",
                "Benda A akan memiliki percepatan lebih besar karena massanya kecil",
                "Percepatan kedua benda akan sama karena gayanya sama",
                "Benda A akan sulit bergerak karena kelembamannya kecil",
            ],
            answer: 1,
        },
        {
            q: "Sebuah balok bermassa 2 kg diberi gaya sebesar 10 N. Besar percepatan yang dialami balok tersebut adalah...",
            options: ["0,2 m/s²", "5 m/s²", "12 m/s²", "20 m/s²"],
            answer: 1,
        },
        {
            q: "Contoh penerapan Hukum III Newton (Aksi-Reaksi) yang benar dalam kehidupan sehari-hari adalah...",
            options: [
                "Tubuh terdorong ke depan saat bus direm mendadak",
                "Meja tetap diam meskipun tidak ada yang menyentuhnya",
                "Tangan terasa sakit saat memukul tembok dengan keras",
                "Kelereng berhenti menggelinding karena gesekan lantai",
            ],
            answer: 2,
        },
        {
            q: "Saat kita mendayung perahu, kita mendorong air ke arah belakang menggunakan dayung. Akibatnya, perahu bergerak maju ke depan. Hal ini menunjukkan bahwa...",
            options: [
                "Gaya aksi (dorongan air ke belakang) menghasilkan gaya reaksi (perahu maju ke depan)",
                "Perahu bergerak karena gaya gravitasi air lebih besar",
                "Dayung menghilangkan gaya gesek antara perahu dan air",
                "Resultan gaya pada perahu selalu nol saat mendayung",
            ],
            answer: 0,
        },
        {
            q: "Seorang anak melempar bola kasti ke arah tembok. Bola tersebut memantul kembali ke arah anak tersebut. Pasangan aksi-reaksi pada peristiwa ini adalah...",
            options: [
                "Berat bola dan gaya tarik bumi",
                "Gaya dorong bola ke tembok dan gaya dorong balik tembok ke bola",
                "Gaya gesek udara dan kecepatan bola",
                "Kecepatan bola saat dilempar dan saat memantul",
            ],
            answer: 1,
        },
        {
            q: "Sebuah mobil mula-mula diam, kemudian digas sehingga bergerak dengan percepatan 2 m/s². Jika massa mobil adalah 1.000 kg, maka besar gaya mesin yang bekerja pada mobil tersebut adalah...",
            options: ["500 N", "1.002 N", "2.000 N", "2.000 m/s"],
            answer: 2,
        },
    ],
};

// --- FUNGSI PREVIEW SOAL ---
window.lihatDetailSoal = function (jenis_kuis, nomor_soal) {
    const kuisData = bankSoal[jenis_kuis];

    if (!kuisData || !kuisData[nomor_soal - 1]) {
        Swal.fire("Oops!", "Data soal belum tersedia.", "error");
        return;
    }

    const soal = kuisData[nomor_soal - 1];
    const formattedQuestion = soal.q.replace(/\n/g, "<br>");

    let htmlOptions = '<ol type="A" class="swal-soal-opsi">';
    soal.options.forEach((opt, idx) => {
        let isCorrect = idx === soal.answer;
        let classBenar = isCorrect ? "opsi-benar" : "opsi-biasa";
        let checkMark = isCorrect
            ? ' <i class="fas fa-check-circle"></i> (Jawaban Benar)'
            : "";

        htmlOptions += `<li class="swal-opsi-item ${classBenar}">${opt} ${checkMark}</li>`;
    });
    htmlOptions += "</ol>";

    Swal.fire({
        title: `Informasi Soal ${nomor_soal}`,
        html: `
            <div class="swal-soal-pertanyaan">
                ${formattedQuestion}
            </div>
            ${htmlOptions}
        `,
        confirmButtonText: "Tutup",
        confirmButtonColor: "#3b82f6",
        width: "600px",
        customClass: {
            confirmButton: "swal-btn-tutup-kecil",
            title: "swal-judul-kecil",
        },
    });
};

const riwayatModal = document.getElementById("riwayatModal");
const namaSiswaRiwayat = document.getElementById("namaSiswaRiwayat");
const currentSiswaId = document.getElementById("currentSiswaId");
const currentJenisKuis = document.getElementById("currentJenisKuis");

const headerRiwayat = document.getElementById("headerRiwayat");
const bodyRiwayat = document.getElementById("bodyRiwayat");
const judulTabelRiwayat = document.getElementById("judulTabelRiwayat");

const loadingRiwayat = document.getElementById("loadingRiwayat");
const kosongRiwayat = document.getElementById("kosongRiwayat");
const tabelDetailRiwayat = document.getElementById("tabelDetailRiwayat");

// Buka Modal & Set Identitas
window.lihatRiwayat = function (id_siswa, nama_siswa) {
    if (riwayatModal) {
        currentSiswaId.value = id_siswa;
        namaSiswaRiwayat.innerText = nama_siswa;
        riwayatModal.classList.add("show");

        // Reset Tab Pertama
        const tabPertama = document.querySelector(".btn-tab");
        if (tabPertama) loadDetailRiwayat(tabPertama, "Kuis 1");
    }
};

// Tutup Modal
window.closeRiwayatModal = function () {
    if (riwayatModal) riwayatModal.classList.remove("show");
};

// Format Tanggal (Contoh: 28/01/2026)
function formatTanggal(dateString) {
    if (!dateString) return "-";
    const d = new Date(dateString);
    return d.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}

// Format Jam (Contoh: 08:22:23)
function formatWaktu(dateString) {
    if (!dateString) return "-";
    const d = new Date(dateString);
    return d.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
}

// Fetch Data AJAX ke Server
window.loadDetailRiwayat = function (btnElement, jenis_kuis) {
    // 1. Ganti Active Tab
    document
        .querySelectorAll(".btn-tab")
        .forEach((btn) => btn.classList.remove("active"));
    btnElement.classList.add("active");

    // 2. Set State & UI Loading (Bebas Inline CSS)
    currentJenisKuis.value = jenis_kuis;
    judulTabelRiwayat.innerText = "Riwayat " + jenis_kuis;

    tabelDetailRiwayat.classList.add("d-none");
    kosongRiwayat.classList.add("d-none");
    loadingRiwayat.classList.remove("d-none");

    const id_siswa = currentSiswaId.value;

    // 3. Tarik Data AJAX
    fetch(`/guru/datanilai/riwayat/${id_siswa}/${jenis_kuis}`)
        .then((response) => response.json())
        .then((res) => {
            loadingRiwayat.classList.add("d-none");

            if (res.success && res.data && res.data.length > 0) {
                renderTabelRiwayat(res.data, jenis_kuis);
                tabelDetailRiwayat.classList.remove("d-none");

                // Tampilkan info KKM
                const elInfoKkm = document.getElementById("infoKkmSaatIni");
                const elAngkaKkm = document.getElementById("angkaKkmTampil");
                if (elInfoKkm && elAngkaKkm) {
                    elAngkaKkm.innerText = res.kkm;
                    elInfoKkm.classList.remove("d-none");
                }
            } else {
                kosongRiwayat.classList.remove("d-none");
                const elInfoKkm = document.getElementById("infoKkmSaatIni");
                if (elInfoKkm) elInfoKkm.classList.add("d-none");
            }
        })
        .catch((err) => {
            console.error(err);
            loadingRiwayat.classList.add("d-none");
            kosongRiwayat.innerText = "Terjadi kesalahan saat memuat data.";
            kosongRiwayat.classList.remove("d-none");

            const elInfoKkm = document.getElementById("infoKkmSaatIni");
            if (elInfoKkm) elInfoKkm.classList.add("d-none");
        });
};

// Merender Isi Tabel Riwayat
function renderTabelRiwayat(dataRiwayat, jenis_kuis) {
    headerRiwayat.innerHTML = "";
    bodyRiwayat.innerHTML = "";

    // Cari tahu jumlah soal dari baris pertama
    let jmlSoal = 0;
    if (dataRiwayat[0] && dataRiwayat[0].detail_jawaban) {
        jmlSoal = Object.keys(dataRiwayat[0].detail_jawaban).length;
    }

    // Jika jmlSoal kosong, gunakan default
    if (jmlSoal === 0) {
        if (jenis_kuis === "Evaluasi") jmlSoal = 20;
        else jmlSoal = 10;
    }

    // --- BUAT HEADER THEAD ---
    let headerHTML = `
        <th class="col-center">Percobaan</th>
        <th class="col-center">Tanggal</th>
        <th class="col-center">Mulai</th>
        <th class="col-center">Selesai</th>
        <th class="col-center">Nilai</th>
        <th class="col-center">Status</th>
    `;

    for (let i = 1; i <= jmlSoal; i++) {
        headerHTML += `<th class="col-center text-nowrap">
            S${i} <i class="fas fa-info-circle icon-info-soal" onclick="lihatDetailSoal('${jenis_kuis}', ${i})" title="Lihat Soal S${i}"></i>
        </th>`;
    }
    headerRiwayat.innerHTML = headerHTML;

    // --- BUAT BODY TBODY ---
    dataRiwayat.forEach((row) => {
        let badgeStatus =
            row.status === "Lulus"
                ? `<span class="badge-status badge-lulus">Lulus</span>`
                : `<span class="badge-status badge-gagal">Tidak Lulus</span>`;

        let warnaNilai = row.status === "Lulus" ? "text-success" : "";

        let tr = document.createElement("tr");

        let htmlRow = `
            <td class="col-center">Ke-${row.percobaan_ke}</td>
            <td class="col-center">${formatTanggal(row.waktu_mulai)}</td>
            <td class="col-center">${formatWaktu(row.waktu_mulai)}</td>
            <td class="col-center">${formatWaktu(row.waktu_selesai)}</td>
            <td class="col-center text-bold ${warnaNilai}">${row.nilai_percobaan}</td>
            <td class="col-center">${badgeStatus}</td>
        `;

        // Render Ceklis / Silang
        const detailArr = row.detail_jawaban || [];
        for (let i = 0; i < jmlSoal; i++) {
            let isBenar = detailArr[i];
            if (isBenar === true) {
                htmlRow += `<td class="col-center icon-benar">✔</td>`;
            } else if (isBenar === false) {
                htmlRow += `<td class="col-center icon-salah">✖</td>`;
            } else {
                htmlRow += `<td class="col-center">-</td>`;
            }
        }

        tr.innerHTML = htmlRow;
        bodyRiwayat.appendChild(tr);
    });
}

// =======================================================================
// Ini JS Pengaturan KKM
// =======================================================================
document.addEventListener("DOMContentLoaded", function () {
    const successMessageElement = document.getElementById(
        "kkm-success-message",
    );

    if (successMessageElement) {
        const message = successMessageElement.getAttribute("data-message");
        Swal.fire({
            icon: "success",
            title: "Berhasil!",
            text: message,
            timer: 2000,
            showConfirmButton: false,
        });
    }
});
