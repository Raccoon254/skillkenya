<script lang="ts">
	import { enhance } from '$app/forms';
	export let data;

	let sequence: string[] = [];
	let error = '';
	let loading = false;

	const tools = [
		{ id: 'shift', label: 'Shift', icon: '⇧' },
		{ id: 'command', label: 'Command', icon: '⌘' },
		{ id: 'option', label: 'Option', icon: '⌥' },
		{ id: 'control', label: 'Control', icon: '⌃' },
		{ id: 'alt', label: 'Alt', icon: '⎇' }
	];

	function addToSequence(id: string) {
		if (sequence.length < 10) {
			sequence = [...sequence, id];
			error = '';
		}
	}

	function clearSequence() {
		sequence = [];
		error = '';
	}

	async function unlock() {
		if (sequence.length === 0) return;
		loading = true;
		error = '';

		try {
			const response = await fetch('/api/auth/admin', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ sequence })
			});

			const result = await response.json();

			if (result.success) {
				window.location.reload();
			} else {
				error = result.message || 'Access Denied';
				sequence = [];
			}
		} catch (err) {
			error = 'Something went wrong';
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Admin Access</title>
</svelte:head>

<div class="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
	{#if data.isAuthenticated}
		<div class="w-full max-w-4xl animate-fade-in">
			<h1 class="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
				Admin Dashboard
			</h1>
			
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<a href="/admin/waitlist" 
					class="block p-6 bg-gray-800/50 border border-gray-700 rounded-xl hover:bg-gray-800 hover:border-blue-500/50 transition-all group">
					<div class="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">📋</div>
					<h2 class="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">Waitlist</h2>
					<p class="text-gray-400 text-sm">Manage waitlist entries and view statistics.</p>
				</a>
				
				<!-- Add more admin links here -->
			</div>
		</div>
	{:else}
		<div class="w-full max-w-md bg-gray-800/30 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-8 shadow-2xl animate-fade-in">
			<div class="text-center mb-8">
				<div class="text-6xl mb-4">🔒</div>
				<h1 class="text-2xl font-bold">Restricted Access</h1>
				<p class="text-gray-400 text-sm mt-2">Enter the authorization sequence.</p>
			</div>

			<!-- Sequence Display -->
			<div class="bg-gray-900/50 rounded-lg p-4 mb-6 min-h-[60px] flex items-center justify-center flex-wrap gap-2 border border-gray-700/50">
				{#each sequence as item, i}
					<span class="inline-flex items-center justify-center w-8 h-8 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-bold animate-pop">
						{tools.find(t => t.id === item)?.icon}
					</span>
				{/each}
				{#if sequence.length === 0}
					<span class="text-gray-600 text-sm italic">Sequence empty...</span>
				{/if}
			</div>

			<!-- Keypad -->
			<div class="grid grid-cols-3 gap-3 mb-6">
				{#each tools as tool}
					<button
						class="p-4 bg-gray-800 hover:bg-gray-700 active:bg-gray-600 rounded-xl border border-gray-700 transition-all flex flex-col items-center justify-center gap-1 group"
						on:click={() => addToSequence(tool.id)}
					>
						<span class="text-2xl group-hover:scale-110 transition-transform">{tool.icon}</span>
						<span class="text-xs text-gray-400 uppercase tracking-wider">{tool.label}</span>
					</button>
				{/each}
				<button
					class="p-4 bg-red-900/20 hover:bg-red-900/30 active:bg-red-900/40 rounded-xl border border-red-900/30 transition-all flex flex-col items-center justify-center gap-1 text-red-400"
					on:click={clearSequence}
				>
					<span class="text-xl">✕</span>
					<span class="text-xs uppercase tracking-wider">Clear</span>
				</button>
			</div>

			{#if error}
				<div class="text-red-400 text-center text-sm mb-4 animate-shake">
					{error}
				</div>
			{/if}

			<button
				class="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl font-bold shadow-lg shadow-blue-900/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"
				on:click={unlock}
				disabled={loading || sequence.length === 0}
			>
				{loading ? 'Verifying...' : 'Unlock Access'}
			</button>
		</div>
	{/if}
</div>

<style>
	@keyframes pop {
		0% { transform: scale(0); opacity: 0; }
		80% { transform: scale(1.1); }
		100% { transform: scale(1); opacity: 1; }
	}
	.animate-pop {
		animation: pop 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
	}
	.animate-shake {
		animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
	}
	@keyframes shake {
		10%, 90% { transform: translate3d(-1px, 0, 0); }
		20%, 80% { transform: translate3d(2px, 0, 0); }
		30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
		40%, 60% { transform: translate3d(4px, 0, 0); }
	}
</style>
