<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ContactController;

// Contact Form API Routes
Route::prefix('contact')->group(function () {
    Route::post('/submit', [ContactController::class, 'submit']);
});

// Optional: Get contact form status
Route::get('/contact/status', [ContactController::class, 'status']);