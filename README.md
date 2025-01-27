# Yuiop Platform

Yuiop is a modern SaaS platform for experience creation, management, and delivery. It features a **Nuxt.js front-end** and a **FastAPI back-end**, designed for scalability, performance, and ease of use.

## Features

- **Experience Management:** Create, update, and manage experiences with a user-friendly interface.
- **Real-Time Analytics:** Track user interactions and generate insights with real-time analytics.
- **Scalable Architecture:** Built with a distributed, event-driven architecture for horizontal scaling.
- **AI/ML Integration:** Future-ready for AI/ML-powered analytics and recommendations.

## Folder structure
```
Platformmer/
├── .github/                 # GitHub specific configurations
│   └── workflows/           # CI/CD pipeline definitions
├── docs/                    # Centralized documentation
│   ├── resources/           # Documentation resources
│   ├── api.md               # API documentation
│   ├── architecture.md      # System architecture
│   ├── deployment.md        # Deployment guides
│   └── development.md       # Development setup
├── scripts/                 # Shared automation scripts
│   ├── build.sh             # Build scripts
│   ├── deploy.sh            # Deployment scripts
│   └── test.sh              # Testing scripts
└── yuiop/                   # Main application code
    ├── core/                # Backend (FastAPI)
    ├── portal/              # Frontend (Nuxt)
    └── docker-compose.yml   # Container orchestration
```


## Technology Stack

- **Frontend:**
  - Nuxt.js
  - TypeScript
  - Tailwind CSS
  - Vite

- **Backend:**
  - FastAPI
  - PostgreSQL
  - SQLAlchemy
  - Pydantic

- **Infrastructure:**
  - Docker
  - Docker Compose
  - GitHub Actions
  - Traefik