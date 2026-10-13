# nextjs-passport-entra-id

A minimal Next.js 16 app that displays visitor identity from Microsoft Entra ID through Vercel Passport. Includes an access-status page and a `/api/me` endpoint.

## Run locally

Requires Node.js 22+ and npm.

```sh
npm ci
cp -n .env.example .env.local
npm run dev
```

Open [localhost:3000](http://localhost:3000). `PORTAL_DEMO=true` shows a sample identity only in local development. If `.env.local` already exists, add that setting manually to enable the preview.

## Authentication

Configure Microsoft Entra ID in your Vercel Passport connection and enable Passport for the intended deployment URLs. Keep Entra credentials in the connection settings.

The page and API share `src/lib/identity.ts`, which requires a verified Passport identity with an external subject. Without one, the page shows access denied and `/api/me` returns 401. Demo responses report `authenticated: false`; identity responses are never cached.

## Development

Edit `src/app/page.tsx` and `src/app/globals.css` for the UI. Keep identity checks on the server and authorize access before adding private data or actions.

```sh
npm run lint
npm run build
```

See [AGENTS.md](AGENTS.md) for repository conventions.
