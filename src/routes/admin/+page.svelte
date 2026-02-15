<script lang="ts">
	import { enhance } from '$app/forms'
	// Import Lucide Icons
	import {
		Lock,
		Unlock,
		ClipboardList,
		Shield,
		Command,
		ArrowBigUp,
		Option,
		Delete,
		ArrowRight,
		LayoutDashboard,
	} from 'lucide-svelte'

	export let data

	let sequence: string[] = []
	let error = ''
	let loading = false
	let lastKeyTime = 0

	// Improved tools mapping with Lucide icons fallback or similar representations
	const tools = [
		{ id: 'shift', label: 'Shift', keys: ['Shift'], icon: ArrowBigUp },
		{ id: 'command', label: 'Command', keys: ['Meta', 'OS'], icon: Command },
		{ id: 'option', label: 'Option', keys: ['Alt'], icon: Option },
		{ id: 'control', label: 'Control', keys: ['Control'], icon: ArrowBigUp },
		{ id: 'backspace', label: 'Backspace', keys: ['Backspace'], icon: Delete },
	]

	function handleKeydown(event: KeyboardEvent) {
		if (loading || data.isAuthenticated) return

		// Handle Backspace
		if (event.key === 'Backspace') {
			if (event.shiftKey) {
				addToSequence('backspace')
			} else {
				sequence = sequence.slice(0, -1)
				error = ''
			}
			return
		}

		// Handle Enter
		if (event.key === 'Enter') {
			unlock()
			return
		}

		// Handle Escape
		if (event.key === 'Escape') {
			clearSequence()
			return
		}

		// Map modifiers/special keys
		const tool = tools.find((t) => t.keys.includes(event.key))
		if (tool) {
			const now = Date.now()
			if (now - lastKeyTime < 200 && sequence[sequence.length - 1] === tool.id) {
				return
			}
			lastKeyTime = now
			addToSequence(tool.id)
			return
		}

		// Handle generic characters (letters, numbers, space, symbols)
		if (event.key.length === 1) {
			addToSequence(event.key)
		}
	}

	function addToSequence(id: string) {
		if (sequence.length < 20) {
			// Increased limit for complex passwords
			sequence = [...sequence, id]
			error = ''
		}
	}

	function clearSequence() {
		sequence = []
		error = ''
	}

	async function unlock() {
		if (sequence.length === 0) return
		loading = true
		error = ''

		try {
			const response = await fetch('/api/auth/admin', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ sequence }),
			})

			const result = await response.json()

			if (result.success) {
				window.location.reload()
			} else {
				error = result.message || 'Access Denied'
				sequence = []
			}
		} catch (err) {
			error = 'Something went wrong'
		} finally {
			loading = false
		}
	}

	function getDisplayItem(item: string) {
		const tool = tools.find((t) => t.id === item)
		if (tool) return { type: 'icon', icon: tool.icon }
		if (item === ' ') return { type: 'text', label: '␣' } // Visual for space
		return { type: 'text', label: item }
	}
</script>

<svelte:head>
	<title>Admin Access</title>
</svelte:head>

<svelte:window on:keydown={handleKeydown} />

<!-- Container handled by layout, but need full height centered for lock screen -->
<div class="flex flex-col items-center justify-center min-h-[80vh] w-full">
	{#if data.isAuthenticated}
		<div class="w-full max-w-6xl animate-fade-in">
			<div class="mb-10 text-center md:text-left">
				<h1
					class="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
				>
					Welcome back, kenTom
				</h1>
				<p class="text-gray-400 text-lg">Here's what's happening today.</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<!-- Waitlist Card -->
				<a
					href="/admin/waitlist"
					class="relative block p-8 bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-2xl hover:bg-gray-800/60 hover:border-blue-500/50 transition-all duration-300 group overflow-hidden"
				>
					<div
						class="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
					></div>
					<div class="relative z-10">
						<div
							class="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300"
						>
							<ClipboardList class="w-6 h-6" />
						</div>
						<h2
							class="text-2xl font-bold mb-2 text-white group-hover:text-blue-300 transition-colors"
						>
							Waitlist
						</h2>
						<p class="text-gray-400 mb-6">
							Manage waitlist entries, view statistics, and approve users.
						</p>
						<div
							class="flex items-center text-blue-400 font-medium group-hover:translate-x-1 transition-transform"
						>
							<span>View Entries</span>
							<ArrowRight class="w-4 h-4 ml-2" />
						</div>
					</div>
				</a>

				<!-- Placeholder Card 1 -->
				<div
					class="relative block p-8 bg-gray-800/20 border border-dashed border-gray-700 rounded-2xl group cursor-not-allowed"
				>
					<div
						class="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6 text-purple-400/50"
					>
						<Shield class="w-6 h-6" />
					</div>
					<h2 class="text-2xl font-bold mb-2 text-gray-500">Security</h2>
					<p class="text-gray-600">Audit logs and security settings coming soon.</p>
				</div>
			</div>
		</div>
	{:else}
		<!-- Lock Screen -->
		<div
			class="w-full max-w-md rounded-3xl p-8 md:p-12 shadow-2xl shadow-blue-900/10 animate-fade-in relative"
		>
			<!-- Background Glow -->
			<div
				class="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-blue-500/20 blur-3xl rounded-full pointer-events-none"
			></div>

			<div class="text-center mb-10 relative z-10">
				<div
					class="w-20 h-20 bg-gradient-to-br from-gray-800/20 to-gray-900/10 rounded-full border border-gray-700 flex items-center justify-center mx-auto mb-6 shadow-lg transform rotate-3"
				>
					<Lock class="w-10 h-10 text-blue-400" />
				</div>
				<h1 class="text-3xl font-bold">Restricted Access</h1>
				<p class="text-gray-400 mt-3 font-medium">Authentication required.</p>
			</div>

			<!-- Sequence Display -->
			<div
				class="bg-gray-900/80 rounded-2xl p-6 mb-8 min-h-[80px] flex items-center justify-center flex-wrap gap-3 border border-gray-800 shadow-inner"
			>
				{#each sequence as item}
					{@const display = getDisplayItem(item)}
					<div
						class="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 animate-pop shadow-[0_0_10px_rgba(59,130,246,0.2)] font-bold text-lg"
					>
						{#if display.type === 'icon'}
							<svelte:component this={display.icon} class="w-5 h-5" />
						{:else}
							{display.label}
						{/if}
					</div>
				{/each}
				{#if sequence.length === 0}
					<span class="text-gray-600 text-sm font-medium animate-pulse">Type password...</span>
				{/if}
			</div>

			<!-- Legend (Non-interactive) -->
			<div class="flex justify-center gap-4 mb-8 opacity-50">
				{#each tools as tool}
					{#if tool.id !== 'backspace'}
						<!-- Don't show backspace in legend if simpler -->
						<div class="flex flex-col items-center gap-2" title={tool.label}>
							<div
								class="w-10 h-10 rounded-lg bg-gray-800/50 border border-gray-700 flex items-center justify-center text-gray-400"
							>
								<svelte:component this={tool.icon} class="w-4 h-4" />
							</div>
						</div>
					{/if}
				{/each}
			</div>

			{#if error}
				<div
					class="flex items-center justify-center gap-2 text-red-400 text-sm mb-6 bg-red-900/10 py-2 px-4 rounded-lg border border-red-900/20 animate-shake"
				>
					<Shield class="w-4 h-4" />
					<span>{error}</span>
				</div>
			{/if}

			<button
				class="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl font-bold text-white shadow-lg shadow-blue-600/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98] flex items-center justify-center gap-2"
				on:click={unlock}
				disabled={loading || sequence.length === 0}
			>
				{#if loading}
					<div
						class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"
					></div>
					<span>Verifying...</span>
				{:else}
					<Unlock class="w-5 h-5" />
					<span>Unlock Access</span>
				{/if}
			</button>

			<div class="mt-6 text-center text-xs text-gray-600 space-y-1">
				<p>Type on your keyboard.</p>
				<p>Backspace to delete • Shift+Backspace to add icon</p>
			</div>
		</div>
	{/if}
</div>

<style>
	@keyframes pop {
		0% {
			transform: scale(0.5);
			opacity: 0;
		}
		60% {
			transform: scale(1.1);
		}
		100% {
			transform: scale(1);
			opacity: 1;
		}
	}
	.animate-pop {
		animation: pop 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
	}
	.animate-shake {
		animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
	}
	@keyframes shake {
		10%,
		90% {
			transform: translate3d(-1px, 0, 0);
		}
		20%,
		80% {
			transform: translate3d(2px, 0, 0);
		}
		30%,
		50%,
		70% {
			transform: translate3d(-4px, 0, 0);
		}
		40%,
		60% {
			transform: translate3d(4px, 0, 0);
		}
	}
</style>
