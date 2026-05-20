# Canaan - Site Vitrine (Next.js App Router)

Landing page premium de l'église **Canaan**, construite avec Next.js App Router, Tailwind CSS, Shadcn/UI, Lucide et Framer Motion.

## Stack

- Next.js 14+ (App Router, TypeScript)
- Tailwind CSS
- Shadcn/UI (Button, Card, Badge, Dialog, NavigationMenu)
- Framer Motion
- Lucide React
- Google Fonts via `next/font/google` (`Inter`, `Montserrat`)

## Lancer le projet

```bash
npm install
npm run dev
```

Application disponible sur [http://localhost:3000](http://localhost:3000).

## Scripts utiles

- `npm run dev` : mode développement
- `npm run build` : build production
- `npm run start` : lancer le build
- `npm run lint` : lint Next.js
- `npm run typecheck` : vérification TypeScript

## Structure

- `app/` : layout global, styles globaux, page d'accueil
- `components/` : composants métier et UI
- `lib/` : utilitaires partagés (`cn`)

## Internationalisation

- Routes localisées: `/fr` et `/en`
- Redirection automatique depuis `/` vers `/fr`
- Pages localisées: accueil, don, contact

## Formulaire de contact

- Endpoint API: `POST /api/contact`
- Optionnel: ajouter `FORMSPREE_ENDPOINT` dans `.env.local` pour forward vers Formspree
- Envoi email pro via Resend avec:
  - `RESEND_API_KEY`
  - `CONTACT_TO_EMAIL`
  - `CONTACT_FROM_EMAIL` (optionnel, défaut: `onboarding@resend.dev`)

## Mini CMS Admin

- URL: `/{locale}/admin` (ex: `/fr/admin`)
- Login admin: `/{locale}/admin/login`
- Audit dashboard: `/{locale}/admin/audit`
- Auth par session cookie `httpOnly`:
  - `ADMIN_PASSWORD`
  - `ADMIN_SESSION_SECRET`
- Données persistées dans `data/content.json`
- Audit log des modifications dans `data/audit.log` (JSONL)

## Open Graph dynamique

- Route: `GET /api/og`
- Paramètre optionnel: `?title=CANAAN`
- Utilisé par les métadonnées sociales (Open Graph / Twitter)

## Sécurité API (basique)

- `POST /api/contact` protégé par rate limit mémoire: `3 requêtes / IP / heure`
- En cas d'abus, retour `429 Too Many Requests` avec headers `Retry-After` et `X-RateLimit-*`
- Honeypot anti-bot (`website`) + contrôle de soumission trop rapide (< 2.5s)
- Cloudflare Turnstile optionnel:
  - `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
  - `TURNSTILE_SECRET_KEY`

## Routing Edge

- Utilise `proxy.ts` (Next.js 16+) pour la redirection locale automatique (`/` -> `/fr`)

## Notes design

- Design mobile-first avec grands espacements et overlays sombres sur visuels.
- Images de démonstration dynamiques via Unsplash `source.unsplash.com`.
- Sections : Hero immersive, événements, ministères, dons/libéralités, footer.
