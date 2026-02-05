document.addEventListener("DOMContentLoaded", () => {

  // --- JAM & TANGGAL TOPBAR ---
  const dateDisplay = document.getElementById('currentDate');
  if(dateDisplay) {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const today = new Date();
      dateDisplay.innerText = today.toLocaleDateString('id-ID', options);
  }

  // --- LOGIKA SIDEBAR TOGGLE ---
  const toggleItems = document.querySelectorAll(".menu-item.has-toggle");

  // 1. Toggle Manual
  toggleItems.forEach(item => {
    item.addEventListener("click", () => {
      const targetId = item.dataset.target;
      const submenu = document.getElementById(targetId);
      if (!submenu) return;

      const isOpen = submenu.classList.contains("open");

      // Opsional: Tutup submenu lain saat satu dibuka (Accordion effect)
      // document.querySelectorAll(".submenu.open").forEach(s => s.classList.remove("open"));
      // document.querySelectorAll(".menu-item.has-toggle.active").forEach(h => h.classList.remove("active"));

      if (!isOpen) {
        submenu.classList.add("open");
        item.classList.add("active");
      } else {
        submenu.classList.remove("open");
        item.classList.remove("active");
      }
    });
  });

  // 2. Auto-open Sidebar berdasarkan URL
  const path = window.location.pathname;

  // Jika URL mengandung 'nilai', buka submenu nilai
  if (path.includes("/guru/nilai")) {
    const submenu = document.getElementById("nilai");
    const header = document.querySelector('.menu-item.has-toggle[data-target="nilai"]');

    if (submenu) submenu.classList.add("open");
    if (header) header.classList.add("active");
  }

  // Jika URL mengandung 'preview', buka submenu preview
  if (path.includes("/preview")) { // sesuaikan logic jika URL preview beda
    const submenu = document.getElementById("preview");
    const header = document.querySelector('.menu-item.has-toggle[data-target="preview"]');

    if (submenu) submenu.classList.add("open");
    if (header) header.classList.add("active");
  }

});