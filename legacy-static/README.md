# Sumanth Srinivas — Portfolio

Static site: `index.html` + `styles.css` + `main.js`. GSAP 3.13 (ScrollTrigger, SplitText) loads from cdnjs. No build step.

Design system from the `ui-ux-pro-max` skill: Dark Mode (OLED), "code dark + run green" palette, JetBrains Mono + IBM Plex Sans.

## Run locally

```bash
cd ~/Desktop/portfolio
python3 -m http.server 8080   # then open http://localhost:8080
```

## Before publishing — fill in

- [ ] LinkedIn and GitHub URLs (`YOUR-HANDLE` in the Contact section)
- [ ] Movies App live-demo link (`href="#"` in the Side project card)
- [ ] Optional: iOS build time once measured (resume has `~[X] min`)

## Deploy (free)

- **GitHub Pages:** push this folder to a repo named `<username>.github.io` and enable Pages.
- **Netlify / Vercel:** drag-and-drop the folder, or import the repo. No build command, publish directory `/`.

## Motion

- Hero: per-character headline (SplitText), staggered copy, 3D terminal entrance, looping release-pipeline ticker
- Scroll: batched card reveals, chip pops, scroll-drawn experience timeline, stat count-up, parallax glow
- Pointer: cursor spotlight on cards, magnetic buttons (fine pointers only)
- `prefers-reduced-motion` renders the final state with no motion; if the CDN fails, content shows statically
