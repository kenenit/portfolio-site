# Keneni Teha — Portfolio

Next.js 15 + TypeScript + Tailwind CSS + Framer Motion.

## Setup

```bash
npm install
cp .env.local.example .env.local   # then fill in real values, see below
npm run dev
```

Open http://localhost:3000

## Contact form setup

The contact form sends real email via [Resend](https://resend.com).
Required env vars (see `.env.local.example`):

- `RESEND_API_KEY` — from resend.com/api-keys
- `CONTACT_TO_EMAIL` — your real inbox, where submissions get delivered
- `CONTACT_FROM_EMAIL` — the "from" address. Either a domain you've
  verified in Resend, or `onboarding@resend.dev` while developing (works
  immediately, no domain setup, but only delivers to the email address
  you signed up to Resend with — verify a real domain before shipping
  this live).

Without these three set, the form shows a friendly error instead of
crashing (see `src/app/api/contact/route.ts`).

**`ContactSection.tsx`** has real contact info filled in (`EMAIL`,
`GITHUB_URL`, `LINKEDIN_URL`, `TELEGRAM_URL` constants near the top) —
update those directly if any of them ever change.

## Design system

Black + soft pink + warm white. Theme tokens live in `tailwind.config.ts`:

- `bg` / `surface` / `surface-2` — near-black foundation
- `border` / `border-hover` — dark neutrals
- `text` — warm white (content)
- `muted` — warm gray (secondary text)
- `accent` / `accent-soft` — soft pink (identity/accent color — used
  sparingly, not as a base color; primary buttons use a gradient from
  `accent` to `accent-soft`)
- `accent-ink` — deep plum-black, used as text color on top of `accent`
  fills (e.g. primary buttons) for contrast

`Honeycomb.tsx` draws to a `<canvas>`, so it can't read CSS variables —
its stroke/fill colors are hardcoded to match `accent` and must be
updated by hand if the accent color ever changes. `HeroPortrait.tsx`
has one similar hardcoded glow-color value for the same reason.

## Page structure

Section order (`src/app/page.tsx`): **Hero → About → Selected Work →
Services → Technologies I Work With → The Stack → Process → Journey →
Contact → Footer**. This flow is deliberate — who I am → what I've
built → what I can help with → what I use → how my skills are
structured → how I work → where I'm going → contact — so re-check that
story order before moving sections around.

```
src/
  app/
    layout.tsx       — root layout, loads fonts (Space Grotesk, JetBrains Mono, Inter)
    page.tsx          — homepage, assembles all sections in order (see above)
    globals.css        — Tailwind directives, reduced-motion handling, shared keyframes
    api/contact/route.ts — Resend-backed contact form endpoint
  components/
    Nav.tsx
    Hero.tsx            — headline, CTAs, honeycomb bg, circular photo
    Honeycomb.tsx        — cursor-reactive canvas background (client component)
    HeroPortrait.tsx     — circular hero photo: cursor parallax/tilt + glow ring + slow ambient float
    AboutSection.tsx     — pull-quote + stats panel + circular photo (real photo, not the old SVG placeholder)
    ProjectsSection.tsx  — case-study layout, reads from data/projects.ts
    ServicesSection.tsx  — outcome-oriented "what you can hire me for" cards
    TechStackRow.tsx     — compact horizontal scrolling tech ticker, reads from data/skills.ts
    SkillsSection.tsx    — "The Stack": radial hub-and-spoke capability map (desktop) /
                           stacked list (mobile), reads from data/skills.ts. Hovering/tapping a
                           category node shows its description, examples, and real tech in
                           the detail panel. No build-pipeline animation in the hub anymore
                           (that concept lives solely in Process now) — just a static
                           "FULL-STACK" mark.
    ProcessSection.tsx   — "Process": editorial numbered list (Understand → Iterate),
                           large outline numerals, distinct from The Stack
    JourneySection.tsx
    ContactSection.tsx   — real working form (POSTs to /api/contact) + social links
    Footer.tsx
    icons/TechIcon.tsx   — small hand-drawn line icons for concepts with no official
                           logo (SQL, data modeling, etc). Real technologies use their
                           actual logos via devicon instead.
  data/
    projects.ts        — 3 real projects: Nucleus Labs, SavvyMenu, Biku Menu
    skills.ts           — skill groups with description + examples + real tech per
                           category (Frontend, Backend, Database, AI/ML, Tools)

public/
  about-photo.png      — About section photo (has its own glow-ring/orbit-dot styling
                         baked into the image itself — don't add another CSS ring on
                         top of it, that doubles up)
  keneni-photo-pink.png — Hero photo (also has its own baked-in ring/hex pattern)
  keneni-photo.png, keneni-about.png — earlier photo versions, unused but kept in case
  projects/            — project screenshots
```

## Notes

- All animation respects `prefers-reduced-motion` (see `globals.css`,
  and the checks inside `Honeycomb.tsx` / `HeroPortrait.tsx` / `AboutSection.tsx`'s
  parallax/float/glow effects). `Honeycomb.tsx` still draws one static
  frame of the hex grid when reduced-motion is on, rather than staying blank.
- Scroll-reveal is handled entirely by Framer Motion's `whileInView`
  (see `AnimatedText.tsx` and the per-section `motion` variants) — there
  is no separate CSS-based reveal system.
- Favicon, Apple touch icon, and Open Graph/Twitter share image are all
  generated as code (`src/app/icon.tsx`, `apple-icon.tsx`,
  `opengraph-image.tsx`, using Next.js's built-in `next/og` —
  no external image assets). **`metadataBase` in `layout.tsx` is still a
  placeholder (`https://example.com`)** — update it to the real deployed
  domain before shipping, since that's what turns the share-image path
  into an absolute URL social platforms can actually fetch.
- Never actually run through `npm run build` end-to-end outside of local
  dev — worth doing before deploying, to catch anything type-checking
  alone wouldn't.
