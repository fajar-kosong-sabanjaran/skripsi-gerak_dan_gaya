@extends('layouts.guru')

@section('content')
    <div class="card-guru">

        <div style="margin-bottom: 15px;">
            <h3>Progres Belajar Siswa</h3>
            <p style="color: #64748b; font-size: 14px;">Pantau rincian setiap langkah pembelajaran siswa di sini.</p>
        </div>

        <div class="legend-container">
            <div class="legend-item">
                <i class="fas fa-check-circle" style="color: #10b981;"></i> = Sudah Selesai
            </div>
            <div class="legend-item">
                <i class="fas fa-times-circle" style="color: #ef4444; opacity: 0.6;"></i> = Belum Selesai
            </div>
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

            <div class="search-control">
                <label>
                    Cari:
                    <input type="text" class="form-input" id="searchInput" placeholder="Cari nama/kelas...">
                </label>
            </div>
        </div>

        @php
            $list_materi = [
                'pengertiangerak_completed' => 'Pengertian Gerak',
                'jarak_completed' => 'Jarak Tempuh & Perpindahan',
                'kelajuan_completed' => 'Kelajuan & Kecepatan',
                'percepatan_completed' => 'Percepatan',
                'kuis1_completed' => 'KUIS 1',
                'pengertiangaya_completed' => 'Pengertian Gaya',
                'resultangaya_completed' => 'Resultan Gaya',
                'macamgaya_completed' => 'Macam-Macam Gaya',
                'hukumnewton_completed' => 'Hukum Newton',
                'kuis2_completed' => 'KUIS 2',
                'evaluasi_completed' => 'EVALUASI AKHIR',
            ];
        @endphp

        <div class="table-responsive">
            <table class="table-guru table-progres">
                <thead>
                    <tr>
                        <th class="col-number sticky-col sticky-no">No</th>
                        <th class="sticky-col sticky-nama border-right-sticky">Nama Siswa</th>
                        <th>Kelas</th>
                        
                        @foreach ($list_materi as $kode => $judul)
                            <th class="col-center th-materi">{{ $judul }}</th>
                        @endforeach
                    </tr>
                </thead>
                <tbody id="tableBody">
                    @forelse ($data_siswa as $index => $siswa)
                        @php
                            $progresSiswa = $siswa->progres->pluck('kode_materi')->toArray();
                        @endphp
                        <tr class="searchable-row">
                            <td class="col-center row-number sticky-col sticky-no">{{ $index + 1 }}</td>
                            <td class="text-bold row-name sticky-col sticky-nama border-right-sticky">{{ $siswa->nama_lengkap }}</td>
                            <td>
                                <span class="badge-kelas row-kelas">
                                    {{ $siswa->kelas->nama ?? 'Belum Ada' }}
                                </span>
                            </td>

                            @foreach ($list_materi as $kode => $judul)
                                <td class="col-center td-icon">
                                    @if (in_array($kode, $progresSiswa))
                                        <i class="fas fa-check-circle" style="color: #10b981;" title="Selesai"></i>
                                    @else
                                        <i class="fas fa-times-circle" style="color: #ef4444; opacity: 0.3;" title="Belum Selesai"></i>
                                    @endif
                                </td>
                            @endforeach
                        </tr>
                    @empty
                        <tr>
                            <td colspan="14" class="empty-row">Belum ada data siswa.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        <div class="table-footer">
            <div class="data-info" id="dataInfo">
                Menampilkan 0 - 0 dari 0 siswa
            </div>
            <div class="pagination-buttons">
                <button class="btn-page" id="btnPrev">Previous</button>
                <span id="paginationNumbers" class="pagination-container"></span>
                <button class="btn-page" id="btnNext">Next</button>
            </div>
        </div>

    </div>
@endsection