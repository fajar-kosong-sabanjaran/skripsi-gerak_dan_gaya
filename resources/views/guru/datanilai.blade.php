@extends('layouts.guru')

@section('content')
<meta name="csrf-token" content="{{ csrf_token() }}">
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

<div class="card-guru">
    <div class="card-header-action" style="margin-bottom: 25px;">
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
    </div>

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
                        // Ekstrak Nilai Tertinggi per kuis
                        $n_kuis1 = $siswa->nilais->where('jenis_kuis', 'Kuis 1')->first();
                        $n_kuis2 = $siswa->nilais->where('jenis_kuis', 'Kuis 2')->first();
                        $n_evaluasi = $siswa->nilais->where('jenis_kuis', 'Evaluasi')->first();

                        $skor1 = $n_kuis1 ? $n_kuis1->nilai_tertinggi : 0;
                        $skor2 = $n_kuis2 ? $n_kuis2->nilai_tertinggi : 0;
                        $skor3 = $n_evaluasi ? $n_evaluasi->nilai_tertinggi : 0;
                    @endphp
                    <tr class="searchable-row">
                        <td class="col-center row-number">{{ $index + 1 }}</td>
                        <td class="text-bold row-name">{{ $siswa->nama_lengkap }}</td>
                        <td class="row-nis">{{ $siswa->nomor_induk ?? '-' }}</td>
                        <td class="row-kelas">{{ $siswa->kelas->nama ?? '-' }}</td>
                        
                        <td class="col-center text-bold {{ $skor1 >= 70 ? 'text-success' : 'text-danger' }}">
                            {{ $skor1 }}
                        </td>
                        <td class="col-center text-bold {{ $skor2 >= 70 ? 'text-success' : 'text-danger' }}">
                            {{ $skor2 }}
                        </td>
                        <td class="col-center text-bold {{ $skor3 >= 70 ? 'text-success' : 'text-danger' }}">
                            {{ $skor3 }}
                        </td>

                        <td class="col-center">
                            <button class="btn-aksi btn-riwayat" onclick="lihatRiwayat({{ $siswa->id }}, '{{ $siswa->nama_lengkap }}')">
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
            <span id="paginationNumbers" style="display:flex; gap:5px;"></span>
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

        <div class="modal-body" style="background: #f8fafc; overflow-y: auto; max-height: 70vh;">
            
            <div class="tab-container" style="margin-bottom: 20px; display:flex; gap:10px;">
                <button class="btn-tab active" onclick="loadDetailRiwayat(this, 'Kuis 1')">Kuis 1 (Gerak)</button>
                <button class="btn-tab" onclick="loadDetailRiwayat(this, 'Kuis 2')">Kuis 2 (Gaya)</button>
                <button class="btn-tab" onclick="loadDetailRiwayat(this, 'Evaluasi')">Evaluasi Akhir</button>
            </div>

            <input type="hidden" id="currentSiswaId">
            <input type="hidden" id="currentJenisKuis" value="Kuis 1">

            <div class="table-responsive" style="background: white; border-radius: 8px; border: 1px solid #e2e8f0; padding: 15px;">
                <h4 id="judulTabelRiwayat" style="margin-bottom:15px; color:#1e293b;"></h4>
                
                <table class="table-guru" id="tabelDetailRiwayat">
                    <thead>
                        <tr id="headerRiwayat">
                            </tr>
                    </thead>
                    <tbody id="bodyRiwayat">
                        </tbody>
                </table>
                
                <div id="loadingRiwayat" style="display:none; text-align:center; padding:30px;">
                    <i class="fas fa-spinner fa-spin fa-2x text-primary"></i>
                    <p style="margin-top:10px; color:#64748b;">Memuat data...</p>
                </div>

                <div id="kosongRiwayat" style="display:none; text-align:center; padding:30px; color:#94a3b8; font-style:italic;">
                    Belum ada riwayat pengerjaan.
                </div>
            </div>

        </div>
    </div>
</div>
@endsection