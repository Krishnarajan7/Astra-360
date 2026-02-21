<?php

namespace App\Http\Controllers;

use App\Models\ChatSession;
use App\Models\ChatMessage;
use App\Services\AIService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ChatbotController extends Controller
{
    protected AIService $aiService;

    public function __construct(AIService $aiService)
    {
        $this->aiService = $aiService;
    }

    /**
     * Handle the incoming chat message and return a streamed response.
     * Optionally logs history and captures leads if session_id is provided.
     */
    public function sendMessage(Request $request)
    {
        $request->validate([
            'messages'        => 'required|array',
            'messages.*.role'    => 'required|in:user,assistant,system',
            'messages.*.content' => 'required|string',
            'session_id'      => 'nullable|string|max:64',
            'user_name'       => 'nullable|string|max:255',
            'user_phone'      => 'nullable|string|max:30',
        ]);

        $messages   = $request->input('messages');
        $sessionId  = $request->input('session_id');
        $userName   = $request->input('user_name');
        $userPhone  = $request->input('user_phone');

        // --- Persist chat session and log messages (only if cookies accepted) ---
        $chatSession = null;
        if ($sessionId) {
            // Find or create the session record
            $chatSession = ChatSession::firstOrCreate(
                ['session_id' => $sessionId],
                ['session_id' => $sessionId]
            );

            // Update lead info if the frontend has parsed name/phone from conversation
            $updateData = [];
            if ($userName && !$chatSession->user_name) {
                $updateData['user_name'] = $userName;
            }
            if ($userPhone && !$chatSession->user_phone) {
                $updateData['user_phone'] = $userPhone;
            }
            if (!empty($updateData)) {
                $chatSession->update($updateData);
            }

            // Log the latest user message (last message in the array)
            $lastMessage = end($messages);
            if ($lastMessage && $lastMessage['role'] === 'user') {
                ChatMessage::create([
                    'chat_session_id' => $chatSession->id,
                    'role'            => 'user',
                    'content'         => $lastMessage['content'],
                ]);
            }
        }

        // --- Stream the AI response back ---
        return new StreamedResponse(function () use ($messages, $chatSession) {

            if (ob_get_level() > 0) {
                for ($i = 0; $i < ob_get_level(); $i++) {
                    ob_end_flush();
                }
            }

            $fullResponse = '';

            try {
                $this->aiService->generateStreamedResponse($messages, function ($chunk) use (&$fullResponse) {
                    $fullResponse .= $chunk;
                    echo "data: " . json_encode(['text' => $chunk]) . "\n\n";
                    flush();
                });

                // Log the AI's full response to the chat history
                if ($chatSession && !empty($fullResponse)) {
                    ChatMessage::create([
                        'chat_session_id' => $chatSession->id,
                        'role'            => 'assistant',
                        'content'         => $fullResponse,
                    ]);
                }

                echo "data: [DONE]\n\n";
                flush();

            } catch (\Exception $e) {
                Log::error('Chatbot API Error: ' . $e->getMessage());
                echo "data: " . json_encode(['error' => 'An error occurred while communicating with the AI.']) . "\n\n";
                flush();
            }

        }, 200, [
            'Content-Type'    => 'text/event-stream',
            'Cache-Control'   => 'no-cache',
            'Connection'      => 'keep-alive',
            'X-Accel-Buffering' => 'no',
        ]);
    }
}
