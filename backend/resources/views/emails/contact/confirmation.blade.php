<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ config('app.name') }} - Message Received</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            border-bottom: 1px solid #eaeaea;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .logo {
            font-size: 24px;
            font-weight: 600;
            color: #111;
            text-decoration: none;
        }
        .content {
            padding: 20px 0;
        }
        .message-box {
            background: #f8f9fa;
            border-left: 4px solid #007bff;
            padding: 15px;
            margin: 20px 0;
            font-style: italic;
        }
        .signature {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #eaeaea;
            color: #666;
        }
        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #eaeaea;
            font-size: 12px;
            color: #999;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">{{ config('app.name') }}</div>
    </div>

    <div class="content">
        <h2>Message Received</h2>
        
        <p>Dear {{ $name }},</p>
        
        <p>Thank you for reaching out to {{ $company }}.</p>
        
        <p>We have received your message and can confirm it has been delivered to our team.</p>
        
        <p>A member of our team will review your inquiry and respond within {{ $hours }} hours during our business days.</p>
        
        <p>We appreciate your interest in our work and look forward to connecting with you.</p>
    </div>

    <div class="signature">
        <p>Warm regards,<br>
        The Team at {{ $company }}</p>
    </div>

    <div class="footer">
        <p>© {{ date('Y') }} {{ config('app.name') }}. All rights reserved.</p>
        <p>This is an automated message. You are receiving this email because you submitted a contact form on our website.</p>
    </div>
</body>
</html>