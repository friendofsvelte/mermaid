<script lang="ts">
	import { Mermaid } from '$lib/index.js';
	import type { MermaidConfig } from '$lib/index.js';

	// Sequence diagram for testing different diagram types
	const sequenceDiagram = `sequenceDiagram
		participant A as Alice
		participant B as Bob
		participant C as Charlie
		
		A->>B: Hello Bob!
		B-->>A: Hello Alice!
		A->>C: Hi Charlie!
		C-->>A: Hey Alice!
		B->>C: Bob to Charlie
		C-->>B: Charlie to Bob`;

	// Custom configuration for testing config props
	const config: MermaidConfig = {
		theme: 'dark',
		sequence: {
			actorMargin: 50,
			noteMargin: 10,
			messageMargin: 35
		}
	};
</script>

<h1>Test Case 2: Sequence Diagram with Config</h1>
<div class="test-container">
	<Mermaid string={sequenceDiagram} {config} />
</div>

<style>
	.test-container {
		border: 1px solid #ccc;
		padding: 20px;
		margin: 20px 0;
		border-radius: 8px;
		background: #f5f5f5;
	}
	
	h1 {
		color: #333;
		margin-bottom: 20px;
	}
</style>
