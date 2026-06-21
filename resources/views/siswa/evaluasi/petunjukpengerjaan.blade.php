<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Petunjuk Pengerjaan Kuis</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <link rel="stylesheet" href="{{ asset('css/style.css') }}?v={{ filemtime(public_path('css/style.css')) }}">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">
</head>

<body class="body-petunjuk">

@php
    $kkm_data = \App\Models\PengaturanKkm::first();
    $kkm_evaluasi = $kkm_data->kkm_evaluasi ?? 70;

    // Pengecekan hak akses tombol kesimpulan
    $bisaLihatKesimpulan = false;
    if (auth()->check()) {
        $user = auth()->user();
        if ($user->peran === 'guru') {
            $bisaLihatKesimpulan = true;
        } else {
            $nilaiSiswa = \App\Models\Nilai::where('user_id', $user->id)
                                ->where('jenis_kuis', 'Evaluasi')
                                ->max('nilai_tertinggi');

            if ($nilaiSiswa >= $kkm_evaluasi) {
                $bisaLihatKesimpulan = true;
            }
        }
    }
@endphp

<div class="petunjuk-wrapper">
  <div class="petunjuk-header">
    <div class="icon-circle">i</div>
    <h1>PETUNJUK PENGERJAAN</h1>
  </div>

  <div class="divider"></div>

    <div class="petunjuk-content">
    <ol>
        <li>Evaluasi ini terdiri dari <b>20 soal pilihan ganda.</b></li>
        <li>Setiap soal memiliki bobot sebanyak <b>5 poin.</b></li>
        <li>Waktu pengerjaan selama <b>40 menit.</b></li>
        <li>Bacalah setiap soal dengan teliti sebelum memilih jawaban.</li>
        <li>
        Ketika semua soal selesai dijawab, silahkan klik tombol
        <b>"Selesaikan Evaluasi"</b> untuk melihat hasil perolehan skor yang diperoleh.
        </li>
        <li>Jika nilai belum tuntas (di bawah KKM <b>{{ $kkm_evaluasi }}</b>), kamu dapat mengulang kembali evaluasi atau membaca ulang materi.</li>
        <li>Jika nilai sudah tuntas (mencapai KKM <b>{{ $kkm_evaluasi }}</b>), kamu telah berhasil menyelesaikan seluruh rangkaian pembelajaran.</li>
        <li>Tekan <b>"Mulai"</b> untuk memulai pengerjaan soal evaluasi.</li>
    </ol>

    <div class="info-box">
        <b>Tips:</b> Kerjakan dengan <b>tenang</b> dan <b>fokus</b>. Jika masih ragu dengan suatu soal,
        kamu dapat <b>berpindah nomor soal terlebih dahulu</b>, lalu kembali lagi sebelum
        <b>menyelesaikan evaluasi</b>.
    </div>
    </div>

  <div class="petunjuk-actions">
    <div style="display: flex; gap: 10px;">
        @if($bisaLihatKesimpulan)
            <button type="button" class="btn" id="btnLihatKesimpulan" style="background-color: #ff9f43; color: white; border: none; cursor: pointer; border-radius: 8px; font-weight: bold;">
                Lihat Kesimpulan
            </button>
        @endif
        
        <a href="{{ url('siswa/gaya/pengertiangaya') }}" class="btn btn-back">Kembali Ke Materi</a>
    </div>
    
    <a href="{{ url('siswa/evaluasi/mulai') }}" class="btn btn-start">Mulai</a>
  </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script>
    document.addEventListener("DOMContentLoaded", function() {
        const btnKesimpulan = document.getElementById('btnLihatKesimpulan');
        
        if (btnKesimpulan) {
            btnKesimpulan.addEventListener('click', function() {
                Swal.fire({
                    title: "Kesimpulan Materi",
                    html: `
                        <div style="text-align: left; max-height: 50vh; overflow-y: auto; font-size: 0.9rem; padding: 10px;">
                            <p style="margin-top: 8px;"><b>1. Gerak</b></p>
                            <ul style="padding-left: 20px; margin-top: 5px; margin-bottom: 10px;">
                                <li><b>Gerak</b> adalah perubahan posisi benda terhadap titik acuan.</li>
                                <li><b>Jarak</b> adalah total panjang lintasan, sedangkan <b>Perpindahan</b> adalah jarak lurus dari awal ke akhir.</li>
                                <li><b>Kelajuan</b> tidak memiliki arah, sedangkan <b>Kecepatan</b> memiliki arah gerak.</li>
                            </ul>
                            
                            <p style="margin-top: 8px;"><b>2. Gaya</b></p>
                            <ul style="padding-left: 20px; margin-top: 5px; margin-bottom: 0;">
                                <li><b>Gaya:</b> Tarikan/dorongan yang dapat mengubah bentuk, arah, dan kecepatan benda.</li>
                                <li><b>Resultan Gaya:</b> Ditambah jika searah, dan dikurang jika berlawanan arah.</li>
                                <li><b>Jenis Gaya:</b> Gaya gesek, gravitasi, pegas, dan otot.</li>
                                <li><b>Hukum Newton:</b> Kelembaman (I), hubungan gaya & percepatan (II), serta aksi-reaksi (III).</li>
                            </ul>
                        </div>
                    `,
                    icon: "info",
                    confirmButtonText: "Tutup",
                    confirmButtonColor: "#ff6b01",
                    backdrop: `rgba(0,0,0,0.5)`,
                    allowOutsideClick: true
                });
            });
        }
    });
</script>

</body>
</html>