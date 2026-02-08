<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ContactFormRequest;
use App\Jobs\ProcessContactForm;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactConfirmationMail;
use App\Mail\ContactNotificationMail;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class ContactController extends Controller
{
    public function show()
    {
        return view('contact.form');
    }

    public function submit(ContactFormRequest $request)
{
    $validated = $request->validated();

    try {
        ProcessContactForm::dispatch($validated);
    } catch (\Throwable $e) {
        Log::error('Queue failed, sending emails synchronously', [
            'error' => $e->getMessage()
        ]);

        // Fallback: send immediately
        Mail::to($validated['email'])
            ->send(new ContactConfirmationMail($validated));

        Mail::to(config('mail.admin.address'))
            ->send(new ContactNotificationMail($validated));
    }

    return response()->json([
        'success' => true,
        'message' => 'Your message has been received. We\'ll be in touch shortly.'
    ]);
}
    public function status(): JsonResponse
    {
        return response()->json([
            'status' => 'operational',
            'service' => 'Contact Form API',
            'version' => '1.0',
            'timestamp' => now()->toIso8601String(),
        ]);
    }

}