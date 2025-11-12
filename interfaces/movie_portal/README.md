# Frontend Client

Vite + React single-page application that fetches movie metadata from the backend API.

## Commands

```bash
npm install
npm run dev
npm run lint
npm run test
npm run build
```

## Environment

- `VITE_MOVIE_API_URL` (dev)
- `REACT_APP_MOVIE_API_URL` (build arg in CI/CD)

These control where the client fetches movie data.
