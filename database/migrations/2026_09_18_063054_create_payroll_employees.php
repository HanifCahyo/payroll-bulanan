<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('payroll_employees', function (Blueprint $table) {
            $table->id();
            $table->foreignId('payroll_import_id')->constrained()->cascadeOnDelete();
            $table->integer('row_number');
            $table->string('nip')->nullable();
            $table->string('rekening')->nullable();
            $table->string('nama')->nullable();
            $table->string('jabatan')->nullable();
            $table->string('departemen')->nullable();
            $table->string('golongan')->nullable();
            $table->string('email')->nullable();

            // KEHADIRAN
            $table->integer('hadir')->default(0);
            $table->integer('cuti')->default(0);
            $table->integer('sakit')->default(0);
            $table->integer('izin')->default(0);
            $table->integer('alfa')->default(0);
            $table->integer('tidak_hadir')->default(0);
            $table->integer('terlambat_menit')->default(0);

            // GAJI
            $table->decimal('gaji_pokok', 15, 2)->default(0);
            $table->decimal('tunjangan_jabatan', 15, 2)->default(0);
            $table->decimal('tunjangan_profesi', 15, 2)->default(0);
            $table->decimal('tunjangan_kinerja', 15, 2)->default(0);


            // CUTI
            $table->decimal('premi_cuti', 15, 2)->default(0);

            // TAMBAHAN
            $table->decimal('luar_kota', 15, 2)->default(0);
            $table->decimal('tambahan', 15, 2)->default(0);

            // POTONGAN
            $table->decimal('kesehatan', 15, 2)->default(0);
            $table->decimal('tanpa_izin', 15, 2)->default(0);
            $table->decimal('terlambat_potongan', 15, 2)->default(0);
            $table->decimal('simpanan_wajib', 15, 2)->default(0);
            $table->decimal('koperasi', 15, 2)->default(0);
            $table->integer('koperasi_ke')->nullable();
            $table->decimal('bpjs', 15, 2)->default(0);
            $table->decimal('bon', 15, 2)->default(0);

            // Jumlah
            $table->decimal('jumlah_gaji', 15, 2)->default(0);
            $table->decimal('total_gaji', 15, 2)->default(0);


            // // UPAH
            $table->decimal('lembur_biasa', 15, 2)->default(0);
            $table->integer('uth_2_jam')->default(0);
            $table->integer('uth_4_jam')->default(0);
            $table->decimal('lembur_libur', 15, 2)->default(0);

            // JLM IURAN
            $table->decimal('jumlah_iuran', 15, 2)->default(0);
            $table->decimal('ksi', 15, 2)->default(0);
            $table->decimal('tk', 15, 2)->default(0);


            $table->boolean('email_sent')->default(false);
            $table->timestamp('email_sent_at')->nullable();
            $table->string('pdf_path')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payroll_employees');
    }
};
