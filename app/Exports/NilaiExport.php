<?php

namespace App\Exports;

use App\Models\User;
use App\Models\PengaturanKkm;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class NilaiExport implements FromCollection, WithHeadings, WithMapping, ShouldAutoSize, WithStyles
{
    protected $kelasFilter;
    protected $nomor = 1;
    protected $kkm;

    public function __construct($kelasFilter)
    {
        $this->kelasFilter = strtolower($kelasFilter);
        $this->kkm = PengaturanKkm::first();
    }

    public function collection()
    {
        $query = User::where('peran', 'siswa')->with(['kelas', 'nilais']);

        if ($this->kelasFilter !== 'semua') {
            $query->whereHas('kelas', function ($q) {
                $q->whereRaw('LOWER(nama) = ?', [$this->kelasFilter]);
            });
        }

        return $query->orderBy('nama_lengkap', 'asc')->get();
    }

    public function headings(): array
    {
        return [
            'No',
            'Nama Siswa',
            'NIS',
            'Kelas',
            'Kuis 1',
            'Kuis 2',
            'Evaluasi',
        ];
    }

    public function map($siswa): array
    {
        $n_kuis1 = $siswa->nilais->where('jenis_kuis', 'Kuis 1')->first();
        $n_kuis2 = $siswa->nilais->where('jenis_kuis', 'Kuis 2')->first();
        $n_evaluasi = $siswa->nilais->where('jenis_kuis', 'Evaluasi')->first();

        return [
            $this->nomor++,
            $siswa->nama_lengkap,
            $siswa->nomor_induk ?? '-',
            $siswa->kelas->nama ?? 'Belum Ada Kelas',
            $n_kuis1 ? $n_kuis1->nilai_tertinggi : 0,
            $n_kuis2 ? $n_kuis2->nilai_tertinggi : 0,
            $n_evaluasi ? $n_evaluasi->nilai_tertinggi : 0,
        ];
    }

    public function styles(Worksheet $sheet)
    {
        return [
            1 => ['font' => ['bold' => true]],
        ];
    }
}