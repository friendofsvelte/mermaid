import type { MermaidConfig } from '$lib/index.js';

export interface ExtendedDiagramExample {
	id: string;
	title: string;
	description: string;
	code: string;
	config?: MermaidConfig;
	category: 'flowchart' | 'sequence' | 'gantt' | 'pie' | 'gitgraph' | 'er' | 'journey' | 'class' | 'state' | 'mindmap';
	difficulty: 'beginner' | 'intermediate' | 'advanced';
	useCase: string;
	tags: string[];
}

export const moreExamples: ExtendedDiagramExample[] = [
	{
		id: 'ecommerce-checkout',
		title: 'E-commerce Checkout Flow',
		description: 'Complete checkout process with error handling',
		category: 'flowchart',
		difficulty: 'advanced',
		useCase: 'E-commerce systems, user journey mapping',
		tags: ['ecommerce', 'checkout', 'payment', 'user-flow'],
		code: `graph TB
    A[Add to Cart] --> B{User Logged In?}
    B -->|No| C[Login/Register]
    B -->|Yes| D[Review Cart]
    C --> D
    D --> E{Items Available?}
    E -->|No| F[Update Cart]
    F --> D
    E -->|Yes| G[Select Shipping]
    G --> H[Enter Payment]
    H --> I{Payment Valid?}
    I -->|No| J[Payment Error]
    J --> H
    I -->|Yes| K[Process Order]
    K --> L{Inventory Check}
    L -->|Failed| M[Backorder]
    L -->|Success| N[Confirm Order]
    M --> O[Notify Customer]
    N --> P[Send Confirmation]
    O --> Q[End]
    P --> Q
    
    style A fill:#e1f5fe
    style Q fill:#e8f5e8
    style J fill:#ffebee
    style M fill:#fff3e0`
	},
	{
		id: 'microservices-arch',
		title: 'Microservices Architecture',
		description: 'System architecture with multiple services',
		category: 'flowchart',
		difficulty: 'advanced',
		useCase: 'System design, architecture documentation',
		tags: ['microservices', 'architecture', 'system-design', 'scalability'],
		code: `graph TB
    subgraph "Client Layer"
        A[Web App] --> B[Mobile App]
    end
    
    subgraph "API Gateway"
        C[Load Balancer] --> D[Auth Service]
        C --> E[Rate Limiter]
    end
    
    subgraph "Microservices"
        F[User Service] --> G[(User DB)]
        H[Order Service] --> I[(Order DB)]
        J[Payment Service] --> K[(Payment DB)]
        L[Notification Service] --> M[Message Queue]
    end
    
    subgraph "External Services"
        N[Payment Gateway]
        O[Email Service]
        P[SMS Service]
    end
    
    A --> C
    B --> C
    D --> F
    D --> H
    D --> J
    H --> L
    J --> L
    J --> N
    L --> O
    L --> P
    
    classDef client fill:#e3f2fd
    classDef gateway fill:#f3e5f5
    classDef service fill:#e8f5e8
    classDef external fill:#fff3e0
    
    class A,B client
    class C,D,E gateway
    class F,H,J,L service
    class N,O,P external`
	},
	{
		id: 'oauth-flow',
		title: 'OAuth 2.0 Authorization Flow',
		description: 'Complete OAuth authentication sequence',
		category: 'sequence',
		difficulty: 'intermediate',
		useCase: 'Authentication systems, API security',
		tags: ['oauth', 'authentication', 'security', 'api'],
		code: `sequenceDiagram
    participant U as User
    participant C as Client App
    participant A as Auth Server
    participant R as Resource Server
    
    U->>C: 1. Initiate Login
    C->>A: 2. Authorization Request
    A->>U: 3. Login Prompt
    U->>A: 4. Enter Credentials
    A->>C: 5. Authorization Code
    C->>A: 6. Exchange Code for Token
    A->>C: 7. Access Token
    C->>R: 8. API Request + Token
    R->>A: 9. Validate Token
    A->>R: 10. Token Valid
    R->>C: 11. Protected Resource
    C->>U: 12. Display Data`,
		config: {
			theme: 'dark',
			sequence: {
				actorMargin: 50,
				noteMargin: 10
			}
		}
	},
	{
		id: 'ci-cd-pipeline',
		title: 'CI/CD Pipeline',
		description: 'DevOps deployment pipeline with stages',
		category: 'flowchart',
		difficulty: 'intermediate',
		useCase: 'DevOps, deployment automation',
		tags: ['cicd', 'devops', 'deployment', 'automation'],
		code: `graph LR
    A[Developer Push] --> B[Git Repository]
    B --> C{Tests Pass?}
    C -->|No| D[Notify Developer]
    D --> A
    C -->|Yes| E[Build Application]
    E --> F[Security Scan]
    F --> G{Vulnerabilities?}
    G -->|Yes| H[Block Deployment]
    H --> D
    G -->|No| I[Deploy to Staging]
    I --> J[Integration Tests]
    J --> K{Tests Pass?}
    K -->|No| D
    K -->|Yes| L[Deploy to Production]
    L --> M[Monitor & Alert]
    
    style A fill:#e8f5e8
    style L fill:#e1f5fe
    style D fill:#ffebee
    style H fill:#ffebee`
	},
	{
		id: 'agile-sprint',
		title: 'Agile Sprint Planning',
		description: 'Sprint timeline with ceremonies',
		category: 'gantt',
		difficulty: 'beginner',
		useCase: 'Project management, agile planning',
		tags: ['agile', 'sprint', 'scrum', 'project-management'],
		code: `gantt
    title Sprint 23 - Q1 2024
    dateFormat YYYY-MM-DD
    section Planning
    Sprint Planning    :done, planning, 2024-01-15, 2024-01-15
    Backlog Refinement :done, refinement, 2024-01-16, 2024-01-16
    section Development
    Feature A Development :active, featureA, 2024-01-17, 2024-01-22
    Feature B Development :featureB, 2024-01-19, 2024-01-24
    Bug Fixes         :bugs, 2024-01-23, 2024-01-25
    section Testing
    QA Testing        :testing, 2024-01-24, 2024-01-26
    UAT               :uat, 2024-01-26, 2024-01-28
    section Ceremonies
    Daily Standups    :standups, 2024-01-17, 2024-01-28
    Sprint Review     :review, 2024-01-29, 2024-01-29
    Retrospective     :retro, 2024-01-29, 2024-01-29`
	},
	{
		id: 'user-onboarding',
		title: 'User Onboarding Journey',
		description: 'Complete user experience flow',
		category: 'journey',
		difficulty: 'intermediate',
		useCase: 'UX design, customer experience',
		tags: ['ux', 'onboarding', 'user-journey', 'experience'],
		code: `journey
    title New User Onboarding Experience
    section Discovery
      Visit Landing Page: 5: User
      Read About Features: 4: User
      Watch Demo Video: 4: User
      Check Pricing: 3: User
    section Registration
      Click Sign Up: 4: User
      Fill Registration Form: 2: User
      Verify Email: 2: User
      Set Password: 3: User
    section First Login
      Login Successfully: 4: User
      Complete Profile: 3: User
      Take Product Tour: 5: User
      Connect Integrations: 2: User
    section First Use
      Create First Project: 4: User
      Invite Team Members: 3: User
      Complete First Task: 5: User
      Explore Advanced Features: 4: User`
	},
	{
		id: 'database-schema',
		title: 'E-commerce Database Schema',
		description: 'Relational database design for e-commerce',
		category: 'er',
		difficulty: 'advanced',
		useCase: 'Database design, data modeling',
		tags: ['database', 'schema', 'ecommerce', 'relationships'],
		code: `erDiagram
    CUSTOMER ||--o{ ORDER : places
    CUSTOMER {
        int customer_id PK
        string email UK
        string first_name
        string last_name
        string phone
        datetime created_at
        datetime updated_at
    }
    
    ORDER ||--|{ ORDER_ITEM : contains
    ORDER {
        int order_id PK
        int customer_id FK
        datetime order_date
        decimal total_amount
        string status
        string shipping_address
        string billing_address
    }
    
    PRODUCT ||--o{ ORDER_ITEM : "ordered in"
    PRODUCT {
        int product_id PK
        string name
        string description
        decimal price
        int stock_quantity
        int category_id FK
        datetime created_at
    }
    
    CATEGORY ||--o{ PRODUCT : contains
    CATEGORY {
        int category_id PK
        string name
        string description
        int parent_id FK
    }
    
    ORDER_ITEM {
        int order_id FK
        int product_id FK
        int quantity
        decimal unit_price
        decimal total_price
    }
    
    CUSTOMER ||--o{ REVIEW : writes
    PRODUCT ||--o{ REVIEW : receives
    REVIEW {
        int review_id PK
        int customer_id FK
        int product_id FK
        int rating
        string comment
        datetime created_at
    }`
	},
	{
		id: 'state-machine',
		title: 'Order State Machine',
		description: 'Order lifecycle state transitions',
		category: 'state',
		difficulty: 'intermediate',
		useCase: 'State management, business logic',
		tags: ['state-machine', 'order', 'lifecycle', 'business-logic'],
		code: `stateDiagram-v2
    [*] --> Draft
    Draft --> Pending : submit_order
    Pending --> Confirmed : payment_received
    Pending --> Cancelled : timeout
    Pending --> Cancelled : user_cancel
    Confirmed --> Processing : start_fulfillment
    Processing --> Shipped : items_shipped
    Processing --> Cancelled : out_of_stock
    Shipped --> Delivered : delivery_confirmed
    Shipped --> Returned : return_requested
    Delivered --> Completed : [*]
    Returned --> Refunded : process_return
    Cancelled --> [*]
    Refunded --> [*]
    
    Pending : Payment pending
    Confirmed : Payment confirmed
    Processing : Preparing items
    Shipped : In transit
    Delivered : Successfully delivered
    Cancelled : Order cancelled
    Returned : Return in progress
    Refunded : Refund processed
    Completed : Order complete`
	},
	{
		id: 'git-workflow',
		title: 'Git Feature Branch Workflow',
		description: 'Development workflow with Git branches',
		category: 'gitgraph',
		difficulty: 'intermediate',
		useCase: 'Version control, team collaboration',
		tags: ['git', 'workflow', 'branching', 'collaboration'],
		code: `gitgraph
    commit id: "Initial commit"
    branch develop
    checkout develop
    commit id: "Setup project structure"
    
    branch feature/user-auth
    checkout feature/user-auth
    commit id: "Add login component"
    commit id: "Add registration"
    commit id: "Add password reset"
    
    checkout develop
    branch feature/dashboard
    checkout feature/dashboard
    commit id: "Create dashboard layout"
    commit id: "Add widgets"
    
    checkout develop
    merge feature/user-auth
    commit id: "Update dependencies"
    
    checkout feature/dashboard
    commit id: "Fix responsive design"
    
    checkout develop
    merge feature/dashboard
    
    checkout main
    merge develop
    commit id: "Release v1.0.0"
    
    checkout develop
    commit id: "Hotfix preparation"`
	},
	{
		id: 'class-diagram',
		title: 'Payment System Classes',
		description: 'Object-oriented design for payment processing',
		category: 'class',
		difficulty: 'advanced',
		useCase: 'Software architecture, OOP design',
		tags: ['oop', 'classes', 'payment', 'architecture'],
		code: `classDiagram
    class PaymentProcessor {
        +String merchantId
        +String apiKey
        +processPayment(amount, method) PaymentResult
        +refundPayment(transactionId) RefundResult
        +validateCard(cardInfo) Boolean
        -encryptData(data) String
    }
    
    class PaymentMethod {
        <<abstract>>
        +String type
        +validate() Boolean
        +process(amount) PaymentResult
    }
    
    class CreditCard {
        +String cardNumber
        +String expiryDate
        +String cvv
        +String holderName
        +validate() Boolean
        +process(amount) PaymentResult
    }
    
    class PayPal {
        +String email
        +String token
        +validate() Boolean
        +process(amount) PaymentResult
    }
    
    class BankTransfer {
        +String accountNumber
        +String routingNumber
        +String bankName
        +validate() Boolean
        +process(amount) PaymentResult
    }
    
    class PaymentResult {
        +String transactionId
        +String status
        +DateTime timestamp
        +String message
        +Decimal amount
    }
    
    class Customer {
        +String customerId
        +String email
        +String name
        +List~PaymentMethod~ paymentMethods
        +addPaymentMethod(method)
        +removePaymentMethod(methodId)
    }
    
    PaymentMethod <|-- CreditCard
    PaymentMethod <|-- PayPal
    PaymentMethod <|-- BankTransfer
    PaymentProcessor --> PaymentMethod
    PaymentProcessor --> PaymentResult
    Customer --> PaymentMethod
    PaymentMethod --> PaymentResult`
	},
	{
		id: 'mindmap-features',
		title: 'Product Feature Mindmap',
		description: 'Feature breakdown for product planning',
		category: 'mindmap',
		difficulty: 'beginner',
		useCase: 'Product planning, brainstorming',
		tags: ['mindmap', 'features', 'product', 'planning'],
		code: `mindmap
  root((Mermaid Svelte))
    Features
      Component Library
        Mermaid Component
        Type Definitions
        Configuration Options
      Documentation
        API Reference
        Examples Gallery
        Getting Started Guide
      Developer Experience
        TypeScript Support
        SSR Compatibility
        Hot Reload
        Error Handling
    Diagram Types
      Flowcharts
        Basic Flows
        Complex Workflows
        Decision Trees
      Sequence Diagrams
        API Interactions
        User Flows
        System Communications
      Specialized
        Gantt Charts
        Entity Relations
        State Machines
        Git Graphs
    Integrations
      SvelteKit
        Static Generation
        Server Side Rendering
        Client Side Routing
      Build Tools
        Vite Integration
        Rollup Support
        Webpack Compatible
      Deployment
        Cloudflare Pages
        Vercel
        Netlify`
	},
	{
		id: 'pie-chart-usage',
		title: 'Technology Stack Distribution',
		description: 'Pie chart showing technology usage',
		category: 'pie',
		difficulty: 'beginner',
		useCase: 'Data visualization, reporting',
		tags: ['pie-chart', 'data', 'statistics', 'visualization'],
		code: `pie title Technology Stack Usage in 2024
    "JavaScript" : 35
    "TypeScript" : 25
    "Python" : 20
    "Java" : 10
    "Go" : 5
    "Rust" : 3
    "Other" : 2`
	},
	{
		id: 'complex-sequence',
		title: 'Microservices Communication',
		description: 'Complex inter-service communication pattern',
		category: 'sequence',
		difficulty: 'advanced',
		useCase: 'Distributed systems, service architecture',
		tags: ['microservices', 'communication', 'distributed', 'async'],
		code: `sequenceDiagram
    participant U as User
    participant G as API Gateway
    participant A as Auth Service
    participant O as Order Service
    participant P as Payment Service
    participant I as Inventory Service
    participant N as Notification Service
    participant Q as Message Queue
    
    U->>G: Place Order Request
    G->>A: Validate Token
    A-->>G: Token Valid
    G->>O: Create Order
    
    par Parallel Processing
        O->>I: Check Inventory
        I-->>O: Items Available
    and
        O->>P: Process Payment
        P-->>O: Payment Successful
    end
    
    O->>Q: Publish Order Created Event
    Q->>N: Order Notification
    N->>U: Send Confirmation Email
    
    opt If Payment Fails
        P-->>O: Payment Failed
        O->>Q: Publish Order Failed Event
        Q->>N: Failure Notification
        N->>U: Send Failure Email
    end
    
    O-->>G: Order Created
    G-->>U: Order Confirmation`,
		config: {
			theme: 'base'
		}
	}
];

export const categories = [
	{ id: 'all', name: 'All Examples', count: moreExamples.length },
	{ id: 'flowchart', name: 'Flowcharts', count: moreExamples.filter(e => e.category === 'flowchart').length },
	{ id: 'sequence', name: 'Sequence Diagrams', count: moreExamples.filter(e => e.category === 'sequence').length },
	{ id: 'gantt', name: 'Gantt Charts', count: moreExamples.filter(e => e.category === 'gantt').length },
	{ id: 'er', name: 'Entity Relations', count: moreExamples.filter(e => e.category === 'er').length },
	{ id: 'journey', name: 'User Journeys', count: moreExamples.filter(e => e.category === 'journey').length },
	{ id: 'state', name: 'State Machines', count: moreExamples.filter(e => e.category === 'state').length },
	{ id: 'gitgraph', name: 'Git Graphs', count: moreExamples.filter(e => e.category === 'gitgraph').length },
	{ id: 'class', name: 'Class Diagrams', count: moreExamples.filter(e => e.category === 'class').length },
	{ id: 'mindmap', name: 'Mindmaps', count: moreExamples.filter(e => e.category === 'mindmap').length },
	{ id: 'pie', name: 'Pie Charts', count: moreExamples.filter(e => e.category === 'pie').length }
];

export const difficulties = [
	{ id: 'all', name: 'All Levels' },
	{ id: 'beginner', name: 'Beginner' },
	{ id: 'intermediate', name: 'Intermediate' },
	{ id: 'advanced', name: 'Advanced' }
];
