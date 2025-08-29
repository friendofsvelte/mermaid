<script lang="ts">
	interface NavItem {
		id: string;
		label: string;
		href: string;
	}

	interface Props {
		items: NavItem[];
		activeSection?: string;
	}

	let { items, activeSection = '' }: Props = $props();

	function scrollToSection(id: string): void {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	}
</script>

<nav class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between h-16">
			<div class="flex items-center space-x-2">
				<div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
					<svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
						<path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
					</svg>
				</div>
				<span class="text-xl font-bold text-gray-900">Mermaid Svelte</span>
			</div>

			<div class="hidden md:flex items-center space-x-8">
				{#each items as item}
					<button
						onclick={() => scrollToSection(item.id)}
						class="text-sm font-medium transition-colors {activeSection === item.id ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}"
					>
						{item.label}
					</button>
				{/each}
			</div>

			<div class="flex items-center space-x-4">
				<a
					href="/test/flowchart"
					class="text-sm text-gray-600 hover:text-gray-900 transition-colors"
				>
					Examples
				</a>
				<a
					href="https://github.com/your-username/@friendofsvelte/mermaid"
					target="_blank"
					rel="noopener noreferrer"
					class="text-gray-600 hover:text-gray-900 transition-colors"
					aria-label="View source code on GitHub"
				>
					<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
						<path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd"></path>
					</svg>
				</a>
			</div>
		</div>
	</div>
</nav>
