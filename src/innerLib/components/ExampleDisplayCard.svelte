<script lang="ts">
	import { Mermaid } from '$lib/index.js';
	import CodeBlock from './CodeBlock.svelte';
	import type { ExtendedDiagramExample } from '../data/exampleMore.js';

	interface Props {
		example: ExtendedDiagramExample;
		showCode: boolean;
		onToggleCode: () => void;
		onCopyCode: () => void;
	}

	let { example, showCode, onToggleCode, onCopyCode }: Props = $props();

	function getDifficultyColor(difficulty: string): string {
		switch (difficulty) {
			case 'beginner': return 'bg-green-100 text-green-800';
			case 'intermediate': return 'bg-yellow-100 text-yellow-800';
			case 'advanced': return 'bg-red-100 text-red-800';
			default: return 'bg-gray-100 text-gray-800';
		}
	}

	function getCategoryIcon(category: string): string {
		const icons: Record<string, string> = {
			flowchart: '📊',
			sequence: '🔄',
			gantt: '📅',
			er: '🗃️',
			journey: '🗺️',
			state: '⚡',
			gitgraph: '🌳',
			class: '🏗️',
			mindmap: '🧠',
			pie: '🥧'
		};
		return icons[category] || '📋';
	}
</script>

<div class="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
	<!-- Example Header -->
	<div class="p-6 border-b border-gray-200">
		<div class="flex items-start justify-between mb-3">
			<div class="flex items-center space-x-2">
				<span class="text-2xl">{getCategoryIcon(example.category)}</span>
				<div>
					<h3 class="text-lg font-semibold text-gray-900">{example.title}</h3>
					<p class="text-sm text-gray-600">{example.description}</p>
				</div>
			</div>
			<span class="px-2 py-1 text-xs font-medium rounded-full {getDifficultyColor(example.difficulty)}">
				{example.difficulty}
			</span>
		</div>

		<!-- Tags -->
		<div class="flex flex-wrap gap-2 mb-3">
			{#each example.tags as tag}
				<span class="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-md">
					{tag}
				</span>
			{/each}
		</div>

		<!-- Use Case -->
		<p class="text-sm text-gray-500">
			<span class="font-medium">Use Case:</span> {example.useCase}
		</p>
	</div>

	<!-- Diagram Display -->
	<div class="p-6">
		<div class="bg-gray-50 rounded-lg p-4 mb-4 overflow-auto">
			<Mermaid string={example.code} config={example.config} />
		</div>

		<!-- Action Buttons -->
		<div class="flex items-center justify-between">
			<button
				onclick={onToggleCode}
				class="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
			>
				<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
					<path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
				</svg>
				<span>{showCode ? 'Hide Code' : 'Show Code'}</span>
			</button>

			<button
				onclick={onCopyCode}
				class="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-blue-700 bg-blue-100 hover:bg-blue-200 rounded-md transition-colors"
			>
				<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
					<path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
					<path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>
				</svg>
				<span>Copy Code</span>
			</button>
		</div>
	</div>

	<!-- Code Block (Collapsible) -->
	{#if showCode}
		<div class="border-t border-gray-200 p-6">
			<CodeBlock 
				code={example.code} 
				language="mermaid" 
				title="Mermaid Syntax"
			/>
			{#if example.config}
				<div class="mt-4">
					<CodeBlock 
						code={JSON.stringify(example.config, null, 2)} 
						language="json" 
						title="Configuration"
					/>
				</div>
			{/if}
		</div>
	{/if}
</div>
