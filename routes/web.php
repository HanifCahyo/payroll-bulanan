<?php

use App\Http\Controllers\MailConfigController;
use App\Http\Controllers\PayrollController;
use App\Http\Controllers\PayrollEmailController;
use App\Http\Controllers\ProfileController;
use App\Models\MailConfiguration;
use App\Models\PayrollEmployee;
use App\Models\PayrollImport;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
        'stats' => [
            'imports' => PayrollImport::where('type', 'salary')->count(),
            'employees' => PayrollEmployee::count(),
            'mailConfigs' => MailConfiguration::count(),
            'activeMailConfigs' => MailConfiguration::where('is_active', true)->count(),
        ],
        'recentImports' => PayrollImport::where('type', 'salary')->latest()->withCount('employees')->limit(5)->get(),
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::prefix('payroll')->name('payroll.')->group(function () {
        Route::get('/upload', [PayrollController::class, 'form'])->name('upload.form');
        Route::post('/upload', [PayrollController::class, 'upload'])->name('upload');
        Route::get('/', [PayrollController::class, 'index'])->name('index');
        Route::get('/{import}', [PayrollController::class, 'detail'])->name('detail');
        Route::get('/employee/{employee}/pdf', [PayrollController::class, 'exportPdf'])->name('pdf');
        Route::post('/employee/{employee}/email', [PayrollEmailController::class, 'sendOne'])->name('email.one');
        Route::post('/{import}/email', [PayrollEmailController::class, 'sendBulk'])->name('email.bulk');
        Route::delete('/{import}', [PayrollController::class, 'destroy'])->name('destroy');
        Route::put('/employee/{employee}', [PayrollController::class, 'updateEmployee'])->name('employee.update');
        Route::delete('/employee/{employee}', [PayrollController::class, 'destroyEmployee'])->name('employee.destroy');
        Route::post('/process-queue', [PayrollController::class, 'processQueue'])->name('process-queue');
        Route::post('/cancel-queue', [PayrollController::class, 'cancelQueue'])->name('cancel-queue');
    });

    Route::prefix('mail-config')->name('mail-config.')->group(function () {
        Route::get('/', [MailConfigController::class, 'index'])->name('index');
        Route::post('/', [MailConfigController::class, 'store'])->name('store');
        Route::put('/{mailConfiguration}', [MailConfigController::class, 'update'])->name('update');
        Route::delete('/{mailConfiguration}', [MailConfigController::class, 'destroy'])->name('destroy');
        Route::patch('/{mailConfiguration}/activate', [MailConfigController::class, 'setActive'])->name('activate');
        Route::post('/{mailConfiguration}/test', [MailConfigController::class, 'testSend'])->name('test');
    });

});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::put('/password', [ProfileController::class, 'updatePassword'])->name('password.update');
});

require __DIR__.'/auth.php';
