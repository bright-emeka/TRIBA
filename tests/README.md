# TRIBA Test Suite

## Backend Tests

Run backend unit and integration tests:

```bash
cd backend
pytest app/tests/ -v
```

## Frontend Tests

Run frontend tests:

```bash
cd frontend
npm run test
```

## Integration Tests

Run full integration tests (requires services running):

```bash
pytest tests/ -v -m integration
```

## E2E Tests

Playwright tests for critical user flows:

```bash
npx playwright test
```
