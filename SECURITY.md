# Security Policy

## Reporting a Vulnerability

Security vulnerabilities should be reported privately. Please do not open public issues for security concerns.

1. Email the security team at **security@triba.app**
2. Include a clear description, steps to reproduce, and affected versions
3. We will acknowledge receipt within 3 business days
4. We will provide a timeline for remediation

## Supported Versions

| Version | Supported          |
|---------|--------------------|
| main    | Yes                |
| < 1.0   | No                 |

## Security Model

### Authentication

- Firebase Authentication is the primary identity provider
- All tokens are verified server-side on every request
- Tokens are never trusted based on client claims alone
- Google OAuth is supported alongside email/password

### Authorization

- Backend is the sole authority for access decisions
- Every protected operation evaluates: authentication, ownership, visibility, role
- RBAC roles: `user`, `moderator`, `admin`
- Admin UI authorization is enforced server-side, not in frontend routes

### Secret Management

The following secrets must never be committed to version control:

- `GEMINI_API_KEY`
- `FIREBASE_PRIVATE_KEY`
- `GOOGLE_OAUTH_CLIENT_SECRET`
- `SECRET_KEY`

Secrets are injected via environment variables or a secret manager in production.

### AI Security

- Gemini receives controlled data through tools and context builders
- The model never receives unrestricted database credentials
- User-generated content (posts, comments, profiles) is treated as untrusted input
- System instructions enforce tool restrictions and data access policies
- Permission checks happen before any data enters AI context

### Data Protection

- Sensitive data is minimized in AI context
- Private data is never exposed through AI without explicit permission checks
- Firestore security rules provide defense-in-depth
- All sensitive operations are audit-logged

## Threat Model Summary

| Threat | Mitigation |
|--------|------------|
| Token theft | HTTPS, secure token handling, server-side verification |
| Broken access control | Centralized authorization, ownership/visibility checks |
| Prompt injection | Untrusted social content, restricted tools, validated tool calls |
| AI data leakage | Permission-aware context, minimum necessary data |
| Abuse/spam | Rate limiting, validation, moderation, monitoring |
| Malicious files | MIME/size validation, controlled storage, safe filenames |
| Privilege escalation | Server-side role enforcement, audit logs |

## Infrastructure Security

- All production traffic uses HTTPS
- Security headers are applied (CSP, HSTS, X-Frame-Options)
- CORS is restricted to known origins
- Rate limiting protects authentication and AI endpoints
- Dependencies are scanned for known vulnerabilities in CI

## Security Checklist

- [ ] All secrets stored in environment variables or secret manager
- [ ] No client-side authorization logic
- [ ] All API inputs validated with Pydantic
- [ ] Rate limiting configured for abuse-prone endpoints
- [ ] Firestore security rules deployed and tested
- [ ] CI includes secret scanning (gitleaks/truffleHog)
- [ ] Security headers configured for production
- [ ] Audit logging enabled for privileged actions
- [ ] Error messages do not leak sensitive information
