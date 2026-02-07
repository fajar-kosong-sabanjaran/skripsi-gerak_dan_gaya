document.addEventListener("DOMContentLoaded", () => {

  // =======================================================================
  // ini js guru.blade (Sidebar & Navbar)
  // =======================================================================

  const toggleItems = document.querySelectorAll(".menu-item.has-toggle");
  const path = window.location.pathname;

  // Logic Toggle Sidebar Menu
  toggleItems.forEach(item => {
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

  // Logic Auto-open Sidebar berdasarkan URL
  if (path.includes("/guru/nilai")) {
    const submenu = document.getElementById("nilai");
    const header = document.querySelector('.menu-item.has-toggle[data-target="nilai"]');
    if (submenu) submenu.classList.add("open");
    if (header) header.classList.add("active");
  }

  if (path.includes("/preview") || path.includes("/siswa/")) {
    const submenu = document.getElementById("preview");
    const header = document.querySelector('.menu-item.has-toggle[data-target="preview"]');
    if (submenu) submenu.classList.add("open");
    if (header) header.classList.add("active");
  }

  // LOGIKA DROPDOWN NAVBAR
  const userMenuTrigger = document.getElementById('userMenuTrigger');
  const userDropdown = document.getElementById('userDropdown');

  if (userMenuTrigger && userDropdown) {
    userMenuTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      userDropdown.classList.toggle('active');
    });
  }

  window.addEventListener('click', (e) => {
    if (userDropdown && userDropdown.classList.contains('active')) {
      if (!userDropdown.contains(e.target) && !userMenuTrigger.contains(e.target)) {
        userDropdown.classList.remove('active');
      }
    }
  });


  // =======================================================================
  // ini js datasiswa.blade (Search, Pagination, & Sorting)
  // =======================================================================

  const tableBody = document.getElementById('tableBody');

  if (tableBody) {
    // 1. Simpan data baris asli saat halaman dimuat
    const originalRows = Array.from(tableBody.querySelectorAll('tr.searchable-row'));
    
    const searchInput = document.getElementById('searchInput');
    const entriesSelect = document.getElementById('entriesSelect');
    const sortSelect = document.getElementById('sortSelect');
    const btnPrev = document.getElementById('btnPrev');
    const btnNext = document.getElementById('btnNext');
    const dataInfo = document.getElementById('dataInfo');
    const paginationNumbers = document.getElementById('paginationNumbers');

    let currentPage = 1;
    let rowsPerPage = parseInt(entriesSelect.value);
    let processedRows = [...originalRows]; // Data yang sedang diproses

    // FUNGSI UTAMA: Update Tabel (Filter -> Sort -> Render)
    function updateTable() {
      // A. FILTER (Pencarian)
      const query = searchInput ? searchInput.value.toLowerCase() : '';
      let tempRows = originalRows.filter(row => {
        const rowText = row.innerText.toLowerCase();
        return rowText.includes(query);
      });

      // B. SORTING (Pengurutan)
      if (sortSelect) {
        const sortValue = sortSelect.value;
        
        tempRows.sort((a, b) => {
            const getText = (row, selector) => {
                const el = row.querySelector(selector);
                return el ? el.innerText.trim().toLowerCase() : '';
            };

            switch(sortValue) {
                case 'nama_asc':
                    return getText(a, '.row-name').localeCompare(getText(b, '.row-name'));
                case 'nama_desc':
                    return getText(b, '.row-name').localeCompare(getText(a, '.row-name'));
                case 'kelas_asc':
                    return getText(a, '.row-kelas').localeCompare(getText(b, '.row-kelas'));
                case 'kelas_desc':
                    return getText(b, '.row-kelas').localeCompare(getText(a, '.row-kelas'));
                case 'nis_asc':
                    return getText(a, '.row-nis').localeCompare(getText(b, '.row-nis'), undefined, {numeric: true});
                case 'nis_desc':
                    return getText(b, '.row-nis').localeCompare(getText(a, '.row-nis'), undefined, {numeric: true});
                default:
                    return originalRows.indexOf(a) - originalRows.indexOf(b);
            }
        });
      }

      processedRows = tempRows;
      renderTable();
    }

    // FUNGSI RENDER (Pagination & Tampilan)
    function renderTable() {
      const totalPages = Math.ceil(processedRows.length / rowsPerPage);

      if (currentPage < 1) currentPage = 1;
      if (currentPage > totalPages && totalPages > 0) currentPage = totalPages;

      const start = (currentPage - 1) * rowsPerPage;
      const end = start + rowsPerPage;
      const rowsToShow = processedRows.slice(start, end);

      tableBody.innerHTML = '';
      
      if (rowsToShow.length > 0) {
        rowsToShow.forEach((row, index) => {
          const noCell = row.querySelector('.row-number');
          if (noCell) noCell.innerText = start + index + 1;
          tableBody.appendChild(row);
        });
      } else {
        const colCount = originalRows.length > 0 ? originalRows[0].children.length : 6;
        tableBody.innerHTML = `<tr><td colspan="${colCount}" style="text-align:center; padding: 20px;">Data tidak ditemukan</td></tr>`;
      }

      const showStart = processedRows.length > 0 ? start + 1 : 0;
      const showEnd = end > processedRows.length ? processedRows.length : end;
      
      if (dataInfo) {
        const dataType = window.location.href.includes('datakelas') ? 'kelas' : 'siswa';
        dataInfo.innerText = `Menampilkan ${showStart} - ${showEnd} dari ${processedRows.length} ${dataType}`;
      }

      if (btnPrev) {
        btnPrev.disabled = currentPage === 1 || totalPages === 0;
        btnPrev.style.opacity = btnPrev.disabled ? "0.5" : "1";
      }
      if (btnNext) {
        btnNext.disabled = currentPage === totalPages || totalPages === 0;
        btnNext.style.opacity = btnNext.disabled ? "0.5" : "1";
      }

      if (paginationNumbers) {
        paginationNumbers.innerHTML = '';
        if (totalPages > 0) {
          const btnPage = document.createElement('button');
          btnPage.className = 'btn-page active';
          btnPage.innerText = currentPage;
          paginationNumbers.appendChild(btnPage);
        }
      }
    }

    // EVENT LISTENERS
    if (searchInput) {
      searchInput.addEventListener('keyup', () => {
        currentPage = 1;
        updateTable();
      });
    }

    if (sortSelect) {
      sortSelect.addEventListener('change', () => {
        currentPage = 1;
        updateTable();
      });
    }

    if (entriesSelect) {
      entriesSelect.addEventListener('change', function() {
        rowsPerPage = parseInt(this.value);
        currentPage = 1;
        updateTable();
      });
    }

    if (btnPrev) {
      btnPrev.addEventListener('click', function() {
        if (currentPage > 1) {
          currentPage--;
          renderTable();
        }
      });
    }

    if (btnNext) {
      btnNext.addEventListener('click', function() {
        const totalPages = Math.ceil(processedRows.length / rowsPerPage);
        if (currentPage < totalPages) {
          currentPage++;
          renderTable();
        }
      });
    }

    updateTable();
  }

});


// =======================================================================
// ini js datasiswa.blade (Fungsi Hapus / Delete)
// =======================================================================

function confirmDelete(button, id) {
  Swal.fire({
    title: 'Apakah Anda yakin?',
    text: "Data siswa ini akan dihapus permanen!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#3b82f6',
    confirmButtonText: 'Ya, Hapus!',
    cancelButtonText: 'Batal'
  }).then((result) => {
    if (result.isConfirmed) {
      const tokenElement = document.querySelector('meta[name="csrf-token"]');
      if (!tokenElement) return;
      const token = tokenElement.getAttribute('content');

      fetch(`/guru/datasiswa/${id}`, {
          method: 'DELETE',
          headers: {
            'X-CSRF-TOKEN': token,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })
        .then(response => {
          if (!response.ok) throw new Error('Network error');
          return response.json();
        })
        .then(data => {
          if (data.success) {
            Swal.fire('Terhapus!', 'Data siswa telah dihapus.', 'success')
              .then(() => location.reload());
          } else {
            Swal.fire('Gagal!', 'Terjadi kesalahan.', 'error');
          }
        })
        .catch(error => {
          console.error(error);
          Swal.fire('Error!', 'Gagal menghubungi server.', 'error');
        });
    }
  });
}


// =======================================================================
// ini js datasiswa.blade (Fungsi Edit / Update Modal)
// =======================================================================

const editModal = document.getElementById('editModal');
const editId = document.getElementById('editId');
const editNama = document.getElementById('editNama');
const editNis = document.getElementById('editNis');
const editKelas = document.getElementById('editKelas');
const editEmail = document.getElementById('editEmail');
const editPassword = document.getElementById('editPassword');

function openEditModal(button) {
  const id = button.dataset.id;
  const nama = button.dataset.nama;
  const nis = button.dataset.nis;
  const email = button.dataset.email;
  const kelas = button.dataset.kelas;

  if(editId) editId.value = id;
  if(editNama) editNama.value = nama;
  if(editNis) editNis.value = nis || '';
  if(editEmail) editEmail.value = email;
  if(editKelas) editKelas.value = kelas || '';
  if(editPassword) editPassword.value = '';

  if(editModal) {
    editModal.classList.add('show');
  }
}

function closeEditModal() {
  if(editModal) {
    editModal.classList.remove('show');
  }
}

function saveEditData() {
  const id = editId.value;
  const tokenElement = document.querySelector('meta[name="csrf-token"]');
  const token = tokenElement ? tokenElement.getAttribute('content') : '';

  const payload = {
    nama_lengkap: editNama.value,
    nomor_induk: editNis.value,
    kelas_id: editKelas.value,
    email: editEmail.value,
    password: editPassword.value
  };

  fetch(`/guru/datasiswa/${id}`, {
      method: 'PUT',
      headers: {
        'X-CSRF-TOKEN': token,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          closeEditModal();
          Swal.fire({
              icon: 'success',
              title: 'Berhasil!',
              text: 'Data siswa berhasil diperbarui',
              timer: 1500,
              showConfirmButton: false
          }).then(() => location.reload());
      } else {
          Swal.fire('Gagal', data.message || 'Terjadi kesalahan validasi', 'error');
      }
  })
  .catch(error => {
      console.error(error);
      Swal.fire('Error', 'Gagal menghubungi server', 'error');
  });
}


// =======================================================================
// ini js datakelas.blade (CRUD KELAS)
// =======================================================================

const createKelasModal = document.getElementById('createKelasModal');
const createNama = document.getElementById('createNama');
const createDeskripsi = document.getElementById('createDeskripsi');

function openCreateKelasModal() {
    if(createNama) createNama.value = '';
    if(createDeskripsi) createDeskripsi.value = '';
    if(createKelasModal) createKelasModal.classList.add('show');
}

function closeCreateKelasModal() {
    if(createKelasModal) createKelasModal.classList.remove('show');
}

function storeKelasData() {
    const tokenElement = document.querySelector('meta[name="csrf-token"]');
    const token = tokenElement ? tokenElement.getAttribute('content') : '';

    const payload = {
        nama: createNama.value,
        deskripsi: createDeskripsi.value
    };

    fetch('/guru/datakelas', {
        method: 'POST',
        headers: {
            'X-CSRF-TOKEN': token,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            closeCreateKelasModal();
            Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: 'Kelas baru berhasil ditambahkan.',
                timer: 1500,
                showConfirmButton: false
            }).then(() => location.reload());
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Gagal!',
                text: data.message || 'Terjadi kesalahan pada input data.',
                confirmButtonColor: '#ef4444',
                confirmButtonText: 'OK'
            });
        }
    })
    .catch(error => {
        console.error(error);
        Swal.fire('Error', 'Gagal menghubungi server.', 'error');
    });
}

// LOGIKA EDIT KELAS (UPDATE)
const editKelasModal = document.getElementById('editKelasModal');
const editKelasId = document.getElementById('editKelasId');
const editNamaKelas = document.getElementById('editNamaKelas');
const editDeskripsiKelas = document.getElementById('editDeskripsiKelas');

function openEditKelasModal(button) {
    const id = button.dataset.id;
    const nama = button.dataset.nama;
    const deskripsi = button.dataset.deskripsi;

    if(editKelasId) editKelasId.value = id;
    if(editNamaKelas) editNamaKelas.value = nama;
    if(editDeskripsiKelas) editDeskripsiKelas.value = deskripsi || '';

    if(editKelasModal) editKelasModal.classList.add('show');
}

function closeEditKelasModal() {
    if(editKelasModal) editKelasModal.classList.remove('show');
}

function updateKelasData() {
    const id = editKelasId.value;
    const tokenElement = document.querySelector('meta[name="csrf-token"]');
    const token = tokenElement ? tokenElement.getAttribute('content') : '';

    const payload = {
        nama: editNamaKelas.value,
        deskripsi: editDeskripsiKelas.value
    };

    fetch(`/guru/datakelas/${id}`, {
        method: 'PUT',
        headers: {
            'X-CSRF-TOKEN': token,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            closeEditKelasModal();
            Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: 'Data kelas berhasil diperbarui.',
                timer: 1500,
                showConfirmButton: false
            }).then(() => location.reload());
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Gagal!',
                text: data.message || 'Gagal memperbarui data.',
                confirmButtonColor: '#ef4444',
                confirmButtonText: 'OK'
            });
        }
    })
    .catch(error => {
        console.error(error);
        Swal.fire('Error', 'Gagal menghubungi server.', 'error');
    });
}

// LOGIKA HAPUS KELAS (DELETE)
function confirmDeleteKelas(button, id) {
    Swal.fire({
        title: 'Hapus Kelas?',
        text: "Data kelas akan dihapus secara permanen!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#3b82f6',
        confirmButtonText: 'Ya, Hapus!',
        cancelButtonText: 'Batal'
    }).then((result) => {
        if (result.isConfirmed) {
            const tokenElement = document.querySelector('meta[name="csrf-token"]');
            const token = tokenElement ? tokenElement.getAttribute('content') : '';

            fetch(`/guru/datakelas/${id}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': token,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    Swal.fire('Terhapus!', 'Kelas berhasil dihapus.', 'success')
                        .then(() => location.reload());
                } else {
                    Swal.fire('Gagal!', data.message || 'Terjadi kesalahan saat menghapus.', 'error');
                }
            })
            .catch(error => {
                console.error(error);
                Swal.fire('Error!', 'Gagal menghubungi server.', 'error');
            });
        }
    });
}