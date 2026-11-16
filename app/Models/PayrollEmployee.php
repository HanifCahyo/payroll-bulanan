<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PayrollEmployee extends Model
{
    protected $fillable = [
        'payroll_import_id',
        'row_number',
        'nip',
        'rekening',
        'nama',
        'jabatan',
        'departemen',
        'golongan',
        'email',
        'hadir',
        'cuti',
        'sakit',
        'izin',
        'alfa',
        'tidak_hadir',
        'terlambat_menit',
        'gaji_pokok',
        'tunjangan_jabatan',
        'tunjangan_profesi',
        'tunjangan_kinerja',
        'premi_cuti',
        'luar_kota',
        'tambahan',
        'kesehatan',
        'tanpa_izin',
        'terlambat_potongan',
        'simpanan_wajib',
        'koperasi',
        'koperasi_ke',
        'bpjs',
        'bon',
        'jumlah_gaji',
        'total_gaji',
        'lembur_biasa',
        'uth_2_jam',
        'uth_4_jam',
        'lembur_libur',
        'jumlah_iuran',
        'ksi',
        'tk',
        'email_sent',
        'email_sent_at',
        'pdf_path'
    ];

    protected $casts = [
        'email_sent' => 'boolean',
        'email_sent_at' => 'datetime',
    ];

    /** @return BelongsTo<PayrollImport, $this> */
    public function import(): BelongsTo
    {
        return $this->belongsTo(PayrollImport::class, 'payroll_import_id');
    }
}
