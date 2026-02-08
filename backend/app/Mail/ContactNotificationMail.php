<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ContactNotificationMail extends Mailable
{
    use Queueable, SerializesModels;

    public array $data;

    public function __construct(array $data)
    {
        $this->data = $data;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'New Contact Form Submission - ' . config('app.name'),
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.contact.notification',
            with: [
                'name' => $this->data['name'],
                'phone' => $this->data['phone'],
'company' => $this->data['company'],
                'email' => $this->data['email'],
                'userMessage' => $this->data['message'],
                'submittedAt' => now()->format('F j, Y \a\t g:i A'),
                'timezone' => config('app.timezone'),
            ],
        );
    }
}