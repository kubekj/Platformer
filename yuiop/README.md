# Yuiop

<a href="https://github.com/fastapi/full-stack-fastapi-template/actions?query=workflow%3ATest" target="_blank"><img src="https://github.com/fastapi/full-stack-fastapi-template/workflows/Test/badge.svg" alt="Test"></a>
<a href="https://coverage-badge.samuelcolvin.workers.dev/redirect/fastapi/full-stack-fastapi-template" target="_blank"><img src="https://coverage-badge.samuelcolvin.workers.dev/fastapi/full-stack-fastapi-template.svg" alt="Coverage"></a>



## Technology Stack and Features

### Backend (Core)
- ⚡ [**FastAPI**](https://fastapi.tiangolo.com) for the Python backend API
    - 🧰 [SQLModel](https://sqlmodel.tiangolo.com) for the Python SQL database interactions (ORM)
    - 🔍 [Pydantic](https://docs.pydantic.dev) for data validation and settings management
    - 💾 [PostgreSQL](https://www.postgresql.org) as the SQL database
    - ✅ Tests with [Pytest](https://pytest.org)

### Frontend (Portal)
- 🚀 [Nuxt.js](https://nuxt.com) for the frontend
    - 💃 TypeScript support
    - 🎨 Modern UI components
    - 🤖 Automatically generated API client
    - 🧪 End-to-End testing with [Playwright](https://playwright.dev)
    - 🦇 Dark mode support

### DevOps & Infrastructure
- 🐋 [Docker Compose](https://www.docker.com) for development and production
- 📞 [Traefik](https://traefik.io) as a reverse proxy / load balancer
- 🏭 CI/CD with GitHub Actions
- 🚢 Comprehensive deployment documentation and automation

### Security
- 🔒 Secure password hashing
- 🔑 JWT authentication
- 📫 Email-based password recovery

## Backend Development

Core docs: [core/README.md](core/README.md).

## Frontend Development

Portal docs: [frontend/README.md](core/README.md).

## Deployment

Deployment docs: [deployment.md](../docs/deployment.md).

## Development

General development docs: [development.md](../docs/development.md).

This includes using Docker Compose, custom local domains, `.env` configurations, etc.
