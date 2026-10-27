# HousingRelay

A multi-page, responsive concept website using the selected exploded-building homepage and neighborhood direction for secondary pages.

**Local preview:** http://127.0.0.1:4173/

## Included

- 34 named routes plus a custom 404, including five separate product pages, platform, role-based solutions, pricing hypotheses, resources, research dossier, trust, accessibility, contact and sign-in preview.
- Original brick illustrations, logo/favicon, Newsreader/Manrope typography and pastel design tokens.
- Lenis scrolling and GSAP reveals: segmented building exit, directional text/card entrances, reversible four-scene pinned story, and horizontal product exploration. Mobile and reduced-motion layouts retain all content without pinning.
- Ten synthetic supervisor records with search, filters, evidence/source/history views, local request/reopen actions, and a separate English/Spanish resident view.
- Local enquiry preview and illustrative JSON report export.

## Boundaries

This is a frontend concept, not an operating housing-maintenance service. No accounts, delivery backend, analytics, payments, integrations, resident uploads, dispatch or HUD submission are connected. Pricing is hypothetical. The resident mock demonstrates a segregated interface, not production authorization. All fixture records are fictional.

## Project map

- `src/App.jsx`: routed pages, interactive demo and motion lifecycle.
- `src/data.js`: five modules, editorial pages, FAQs and validation metrics.
- `src/styles.css`: theme, layout, responsive and reduced-motion styles.
- `public/assets`: optimized WebP illustrations, favicon and synthetic fixture.
- `docs/source-assets`: original generated PNG artwork.
- `docs`: desktop/mobile browser captures and visual comparisons.
- `design-qa.md`: comparison findings, fixes and verification.

## Development

The preview server is running. For later sessions: `npm install`, then `npm run dev -- --host 127.0.0.1 --port 4173`. Production packaging: `npm run build`. Runtime packaging checks: `npm run test:sites`.

The original Sites-compatible runtime files remain intact; no publication has occurred.


## Hostinger static hosting

Use the `hostinger` branch with Hostinger's **Custom PHP/HTML website** Git deployment to `public_html`. `main` holds the complete source and editable film project. GitHub Actions builds and updates `hostinger` after each push to `main`. No Node.js web-app slot or PHP conversion is needed. See [HOSTINGER.txt](HOSTINGER.txt) for setup and fallback upload instructions.
