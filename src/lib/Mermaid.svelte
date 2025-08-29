<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type { MermaidProps, MermaidConfig, MermaidError } from './types/mermaid.types.js';

	interface Props extends MermaidProps {}

	let { string, config = {}, class: className = '', error }: Props = $props();

	let containerElement: HTMLDivElement | undefined = $state();
	let errorObj = $state<MermaidError | undefined>();
	let isLoading = $state(true);
	let mermaidId = $state('');

	// Generate unique ID for each mermaid instance
	onMount(() => {
		mermaidId = `mermaid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
	});

	// Re-render when container is available and we have content
	$effect(() => {
		if (containerElement && mermaidId && string.trim()) {
			renderMermaid();
		}
	});

	async function renderMermaid(): Promise<void> {
		if (!containerElement || !string.trim()) {
			isLoading = false;
			return;
		}

		try {
			isLoading = true;
			errorObj = undefined;

			// Dynamic import to avoid SSR issues - using v10.9.1 which has better module resolution
			const mermaidModule = await import('mermaid');
			const mermaid = mermaidModule.default;

			// Default configuration
			const defaultConfig: MermaidConfig = {
				theme: 'default',
				startOnLoad: false,
				flowchart: {
					useMaxWidth: true,
					htmlLabels: true,
					curve: 'basis'
				}
			};

			// Initialize mermaid with merged config
			const mergedConfig = { ...defaultConfig, ...config };
			mermaid.initialize(mergedConfig);

			// Clear previous content
			containerElement.innerHTML = '';

			// Validate and render the diagram
			const isValidDiagram = await mermaid.parse(string);
			if (!isValidDiagram) {
				throw new Error('Invalid mermaid diagram syntax');
			}

			// Render the diagram
			const { svg } = await mermaid.render(mermaidId, string);

			// Insert the SVG into the container
			containerElement.innerHTML = svg;

			isLoading = false;
		} catch (err) {
			isLoading = false;

			// Type-safe errorObj handling
			if (err instanceof Error) {
				errorObj = {
					message: err.message,
					stack: err.stack
				};
			} else if (typeof err === 'string') {
				errorObj = {
					message: err
				};
			} else {
				errorObj = {
					message: 'An unknown errorObj occurred while rendering the mermaid diagram'
				};
			}

			// Clear container on errorObj
			if (containerElement) {
				containerElement.innerHTML = '';
			}
		}
	}

	onDestroy(() => {
		// Clean up any event listeners or resources if needed
		if (containerElement) {
			containerElement = undefined;
		}
	});
</script>

<div bind:this={containerElement} class={className}>
	{#if errorObj && error}
		{@render error(errorObj)}
	{/if}
</div>
