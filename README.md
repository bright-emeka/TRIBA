# TRIBA — AI-Powered Social Media Platform

TRIBA is a full-stack social media application built as a **modular monolith** with a Python/FastAPI backend, React + TypeScript frontend, Firebase infrastructure, and a single Gemini-powered conversational assistant personalized by application activity.

## Tech Stack

- **Backend**: Python 3.12, FastAPI, Pydantic, Uvicorn, Firebase Admin SDK, Google Gemini SDK
- **Frontend**: React 18, TypeScript, Vite, TanStack Query, React Router
- **Infrastructure**: Firebase Auth, Cloud Firestore, Firebase Storage, Redis, Docker
- **Testing**: pytest, Vitest, React Testing Library
- **CI/CD**: GitHub Actions

## Prerequisites

- Python 3.12+
- Node.js 20+
- Docker & Docker Compose
- Firebase project
- Gemini API key

## Quick Start

```bash
git clone <repository-url>
cd TRIBA
cp .env.example .env
docker compose up --build
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

## Project Structure

```
TRIBA/
├── backend/          # FastAPI modular monolith
│   ├── app/
│   │   ├── core/     # Config, security, dependencies
│   │   ├── modules/  # Domain modules (auth, posts, ai, etc.)
│   │   └── shared/   # Shared utilities
│   └── tests/
├── frontend/         # React + TypeSPA
│   ├── src/
│   │   ├── app/      # Router, providers
│   │   ├── features/ # Feature modules
│   │   ├── components/
│   │   └── services/
│   └── tests/
├── docs/             # Additional documentation
├── scripts/          # Utility scripts
├── .github/workflows/
├── docker-compose.yml
└── README.md
```

## Development Commands

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
pytest
ruff check .
mypy .
```

### Frontend
```bash
cd frontend
npm install
npm run dev
npm run lint
npm run typecheck
npm run test
npm run build
```

## Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) — Detailed architecture and data model
- [SECURITY.md](./SECURITY.md) — Security policies and threat model
- [DEPLOYMENT.md](./DEPLOYMENT.md) — Production deployment guide
- [CONTRIBUTING.md](./CONTRIBUTING.md) — Git workflow and contribution guidelines

## License

MIT
