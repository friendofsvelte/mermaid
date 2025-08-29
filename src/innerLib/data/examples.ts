import type { MermaidConfig } from '$lib/index.js';

export interface DiagramExample {
	id: string;
	title: string;
	description: string;
	code: string;
	config?: MermaidConfig;
	category: 'flowchart' | 'sequence' | 'gantt' | 'pie' | 'gitgraph' | 'er' | 'journey' | 'class';
	difficulty: 'beginner' | 'intermediate' | 'advanced';
	useCase: string;
}

export const diagramExamples: DiagramExample[] = [
	{
		id: 'simple-flowchart',
		title: 'Simple Decision Flow',
		description: 'Basic flowchart for decision-making processes',
		category: 'flowchart',
		difficulty: 'beginner',
		useCase: 'Process documentation, decision trees',
		code: `graph TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Great!]
    B -->|No| D[Debug]
    D --> B
    C --> E[End]`
	},
	{
		id: 'api-sequence',
		title: 'API Authentication Flow',
		description: 'Sequence diagram showing API authentication process',
		category: 'sequence',
		difficulty: 'intermediate',
		useCase: 'API documentation, system design',
		code: `sequenceDiagram
    participant C as Client
    participant A as Auth Server
    participant R as Resource Server
    
    C->>A: Login Request
    A-->>C: Access Token
    C->>R: API Request + Token
    R->>A: Validate Token
    A-->>R: Token Valid
    R-->>C: Protected Resource`,
		config: {
			theme: 'dark',
			sequence: {
				actorMargin: 50,
				noteMargin: 10
			}
		}
	},
	{
		id: 'project-gantt',
		title: 'Project Timeline',
		description: 'Gantt chart for project management',
		category: 'gantt',
		difficulty: 'intermediate',
		useCase: 'Project planning, milestone tracking',
		code: `gantt
    title Development Sprint
    dateFormat YYYY-MM-DD
    section Planning
    Requirements    :done, req, 2024-01-01, 2024-01-03
    Design         :done, design, 2024-01-04, 2024-01-06
    section Development
    Frontend       :active, frontend, 2024-01-07, 2024-01-14
    Backend        :backend, 2024-01-10, 2024-01-17
    Testing        :testing, 2024-01-15, 2024-01-20`
	},
	{
		id: 'user-journey',
		title: 'User Onboarding Journey',
		description: 'User journey map for onboarding experience',
		category: 'journey',
		difficulty: 'advanced',
		useCase: 'UX design, customer experience mapping',
		code: `journey
    title User Onboarding Journey
    section Discovery
      Visit Website: 5: User
      Read Features: 4: User
      Check Pricing: 3: User
    section Signup
      Create Account: 3: User
      Verify Email: 2: User
      Complete Profile: 4: User
    section First Use
      Tutorial: 5: User
      Create Project: 4: User
      Invite Team: 3: User`
	},
	{
		id: 'database-er',
		title: 'Database Schema',
		description: 'Entity relationship diagram for database design',
		category: 'er',
		difficulty: 'advanced',
		useCase: 'Database design, system architecture',
		code: `erDiagram
    USER ||--o{ ORDER : places
    USER {
        int id PK
        string email UK
        string name
        datetime created_at
    }
    ORDER ||--|{ ORDER_ITEM : contains
    ORDER {
        int id PK
        int user_id FK
        datetime order_date
        decimal total
    }
    PRODUCT ||--o{ ORDER_ITEM : "ordered in"
    PRODUCT {
        int id PK
        string name
        decimal price
        int stock
    }
    ORDER_ITEM {
        int order_id FK
        int product_id FK
        int quantity
        decimal price
    }`
	},
	{
		id: 'git-workflow',
		title: 'Git Branching Strategy',
		description: 'Git flow visualization for development workflow',
		category: 'gitgraph',
		difficulty: 'intermediate',
		useCase: 'Development workflow, team collaboration',
		code: `gitgraph
    commit id: "Initial"
    branch develop
    checkout develop
    commit id: "Setup"
    branch feature/auth
    checkout feature/auth
    commit id: "Add login"
    commit id: "Add signup"
    checkout develop
    merge feature/auth
    checkout main
    merge develop
    commit id: "Release v1.0"`
	}
];

export const hackTips = [
	{
		title: 'Performance Optimization',
		description: 'Use dynamic imports to reduce bundle size and improve loading times',
		code: `// ✅ Good: Dynamic import (already implemented)
const mermaid = await import('mermaid');

// ❌ Bad: Static import increases bundle size
import mermaid from 'mermaid';`
	},
	{
		title: 'Theme Customization',
		description: 'Create custom themes for consistent branding',
		code: `const customConfig: MermaidConfig = {
  theme: 'base',
  themeVariables: {
    primaryColor: '#ff6b6b',
    primaryTextColor: '#fff',
    primaryBorderColor: '#ff5252',
    lineColor: '#333',
    sectionBkgColor: '#f8f9fa',
    altSectionBkgColor: '#e9ecef'
  }
};`
	},
	{
		title: 'Error Handling',
		description: 'Implement robust error handling with user feedback',
		code: `<Mermaid 
  string={diagramCode}
  error={(error) => {
    console.error('Diagram error:', error);
    showToast('Invalid diagram syntax');
  }}
/>`
	},
	{
		title: 'Responsive Design',
		description: 'Mermaid diagrams are responsive by default with useMaxWidth config',
		code: `const responsiveConfig: MermaidConfig = {
  flowchart: {
    useMaxWidth: true,
    htmlLabels: true
  },
  sequence: {
    useMaxWidth: true
  },
  gantt: {
    useMaxWidth: true
  }
};

// The component automatically adapts to container size
<Mermaid string={diagram} config={responsiveConfig} />`
	}
];
