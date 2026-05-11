@extends('layouts.guru')

@section('content')
    <div class="card-guru">

        <div class="header-title-wrapper" style="display: flex; justify-content: space-between; align-items: center; width: 100%; flex-wrap: wrap; gap: 15px;">
            <div style="display: flex; align-items: center; gap: 10px;">
                <h3 style="margin: 0;">Data Jawaban - {{ $judul_materi }}</h3>
            </div>
            
            <a href="{{ route('guru.jawaban.index') }}" class="btn-aksi" style="background-color: #64748b;">
                <i class="fas fa-arrow-left"></i> Kembali ke Daftar
            </a>
        </div>

        <div class="table-controls" style="margin-top: 20px;">
            <div class="entries-control">
                <label>
                    Tampilkan
                    <select class="form-select" id="entriesSelect">
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                    </select>
                    data
                </label>
            </div>

            <div class="search-control">
                <label>
                    Cari:
                    <input type="text" class="form-input" id="searchInput" placeholder="Cari nama siswa...">
                </label>
            </div>
        </div>

        <div class="table-responsive">
            <table class="table-guru">
                <thead>
                    <tr>
                        <th class="col-number">No</th>
                        <th>Nama Siswa</th>
                        <th>Kelas</th>
                        <th class="col-aksi">Aksi</th>
                    </tr>
                </thead>
                <tbody id="tableBody">
                    @forelse ($data_jawaban as $index => $jawaban)
                        <tr class="searchable-row">
                            <td class="col-center row-number">{{ $index + 1 }}</td>
                            
                            <td class="text-bold row-name">{{ $jawaban->user->nama_lengkap ?? 'Siswa Terhapus' }}</td>
                            
                            <td>
                                <span class="badge-kelas row-kelas">
                                    {{ $jawaban->user->kelas->nama ?? 'Belum Ada' }}
                                </span>
                            </td>
                            
                            <td class="col-center">
                                <a href="{{ route('guru.jawaban.pdf', $jawaban->id) }}" target="_blank" class="btn-aksi btn-export" title="Lihat PDF">
                                    <i class="fas fa-file-pdf"></i> Lihat PDF
                                </a>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="4" style="text-align: center; padding: 20px; color: #64748b;">
                                Belum ada siswa yang menyelesaikan latihan pada materi ini.
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        <div class="table-footer">
            <div class="data-info" id="dataInfo">
                Menampilkan data...
            </div>
            <div class="pagination-buttons">
                <button class="btn-page" id="btnPrev">Previous</button>
                <span id="paginationNumbers" style="display:flex; gap:5px;"></span>
                <button class="btn-page" id="btnNext">Next</button>
            </div>
        </div>

    </div>
@endsection