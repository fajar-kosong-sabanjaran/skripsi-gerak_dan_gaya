@extends('layouts.siswa')

@section('content')

<div class="main-content">
  <div class="container">
    <h1>PENGANTAR GAYA</h1>

    <div class="inner-box">
      <h3>Tujuan Pembelajaran</h3>
      <ul>
        <li>
          Peserta didik dapat menjelaskan konsep gaya serta pengaruhnya terhadap perubahan arah, bentuk, dan kecepatan benda.
        </li>
        <li>
          Peserta didik mampu menghitung besar resultan gaya yang bekerja searah maupun berlawanan arah.
        </li>
        <li>
          Peserta didik dapat membedakan jenis-jenis gaya serta menganalisis penerapan Hukum I, II, dan III Newton dalam kehidupan sehari-hari.
        </li>
      </ul>
    </div>

    <div class="inner-box">
      <h3>Pernahkah Kamu Perhatikan?</h3>
      <p>
        Pernahkah kamu melihat meja yang menghalangi jalan di kelasmu? Untuk memindahkannya, tentu kamu perlu melakukan sesuatu agar posisinya berubah. Apakah kamu akan mendorong atau justru menarik meja tersebut?
      </p>

      <p>
        <video class="content-video" autoplay muted loop playsinline>
          <source src="{{ asset('aset/1.mp4') }}" type="video/mp4">
          Browser Anda tidak mendukung tag video.
        </video>
      </p>
      <p class="image-caption">Seorang siswa mendorong meja</p>

      <p>
        Seperti pada animasi di atas, terlihat siswa sedang menggeser meja dengan cara mendorongnya. Tanpa dorongan tersebut, meja tentu akan tetap diam. Aktivitas berupa tarikan atau dorongan inilah yang disebut dengan gaya. Lalu, bagaimana pengaruh gaya tersebut terhadap gerak benda? Hal inilah yang akan kita pelajari pada bab ini.
      </p>
    </div>

  </div>

  <div class="bottom-nav">
    <a href="{{ url('siswa/gaya/pengertiangaya') }}" id="btn-next-materi" class="nav-btn next locked">Materi Selanjutnya »</a>
  </div>

</div>

@endsection