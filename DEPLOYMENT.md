# Deployment Guide

## Production Topology

```
                    Internet
                       │
                       ▼
               HTTPS / Load Balancer
                       │
                       ▼
              FastAPI + React Build
                       │
         ┌─────────────┼─────────────┐
         ▼             ▼             ▼
     Firestore      Storage        Gemini API
```

## Prerequisites

- Docker & Docker Compose (or Kubernetes)
- Firebase project with Auth, Firestore, Storage enabled
- Domain name with SSL certificate
- Gemini API key
- Google OAuth credentials configured

## Environment Variables

Set all variables from `.env.example` in your production environment. Use a secret manager when possible.

Critical variables:
- `FIREBASE_PRIVATE_KEY` — service account key
- `GEMINI_API_KEY` — Gemini API key
- `GOOGLE_OAUTH_CLIENT_SECRET` — OAuth client secret
- `SECRET_KEY` — application signing key
- `APP_ENV=production`
- `APP_URL` — production domain
- `FRONTEND_URL` — production frontend URL

## Build

```bash
docker compose -f docker-compose.prod.yml build
```

## Database

### Firestore Indexes

Deploy composite indexes defined in `firestore.indexes.json`:

```bash
firebase deploy --only firestore:indexes
```

### Firestore Rules

Deploy security rules:

```bash
firebase deploy --only firestore:rules
```

## Deployment

### Option A: Docker Compose (VPS / Simple)

```bash
docker compose -f docker-compose.prod.yml up -d
```

### Option B: Kubernetes

```bash
kubectl apply -f k8s/
```

### Option C: Cloud Run / App Platform

Build and push images:

```bash
docker build -t registry.example.com/triba-backend:latest ./backend
docker build -t registry.example.com/triba-frontend:latest ./frontend
docker push registry.example.com/triba-backend:latest
docker push registry.example.com/triba-frontend:latest
```

## Health Checks

```http
GET /health
GET /ready
```

## Monitoring

Monitor the following in production:

- Uptime and availability
- p95/p99 API latency
- 4xx and 5xx error rates
- Authentication failure rate
- Firestore error rate
- Gemini API error rate
- AI request count and cost
- Active users
- Rate limit events

## Rollback

```bash
docker compose -f docker-compose.prod.yml up -d --force-recreate --rollback
```

Or redeploy the previous image tag.

## CI/CD

Deployments are triggered automatically on merge to `main` via GitHub Actions. See `.github/workflows/deploy.yml`.
