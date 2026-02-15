<script>
	import '../app.css'
	import { goto } from '$app/navigation'

	let shiftPresses = []
	const SHIFT_THRESHOLD = 1000 // 1 second to press shift 3 times

	function handleKeydown(event) {
		if (event.key === 'Shift') {
			const now = Date.now()
			shiftPresses = [...shiftPresses, now].filter((time) => now - time < SHIFT_THRESHOLD)

			if (shiftPresses.length >= 3) {
				goto('/admin')
				shiftPresses = [] // Reset after trigger
			}
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<slot />
