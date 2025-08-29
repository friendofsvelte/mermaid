// Component exports
export { default as CodeBlock } from './components/CodeBlock.svelte';
export { default as ExampleCard } from './components/ExampleCard.svelte';
export { default as ExampleDisplayCard } from './components/ExampleDisplayCard.svelte';
export { default as FeatureGrid } from './components/FeatureGrid.svelte';
export { default as Navigation } from './components/Navigation.svelte';

// Data exports
export { diagramExamples, hackTips } from './data/examples.js';
export type { DiagramExample } from './data/examples.js';
export { installationCode, basicUsageCode, advancedUsageCode } from './data/codeExamples.js';
export { moreExamples, categories, difficulties } from './data/exampleMore.js';
export type { ExtendedDiagramExample } from './data/exampleMore.js';
