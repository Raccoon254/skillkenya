<script lang="ts">
	import MarqueeRow from '../../components/MarqueeRow.svelte'
	import {ArrowLeft, ArrowRight} from 'lucide-svelte'
	import WaitlistForm from "$components/WaitlistForm.svelte";

	// Scroll to waitlist section function
	function scrollToWaitlist() {
		const waitlistSection = document.querySelector('#waitlist-section');
		if (waitlistSection) {
			waitlistSection.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
				inline: 'nearest'
			});
		}
	}

	// Generate dummy users
	const generateUsers = (count: number) => {
		return Array.from({ length: count }, (_, i) => ({
			id: i,
			name: `User ${Math.floor(Math.random() * 1000)}`,
			handle: `user${Math.floor(Math.random() * 1000)}`,
			avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`,
			isOG: Math.random() > 0.8,
		}))
	}

	const rows: Array<{speed: number, direction: 'left' | 'right', users: any[]}> = [
		{ speed: 0.5, direction: 'left', users: generateUsers(10) },
		{ speed: 0.7, direction: 'right', users: generateUsers(10) },
		{ speed: 0.4, direction: 'left', users: generateUsers(10) },
		{ speed: 0.6, direction: 'right', users: generateUsers(10) },
		{ speed: 0.5, direction: 'left', users: generateUsers(10) },
		{ speed: 0.8, direction: 'right', users: generateUsers(10) },
		{ speed: 0.3, direction: 'left', users: generateUsers(10) },
		{ speed: 0.6, direction: 'right', users: generateUsers(10) },
	]
</script>

<div class="min-h-screen bg-[#0c0e02] text-white relative overflow-hidden font-sans">
	<!-- Navigation -->
	<div class="absolute top-6 left-6 z-50">
		<a
			href="/"
			class="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all flex items-center justify-center"
		>
			<ArrowLeft class="w-6 h-6" />
		</a>
	</div>

	<!-- Content Container -->
	<div class="absolute inset-0 flex items-center justify-center overflow-hidden">
		<!-- Slanted Container: Rotated 45 degrees. Requires being large enough to cover screen -->
		<div
			class="transform -rotate-45 scale-150 w-[200vw] flex flex-col gap-6 opacity-80 hover:opacity-100 transition-opacity duration-700"
		>
			{#each rows as row, i}
				<MarqueeRow speed={row.speed} direction={row.direction} users={row.users} />
			{/each}
		</div>
	</div>

	<!-- Overlay Text (Optional header like in user snippet) -->
	<div
		class="absolute inset-0 pointer-events-none flex items-center justify-center z-40 bg-gradient-to-t from-[#0c0e02]/80 via-transparent to-[#0c0e02]/80"
	>
		<div class="text-center pointer-events-auto">
			<!-- Enhanced CTA Button with Icons -->
			<button
				on:click={() => scrollToWaitlist()}
				class="group relative pl-6 p-3 bg-gradient-to-r from-blue-800 via-purple-900 to-blue-800 text-white rounded-full font-bold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25 hover:scale-105 flex items-center gap-3 mx-auto"
			>
				<!-- Animated Background Overlay -->
				<span class="absolute rounded-full inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></span>

				<!-- Button Text -->
				<span class="relative z-10 font-semibold tracking-wide">Join the Movement</span>

				<!-- Right Arrow Icon -->
				<span class="relative z-10 w-12 h-12 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-all group-hover:translate-x-1 group-hover:rotate-45 duration-300">
					<ArrowRight />
				</span>

				<!-- Pulse Effect -->
			</button>
		</div>
	</div>
</div>

<div id="waitlist-section" class="relative pt-28 bg-[#0B0F19] text-white overflow-hidden min-h-screen selection:bg-blue-500/30">

	<div class="absolute inset-0 z-0 pointer-events-none">
		<div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-700/10 blur-[120px] rounded-full opacity-40 mix-blend-screen animate-pulse-slow"></div>

		<div class="absolute top-[20%] right-0 w-[600px] h-[600px] bg-teal-900/10 blur-[100px] rounded-full opacity-30"></div>

		<div class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
		<svg class="absolute inset-0 w-full h-full opacity-[0.15]" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">            <pattern id="grid" width="4" height="4" patternUnits="userSpaceOnUse">
			<path d="M 4 0 L 0 0 0 4" fill="none" stroke="currentColor" stroke-width="0.05"/>
		</pattern>
			<rect width="100" height="100" fill="url(#grid)" />
		</svg>
	</div>
	<div class="max-w-xl mx-auto text-center">
		<WaitlistForm />
	</div>
</div>

<style>
	:global(body) {
		background-color: #0c0e02;
	}
</style>
