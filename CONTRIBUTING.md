# Contributing to TRIBA

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/TRIBA.git
   cd TRIBA
   ```
3. Create a feature branch:
   ```bash
   git checkout -b feat/your-feature-name
   ```
4. Set up the development environment:
   ```bash
   cp .env.example .env
   docker compose up --build
   ```

## Git Workflow

### Branch Naming

- `feat/*` — new features
- `fix/*` — bug fixes
- `chore/*` — maintenance, tooling, CI
- `docs/*` — documentation

### Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>
```

Examples:
```
feat(auth): add Firebase token verification
feat(posts): implement post creation
fix(feed): prevent duplicate posts in chronological feed
test(ai): add permission filtering unit tests
chore(ci): add backend lint and typecheck
docs(architecture): document AI context flow
```

### Pull Request Process

1. Update documentation if needed
2. Ensure all checks pass:
   - Backend: ruff, mypy, pytest
   - Frontend: lint, typecheck, vitest, build
   - Security: gitleaks/truffleHog
3. Write a clear PR description
4. Request review from at least one maintainer
5. Address review comments

### PR Requirements

- [ ] All CI checks pass
- [ ] No merge conflicts
- [ ] Tests added/updated for new functionality
- [ ] Documentation updated for user-facing changes
- [ ] No secrets or credentials committed
- [ ] Commit messages follow conventional commits

## Code Review

- Reviews focus on correctness, security, and maintainability
- Be respectful and constructive
- Small, focused PRs are preferred over large ones
- Ask questions if something is unclear

## Development Environment

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

## Questions?

Open an issue or reach out to the maintainers.
