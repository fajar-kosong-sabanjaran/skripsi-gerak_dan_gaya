<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Petunjuk Pengerjaan Kuis</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <link rel="stylesheet" href="{{ asset('css/style.css') }}?v={{ filemtime(public_path('css/style.css')) }}">
</head>

<body class="body-petunjuk">

@php
    $kkm_data = \App\Models\PengaturanKkm::first();
    $kkm_evaluasi = $kkm_data->kkm_evaluasi ?? 70;
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
    <a href="{{ url('siswa/gaya/pengertiangaya') }}" class="btn btn-back">Kembali Ke Materi</a>
    
    <a href="{{ url('siswa/evaluasi/mulai') }}" class="btn btn-start">Mulai</a>
  </div>
</div>

</body>
</html>