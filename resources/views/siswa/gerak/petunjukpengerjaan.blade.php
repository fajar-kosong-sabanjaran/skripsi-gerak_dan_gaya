<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Petunjuk Pengerjaan Kuis</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <link rel="stylesheet" href="{{ asset('css/style.css') }}">
</head>

<body class="body-petunjuk">

<div class="petunjuk-wrapper">
  <div class="petunjuk-header">
    <div class="icon-circle">i</div>
    <h1>PETUNJUK PENGERJAAN</h1>
  </div>

  <div class="divider"></div>

  <div class="petunjuk-content">
    <ol>
      <li>Kuis ini terdiri dari <b>10 soal pilihan ganda</b>.</li>
      <li>Setiap soal memiliki bobot nilai yang sama.</li>
      <li>Waktu pengerjaan kuis adalah <b>30 menit</b>.</li>
      <li>Bacalah setiap soal dengan teliti sebelum memilih jawaban.</li>
      <li>Setelah semua soal dijawab, klik tombol <b>“Kirim Jawaban”</b> untuk melihat hasil skor.</li>
      <li>Jika nilai belum tuntas, kamu akan diminta kembali ke materi <b>Gerak</b> untuk belajar ulang.</li>
      <li>Jika nilai sudah tuntas, kamu dapat melanjutkan ke materi berikutnya tentang <b>Gaya</b>.</li>
      <li>Tekan "Mulai Kuis" untuk memulai pengerjaan kuis.</li>
    </ol>

    <div class="info-box">
      <b>Tips:</b> Kerjakan dengan tenang dan fokus. Jika masih ragu dengan suatu soal, kamu dapat
      berpindah nomor soal terlebih dahulu, lalu kembali lagi sebelum menyelesaikan kuis.
    </div>
  </div>

  <div class="petunjuk-actions">
    <a href="{{ url('siswa/gerak/pengertiangerak') }}" class="btn btn-back">Kembali Ke Materi</a>
    
    <a href="{{ url('siswa/gerak/kuis1') }}" class="btn btn-start">Mulai Kuis</a>
  </div>
</div>

</body>
</html>