<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, fade, scale } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	type Step = 'email' | 'name' | 'phone' | 'code' | 'success' | 'already-exists';

	let currentStep: Step = 'email';
	let email = '';
	let name = '';
	let phone = '';
	let code = '';
	let loading = false;
	let error = '';
	let codeTimer = 0;
	let timerInterval: number;

	// Email validation
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	$: emailValid = emailRegex.test(email);
	$: codeValid = code.length === 6;

	// Navigate to next step
	async function nextStep() {
		error = '';

		if (currentStep === 'email') {
			if (!emailValid) {
				error = 'Please enter a valid email address';
				return;
			}
			loading = true;
			await requestCode();
			loading = false;
		} else if (currentStep === 'name') {
			currentStep = 'phone';
		} else if (currentStep === 'phone') {
			currentStep = 'code';
		} else if (currentStep === 'code') {
			if (!codeValid) {
				error = 'Please enter the 6-digit code';
				return;
			}
			loading = true;
			await verifyAndJoin();
			loading = false;
		}
	}

	// Go back to previous step
	function prevStep() {
		error = '';
		if (currentStep === 'name') {
			currentStep = 'email';
		} else if (currentStep === 'phone') {
			currentStep = 'name';
		} else if (currentStep === 'code') {
			currentStep = 'phone';
		}
	}

	// Skip optional step
	function skipStep() {
		if (currentStep === 'name') {
			name = '';
			currentStep = 'phone';
		} else if (currentStep === 'phone') {
			phone = '';
			currentStep = 'code';
		}
	}

	// Request verification code
	async function requestCode() {
		try {
			const response = await fetch('/api/waitlist/request-code', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email })
			});

			const data = await response.json();

			if (!response.ok) {
				if (data.alreadyOnWaitlist) {
					currentStep = 'already-exists';
				} else {
					throw new Error(data.error || 'Failed to send verification code');
				}
			} else {
				currentStep = 'name';
				startTimer();
			}
		} catch (err: any) {
			error = err.message || 'An error occurred. Please try again.';
		}
	}

	// Verify code and join waitlist
	async function verifyAndJoin() {
		try {
			const response = await fetch('/api/waitlist/verify', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email,
					code,
					name: name.trim() || undefined,
					phone: phone.trim() || undefined
				})
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || 'Failed to verify code');
			}

			currentStep = 'success';
			clearInterval(timerInterval);
		} catch (err: any) {
			error = err.message || 'An error occurred. Please try again.';
		}
	}

	// Timer for code expiry
	function startTimer() {
		codeTimer = 600; // 10 minutes in seconds
		timerInterval = setInterval(() => {
			codeTimer--;
			if (codeTimer <= 0) {
				clearInterval(timerInterval);
			}
		}, 1000);
	}

	// Format timer display
	$: timerDisplay = `${Math.floor(codeTimer / 60)}:${(codeTimer % 60).toString().padStart(2, '0')}`;

	// Reset form
	function resetForm() {
		currentStep = 'email';
		email = '';
		name = '';
		phone = '';
		code = '';
		error = '';
		clearInterval(timerInterval);
	}

	// Handle enter key
	function handleKeyPress(e: KeyboardEvent) {
		if (e.key === 'Enter' && !loading) {
			nextStep();
		}
	}

	onMount(() => {
		return () => {
			if (timerInterval) clearInterval(timerInterval);
		};
	});
</script>

<div class="w-full max-w-md mx-auto relative">
	<!-- Progress Indicator -->
	{#if currentStep !== 'success' && currentStep !== 'already-exists'}
		<div class="mb-8">
			<div class="flex justify-between mb-2">
				<span class="text-xs text-gray-400">
					{currentStep === 'email' ? 'Step 1 of 4' : ''}
					{currentStep === 'name' ? 'Step 2 of 4' : ''}
					{currentStep === 'phone' ? 'Step 3 of 4' : ''}
					{currentStep === 'code' ? 'Step 4 of 4' : ''}
				</span>
			</div>
			<div class="h-2 bg-gray-800 rounded-full overflow-hidden">
				<div
					class="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out"
					style="width: {currentStep === 'email' ? '25%' : currentStep === 'name' ? '50%' : currentStep === 'phone' ? '75%' : '100%'}"
				></div>
			</div>
		</div>
	{/if}

	<div class="relative min-h-[400px]">
		<!-- Email Step -->
		{#if currentStep === 'email'}
			<div
				in:fly={{ x: 20, duration: 400, easing: cubicOut }}
				out:fly={{ x: -20, duration: 300, easing: cubicOut }}
				class="space-y-6"
			>
				<div class="text-center mb-8">
					<h3 class="text-2xl font-bold text-white mb-2">Join the Waitlist</h3>
					<p class="text-gray-400">Enter your email to get started</p>
				</div>

				<div>
					<label for="email" class="block text-sm font-medium text-gray-300 mb-2">
						Email Address *
					</label>
					<input
						id="email"
						type="email"
						bind:value={email}
						on:keypress={handleKeyPress}
						placeholder="you@example.com"
						class="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
						disabled={loading}
						autofocus
					/>
				</div>

				{#if error}
					<div
						in:scale={{ duration: 200 }}
						class="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm"
					>
						{error}
					</div>
				{/if}

				<button
					on:click={nextStep}
					disabled={!emailValid || loading}
					class="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 flex items-center justify-center gap-2"
				>
					{#if loading}
						<div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
						<span>Sending code...</span>
					{:else}
						<span>Continue</span>
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
						</svg>
					{/if}
				</button>
			</div>
		{/if}

		<!-- Name Step -->
		{#if currentStep === 'name'}
			<div
				in:fly={{ x: 20, duration: 400, easing: cubicOut }}
				out:fly={{ x: -20, duration: 300, easing: cubicOut }}
				class="space-y-6"
			>
				<div class="text-center mb-8">
					<h3 class="text-2xl font-bold text-white mb-2">What's your name?</h3>
					<p class="text-gray-400">Help us personalize your experience</p>
				</div>

				<div>
					<label for="name" class="block text-sm font-medium text-gray-300 mb-2">
						Full Name (Optional)
					</label>
					<input
						id="name"
						type="text"
						bind:value={name}
						on:keypress={handleKeyPress}
						placeholder="John Doe"
						class="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
						autofocus
					/>
				</div>

				<div class="flex gap-3">
					<button
						on:click={prevStep}
						class="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all"
					>
						Back
					</button>
					<button
						on:click={nextStep}
						class="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
					>
						<span>Continue</span>
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
						</svg>
					</button>
				</div>

				<button
					on:click={skipStep}
					class="w-full text-gray-400 hover:text-gray-300 text-sm transition-colors"
				>
					Skip this step
				</button>
			</div>
		{/if}

		<!-- Phone Step -->
		{#if currentStep === 'phone'}
			<div
				in:fly={{ x: 20, duration: 400, easing: cubicOut }}
				out:fly={{ x: -20, duration: 300, easing: cubicOut }}
				class="space-y-6"
			>
				<div class="text-center mb-8">
					<h3 class="text-2xl font-bold text-white mb-2">Phone Number</h3>
					<p class="text-gray-400">We'll never spam or share your number</p>
				</div>

				<div>
					<label for="phone" class="block text-sm font-medium text-gray-300 mb-2">
						Phone Number (Optional)
					</label>
					<input
						id="phone"
						type="tel"
						bind:value={phone}
						on:keypress={handleKeyPress}
						placeholder="+254 700 000 000"
						class="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
						autofocus
					/>
				</div>

				<div class="flex gap-3">
					<button
						on:click={prevStep}
						class="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all"
					>
						Back
					</button>
					<button
						on:click={nextStep}
						class="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
					>
						<span>Continue</span>
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
						</svg>
					</button>
				</div>

				<button
					on:click={skipStep}
					class="w-full text-gray-400 hover:text-gray-300 text-sm transition-colors"
				>
					Skip this step
				</button>
			</div>
		{/if}

		<!-- Code Step -->
		{#if currentStep === 'code'}
			<div
				in:fly={{ x: 20, duration: 400, easing: cubicOut }}
				out:fly={{ x: -20, duration: 300, easing: cubicOut }}
				class="space-y-6"
			>
				<div class="text-center mb-8">
					<h3 class="text-2xl font-bold text-white mb-2">Check your email</h3>
					<p class="text-gray-400 text-sm">
						We sent a 6-digit code to <strong class="text-white">{email}</strong>
					</p>
					{#if codeTimer > 0}
						<p class="text-blue-400 text-sm mt-2">Code expires in {timerDisplay}</p>
					{/if}
				</div>

				<div>
					<label for="code" class="block text-sm font-medium text-gray-300 mb-2">
						Verification Code
					</label>
					<input
						id="code"
						type="text"
						bind:value={code}
						on:keypress={handleKeyPress}
						maxlength="6"
						placeholder="000000"
						class="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white text-center text-2xl font-mono tracking-widest placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
						disabled={loading}
						autofocus
					/>
				</div>

				{#if error}
					<div
						in:scale={{ duration: 200 }}
						class="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm"
					>
						{error}
					</div>
				{/if}

				<div class="flex gap-3">
					<button
						on:click={prevStep}
						disabled={loading}
						class="px-6 py-3 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all"
					>
						Back
					</button>
					<button
						on:click={nextStep}
						disabled={!codeValid || loading}
						class="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all transform hover:scale-[1.02] disabled:scale-100 flex items-center justify-center gap-2"
					>
						{#if loading}
							<div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
							<span>Verifying...</span>
						{:else}
							<span>Join Waitlist</span>
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
							</svg>
						{/if}
					</button>
				</div>

				{#if codeTimer <= 0}
					<button
						on:click={() => {
							currentStep = 'email';
							error = '';
						}}
						class="w-full text-blue-400 hover:text-blue-300 text-sm transition-colors"
					>
						Request new code
					</button>
				{/if}
			</div>
		{/if}

		<!-- Success State -->
		{#if currentStep === 'success'}
			<div
				in:scale={{ duration: 500, easing: cubicOut }}
				class="text-center space-y-6 py-8"
			>
				<div class="w-20 h-20 mx-auto bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center animate-bounce-once">
					<svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
					</svg>
				</div>
				<div>
					<h3 class="text-2xl font-bold text-white mb-2">You're on the waitlist! 🎉</h3>
					<p class="text-gray-400">
						Check your email for a welcome message with next steps.
					</p>
				</div>
				<button
					on:click={resetForm}
					class="text-blue-400 hover:text-blue-300 transition-colors"
				>
					Add another email
				</button>
			</div>
		{/if}

		<!-- Already Exists State -->
		{#if currentStep === 'already-exists'}
			<div
				in:scale={{ duration: 500, easing: cubicOut }}
				class="text-center space-y-6 py-8"
			>
				<div class="w-20 h-20 mx-auto bg-yellow-500/20 rounded-full flex items-center justify-center">
					<svg class="w-10 h-10 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
					</svg>
				</div>
				<div>
					<h3 class="text-2xl font-bold text-white mb-2">Already on the waitlist</h3>
					<p class="text-gray-400">
						The email <strong class="text-white">{email}</strong> is already registered.
					</p>
				</div>
				<button
					on:click={resetForm}
					class="text-blue-400 hover:text-blue-300 transition-colors"
				>
					Try another email
				</button>
			</div>
		{/if}
	</div>
</div>

<style>
	@keyframes bounce-once {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-20px); }
	}

	.animate-bounce-once {
		animation: bounce-once 0.6s ease-out;
	}
</style>
