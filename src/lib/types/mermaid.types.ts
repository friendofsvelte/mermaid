import type { Snippet } from "svelte";
import type { MermaidConfig } from "mermaid";

// Re-export MermaidConfig for convenience
export type { MermaidConfig };

/**
 * Mermaid render options
 */
export interface MermaidRenderOptions {
	/** Element ID for rendering */
	id: string;
	/** Mermaid diagram definition string */
	definition: string;
	/** Optional configuration */
	config?: MermaidConfig;
}

/**
 * Mermaid component props
 */
export interface MermaidProps {
	/** Mermaid diagram definition string */
	string: string;
	/** Optional configuration */
	config?: MermaidConfig;
	/** Optional CSS class */
	class?: string;
	/** Optional error component */
	error?: Snippet<[MermaidError]>
}

/**
 * Mermaid error types
 */
export interface MermaidError {
	/** Error message */
	message: string;
	/** Error code if available */
	code?: string;
	/** Stack trace if available */
	stack?: string;
}

/**
 * Mermaid render result
 */
export interface MermaidRenderResult {
	/** Rendered SVG string */
	svg: string;
	/** Bind functions if any */
	bindFunctions?: (element: Element) => void;
}
