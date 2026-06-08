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
                updateTextTombolExport();
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

    function updateTextTombolExport() {
        const btnExportExcel = document.getElementById("btnExportExcel");
        const filterKelas = document.getElementById("filterKelas");

        if (btnExportExcel && filterKelas) {
            const nilaiDipilih = filterKelas.value;
            const teksDipilih =
                filterKelas.options[filterKelas.selectedIndex].text;

            if (nilaiDipilih === "semua") {
                btnExportExcel.innerHTML =
                    '<i class="fas fa-file-excel"></i> Export Semua Data Siswa';
            } else {
                btnExportExcel.innerHTML = `<i class="fas fa-file-excel"></i> Export Data Siswa Kelas ${teksDipilih}`;
            }
        }
    }

    updateTextTombolExport();

    const btnExportExcel = document.getElementById("btnExportExcel");
    if (btnExportExcel) {
        btnExportExcel.addEventListener("click", function () {
            const filterKelas = document.getElementById("filterKelas");
            const kelasPilihan = filterKelas ? filterKelas.value : "semua";
            window.location.href = `/guru/datasiswa/export?kelas=${encodeURIComponent(kelasPilihan)}`;
        });
    }
});

window.konfirmasiKeluar = function () {
    Swal.fire({
        title: "Apakah Kamu Yakin?",
        text: "Kamu akan keluar dari Akun ini.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#f95c50",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Ya, Keluar!",
        cancelButtonText: "Batal",
    }).then((result) => {
        if (result.isConfirmed) {
            document.getElementById("logout-form").submit();
        }
    });
};

// =======================================================================
// ini js datasiswa.blade (Fungsi Hapus / Delete)
// =======================================================================

function confirmDelete(button, id) {
    Swal.fire({
        title: "Apakah Kamu yakin?",
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
// ini js datasiswa.blade (Fungsi Tambah / Create Modal)
// =======================================================================

const createSiswaModal = document.getElementById("createSiswaModal");
const createNamaSiswa = document.getElementById("createNamaSiswa");
const createNisSiswa = document.getElementById("createNisSiswa");
const createKelasSiswa = document.getElementById("createKelasSiswa");
const createEmailSiswa = document.getElementById("createEmailSiswa");
const createPasswordSiswa = document.getElementById("createPasswordSiswa");

function openCreateSiswaModal() {
    if (createNamaSiswa) createNamaSiswa.value = "";
    if (createNisSiswa) createNisSiswa.value = "";
    if (createKelasSiswa) createKelasSiswa.value = "";
    if (createEmailSiswa) createEmailSiswa.value = "";
    if (createPasswordSiswa) createPasswordSiswa.value = "";

    if (createSiswaModal) createSiswaModal.classList.add("show");
}

function closeCreateSiswaModal() {
    if (createSiswaModal) createSiswaModal.classList.remove("show");
}

function storeSiswaData() {
    const tokenElement = document.querySelector('meta[name="csrf-token"]');
    const token = tokenElement ? tokenElement.getAttribute("content") : "";

    if (!createNamaSiswa.value || !createNisSiswa.value || !createKelasSiswa.value || !createEmailSiswa.value || !createPasswordSiswa.value) {
        Swal.fire("Peringatan", "Harap isi semua kolom yang wajib diisi (*)", "warning");
        return;
    }

    const payload = {
        nama_lengkap: createNamaSiswa.value,
        nomor_induk: createNisSiswa.value,
        kelas_id: createKelasSiswa.value,
        email: createEmailSiswa.value,
        password: createPasswordSiswa.value,
    };

    fetch("/guru/datasiswa", {
        method: "POST",
        headers: {
            "X-CSRF-TOKEN": token,
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(payload),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                closeCreateSiswaModal();
                Swal.fire({
                    icon: "success",
                    title: "Berhasil!",
                    text: "Data siswa baru berhasil ditambahkan.",
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

    if (editModal) editModal.classList.add("show");
}

function closeEditModal() {
    if (editModal) editModal.classList.remove("show");
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
// ini js datasiswa.blade (Fungsi Info Halaman)
// =======================================================================

function showPageInfo() {
    Swal.fire({
        title: '<div class="swal-info-title blue"><i class="fas fa-info-circle"></i> Informasi Data Siswa</div>',
        html: ` 
            <div class="swal-info-content">
                <p>Halaman <b>Data Siswa per Kelas</b> digunakan untuk mengelola daftar siswa yang tergabung dalam setiap kelas.</p>

                <div class="swal-info-divider"></div>

                <div class="swal-info-section blue">
                    <i class="fas fa-user-plus"></i> <b>Tambah Siswa</b>
                </div>
                <ul class="swal-info-list">
                    <li>Gunakan tombol <b>Tambah Siswa</b> untuk memasukkan data siswa baru secara manual.</li>
                    <li>Pastikan nama, NIS, pilihan kelas, email, dan password telah diisi.</li>
                </ul>

                <div class="swal-info-divider"></div>

                <div class="swal-info-section blue">
                    <i class="fas fa-filter"></i> <b>Filter Kelas</b>
                </div>
                <ul class="swal-info-list">
                    <li>Pilih kelas untuk menampilkan siswa berdasarkan kelas tersebut.</li>
                    <li>Jika tidak memilih kelas, sistem akan menampilkan seluruh siswa.</li>
                    <li>Perubahan pilihan kelas akan langsung memuat ulang data.</li>
                </ul>

                <div class="swal-info-divider"></div>

                <div class="swal-info-section green">
                    <i class="fas fa-table"></i> <b>Tabel Data Siswa</b>
                </div>
                <ul class="swal-info-list">
                    <li>Menampilkan NIS, nama siswa, kelas, dan email.</li>
                    <li>Dilengkapi fitur pencarian, pagination, dan responsive.</li>
                    <li>Nomor baris akan menyesuaikan jumlah data yang tampil.</li>
                </ul>

                <div class="swal-info-divider"></div>

                <div class="swal-info-section orange">
                    <i class="fas fa-edit"></i> <b>Edit Data Siswa</b>
                </div>
                <ul class="swal-info-list">
                    <li>Gunakan tombol <b>Edit</b> untuk memperbarui data siswa.</li>
                    <li>Password bersifat opsional dan dapat dikosongkan jika tidak ingin diubah.</li>
                    <li>Perubahan akan langsung tersimpan ke database.</li>
                </ul>

                <div class="swal-info-divider"></div>

                <div class="swal-info-section sky">
                    <i class="fas fa-file-excel"></i> <b>Export Data Siswa</b>
                </div>
                <ul class="swal-info-list">
                    <li>Export dapat dilakukan untuk seluruh siswa.</li>
                    <li>Jika kelas dipilih, export hanya berisi siswa dari kelas tersebut.</li>
                    <li>File hasil export menggunakan format Excel.</li>
                </ul>
            </div>
        `,
        showCloseButton: true,
        showConfirmButton: true,
        confirmButtonText: "Tutup, Saya Paham!",
        confirmButtonColor: "#64748b",
        customClass: {
            popup: "swal-info-popup",
            htmlContainer: "swal-info-container",
        },
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
// ini js datakelas.blade (Fungsi Info Halaman)
// =======================================================================

function showPageInfoKelas() {
    Swal.fire({
        title: '<div class="swal-info-title blue"><i class="fas fa-info-circle"></i> Informasi Data Kelas</div>',
        html: ` 
            <div class="swal-info-content">
                <p>Halaman <b>Data Kelas</b> digunakan untuk mengelola daftar kelas yang tersedia pada sistem pembelajaran.</p>

                <div class="swal-info-divider"></div>

                <div class="swal-info-section blue">
                    <i class="fas fa-plus-circle"></i> <b>Tambah Kelas</b>
                </div>
                <ul class="swal-info-list">
                    <li>Gunakan tombol <b>Tambah Kelas</b> untuk memasukkan data kelas baru.</li>
                    <li>Tahun ajaran bersifat opsional, dapat diisi atau dikosongkan.</li>
                </ul>

                <div class="swal-info-divider"></div>

                <div class="swal-info-section green">
                    <i class="fas fa-table"></i> <b>Tabel Data Kelas</b>
                </div>
                <ul class="swal-info-list">
                    <li>Tabel menampilkan Nama Kelas, Tahun Ajaran, dan Jumlah Siswa yang terdaftar.</li>
                    <li>Dilengkapi fitur pencarian nama kelas dan pagination.</li>
                </ul>

                <div class="swal-info-divider"></div>

                <div class="swal-info-section orange">
                    <i class="fas fa-edit"></i> <b>Aksi Edit & Hapus</b>
                </div>
                <ul class="swal-info-list">
                    <li>Gunakan tombol <b>Edit</b> untuk mengubah nama atau tahun ajaran kelas.</li>
                    <li>Gunakan tombol <b>Hapus</b> untuk menghapus data kelas secara permanen.</li>
                </ul>
            </div>
        `,
        showCloseButton: true,
        showConfirmButton: true,
        confirmButtonText: "Tutup, Saya Paham!",
        confirmButtonColor: "#64748b",
        customClass: {
            popup: "swal-info-popup",
            htmlContainer: "swal-info-container",
        },
    });
}

// =======================================================================
// ini js Progres Belajar
// =======================================================================
function updateTextTombolExportProgres() {
    const btnExportProgres = document.getElementById("btnExportProgres");
    const filterKelas = document.getElementById("filterKelas");

    if (btnExportProgres && filterKelas) {
        const nilaiDipilih = filterKelas.value;
        const teksDipilih = filterKelas.options[filterKelas.selectedIndex].text;

        if (nilaiDipilih === "semua") {
            btnExportProgres.innerHTML =
                '<i class="fas fa-file-excel"></i> Export Semua Data Progres';
        } else {
            btnExportProgres.innerHTML = `<i class="fas fa-file-excel"></i> Export Data Progres Kelas ${teksDipilih}`;
        }
    }
}

const btnExportProgres = document.getElementById("btnExportProgres");
if (btnExportProgres) {
    updateTextTombolExportProgres();

    const filterKelas = document.getElementById("filterKelas");
    if (filterKelas) {
        filterKelas.addEventListener("change", updateTextTombolExportProgres);
    }

    btnExportProgres.addEventListener("click", function () {
        const kelasPilihan = filterKelas ? filterKelas.value : "semua";
        window.location.href = `/guru/progresbelajar/export?kelas=${encodeURIComponent(kelasPilihan)}`;
    });
}

// =======================================================================
// ini js progresbelajar.blade (Fungsi Info Halaman)
// =======================================================================

function showPageInfoProgres() {
    Swal.fire({
        title: '<div class="swal-info-title blue"><i class="fas fa-info-circle"></i> Informasi Progres Belajar</div>',
        html: ` 
            <div class="swal-info-content">
                <p>Halaman <b>Progres Belajar Siswa</b> digunakan untuk memantau rincian penyelesaian materi dan latihan / kuis oleh setiap siswa.</p>

                <div class="swal-info-divider"></div>

                <div class="swal-info-section blue">
                    <i class="fas fa-tasks"></i> <b>Keterangan Status</b>
                </div>
                <ul class="swal-info-list">
                    <li><i class="fas fa-check-circle text-green"></i> <b>Sudah Selesai:</b> Siswa telah membaca materi dan mengerjakan latihan / kuis ini.</li>
                    <li><i class="fas fa-times-circle text-red-muted"></i> <b>Belum Selesai:</b> Siswa belum mengakses halaman materi dan latihan / kuis ini.</li>
                </ul>

                <div class="swal-info-divider"></div>

                <div class="swal-info-section green">
                    <i class="fas fa-table"></i> <b>Navigasi Tabel</b>
                </div>
                <ul class="swal-info-list">
                    <li>Geser (scroll) tabel ke kanan/kiri untuk melihat rincian setiap modul pembelajaran secara lengkap.</li>
                    <li>Gunakan <b>Pilih Kelas</b> untuk memfilter tampilan hanya untuk kelas tertentu.</li>
                </ul>

                <div class="swal-info-divider"></div>

                <div class="swal-info-section sky">
                    <i class="fas fa-file-excel"></i> <b>Export Data</b>
                </div>
                <ul class="swal-info-list">
                    <li>Klik tombol <b>Export Data Progres</b> untuk mengunduh laporan ini ke dalam format Excel.</li>
                    <li>Data yang di-export akan menyesuaikan dengan filter kelas yang sedang Kamu pilih.</li>
                </ul>
            </div>
        `,
        showCloseButton: true,
        showConfirmButton: true,
        confirmButtonText: "Tutup, Saya Paham!",
        confirmButtonColor: "#64748b",
        customClass: {
            popup: "swal-info-popup",
            htmlContainer: "swal-info-container",
        },
    });
}

// =======================================================================
// ini js data jawaban siswa / folder jawaban
// =======================================================================
function showPageInfoJawaban() {
    Swal.fire({
        title: '<div class="swal-info-title blue"><i class="fas fa-info-circle"></i> Informasi Data Jawaban</div>',
        html: ` 
            <div class="swal-info-content">
                <p>Halaman <b>Data Jawaban Latihan Siswa</b> digunakan untuk melihat hasil jawaban siswa yang dikerjakan pada setiap akhir materi.</p>

                <div class="swal-info-divider"></div>

                <div class="swal-info-section green">
                    <i class="fas fa-mouse-pointer"></i> <b>Cara Penggunaan</b>
                </div>
                <ul class="swal-info-list">
                    <li>Klik pada salah satu <b>Kotak Materi</b> di bawah ini (misal: "Kelajuan & Kecepatan").</li>
                    <li>Sistem akan menampilkan tabel berisi daftar siswa yang <b>sudah menyelesaikan</b> latihan tersebut.</li>
                    <li>Klik tombol hijau <b>Lihat PDF</b> pada baris nama siswa untuk membuka berkas hasil latihan mereka dalam bentuk PDF.</li>
                </ul>
            </div>
        `,
        showCloseButton: true,
        showConfirmButton: true,
        confirmButtonText: "Tutup, Saya Paham!",
        confirmButtonColor: "#64748b",
        customClass: {
            popup: "swal-info-popup",
            htmlContainer: "swal-info-container",
        },
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

function updateTextTombolExportNilai() {
    const btnExportNilai = document.getElementById("btnExportNilai");
    const filterKelas = document.getElementById("filterKelas");

    if (btnExportNilai && filterKelas) {
        const nilaiDipilih = filterKelas.value;
        const teksDipilih = filterKelas.options[filterKelas.selectedIndex].text;

        if (nilaiDipilih === "semua") {
            btnExportNilai.innerHTML =
                '<i class="fas fa-file-excel"></i> Export Semua Data Nilai';
        } else {
            btnExportNilai.innerHTML = `<i class="fas fa-file-excel"></i> Export Data Nilai Kelas ${teksDipilih}`;
        }
    }
}

const btnExportNilai = document.getElementById("btnExportNilai");
if (btnExportNilai) {
    updateTextTombolExportNilai();

    const filterKelas = document.getElementById("filterKelas");
    if (filterKelas) {
        filterKelas.addEventListener("change", updateTextTombolExportNilai);
    }

    btnExportNilai.addEventListener("click", function () {
        const kelasPilihan = filterKelas ? filterKelas.value : "semua";
        window.location.href = `/guru/datanilai/export?kelas=${encodeURIComponent(kelasPilihan)}`;
    });
}

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
// ini js datanilai.blade (Fungsi Info Halaman)
// =======================================================================

function showPageInfoNilai() {
    Swal.fire({
        title: '<div class="swal-info-title blue"><i class="fas fa-info-circle"></i> Informasi Data Nilai</div>',
        html: ` 
            <div class="swal-info-content">
                <p>Halaman <b>Data Nilai Siswa</b> digunakan untuk memantau rekapitulasi nilai dan riwayat pengerjaan kuis/evaluasi.</p>

                <div class="swal-info-divider"></div>

                <div class="swal-info-section blue">
                    <i class="fas fa-table"></i> <b>Tabel Nilai Utama</b>
                </div>
                <ul class="swal-info-list">
                    <li>Menampilkan <b>nilai tertinggi</b> yang pernah diraih siswa pada masing-masing kuis.</li>
                    <li>Nilai yang berwarna <span class="text-green">hijau</span> berarti memenuhi KKM, sedangkan <span class="text-red">merah</span> berarti di bawah KKM.</li>
                </ul>

                <div class="swal-info-divider"></div>

                <div class="swal-info-section orange">
                    <i class="fas fa-history"></i> <b>Riwayat Pengerjaan</b>
                </div>
                <ul class="swal-info-list">
                    <li>Klik tombol <b>Detail</b> untuk melihat seluruh riwayat percobaan siswa secara lengkap.</li>
                    <li>Di dalam riwayat, terdapat detail untuk setiap nomor soal dengan tanda <span class="text-green">✔</span> (Benar) atau <span class="text-red">✖</span> (Salah).</li>
                </ul>

                <div class="swal-info-divider"></div>

                <div class="swal-info-section green">
                    <i class="fas fa-question-circle"></i> <b>Informasi Soal</b>
                </div>
                <ul class="swal-info-list">
                    <li>Pada tabel modal riwayat, klik ikon <i class="fas fa-info-circle text-blue"></i> di bagian header soal (S1, S2, dst) untuk melihat pratinjau soal dan kunci jawaban.</li>
                </ul>

                <div class="swal-info-divider"></div>

                <div class="swal-info-section sky">
                    <i class="fas fa-file-excel"></i> <b>Export Data</b>
                </div>
                <ul class="swal-info-list">
                    <li>Klik tombol <b>Export Data Nilai</b> untuk mengunduh rekapitulasi nilai ini ke dalam format Excel.</li>
                </ul>
            </div>
        `,
        showCloseButton: true,
        showConfirmButton: true,
        confirmButtonText: "Tutup, Saya Paham!",
        confirmButtonColor: "#64748b",
        customClass: {
            popup: "swal-info-popup",
            htmlContainer: "swal-info-container",
        },
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

// =======================================================================
// ini js pengaturankkm.blade (Fungsi Info Halaman)
// =======================================================================

function showPageInfoKkm() {
    Swal.fire({
        title: '<div class="swal-info-title blue"><i class="fas fa-info-circle"></i> Informasi Pengaturan KKM</div>',
        html: ` 
            <div class="swal-info-content">
                <p>Halaman <b>Pengaturan KKM</b> digunakan untuk menetapkan standar nilai minimal kelulusan siswa untuk setiap kuis dan evaluasi.</p>

                <div class="swal-info-divider"></div>

                <div class="swal-info-section blue">
                    <i class="fas fa-sliders-h"></i> <b>Atur Nilai KKM</b>
                </div>
                <ul class="swal-info-list">
                    <li>Kamu dapat menentukan nilai KKM secara spesifik untuk masing-masing kuis (Gerak & Gaya) maupun Evaluasi Akhir.</li>
                    <li>Rentang nilai yang dimasukkan adalah antara <b>0 hingga 100</b>.</li>
                </ul>

                <div class="swal-info-divider"></div>

                <div class="swal-info-section orange">
                    <i class="fas fa-save"></i> <b>Simpan Perubahan</b>
                </div>
                <ul class="swal-info-list">
                    <li>Jangan lupa menekan tombol <b>Simpan Perubahan</b> setelah memperbarui KKM.</li>
                </ul>
            </div>
        `,
        showCloseButton: true,
        showConfirmButton: true,
        confirmButtonText: "Tutup, Saya Paham!",
        confirmButtonColor: "#64748b",
        customClass: {
            popup: "swal-info-popup",
            htmlContainer: "swal-info-container",
        },
    });
}
