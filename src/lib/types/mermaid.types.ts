import type { Snippet } from "svelte";

/**
 * Mermaid component configuration types
 */
export interface MermaidConfig {
	/** Theme configuration */
	theme?: 'default' | 'dark' | 'forest' | 'neutral' | 'base';
	/** Start on load configuration */
	startOnLoad?: boolean;
	/** Flowchart configuration */
	flowchart?: {
		/** Use max width */
		useMaxWidth?: boolean;
		/** HTML labels */
		htmlLabels?: boolean;
		/** Curve style */
		curve?: 'basis' | 'linear' | 'cardinal';
	};
	/** Sequence diagram configuration */
	sequence?: {
		/** Diagram margins */
		diagramMarginX?: number;
		diagramMarginY?: number;
		/** Actor margin */
		actorMargin?: number;
		/** Box margin */
		boxMargin?: number;
		/** Box text margin */
		boxTextMargin?: number;
		/** Note margin */
		noteMargin?: number;
		/** Message margin */
		messageMargin?: number;
	};
	/** Gantt configuration */
	gantt?: {
		/** Left padding */
		leftPadding?: number;
		/** Grid line start padding */
		gridLineStartPadding?: number;
		/** Font size */
		fontSize?: number;
		/** Font family */
		fontFamily?: string;
		/** Section font size */
		sectionFontSize?: number;
		/** Number section styles */
		numberSectionStyles?: number;
	};
}

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
