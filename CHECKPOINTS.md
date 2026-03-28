# Checkpoints — Fikseraj

## 2026-03-28 — Inicijalna implementacija

- Next.js 15 (App Router) + Tailwind 4 + Prisma 5 + PostgreSQL shema.
- Auth.js (Google) + Prisma adapter; `/login`, zaštita profila i akcija (API).
- Rute: `/` karta, `/issues`, `/issues/[id]`, `/profile`; FAB za novu prijavu.
- API: CRUD prijava, upvote, resolve (prag 50), upload slika u `public/uploads/issues`, geokodiranje.
- Gmail slanje na pragu upvote-a ako su postavljene Gmail env varijable.
- AI pregled: `GET /api/ai/overview` (Gemini, cache 5 min).
- UI: Inter, tokeni iz brand guidelines (plava/crvena/pozadina).
- **Napomena:** `npm run build` zahtijeva Node >= 18.18 na stroju za razvoj.
