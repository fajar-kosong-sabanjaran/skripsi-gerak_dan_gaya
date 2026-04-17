<?php

namespace App\Exports;

use App\Models\User;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class ProgresExport implements FromCollection, WithHeadings, WithMapping, ShouldAutoSize, WithStyles
{
    protected $kelasFilter;
    protected $nomor = 1;

    // Daftar materi sesuai urutan di web
    protected $listMateri = [
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

    // Menerima parameter kelas dari Controller
    public function __construct($kelasFilter)
    {
        $this->kelasFilter = strtolower($kelasFilter);
    }

    // Mengambil data dari Database
    public function collection()
    {
        $query = User::where('peran', 'siswa')->with(['kelas', 'progres']);

        // Jika filternya BUKAN 'semua', maka filter berdasarkan relasi kelas
        if ($this->kelasFilter !== 'semua') {
            $query->whereHas('kelas', function ($q) {
                $q->whereRaw('LOWER(nama) = ?', [$this->kelasFilter]);
            });
        }

        return $query->orderBy('nama_lengkap', 'asc')->get();
    }

    // Membuat Baris Judul (Header) di Excel
    public function headings(): array
    {
        $headings = [
            'No',
            'Nama Siswa',
            'Kelas',
        ];

        // Tambahkan judul materi ke array heading
        foreach ($this->listMateri as $judul) {
            $headings[] = $judul;
        }

        return $headings;
    }

    // Memetakan isi data (Baris per Baris)
    public function map($siswa): array
    {
        // Ambil array yang berisi kode materi yang sudah selesai (misal: ['pengertiangerak_completed', 'kuis1_completed'])
        $progresSiswa = $siswa->progres->pluck('kode_materi')->toArray();

        $row = [
            $this->nomor++,
            $siswa->nama_lengkap,
            $siswa->kelas->nama ?? 'Belum Ada Kelas',
        ];

        // Cek satu per satu materi, jika ada di tabel progres berarti "Selesai", jika tidak "Belum Selesai"
        foreach ($this->listMateri as $kodeMateri => $judul) {
            if (in_array($kodeMateri, $progresSiswa)) {
                $row[] = 'Selesai';
            } else {
                $row[] = 'Belum Selesai'; // [REVISI] Mengubah teks menjadi Belum Selesai
            }
        }

        return $row;
    }

    // Membuat baris header (baris pertama) menjadi cetak tebal (Bold)
    public function styles(Worksheet $sheet)
    {
        return [
            1 => ['font' => ['bold' => true]],
        ];
    }
}