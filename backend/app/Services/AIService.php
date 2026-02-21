<?php

namespace App\Services;

use Exception;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class AIService
{
    /**
     * The configured AI providers in order of fallback priority.
     */
    protected array $providers = [];

    public function __construct()
    {
        // Define providers here. Groq is preferred as primary due to speed.
        // Gemini serves as an excellent fallback.
        $this->providers = [
            [
                'name' => 'groq',
                'api_key' => env('GROQ_API_KEY'),
                'url' => 'https://api.groq.com/openai/v1/chat/completions',
                'model' => 'llama-3.3-70b-versatile',
            ],
            [
                'name' => 'gemini',
                'api_key' => env('GEMINI_API_KEY'),
                'url' => 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:streamGenerateContent',
                'model' => 'gemini-2.0-flash',
            ]
        ];
    }

    /**
     * Process the chat messages with automatic fallback
     * 
     * @param array $messages Standardized OpenAI format message array
     * @return \Illuminate\Http\Client\Response
     * @throws Exception
     */
    public function generateStreamedResponse(array $messages, callable $onChunk)
    {
        $lastException = null;

        foreach ($this->providers as $provider) {
            // Skip unconfigured providers
            if (empty($provider['api_key'])) {
                Log::info("Skipping provider {$provider['name']} as API key is not configured.");
                continue;
            }

            try {
                Log::info("Attempting inference with provider: {$provider['name']}");
                
                // Attempt to get a streamed response from the current provider
                return $this->callProvider($provider, $messages, $onChunk);

            } catch (Exception $e) {
                $lastException = $e;
                Log::warning("Provider {$provider['name']} failed.", [
                    'error' => $e->getMessage(),
                    'code' => $e->getCode()
                ]);

                // Determine if this is a quota/rate-limit error (429) or Server error (5xx)
                // If it is, continue to the next fallback provider.
                // Otherwise (e.g., bad request format), throw immediately.
                if ($this->shouldFallback($e->getCode())) {
                    Log::info("Failing over to next available provider.");
                    continue; 
                }

                // Normal unrecoverable error
                throw $e;
            }
        }

        // If we get here, all configured providers failed or were skipped
        throw new Exception("All AI providers exhausted or failed. Last error: " . ($lastException ? $lastException->getMessage() : 'No configured API keys found.'));
    }

    /**
     * Executes the HTTP request and handles streaming parsing
     */
    protected function callProvider(array $provider, array $messages, callable $onChunk)
    {
        // 1. Format payload according to the specific provider
        $payload = $this->formatPayload($provider, $messages);
        
        // 2. Setup Guzzle request with streaming
        $headers = [
            'Content-Type' => 'application/json',
            'Accept' => 'text/event-stream'
        ];

        // Specific Auth Handling
        if ($provider['name'] === 'groq') {
            $headers['Authorization'] = 'Bearer ' . $provider['api_key'];
            $url = $provider['url'];
        } else if ($provider['name'] === 'gemini') {
            $url = $provider['url'] . '?key=' . $provider['api_key'] . '&alt=sse';
        }

        // We use the HTTP facade's withOptions to stream
        $response = Http::withHeaders($headers)
            ->withOptions([
                'stream' => true,
            ])
            ->timeout(30)
            ->post($url, $payload);

        if ($response->failed()) {
            throw new Exception("API Request Failed: " . $response->body(), $response->status());
        }

        // Read the stream
        $stream = $response->toPsrResponse()->getBody();

        while (!$stream->eof()) {
            // Parse Server-Sent Events line by line
            $line = $this->readLine($stream);
            
            if (empty(trim($line))) continue;
            
            if (strpos($line, 'data: ') === 0) {
                $data = substr($line, 6); // Remove 'data: ' prefix
                
                if (trim($data) === '[DONE]') {
                    break;
                }

                $parsedChunk = $this->parseChunk($provider['name'], $data);
                if ($parsedChunk !== null) {
                    $onChunk($parsedChunk);
                }
            }
        }
        
        return true;
    }

    /**
     * Formats the standardized `messages` array into provider-specific schemas
     */
    protected function formatPayload(array $provider, array $messages)
    {
        $systemPrompt = "Your name is Mr.360. You are the official conversational assistant for Astra 360, a Premium Digital Marketing & IT Solutions Agency. You answer questions about our web development, SEO, app development, and digital marketing services. CRITICAL RULES: 1. Keep all responses extremely concise (maximum 3 to 4 sentences). 2. Be professional and persuasive. 3. Never say you are an AI, act as a member of the Astra 360 team. 4. If the user asks for contact details, or asks to call, explicitly provide our email (info@360astra.io) and direct phone number (+91 9345280327), and tell them we are available to talk!";

        if ($provider['name'] === 'groq') {
            $hasSystem = false;
            foreach ($messages as $msg) {
                if ($msg['role'] === 'system') {
                    $hasSystem = true;
                    break;
                }
            }
            if (!$hasSystem) {
                array_unshift($messages, ['role' => 'system', 'content' => $systemPrompt]);
            }

            return [
                'model' => $provider['model'],
                'messages' => $messages,
                'stream' => true,
                'temperature' => 0.7,
                'max_tokens' => 1024
            ];
        } 
        
        if ($provider['name'] === 'gemini') {
            $geminiContents = [];
            foreach ($messages as $msg) {
                // Gemini format mapping
                $role = $msg['role'] === 'user' ? 'user' : 'model';
                // system prompts need separate handling in gemini usually, but for simple chatbots we can append to first user message if needed.
                if ($msg['role'] === 'system') continue; 
                
                $geminiContents[] = [
                    'role' => $role,
                    'parts' => [['text' => $msg['content']]]
                ];
            }
            
            return [
                'contents' => $geminiContents,
                'systemInstruction' => [
                    'parts' => [
                        ['text' => $systemPrompt]
                    ]
                ]
            ];
        }
        
        throw new Exception("Unsupported provider for formatting.");
    }

    /**
     * Parses the streaming delta text chunks based on the provider schema
     */
    protected function parseChunk(string $providerName, string $data): ?string
    {
        $json = json_decode($data, true);
        if (!$json) return null;

        if ($providerName === 'groq' && isset($json['choices'][0]['delta']['content'])) {
            return $json['choices'][0]['delta']['content'];
        } 
        
        if ($providerName === 'gemini') {
            // Gemini SSE streaming format
            if (isset($json['candidates'][0]['content']['parts'][0]['text'])) {
                return $json['candidates'][0]['content']['parts'][0]['text'];
            }
            // some chunks might just be status updates or empty parts.
            return null;
        }

        return null;
    }

    /**
     * Determines if the HTTP status code signals rate-limiting or quota exhaustion (429) 
     * or a generic Server error (5xx) that warrants falling back to secondary providers
     */
    protected function shouldFallback(int $statusCode): bool
    {
        return $statusCode === 429 || $statusCode === 401 || $statusCode === 403 || $statusCode >= 500;
    }
    
    /**
     * Helper to read a line from a PSR-7 stream safely
     */
    protected function readLine($stream) {
        $buffer = '';
        while (!$stream->eof()) {
            $char = $stream->read(1);
            if ($char === "\n") {
                return $buffer;
            }
            $buffer .= $char;
        }
        return $buffer;
    }
}
