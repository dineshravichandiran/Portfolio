# Portfolio

**Dinesh Ravichandiran** — Cloud Services Specialist NOC Engineer, personal portfolio site.

🔗 **Live:** [dinesh-ravichandiran.netlify.app](https://dinesh-ravichandiran.netlify.app/)

## Tech Stack

<p>
<img src="https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB" />
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" />
<img src="https://img.shields.io/badge/Three.js-000000?style=flat-square&logo=three.js&logoColor=white" />
<img src="https://img.shields.io/badge/GSAP-88CE02?style=flat-square&logo=greensock&logoColor=white" />
<img src="https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" />
<img src="https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=reactrouter&logoColor=white" />
<img src="https://img.shields.io/badge/Netlify-00C7B7?style=flat-square&logo=netlify&logoColor=white" />
</p>

## What's in it

A single-page portfolio built around a monitoring/status-page visual identity
(dark theme, cloud-blue accent, semantic status colors), not a template:

- **Two custom Three.js scenes** — a wireframe monitoring globe on the hero,
  and a standalone 3D driving experience (`/journey`) through a procedural
  city telling my career story, with a hand-built chase camera and manual
  orbit mode (no `OrbitControls`).
- **GSAP ScrollTrigger** horizontal scroll-jacked project gallery, with
  scroll-synced active-card highlighting.
- **Custom two-part cursor** (dot + lagging ring) and a torch-light
  cursor-following spotlight effect on cards — no cursor/UI libraries.
- **Guided section navigation** — jump-to-anywhere via the nav, or follow
  "Next" prompts section by section.
- All of it respects `prefers-reduced-motion` and touch devices.

## Running locally

```bash
npm install
npm run dev
```

```bash
npm run build      # production build
npm run preview    # serve the production build locally
```

## Deployment

Netlify, auto-deployed from `main`. SPA routing handled via a catch-all
redirect in `netlify.toml`.
