# Contributing to RepoSmart

Thanks for taking the time to contribute.

If you believe you’ve found a security vulnerability, **do not** open a public issue. Please follow [SECURITY.md](SECURITY.md).

## Ways to contribute

- Fix bugs
- Improve documentation
- Add tests (unit/integration)
- Improve UX/accessibility

## Development setup

### Prerequisites

- Node.js 18+
- npm
- MongoDB connection string (Atlas is fine)

Optional (feature-specific):

- Google reCAPTCHA keys (required for register/login flows)
- OpenRouter API key (required for `/api/repo/ai-scan`; optional for AI-assisted malware scans)

### Install dependencies

From the repo root:

```bash
cd server
npm install

cd ../client/smartrepo
npm install
```

### Configure environment variables

Copy `server/.env.example` to `server/.env` and fill values (never commit real secrets):

```bash
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>
JWT_SECRET=replace-with-a-long-random-secret

# CAPTCHA (required for /api/auth/register + /api/auth/login)
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key

GITHUB_API_BASE=https://api.github.com
GITHUB_API_VERSION=2022-11-28
# Optional
GITHUB_TOKEN=github_pat_or_ghp_token_here

# Required by the frontend (client id is not a secret)
GOOGLE_CLIENT_ID=your_google_oauth_client_id

# Optional AI scan (required for /api/repo/ai-scan)
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_MODEL=openrouter/free

# Required for password reset emails (Gmail SMTP by default; see server/config/sendMail.js)
GOOGLE_EMAIL_USER=your_gmail_address
GOOGLE_EMAIL_PASS=your_gmail_app_password

# Optional: Redis cache for /api/repo/analyze
REDIS_URI=redis://default:<password>@<host>:<port>
REDIS_ANALYZE_TTL_SECONDS=3600
REDIS_AI_SCAN_TTL_SECONDS=900
REDIS_MALWARE_SCAN_TTL_SECONDS=900
```

Optional frontend override: copy `client/smartrepo/.env.example` to `client/smartrepo/.env.local` (or create it) and set:

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000

# Required for login/register UI
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
```

### Seed malware keywords (recommended)

Malware scan endpoints use MongoDB keyword documents.

After configuring `MONGO_URI`, run:

```bash
cd server
npm run seed:malware
```

## Running locally

In one terminal:

```bash
cd server
npm start
```

In another terminal:

```bash
cd client/smartrepo
npm run dev
```

App: `http://localhost:3000`

## Code quality

- Run linters before opening a PR:

```bash
cd server
npm run lint

cd ../client/smartrepo
npm run lint
```

- Keep changes small and focused.
- Prefer TypeScript-friendly, type-safe changes on the frontend.

## Pull requests

- Create a feature branch from your default branch.
- Describe **what** changed and **why**.
- Include screenshots/screen recordings for UI changes when helpful.
- Link related issues.

### Commit messages (recommendation)

Conventional Commits are encouraged, e.g.:

- `feat: add xyz`
- `fix: handle abc error`
- `docs: update setup instructions`

## Reporting bugs

When filing a bug report, include:

- What you expected vs what happened
- Steps to reproduce
- Logs / error messages (sanitize secrets)
- Your OS + Node version
