# TRIBA Architecture

## Overview

TRIBA is built as a **modular monolith**: a single deployable FastAPI application with clear internal domain boundaries. This approach provides operational simplicity while maintaining architectural discipline.

```
                          Internet
                             │
                             ▼
                     HTTPS (FastAPI)
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
        Firestore       Storage        Gemini API
```

## Core Principles

1. **One repository, one deployable monolith**
2. **FastAPI owns all business logic**
3. **React + TypeScript owns presentation**
4. **Firebase provides identity, persistence, and storage**
5. **Gemini provides language reasoning, not authorization**
6. **AI never receives unrestricted database access**
7. **Security is enforced server-side**

## Backend Architecture

### Module Structure

Each domain module follows a consistent internal shape:

```
modules/{domain}/
├── router.py      # HTTP routes, request/response handling
├── service.py     # Business rules and orchestration
├── repository.py  # Firestore access and queries
├── schemas.py     # Pydantic request/response models
├── permissions.py # Access control logic
└── exceptions.py  # Domain-specific exceptions
```

### Core Modules

| Module | Responsibility |
|--------|---------------|
| **auth** | Token verification, session management, OAuth |
| **users** | User CRUD, synchronization with Firebase Auth |
| **profiles** | Profile management, avatars, visibility |
| **posts** | Post CRUD, media, visibility rules |
| **comments** | Comment creation, moderation, threading |
| **likes** | Like/unlike, idempotency, counters |
| **follows** | Follow/unfollow, social graph, counters |
| **feed** | Chronological feed, cursor pagination |
| **search** | User discovery, indexed queries |
| **notifications** | Notification creation, read/unread state |
| **activity** | Event recording, activity intelligence |
| **analytics** | User and platform statistics |
| **trends** | Trend detection, engagement velocity |
| **ai** | Gemini orchestration, tools, context, memory |
| **admin** | Dashboard, moderation, audit logs |

### Request Flow

```
Request
  │
  ▼
Middleware (CORS, logging, rate limit)
  │
  ▼
Auth Dependency (verify Firebase token)
  │
  ▼
Router (parse, validate, serialize)
  │
  ▼
Service (business rules, orchestration)
  │
  ├── Repository (Firestore)
  │
  └── Other Services (cross-domain)
  │
  ▼
Response
```

## Frontend Architecture

### Feature-Oriented Structure

```
features/{domain}/
├── api.ts          # API client functions
├── hooks.ts        # React Query hooks
├── types.ts        # TypeScript interfaces
├── components/     # Presentational components
└── pages/          # Page-level components
```

### State Management

- **TanStack Query**: Server state, caching, synchronization
- **React Context**: Authentication/session state
- **Local state**: Ephemeral UI state

## Firestore Data Model

```
users/{userId}
  ├── followers/{followerId}
  └── following/{followingId}

posts/{postId}
  ├── likes/{userId}
  └── comments/{commentId}

notifications/{notificationId}

activity_events/{eventId}

user_stats/{userId}

platform_stats/{period}

trends/{trendId}

ai_chats/{userId}
  └── messages/{messageId}

reports/{reportId}

admin_audit_logs/{logId}
```

### Key Patterns

- **Denormalization**: Counters stored directly on documents
- **Transactions**: Atomic operations for follows, likes
- **Cursor pagination**: Feed and search use opaque cursors
- **Indexed queries**: Composite indexes for feed, search, trends

## AI Context Architecture

The AI layer is a first-class application capability, not a database interface.

```
User Message
    │
    ▼
Intent Analysis
    │
    ▼
Context Selection (retrieve only what is needed)
    │
    ▼
Permission Check (backend enforces)
    │
    ▼
Sanitization
    │
    ▼
Tool Execution (if required)
    │
    ▼
Gemini API
    │
    ▼
Response + Memory Save
```

### Information Classes

| Class | Description | Access |
|-------|-------------|--------|
| **Public** | Public profiles, posts, metrics | Authenticated users |
| **Private** | Private activity, settings | Owner only |
| **Internal** | Security metadata, audit logs | Admins only |

## Security Architecture

- **Backend is authority**: No client-side permission decisions
- **Token verification**: Full Firebase token validation on every request
- **Role checks**: Server-side RBAC for user, moderator, admin
- **AI privacy**: Permission-aware context retrieval, minimum necessary data
- **Rate limiting**: Configurable limits per endpoint class
- **Input validation**: Pydantic schemas at every API boundary

## Scalability Strategy

1. Correct data model
2. Composite indexes
3. Pagination
4. Aggregated statistics
5. Caching (Redis)
6. Async background work
7. AI context optimization
8. Only then consider service extraction

## Module Boundaries for Future Extraction

The current module boundaries are designed as extraction seams:

- **AI service**: Gemini orchestration, tools, memory
- **Search service**: User and content search
- **Analytics service**: Statistics and trend computation
- **Notification service**: Fan-out and delivery
- **Media service**: File processing and storage

Extraction is possible, not required.
