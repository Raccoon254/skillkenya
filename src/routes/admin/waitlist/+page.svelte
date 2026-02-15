<script lang="ts">
	import { onMount } from 'svelte'
	import {
		Search,
		Filter,
		ChevronLeft,
		ChevronRight,
		Trash2,
		Star,
		CheckCircle,
		Clock,
		Users,
		UserCheck,
		Sparkles,
		Calendar, Recycle, RotateCcw,
	} from 'lucide-svelte'

	let entries = []
	let stats = null
	let loading = true
	let error = ''
	let page = 1
	let limit = 50
	let total = 0
	let filter = 'all' // 'all', 'verified', 'pending', 'og'

	async function loadStats() {
		try {
			const response = await fetch('/api/waitlist/stats')
			if (response.ok) {
				stats = await response.json()
			}
		} catch (err) {
			console.error('Failed to load stats:', err)
		}
	}

	async function loadEntries() {
		loading = true
		error = ''

		try {
			let url = `/api/waitlist?page=${page}&limit=${limit}`

			if (filter === 'verified') url += '&verified=true'
			else if (filter === 'pending') url += '&verified=false'
			else if (filter === 'og') url += '&isOG=true'

			const response = await fetch(url)

			if (!response.ok) {
				throw new Error('Failed to load waitlist')
			}

			const data = await response.json()
			entries = data.entries
			total = data.pagination.total
		} catch (err) {
			error = err.message || 'Failed to load waitlist entries'
		} finally {
			loading = false
		}
	}

	async function updateEntry(id, updates) {
		try {
			const response = await fetch(`/api/waitlist/${id}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(updates),
			})

			if (!response.ok) {
				throw new Error('Failed to update entry')
			}

			await loadEntries()
			await loadStats()
		} catch (err) {
			alert('Failed to update entry: ' + err.message)
		}
	}

	async function deleteEntry(id) {
		if (!confirm('Are you sure you want to delete this entry?')) return

		try {
			const response = await fetch(`/api/waitlist/${id}`, {
				method: 'DELETE',
			})

			if (!response.ok) {
				throw new Error('Failed to delete entry')
			}

			await loadEntries()
			await loadStats()
		} catch (err) {
			alert('Failed to delete entry: ' + err.message)
		}
	}

	function formatDate(dateString) {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		})
	}

	function nextPage() {
		if (page * limit < total) {
			page++
			loadEntries()
		}
	}

	function prevPage() {
		if (page > 1) {
			page--
			loadEntries()
		}
	}

	onMount(() => {
		loadStats()
		loadEntries()
	})

	$: if (filter) {
		page = 1
		loadEntries()
	}
</script>

<svelte:head>
	<title>Waitlist Admin - SkillKenya</title>
</svelte:head>

<div class="space-y-8 animate-fade-in">
	<div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
		<div>
			<h1
				class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
			>
				Waitlist Management
			</h1>
			<p class="text-gray-400 mt-1">Manage and verify early access users.</p>
		</div>
		<div class="flex items-center gap-2">
			<button
				on:click={loadEntries}
				class="p-2 px-4 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors flex items-center gap-1"
				title="Refresh"
			>
				Refresh
					<RotateCcw class="w-5 h-5" />
			</button>
		</div>
	</div>

	<!-- Stats Cards -->
	{#if stats}
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
			<div
				class="bg-gray-800/40 border border-gray-700/50 rounded-xl p-5 hover:bg-gray-800/60 transition-colors group"
			>
				<div class="flex items-center justify-between mb-4">
					<div
						class="p-2 bg-blue-500/10 rounded-lg text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors"
					>
						<Users class="w-5 h-5" />
					</div>
					<span class="text-xs font-medium text-gray-500 bg-gray-800 px-2 py-1 rounded-full"
						>Total</span
					>
				</div>
				<div class="text-3xl font-bold text-white mb-1">{stats.total}</div>
				<div class="text-sm text-gray-400">Registered users</div>
			</div>

			<div
				class="bg-gray-800/40 border border-gray-700/50 rounded-xl p-5 hover:bg-gray-800/60 transition-colors group"
			>
				<div class="flex items-center justify-between mb-4">
					<div
						class="p-2 bg-green-500/10 rounded-lg text-green-400 group-hover:bg-green-500 group-hover:text-white transition-colors"
					>
						<UserCheck class="w-5 h-5" />
					</div>
					<span class="text-xs font-medium text-gray-500 bg-gray-800 px-2 py-1 rounded-full"
						>Active</span
					>
				</div>
				<div class="text-3xl font-bold text-white mb-1">{stats.verified}</div>
				<div class="text-sm text-gray-400">Verified emails</div>
			</div>

			<div
				class="bg-gray-800/40 border border-gray-700/50 rounded-xl p-5 hover:bg-gray-800/60 transition-colors group"
			>
				<div class="flex items-center justify-between mb-4">
					<div
						class="p-2 bg-purple-500/10 rounded-lg text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors"
					>
						<Star class="w-5 h-5" />
					</div>
					<span class="text-xs font-medium text-gray-500 bg-gray-800 px-2 py-1 rounded-full"
						>VIP</span
					>
				</div>
				<div class="text-3xl font-bold text-white mb-1">{stats.ogCount}</div>
				<div class="text-sm text-gray-400">OG Status</div>
			</div>

			<div
				class="bg-gray-800/40 border border-gray-700/50 rounded-xl p-5 hover:bg-gray-800/60 transition-colors group"
			>
				<div class="flex items-center justify-between mb-4">
					<div
						class="p-2 bg-pink-500/10 rounded-lg text-pink-400 group-hover:bg-pink-500 group-hover:text-white transition-colors"
					>
						<Clock class="w-5 h-5" />
					</div>
					<span class="text-xs font-medium text-gray-500 bg-gray-800 px-2 py-1 rounded-full"
						>7 Days</span
					>
				</div>
				<div class="text-3xl font-bold text-white mb-1">{stats.recentWeek}</div>
				<div class="text-sm text-gray-400">New signups</div>
			</div>
		</div>
	{/if}

	<!-- Filters & Actions -->
	<div class="flex flex-wrap gap-2">
		{#each ['all', 'verified', 'pending', 'og'] as f}
			<button
				on:click={() => (filter = f)}
				class="px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize
				{filter === f
					? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
					: 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'}"
			>
				{f}
			</button>
		{/each}
	</div>

	<!-- Table -->
	<div
		class="bg-gray-800/30 backdrop-blur border border-gray-700/50 rounded-2xl overflow-hidden shadow-xl"
	>
		{#if loading}
			<div class="p-20 text-center text-gray-400">
				<div
					class="w-10 h-10 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"
				></div>
				<p class="animate-pulse">Loading entries...</p>
			</div>
		{:else if error}
			<div class="p-20 text-center text-red-400 bg-red-900/5">
				<p>{error}</p>
			</div>
		{:else if entries.length === 0}
			<div class="p-20 text-center text-gray-500">
				<Users class="w-12 h-12 mx-auto mb-4 opacity-20" />
				<p>No entries found matching criteria</p>
			</div>
		{:else}
			<div class="overflow-x-auto">
				<table class="w-full text-left border-collapse">
					<thead>
						<tr
							class="border-b border-gray-700/50 bg-gray-900/50 text-xs uppercase tracking-wider text-gray-400 font-medium"
						>
							<th class="px-6 py-4">User</th>
							<th class="px-6 py-4">Status</th>
							<th class="px-6 py-4">Signed Up</th>
							<th class="px-6 py-4 text-right">Actions</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-700/30">
						{#each entries as entry}
							<tr class="group hover:bg-gray-800/30 transition-colors">
								<td class="px-6 py-4">
									<div class="flex items-center gap-3">
										<div
											class="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-sm font-bold text-gray-300 border border-gray-600"
										>
											{(entry.name || entry.email).charAt(0).toUpperCase()}
										</div>
										<div>
											<div class="font-medium text-white">{entry.name || 'Anonymous'}</div>
											<div class="text-sm text-gray-400">{entry.email}</div>
											{#if entry.phone}
												<div class="text-xs text-gray-500 mt-0.5">{entry.phone}</div>
											{/if}
										</div>
									</div>
								</td>
								<td class="px-6 py-4">
									<div class="flex flex-wrap gap-2">
										{#if entry.verified}
											<div
												class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20"
											>
												<CheckCircle class="w-3 h-3" />
												Verified
											</div>
										{:else}
											<div
												class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
											>
												<Clock class="w-3 h-3" />
												Pending
											</div>
										{/if}
										{#if entry.isOG}
											<div
												class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20"
											>
												<Star class="w-3 h-3" />
												OG
											</div>
										{/if}
									</div>
								</td>
								<td class="px-6 py-4">
									<div class="flex items-center gap-2 text-sm text-gray-400">
										<Calendar class="w-4 h-4 opacity-50" />
										{formatDate(entry.createdAt)}
									</div>
									{#if entry.source}
										<div class="text-xs text-gray-500 mt-1 ml-6 capitalize">
											via {entry.source}
										</div>
									{/if}
								</td>
								<td class="px-6 py-4 text-right">
									<div
										class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
									>
										<button
											on:click={() => updateEntry(entry.id, { isOG: !entry.isOG })}
											class="p-2 rounded-lg text-gray-400 hover:text-purple-400 hover:bg-purple-500/10 transition-colors"
											title={entry.isOG ? 'Remove OG status' : 'Mark as OG'}
										>
											<Star class="w-4 h-4 {entry.isOG ? 'fill-current' : ''}" />
										</button>
										<button
											on:click={() => deleteEntry(entry.id)}
											class="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
											title="Delete entry"
										>
											<Trash2 class="w-4 h-4" />
										</button>
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>

			<!-- Pagination -->
			<div
				class="bg-gray-900/30 px-6 py-4 flex items-center justify-between border-t border-gray-700/50"
			>
				<div class="text-sm text-gray-500">
					Showing <span class="text-white font-medium">{(page - 1) * limit + 1}</span> to
					<span class="text-white font-medium">{Math.min(page * limit, total)}</span>
					of <span class="text-white font-medium">{total}</span> entries
				</div>
				<div class="flex gap-2">
					<button
						on:click={prevPage}
						disabled={page === 1}
						class="flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
					>
						<ChevronLeft class="w-4 h-4" />
						Previous
					</button>
					<button
						on:click={nextPage}
						disabled={page * limit >= total}
						class="flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
					>
						Next
						<ChevronRight class="w-4 h-4" />
					</button>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.animate-fade-in {
		animation: fadeIn 0.4s ease-out forwards;
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
</style>
