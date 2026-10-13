# nextjs-passport-entra-id

Small Next.js 16 App Router template using TypeScript, React 19, Tailwind CSS 4, and Vercel Passport with Microsoft Entra ID.

## Working on the app

- Always use braces for control-flow bodies, including `if`, `else`, and loops, even for a single statement.
- Use Node.js 22+ and npm. Run `npm ci`, then `npm run dev`; see [README.md](README.md) for the local demo.
- `src/app/page.tsx` and `globals.css` provide the identity UI; `src/lib/identity.ts` owns server-only identity verification; `src/app/api/me/route.ts` exposes the identity response.
- Keep the shared identity helper server-only. Require the Passport header, a verified identity, and `externalSubject`; keep SDK development identities disabled.
- Keep `PORTAL_DEMO` limited to local development outside Vercel. Demo responses must remain explicitly unauthenticated.
- Preserve `Cache-Control: private, no-store` on API responses. Authorize private data and actions on the server.
- Entra credentials belong in Passport connection settings. Never commit secrets or local environment files; `.env.example` contains only demo defaults.

## Verification and Git

- Run `npm run lint` and `npm run build` for code changes. For identity changes, also check denied access and local demo behavior.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
