# TRIBA — AI-Powered Social Media Platform

TRIBA is a full-stack social media application built as a **modular monolith** with a Python/FastAPI backend, React + TypeScript frontend, React Native Android app, Firebase infrastructure, and a single Gemini-powered conversational assistant personalized by application activity.

## Tech Stack

### Backend
- **Runtime**: Python 3.12, Uvicorn
- **Framework**: FastAPI
- **Validation**: Pydantic v2, Pydantic Settings
- **Database**: Firebase Cloud Firestore
- **Auth**: Firebase Authentication
- **Storage**: Firebase Storage
- **AI**: Google Generative AI SDK (Gemini)
- **Testing**: pytest, pytest-asyncio, httpx
- **Linting**: Ruff
- **Type Checking**: mypy (strict mode)

### Frontend (Web)
- **Runtime**: React 18
- **Language**: TypeScript (strict mode)
- **Build**: Vite
- **Routing**: React Router v6
- **Server State**: TanStack Query v5
- **HTTP**: Axios
- **Styling**: Tailwind CSS
- **Auth**: Firebase Client SDK

### Mobile (Android)
- **Framework**: React Native 0.73
- **Language**: TypeScript
- **Navigation**: React Navigation 6 (Native Stack + Bottom Tabs)
- **State**: Zustand, TanStack Query v5
- **Auth**: @react-native-firebase/auth
- **Database**: @react-native-firebase/firestore
- **Target**: Android SDK 34, min SDK 21

### Infrastructure
- **Orchestration**: Docker Compose
- **CI/CD**: GitHub Actions
- **Rate Limiting**: Redis

## Prerequisites

- Python 3.12+
- Node.js 20+
- Docker & Docker Compose
- Android SDK 34 (for mobile)
- Firebase project with Auth, Firestore, and Storage enabled
- Gemini API key

## Quick Start

```bash
git clone <repository-url>
cd TRIBA
cp .env.example .env
docker compose up --build
```

| Service | URL |
|---------|-----|
| Frontend (Web) | http://localhost:5173 |
| Backend API | http://localhost:8000 |
| API Docs | http://localhost:8000/docs |
| Redis | localhost:6379 |

## Project Structure

```
TRIBA/
├── backend/
│   ├── app/
│   │   ├── core/         # Config, Firebase, security, dependencies, logging
│   │   ├── modules/      # 15 domain modules (router, service, repository, schemas, permissions, exceptions, models)
│   │   │   ├── auth/
│   │   │   ├── users/
│   │   │   ├── profiles/
│   │   │   ├── posts/
│   │   │   ├── comments/
│   │   │   ├── likes/
│   │   │   ├── follows/
│   │   │   ├── feed/
│   │   │   ├── search/
│   │   │   ├── notifications/
│   │   │   ├── activity/
│   │   │   ├── analytics/
│   │   │   ├── trends/
│   │   │   ├── ai/
│   │   │   └── admin/
│   │   ├── shared/       # Enums, pagination, responses, utils
│   │   └── tests/        # Backend unit/integration tests
│   ├── requirements.txt
│   ├── pyproject.toml
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── app/          # Router, providers
│   │   ├── features/     # Feature-oriented modules
│   │   │   ├── auth/     # Login, register, forgot password
│   │   │   ├── feed/     # Feed, post composer, post card
│   │   │   ├── posts/    # Post detail
│   │   │   ├── comments/ # Comment section
│   │   │   ├── chat/     # AI chat interface
│   │   │   ├── notifications/
│   │   │   ├── profile/  # Profile view, edit, settings
│   │   │   ├── search/
│   │   │   └── admin/    # Dashboard, users, posts, comments, reports, analytics, audit logs
│   │   ├── components/   # Shared UI components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── services/     # API service functions
│   │   ├── types/        # TypeScript interfaces
│   │   ├── lib/          # API client, Firebase init
│   │   ├── pages/        # Top-level pages
│   │   └── main.tsx
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── Dockerfile
├── mobile/
│   ├── app/
│   │   ├── components/   # PostCard, CommentItem
│   │   ├── features/     # Feature screens
│   │   ├── navigation/   # AppNavigator, AuthStack, AppTabs, AdminStack
│   │   ├── services/     # API client, Firebase, Auth
│   │   ├── store/        # Zustand auth store
│   │   ├── types/        # TypeScript interfaces
│   │   └── utils/        # Storage, validation
│   ├── android/          # Native Android project
│   ├── package.json
│   └── tsconfig.json
├── docs/                 # API.md, AI.md
├── scripts/              # setup_firebase.sh, seed_data.py, migrate.py
├── tests/                # Root-level integration tests
├── .github/workflows/    # CI/CD pipelines
├── docker-compose.yml
├── .env.example
├── explain.md            # Complete build explanation
├── ARCHITECTURE.md
├── SECURITY.md
├── DEPLOYMENT.md
├── CONTRIBUTING.md
└── README.md
```

## Development Commands

### Backend (Web)

```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Run development server
uvicorn app.main:app --reload

# Run tests
pytest app/tests/ -v

# Lint
ruff check .

# Type check
mypy .
```

### Frontend (Web)

```bash
cd frontend

# Install dependencies
npm install

# Development server
npm run dev

# Type check
npm run typecheck

# Build for production
npm run build

# Preview production build
npm run preview
```

### Mobile (Android)

```bash
cd mobile

# Install dependencies
npm install

# Run on Android emulator/device
npm run android

# Build release APK
npm run release

# Build AAB for Google Play Store
cd android && ./gradlew bundleRelease
```

Release outputs:
- APK: `android/app/build/outputs/apk/release/`
- AAB: `android/app/build/outputs/bundle/release/`

### Docker

```bash
# Start all services
docker compose up --build

# Stop services
docker compose down
```

## Testing Strategy

### Backend Tests
- **Unit tests**: Services, validators, permission functions, AI context generation
- **Integration tests**: API routes, Firestore repositories, auth middleware
- **E2E tests**: Critical flows (register → login → post → like → comment)

Run backend tests:
```bash
cd backend
pytest app/tests/ -v
```

### Frontend Tests
- **Unit tests**: Vitest + React Testing Library
- **E2E tests**: Playwright for critical user flows

Run frontend tests:
```bash
cd frontend
npm run test
```

### Integration Tests
```bash
pytest tests/ -v -m integration
```

## API Documentation

Interactive API docs are available at http://localhost:8000/docs when the backend is running.

See [docs/API.md](./docs/API.md) for the complete API reference.

## AI Architecture

TRIBA's AI assistant uses Gemini with a permission-aware context system:

1. **Intent analysis** — Determines what the user is asking about
2. **Context selection** — Retrieves only permitted data (own activity, trends, public user data)
3. **Permission checks** — Backend enforces privacy before data enters AI context
4. **Sanitization** — Removes sensitive fields
5. **Response generation** — Gemini generates a natural language answer

Key principles:
- Gemini API key stays server-side (never exposed to clients)
- Conversation memory is isolated per user (`ai_chats/{userId}/messages/{messageId}`)
- The backend is the permission system, not the AI
- Minimum necessary context is sent to Gemini

See [docs/AI.md](./docs/AI.md) for the complete AI architecture.

## Security

- Firebase token verification on every protected request
- Server-side role checks (user, admin)
- CORS configuration
- Input validation on all endpoints
- Rate limiting on abuse-prone endpoints
- Structured logging with request IDs
- No secrets in source control

See [SECURITY.md](./SECURITY.md) for the full security policy and threat model.

## Deployment

### Production Topology

```
Internet
   │
   ▼
HTTPS Load Balancer
   │
   ▼
FastAPI + React Build (single deployable monolith)
   │
   ├── Firestore
   ├── Firebase Storage
   └── Gemini API
```

### Environment Variables

Copy `.env.example` to `.env` and configure:

- `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`, `FIREBASE_STORAGE_BUCKET`
- `GEMINI_API_KEY`
- `GOOGLE_OAUTH_CLIENT_ID`, `GOOGLE_OAUTH_CLIENT_SECRET`
- `APP_ENV`, `APP_URL`, `FRONTEND_URL`
- `SECRET_KEY`, `LOG_LEVEL`

See [DEPLOYMENT.md](./DEPLOYMENT.md) for the complete deployment guide.

## Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) — System architecture, data model, module boundaries
- [SECURITY.md](./SECURITY.md) — Security policies, threat model, AI privacy boundary
- [DEPLOYMENT.md](./DEPLOYMENT.md) — Production deployment, monitoring, scaling
- [CONTRIBUTING.md](./CONTRIBUTING.md) — Git workflow, commit conventions, PR requirements
- [docs/API.md](./docs/API.md) — REST API reference
- [docs/AI.md](./docs/AI.md) — AI context architecture and tool system
- [explain.md](./explain.md) — Complete build explanation with every file and decision

## License

MIT
