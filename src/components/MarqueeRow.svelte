<script lang="ts">
	import { onMount, onDestroy } from 'svelte'
	import {Crown} from "lucide-svelte";

	export let speed = 1 // pixels per frame, approx
	export let direction: 'left' | 'right' = 'left'
	export let users: any[] = []

	let container: HTMLDivElement
	let content: HTMLDivElement
	let animationId: number
	let position = 0
	let isHovered = false

	// Duplicate users to ensure smooth infinite scroll
	// We need enough copies to fill width + buffer
	// For simplicity, we'll just triple the list
	// Ideally we'd measure and clone dynamically, but distinct simple list is fine for now
	$: displayUsers = [...users, ...users, ...users, ...users]

	function animate() {
		if (!container || !content) return

		const currentSpeed = isHovered ? speed * 0.05 : speed

		if (direction === 'left') {
			position -= currentSpeed
		} else {
			position += currentSpeed
		}

		// Reset logic
		const contentWidth = content.scrollWidth / 4 // approximate single set width

		if (direction === 'left' && Math.abs(position) >= contentWidth) {
			position = 0
		} else if (direction === 'right' && position >= contentWidth) {
			position = 0 // or reset to start?
			// actually for right movement, we start at -contentWidth and move directly to 0
			// but let's keep simple translation logic
		}

		// For infinite right scroll:
		if (direction === 'right' && position > 0) {
			position = -contentWidth
		}

		content.style.transform = `translateX(${position}px) translateZ(0)`
		animationId = requestAnimationFrame(animate)
	}

	onMount(() => {
		if (direction === 'right' && content) {
			// Start offset for right movement so we don't see gap
			const contentWidth = content.scrollWidth / 4
			position = -contentWidth
		}
		animationId = requestAnimationFrame(animate)
	})

	onDestroy(() => {
		if (animationId) cancelAnimationFrame(animationId)
	})
</script>

<div
	class="overflow-hidden w-full whitespace-nowrap py-4"
	bind:this={container}
	on:mouseenter={() => (isHovered = true)}
	on:mouseleave={() => (isHovered = false)}
	role="marquee"
	aria-label="Scrolling list of users"
>
	<div
		class="inline-flex gap-4 transform-gpu"
		bind:this={content}
		style="will-change: transform; backface-visibility: hidden;"
	>
		{#each displayUsers as user}
			<div
				class="inline-flex cursor-pointer hover:scale-105 transition-all duration-500 items-center gap-3 bg-gray-900 border border-gray-800 p-3 rounded-2xl min-w-[200px] hover:border-blue-500/50 overflow-hidden"
			>
				<img
					src={user.avatar}
					alt={user.name}
					class="w-10 h-10 aspect-square rounded-full bg-gray-800 object-cover"
					loading="lazy"
				/>
				<div class="flex flex-col max-w-[60%] overflow-hidden  pr-2 text-ellipsis text-nowrap">
					<span class="text-white font-medium text-sm text-ellipsis text-nowrap">{user.name}</span>
					<span class="text-gray-500 text-xs">@{user.handle}</span>
				</div>
				{#if user.isOG}
					<span class="ml-auto text-amber-500">
						<Crown />
					</span>
				{/if}
			</div>
		{/each}
	</div>
</div>
