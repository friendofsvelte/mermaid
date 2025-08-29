<script lang="ts">
	import { Mermaid } from '$lib/index.js';

	// Simple flowchart for testing basic functionality
	const simpleFlowchart = `graph TD
		A[Start] --> B{Decision}
		B -->|Yes| C[Action 1]
		B -->|No| D[Action 2]
		C --> E[End]
		D --> E`;
</script>

<h1>Test Case 1: Simple Flowchart</h1>
<div class="test-container">
	<Mermaid string={simpleFlowchart} />
</div>

<style>
	.test-container {
		border: 1px solid #ccc;
		padding: 20px;
		margin: 20px 0;
		border-radius: 8px;
	}
	
	h1 {
		color: #333;
		margin-bottom: 20px;
	}
</style>
