<script lang="ts">
	import { Mermaid } from '$lib/index.js';
	import type { MermaidConfig } from '$lib/index.js';
	import CodeBlock from './CodeBlock.svelte';

	interface Props {
		title: string;
		description: string;
		mermaidCode: string;
		config?: MermaidConfig;
		showCode?: boolean;
	}

	let { title, description, mermaidCode, config, showCode = true }: Props = $props();

	let showCodeBlock = $state(false);
</script>

<div class="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
	<div class="p-6">
		<div class="flex items-center justify-between mb-4">
			<div>
				<h3 class="text-xl font-semibold text-gray-900">{title}</h3>
				<p class="text-gray-600 mt-1">{description}</p>
			</div>
			{#if showCode}
				<button
					onclick={() => showCodeBlock = !showCodeBlock}
					class="px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-md transition-colors"
				>
					{showCodeBlock ? 'Hide Code' : 'Show Code'}
				</button>
			{/if}
		</div>

		<div class="border border-gray-200 rounded-lg p-4 bg-gray-50">
			<Mermaid string={mermaidCode} {config} />
		</div>

		{#if showCode && showCodeBlock}
			<div class="mt-4">
				<CodeBlock 
					code={mermaidCode} 
					language="mermaid" 
					title="Mermaid Syntax"
				/>
				{#if config}
					<div class="mt-3">
						<CodeBlock 
							code={JSON.stringify(config, null, 2)} 
							language="json" 
							title="Configuration"
						/>
					</div>
				{/if}
			</div>
		{/if}
	</div>
</div>
