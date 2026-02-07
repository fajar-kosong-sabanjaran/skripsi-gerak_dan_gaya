@extends('layouts.guru')

@section('content')

<meta name="csrf-token" content="{{ csrf_token() }}">
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

<div class="card-guru">
    
    <div class="card-header-action">
        <h3>Data Kelas</h3>
        <button class="btn-save btn-add-new" onclick="openCreateKelasModal()">
            <i class="fas fa-plus"></i> Tambah Kelas
        </button>
    </div>

    <div class="table-controls">
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
                <input type="text" class="form-input" id="searchInput" placeholder="Cari nama kelas...">
            </label>
        </div>
    </div>

    <div class="table-responsive">
        <table class="table-guru">
            <thead>
                <tr>
                    <th class="col-number">No</th>
                    <th>Nama Kelas</th>
                    <th>Deskripsi</th>
                    <th class="col-center">Jumlah Siswa</th> <th class="col-aksi">Aksi</th>
                </tr>
            </thead>
            <tbody id="tableBody">
                @forelse($data_kelas as $index => $kelas)
                <tr class="searchable-row">
                    <td class="col-center row-number">{{ $index + 1 }}</td>
                    <td class="text-bold row-name">{{ $kelas->nama }}</td>
                    <td>{{ $kelas->deskripsi ?? '-' }}</td>
                    
                    <td class="col-center">
                        <span class="badge-count">
                            <i class="fas fa-user-graduate"></i> {{ $kelas->users_count }}
                        </span>
                    </td>

                    <td>
                        <div class="action-buttons">
                            <button class="btn-aksi btn-edit" 
                                    onclick="openEditKelasModal(this)"
                                    data-id="{{ $kelas->id }}"
                                    data-nama="{{ $kelas->nama }}"
                                    data-deskripsi="{{ $kelas->deskripsi }}"
                                    title="Edit">
                                <i class="fas fa-edit"></i> Edit
                            </button>

                            <button class="btn-aksi btn-hapus" 
                                    onclick="confirmDeleteKelas(this, {{ $kelas->id }})" 
                                    title="Hapus">
                                <i class="fas fa-trash-alt"></i> Hapus
                            </button>
                        </div>
                    </td>
                </tr>
                @empty
                <tr>
                    <td colspan="5" class="empty-row">Belum ada data kelas.</td>
                </tr>
                @endforelse
            </tbody>
        </table>
    </div>

    <div class="table-footer">
        <div class="data-info" id="dataInfo">
            Menampilkan {{ count($data_kelas) }} data
        </div>
        <div class="pagination-buttons">
            <button class="btn-page" id="btnPrev">Previous</button>
            <span id="paginationNumbers" class="pagination-container"></span>
            <button class="btn-page" id="btnNext">Next</button>
        </div>
    </div>

</div>

<div id="createKelasModal" class="modal-overlay">
    <div class="modal-content">
        <div class="modal-header">
            <h4><i class="fas fa-plus-circle"></i> Tambah Kelas Baru</h4>
            <span class="close-btn" onclick="closeCreateKelasModal()">&times;</span>
        </div>
        <div class="modal-body">
            <div class="form-group">
                <label>Nama Kelas <span class="text-danger">*</span></label>
                <input type="text" id="createNama" class="form-input full-width" placeholder="Contoh: VII-A">
            </div>
            <div class="form-group">
                <label>Deskripsi (Opsional)</label>
                <input type="text" id="createDeskripsi" class="form-input full-width" placeholder="Contoh: Kelas Unggulan">
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn-cancel" onclick="closeCreateKelasModal()">Batal</button>
            <button class="btn-save" onclick="storeKelasData()">Simpan</button>
        </div>
    </div>
</div>

<div id="editKelasModal" class="modal-overlay">
    <div class="modal-content">
        <div class="modal-header">
            <h4><i class="fas fa-edit"></i> Edit Data Kelas</h4>
            <span class="close-btn" onclick="closeEditKelasModal()">&times;</span>
        </div>
        <div class="modal-body">
            <input type="hidden" id="editKelasId">
            <div class="form-group">
                <label>Nama Kelas <span class="text-danger">*</span></label>
                <input type="text" id="editNamaKelas" class="form-input full-width">
            </div>
            <div class="form-group">
                <label>Deskripsi (Opsional)</label>
                <input type="text" id="editDeskripsiKelas" class="form-input full-width">
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn-cancel" onclick="closeEditKelasModal()">Batal</button>
            <button class="btn-save" onclick="updateKelasData()">Simpan Perubahan</button>
        </div>
    </div>
</div>

<script src="{{ asset('js/scriptguru.js') }}"></script>

@endsection