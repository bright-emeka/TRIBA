# TRIBA — AI-Powered Social Media Platform

> A production-oriented social network built as a **modular monolith** with a Python/FastAPI backend, React + TypeScript frontend, Firebase infrastructure, and a single Gemini-powered conversational assistant personalized by application activity.

---

## Table of Contents

1. Project Overview
2. Project Aim
3. Product Vision
4. Core Product Principles
5. Scope
6. Technology Stack
7. High-Level Architecture
8. Why a Modular Monolith
9. Monorepo Structure
10. Backend Architecture
11. Frontend Architecture
12. Domain Modules
13. Authentication and Authorization
14. Users and Profiles
15. Social Graph
16. Posts
17. Likes
18. Comments
19. Feed
20. Search
21. Notifications
22. Activity Intelligence System
23. Analytics and Trends
24. Gemini AI Assistant
25. AI Context Architecture
26. AI Tool System
27. AI Memory
28. AI Privacy Boundary
29. AI Conversation Flows
30. Admin System
31. Firebase Architecture
32. Firestore Data Model
33. Storage and Media
34. API Design
35. API Response and Error Standards
36. Validation
37. Security
38. Privacy
39. Rate Limiting
40. Caching
41. Background Work
42. Real-Time Features
43. Observability and Logging
44. Testing Strategy
45. Frontend UX
46. Frontend Routes
47. State Management
48. Accessibility
49. Performance
50. Docker and Local Development
51. CI/CD
52. Environment Configuration
53. Deployment
54. Monitoring and Operations
55. Data Integrity
56. Scalability Strategy
57. Future Service Extraction
58. Development Path
59. Implementation Milestones
60. MVP Definition
61. Post-MVP Roadmap
62. Non-Functional Requirements
63. Threat Model
64. Engineering Conventions
65. Git Workflow
66. Documentation
67. Success Criteria
68. Final Architecture

---

# 1. Project Overview

**TRIBA** is a full-stack social media application with an embedded AI assistant that understands the application's social context.

The platform combines conventional social-network features with a contextual AI layer that can reason over permitted application data.

Core capabilities include:

- account registration and login
- OAuth authentication
- user profiles
- user discovery and search
- following and unfollowing
- posts
- likes
- comments
- feed
- notifications
- activity tracking
- analytics
- platform trends
- AI chat
- AI-aware activity summaries
- AI discussion of public social activity
- moderation and administration

The entire product is intentionally implemented as a **single modular monolith**.

The goal is not to build a toy CRUD application. The goal is to build a realistic portfolio-grade system that demonstrates strong engineering across frontend, backend, data, security, AI, testing, deployment and operations.

---

# 2. Project Aim

The project aims to demonstrate practical competence in:

- Python
- FastAPI
- TypeScript
- React
- REST API design
- Firebase
- Firebase Authentication
- Cloud Firestore
- Firebase Storage
- OAuth
- JWT verification
- RBAC
- data modeling
- social graph modeling
- event/activity tracking
- analytics
- trend detection
- Gemini API integration
- AI tool calling
- AI context engineering
- privacy-aware AI architecture
- frontend architecture
- testing
- Docker
- CI/CD
- observability
- security
- production deployment

A major architectural objective is to show that a **modular monolith can be sophisticated without becoming a distributed system**.

---

# 3. Product Vision

TRIBA should feel like a normal social network with an unusually capable AI assistant.

The assistant is not intended to be a generic ChatGPT clone embedded in a page.

It should understand application context.

Examples:

### User activity

> "What have I been doing on the app today?"

> "How active have I been this week?"

> "Which posts have I interacted with recently?"

> "How many people did I follow this month?"

> "What topics do I spend the most time interacting with?"

### Platform trends

> "What's trending on the app?"

> "Which topics are getting the most engagement?"

> "What kind of content is performing well today?"

### Public user context

> "What has John been posting about lately?"

> "Who are some active users around Python?"

> "Which people I follow are posting most frequently?"

The assistant must not reveal private or unauthorized information merely because the AI can technically retrieve it.

---

# 4. Core Product Principles

## 4.1 Backend is the authority

The browser is never trusted to decide permissions.

The backend decides:

- whether the current user is authenticated
- whether the user can perform an operation
- whether a resource is public/private
- whether an admin action is permitted
- whether the AI can access requested information

## 4.2 Privacy is architectural

Privacy must be enforced before information is placed into AI context.

## 4.3 AI is an application capability, not a database administrator

Gemini receives controlled data through tools and context builders.

Gemini never gets unrestricted database credentials.

## 4.4 Modular monolith first

Use one deployable application with clear domain boundaries.

Avoid microservices unless real operational pressure later justifies them.

## 4.5 Facts and interpretations remain separate

The system should distinguish raw facts from AI-derived interpretations.

Example:

**Fact:** The user liked 83 posts this week.

**Interpretation:** The user appears more engaged than last week.

The raw fact remains authoritative.

## 4.6 Build from simple to advanced

The project should progress from reliable fundamentals to intelligence and optimization.

---

# 5. Scope

## 5.1 In scope

- authentication
- OAuth
- user accounts
- profiles
- user search
- following
- posts
- likes
- comments
- feed
- notifications
- activity tracking
- user statistics
- platform statistics
- trends
- Gemini AI chat
- AI context retrieval
- AI tools
- AI permission filtering
- admin dashboard
- moderation
- Firebase infrastructure
- testing
- Docker
- CI/CD
- deployment

## 5.2 Initially out of scope

- full direct messaging system
- video calling
- livestreaming
- recommendation ML model
- complex distributed event streaming
- Kubernetes
- blockchain functionality
- native mobile apps
- multi-model AI orchestration

These can be added later without changing the core product direction.

---

# 6. Technology Stack

## Backend

- Python 3.x
- FastAPI
- Pydantic
- Uvicorn
- Firebase Admin SDK
- Google Gemini SDK/API
- PyJWT where application-level JWT handling is needed
- HTTPX
- pytest
- pytest-asyncio
- Ruff
- mypy

## Frontend

- React
- TypeScript
- Vite
- React Router
- TanStack Query
- Tailwind CSS or a similar design system
- Fetch API or Axios
- Vitest
- React Testing Library
- Playwright

## Infrastructure

- Firebase Authentication
- Cloud Firestore
- Firebase Storage
- Docker
- Docker Compose
- GitHub Actions

## AI

- Gemini API
- server-side AI orchestration
- controlled tool calling
- contextual prompt construction
- optional streaming responses

---

# 7. High-Level Architecture

```text
                              ┌─────────────────────────┐
                              │        Browser          │
                              │    React + TypeScript   │
                              └────────────┬────────────┘
                                           │
                                      HTTPS / REST
                                           │
                              ┌────────────▼────────────┐
                              │         FastAPI         │
                              │      Modular Monolith   │
                              ├─────────────────────────┤
                              │ Auth                    │
                              │ Users / Profiles        │
                              │ Posts                   │
                              │ Comments                │
                              │ Likes                   │
                              │ Follows                 │
                              │ Feed                    │
                              │ Search                  │
                              │ Notifications           │
                              │ Activity                │
                              │ Analytics               │
                              │ Trends                  │
                              │ AI                      │
                              │ Admin                   │
                              └────────┬─────────┬──────┘
                                       │         │
                         ┌─────────────┘         └───────────────┐
                         ▼                                       ▼
              ┌──────────────────────┐                ┌───────────────────┐
              │       Firebase       │                │     Gemini API    │
              │                      │                │                   │
              │ Authentication       │                │ Reasoning         │
              │ Firestore            │                │ Tool orchestration│
              │ Storage              │                │ Response creation │
              └──────────────────────┘                └───────────────────┘
```

---

# 8. Why a Modular Monolith

This application is a strong fit for a modular monolith because its domains are tightly connected.

A single action can affect multiple parts of the application.

Example:

```text
POST /api/v1/posts
       │
       ├── PostService.create()
       ├── ActivityService.record()
       ├── AnalyticsService.update()
       └── NotificationService.emit_if_needed()
```

Inside a monolith, those calls are local application operations rather than network calls between independently deployed services.

Benefits:

- simpler development
- easier local development
- easier debugging
- simpler testing
- fewer operational dependencies
- lower infrastructure complexity
- easier transaction-like coordination
- easier AI context access

The architecture must remain modular internally so that modules can be extracted later if a real need appears.

---

# 9. Monorepo Structure

```text
socialsphere/
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   │
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   ├── firebase.py
│   │   │   ├── security.py
│   │   │   ├── dependencies.py
│   │   │   ├── exceptions.py
│   │   │   └── logging.py
│   │   │
│   │   ├── modules/
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
│   │   │
│   │   ├── shared/
│   │   │   ├── enums.py
│   │   │   ├── pagination.py
│   │   │   ├── responses.py
│   │   │   └── utils.py
│   │   │
│   │   └── tests/
│   │
│   ├── requirements.txt
│   ├── pyproject.toml
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── router.tsx
│   │   │   └── providers.tsx
│   │   ├── components/
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   ├── feed/
│   │   │   ├── posts/
│   │   │   ├── comments/
│   │   │   ├── chat/
│   │   │   ├── notifications/
│   │   │   ├── profile/
│   │   │   ├── search/
│   │   │   └── admin/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   │   ├── lib/
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
│
├── docs/
├── scripts/
├── tests/
├── .github/
│   └── workflows/
├── .env.example
├── docker-compose.yml
├── .gitignore
├── README.md
└── LICENSE
```

---

# 10. Backend Architecture

Every domain module should have a consistent shape where practical.

Example:

```text
modules/posts/
├── router.py
├── service.py
├── repository.py
├── schemas.py
├── permissions.py
├── exceptions.py
└── models.py
```

## Router

Responsible for:

- HTTP routes
- request parsing
- authentication dependencies
- response serialization

## Service

Responsible for:

- business rules
- orchestration
- cross-domain application workflows

## Repository

Responsible for:

- Firestore access
- queries
- persistence details

## Schema

Responsible for:

- request validation
- response contracts

## Permissions

Responsible for:

- ownership checks
- visibility rules
- role checks
- access policy

The route handler should remain thin.

---

# 11. Frontend Architecture

Use a feature-oriented React architecture rather than placing application logic in `App.tsx`.

Example:

```text
features/posts/
├── api.ts
├── hooks.ts
├── types.ts
├── components/
│   ├── PostCard.tsx
│   ├── PostComposer.tsx
│   └── PostActions.tsx
└── pages/
```

Frontend responsibilities:

- presentation
- interaction
- navigation
- client-side validation
- local UI state
- server-state synchronization

It must not be the source of truth for authorization.

---

# 12. Domain Modules

The initial domain modules are:

1. Auth
2. Users
3. Profiles
4. Posts
5. Comments
6. Likes
7. Follows
8. Feed
9. Search
10. Notifications
11. Activity
12. Analytics
13. Trends
14. AI
15. Admin

A module should expose a small, deliberate public service/API to other modules instead of allowing unrestricted access to its internals.

---

# 13. Authentication and Authorization

## 13.1 Authentication

Supported authentication should include:

- email/password
- Google OAuth
- additional OAuth providers later if needed

Firebase Authentication is the primary identity provider.

## 13.2 Authentication flow

```text
Browser
   │
   ├── Email/password OR Google OAuth
   ▼
Firebase Authentication
   │
   └── Firebase ID token
   ▼
React application
   │
   └── Authorization: Bearer <token>
   ▼
FastAPI
   │
   └── Verify Firebase token
   ▼
Authenticated application request
```

## 13.3 Token verification

The backend must verify:

- token signature
- expiration
- issuer
- audience/project identity
- subject/UID
- token validity

Never simply decode a JWT and trust its claims.

## 13.4 Roles

Base roles:

```text
user
moderator
admin
```

Possible future roles:

```text
support
analyst
system
```

Role checks are performed by the backend.

---

# 14. Users and Profiles

## User record

Suggested fields:

```text
id
username
display_name
email
avatar_url
bio
role
is_active
is_suspended
created_at
updated_at
last_active_at
followers_count
following_count
posts_count
```

## User operations

- create/synchronize user after authentication
- update profile
- change avatar
- change username, subject to uniqueness and validation
- change bio
- configure privacy
- deactivate account

## Username rules

- normalized case strategy
- uniqueness
- length restrictions
- allowed character set
- reserved names
- no impersonation-friendly invalid names

## Profile

Profile page should show:

- avatar
- display name
- username
- bio
- followers
- following
- post count
- posts
- follow relationship
- permitted public metadata

Potential profile visibility modes:

```text
public
followers_only
private
```

---

# 15. Social Graph

The following relationship is conceptually:

```text
User A ───── follows ─────> User B
```

API:

```http
POST   /api/v1/users/{user_id}/follow
DELETE /api/v1/users/{user_id}/follow
```

Rules:

- cannot follow yourself
- duplicate relationships are prevented
- repeated follow/unfollow operations should be handled safely
- counts are maintained by backend logic
- follow actions create activity records
- follow actions can generate notifications

Firestore representation can use:

```text
users/{userId}/followers/{followerId}
users/{userId}/following/{followingId}
```

---

# 16. Posts

Posts support:

- text content
- optional image/media
- author
- visibility
- creation timestamp
- update timestamp
- likes count
- comments count

Suggested schema:

```text
id
author_id
content
media_urls
visibility
likes_count
comments_count
created_at
updated_at
```

Endpoints:

```http
POST   /api/v1/posts
GET    /api/v1/posts/{post_id}
PATCH  /api/v1/posts/{post_id}
DELETE /api/v1/posts/{post_id}
```

Only the owner or privileged staff can modify/delete content according to policy.

---

# 17. Likes

Endpoints:

```http
POST   /api/v1/posts/{post_id}/like
DELETE /api/v1/posts/{post_id}/like
```

Like operations should be idempotent.

Recommended structure:

```text
posts/{postId}/likes/{userId}
```

This naturally gives one like relationship per user/post.

A like can produce:

- notification
- activity event
- engagement statistic update

---

# 18. Comments

Endpoints:

```http
POST   /api/v1/posts/{post_id}/comments
GET    /api/v1/posts/{post_id}/comments
PATCH  /api/v1/comments/{comment_id}
DELETE /api/v1/comments/{comment_id}
```

Suggested fields:

```text
id
post_id
author_id
content
created_at
updated_at
```

MVP: flat comments.

Future: threaded replies.

Comment actions can trigger:

- notification
- activity event
- engagement metric update

---

# 19. Feed

The initial feed should be chronological.

Sources:

- followed users
- the current user's own posts

Endpoint:

```http
GET /api/v1/feed?limit=20&cursor=...
```

Use cursor pagination.

Do not initially build an ML recommendation engine.

Future feed modes:

- Following
- For You
- Trending
- Recommended

---

# 20. Search

Primary purpose: discover users.

Endpoint:

```http
GET /api/v1/users/search?q=emmanuel
```

Search fields:

- username
- display name

Results:

```json
{
  "id": "user_123",
  "username": "emmanuel",
  "display_name": "Emmanuel Bright",
  "avatar_url": "...",
  "is_following": false
}
```

The search layer must not expose hidden fields.

Future search support:

- posts
- hashtags
- topics

---

# 21. Notifications

Types:

```text
LIKE
COMMENT
FOLLOW
MENTION
SYSTEM
```

Suggested fields:

```text
id
recipient_id
actor_id
type
post_id
comment_id
message
is_read
created_at
```

Endpoints:

```http
GET   /api/v1/notifications
PATCH /api/v1/notifications/{notification_id}/read
PATCH /api/v1/notifications/read-all
```

Frontend should expose:

- unread count
- notification list
- read/unread status

---

# 22. Activity Intelligence System

This is a core differentiator.

The platform records meaningful user activity rather than every browser interaction.

Examples:

```text
LOGIN
LOGOUT
PROFILE_VIEWED
PROFILE_UPDATED

POST_CREATED
POST_VIEWED
POST_LIKED
POST_UNLIKED
POST_DELETED

COMMENT_CREATED
COMMENT_DELETED

USER_FOLLOWED
USER_UNFOLLOWED

USER_SEARCHED

AI_CHAT_STARTED
AI_MESSAGE_SENT
```

Do not record pointless high-volume telemetry such as mouse movement or every hover.

## Activity event

```text
event_id
user_id
event_type
target_type
target_id
target_user_id
metadata
created_at
```

Example:

```json
{
  "event_id": "evt_123",
  "user_id": "user_1",
  "event_type": "POST_LIKED",
  "target_type": "post",
  "target_id": "post_123",
  "target_user_id": "user_2",
  "metadata": {},
  "created_at": "..."
}
```

The activity system is the bridge between ordinary social behavior and the AI intelligence layer.

---

# 23. Analytics and Trends

Raw activity should feed aggregated statistics.

Do not scan thousands or millions of raw events for every AI question.

## User statistics

Possible document:

```text
user_stats/{userId}
```

Fields:

```text
posts_created_today
posts_created_week
posts_created_month
likes_given_today
likes_given_week
comments_given_week
followers_gained_week
following_count
profile_views_week
last_active_at
top_topics
```

## Platform statistics

Possible fields:

```text
daily_active_users
daily_posts
daily_comments
daily_likes
daily_follows
top_topics
top_posts
top_users
engagement_velocity
```

## Trends

Trend calculations may consider:

- recent interaction volume
- growth rate
- engagement velocity
- posting frequency
- topic frequency
- acceleration compared with previous periods

The initial implementation can be rules-based.

Later, a recommendation/ML layer can be added.

---

# 24. Gemini AI Assistant

Every authenticated user gets the same application-wide AI assistant capability.

However, each user receives:

- isolated conversation history
- personalized activity context
- personalized profile context
- permitted social context
- current platform trend context

The Gemini API key remains server-side.

The browser must never receive the secret key.

---

# 25. AI Context Architecture

The AI should never be given the entire database.

Context should be constructed dynamically.

```text
User message
    │
    ▼
Intent analysis
    │
    ▼
Required data selection
    │
    ├── own activity?
    ├── own statistics?
    ├── platform trends?
    ├── another user?
    ├── public posts?
    └── conversation history?
    │
    ▼
Permission checks
    │
    ▼
Sanitization
    │
    ▼
Relevant AI context
    │
    ▼
Gemini
```

The central rule is:

> **Retrieve only what is needed and permitted.**

---

# 26. AI Tool System

The AI should interact with application data through controlled tools.

Possible tools:

```text
get_my_activity()
get_my_stats()
get_my_recent_posts()
get_user_profile(user_id)
get_public_user_activity(user_id)
get_public_user_posts(user_id)
get_trending_topics()
get_trending_posts()
get_following_activity()
search_users(query)
get_post_context(post_id)
```

Tool execution sequence:

```text
Gemini requests tool
       │
       ▼
Backend validates arguments
       │
       ▼
Backend identifies current user
       │
       ▼
Permission check
       │
       ▼
Repository/service call
       │
       ▼
Sanitize output
       │
       ▼
Return structured result to Gemini
```

The tool layer is the controlled bridge between the model and application information.

---

# 27. AI Memory

There are three categories.

## Conversation memory

Stored user-specific AI messages:

```text
ai_chats/{userId}/messages/{messageId}
```

## Application memory

Authoritative facts:

- posts
- comments
- likes
- follows
- activity events
- statistics

## Derived context

Interpretations generated from facts.

Example:

- Fact: 83 likes this week.
- Interpretation: activity increased compared with last week.

Derived context should never overwrite the underlying facts.

---

# 28. AI Privacy Boundary

This is a hard requirement.

The AI must never become a backdoor into private data.

Example:

> "Show me John's private activity."

Expected flow:

```text
Request
  │
  ▼
Permission policy
  │
  ├── NO --> safe refusal
  │
  └── YES --> retrieve allowed information
```

The model itself is not the permission system.

The backend is the permission system.

## Information classes

### Public

Potentially accessible to ordinary users:

- public profile
- public posts
- permitted public metrics

### Private

Only owner or authorized users may access:

- private activity
- private settings
- private messages if implemented
- protected profile data

### Internal

Not available to ordinary users:

- security metadata
- moderation notes
- internal audit details
- system configuration
- credentials

---

# 29. AI Conversation Flows

## A. Personal activity

Question:

> "How active have I been this week?"

Flow:

```text
Authenticate
  -> detect USER_ACTIVITY intent
  -> get_my_stats()
  -> get_my_activity()
  -> build context
  -> Gemini
  -> save response
```

## B. Platform trends

Question:

> "What's trending?"

Flow:

```text
Authenticate
  -> detect PLATFORM_TRENDS intent
  -> get_trending_topics()
  -> get_trending_posts()
  -> build context
  -> Gemini
```

## C. Another user

Question:

> "What has John been up to?"

Flow:

```text
Identify target user
  -> evaluate visibility rules
  -> permission check
  -> retrieve public permitted information
  -> sanitize
  -> Gemini
```

## D. Mixed context

Question:

> "Which of the people I follow has been most active around AI this week?"

Possible flow:

```text
identify following list
  -> retrieve permitted activity aggregates
  -> filter to AI-related activity
  -> calculate ranking
  -> send compact result to Gemini
  -> natural-language answer
```

This is exactly the kind of query the contextual AI layer is intended to support.

---

# 30. Admin System

The application should include an administrative interface inspired by Django Admin.

Routes:

```text
/admin/login
/admin
/admin/users
/admin/users/:id
/admin/posts
/admin/comments
/admin/reports
/admin/analytics
/admin/audit-logs
```

## Dashboard

Show:

- total users
- active users
- posts
- comments
- likes
- follows
- AI usage
- reports
- growth

## Users

Admins can:

- search users
- inspect public profile data
- suspend users
- restore users
- adjust roles subject to policy
- review moderation information

## Content

Admins can:

- search posts
- delete posts
- inspect comments
- delete comments
- review reports

## Audit logs

Privileged actions should create records such as:

```text
admin_id
action
target_type
target_id
reason
created_at
```

Admin UI authorization must be enforced server-side.

---

# 31. Firebase Architecture

Firebase provides infrastructure rather than replacing the Python application layer.

Use:

```text
Firebase Authentication
Cloud Firestore
Firebase Storage
```

FastAPI remains responsible for business logic.

```text
React
  │
  ▼
FastAPI
  ├── Firebase Auth verification
  ├── Firestore
  ├── Storage
  └── Gemini
```

Protected business operations should flow through FastAPI rather than allowing arbitrary direct database writes from the browser.

---

# 32. Firestore Data Model

A logical model can be:

```text
users/{userId}

posts/{postId}
posts/{postId}/likes/{userId}
posts/{postId}/comments/{commentId}

users/{userId}/followers/{followerId}
users/{userId}/following/{followingId}

notifications/{notificationId}

activity_events/{eventId}
user_stats/{userId}
platform_stats/{period}
trends/{trendId}

ai_chats/{userId}
ai_chats/{userId}/messages/{messageId}

reports/{reportId}
admin_audit_logs/{logId}
```

Firestore should be designed around application query patterns.

Denormalization is acceptable and often desirable.

Counters should be maintained rather than recomputed on every read.

Use transactions/batched writes where atomic coordination is required.

---

# 33. Storage and Media

Firebase Storage can hold:

- profile images
- post images
- media attachments

Requirements:

- validate MIME type
- validate size
- validate ownership
- restrict upload permissions
- avoid trusting arbitrary filenames
- avoid exposing private files unintentionally

Future media support can include video, but the MVP can remain image-first.

---

# 34. API Design

All APIs should be versioned:

```text
/api/v1/
```

## Auth

```http
GET  /api/v1/auth/me
POST /api/v1/auth/sync
```

## Users

```http
GET   /api/v1/users/search
GET   /api/v1/users/{username}
PATCH /api/v1/users/me
```

## Follows

```http
POST   /api/v1/users/{user_id}/follow
DELETE /api/v1/users/{user_id}/follow
```

## Feed

```http
GET /api/v1/feed
```

## Posts

```http
POST   /api/v1/posts
GET    /api/v1/posts/{post_id}
PATCH  /api/v1/posts/{post_id}
DELETE /api/v1/posts/{post_id}
```

## Likes

```http
POST   /api/v1/posts/{post_id}/like
DELETE /api/v1/posts/{post_id}/like
```

## Comments

```http
POST   /api/v1/posts/{post_id}/comments
GET    /api/v1/posts/{post_id}/comments
PATCH  /api/v1/comments/{comment_id}
DELETE /api/v1/comments/{comment_id}
```

## Notifications

```http
GET   /api/v1/notifications
PATCH /api/v1/notifications/{notification_id}/read
PATCH /api/v1/notifications/read-all
```

## Activity

```http
GET /api/v1/activity/me
GET /api/v1/activity/me/summary
```

Raw internal activity should not automatically become a public endpoint.

## AI

```http
POST   /api/v1/ai/chat
GET    /api/v1/ai/history
DELETE /api/v1/ai/history
```

## Admin

```http
GET    /api/v1/admin/dashboard
GET    /api/v1/admin/users
GET    /api/v1/admin/users/{id}
PATCH  /api/v1/admin/users/{id}
POST   /api/v1/admin/users/{id}/suspend
POST   /api/v1/admin/users/{id}/restore
GET    /api/v1/admin/posts
DELETE /api/v1/admin/posts/{id}
GET    /api/v1/admin/comments
DELETE /api/v1/admin/comments/{id}
GET    /api/v1/admin/reports
GET    /api/v1/admin/audit-logs
```

---

# 35. API Response and Error Standards

Success object:

```json
{
  "data": {
    "id": "post_123",
    "content": "Hello world"
  }
}
```

Collection:

```json
{
  "data": [],
  "pagination": {
    "next_cursor": "abc123",
    "has_next": true
  }
}
```

Error:

```json
{
  "error": {
    "code": "POST_NOT_FOUND",
    "message": "The requested post does not exist.",
    "request_id": "req_123"
  }
}
```

Use consistent HTTP status codes.

Every request should have a correlation/request ID for observability.

---

# 36. Validation

Validate all external input.

Targets:

- usernames
- emails
- posts
- comments
- file metadata
- query parameters
- pagination
- IDs
- enum values
- AI messages

Configurable limits should exist for:

- post length
- comment length
- search query length
- AI message length
- upload size

---

# 37. Security

## Authentication security

- verify tokens server-side
- never trust a client user ID as identity
- never trust a browser-provided role
- require HTTPS in production

## Authorization security

Every protected operation must evaluate:

- authentication
- ownership
- visibility
- role
- resource state

## Secret management

Never commit:

- Gemini API key
- Firebase private key
- OAuth client secret
- signing secrets

## CORS

Restrict production origins.

## Security headers

Apply appropriate production security headers.

## Input validation

Validate every API boundary.

## SSRF

Do not provide arbitrary server-side URL retrieval without strict controls.

## AI security

User-generated content is untrusted prompt input.

A post, comment or profile text must not be allowed to override higher-priority AI instructions or tool permissions.

---

# 38. Privacy

Privacy must be designed into:

- Firestore access patterns
- profile visibility
- post visibility
- activity storage
- AI tools
- AI context construction
- admin tooling
- logging

The AI should never interpret "public" as "anything is permissible to reveal".

Context should be minimized to the question being answered.

---

# 39. Rate Limiting

Rate limiting should protect:

- authentication endpoints
- searches
- post creation
- comments
- follows
- AI requests
- other abuse-prone endpoints

AI should have particularly strong controls because it calls an external paid service.

Example configuration style:

```text
AI_REQUESTS_PER_MINUTE
AI_REQUESTS_PER_HOUR
SEARCH_REQUESTS_PER_MINUTE
POST_REQUESTS_PER_MINUTE
```

Use configurable values rather than hard-coding policy.

---

# 40. Caching

Potential cache targets:

- trending topics
- popular posts
- public profile summaries
- platform statistics
- user statistical aggregates

Do not cache sensitive data without user-scoped keys and proper invalidation.

The initial version can remain mostly Firestore-backed.

Introduce distributed caching only when measured load justifies it.

---

# 41. Background Work

Potential background workloads:

- analytics aggregation
- trend calculation
- notification fan-out
- media processing
- activity summaries
- report processing
- audit processing

Start with lightweight background execution where appropriate.

Introduce a queue only when throughput or reliability requirements justify it.

---

# 42. Real-Time Features

Potential real-time areas:

- notification updates
- AI token streaming
- future direct messaging
- live engagement counters

MVP approach:

- REST for normal operations
- streaming for AI where useful
- Firebase/WebSocket capabilities for later real-time requirements

Do not force WebSockets into every feature.

---

# 43. Observability and Logging

Track:

- request latency
- HTTP status rates
- authentication failures
- Firestore errors
- Gemini errors
- AI latency
- AI request count
- activity processing
- background job failures
- rate-limit events

Structured logs should contain data such as:

```text
level
event
request_id
route
status
latency
user_id where safe
error_code
timestamp
```

Do not log secrets or unnecessary private content.

---

# 44. Testing Strategy

## Unit tests

Cover:

- services
- validators
- permission functions
- feed algorithms
- trend calculations
- AI context generation
- AI tool authorization

## Integration tests

Cover:

- Firestore repositories
- authentication middleware
- API routes
- notification workflows
- cross-module operations

## End-to-end tests

Critical scenarios:

```text
register -> login -> profile -> follow -> post -> like -> comment
```

```text
login -> open AI -> ask about activity -> receive contextual answer
```

```text
search user -> view profile -> follow
```

```text
admin login -> inspect user -> moderate content
```

Most AI tests should use mocks/fakes rather than live Gemini calls.

---

# 45. Frontend UX

The interface should be responsive and coherent across desktop and mobile layouts.

Primary areas:

- Feed
- Search
- Notifications
- Profile
- AI Chat
- Settings
- Admin

Required UI states:

- loading
- skeleton/loading placeholders where helpful
- empty state
- error state
- disabled state
- success feedback

Use optimistic updates only where consistency risks are understood.

Destructive actions should require clear confirmation.

---

# 46. Frontend Routes

```text
/
/login
/register
/forgot-password
/feed
/search
/profile/:username
/notifications
/chat
/settings
/settings/account
/settings/privacy
/settings/security
/admin/login
/admin
/admin/users
/admin/users/:id
/admin/posts
/admin/comments
/admin/reports
/admin/analytics
/admin/audit-logs
```

The root route can redirect to `/feed` for authenticated users.

---

# 47. State Management

Use:

- TanStack Query for server state
- React context or a small store for authentication/session state
- local component state for ephemeral UI

Avoid unnecessarily placing all remote data in one global client store.

---

# 48. Accessibility

Requirements:

- semantic HTML
- keyboard navigation
- visible focus indicators
- accessible labels
- sufficient contrast
- alt text
- screen-reader-friendly notifications
- correct modal focus management
- buttons/controls usable without mouse

---

# 49. Performance

Frontend goals:

- fast initial load
- code splitting
- lazy loading
- image optimization
- efficient rendering
- minimal unnecessary requests

Backend goals:

- indexed Firestore queries
- cursor pagination
- compact payloads
- aggregated statistics
- controlled AI context size

AI goals:

- low time-to-first-token where streaming is supported
- bounded conversation history
- retrieve only relevant context
- avoid huge prompts
- enforce usage limits

---

# 50. Docker and Local Development

Recommended developer workflow:

```bash
git clone <repository>
cd socialsphere
cp .env.example .env
docker compose up --build
```

The project should document:

- Docker setup
- direct Python setup
- direct Node setup
- Firebase configuration
- Gemini configuration
- test commands

Firebase emulators may be used during local development where practical.

---

# 51. CI/CD

Pull-request pipeline:

```text
checkout
  -> backend lint
  -> backend type check
  -> backend tests
  -> frontend lint
  -> TypeScript check
  -> frontend tests
  -> build
  -> security checks
```

Deployment pipeline:

```text
merge to main
  -> CI
  -> build production artifact
  -> deploy
  -> health check
```

The `main` branch should be protected.

---

# 52. Environment Configuration

Use `.env.example` to document required variables.

Example:

```text
APP_ENV
APP_URL
FRONTEND_URL

FIREBASE_PROJECT_ID
FIREBASE_CLIENT_EMAIL
FIREBASE_PRIVATE_KEY

GEMINI_API_KEY

GOOGLE_OAUTH_CLIENT_ID
GOOGLE_OAUTH_CLIENT_SECRET

LOG_LEVEL
RATE_LIMIT_SEARCH
RATE_LIMIT_AI
```

Never commit real credentials.

---

# 53. Deployment

Initial production topology can remain simple:

```text
                         Internet
                            │
                            ▼
                    HTTPS Application
                            │
                    ┌───────▼───────┐
                    │    FastAPI    │
                    │ + React build │
                    └───────┬───────┘
                            │
              ┌─────────────┼─────────────┐
              ▼             ▼             ▼
          Firestore      Storage        Gemini
```

The exact host is intentionally implementation-specific.

The architectural requirement is that the application is a single deployable monolith.

A common production strategy is for FastAPI to serve the built React application and the `/api/v1/*` routes from the same application/domain.

---

# 54. Monitoring and Operations

Health endpoints:

```http
GET /health
GET /ready
```

Monitor:

- uptime
- p95/p99 latency where available
- 4xx rate
- 5xx rate
- authentication errors
- Firestore failures
- Gemini failures
- AI usage
- AI cost
- active users
- event throughput

Operational alerts should be based on meaningful error and availability thresholds.

---

# 55. Data Integrity

The application must prevent:

- duplicate likes
- duplicate follows
- unauthorized mutation
- incorrect ownership
- invalid counters
- inconsistent relationship state

Use Firestore transactions or batched writes when several related updates must remain consistent.

Examples:

```text
follow user
 -> create following relationship
 -> create follower relationship
 -> increment counters
 -> emit activity
 -> create notification
```

The exact transaction boundary should be chosen based on Firestore capabilities and failure semantics.

---

# 56. Scalability Strategy

The first scaling strategy is optimization, not service decomposition.

Order:

1. correct data model
2. correct indexes
3. pagination
4. aggregate statistics
5. caching
6. asynchronous background work
7. AI context optimization
8. hot-document/counter optimization
9. only then consider extracting services

The monolith should remain the default until there is measurable evidence that another architecture is warranted.

---

# 57. Future Service Extraction

Possible future candidates:

- AI service
- notification service
- analytics/trend service
- media processing service
- search service

Future topology could become:

```text
                    Social Monolith
                         │
              ┌──────────┼──────────┐
              ▼          ▼          ▼
             AI      Analytics   Search
           Service    Service    Service
```

The project should be designed so that extraction is possible, not mandatory.

The module boundaries created today are the seams for any future extraction.

---

# 58. Development Path

## Phase 0 — Planning

Deliver:

- requirements
- architecture
- data model
- API conventions
- security model
- AI privacy model
- initial wireframes

## Phase 1 — Foundation

Build:

- monorepo
- FastAPI
- React + TypeScript
- environment configuration
- Docker
- linting
- formatting
- CI

## Phase 2 — Authentication

Build:

- Firebase Auth
- OAuth
- token verification
- protected routes
- user synchronization
- roles
- admin protection

## Phase 3 — Users and Profiles

Build:

- profile
- avatar
- username rules
- profile editing
- visibility

## Phase 4 — Social Graph

Build:

- user search
- follow
- unfollow
- follower/following counts

## Phase 5 — Posts

Build:

- create
- read
- edit
- delete
- images
- visibility

## Phase 6 — Engagement

Build:

- likes
- comments
- counters
- comment moderation rules

## Phase 7 — Feed

Build:

- following feed
- own posts
- cursor pagination

## Phase 8 — Notifications

Build:

- follow notifications
- like notifications
- comment notifications
- read/unread state

## Phase 9 — Activity

Build:

- event model
- recorder
- event queries
- user statistics

## Phase 10 — Analytics and Trends

Build:

- platform statistics
- trending topics
- trending posts
- engagement velocity

## Phase 11 — AI Foundation

Build:

- Gemini service
- chat endpoint
- message storage
- prompt policy
- error handling
- rate limiting

## Phase 12 — AI Intelligence

Build:

- intent routing
- context builder
- tool registry
- activity tools
- trend tools
- public-user tools
- privacy filtering

## Phase 13 — Admin

Build:

- admin dashboard
- user management
- content moderation
- reports
- audit logs
- analytics

## Phase 14 — Production Hardening

Build:

- integration tests
- E2E tests
- observability
- security headers
- CI/CD
- deployment
- monitoring

---

# 59. Implementation Milestones

## Milestone A — Skeleton

- repository exists
- backend starts
- frontend starts
- Docker works
- CI works

## Milestone B — Authentication

- registration works
- login works
- OAuth works
- token verification works
- protected routes work

## Milestone C — Social Core

- users
- profiles
- search
- follows
- posts

## Milestone D — Engagement

- likes
- comments
- feed
- notifications

## Milestone E — Intelligence

- activity events
- aggregates
- trends

## Milestone F — AI

- chat
- history
- contextual answers
- tools
- permission filtering

## Milestone G — Administration

- admin login
- dashboard
- moderation
- audit logs

## Milestone H — Production

- security hardening
- comprehensive tests
- deployment
- monitoring
- documentation

---

# 60. MVP Definition

The MVP must contain:

## Authentication

- email/password
- Google OAuth
- Firebase token verification

## Users

- account
- profile
- username
- avatar
- search

## Social graph

- follow
- unfollow
- counters

## Posts

- create
- edit
- delete
- view

## Engagement

- like
- unlike
- comment

## Feed

- following feed
- chronological ordering
- pagination

## Notifications

- likes
- comments
- follows

## AI

- one shared Gemini assistant capability
- user-specific conversation history
- activity context
- platform trend context
- permitted public-user context
- authorization boundary

## Admin

- admin login
- dashboard
- users
- posts/content moderation

---

# 61. Post-MVP Roadmap

Potential additions:

- bookmarks
- mentions
- hashtags
- reposts
- post sharing
- threaded comments
- private accounts
- block/mute
- advanced search
- ranking feed
- recommendation engine
- media processing
- push notifications
- direct messages
- richer analytics
- AI activity summaries
- AI trend reports
- AI moderation assistance
- mobile app

---

# 62. Non-Functional Requirements

## Security

Unauthorized access must be prevented by default.

## Maintainability

Business domains must remain understandable and independently testable.

## Testability

Critical business logic must not depend entirely on external services to be tested.

## Reliability

External dependency failures should be handled gracefully.

## Observability

Production failures should be diagnosable.

## Performance

Common API and UI operations should remain responsive under expected MVP load.

## Accessibility

Core workflows should be accessible with keyboard and assistive technology.

## Cost control

AI calls and expensive data operations must have clear limits.

## Scalability

Data and module boundaries should permit growth without immediately requiring microservices.

---

# 63. Threat Model

## Token theft

Mitigation:

- HTTPS
- appropriate secure client token handling
- token verification
- session lifecycle controls

## Broken access control

Mitigation:

- centralized authorization
- ownership checks
- visibility checks
- role checks
- explicit negative tests

## Prompt injection

Mitigation:

- treat social content as untrusted
- enforce system instructions
- restrict tools
- validate tool calls
- do not expose database credentials to the model

## AI data leakage

Mitigation:

- permission-aware context retrieval
- data sanitization
- minimum necessary context
- no unrestricted database dumps

## Abuse and spam

Mitigation:

- rate limiting
- validation
- moderation
- monitoring

## Malicious files

Mitigation:

- file validation
- size limits
- controlled storage
- safe filenames

## Privilege escalation

Mitigation:

- server-side role enforcement
- audit logs
- restricted admin endpoints
- no trust in client role state

---

# 64. Engineering Conventions

## Python

- type hints
- Pydantic models
- focused modules
- dependency injection
- explicit exceptions
- service/repository separation
- async where it adds value

## TypeScript

- strict mode
- avoid `any`
- explicit API types
- reusable components
- feature-oriented architecture

## API

- versioned paths
- predictable status codes
- consistent errors
- cursor pagination
- request IDs

## General

- small functions
- readable names
- no giant controllers
- no god objects
- business rules in services
- security checks close to protected operations

---

# 65. Git Workflow

Possible strategy:

```text
main
feature/*
fix/*
chore/*
```

Every pull request should pass:

- lint
- tests
- type checking
- build
- security checks

Commit examples:

```text
feat(auth): add Firebase token verification
feat(posts): implement post creation
feat(ai): add activity context tool
fix(feed): prevent duplicate posts
test(ai): add permission filtering tests
chore(ci): add backend checks
```

---

# 66. Documentation

The repository should contain or eventually contain:

```text
README.md
ARCHITECTURE.md
API.md
AI.md
SECURITY.md
DEPLOYMENT.md
CONTRIBUTING.md
```

Documentation must explain:

- what the project is
- why the architecture was chosen
- local setup
- environment variables
- Firebase configuration
- Gemini configuration
- API conventions
- testing
- deployment
- security
- AI permissions and privacy

---

# 67. Success Criteria

The project is successful when a new developer can:

1. Clone the repository.
2. Configure environment variables.
3. Start the monolith.
4. Register a user.
5. Login using email/password or OAuth.
6. Complete a profile.
7. Search for another user.
8. View that user's permitted profile information.
9. Follow and unfollow users.
10. Create a post.
11. Edit/delete their own post.
12. Like and unlike a post.
13. Comment on a post.
14. See notifications.
15. Browse a feed.
16. Open the AI assistant.
17. Ask about personal activity.
18. Ask about platform trends.
19. Ask about permitted information on another user.
20. Observe safe behavior when asking for unauthorized information.
21. Access the admin dashboard with an authorized admin account.
22. Moderate content.
23. Run automated tests.
24. Build/deploy the application.

---

# 68. Final Architecture

```text
                           ┌────────────────────────────┐
                           │          CLIENT            │
                           │                            │
                           │ React + TypeScript         │
                           │ Vite                       │
                           │ React Router               │
                           │ TanStack Query             │
                           └──────────────┬─────────────┘
                                          │
                                     HTTPS / REST
                                          │
                                          ▼
               ┌─────────────────────────────────────────────┐
               │                  FASTAPI                    │
               │               MODULAR MONOLITH              │
               │                                             │
               │ ┌─────────────────────────────────────────┐ │
               │ │ Auth                                     │ │
               │ │ Users / Profiles                         │ │
               │ │ Posts                                    │ │
               │ │ Comments                                 │ │
               │ │ Likes                                    │ │
               │ │ Follows                                  │ │
               │ │ Feed                                     │ │
               │ │ Search                                   │ │
               │ │ Notifications                            │ │
               │ │ Activity                                 │ │
               │ │ Analytics                                │ │
               │ │ Trends                                   │ │
               │ │ AI                                       │ │
               │ │ Admin                                    │ │
               │ └─────────────────────────────────────────┘ │
               └──────────────────┬──────────────────┬───────┘
                                  │                  │
                                  ▼                  ▼
                      ┌────────────────────┐  ┌───────────────────┐
                      │      Firebase      │  │     Gemini API    │
                      │                    │  │                   │
                      │ Authentication    │  │ reasoning         │
                      │ Firestore         │  │ tool orchestration│
                      │ Storage           │  │ response creation │
                      └────────────────────┘  └───────────────────┘
```

---

# Final Design Principles

TRIBA should be built around the following rules:

1. **One repository and one deployable monolith.**
2. **Clear modules rather than a giant application file.**
3. **FastAPI owns application/business logic.**
4. **React + TypeScript owns presentation and client interaction.**
5. **Firebase provides identity, persistence and storage infrastructure.**
6. **Gemini provides language reasoning, not authorization.**
7. **The AI never receives unrestricted database access.**
8. **Every AI data retrieval passes through backend permissions.**
9. **User activity is recorded as meaningful events.**
10. **Raw facts remain authoritative.**
11. **Aggregates are used for efficient AI context and analytics.**
12. **The first feed is chronological.**
13. **Rate limiting is mandatory for expensive/abusable endpoints.**
14. **Security is enforced server-side.**
15. **Tests are part of feature completion, not an afterthought.**
16. **Operational complexity is introduced only when justified by real requirements.**
17. **The architecture should make future service extraction possible without requiring it today.**

## Architectural North Star

> **A secure modular monolith where ordinary social activity becomes structured application intelligence, and a permission-aware Gemini assistant turns that intelligence into a conversational experience.**

The intended optimization order is:

**correctness → security → maintainability → testability → observability → performance → scale**.

Microservices are not the goal. A well-designed system is the goal.
