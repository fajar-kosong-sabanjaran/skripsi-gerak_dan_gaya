@extends('layouts.guru')

@section('content')
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <div class="card-guru">
        <div class="card-header-action kkm-header-container">
            <div>
                <h3><i class="fas fa-cog"></i> Pengaturan KKM</h3>
                <p class="kkm-subtitle">Atur batas nilai minimal kelulusan (KKM) untuk setiap kuis dan evaluasi.</p>
            </div>
        </div>

        @if(session('success'))
            <div id="kkm-success-message" data-message="{{ session('success') }}" class="kkm-hidden"></div>
        @endif

        <form action="{{ url('guru/pengaturan-kkm') }}" method="POST" id="kkm-form">
            @csrf
            
            <div class="kkm-grid-container">
                
                <div class="form-group kkm-form-group">
                    <label class="kkm-label">KKM Kuis 1 (Gerak)</label>
                    <div class="kkm-input-wrapper">
                        <input type="number" name="kkm_kuis1" class="form-input full-width kkm-input" value="{{ $kkm->kkm_kuis1 ?? 70 }}" min="0" max="100" required>
                    </div>
                </div>

                <div class="form-group kkm-form-group">
                    <label class="kkm-label">KKM Kuis 2 (Gaya)</label>
                    <div class="kkm-input-wrapper">
                        <input type="number" name="kkm_kuis2" class="form-input full-width kkm-input" value="{{ $kkm->kkm_kuis2 ?? 70 }}" min="0" max="100" required>
                    </div>
                </div>

                <div class="form-group kkm-form-group">
                    <label class="kkm-label">KKM Evaluasi Akhir</label>
                    <div class="kkm-input-wrapper">
                        <input type="number" name="kkm_evaluasi" class="form-input full-width kkm-input" value="{{ $kkm->kkm_evaluasi ?? 70 }}" min="0" max="100" required>
                    </div>
                </div>

            </div>

            <div class="kkm-footer">
                <button type="submit" class="btn-save kkm-btn-submit">
                    <i class="fas fa-save"></i> Simpan Perubahan
                </button>
            </div>
        </form>
    </div>
@endsection