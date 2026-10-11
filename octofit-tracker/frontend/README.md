# Octofit Tracker presentation tier

The React 19 presentation tier uses React Router for navigation and reads data
from the Express API on port 8000.

## Run locally

Start the backend, then run the frontend with:

```bash
npm run dev --prefix octofit-tracker/frontend
```

Without `VITE_CODESPACE_NAME`, the frontend uses `http://localhost:8000` for API
requests.

## Run in GitHub Codespaces

Define `VITE_CODESPACE_NAME` in `octofit-tracker/frontend/.env.local` with the
Codespace name (not a URL), for example:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

This directs browser API requests to
`https://your-codespace-name-8000.app.github.dev`. The variable must be set in
Codespaces; Vite reads `.env.local` when it starts, so restart the frontend
development server after changing it. Keep `.env.local` local to your
environment and do not commit it.
