<script lang="ts">
	import { onMount } from 'svelte';

	type Step = 'email' | 'code' | 'name' | 'phone' | 'success' | 'already-exists';

	let currentStep: Step = 'email';
	let email = '';
	let name = '';
	let phone = '';
	let code = ['', '', '', '', '', ''];
	let loading = false;
	let error = '';
	let codeTimer = 0;
	let timerInterval: number;
	let inputRefs: HTMLInputElement[] = [];

	// --- Visual Logic for Icons & Progress ---
	const radius = 50;
	const circumference = 2 * Math.PI * radius;

	// Map steps to visual data
	$: stepConfig = {
		email: {
			percent: 25,
			color: 'text-blue-500',
			icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
		},
		code: {
			percent: 50,
			color: 'text-purple-500',
			icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
		},
		name: {
			percent: 75,
			color: 'text-indigo-500',
			icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
		},
		phone: {
			percent: 95,
			color: 'text-pink-500',
			icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z'
		},
		success: {
			percent: 100,
			color: 'text-emerald-500',
			icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
		},
		'already-exists': {
			percent: 100,
			color: 'text-amber-500',
			icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
		}
	}[currentStep];

	$: dashOffset = circumference - (stepConfig.percent / 100) * circumference;

	// --- Form Logic with Real API ---
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	$: emailValid = emailRegex.test(email);
	$: codeString = code.join('');
	$: codeValid = codeString.length === 6 && !codeString.includes('');

	async function requestCode() {
		if (!emailValid) {
			error = 'Please enter a valid email address';
			return;
		}

		loading = true;
		error = '';

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
				currentStep = 'code';
				startTimer();
				setTimeout(() => inputRefs[0]?.focus(), 100);
			}
		} catch (err: any) {
			error = err.message || 'An error occurred. Please try again.';
		} finally {
			loading = false;
		}
	}

	function continueFromCode() {
		error = '';
		currentStep = 'name';
	}

	async function submitForm() {
		loading = true;
		error = '';

		try {
			const response = await fetch('/api/waitlist/verify', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email,
					code: codeString,
					name: name.trim() || undefined,
					phone: phone.trim() || undefined
				})
			});

			const data = await response.json();

			if (!response.ok) {
				// Go back to code step if verification fails
				currentStep = 'code';
				code = ['', '', '', '', '', ''];
				error = data.error || 'Failed to verify code';
				setTimeout(() => inputRefs[0]?.focus(), 100);
			} else {
				currentStep = 'success';
				clearInterval(timerInterval);
			}
		} catch (err: any) {
			currentStep = 'code';
			code = ['', '', '', '', '', ''];
			error = err.message || 'An error occurred. Please try again.';
			setTimeout(() => inputRefs[0]?.focus(), 100);
		} finally {
			loading = false;
		}
	}

	function handleCodeInput(index: number, value: string) {
		if (value && !/^\d$/.test(value)) return;
		code[index] = value;
		if (value && index < 5) inputRefs[index + 1]?.focus();
	}

	function handleCodeKeyDown(index: number, e: KeyboardEvent) {
		if (e.key === 'Backspace') {
			if (!code[index] && index > 0) inputRefs[index - 1]?.focus();
			else code[index] = '';
		} else if (e.key === 'ArrowLeft' && index > 0) inputRefs[index - 1]?.focus();
		else if (e.key === 'ArrowRight' && index < 5) inputRefs[index + 1]?.focus();
	}

	function handleCodePaste(e: ClipboardEvent) {
		e.preventDefault();
		const pastedData = e.clipboardData?.getData('text/plain').trim() || '';
		if (!/^\d+$/.test(pastedData)) return;
		const digits = pastedData.slice(0, 6).split('');
		digits.forEach((digit, i) => {
			if (i < 6) code[i] = digit;
		});
		inputRefs[Math.min(digits.length, 5)]?.focus();
	}

	function startTimer() {
		codeTimer = 600;
		timerInterval = setInterval(() => {
			codeTimer--;
			if (codeTimer <= 0) clearInterval(timerInterval);
		}, 1000);
	}

	$: timerDisplay = `${Math.floor(codeTimer / 60)}:${(codeTimer % 60).toString().padStart(2, '0')}`;

	function resetForm() {
		currentStep = 'email';
		email = '';
		name = '';
		phone = '';
		code = ['', '', '', '', '', ''];
		error = '';
		clearInterval(timerInterval);
	}

	onMount(() => () => {
		if (timerInterval) clearInterval(timerInterval);
	});
</script>

<div class="w-full max-w-md mx-auto  relative min-h-[750px] mt-20 flex flex-col items-center p-4">
	<!-- Circular Progress Indicator -->
	<div class="relative w-32 h-32 mb-8 flex-shrink-0">
		<svg class="w-full h-full transform -rotate-90 drop-shadow-2xl">
			<circle cx="50%" cy="50%" r={radius} fill="none" stroke="#1f2937" stroke-width="6" />
			<circle
				cx="50%"
				cy="50%"
				r={radius}
				fill="none"
				stroke="currentColor"
				stroke-width="6"
				stroke-linecap="round"
				stroke-dasharray={circumference}
				stroke-dashoffset={dashOffset}
				class="transition-all duration-700 ease-out {stepConfig.color}"
			/>
		</svg>

		<div class="absolute inset-0 flex items-center justify-center">
			{#key currentStep}
				<div class="w-14 h-14 {stepConfig.color} transition-all duration-500 animate-icon-pop">
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d={stepConfig.icon} />
					</svg>
				</div>
			{/key}
		</div>
	</div>

	<!-- Form Steps -->
	<div class="relative w-full">
		<!-- Email Step -->
		<div
			class="transition-all duration-500 absolute w-full"
			style="
				opacity: {currentStep === 'email' ? '1' : '0'};
				transform: {currentStep === 'email' ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)'};
				pointer-events: {currentStep === 'email' ? 'auto' : 'none'}
			"
		>
			<div class="space-y-6">
				<div class="text-center">
					<h3 class="text-3xl font-bold text-white mb-2">Join the Waitlist</h3>
					<p class="text-gray-400">Be the first to experience SkillKenya.</p>
				</div>
				<div>
					<input
						type="email"
						bind:value={email}
						on:keypress={(e) => e.key === 'Enter' && requestCode()}
						placeholder="you@example.com"
						class="w-full px-4 py-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-lg text-center"
						disabled={loading}
					/>
				</div>
				{#if error && currentStep === 'email'}
					<div class="text-red-400 text-sm text-center bg-red-500/10 py-2 rounded-lg">{error}</div>
				{/if}
				<button
					on:click={requestCode}
					disabled={!emailValid || loading}
					class="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-900/20"
				>
					{loading ? 'Sending...' : 'Continue'}
				</button>
			</div>
		</div>

		<!-- Code Step -->
		<div
			class="transition-all duration-500 absolute w-full"
			style="
				opacity: {currentStep === 'code' ? '1' : '0'};
				transform: {currentStep === 'code' ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)'};
				pointer-events: {currentStep === 'code' ? 'auto' : 'none'}
			"
		>
			<div class="space-y-6 text-center">
				<div>
					<h3 class="text-2xl font-bold text-white mb-2">Verify Email</h3>
					<p class="text-gray-400 text-sm">
						Code sent to <span class="text-white font-medium">{email}</span>
					</p>
					{#if codeTimer > 0}
						<p class="text-purple-400 text-xs mt-1">Expires in {timerDisplay}</p>
					{/if}
				</div>

				<div class="flex gap-2 justify-center">
					{#each Array(6) as _, index}
						<input
							bind:this={inputRefs[index]}
							type="text"
							inputmode="numeric"
							maxlength="1"
							value={code[index]}
							on:input={(e) => handleCodeInput(index, e.currentTarget.value)}
							on:keydown={(e) => handleCodeKeyDown(index, e)}
							on:paste={handleCodePaste}
							on:focus={(e) => e.currentTarget.select()}
							disabled={loading}
							class="w-12 h-14 text-center text-2xl font-bold bg-gray-800/50 border-2 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-white transition-all {error && currentStep === 'code'
								? 'border-red-500'
								: code[index]
								? 'border-purple-500'
								: 'border-gray-700'} {loading ? 'opacity-50 cursor-not-allowed' : ''}"
							aria-label="Digit {index + 1}"
						/>
					{/each}
				</div>

				{#if error && currentStep === 'code'}
					<div class="text-red-400 text-sm bg-red-500/10 py-2 rounded-lg">{error}</div>
				{/if}

				<button
					on:click={continueFromCode}
					class="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-purple-900/20 transition-all"
				>
					Continue
				</button>

				<button
					on:click={() => {
						currentStep = 'email';
						code = ['', '', '', '', '', ''];
						error = '';
					}}
					class="text-sm text-gray-500 border border-blue-500 focus:ring-1 ring-offset-2 ring-offset-gray-800 hover:text-gray-300"
				>
					Change email address
				</button>
			</div>
		</div>

		<!-- Name Step -->
		<div
			class="transition-all duration-500 absolute w-full"
			style="
				opacity: {currentStep === 'name' ? '1' : '0'};
				transform: {currentStep === 'name' ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)'};
				pointer-events: {currentStep === 'name' ? 'auto' : 'none'}
			"
		>
			<div class="space-y-6">
				<div class="text-center">
					<h3 class="text-2xl font-bold text-white mb-2">Who are you?</h3>
					<p class="text-gray-400">What should we call you?</p>
				</div>
				<input
					type="text"
					bind:value={name}
					on:keypress={(e) => e.key === 'Enter' && (currentStep = 'phone')}
					placeholder="John Doe"
					class="w-full px-4 py-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-center text-lg"
				/>
				<div class="flex gap-3">
					<button
						on:click={() => (currentStep = 'code')}
						class="px-6 py-4 rounded-xl text-gray-400  border border-blue-500/30 focus:ring-1 ring-offset-2 ring-offset-gray-800 hover:bg-gray-800 transition-all"
					>
						Back
					</button>
					<button
						on:click={() => (currentStep = 'phone')}
						class="flex-1 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg transition-all"
					>
						Next
					</button>
				</div>
				<button
					on:click={() => {
						name = '';
						currentStep = 'phone';
					}}
					class="w-full text-sm  border border-blue-500/30 focus:ring-1 ring-offset-2 ring-offset-gray-800 text-gray-500 hover:text-gray-300"
				>
					Skip
				</button>
			</div>
		</div>

		<!-- Phone Step -->
		<div
			class="transition-all duration-500 absolute w-full"
			style="
				opacity: {currentStep === 'phone' ? '1' : '0'};
				transform: {currentStep === 'phone' ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)'};
				pointer-events: {currentStep === 'phone' ? 'auto' : 'none'}
			"
		>
			<div class="space-y-6">
				<div class="text-center">
					<h3 class="text-2xl font-bold text-white mb-2">Stay in the loop</h3>
					<p class="text-gray-400">Add a phone number (Optional)</p>
				</div>
				<input
					type="tel"
					bind:value={phone}
					on:keypress={(e) => e.key === 'Enter' && submitForm()}
					placeholder="+254 700 000 000"
					class="w-full px-4 py-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 transition-all text-center text-lg"
				/>
				<div class="flex gap-3">
					<button
						on:click={() => (currentStep = 'name')}
						class="px-6 py-4 border border-blue-500/30 focus:ring-1 ring-offset-2 ring-offset-gray-800  rounded-xl text-gray-400 hover:bg-gray-800 transition-all"
					>
						Back
					</button>
					<button
						on:click={submitForm}
						disabled={loading}
						class="flex-1 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-pink-500 hover:to-rose-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg transition-all"
					>
						{loading ? 'Finalizing...' : 'Finish'}
					</button>
				</div>
				<button
					on:click={() => {
						phone = '';
						submitForm();
					}}
					class="w-full border border-blue-500/30 focus:ring-1 ring-offset-2 ring-offset-gray-800  text-sm text-gray-500 hover:text-gray-300"
				>
					Skip
				</button>
			</div>
		</div>

		<!-- Success State -->
		<div
			class="transition-all duration-500 absolute w-full"
			style="
				opacity: {currentStep === 'success' ? '1' : '0'};
				transform: {currentStep === 'success' ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)'};
				pointer-events: {currentStep === 'success' ? 'auto' : 'none'}
			"
		>
			<div class="text-center space-y-6">
				<h3 class="text-3xl font-bold text-white">You're in! 🎉</h3>
				<p class="text-gray-400">Check your inbox for a welcome message.</p>
				<button on:click={resetForm} class="text-emerald-400 hover:text-emerald-300 font-medium">
					Register another
				</button>
			</div>
		</div>

		<!-- Already Exists State -->
		<div
			class="transition-all duration-500 absolute w-full"
			style="
				opacity: {currentStep === 'already-exists' ? '1' : '0'};
				transform: {currentStep === 'already-exists' ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)'};
				pointer-events: {currentStep === 'already-exists' ? 'auto' : 'none'}
			"
		>
			<div class="text-center space-y-6">
				<h3 class="text-3xl font-bold text-white">Already Registered</h3>
				<p class="text-gray-400">The email <strong class="text-white">{email}</strong> is already on the list.</p>
				<button on:click={resetForm} class="text-amber-400 hover:text-amber-300 font-medium">
					Try different email
				</button>
			</div>
		</div>
	</div>
</div>

<style>
	@keyframes icon-pop {
		0% {
			transform: scale(0.5);
			opacity: 0;
		}
		50% {
			transform: scale(1.2);
		}
		100% {
			transform: scale(1);
			opacity: 1;
		}
	}
	.animate-icon-pop {
		animation: icon-pop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
	}
</style>
