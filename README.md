# Fikseraj

Aplikacija za prijavu gradskih problema u Zagrebu: karta, lista (`/issues`), glasovi (like + „riješeno“), AI pregled (Gemini) i automatski e-mail na Zagreb Holding nakon praga glasova.

## Zahtjevi

- Node.js **^18.18 ili 20+** (preporučeno 20 zbog alata u dependency stablu)
- PostgreSQL baza (npr. [Neon](https://neon.tech))

## Pokretanje

1. `cd fikseraj`
2. Kopiraj `.env.example` u `.env.local` i popuni vrijednosti.
3. `npx prisma db push`
4. `npm run db:seed` (opcionalno — demo korisnik `demo@fikseraj.app` i 3 prijave)
5. `npm run dev` → [http://localhost:3000](http://localhost:3000)

## Env napomene

- **Google OAuth:** U Google Cloud konzoli kreiraj OAuth Client ID (Web) i dodaj redirect `http://localhost:3000/api/auth/callback/google` (i produkcijski URL).
- **Karta:** Uključi Maps JavaScript API; API ključ u `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`. Za geokodiranje (`/api/geocode`) koristi zaseban server ključ ili isti u `GOOGLE_GEOCODING_API_KEY`.
- **Gmail:** Omogući Gmail API; OAuth za poštanski sandučić pošiljatelja; generiraj refresh token za aplikaciju (npr. skripta s `offline` scopeom). Bez `GMAIL_REFRESH_TOKEN` aplikacija i dalje radi, samo se e-mail na pragu ne šalje.
- **Gemini:** `GEMINI_API_KEY` — bez njega AI pregled prikazuje poruku o konfiguraciji.

## Struktura

- `src/app/(shell)/` — karta, lista, detalj, profil + donja navigacija i FAB
- `src/app/login` — Google prijava
- `src/app/api/` — issues, upvote, resolve, upload, geocode, AI overview, profil
- `prisma/schema.prisma` — `Issue`, `Upvote`, `ResolveVote`, NextAuth modeli

## Checkpoint

Vidi [CHECKPOINTS.md](./CHECKPOINTS.md) za zadnji status implementacije.

## Dizajn

Brend CSS temelji se na Figma Make izvozu u `../brand guidlines/Brand Guidelines for Fikseraj/` (Zagreb plava `#0066CC`, akcent crvena, zaobljeni radijusi).
