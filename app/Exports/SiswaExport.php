<?php

namespace App\Exports;

use App\Models\User;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class SiswaExport implements FromCollection, WithHeadings, WithMapping, ShouldAutoSize
{
    protected $kelas;
    private $rowNumber = 0;

    // Menerima parameter kelas dari controller
    public function __construct($kelas)
    {
        $this->kelas = $kelas;
    }

    // Mengambil data dari database sesuai kelas yang dipilih
    public function collection()
    {
        $query = User::where('peran', 'siswa')->with('kelas');

        if ($this->kelas !== 'semua') {
            $query->whereHas('kelas', function ($q) {
                $q->where('nama', $this->kelas);
            });
        }

        return $query->get();
    }

    // Membuat Judul Kolom (Header) di baris pertama Excel
    public function headings(): array
    {
        return [
            'No',
            'NIS',
            'Nama Siswa',
            'Kelas',
            'Email',
        ];
    }

    // Memetakan data ke masing-masing kolom Excel
    public function map($siswa): array
    {
        return [
            ++$this->rowNumber,
            $siswa->nomor_induk ?? '-',
            $siswa->nama_lengkap,
            $siswa->kelas ? $siswa->kelas->nama : 'Belum Ada',
            $siswa->email,
        ];
    }
}