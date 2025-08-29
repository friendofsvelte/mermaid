<script lang="ts">
	interface Props {
		code: string;
		language?: string;
		title?: string;
		copyable?: boolean;
	}

	let { code, language = 'javascript', title, copyable = true }: Props = $props();

	let copied = $state(false);

	async function copyToClipboard(): Promise<void> {
		try {
			await navigator.clipboard.writeText(code);
			copied = true;
			setTimeout(() => {
				copied = false;
			}, 2000);
		} catch (err) {
			console.error('Failed to copy code:', err);
		}
	}
</script>

<div class="relative group">
	{#if title}
		<div class="flex items-center justify-between bg-gray-800 text-gray-200 px-4 py-2 text-sm font-medium rounded-t-lg border-b border-gray-700">
			<span>{title}</span>
			<span class="text-xs text-gray-400 uppercase">{language}</span>
		</div>
	{/if}
	
	<div class="relative">
		<pre class="bg-gray-900 text-gray-100 p-4 overflow-x-auto text-sm leading-relaxed {title ? 'rounded-b-lg' : 'rounded-lg'}"><code class="language-{language}">{code}</code></pre>
		
		{#if copyable}
			<button
				onclick={copyToClipboard}
				class="absolute top-3 right-3 p-2 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
				title="Copy to clipboard"
			>
				{#if copied}
					<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
						<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
					</svg>
				{:else}
					<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
						<path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
						<path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>
					</svg>
				{/if}
			</button>
		{/if}
	</div>
</div>
