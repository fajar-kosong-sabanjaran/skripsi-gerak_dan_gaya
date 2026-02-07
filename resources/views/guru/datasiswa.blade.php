@extends('layouts.guru')

@section('content')

<meta name="csrf-token" content="{{ csrf_token() }}">

<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

<div class="card-guru">
    
    <div style="margin-bottom: 25px;">
        <h3>Data Siswa</h3>
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
                Urutkan:
                <select class="form-select" id="sortSelect">
                    <option value="default">Default (No Urut)</option>
                    <option value="nama_asc">Nama (A-Z)</option>
                    <option value="nama_desc">Nama (Z-A)</option>
                    <option value="kelas_asc">Kelas (A-Z)</option>
                    <option value="kelas_desc">Kelas (Z-A)</option>
                    <option value="nis_asc">NIS (Terkecil)</option>
                    <option value="nis_desc">NIS (Terbesar)</option>
                </select>
            </label>
        </div>

        <div class="search-control">
            <label>
                Cari:
                <input type="text" class="form-input" id="searchInput" placeholder="Cari data siswa...">
            </label>
        </div>
    </div>

    <div class="table-responsive">
        <table class="table-guru">
            <thead>
                <tr>
                    <th class="col-number">No</th>
                    <th>NIS</th>
                    <th>Nama Siswa</th>
                    <th>Kelas</th>
                    <th>Email</th>
                    <th class="col-aksi">Aksi</th>
                </tr>
            </thead>
            <tbody id="tableBody">
                @foreach($data_siswa as $index => $siswa)
                <tr class="searchable-row">
                    <td class="col-center row-number">{{ $index + 1 }}</td>
                    <td class="row-nis">{{ $siswa->nomor_induk ?? '-' }}</td>
                    <td class="text-bold row-name">{{ $siswa->nama_lengkap }}</td>
                    <td>
                        <span class="badge-kelas row-kelas">
                            {{ $siswa->kelas->nama ?? 'Belum Ada' }}
                        </span>
                    </td>
                    <td class="row-email">{{ $siswa->email }}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn-aksi btn-edit" 
                                    onclick="openEditModal(this)"
                                    data-id="{{ $siswa->id }}"
                                    data-nama="{{ $siswa->nama_lengkap }}"
                                    data-nis="{{ $siswa->nomor_induk }}"
                                    data-email="{{ $siswa->email }}"
                                    data-kelas="{{ $siswa->kelas_id ?? '' }}"
                                    title="Edit">
                                <i class="fas fa-edit"></i> Edit
                            </button>

                            <button class="btn-aksi btn-hapus" 
                                    onclick="confirmDelete(this, {{ $siswa->id }})" 
                                    title="Hapus">
                                <i class="fas fa-trash-alt"></i> Hapus
                            </button>
                        </div>
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    <div class="table-footer">
        <div class="data-info" id="dataInfo">
            Menampilkan 0 - 0 dari 0 siswa
        </div>
        <div class="pagination-buttons">
            <button class="btn-page" id="btnPrev">Previous</button>
            <span id="paginationNumbers" style="display:flex; gap:5px;"></span>
            <button class="btn-page" id="btnNext">Next</button>
        </div>
    </div>

</div>

<div id="editModal" class="modal-overlay">
    <div class="modal-content">
        <div class="modal-header">
            <h4><i class="fas fa-user-edit"></i> Edit Data Siswa</h4>
            <span class="close-btn" onclick="closeEditModal()">&times;</span>
        </div>
        
        <div class="modal-body">
            <input type="hidden" id="editId">

            <div class="form-group">
                <label>Nama Lengkap</label>
                <input type="text" id="editNama" class="form-input full-width">
            </div>

            <div class="form-group row">
                <div class="col-half">
                    <label>NIS</label>
                    <input type="text" id="editNis" class="form-input full-width">
                </div>
                <div class="col-half">
                    <label>Kelas</label>
                    <select id="editKelas" class="form-select full-width">
                        <option value="">-- Pilih Kelas --</option>
                        @foreach($data_kelas as $k)
                            <option value="{{ $k->id }}">{{ $k->nama }}</option>
                        @endforeach
                    </select>
                </div>
            </div>

            <div class="form-group">
                <label>Email</label>
                <input type="email" id="editEmail" class="form-input full-width">
            </div>

            <div class="form-group">
                <label>Password (Opsional)</label>
                <input type="password" id="editPassword" class="form-input full-width" placeholder="Biarkan kosong jika tidak diubah">
            </div>
        </div>

        <div class="modal-footer">
            <button class="btn-cancel" onclick="closeEditModal()">Batal</button>
            <button class="btn-save" onclick="saveEditData()">Simpan Perubahan</button>
        </div>
    </div>
</div>

<script src="{{ asset('js/scriptguru.js') }}"></script>

@endsection