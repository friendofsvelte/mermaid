<script lang="ts">
	import { Mermaid } from '$lib/index.js';

	const mermaidString = `
    graph TB
      subgraph "Frontend Layer"
        A[React App] --> B[Redux Store]
        A --> C[Component Library]
        B --> D[Middleware]
        C --> E[UI Components]
        E --> F[Form Validation]
        E --> G[Data Tables]
        E --> H[Charts & Graphs]
      end
      
      subgraph "API Gateway"
        I[Load Balancer] --> J[Authentication Service]
        I --> K[Rate Limiting]
        J --> L[JWT Validation]
        K --> M[Request Throttling]
      end
      
      subgraph "Microservices Architecture"
        N[User Service] --> O[(User Database)]
        P[Order Service] --> Q[(Order Database)]
        R[Payment Service] --> S[(Payment Database)]
        T[Notification Service] --> U[(Message Queue)]
        V[Analytics Service] --> W[(Data Warehouse)]
        X[File Service] --> Y[(Object Storage)]
      end
      
      subgraph "External Services"
        Z[Payment Gateway]
        AA[Email Provider]
        BB[SMS Provider]
        CC[CDN]
        DD[Monitoring]
      end
      
      subgraph "Infrastructure"
        EE[Kubernetes Cluster]
        FF[Docker Containers]
        GG[Service Mesh]
        HH[Config Management]
        II[Secret Management]
      end
      
      %% Frontend to API Gateway
      A -->|HTTPS Requests| I
      D -->|Auth Token| J
      
      %% API Gateway to Services
      J -->|Authenticated| N
      J -->|Authenticated| P
      J -->|Authenticated| R
      J -->|Authenticated| T
      
      %% Inter-service Communication
      P -->|Order Events| T
      R -->|Payment Events| T
      N -->|User Events| V
      P -->|Order Data| V
      
      %% External Integrations
      R -->|Process Payment| Z
      T -->|Send Email| AA
      T -->|Send SMS| BB
      X -->|Store Files| CC
      V -->|Metrics| DD
      
      %% Infrastructure Connections
      N -.->|Deployed on| EE
      P -.->|Deployed on| EE
      R -.->|Deployed on| EE
      T -.->|Deployed on| EE
      V -.->|Deployed on| EE
      X -.->|Deployed on| EE
      
      EE -.->|Orchestrates| FF
      EE -.->|Service Discovery| GG
      FF -.->|Configuration| HH
      FF -.->|Secrets| II
      
      %% Styling
      classDef frontend fill:#e1f5fe
      classDef api fill:#f3e5f5
      classDef microservice fill:#e8f5e8
      classDef external fill:#fff3e0
      classDef infrastructure fill:#fce4ec
      
      class A,B,C,D,E,F,G,H frontend
      class I,J,K,L,M api
      class N,O,P,Q,R,S,T,U,V,W,X,Y microservice
      class Z,AA,BB,CC,DD external
      class EE,FF,GG,HH,II infrastructure
  `;
</script>

<Mermaid string={mermaidString} />
