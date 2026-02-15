<script lang="ts">
	import MarqueeRow from '../../components/MarqueeRow.svelte'
	import { ArrowLeft, ArrowRight } from 'lucide-svelte'
	import WaitlistForm from '$components/WaitlistForm.svelte'
	import { onMount } from 'svelte'

	// Scroll to waitlist section function
	function scrollToWaitlist() {
		const waitlistSection = document.querySelector('#waitlist-section')
		if (waitlistSection) {
			waitlistSection.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
				inline: 'nearest',
			})
		}
	}

	export let data

	$: users = data?.users || []

	// Use only API data
	$: availableUsers = users

	// Dynamically calculate row count based on screen dimensions
	let numRows = 8
	let windowWidth = 0
	let windowHeight = 0

	onMount(() => {
		// Set initial dimensions
		windowWidth = window.innerWidth
		windowHeight = window.innerHeight
		updateRowCount()

		// Update on resize
		const handleResize = () => {
			windowWidth = window.innerWidth
			windowHeight = window.innerHeight
			updateRowCount()
		}

		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	})

	function updateRowCount() {
		// Calculate number of rows dynamically based on viewport dimensions
		// Since the container is rotated 45 degrees and scaled, we need to account for diagonal space

		// Approximate row height including gap (card height + gap)
		const rowHeight = 80 // approximate height in pixels

		// Calculate diagonal dimension (hypotenuse) since container is rotated 45°
		const diagonal = Math.sqrt(windowWidth ** 2 + windowHeight ** 2)

		// Calculate how many rows can fit in the diagonal space
		// Adding some buffer for smooth scrolling
		const calculatedRows = Math.ceil(diagonal / rowHeight) + 6

		// Clamp between reasonable values
		numRows = Math.max(10, Math.min(calculatedRows, 12)) + 8
	}

	// Create rows using slices of the data
	$: rows = Array.from({ length: numRows }).map((_, i) => {
		// Distribute users across rows
		const chunkSize = Math.ceil(availableUsers.length / numRows)
		const start = i * chunkSize
		let chunk = availableUsers.slice(start, start + chunkSize)

		// Ensure some content in rows even if few users
		if (chunk.length === 0 && availableUsers.length > 0) {
			chunk = availableUsers
		}

		// Pad rows to look better if they have very few items
		// Reuse availableUsers to fill up to 10 items if possible
		if (chunk.length < 10 && availableUsers.length > 0) {
			let filler = []
			let needed = 10 - chunk.length

			// filter out current chunk to avoid immediate dupes
			const others = availableUsers.filter((u) => !chunk.includes(u))

			if (others.length >= needed) {
				filler = others.slice(0, needed)
			} else {
				// cycle availableUsers
				while (filler.length < needed) {
					filler = [...filler, ...availableUsers]
				}
				filler = filler.slice(0, needed)
			}
			chunk = [...chunk, ...filler]
		}

		const speeds = [0.5, 0.7, 0.4, 0.6, 0.5, 0.8, 0.3, 0.6, 0.55, 0.65]
		const direction = i % 2 === 0 ? 'left' : 'right'

		return {
			speed: speeds[i] || 0.5,
			direction: direction as 'left' | 'right',
			users: chunk,
		}
	})
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
			class="transform -rotate-45 scale-150 w-[200vw] flex flex-col gap-2 opacity-80 hover:opacity-100 transition-opacity duration-700"
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
				class="group relative pl-6 p-3 bg-gradient-to-r from-blue-800 via-purple-900 to-blue-800 text-white rounded-full font-bold text-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25 hover:scale-105 flex items-center gap-3 mx-auto"
			>
				<!-- Animated Background Overlay -->
				<span
					class="absolute rounded-full inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"
				></span>

				<!-- Button Text -->
				<span class="relative z-10 font-semibold tracking-wide">Join the Movement</span>

				<!-- Right Arrow Icon -->
				<span
					class="relative z-10 w-12 h-12 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-all group-hover:translate-x-1 group-hover:rotate-45 duration-300"
				>
					<ArrowRight />
				</span>

				<!-- Pulse Effect -->
			</button>
		</div>
	</div>
</div>

<div
	id="waitlist-section"
	class="relative py-44 bg-[#0B0F19] text-white overflow-hidden selection:bg-blue-500/30"
>
	<div class="absolute inset-0 z-0 pointer-events-none">
		<div
			class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-700/10 blur-[120px] rounded-full opacity-40 mix-blend-screen animate-pulse-slow"
		></div>

		<div
			class="absolute top-[20%] right-0 w-[600px] h-[600px] bg-teal-900/10 blur-[100px] rounded-full opacity-30"
		></div>

		<div
			class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"
		></div>
		<svg
			class="absolute inset-0 w-full h-full opacity-[0.15]"
			viewBox="0 0 100 100"
			preserveAspectRatio="xMidYMid slice"
		>
			<pattern id="grid" width="4" height="4" patternUnits="userSpaceOnUse">
				<path d="M 4 0 L 0 0 0 4" fill="none" stroke="currentColor" stroke-width="0.05" />
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
