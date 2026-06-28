# Royal Rishta Profile

A premium interactive marriage biodata website built with Vite, React, Tailwind CSS, Framer Motion, GSAP, and a custom data-driven Royal Jharokha Lineage System.

## What Is Included

- One-page royal heritage biodata experience
- Hawa Mahal-inspired hero and jharokha visual language
- Editable profile and family data in `src/data/profile.ts`
- Recursive family layout engine in `src/utils/familyLayout.ts`
- Expand/collapse lineage branches
- Zoom and drag controls for the family map
- WhatsApp share, copy link, and PDF download actions
- Responsive sections for about, details, hobbies, values, and closing share flow

## Setup

```bash
npm install
npm run dev
```

The dev server will print a local URL, usually `http://localhost:5173`.

## Production Build

```bash
npm run build
npm run preview
```

## Editing Profile Content

Update `src/data/profile.ts` to replace the sample launch content with the final biodata details.

The family schema supports:

- `id`
- `name`
- `relation`
- `image`
- `side`
- `generation`
- `metadata`
- `spouse`
- `children`

Adding a wife, husband, sibling spouse, child, uncle, aunt, or cousin is done by adding the member to the correct `spouse` or `children` field. The graph will recompute spacing automatically.

## Family Layout Notes

The lineage renderer intentionally uses a custom recursive layout instead of a generic tree package. This keeps the palace facade, jharokha proportions, animated SVG connection lines, and future relationship-specific presentation under direct design control.

## Assets

The current version uses generated initials portraits through image URLs so the layout feels complete immediately. Replace each `image` value in `src/data/profile.ts` with real photo paths or hosted image URLs for launch.

For local photos, place files in `public/profile/` and use paths like:

```ts
image: "/profile/aarav.jpg"
```

## Deployment

This app can be deployed to Vercel, Netlify, Cloudflare Pages, GitHub Pages, or any static hosting provider that supports Vite builds.

Build output is generated in `dist/`.
