# Sumanth Srinivas — Portfolio

Next.js 16 (App Router) + Tailwind CSS v4 + Motion. Dark theme modelled on vevaar.com (black canvas, zinc neutrals,
purple → violet → pink accent, Outfit / Geist / Geist Mono); content from the resume.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Edit content

All copy lives in `src/content/profile.ts`. Before publishing, fill in:

- [ ] `linkedin` and `github` URLs (`YOUR-HANDLE`)
- [ ] `project.demo` (Movies App live demo)

## Sections

Preloader (Telugu "namaste", once per session) → sticky three-beat hero (Build / Sign / Ship) → stats → work bento
(release platform with animated fastlane run) → experience timeline with scroll beam → scroll-revealed motto →
toolbox marquee + grouped skills → contact.

Component patterns are rebuilt from 21st.dev designs (credited in code): Background Paths, Spotlight Card, Timeline,
Text Reveal, Marquee. The 21st registry needs a logged-in account, so none of their code is copied in.

All motion respects `prefers-reduced-motion`. The previous static site is in `legacy-static/`.

## Deploy

Push to GitHub and import into Vercel (zero config).
