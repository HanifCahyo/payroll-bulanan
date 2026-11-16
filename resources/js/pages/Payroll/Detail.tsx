import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { useRef, useState, type FormEvent } from 'react';
import {
    AlertCircle,
    ArrowRight,
    Ban,
    CheckCircle2,
    Download,
    Info,
    Mail,
    MailCheck,
    Pencil,
    Play,
    Send,
    ShieldCheck,
    Trash2,
    X,
} from 'lucide-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import EmptyState from '@/components/EmptyState';
import payrollEmail from '@/routes/payroll/email';
import { pdf as payrollPdf } from '@/routes/payroll';
import employeeRoutes from '@/routes/payroll/employee';
import { index as payrollIndex } from '@/routes/payroll';
import { Input } from '@/components/ui/input';

type DecimalValue = number | string;
type Employee = {
    id: number;
    row_number: number;
    nip: string | null;
    rekening: string | null;
    nama: string | null;
    jabatan: string | null;
    departemen: string | null;
    golongan: string | null;
    email: string | null;
    hadir: number;
    cuti: number;
    sakit: number;
    izin: number;
    alfa: number;
    tidak_hadir: number;
    terlambat_menit: number;
    gaji_pokok: DecimalValue;
    tunjangan_jabatan: DecimalValue;
    tunjangan_profesi: DecimalValue;
    tunjangan_kinerja: DecimalValue;
    premi_cuti: DecimalValue;
    luar_kota: DecimalValue;
    tambahan: DecimalValue;
    kesehatan: DecimalValue;
    tanpa_izin: DecimalValue;
    terlambat_potongan: DecimalValue;
    simpanan_wajib: DecimalValue;
    koperasi: DecimalValue;
    koperasi_ke: number | null;
    bpjs: DecimalValue;
    bon: DecimalValue;
    jumlah_gaji: DecimalValue;
    total_gaji: DecimalValue;
    lembur_biasa: DecimalValue;
    uth_2_jam: number;
    uth_4_jam: number;
    lembur_libur: DecimalValue;
    jumlah_iuran: DecimalValue;
    ksi: DecimalValue;
    tk: DecimalValue;
    email_sent: boolean;
};
type ImportData = {
    id: number;
    period: string;
    period_range: string;
    total_rows: number;
};
type Props = {
    import: ImportData;
    employees?: Employee[];
    pendingJobsCount?: number;
};
type EditData = {
    nip: string;
    rekening: string;
    nama: string;
    jabatan: string;
    departemen: string;
    golongan: string;
    email: string;
    hadir: number;
    cuti: number;
    sakit: number;
    izin: number;
    alfa: number;
    tidak_hadir: number;
    terlambat_menit: number;
    gaji_pokok: number;
    tunjangan_jabatan: number;
    tunjangan_profesi: number;
    tunjangan_kinerja: number;
    premi_cuti: number;
    luar_kota: number;
    tambahan: number;
    kesehatan: number;
    tanpa_izin: number;
    terlambat_potongan: number;
    simpanan_wajib: number;
    koperasi: number;
    koperasi_ke: number;
    bpjs: number;
    bon: number;
    jumlah_gaji: number;
    total_gaji: number;
    lembur_biasa: number;
    uth_2_jam: number;
    uth_4_jam: number;
    lembur_libur: number;
    jumlah_iuran: number;
    ksi: number;
    tk: number;
};
const money = (value: DecimalValue | null) =>
    new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
    }).format(Number(value ?? 0));
const blankEdit: EditData = {
    nip: '',
    rekening: '',
    nama: '',
    jabatan: '',
    departemen: '',
    golongan: '',
    email: '',
    hadir: 0,
    cuti: 0,
    sakit: 0,
    izin: 0,
    alfa: 0,
    tidak_hadir: 0,
    terlambat_menit: 0,
    gaji_pokok: 0,
    tunjangan_jabatan: 0,
    tunjangan_profesi: 0,
    tunjangan_kinerja: 0,
    premi_cuti: 0,
    luar_kota: 0,
    tambahan: 0,
    kesehatan: 0,
    tanpa_izin: 0,
    terlambat_potongan: 0,
    simpanan_wajib: 0,
    koperasi: 0,
    koperasi_ke: 0,
    bpjs: 0,
    bon: 0,
    jumlah_gaji: 0,
    total_gaji: 0,
    lembur_biasa: 0,
    uth_2_jam: 0,
    uth_4_jam: 0,
    lembur_libur: 0,
    jumlah_iuran: 0,
    ksi: 0,
    tk: 0,
};

const textFields = [
    ['nama', 'Nama'],
    ['nip', 'NIP'],
    ['rekening', 'No. Rekening'],
    ['jabatan', 'Jabatan'],
    ['departemen', 'Departemen'],
    ['golongan', 'Golongan'],
    ['email', 'Email'],
] as const;
const numberFields = [
    ['hadir', 'Hadir'],
    ['cuti', 'Cuti'],
    ['sakit', 'Sakit'],
    ['izin', 'Izin'],
    ['alfa', 'Alfa'],
    ['tidak_hadir', 'Tidak Hadir'],
    ['terlambat_menit', 'Terlambat (menit)'],
    ['gaji_pokok', 'Gaji Pokok'],
    ['tunjangan_jabatan', 'Tunjangan Jabatan'],
    ['tunjangan_profesi', 'Tunjangan Profesi'],
    ['tunjangan_kinerja', 'Tunjangan Kinerja'],
    ['premi_cuti', 'Premi Cuti'],
    ['luar_kota', 'Upah Luar Kota'],
    ['tambahan', 'Tambahan'],
    ['kesehatan', 'Kesehatan'],
    ['tanpa_izin', 'Tanpa Izin'],
    ['terlambat_potongan', 'Potongan Terlambat'],
    ['simpanan_wajib', 'Simpanan Wajib'],
    ['koperasi', 'Koperasi'],
    ['koperasi_ke', 'Angsuran Koperasi Ke'],
    ['bpjs', 'BPJS'],
    ['bon', 'Bon'],
    ['jumlah_gaji', 'Jumlah Gaji'],
    ['total_gaji', 'Total Gaji'],
    ['lembur_biasa', 'Lembur Biasa'],
    ['uth_2_jam', 'UTH 2 Jam'],
    ['uth_4_jam', 'UTH 4 Jam'],
    ['lembur_libur', 'Lembur Libur'],
    ['jumlah_iuran', 'Jumlah Iuran'],
    ['ksi', 'KSI'],
    ['tk', 'TK'],
] as const;

export default function Detail({
    import: payrollImport,
    employees = [],
    pendingJobsCount = 0,
}: Props) {
    const { flash } = usePage().props as {
        flash?: { success?: string; error?: string; info?: string };
    };
    const [editing, setEditing] = useState<Employee | null>(null);
    const [sendingEmployeeIds, setSendingEmployeeIds] = useState<Set<number>>(
        new Set(),
    );
    const sendingEmployeeIdsRef = useRef(new Set<number>());
    const [bulkFrom, setBulkFrom] = useState(1);
    const [bulkTo, setBulkTo] = useState(payrollImport.total_rows);
    const [sending, setSending] = useState(false);
    const [processingQueue, setProcessingQueue] = useState(false);
    const [cancelingQueue, setCancelingQueue] = useState(false);
    const [localFlash, setLocalFlash] = useState<{
        message: string;
        type: 'success' | 'error';
    } | null>(null);
    const { data, setData, put, processing, errors, reset } =
        useForm<EditData>(blankEdit);
    const openEdit = (employee: Employee) => {
        setEditing(employee);
        setData({
            nip: employee.nip ?? '',
            rekening: employee.rekening ?? '',
            nama: employee.nama ?? '',
            jabatan: employee.jabatan ?? '',
            departemen: employee.departemen ?? '',
            golongan: employee.golongan ?? '',
            email: employee.email ?? '',
            hadir: employee.hadir ?? 0,
            cuti: employee.cuti ?? 0,
            sakit: employee.sakit ?? 0,
            izin: employee.izin ?? 0,
            alfa: employee.alfa ?? 0,
            tidak_hadir: employee.tidak_hadir ?? 0,
            terlambat_menit: employee.terlambat_menit ?? 0,
            gaji_pokok: Number(employee.gaji_pokok ?? 0),
            tunjangan_jabatan: Number(employee.tunjangan_jabatan ?? 0),
            tunjangan_profesi: Number(employee.tunjangan_profesi ?? 0),
            tunjangan_kinerja: Number(employee.tunjangan_kinerja ?? 0),
            premi_cuti: Number(employee.premi_cuti ?? 0),
            luar_kota: Number(employee.luar_kota ?? 0),
            tambahan: Number(employee.tambahan ?? 0),
            kesehatan: Number(employee.kesehatan ?? 0),
            tanpa_izin: Number(employee.tanpa_izin ?? 0),
            terlambat_potongan: Number(employee.terlambat_potongan ?? 0),
            simpanan_wajib: Number(employee.simpanan_wajib ?? 0),
            koperasi: Number(employee.koperasi ?? 0),
            koperasi_ke: employee.koperasi_ke ?? 0,
            bpjs: Number(employee.bpjs ?? 0),
            bon: Number(employee.bon ?? 0),
            jumlah_gaji: Number(employee.jumlah_gaji ?? 0),
            total_gaji: Number(employee.total_gaji ?? 0),
            lembur_biasa: Number(employee.lembur_biasa ?? 0),
            uth_2_jam: employee.uth_2_jam ?? 0,
            uth_4_jam: employee.uth_4_jam ?? 0,
            lembur_libur: Number(employee.lembur_libur ?? 0),
            jumlah_iuran: Number(employee.jumlah_iuran ?? 0),
            ksi: Number(employee.ksi ?? 0),
            tk: Number(employee.tk ?? 0),
        });
    };
    const closeEdit = () => {
        setEditing(null);
        reset();
    };
    const saveEdit = (event: FormEvent) => {
        event.preventDefault();
        if (!editing) return;
        put(employeeRoutes.update.url(editing.id), {
            preserveScroll: true,
            onSuccess: closeEdit,
        });
    };
    const notify = (message: string, type: 'success' | 'error' = 'success') => {
        setLocalFlash({ message, type });
        window.setTimeout(() => setLocalFlash(null), 4000);
    };
    const removeEmployee = (employee: Employee) => {
        if (window.confirm(`Hapus data ${employee.nama ?? 'karyawan'}?`))
            router.delete(employeeRoutes.destroy.url(employee.id), {
                preserveScroll: true,
                onSuccess: () => notify('Data karyawan berhasil dihapus.'),
                onError: () =>
                    notify('Gagal menghapus data karyawan.', 'error'),
            });
    };
    const sendBulk = () => {
        if (
            bulkFrom < 1 ||
            bulkTo < bulkFrom ||
            bulkTo > payrollImport.total_rows
        ) {
            notify(
                `Rentang baris harus 1 sampai ${payrollImport.total_rows}.`,
                'error',
            );
            return;
        }
        if (!window.confirm(`Kirim slip gaji baris ${bulkFrom}–${bulkTo}?`))
            return;
        setSending(true);
        router.post(
            payrollEmail.bulk.url(payrollImport.id),
            { from: bulkFrom, to: bulkTo },
            { preserveScroll: true, onFinish: () => setSending(false) },
        );
    };
    const sendOne = (employee: Employee) => {
        if (!employee.email?.trim()) {
            notify('Email karyawan belum diisi.', 'error');
            return;
        }
        if (sendingEmployeeIdsRef.current.has(employee.id)) return;
        const action = employee.email_sent ? 'Kirim ulang' : 'Kirim';
        if (!window.confirm(`${action} slip gaji ke ${employee.email}?`))
            return;

        sendingEmployeeIdsRef.current.add(employee.id);
        setSendingEmployeeIds((current) => new Set(current).add(employee.id));
        router.post(
            payrollEmail.one.url(employee.id),
            {},
            {
                preserveScroll: true,
                onFinish: () => {
                    sendingEmployeeIdsRef.current.delete(employee.id);
                    setSendingEmployeeIds((current) => {
                        const next = new Set(current);
                        next.delete(employee.id);
                        return next;
                    });
                },
            },
        );
    };
    const processQueue = () => {
        setProcessingQueue(true);
        router.post(
            '/payroll/process-queue',
            {},
            {
                preserveScroll: true,
                onFinish: () => setProcessingQueue(false),
            },
        );
    };
    const cancelQueue = () => {
        if (!window.confirm(`Batalkan ${pendingJobsCount} antrean email?`))
            return;
        setCancelingQueue(true);
        router.post(
            '/payroll/cancel-queue',
            {},
            {
                preserveScroll: true,
                onFinish: () => setCancelingQueue(false),
            },
        );
    };
    const activeError =
        flash?.error ??
        (localFlash?.type === 'error' ? localFlash.message : undefined);
    const activeSuccess =
        flash?.success ??
        (localFlash?.type === 'success' ? localFlash.message : undefined);
    const activeInfo = flash?.info;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold text-slate-900">
                    Detail Payroll
                </h2>
            }
        >
            <Head title={`Payroll - ${payrollImport.period}`} />
            <div className="space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-xs font-medium tracking-[0.2em] text-emerald-600 uppercase">
                            Payroll bulanan
                        </p>
                        <h1 className="mt-2 text-3xl font-semibold text-slate-900">
                            Data Payroll
                        </h1>
                        <p className="mt-2 text-sm text-slate-500">
                            {payrollImport.period} ·{' '}
                            {payrollImport.period_range} ·{' '}
                            {payrollImport.total_rows} karyawan
                        </p>
                    </div>
                    <Link
                        href={payrollIndex.url()}
                        className="inline-flex items-center gap-2 rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-emerald-50 hover:text-emerald-800"
                    >
                        Kembali
                        <ArrowRight className="size-4 rotate-180" />
                    </Link>
                </div>
                {(activeError || activeSuccess || activeInfo) && (
                    <div
                        className={`rounded-2xl border p-4 text-sm shadow-sm ${
                            activeError
                                ? 'border-rose-200 bg-rose-50 text-rose-800'
                                : activeInfo
                                  ? 'border-sky-200 bg-sky-50 text-sky-800'
                                  : 'border-emerald-200 bg-emerald-50 text-emerald-800'
                        }`}
                    >
                        <div className="flex items-start gap-3">
                            {activeError ? (
                                <AlertCircle className="size-5 shrink-0" />
                            ) : activeInfo ? (
                                <Info className="size-5 shrink-0" />
                            ) : (
                                <CheckCircle2 className="size-5 shrink-0" />
                            )}
                            <div>
                                <p className="font-semibold">
                                    {activeError
                                        ? 'Gagal mengirim'
                                        : activeInfo
                                          ? 'Informasi pengiriman'
                                          : 'Berhasil'}
                                </p>
                                <p className="mt-1 text-xs opacity-90">
                                    {activeError || activeSuccess || activeInfo}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
                <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
                    <div className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                            <div>
                                <h2 className="text-lg font-semibold text-slate-900">
                                    Aksi batch
                                </h2>
                                <p className="text-sm text-slate-500">
                                    Kirim slip gaji untuk rentang karyawan yang
                                    dipilih.
                                </p>
                            </div>
                            <div className="inline-flex items-center gap-2 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                                <ShieldCheck className="size-4" /> Otomatis
                                Rotasi Akun SMTP
                            </div>
                        </div>
                        <div className="mt-6 grid gap-4 md:grid-cols-3">
                            <label className="space-y-2 text-sm font-medium text-slate-700">
                                Dari baris
                                <Input
                                    type="number"
                                    min={1}
                                    max={payrollImport.total_rows}
                                    value={bulkFrom}
                                    onChange={(event) =>
                                        setBulkFrom(Number(event.target.value))
                                    }
                                />
                            </label>
                            <label className="space-y-2 text-sm font-medium text-slate-700">
                                Sampai baris
                                <Input
                                    type="number"
                                    min={1}
                                    max={payrollImport.total_rows}
                                    value={bulkTo}
                                    onChange={(event) =>
                                        setBulkTo(Number(event.target.value))
                                    }
                                />
                            </label>
                            <div className="flex items-end">
                                <button
                                    type="button"
                                    onClick={sendBulk}
                                    disabled={sending}
                                    className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:opacity-50"
                                >
                                    <Send className="size-4" />{' '}
                                    {sending
                                        ? 'Mengirim...'
                                        : 'Kirim slip gaji'}
                                </button>
                            </div>
                        </div>
                        <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-5 lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex items-center gap-2 text-xs text-slate-600">
                                <span
                                    className={`size-2.5 rounded-full ${pendingJobsCount > 0 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                                />
                                <span className="font-semibold text-slate-900">
                                    {pendingJobsCount} Antrean Email (Pending)
                                </span>
                                <span>· Pengiriman Tanpa CLI Terminal</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {pendingJobsCount > 0 && (
                                    <button
                                        type="button"
                                        onClick={cancelQueue}
                                        disabled={cancelingQueue}
                                        className="inline-flex items-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-xs font-semibold text-rose-700"
                                    >
                                        <Ban className="size-3.5" />{' '}
                                        {cancelingQueue
                                            ? 'Membatalkan...'
                                            : `Batalkan Antrean (${pendingJobsCount})`}
                                    </button>
                                )}
                                <button
                                    type="button"
                                    onClick={processQueue}
                                    disabled={processingQueue}
                                    className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white"
                                >
                                    <Play className="size-3.5 fill-emerald-400 text-emerald-400" />{' '}
                                    {processingQueue
                                        ? 'Memproses...'
                                        : 'Jalankan Queue Worker'}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
                        <p className="text-xs font-medium tracking-[0.18em] text-slate-500 uppercase">
                            Ringkasan
                        </p>
                        <div className="mt-4 space-y-4">
                            <div>
                                <p className="text-sm text-slate-500">
                                    Total karyawan
                                </p>
                                <p className="text-2xl font-semibold text-slate-900">
                                    {employees.length}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">
                                    Sudah terkirim
                                </p>
                                <p className="text-2xl font-semibold text-emerald-700">
                                    {
                                        employees.filter(
                                            (employee) => employee.email_sent,
                                        ).length
                                    }
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">
                                    Tanpa email
                                </p>
                                <p className="text-2xl font-semibold text-rose-600">
                                    {
                                        employees.filter(
                                            (employee) => !employee.email,
                                        ).length
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto rounded-3xl border border-emerald-100 bg-white shadow-sm">
                    <div className="border-b border-slate-100 px-6 py-5">
                        <h2 className="text-lg font-semibold text-slate-900">
                            Daftar karyawan
                        </h2>
                        <p className="text-sm text-slate-500">
                            Detail slip dan status pengiriman per karyawan.
                        </p>
                    </div>
                    <table className="min-w-full text-sm">
                        <thead className="bg-slate-50 text-xs tracking-wide text-slate-500 uppercase">
                            <tr>
                                {[
                                    '#',
                                    'NIP',
                                    'Nama',
                                    'Departemen',
                                    'Gaji Pokok',
                                    'Total Gaji',
                                    'Email',
                                    'Status',
                                    'Aksi',
                                ].map((heading) => (
                                    <th
                                        key={heading}
                                        className="px-4 py-3 text-left font-medium"
                                    >
                                        {heading}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {employees.length === 0 ? (
                                <EmptyState
                                    colSpan={9}
                                    title="Belum ada karyawan"
                                    description="Batch ini belum memiliki data karyawan."
                                />
                            ) : (
                                employees.map((employee) => (
                                    <tr
                                        key={employee.id}
                                        className="hover:bg-emerald-50/40"
                                    >
                                        <td className="px-4 py-4 text-slate-500">
                                            {employee.row_number}
                                        </td>
                                        <td className="px-4 py-4">
                                            {employee.nip || '-'}
                                        </td>
                                        <td className="px-4 py-4 font-medium">
                                            {employee.nama || '-'}
                                        </td>
                                        <td className="px-4 py-4">
                                            {employee.departemen || '-'}
                                        </td>
                                        <td className="px-4 py-4">
                                            {money(employee.gaji_pokok)}
                                        </td>
                                        <td className="px-4 py-4">
                                            {money(employee.total_gaji)}
                                        </td>
                                        <td className="px-4 py-4">
                                            {employee.email || '-'}
                                        </td>
                                        <td className="px-4 py-4">
                                            {employee.email_sent ? (
                                                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                                                    <MailCheck className="size-3.5" />{' '}
                                                    Terkirim
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-500">
                                                    <Mail className="size-3.5" />{' '}
                                                    Pending
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        sendOne(employee)
                                                    }
                                                    disabled={sendingEmployeeIds.has(
                                                        employee.id,
                                                    )}
                                                    className="text-emerald-700 disabled:cursor-wait disabled:opacity-50"
                                                    title={
                                                        sendingEmployeeIds.has(
                                                            employee.id,
                                                        )
                                                            ? 'Sedang mengirim...'
                                                            : employee.email_sent
                                                              ? 'Kirim ulang slip gaji'
                                                              : 'Kirim slip gaji'
                                                    }
                                                >
                                                    {employee.email_sent ? (
                                                        <MailCheck className="size-4" />
                                                    ) : (
                                                        <Mail className="size-4" />
                                                    )}
                                                </button>
                                                <a
                                                    href={payrollPdf.url(
                                                        employee.id,
                                                    )}
                                                    className="text-slate-600"
                                                    title="Unduh PDF"
                                                >
                                                    <Download className="size-4" />
                                                </a>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        openEdit(employee)
                                                    }
                                                    className="text-sky-700"
                                                    title="Edit"
                                                >
                                                    <Pencil className="size-4" />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeEmployee(employee)
                                                    }
                                                    className="text-rose-600"
                                                    title="Hapus"
                                                >
                                                    <Trash2 className="size-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {editing && (
                <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/40 p-4">
                    <form
                        onSubmit={saveEdit}
                        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs tracking-[0.2em] text-emerald-600 uppercase">
                                    Edit data payroll
                                </p>
                                <h2 className="mt-1 text-xl font-semibold">
                                    Edit karyawan
                                </h2>
                            </div>
                            <button
                                type="button"
                                onClick={closeEdit}
                                className="text-slate-500"
                            >
                                <X className="size-5" />
                            </button>
                        </div>
                        <div className="mt-6 grid gap-4 sm:grid-cols-2">
                            {textFields.map(([field, label]) => (
                                <label
                                    key={field}
                                    className="space-y-2 text-sm font-medium capitalize"
                                >
                                    {label}
                                    <Input
                                        value={data[field]}
                                        onChange={(event) =>
                                            setData(field, event.target.value)
                                        }
                                    />
                                    {errors[field] && (
                                        <span className="text-xs text-rose-600">
                                            {errors[field]}
                                        </span>
                                    )}
                                </label>
                            ))}
                            {numberFields.map(([field, label]) => (
                                <label
                                    key={field}
                                    className="space-y-2 text-sm font-medium"
                                >
                                    {label}
                                    <Input
                                        type="number"
                                        min="0"
                                        step={
                                            [
                                                'hadir',
                                                'cuti',
                                                'sakit',
                                                'izin',
                                                'alfa',
                                                'tidak_hadir',
                                                'terlambat_menit',
                                                'koperasi_ke',
                                                'uth_2_jam',
                                                'uth_4_jam',
                                            ].includes(field)
                                                ? '1'
                                                : '0.01'
                                        }
                                        value={data[field]}
                                        onChange={(event) =>
                                            setData(
                                                field,
                                                Number(event.target.value),
                                            )
                                        }
                                    />
                                    {errors[field] && (
                                        <span className="text-xs text-rose-600">
                                            {errors[field]}
                                        </span>
                                    )}
                                </label>
                            ))}
                        </div>
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={closeEdit}
                                className="rounded-xl border px-4 py-2 text-sm"
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white"
                            >
                                {processing
                                    ? 'Menyimpan...'
                                    : 'Simpan perubahan'}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
