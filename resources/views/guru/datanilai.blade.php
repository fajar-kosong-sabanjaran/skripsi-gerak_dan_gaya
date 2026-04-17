@extends('layouts.guru')

@section('content')
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <div class="card-guru">
        <div class="card-header-action nilai-header-margin">
            <h3>Data Nilai Siswa</h3>
        </div>

        <div class="table-controls">
            <div class="entries-control">
                <label>
                    Tampilkan
                    <select class="form-select" id="entriesSelect">
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                    data
                </label>
            </div>

            <div class="sort-control">
                <label>
                    Pilih Kelas:
                    <select class="form-select" id="filterKelas">
                        <option value="semua">Semua Kelas</option>
                        @foreach ($data_kelas as $k)
                            <option value="{{ $k->nama }}">{{ $k->nama }}</option>
                        @endforeach
                    </select>
                </label>
            </div>

            <div class="search-control">
                <label>
                    Cari:
                    <input type="text" class="form-input" id="searchInput" placeholder="Cari nama / NIS...">
                </label>
            </div>

            <div class="export-control">
                <button class="btn-aksi btn-export" id="btnExportNilai" title="Export ke Excel/CSV">
                    <i class="fas fa-file-excel"></i> Export Semua Data Nilai
                </button>
            </div>
        </div>

        @php
            $kkm1 = $kkm->kkm_kuis1 ?? 70;
            $kkm2 = $kkm->kkm_kuis2 ?? 70;
            $kkm3 = $kkm->kkm_evaluasi ?? 70;
        @endphp

        <div class="table-responsive">
            <table class="table-guru table-nilai" id="tabelNilai">
                <thead>
                    <tr>
                        <th class="col-number">No</th>
                        <th>Nama Siswa</th>
                        <th>NIS</th>
                        <th>Kelas</th>
                        <th class="col-center">Kuis 1</th>
                        <th class="col-center">Kuis 2</th>
                        <th class="col-center">Evaluasi</th>
                        <th class="col-center">Riwayat</th>
                    </tr>
                </thead>
                <tbody id="tableBody">
                    @foreach ($data_siswa as $index => $siswa)
                        @php
                            $n_kuis1 = $siswa->nilais->where('jenis_kuis', 'Kuis 1')->first();
                            $n_kuis2 = $siswa->nilais->where('jenis_kuis', 'Kuis 2')->first();
                            $n_evaluasi = $siswa->nilais->where('jenis_kuis', 'Evaluasi')->first();

                            $skor1 = $n_kuis1 ? $n_kuis1->nilai_tertinggi : 0;
                            $skor2 = $n_kuis2 ? $n_kuis2->nilai_tertinggi : 0;
                            $skor3 = $n_evaluasi ? $n_evaluasi->nilai_tertinggi : 0;
                        @endphp
                        <tr class="searchable-row" data-kelas="{{ strtolower($siswa->kelas->nama ?? '') }}">
                            <td class="col-center row-number">{{ $index + 1 }}</td>
                            <td class="text-bold row-name">{{ $siswa->nama_lengkap }}</td>
                            <td class="row-nis">{{ $siswa->nomor_induk ?? '-' }}</td>
                            <td class="row-kelas">{{ $siswa->kelas->nama ?? '-' }}</td>

                            <td class="col-center text-bold {{ $skor1 >= $kkm1 ? 'text-success' : 'text-danger' }}">
                                {{ $skor1 }}
                            </td>
                            <td class="col-center text-bold {{ $skor2 >= $kkm2 ? 'text-success' : 'text-danger' }}">
                                {{ $skor2 }}
                            </td>
                            <td class="col-center text-bold {{ $skor3 >= $kkm3 ? 'text-success' : 'text-danger' }}">
                                {{ $skor3 }}
                            </td>

                            <td class="col-center">
                                <button class="btn-aksi btn-riwayat"
                                    onclick="lihatRiwayat({{ $siswa->id }}, '{{ $siswa->nama_lengkap }}')">
                                    <i class="fas fa-history"></i> Detail
                                </button>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>

        <div class="table-footer">
            <div class="data-info" id="dataInfo">Menampilkan 0 - 0 dari 0 siswa</div>
            <div class="pagination-buttons">
                <button class="btn-page" id="btnPrev">Previous</button>
                <span id="paginationNumbers" class="pagination-container"></span>
                <button class="btn-page" id="btnNext">Next</button>
            </div>
        </div>
    </div>

    <div id="riwayatModal" class="modal-overlay">
        <div class="modal-content modal-lg">
            <div class="modal-header">
                <h4><i class="fas fa-history"></i> Riwayat Nilai - <span id="namaSiswaRiwayat"></span></h4>
                <span class="close-btn" onclick="closeRiwayatModal()">&times;</span>
            </div>

            <div class="modal-body modal-body-scroll">

                <div class="tab-container riwayat-tab-gap">
                    <button class="btn-tab active" onclick="loadDetailRiwayat(this, 'Kuis 1')">Kuis 1 (Gerak)</button>
                    <button class="btn-tab" onclick="loadDetailRiwayat(this, 'Kuis 2')">Kuis 2 (Gaya)</button>
                    <button class="btn-tab" onclick="loadDetailRiwayat(this, 'Evaluasi')">Evaluasi Akhir</button>
                </div>

                <input type="hidden" id="currentSiswaId">
                <input type="hidden" id="currentJenisKuis" value="Kuis 1">

                <div class="table-responsive riwayat-table-container">

                    <div class="riwayat-header-group">
                        <h4 id="judulTabelRiwayat" class="riwayat-title title-no-margin"></h4>
                        <span id="infoKkmSaatIni" class="badge-kkm d-none">
                            KKM Saat Ini: <span id="angkaKkmTampil">-</span>
                        </span>
                    </div>

                    <table class="table-guru d-none" id="tabelDetailRiwayat">
                        <thead>
                            <tr id="headerRiwayat"></tr>
                        </thead>
                        <tbody id="bodyRiwayat"></tbody>
                    </table>

                    <div id="loadingRiwayat" class="riwayat-loading d-none">
                        <i class="fas fa-spinner fa-spin fa-2x text-primary"></i>
                        <p class="loading-text">Memuat data...</p>
                    </div>

                    <div id="kosongRiwayat" class="riwayat-empty d-none">
                        Belum ada riwayat pengerjaan.
                    </div>
                </div>

            </div>
        </div>
    </div>
@endsection