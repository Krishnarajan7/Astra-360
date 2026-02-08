<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>New Contact Form Submission</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 30px;
            border-left: 4px solid #28a745;
        }
        .alert {
            color: #155724;
            background-color: #d4edda;
            border: 1px solid #c3e6cb;
            padding: 12px 16px;
            border-radius: 4px;
            margin: 20px 0;
        }
        .submission-details {
            background: white;
            border: 1px solid #eaeaea;
            border-radius: 8px;
            padding: 25px;
            margin: 20px 0;
        }
        .detail-row {
            padding: 10px 0;
            border-bottom: 1px solid #f5f5f5;
        }
        .detail-label {
            font-weight: 600;
            color: #555;
            min-width: 100px;
            display: inline-block;
        }
        .message-content {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 6px;
            margin-top: 15px;
            white-space: pre-wrap;
            font-family: monospace;
            font-size: 14px;
            line-height: 1.5;
        }
        .actions {
            margin-top: 30px;
            padding: 20px;
            background: #f0f7ff;
            border-radius: 8px;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            background: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            font-weight: 500;
        }
    </style>
</head>
<body>
    <div class="header">
        <h2 style="margin: 0; color: #28a745;">New Contact Form Submission</h2>
        <p style="margin: 5px 0 0 0; color: #666;">Submitted on {{ $submittedAt }} ({{ $timezone }})</p>
    </div>

    <div class="alert">
        <strong>Action Required:</strong> A new message has been submitted through the contact form.
    </div>

    <div class="submission-details">
        <h3 style="margin-top: 0;">Contact Details</h3>
        
        <div class="detail-row">
            <span class="detail-label">Name:</span>
            <strong>{{ $name }}</strong>
        </div>
        <div class="detail-row">
            <span class="detail-label">Company:</span>
            <strong>{{ $company }}</strong>
        </div>
        <div class="detail-row">
            <span class="detail-label">Phone:</span>
            <strong>{{ $phone }}</strong>
        </div>
        <div class="detail-row">
            <span class="detail-label">Email:</span>
            <a href="mailto:{{ $email }}" style="color: #007bff;">{{ $email }}</a>
        </div>
        
        <div class="detail-row" style="border-bottom: none;">
            <span class="detail-label">Submitted:</span>
            {{ $submittedAt }}
        </div>
    </div>

    <div class="submission-details">
        <h3 style="margin-top: 0;">Message Content</h3>
        <div class="message-content">{{ $userMessage }}</div>


    </div>

    <div class="actions">
        <h4 style="margin-top: 0;">Quick Actions</h4>
        <p>
            <a href="mailto:{{ $email }}?subject=Re: Your inquiry to {{ config('app.name') }}" class="button">
                Reply to {{ $name }}
            </a>
        </p>
        <p style="color: #666; font-size: 14px; margin-top: 10px;">
            This email was generated automatically from the contact form on {{ config('app.name') }}.
        </p>
    </div>
</body>
</html>