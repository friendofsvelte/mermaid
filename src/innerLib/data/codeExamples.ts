export const installationCode = 'npm install @friendofsvelte/mermaid';

export const basicUsageCode = `<script>
  import { Mermaid } from '@friendofsvelte/mermaid';
  
  const diagram = \`graph TD
    A[Start] --> B[Process]
    B --> C[End]\`;
</script>

<Mermaid string={diagram} />`;

export const advancedUsageCode = `<script>
  import { Mermaid } from '@friendofsvelte/mermaid';
  import type { MermaidConfig } from '@friendofsvelte/mermaid';
  
  const config: MermaidConfig = {
    theme: 'dark',
    flowchart: {
      useMaxWidth: true,
      htmlLabels: true
    }
  };
  
  function handleError(error) {
    console.error('Diagram error:', error);
  }
</script>

<Mermaid 
  string={diagram} 
  {config}
  error={handleError}
/>`;
