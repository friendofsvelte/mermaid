<script lang="ts">
	import ExampleDisplayCard from '$innerLib/components/ExampleDisplayCard.svelte';
	import { moreExamples, categories, difficulties } from '$innerLib/data/exampleMore.js';
	import type { ExtendedDiagramExample } from '$innerLib/data/exampleMore.js';
	
	let searchTerm = $state('');
	let selectedCategory = $state('all');
	let selectedDifficulty = $state('all');
	let showCodeFor = $state<string | null>(null);

	let filteredExamples = $derived.by(() => {
		let filtered = [...moreExamples];

		// Filter by search term
		if (searchTerm.trim()) {
			const search = searchTerm.toLowerCase();
			filtered = filtered.filter(example => 
				example.title.toLowerCase().includes(search) ||
				example.description.toLowerCase().includes(search) ||
				example.useCase.toLowerCase().includes(search) ||
				example.tags.some(tag => tag.toLowerCase().includes(search))
			);
		}

		// Filter by category
		if (selectedCategory !== 'all') {
			filtered = filtered.filter(example => example.category === selectedCategory);
		}

		// Filter by difficulty
		if (selectedDifficulty !== 'all') {
			filtered = filtered.filter(example => example.difficulty === selectedDifficulty);
		}

		return filtered;
	});

	function toggleCode(exampleId: string): void {
		showCodeFor = showCodeFor === exampleId ? null : exampleId;
	}

	function copyCode(code: string): void {
		navigator.clipboard.writeText(code);
	}
</script>

<svelte:head>
	<title>Mermaid Examples - Comprehensive Diagram Gallery</title>
	<meta name="description" content="Comprehensive collection of Mermaid diagram examples for developers and scientists. Flowcharts, sequence diagrams, Gantt charts, and more." />
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<!-- Header -->
	<header class="bg-white shadow-sm border-b">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
			<div class="flex items-center justify-between">
				<div>
					<h1 class="text-3xl font-bold text-gray-900">Mermaid Examples</h1>
					<p class="text-gray-600 mt-2">Comprehensive diagram gallery for developers and scientists</p>
				</div>
				<a 
					href="/"
					class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
				>
					← Back to Docs
				</a>
			</div>
		</div>
	</header>

	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		<!-- Filters -->
		<div class="bg-white rounded-lg shadow-sm border p-6 mb-8">
			<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
				<!-- Search -->
				<div>
					<label for="search" class="block text-sm font-medium text-gray-700 mb-2">
						Search Examples
					</label>
					<input
						id="search"
						type="text"
						bind:value={searchTerm}
						placeholder="Search by title, description, or tags..."
						class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					/>
				</div>

				<!-- Category Filter -->
				<div>
					<label for="category" class="block text-sm font-medium text-gray-700 mb-2">
						Category
					</label>
					<select
						id="category"
						bind:value={selectedCategory}
						class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					>
						{#each categories as category}
							<option value={category.id}>
								{category.name} ({category.count})
							</option>
						{/each}
					</select>
				</div>

				<!-- Difficulty Filter -->
				<div>
					<label for="difficulty" class="block text-sm font-medium text-gray-700 mb-2">
						Difficulty Level
					</label>
					<select
						id="difficulty"
						bind:value={selectedDifficulty}
						class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					>
						{#each difficulties as difficulty}
							<option value={difficulty.id}>{difficulty.name}</option>
						{/each}
					</select>
				</div>
			</div>

			<!-- Results Count -->
			<div class="mt-4 pt-4 border-t border-gray-200">
				<p class="text-sm text-gray-600">
					Showing {filteredExamples.length} of {moreExamples.length} examples
				</p>
			</div>
		</div>

		<!-- Examples Grid -->
		<div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
			{#each filteredExamples as example (example.id)}
				<ExampleDisplayCard
					{example}
					showCode={showCodeFor === example.id}
					onToggleCode={() => toggleCode(example.id)}
					onCopyCode={() => copyCode(example.code)}
				/>
			{/each}
		</div>

		<!-- No Results -->
		{#if filteredExamples.length === 0}
			<div class="text-center py-12">
				<div class="text-6xl mb-4">🔍</div>
				<h3 class="text-lg font-medium text-gray-900 mb-2">No examples found</h3>
				<p class="text-gray-600 mb-4">Try adjusting your search terms or filters</p>
				<button
					onclick={() => {
						searchTerm = '';
						selectedCategory = 'all';
						selectedDifficulty = 'all';
					}}
					class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
				>
					Clear Filters
				</button>
			</div>
		{/if}
	</div>
</div>

<style>
	/* Ensure diagrams are responsive */
	:global(.mermaid svg) {
		max-width: 100%;
		height: auto;
	}
</style>
