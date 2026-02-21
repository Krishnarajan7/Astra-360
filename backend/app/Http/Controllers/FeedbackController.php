<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class FeedbackController extends Controller
{
    /**
     * Store a newly created feedback in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'rating'   => 'required|integer|min:1|max:5',
            'category' => 'required|string|in:design,usability,content',
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|max:255',
            'company'  => 'required|string|max:255',
            'role'     => 'required|string|max:255',
            'feedback' => 'required|string|max:5000',
        ]);

        try {
            $feedback = Feedback::create($validated);

            return response()->json([
                'success' => true,
                'message' => 'Feedback submitted successfully! 🎉',
                'data'    => $feedback
            ], 201);

        } catch (\Exception $e) {
            Log::error('Feedback Submission Error: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while submitting your feedback. Please try again later.'
            ], 500);
        }
    }
}
