# @friendofsvelte/mermaid

A powerful, type-safe Mermaid.js component for Svelte 5 with SSR support, custom themes, and responsive design.

[![npm version](https://badge.fury.io/js/@friendofsvelte%2Fmermaid.svg)](https://badge.fury.io/js/@friendofsvelte%2Fmermaid)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- ⚡ **Lightning Fast** - Dynamic imports and optimized rendering
- 🎨 **Fully Customizable** - Complete theme control and configuration
- 📱 **Responsive Ready** - Built-in responsive behavior
- 🔒 **Type Safe** - Full TypeScript support with strict typing
- 🧪 **Test Friendly** - E2E tested with Playwright
- 🚀 **SSR Compatible** - Works with SvelteKit SSR and static generation

## Installation

```bash
npm install @friendofsvelte/mermaid
```

## Quick Start

```svelte
<script>
  import { Mermaid } from '@friendofsvelte/mermaid';
  
  const diagram = `graph TD
    A[Start] --> B[Process]
    B --> C[End]`;
</script>

<Mermaid string={diagram} />
```

## Advanced Usage

```svelte
<script>
  import { Mermaid } from '@friendofsvelte/mermaid';
  import type { MermaidConfig } from '@friendofsvelte/mermaid';
  
  const config: MermaidConfig = {
    theme: 'dark',
    flowchart: {
      useMaxWidth: true,
      htmlLabels: true
    }
  };
  
  const diagram = `sequenceDiagram
    participant A as Alice
    participant B as Bob
    A->>B: Hello Bob!
    B-->>A: Hello Alice!`;
</script>

<Mermaid string={diagram} {config} />
```

## API Reference

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `string` | `string` | Yes | The Mermaid diagram definition string |
| `config` | `MermaidConfig` | No | Mermaid configuration options |
| `error` | `Snippet<[MermaidError]>` | No | Error display snippet |

### Types

```typescript
interface MermaidConfig {
  theme?: 'default' | 'dark' | 'forest' | 'neutral' | 'base';
  flowchart?: {
    useMaxWidth?: boolean;
    htmlLabels?: boolean;
    curve?: string;
  };
  sequence?: {
    useMaxWidth?: boolean;
    actorMargin?: number;
  };
  // ... and more
}

interface MermaidError {
  message: string;
  stack?: string;
}
```

## Supported Diagram Types

- **Flowcharts** - Process flows and decision trees
- **Sequence Diagrams** - API interactions and workflows
- **Gantt Charts** - Project timelines and scheduling
- **User Journey Maps** - UX flows and customer experience
- **Entity Relationship Diagrams** - Database schemas
- **Git Graphs** - Version control workflows
- **Pie Charts** - Data visualization
- **Class Diagrams** - Object-oriented design

## Examples

### Custom Theme

```svelte
<script>
  import { Mermaid } from '@friendofsvelte/mermaid';
  
  const customConfig = {
    theme: 'dark',
    flowchart: {
      useMaxWidth: true,
      htmlLabels: true,
      curve: 'basis'
    }
  };
</script>

<Mermaid string={diagram} config={customConfig} />
```

### Error Handling

```svelte
<script>
  import { Mermaid } from '@friendofsvelte/mermaid';
  
  const invalidDiagram = `invalid syntax here`;
</script>

<Mermaid string={invalidDiagram}>
  {#snippet error(errorObj)}
    <div class="error-message">
      <p>Failed to render diagram: {errorObj.message}</p>
    </div>
  {/snippet}
</Mermaid>
```

## Development

```bash
# Clone the repository
git clone https://github.com/friendofsvelte/mermaid.git
cd mermaid

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm run test

# Build library
npm run build
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT © [Friend of Svelte](https://github.com/friendofsvelte)

## Links

- [Documentation](https://github.com/friendofsvelte/mermaid)
- [Examples](https://github.com/friendofsvelte/mermaid/tree/main/src/routes/test)
- [Issues](https://github.com/friendofsvelte/mermaid/issues)
- [Mermaid.js Documentation](https://mermaid.js.org/)
- [Svelte](https://svelte.dev/)

---

Built with ❤️ for the Svelte community.