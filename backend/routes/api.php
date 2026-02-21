<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ContactController;

// Contact Form API Routes
Route::prefix('contact')->group(function () {
    Route::post('/submit', [ContactController::class, 'submit']);
});

// Optional: Get contact form status
Route::get('/contact/status', [ContactController::class, 'status']);
// Chatbot API Routes
Route::post('/chatbot/message', [App\Http\Controllers\ChatbotController::class, 'sendMessage']);

// Feedback API Routes
Route::post('/feedback/submit', [App\Http\Controllers\FeedbackController::class, 'store']);
