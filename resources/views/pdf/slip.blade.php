{{-- resources/views/pdf/slip.blade.php --}}
<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <title>Slip Gaji - {{ $employee->nama }} - {{ $employee->import->period }}</title>
    <style>
        @page {
            margin: 10mm 12mm;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'DejaVu Sans', Helvetica, Arial, sans-serif;
            font-size: 9px;
            color: #1e293b;
            line-height: 1.3;
        }

        .container {
            border: 1px solid #cbd5e1;
            border-radius: 10px;
            padding: 14px 18px;
        }

        .top-bar {
            height: 4px;
            background: #059669;
            border-radius: 10px 10px 0 0;
            margin: -14px -18px 12px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        .header-table {
            margin-bottom: 10px;
        }

        .header-table td,
        .total-card td {
            vertical-align: middle;
        }

        .company-name {
            font-size: 16px;
            font-weight: 700;
            color: #064e3b;
            letter-spacing: .02em;
        }

        .company-sub {
            font-size: 8px;
            color: #64748b;
            margin-top: 1px;
        }

        .doc-badge {
            text-align: right;
        }

        .badge-title {
            display: inline-block;
            background: #ecfdf5;
            border: 1px solid #a7f3d0;
            color: #047857;
            font-size: 9.5px;
            font-weight: 700;
            padding: 3px 10px;
            border-radius: 16px;
            letter-spacing: .05em;
        }

        .badge-period {
            font-size: 8px;
            color: #64748b;
            margin-top: 3px;
        }

        .divider {
            border: 0;
            border-top: 1px solid #e2e8f0;
            margin: 8px 0 10px;
        }

        .meta-box {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            margin-bottom: 12px;
        }

        .meta-box td {
            padding: 6px 9px;
            font-size: 8.5px;
            vertical-align: top;
        }

        .meta-label {
            color: #64748b;
            font-weight: 600;
            text-transform: uppercase;
            font-size: 7.5px;
            letter-spacing: .04em;
        }

        .meta-value {
            color: #0f172a;
            font-weight: 700;
            font-size: 9px;
            margin-top: 2px;
        }

        .columns>tbody>tr>td {
            width: 50%;
            vertical-align: top;
        }

        .column-left {
            padding-right: 6px;
        }

        .column-right {
            padding-left: 6px;
        }

        .sec-title {
            background: #047857;
            color: #fff;
            font-size: 8.5px;
            font-weight: 700;
            letter-spacing: .06em;
            padding: 5px 8px;
            border-radius: 4px;
            margin: 8px 0 4px;
        }

        .sec-title:first-child {
            margin-top: 0;
        }

        .sec-title.deduction {
            background: #475569;
        }

        .data-table {
            margin-bottom: 7px;
        }

        .data-table td {
            padding: 5px 6px;
            border-bottom: 1px solid #f1f5f9;
            font-size: 8.5px;
        }

        .data-table tr:last-child td {
            border-bottom: none;
        }

        .col-name {
            color: #334155;
            font-weight: 600;
        }

        .col-amt {
            text-align: right;
            font-weight: 700;
            color: #0f172a;
            width: 115px;
            white-space: nowrap;
        }

        .total-card {
            background: #ecfdf5;
            border: 1.5px solid #a7f3d0;
            border-radius: 6px;
            margin: 8px 0 10px;
        }

        .total-card td {
            padding: 9px 11px;
        }

        .total-label {
            font-size: 9px;
            font-weight: 700;
            color: #065f46;
            letter-spacing: .04em;
        }

        .total-val {
            text-align: right;
            font-size: 13px;
            font-weight: 700;
            color: #047857;
            white-space: nowrap;
        }

        .footer-table {
            margin-top: 24px;
        }

        .footer-table td {
            vertical-align: bottom;
            font-size: 8.5px;
        }

        .signature-box {
            text-align: right;
            color: #334155;
        }

        .sign-title {
            font-size: 8px;
            color: #64748b;
        }

        .sign-company {
            font-weight: 600;
            color: #0f172a;
            margin: 2px 0 25px;
        }

        .sign-name {
            font-weight: 700;
            color: #047857;
        }
    </style>
</head>

<body>
    @php
        $rp = fn($value) => 'Rp ' . number_format((float) $value, 0, ',', '.');
    @endphp

    <div class="container">
        <div class="top-bar"></div>
        <div
            style="text-align:center;font-size:8px;font-weight:700;color:#064e3b;text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px">
            ATAS BERKAT ROHMAT ALLOH YANG MAHA KUASA
        </div>

        <table class="header-table">
            <tr>
                <td>
                    <div class="company-name">PT. GADING GADJAH MADA</div>
                    <div class="company-sub">Jl. Albisindo Raya No. 9, Gebog, Kudus, Jawa Tengah 59333</div>
                </td>
                <td class="doc-badge">
                    <div class="badge-title">SLIP GAJI KARYAWAN</div>
                    <div class="badge-period">Periode: {{ $employee->import->period }}</div>
                </td>
            </tr>
        </table>

        <div class="divider"></div>

        <table class="meta-box">
            <tr>
                <td style="width: 34%">
                    <div class="meta-label">Nama Karyawan</div>
                    <div class="meta-value">{{ strtoupper($employee->nama ?: '-') }}</div>
                </td>
                <td style="width: 33%">
                    <div class="meta-label">NIP</div>
                    <div class="meta-value">{{ $employee->nip ?: '-' }}</div>
                </td>
                <td style="width: 33%">
                    <div class="meta-label">No. Rekening</div>
                    <div class="meta-value">{{ $employee->rekening ?: '-' }}</div>
                </td>
                <td>
                    <div class="meta-label">Departemen / Jabatan</div>
                    <div class="meta-value">{{ $employee->departemen ?: '-' }} / {{ $employee->jabatan ?: '-' }}</div>
                </td>
            </tr>
        </table>

        <table class="columns">
            <tr>
                <td class="column-left">
                    <div class="sec-title">POKOK DAN TUNJANGAN</div>
                    <table class="data-table">
                        <tr>
                            <td class="col-name">Pokok (Kehadiran {{ $employee->hadir }})</td>
                            <td class="col-amt">{{ $rp($employee->gaji_pokok) }}</td>
                        </tr>
                        <tr>
                            <td class="col-name">Jabatan</td>
                            <td class="col-amt">{{ $rp($employee->tunjangan_jabatan) }}</td>
                        </tr>
                        <tr>
                            <td class="col-name">Profesi</td>
                            <td class="col-amt">{{ $rp($employee->tunjangan_profesi) }}</td>
                        </tr>
                    </table>

                    <div class="sec-title">CUTI</div>
                    <table class="data-table">
                        <tr>
                            <td class="col-name">Cuti dan Premi</td>
                            <td class="col-amt">{{ $rp($employee->premi_cuti) }}</td>
                        </tr>
                    </table>

                    <div class="sec-title">LEMBUR / TAMBAHAN</div>
                    <table class="data-table">
                        <tr>
                            <td class="col-name">Jam</td>
                            <td class="col-amt">{{ $rp($employee->lembur_biasa) }}</td>
                        </tr>
                        <tr>
                            <td class="col-name">Hari Libur</td>
                            <td class="col-amt">{{ $rp($employee->lembur_libur) }}</td>
                        </tr>
                        <tr>
                            <td class="col-name">Tambahan</td>
                            <td class="col-amt">{{ $rp($employee->tambahan) }}</td>
                        </tr>
                        <tr>
                            <td class="col-name">Luar Kota</td>
                            <td class="col-amt">{{ $rp($employee->luar_kota) }}</td>
                        </tr>
                    </table>

                    <div class="sec-title">REKAP</div>
                    <table class="data-table">
                        <tr>
                            <td class="col-name">Cuti</td>
                            <td class="col-amt">{{ $employee->cuti }} Hari</td>
                        </tr>
                        <tr>
                            <td class="col-name">Izin</td>
                            <td class="col-amt">{{ $employee->izin }} Hari</td>
                        </tr>
                        <tr>
                            <td class="col-name">Sakit</td>
                            <td class="col-amt">{{ $employee->sakit }} Hari</td>
                        </tr>
                        <tr>
                            <td class="col-name">Alfa</td>
                            <td class="col-amt">{{ $employee->alfa }} Hari</td>
                        </tr>
                    </table>
                </td>
                <td class="column-right">
                    <div class="sec-title deduction">POTONGAN</div>
                    <table class="data-table">
                        <tr>
                            <td class="col-name">Angsuran Koperasi Ke-{{ $employee->koperasi_ke ?: '-' }}</td>
                            <td class="col-amt">{{ $rp($employee->koperasi) }}</td>
                        </tr>
                        <tr>
                            <td class="col-name">Bon</td>
                            <td class="col-amt">{{ $rp($employee->bon) }}</td>
                        </tr>
                        <tr>
                            <td class="col-name">BPJS</td>
                            <td class="col-amt">{{ $rp($employee->bpjs) }}</td>
                        </tr>
                        <tr>
                            <td class="col-name">Terlambat {{ $employee->terlambat_menit }} Menit</td>
                            <td class="col-amt">{{ $rp($employee->terlambat_potongan) }}</td>
                        </tr>
                        <tr>
                            <td class="col-name">Tanpa Ijin</td>
                            <td class="col-amt">{{ $rp($employee->tanpa_izin) }}</td>
                        </tr>
                        <tr>
                            <td class="col-name">Simpanan Wajib</td>
                            <td class="col-amt">{{ $rp($employee->simpanan_wajib) }}</td>
                        </tr>
                    </table>

                    <table class="total-card">
                        <tr>
                            <td>
                                <div class="total-label">UPAH YANG DITERIMA</div>
                                <div style="font-size:7.5px;color:#065f46;margin-top:2px">
                                    Periode: {{ $employee->import->period }}
                                </div>
                            </td>
                            <td class="total-val">{{ $rp($employee->total_gaji) }}</td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>

        <table class="footer-table">
            <tr>
                <td class="signature-box">
                    <div class="sign-title">Kudus, {{ \Carbon\Carbon::now()->locale('id')->isoFormat('D MMMM YYYY') }}
                    </div>
                    <div class="sign-company">Tertanda,</div>
                    <div class="sign-name">HRD Gading Gadjah Mada</div>
                </td>
            </tr>
        </table>
    </div>
</body>

</html>
