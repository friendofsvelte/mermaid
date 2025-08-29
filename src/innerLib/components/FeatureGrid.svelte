<script lang="ts">
	interface Feature {
		icon: string;
		title: string;
		description: string;
		highlight?: boolean;
	}

	interface Props {
		features: Feature[];
	}

	let { features }: Props = $props();
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
	{#each features as feature}
		<div class="bg-white rounded-lg p-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow {feature.highlight ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}">
			<div class="text-3xl mb-4">{feature.icon}</div>
			<h3 class="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
			<p class="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
		</div>
	{/each}
</div>
