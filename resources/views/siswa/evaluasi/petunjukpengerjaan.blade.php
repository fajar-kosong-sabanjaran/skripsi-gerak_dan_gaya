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
        <li>Evaluasi ini terdiri dari <b>20 soal pilihan ganda.</b></li>
        <li>Setiap soal memiliki bobot sebanyak <b>5 poin.</b></li>
        <li>Waktu pengerjaan selama <b>45 menit.</b></li>
        <li>Jawablah soal dengan <b>benar</b> dan <b>tidak terburu-buru</b>.</li>
        <li>
        Ketika semua soal selesai dijawab, silahkan klik tombol
        <b>"Selesai"</b> untuk melihat hasil perolehan <b>skor</b> yang diperoleh.
        </li>
        <li>Tekan <b>"Mulai"</b> untuk memulai pengerjaan soal evaluasi.</li>
    </ol>

    <div class="info-box">
        <b>Tips:</b> Kerjakan dengan <b>tenang</b> dan <b>fokus</b>. Jika masih ragu dengan suatu soal,
        kamu dapat <b>berpindah nomor soal terlebih dahulu</b>, lalu kembali lagi sebelum
        <b>menyelesaikan kuis</b>.
    </div>
    </div>

  <div class="petunjuk-actions">
    <a href="{{ url('siswa/gaya/pengertiangaya') }}" class="btn btn-back">Kembali Ke Materi</a>
    
    <a href="{{ url('siswa/evaluasi/mulai') }}" class="btn btn-start">Mulai</a>
  </div>
</div>

</body>
</html>