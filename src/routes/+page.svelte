<script lang="ts">
	import { onMount } from 'svelte';
	import { Mermaid } from '$lib/index.js';
	import type { MermaidConfig } from '$lib/index.js';
	import Navigation from '$innerLib/components/Navigation.svelte';
	import FeatureGrid from '$innerLib/components/FeatureGrid.svelte';
	import ExampleCard from '$innerLib/components/ExampleCard.svelte';
	import CodeBlock from '$innerLib/components/CodeBlock.svelte';
	import { diagramExamples, hackTips } from '$innerLib/data/examples.js';
	import { installationCode, basicUsageCode, advancedUsageCode } from '$innerLib/data/codeExamples.js';

	const navItems = [
		{ id: 'hero', label: 'Home', href: '#hero' },
		{ id: 'features', label: 'Features', href: '#features' },
		{ id: 'examples', label: 'Examples', href: '#examples' },
		{ id: 'installation', label: 'Installation', href: '#installation' },
		{ id: 'api', label: 'API', href: '#api' },
		{ id: 'hacks', label: 'Pro Tips', href: '#hacks' }
	];

	const features = [
		{
			icon: '⚡',
			title: 'Lightning Fast',
			description: 'Dynamic imports and optimized rendering for minimal bundle impact and fast load times.',
			highlight: true
		},
		{
			icon: '🎨',
			title: 'Fully Customizable',
			description: 'Complete theme control, custom CSS, and configuration options for any design system.'
		},
		{
			icon: '📱',
			title: 'Responsive Ready',
			description: 'Built-in responsive behavior with container queries and mobile-first design principles.'
		},
		{
			icon: '🔒',
			title: 'Type Safe',
			description: 'Full TypeScript support with strict typing and comprehensive type definitions.'
		},
		{
			icon: '🧪',
			title: 'Test Friendly',
			description: 'E2E tested with Playwright, easy to mock and test in your own applications.'
		},
		{
			icon: '🚀',
			title: 'SSR Compatible',
			description: 'Works seamlessly with SvelteKit SSR, static generation, and client-side rendering.'
		}
	];

	let activeSection = $state('hero');

	// Randomly select 4 examples from diagramExamples
	const randomExamples = $derived.by(() => {
		const shuffled = [...diagramExamples].sort(() => Math.random() - 0.5);
		return shuffled.slice(0, 4);
	});

	const heroMermaid = `graph LR
    A[📝 Write Diagram] --> B[🎨 Render Beautiful]
    B --> C[📱 Display Anywhere]
    C --> D[✨ Profit!]
    
    style A fill:#e1f5fe
    style B fill:#f3e5f5
    style C fill:#e8f5e8
    style D fill:#fff3e0`;



	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						activeSection = entry.target.id;
					}
				});
			},
			{ threshold: 0.3 }
		);

		navItems.forEach((item) => {
			const element = document.getElementById(item.id);
			if (element) observer.observe(element);
		});

		return () => observer.disconnect();
	});
</script>

<svelte:head>
	<title>Mermaid Svelte - Beautiful Diagrams for Svelte Applications</title>
	<meta name="description" content="A powerful, type-safe Mermaid.js component for Svelte 5 with SSR support, custom themes, and responsive design." />
</svelte:head>

<Navigation items={navItems} {activeSection} />

<main class="bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen">
	<!-- Hero Section -->
	<section id="hero" class="pt-20 pb-16">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-12">
				<h1 class="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
					Beautiful Diagrams for
					<span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
						Svelte 5
					</span>
				</h1>
				<p class="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
					A powerful, type-safe Mermaid.js component with SSR support, custom themes, and responsive design. 
					Perfect for documentation, flowcharts, and system diagrams.
				</p>
				<div class="flex flex-col sm:flex-row gap-4 justify-center">
					<button 
						onclick={() => document.getElementById('installation')?.scrollIntoView({ behavior: 'smooth' })}
						class="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
					>
						Get Started
					</button>
					<a 
						href="/examples" 
						class="px-8 py-3 border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold rounded-lg transition-colors"
					>
						View Examples
					</a>
				</div>
			</div>

			<div class="max-w-4xl mx-auto">
				<div class="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
					<Mermaid string={heroMermaid} />
				</div>
			</div>
		</div>
	</section>

	<!-- Features Section -->
	<section id="features" class="py-16 bg-white">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-12">
				<h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
					Why Choose Mermaid Svelte?
				</h2>
				<p class="text-lg text-gray-600 max-w-2xl mx-auto">
					Built specifically for modern Svelte applications with performance, developer experience, and flexibility in mind.
				</p>
			</div>
			<FeatureGrid {features} />
		</div>
	</section>

	<!-- Examples Section -->
	<section id="examples" class="py-16 bg-gray-50">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-12">
				<h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
					Diagram Examples
				</h2>
				<p class="text-lg text-gray-600 max-w-2xl mx-auto">
					From simple flowcharts to complex system architectures - see what's possible.
				</p>
			</div>

			<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
				{#each randomExamples as example}
					<ExampleCard
						title={example.title}
						description={example.description}
						mermaidCode={example.code}
						config={example.config}
					/>
				{/each}
			</div>

			<div class="text-center mt-12">
				<a 
					href="/examples"
					class="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
				>
					View All Examples
					<svg class="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
						<path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
					</svg>
				</a>
			</div>
		</div>
	</section>

	<!-- Installation Section -->
	<section id="installation" class="py-16 bg-white">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-12">
				<h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
					Quick Installation
				</h2>
				<p class="text-lg text-gray-600 max-w-2xl mx-auto">
					Get up and running in seconds with npm or your favorite package manager.
				</p>
			</div>

			<div class="max-w-4xl mx-auto space-y-8">
				<div>
					<h3 class="text-xl font-semibold text-gray-900 mb-4">1. Install the Package</h3>
					<CodeBlock code={installationCode} language="bash" title="Terminal" />
				</div>

				<div>
					<h3 class="text-xl font-semibold text-gray-900 mb-4">2. Basic Usage</h3>
					<CodeBlock code={basicUsageCode} language="svelte" title="App.svelte" />
				</div>

				<div>
					<h3 class="text-xl font-semibold text-gray-900 mb-4">3. Advanced Configuration</h3>
					<CodeBlock code={advancedUsageCode} language="svelte" title="Advanced.svelte" />
				</div>
			</div>
		</div>
	</section>

	<!-- API Section -->
	<section id="api" class="py-16 bg-gray-50">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-12">
				<h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
					API Reference
				</h2>
				<p class="text-lg text-gray-600 max-w-2xl mx-auto">
					Complete TypeScript definitions and configuration options.
				</p>
			</div>

			<div class="max-w-4xl mx-auto">
				<div class="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
					<h3 class="text-xl font-semibold text-gray-900 mb-6">Component Props</h3>
					
					<div class="overflow-x-auto">
						<table class="w-full text-sm">
							<thead>
								<tr class="border-b border-gray-200">
									<th class="text-left py-3 px-4 font-semibold text-gray-900">Prop</th>
									<th class="text-left py-3 px-4 font-semibold text-gray-900">Type</th>
									<th class="text-left py-3 px-4 font-semibold text-gray-900">Required</th>
									<th class="text-left py-3 px-4 font-semibold text-gray-900">Description</th>
								</tr>
							</thead>
							<tbody class="divide-y divide-gray-100">
								<tr>
									<td class="py-3 px-4 font-mono text-blue-600">string</td>
									<td class="py-3 px-4 font-mono text-gray-600">string</td>
									<td class="py-3 px-4 text-red-600">Yes</td>
									<td class="py-3 px-4 text-gray-700">The Mermaid diagram definition string</td>
								</tr>
								<tr>
									<td class="py-3 px-4 font-mono text-blue-600">config</td>
									<td class="py-3 px-4 font-mono text-gray-600">MermaidConfig</td>
									<td class="py-3 px-4 text-gray-500">No</td>
									<td class="py-3 px-4 text-gray-700">Mermaid configuration options</td>
								</tr>
								<tr>
									<td class="py-3 px-4 font-mono text-blue-600">error</td>
									<td class="py-3 px-4 font-mono text-gray-600">Snippet&lt;[MermaidError]&gt;</td>
									<td class="py-3 px-4 text-gray-500">No</td>
									<td class="py-3 px-4 text-gray-700">Error display snippet</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Pro Tips Section -->
	<section id="hacks" class="py-16 bg-white">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-12">
				<h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
					Pro Tips & Hacks
				</h2>
				<p class="text-lg text-gray-600 max-w-2xl mx-auto">
					Advanced techniques and best practices from the Mermaid Svelte community.
				</p>
			</div>

			<div class="max-w-4xl mx-auto space-y-8">
				{#each hackTips as tip}
					<div class="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
						<h3 class="text-xl font-semibold text-gray-900 mb-3">{tip.title}</h3>
						<p class="text-gray-600 mb-4">{tip.description}</p>
						<CodeBlock code={tip.code} language="javascript" />
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Footer -->
	<footer class="bg-gray-900 text-white py-12">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
				<div>
					<div class="flex items-center space-x-2 mb-4">
						<div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
							<svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
							</svg>
						</div>
						<span class="text-xl font-bold">Mermaid Svelte</span>
					</div>
					<p class="text-gray-400">
						Beautiful, type-safe diagrams for modern Svelte applications.
					</p>
				</div>
				
				<div>
					<h4 class="font-semibold mb-4">Resources</h4>
					<ul class="space-y-2 text-gray-400">
						<li><a href="/test/flowchart" class="hover:text-white transition-colors">Examples</a></li>
						<li><a href="https://mermaid.js.org/" target="_blank" rel="noopener" class="hover:text-white transition-colors">Mermaid.js Docs</a></li>
						<li><a href="https://svelte.dev/" target="_blank" rel="noopener" class="hover:text-white transition-colors">Svelte</a></li>
					</ul>
				</div>
				
				<div>
					<h4 class="font-semibold mb-4">Community</h4>
					<ul class="space-y-2 text-gray-400">
						<li>Built with ❤️ for Svelte</li>
						<li>Open source & MIT licensed</li>
						<li>Community driven development</li>
					</ul>
				</div>
			</div>
			
			<div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
				<p>&copy; 2024 Mermaid Svelte. Built with ❤️ for the Svelte community.</p>
			</div>
		</div>
	</footer>
</main>