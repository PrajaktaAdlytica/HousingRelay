# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## HousingRelay decisions
- Homepage uses the selected exploded-building Option 2; secondary pages use the neighborhood/cutaway Option 1.
- LEGO-like original brick scenes are the main story, with cinematic reversible scroll chapters and pastel evidence cards.
- Palette: cream, matcha, olive, pink, blue and peach. Newsreader display typography; Manrope interface typography.
- Preserve synthetic-data and concept labels. Human verification is compulsory; never claim live dispatch, operating integrations, HUD approval or real customer results.
- Keep the local prototype isolated. No deployment, payment or live data collection is part of this build.

- Approved logo: Terrace stepped LEGO-style building in olive, matcha, and blush, from the user-selected 27 Oct image. Use native SVG assets in public/brand for all logo placements and favicons.

## Refinement decisions, 27 Oct 2026
- Homepage modules retain their illustrations/copy and use a centered 3–2 layout on tablet/desktop; compact screens use two columns.
- Hero cards remain anchored to CSS positions on repeated scroll returns; never add scroll transforms to their stack. Floating fictional-building tag removed; demo labels remain.
- Inspection includes subdued animated brick line sketches. Buttons fill left-to-right and the pilot card fills bottom-to-top, with static reduced-motion behavior.
- Footer uses original pastel brick architecture, brick-stud navigation panels, and an oversized outlined HousingRelay wordmark. Preserve all existing navigation and legal/concept labels.

- Sign-in is an email-link UI preview only, with fictional demo email, no delivery/authentication/password collection. Keep access boundaries explicit. The pilot kit and guided closeout story fulfill the original handoff brief without enabling real operational actions.

- Secondary marketing heroes must use pastel surfaces. Green/default heroes use sage instead of cream. Preserve existing pink heroes and the homepage exactly when adjusting secondary hero colors.

## Site-wide scroll motion
- Use src/scroll-motion.js as the single Lenis/GSAP lifecycle, with cleanup on route changes and motion toggles.
- Extend motion through secondary heroes, workflow cards, editorial illustrations, resources, pricing, CTAs and the brick footer. Preserve layouts, palettes and the homepage evidence-card anchors.
- Native touch scrolling, smaller mobile motion, immediate keyboard-focus reveals and complete Motion off states are required. Do not animate operational decisions or delay form controls.

## Navigation refinement
- Navbar omits the CONCEPT PREVIEW / DEMO — SYNTHETIC DATA label; keep the contextual demo and footer disclosures elsewhere.
- Navbar stays visible at the top during scrolling. Navigation hover fills, transforms and underlines are disabled; preserve visible keyboard focus and selected/open states.
- Products and Explore use click-open disclosures with outside-click/Escape dismissal. Keep mobile navigation scrollable and all routes accessible.

## Intro film — approved 27 Oct 2026
- Add a 10-second, single continuous Evidence Ribbon scene above the unchanged homepage hero. Reference: ChatGPT Image 27 Oct 2026, 16_26_52.png.
- Pastel brick building, independently moving clouds, gentle camera movement, a light trace along the pink ribbon toward human review. No cuts between scenes.
- Navbar is hidden and inert throughout the intro; it fades in as the hero enters. Natural completion smoothly scrolls to the hero. Manual scrolling cancels automatic takeover.
- Keep Pause/Play, Replay and Skip/Continue controls. Reduced-motion users receive a still and an explicit Continue action without automatic motion.
- Remotion sources live in video/src; generated desktop/mobile MP4s and posters live in public/films.

## GitHub and hosting — approved 27 Oct 2026
- User authorized pushing the complete site to PrajaktaAdlytica/HousingRelay and requested Hostinger setup instructions. Source branch main; compiled-only branch hostinger for generic PHP/HTML hosting.
- Keep GitHub Actions building dist/client and updating hostinger. Preserve the Apache/LiteSpeed SPA fallback in public/.htaccess. No PHP backend conversion requested or implemented.
