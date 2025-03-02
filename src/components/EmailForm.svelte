<!-- EmailForm.svelte -->
<script>
    import { onMount, onDestroy } from 'svelte';

    // Your Google Apps Script web app URL
    const scriptURL = 'https://script.google.com/macros/s/AKfycbx3Ydm7ATA94RtYPC3tZ_JFN3272J0stAD7IAgoCrcI5LrYqUUWNbbPPjcL5Ud-1wJS/exec';

    let email = '';
    let formState = 'idle'; // idle, submitting, success, duplicate, error
    let errorMessage = '';
    let formElement;
    let successTimeout;

    // Email validation
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    async function handleSubmit() {
        if (!email) {
            errorMessage = 'Please enter an email address';
            formState = 'error';
            return;
        }

        if (!isValidEmail(email)) {
            errorMessage = 'Please enter a valid email address';
            formState = 'error';
            return;
        }

        formState = 'submitting';
        errorMessage = '';

        try {
            const response = await fetch(scriptURL, {
                method: 'POST',
                mode: 'no-cors', // This is important for CORS issues
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    timestamp: new Date().toISOString()
                }),
            });

            // Since we're using no-cors, we can't check the response status
            // so we'll just assume success if there's no error

            // Clear any existing timeouts
            if (successTimeout) clearTimeout(successTimeout);

            // Set form state to success or duplicate
            // Note: Since we're using no-cors, we actually can't distinguish
            // between success and duplicate response from server
            formState = 'success';

            // Clear form
            email = '';

            // Reset form state after 5 seconds
            successTimeout = setTimeout(() => {
                formState = 'idle';
            }, 5000);

        } catch (err) {
            console.error('Error submitting form:', err);
            errorMessage = 'Failed to submit. Please try again later.';
            formState = 'error';
        }
    }

    // Clean up any timeouts when component is destroyed
    onDestroy(() => {
        if (successTimeout) clearTimeout(successTimeout);
    });
</script>

<div class="newsletter-form-container">
    <form
            bind:this={formElement}
            on:submit|preventDefault={handleSubmit}
            class="flex flex-col md:flex-row gap-4 max-w-md mx-auto relative"
    >
        <input
                type="text"
                bind:value={email}
                placeholder="Enter your email"
                class="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-all duration-300 {formState === 'error' ? 'border-red-500 shake-animation' : ''}"
                disabled={formState === 'submitting' || formState === 'success'}
                aria-label="Email address"
        />

        <button
                type="submit"
                class="px-6 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-all duration-300 disabled:opacity-50 relative overflow-hidden"
                disabled={formState === 'submitting' || formState === 'success'}
        >
            {#if formState === 'submitting'}
        <span class="flex items-center justify-center">
          <span class="loader"></span>
          <span class="ml-2">Subscribing...</span>
        </span>
            {:else if formState === 'success'}
        <span class="flex items-center justify-center">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          Subscribed!
        </span>
            {:else}
                Subscribe
            {/if}

            {#if formState === 'submitting'}
        <span class="absolute inset-0 flex justify-center items-center">
          <span class="animate-ping absolute h-full w-full rounded-full bg-blue-400 opacity-30"></span>
        </span>
            {/if}
        </button>
    </form>

    {#if formState === 'success'}
        <div class="text-green-400 mt-4 text-center fade-in-animation">
            <p class="flex items-center justify-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Thanks for subscribing! We'll keep you updated.
            </p>
        </div>
    {/if}

    {#if formState === 'error'}
        <div class="text-red-400 mt-4 text-center fade-in-animation">
            <p class="flex items-center justify-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
                {errorMessage}
            </p>
        </div>
    {/if}
</div>

<style>
    /* Loader animation */
    .loader {
        width: 1rem;
        height: 1rem;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        border-top-color: white;
        animation: spin 1s ease-in-out infinite;
    }

    @keyframes spin {
        to { transform: rotate(360deg); }
    }

    /* Shake animation for error */
    .shake-animation {
        animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
    }

    @keyframes shake {
        10%, 90% { transform: translateX(-1px); }
        20%, 80% { transform: translateX(2px); }
        30%, 50%, 70% { transform: translateX(-3px); }
        40%, 60% { transform: translateX(3px); }
    }

    /* Fade in animation */
    .fade-in-animation {
        animation: fadeIn 0.3s ease-in;
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
</style>