HousingRelay — Evidence Ribbon intro
10 seconds, 30 fps, one continuous scene; silent for inline autoplay.
Desktop: 1920 x 1080. Portrait: 1080 x 1920.

Studio:
npx remotion studio video/src/index.tsx --public-dir=video/public
Render:
npx remotion render video/src/index.tsx EvidenceRibbon public/films/evidence-ribbon.mp4 --public-dir=video/public --codec=h264 --crf=21 --concurrency=2
npx remotion render video/src/index.tsx EvidenceRibbonMobile public/films/evidence-ribbon-mobile.mp4 --public-dir=video/public --codec=h264 --crf=21 --concurrency=2

Art: selected user reference; foreground, clean backdrop and clouds generated as separate original layers with image generation. No real residents or operating product records.
Brand: existing HousingRelay SVG. Type: local Newsreader and Manrope.
Animation: frame-driven Remotion 2.5D composition. Two cloud layers drift independently, stage eases into place, text reveals, a light trace follows the evidence ribbon and reviewer markers gently pulse. No claim of true 3D character animation.

Integration: src/IntroFilm.jsx and the existing Lenis/GSAP lifecycle in src/scroll-motion.js. Video ended event initiates 1.35-second Lenis handoff. Manual scroll interrupts automatic handoff. Pause/Play/Replay/Skip remain accessible. Tab hiding and leaving the intro pause playback. Reduced motion displays the final poster with Continue, no autoplay or automatic scroll. Navbar remains inert/hidden above the hero and fades in near its anchor.

Webpack caching disabled in remotion.config.ts to avoid unnecessary disk usage.
