<?php

return [
    'paths' => ['*'],  
    
    'allowed_methods' => ['*'],
    
    'allowed_origins' => [
        'http://localhost:8081',
        'http://127.0.0.1:8080',
        'http://127.0.0.1:8081',
        'https://360astra.io',
        'https://www.360astra.io',
        'https://api.360astra.io/api',
        'https://api.360astra.io',
        env('FRONTEND_URL', 'http://localhost:8080')
    ],
    
    'allowed_origins_patterns' => [],
    
    'allowed_headers' => ['*'],
    
    'exposed_headers' => [],
    
    'max_age' => 0,
    
    'supports_credentials' => false,
];