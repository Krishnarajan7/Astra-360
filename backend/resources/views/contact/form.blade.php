<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Us - {{ config('app.name') }}</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50">
    <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
            <div class="text-center">
                <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
                    Contact Us
                </h2>
                <p class="mt-2 text-sm text-gray-600">
                    We'll respond within 24-48 hours
                </p>
            </div>
            
            <form id="contactForm" class="mt-8 space-y-6">
                @csrf
                
                <div class="space-y-4">
                    <div>
                        <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                        </label>
                        <input id="name" name="name" type="text" required
                            class="appearance-none relative block w-full px-3 py-2.5 border border-gray-300 
                                   placeholder-gray-500 text-gray-900 rounded-md focus:outline-none 
                                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="John Smith">
                        <p id="name-error" class="mt-1 text-sm text-red-600 hidden"></p>
                    </div>

                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input id="email" name="email" type="email" required
                            class="appearance-none relative block w-full px-3 py-2.5 border border-gray-300 
                                   placeholder-gray-500 text-gray-900 rounded-md focus:outline-none 
                                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="you@example.com">
                        <p id="email-error" class="mt-1 text-sm text-red-600 hidden"></p>
                    </div>

                    <div>
                        <label for="message" class="block text-sm font-medium text-gray-700 mb-1">
                            Your Message
                        </label>
                        <textarea id="message" name="message" rows="4" required
                            class="appearance-none relative block w-full px-3 py-2.5 border border-gray-300 
                                   placeholder-gray-500 text-gray-900 rounded-md focus:outline-none 
                                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="How can we help you?"></textarea>
                        <p id="message-error" class="mt-1 text-sm text-red-600 hidden"></p>
                    </div>
                </div>

                <div id="success-message" class="hidden p-4 rounded-md bg-green-50">
                    <div class="flex">
                        <div class="flex-shrink-0">
                            <svg class="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                            </svg>
                        </div>
                        <div class="ml-3">
                            <p id="success-text" class="text-sm font-medium text-green-800"></p>
                        </div>
                    </div>
                </div>

                <div id="error-message" class="hidden p-4 rounded-md bg-red-50">
                    <div class="flex">
                        <div class="flex-shrink-0">
                            <svg class="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                            </svg>
                        </div>
                        <div class="ml-3">
                            <p id="error-text" class="text-sm font-medium text-red-800"></p>
                        </div>
                    </div>
                </div>

                <div>
                    <button type="submit"
                        id="submit-btn"
                        class="group relative w-full flex justify-center py-2.5 px-4 border border-transparent 
                               text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 
                               focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
                               transition-colors duration-200">
                        <span id="btn-text">Send Message</span>
                        <span id="btn-spinner" class="hidden ml-2">
                            <svg class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </span>
                    </button>
                </div>
            </form>
        </div>
    </div>

    <script>
        document.getElementById('contactForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Reset states
            document.getElementById('success-message').classList.add('hidden');
            document.getElementById('error-message').classList.add('hidden');
            document.querySelectorAll('[id$="-error"]').forEach(el => {
                el.classList.add('hidden');
                el.textContent = '';
            });
            
            // Show loading
            const btn = document.getElementById('submit-btn');
            const btnText = document.getElementById('btn-text');
            const spinner = document.getElementById('btn-spinner');
            btn.disabled = true;
            btnText.textContent = 'Sending...';
            spinner.classList.remove('hidden');
            
            try {
                const formData = new FormData(e.target);
                const response = await fetch('{{ route("contact.submit") }}', {
                    method: 'POST',
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
                        'X-CSRF-TOKEN': '{{ csrf_token() }}'
                    },
                    body: formData
                });
                
                const data = await response.json();
                
                if (data.success) {
                    // Show success message
                    document.getElementById('success-text').textContent = data.message;
                    document.getElementById('success-message').classList.remove('hidden');
                    
                    // Reset form
                    e.target.reset();
                    
                    // Auto-hide success message after 5 seconds
                    setTimeout(() => {
                        document.getElementById('success-message').classList.add('hidden');
                    }, 5000);
                } else {
                    // Show server-side validation errors
                    if (data.errors) {
                        Object.keys(data.errors).forEach(field => {
                            const errorEl = document.getElementById(`${field}-error`);
                            if (errorEl) {
                                errorEl.textContent = data.errors[field][0];
                                errorEl.classList.remove('hidden');
                            }
                        });
                    } else {
                        // Show generic error
                        document.getElementById('error-text').textContent = data.message;
                        document.getElementById('error-message').classList.remove('hidden');
                    }
                }
            } catch (error) {
                document.getElementById('error-text').textContent = 'Network error. Please try again.';
                document.getElementById('error-message').classList.remove('hidden');
            } finally {
                // Reset button
                btn.disabled = false;
                btnText.textContent = 'Send Message';
                spinner.classList.add('hidden');
            }
        });
    </script>
</body>
</html>