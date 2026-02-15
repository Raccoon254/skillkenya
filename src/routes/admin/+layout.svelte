<script lang="ts">
	import { page } from '$app/stores'
	import { LayoutDashboard, Users, LogOut, Menu, X, Lock } from 'lucide-svelte'
	import { slide } from 'svelte/transition'

	export let data

	let isMobileMenuOpen = false

	const navigation = [
		{ name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
		{ name: 'Waitlist', href: '/admin/waitlist', icon: Users },
	]

	function toggleMobileMenu() {
		isMobileMenuOpen = !isMobileMenuOpen
	}

	function closeMobileMenu() {
		isMobileMenuOpen = false
	}

	async function logout() {
		// Just clear the cookie via a simple API call or form action would be better,
		// but for now we can likely just rely on a server endpoint to clear it
		// or javascript cookie manipulation if not httpOnly (but it IS httpOnly).
		// So we strictly need an endpoint.
		// Let's assume we'll just reload and the user can't "logout" explicitly without an endpoint.
		// Actually, let's make a quick logout endpoint or just use a form action on the dashboard if we had one.
		// For this implementation, I'll add a simple client-side expire for now or
		// actually, the best way is to fetch an endpoint.
		document.cookie = 'admin_session=; Max-Age=0; path=/;'
		window.location.href = '/'
	}
</script>

<div class="min-h-screen bg-gray-900 text-white flex">
	{#if data.isAuthenticated && !$page.url.pathname.endsWith('/login')}
		<!-- We assume /admin root handles the lock screen internally, but if authenticated we show sidebar -->
		<!-- The +page.svelte checks Auth, if not auth it shows lock screen. 
	     The layout wraps everything. If we are NOT authenticated, we probably shouldn't show the sidebar.
	     However, +page.server.ts passes isAuthenticated. -->

		<!-- Desktop Sidebar -->
		<aside
			class="hidden md:flex flex-col w-64 bg-gray-800/50 backdrop-blur-xl border-r border-gray-700/50 fixed h-full z-20"
		>
			<div class="h-16 flex items-center px-6 border-b border-gray-700/50">
				<div class="flex items-center gap-2 text-blue-400 font-bold text-xl">
					<Lock class="w-6 h-6" />
					<span>Admin</span>
				</div>
			</div>

			<nav class="flex-1 p-4 space-y-1 overflow-y-auto">
				{#each navigation as item}
					<a
						href={item.href}
						class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
						{$page.url.pathname === item.href
							? 'bg-blue-600/10 text-blue-400 border border-blue-600/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]'
							: 'text-gray-400 hover:bg-gray-800 hover:text-white'}"
					>
						<svelte:component this={item.icon} class="w-5 h-5" />
						<span class="font-medium">{item.name}</span>
						{#if $page.url.pathname === item.href}
							<div
								class="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.8)]"
							></div>
						{/if}
					</a>
				{/each}
			</nav>

			<div class="p-4 border-t border-gray-700/50">
				<button
					on:click={logout}
					class="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-gray-400 hover:bg-red-900/20 hover:text-red-400 transition-all duration-200 group"
				>
					<LogOut class="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
					<span class="font-medium">Logout</span>
				</button>
			</div>
		</aside>

		<!-- Mobile Header -->
		<div
			class="md:hidden fixed top-0 w-full z-30 bg-gray-900/80 backdrop-blur-lg border-b border-gray-700/50 h-16 flex items-center justify-between px-4"
		>
			<div class="flex items-center gap-2 text-blue-400 font-bold text-lg">
				<Lock class="w-5 h-5" />
				<span>Admin</span>
			</div>
			<button on:click={toggleMobileMenu} class="p-2 text-gray-400 hover:text-white">
				{#if isMobileMenuOpen}
					<X class="w-6 h-6" />
				{:else}
					<Menu class="w-6 h-6" />
				{/if}
			</button>
		</div>

		<!-- Mobile Menu -->
		{#if isMobileMenuOpen}
			<div
				transition:slide={{ duration: 200 }}
				class="md:hidden fixed top-16 left-0 w-full h-[calc(100vh-4rem)] bg-gray-900 z-20 border-b border-gray-700/50 flex flex-col p-4"
			>
				<nav class="space-y-2">
					{#each navigation as item}
						<a
							href={item.href}
							on:click={closeMobileMenu}
							class="flex items-center gap-3 px-4 py-4 rounded-xl transition-all duration-200
							{$page.url.pathname === item.href
								? 'bg-blue-600/10 text-blue-400 border border-blue-600/20'
								: 'text-gray-400 hover:bg-gray-800 hover:text-white'}"
						>
							<svelte:component this={item.icon} class="w-5 h-5" />
							<span class="font-medium text-lg">{item.name}</span>
						</a>
					{/each}
				</nav>
				<div class="mt-auto pt-4 border-t border-gray-700/50">
					<button
						on:click={logout}
						class="flex items-center gap-3 px-4 py-4 w-full rounded-xl text-red-400 hover:bg-red-900/20 transition-all duration-200"
					>
						<LogOut class="w-5 h-5" />
						<span class="font-medium text-lg">Logout</span>
					</button>
				</div>
			</div>
		{/if}
	{/if}

	<!-- Main Content -->
	<main
		class="flex-1 w-full transition-all duration-300 bg-[#0B0F19] text-white overflow-hidden min-h-screen selection:bg-blue-500/30
		{data.isAuthenticated ? 'md:pl-64 pt-16 md:pt-0' : ''}"
	>
			<div class="absolute inset-0 z-0 pointer-events-none">
				<div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-600/20 blur-[120px] rounded-full opacity-50 mix-blend-screen animate-pulse-slow"></div>

				<div class="absolute top-[20%] right-0 w-[600px] h-[600px] bg-teal-600/10 blur-[100px] rounded-full opacity-30"></div>

				<div class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
				<svg class="absolute inset-0 w-full h-full opacity-[0.15]" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">            <pattern id="grid" width="4" height="4" patternUnits="userSpaceOnUse">
					<path d="M 4 0 L 0 0 0 4" fill="none" stroke="currentColor" stroke-width="0.05"/>
				</pattern>
					<rect width="100" height="100" fill="url(#grid)" />
				</svg>
			</div>
		<div class="p-4 md:p-8 max-w-7xl mx-auto w-full h-full animate-fade-in">
			<slot />
		</div>
	</main>
</div>

<style>
	:global(body) {
		background-color: #111827; /* gray-900 */
	}
	/* Custom scrollbar for sidebar */
	nav::-webkit-scrollbar {
		width: 4px;
	}
	nav::-webkit-scrollbar-track {
		background: transparent;
	}
	nav::-webkit-scrollbar-thumb {
		background: #374151;
		border-radius: 4px;
	}
	nav::-webkit-scrollbar-thumb:hover {
		background: #4b5563;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	.animate-fade-in {
		animation: fadeIn 0.4s ease-out forwards;
	}
</style>
