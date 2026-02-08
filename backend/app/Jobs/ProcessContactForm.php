<?php

namespace App\Jobs;

use App\Mail\ContactConfirmationMail;
use App\Mail\ContactNotificationMail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ProcessContactForm implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public array $data;
    public int $tries = 3; // Number of retry attempts
    public int $maxExceptions = 3; // Max exceptions before failing
    public int $timeout = 60; // Timeout in seconds

    public function __construct(array $data)
    {
        $this->data = [
    'name'    => $data['name'],
    'email'   => $data['email'],
    'message' => $data['message'],

    'phone'   => !empty($data['phone']) ? $data['phone'] : null,
    'company' => !empty($data['company']) ? $data['company'] : null,
];

    }

    public function handle(): void
    {
        try {
            // Send confirmation email to user
            Mail::to($this->data['email'])
                ->send(new ContactConfirmationMail($this->data));
            
            Log::info('Confirmation email sent to: ' . $this->data['email']);
            
            // Send notification email to admin
            if (config('mail.admin.address')) {
                Mail::to(config('mail.admin.address'))
                    ->send(new ContactNotificationMail($this->data));
                
                Log::info('Notification email sent to admin');
            } else {
                Log::warning('Admin email not configured in mail.admin.address');
            }
            
        } catch (\Exception $e) {
            Log::error('Failed to send contact form emails: ' . $e->getMessage());
            throw $e; // Re-throw for queue retry
        }
    }

    // Optional: Handle job failure
    public function failed(\Throwable $exception): void
    {
        Log::error('ProcessContactForm job failed after all retries: ' . $exception->getMessage());
        
        // You could send an alert to admin here
        // Mail::to(config('mail.admin.address'))
        //     ->send(new JobFailedMail($exception->getMessage()));
    }
}