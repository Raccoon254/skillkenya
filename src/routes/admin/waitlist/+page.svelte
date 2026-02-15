<script lang="ts">
	import { onMount } from 'svelte';

	let entries = [];
	let stats = null;
	let loading = true;
	let error = '';
	let page = 1;
	let limit = 50;
	let total = 0;
	let filter = 'all'; // 'all', 'verified', 'pending', 'og'

	async function loadStats() {
		try {
			const response = await fetch('/api/waitlist/stats');
			if (response.ok) {
				stats = await response.json();
			}
		} catch (err) {
			console.error('Failed to load stats:', err);
		}
	}

	async function loadEntries() {
		loading = true;
		error = '';

		try {
			let url = `/api/waitlist?page=${page}&limit=${limit}`;

			if (filter === 'verified') url += '&verified=true';
			else if (filter === 'pending') url += '&verified=false';
			else if (filter === 'og') url += '&isOG=true';

			const response = await fetch(url);

			if (!response.ok) {
				throw new Error('Failed to load waitlist');
			}

			const data = await response.json();
			entries = data.entries;
			total = data.pagination.total;
		} catch (err) {
			error = err.message || 'Failed to load waitlist entries';
		} finally {
			loading = false;
		}
	}

	async function updateEntry(id, updates) {
		try {
			const response = await fetch(`/api/waitlist/${id}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(updates)
			});

			if (!response.ok) {
				throw new Error('Failed to update entry');
			}

			await loadEntries();
			await loadStats();
		} catch (err) {
			alert('Failed to update entry: ' + err.message);
		}
	}

	async function deleteEntry(id) {
		if (!confirm('Are you sure you want to delete this entry?')) return;

		try {
			const response = await fetch(`/api/waitlist/${id}`, {
				method: 'DELETE'
			});

			if (!response.ok) {
				throw new Error('Failed to delete entry');
			}

			await loadEntries();
			await loadStats();
		} catch (err) {
			alert('Failed to delete entry: ' + err.message);
		}
	}

	function formatDate(dateString) {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	function nextPage() {
		if (page * limit < total) {
			page++;
			loadEntries();
		}
	}

	function prevPage() {
		if (page > 1) {
			page--;
			loadEntries();
		}
	}

	onMount(() => {
		loadStats();
		loadEntries();
	});

	$: if (filter) {
		page = 1;
		loadEntries();
	}
</script>

<svelte:head>
	<title>Waitlist Admin - SkillKenya</title>
</svelte:head>

<div class="min-h-screen bg-gray-900 text-white p-8">
	<div class="max-w-7xl mx-auto">
		<div class="mb-8">
			<h1 class="text-4xl font-bold mb-2">Waitlist Management</h1>
			<p class="text-gray-400">Manage and view all waitlist entries</p>
		</div>

		<!-- Stats Cards -->
		{#if stats}
			<div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
				<div class="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
					<div class="text-3xl font-bold text-blue-400">{stats.total}</div>
					<div class="text-gray-400 text-sm">Total Entries</div>
				</div>
				<div class="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
					<div class="text-3xl font-bold text-green-400">{stats.verified}</div>
					<div class="text-gray-400 text-sm">Verified</div>
				</div>
				<div class="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
					<div class="text-3xl font-bold text-yellow-400">{stats.ogCount}</div>
					<div class="text-gray-400 text-sm">OG Users</div>
				</div>
				<div class="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
					<div class="text-3xl font-bold text-purple-400">{stats.recentWeek}</div>
					<div class="text-gray-400 text-sm">Last 7 Days</div>
				</div>
			</div>
		{/if}

		<!-- Filters -->
		<div class="mb-6 flex gap-2">
			<button
				on:click={() => filter = 'all'}
				class="px-4 py-2 rounded-lg {filter === 'all' ? 'bg-blue-600' : 'bg-gray-800 hover:bg-gray-700'} transition-colors"
			>
				All
			</button>
			<button
				on:click={() => filter = 'verified'}
				class="px-4 py-2 rounded-lg {filter === 'verified' ? 'bg-blue-600' : 'bg-gray-800 hover:bg-gray-700'} transition-colors"
			>
				Verified
			</button>
			<button
				on:click={() => filter = 'pending'}
				class="px-4 py-2 rounded-lg {filter === 'pending' ? 'bg-blue-600' : 'bg-gray-800 hover:bg-gray-700'} transition-colors"
			>
				Pending
			</button>
			<button
				on:click={() => filter = 'og'}
				class="px-4 py-2 rounded-lg {filter === 'og' ? 'bg-blue-600' : 'bg-gray-800 hover:bg-gray-700'} transition-colors"
			>
				OG Users
			</button>
		</div>

		<!-- Table -->
		<div class="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden">
			{#if loading}
				<div class="p-12 text-center text-gray-400">
					<div class="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
					Loading...
				</div>
			{:else if error}
				<div class="p-12 text-center text-red-400">
					{error}
				</div>
			{:else if entries.length === 0}
				<div class="p-12 text-center text-gray-400">
					No entries found
				</div>
			{:else}
				<div class="overflow-x-auto">
					<table class="w-full">
						<thead class="bg-gray-800/80">
							<tr>
								<th class="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
								<th class="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
								<th class="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Phone</th>
								<th class="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
								<th class="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Joined</th>
								<th class="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
							</tr>
						</thead>
						<tbody class="divide-y divide-gray-700">
							{#each entries as entry}
								<tr class="hover:bg-gray-800/30">
									<td class="px-6 py-4 whitespace-nowrap">
										<div class="text-sm font-medium">{entry.email}</div>
										{#if entry.source}
											<div class="text-xs text-gray-500">{entry.source}</div>
										{/if}
									</td>
									<td class="px-6 py-4 whitespace-nowrap text-sm">
										{entry.name || '-'}
									</td>
									<td class="px-6 py-4 whitespace-nowrap text-sm">
										{entry.phone || '-'}
									</td>
									<td class="px-6 py-4 whitespace-nowrap">
										<div class="flex gap-2">
											{#if entry.verified}
												<span class="px-2 py-1 text-xs font-semibold bg-green-500/20 text-green-400 rounded">
													Verified
												</span>
											{:else}
												<span class="px-2 py-1 text-xs font-semibold bg-yellow-500/20 text-yellow-400 rounded">
													Pending
												</span>
											{/if}
											{#if entry.isOG}
												<span class="px-2 py-1 text-xs font-semibold bg-purple-500/20 text-purple-400 rounded">
													OG
												</span>
											{/if}
										</div>
									</td>
									<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
										{formatDate(entry.createdAt)}
									</td>
									<td class="px-6 py-4 whitespace-nowrap text-sm">
										<div class="flex gap-2">
											<button
												on:click={() => updateEntry(entry.id, { isOG: !entry.isOG })}
												class="text-purple-400 hover:text-purple-300"
												title={entry.isOG ? 'Remove OG status' : 'Mark as OG'}
											>
												⭐
											</button>
											<button
												on:click={() => deleteEntry(entry.id)}
												class="text-red-400 hover:text-red-300"
												title="Delete entry"
											>
												🗑️
											</button>
										</div>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>

				<!-- Pagination -->
				<div class="bg-gray-800/80 px-6 py-4 flex items-center justify-between border-t border-gray-700">
					<div class="text-sm text-gray-400">
						Showing {(page - 1) * limit + 1} to {Math.min(page * limit, total)} of {total} entries
					</div>
					<div class="flex gap-2">
						<button
							on:click={prevPage}
							disabled={page === 1}
							class="px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors"
						>
							Previous
						</button>
						<button
							on:click={nextPage}
							disabled={page * limit >= total}
							class="px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors"
						>
							Next
						</button>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
