# HousingRelay design QA

final result: passed

Scope: responsive, local synthetic concept website. This result does not certify a production housing system, legal compliance, accessibility conformance or backend security.

## Visual truth and rendered evidence

- Homepage source: `docs/reference-home.png`, selected exploded-building Option 2. Original: `/Users/prajaktagaikwad/.codex/generated_images/01a178b2-c042-7a60-a01c-c5c46e379e92/exec-e8f3bcac-0c34-4585-8f82-5a8122634b19.png`.
- Secondary source: `docs/reference-secondary.png`, selected neighborhood Option 1. Original: `/Users/prajaktagaikwad/.codex/generated_images/01a178b2-c042-7a60-a01c-c5c46e379e92/exec-41eb8184-7047-4a8f-8365-5165fff5bb59.png`.
- Browser implementation: `http://127.0.0.1:4173/`, `/products`, `/products/repair-proof`, and synthetic demo routes.
- Desktop viewport: 1440 × 1000 CSS pixels; screenshots 1440 × 1000 pixels, effective density 1. Mobile: 390 × 844 CSS/pixel viewport. Tablet: 768 × 1024 CSS/pixel viewport.
- Source boards: 992 × 1586 pixels. Comparisons normalize both sides to 720px width. Relevant hero/section regions are cropped, with source and implementation together in one image. Source boards are conceptual page studies, not identical screen states; page-specific copy and longer operational content intentionally differ.
- Homepage evidence: `docs/home-desktop.png`, `docs/home-mobile.png`, `docs/home-tablet.png`.
- Secondary evidence: `docs/products-desktop.png`, `docs/products-full-static.png`, `docs/secondary-desktop.png`, `docs/secondary-mobile.png`.
- Combined comparisons inspected: `docs/home-hero-comparison.png`, `docs/secondary-full-comparison.png`, `docs/inspection-comparison.png`.
- Focused typography comparison inspected: `docs/typography-comparison.png`. Dense workbench was also inspected at native screenshot size in `docs/inspection-desktop.png` and `docs/supervisor-desktop.png`.
- Static secondary full-page capture uses Motion off, matching the source board's static state. Normal homepage captures use Motion on after entrance reveals. Intermediate story captures demonstrate transitions and may intentionally show partial opacity.

## Findings and comparison history

1. **P2 — Hero roof clipped.** Initial `docs/home-before.png` lost the top roof because the building extended above its section. Set the frame to 100% section height with zero top offset. `docs/home-desktop.png` now retains the complete roof and garden base.
2. **P2 — Secondary evidence card clipped at the right edge.** Reduced art-frame overhang and placed cards within the hero bounds. Final secondary captures show all four evidence cards and their links.
3. **P2 — Mobile reveal transforms widened the document.** At 390px the page measured 408px. Clip horizontal animation overflow at the main boundary. Recheck measured exactly 390px across the route sweep; tablet measured exactly 768px.
4. **P1 — Trailing-slash deep links reached the 404.** Normalize trailing slashes before page selection. `/company/`, `/sign-in/` and `/demo/` were revisited and rendered their intended headings. Original observations remain in `docs/route-checks.json`; fixes are recorded in `docs/route-recheck.json`.
5. **P2 — Secondary direction was too sparse.** Expanded from two to four hero evidence cards, restored the cream field, added compass/note and building context, enlarged the neighborhood, and added the pink apartment/evidence chapter with five colored module cards. Final comparison: `docs/secondary-full-comparison.png`.
6. **P2 — Workbench type was undersized.** Increased desktop record rows, source timestamps, heading and badge sizes. Enlarged the room illustration. Re-captured and compared in `docs/inspection-comparison.png`.
7. **P2 — Enlarged neighborhood approached body copy.** Limited the body column and restored three explicit suite-heading lines. Final `docs/products-desktop.png` and full comparison show separated text and imagery.
8. **P2 — Story text crossfades could overlap.** Changed outgoing/incoming scene fades to sequential intervals. Retained reversible scroll progress and complete stacked content when motion is disabled.
9. **Runtime cleanup.** Scoped hero tweens to pages containing a hero. No new browser errors or warnings appeared in the final checked interval. Split the motion bundle so the production build no longer emits the large-chunk warning.

No actionable P0/P1/P2 finding remains in the reviewed concept scope.

## Required fidelity surfaces

- **Typography:** Newsreader supplies the source-like editorial serif and italic; Manrope supplies UI text. Fonts are bundled locally. Hero wrapping, three-line product heading, mobile hierarchy and workbench labels were inspected. The source font was not provided as a named font; this is a close stylistic implementation, not a claim of an identical font file.
- **Spacing/layout:** Three-part homepage hero, blue inspection section, five-module section, cream neighborhood hero and pink cutaway chapter are retained. Real text and controls require more vertical space than the flattened concept board. Mobile stacks scenes, uses a navigation drawer and avoids pinning.
- **Colors:** Olive text/actions, cream surfaces, matcha scenes, blue inspection background, pink evidence panels, peach review states and lilac held notifications retain the selected palette. Status is also expressed in text, not color alone.
- **Images:** Original generated transparent raster illustrations recreate the selected subjects. Separate neighborhood, exploded building, apartment, sink and five module vignettes are retained. These are recreated assets, not pixel-identical extractions. WebP delivery preserves alpha; original PNGs remain in `docs/source-assets`. UI uses real text, controls and icon-library components.
- **Copy:** Brand is HousingRelay. Five distinct proposed modules remain separate. Repair Proof is the first-pilot focus. Pricing remains hypothetical. Regulatory applicability is not guessed. No fake customer logos, integrations, certification, live telemetry or operational success claims were added.

## Functional and responsive verification

- Browser sweep: all 34 named routes plus custom 404, with three slash-route corrections rechecked. No broken loaded images or horizontal mobile overflow in the recorded sweep.
- Mobile navigation opens and closes; route links render the correct page.
- Home workbench evidence request displays local simulation feedback.
- Supervisor queue loads 10 fictional records; reviewed filter returns 2; unmatched search gives an explicit empty state.
- Photo source drawer identifies the missing source; evidence request updates the local state. Incomplete HM-032 cannot be verified.
- Resident language switch changes the status to Spanish; acknowledgement changes the button state without sending a message.
- Enquiry form validates required selections and consent; submission produces an explicit preview-only result.
- Desktop horizontal module rail moved under scroll and released at its endpoint. Skip controls are provided.
- Four-scene story advanced from neighborhood to evidence detail and human review. Reverse scrolling is supported by the scrubbed timeline.
- Motion toggle was operated with keyboard; Motion off removed pin spacers and retained all four scenes. OS reduced-motion is also respected in code.
- 1440px supervisor and 390px supervisor/resident captures saved. Demo frames carry synthetic-data/concept labels; the resident screen contains only its own synthetic ticket.
- Final production build passed. Four existing runtime packaging tests passed.

## Expected differences and remaining checks

- This is an implemented interpretation of the selected directions. Route connectors and some illustrated details are simplified; scene geometry, copy density and responsive composition are not a pixel-for-pixel reproduction of the boards.
- Source motion-storyboard captions become actual motion behavior rather than technical labels in customer-facing sections.
- Real repair photographs are replaced by explicitly illustrative original models. Model images never count as technician evidence.
- P3 polish: a future art pass could further refine curved route traces, floor-marker spacing and exact source font proportions.
- Not tested: full assistive-technology audit, low-end-device performance, all browser engines, live form delivery, actual authentication or integrations. Those are outside this isolated concept build.

## Implementation checklist

- [x] Two selected directions applied and extended with additional assets.
- [x] Desktop/mobile browser captures and combined visual comparisons saved.
- [x] Layout, route, typography and runtime findings fixed and rechecked.
- [x] Motion alternatives, synthetic labels and human-verification boundaries preserved.
- [x] Build and runtime packaging checks pass.
- [x] Local preview and source handoff prepared; no deployment performed.


## Refinement QA — 27 Oct 2026
- Removed only the floating B-03 / Fictional building tag; synthetic-data labels remain.
- Hero card coordinates matched exactly before and after a full-page End/Home scroll cycle at 1280px. Scroll transforms no longer control card positions.
- Homepage module layout confirmed 3–2 at desktop and 775px. Existing illustrations/copy preserved.
- Tested rendered 775px and 390px layouts in same-origin responsive iframe fixtures; document width equals viewport width, no horizontal overflow. Temporary fixture removed before build.
- Keyboard focus confirmed pilot card background-size 100% 100% and CTA fill 100% 100%, anchored left-center.
- Motion-off confirmed sketch animation none and button/card transition duration 0s; restored motion-on afterward.
- Footer inspected at desktop, tablet and phone sizes. Corrected outlined wordmark viewBox to prevent clipping.
- Production build passed; four existing Sites checks passed.
- References and generated asset details: docs/footer-references.txt.

## Brief completion audit
Added full sign-in preview and header access, exploration navigation, product FAQs/commercial context, pilot kit downloads, guided closeout story, overdue review filter, visible owner/next-action targets and evidence timestamps. Browser verified empty email validation, fictional account success, supervisor entry, 8 overdue records and all four guided story actions. CSV files reconcile to the canonical 10-record fixture. Full requirement map: docs/brief-coverage-audit.md.

### Site-wide scroll motion — 27 Oct 2026
- Centralized Lenis and GSAP under a route-scoped lifecycle. Added sequential copy/card reveals, reversible illustration parallax, horizontal module-art reveals, richer story transitions and footer assembly.
- Browser verified product workflow rows from opacity 0 to 1 on scroll; secondary illustration transform changed with scrolling; products rail has one pin and five modules.
- Motion off removed Lenis and all pin spacers, restored all checked headings/cards/footer content; turning motion on restored the experience. Route navigation reset scroll to top without old pins.
- Homepage four evidence-card x/y coordinates matched exactly before and after End/Home. Hover movement excluded from the comparison.
- Responsive frames at 390px and 775px had equal client/scroll widths (no horizontal page overflow). Native touch remains enabled; mobile parallax is limited to 26px total travel.
- Browser error/warning log empty during tested flows. Existing Sites tests pass. Screenshot: ../housingrelay-scroll-motion.png.


## Evidence Ribbon intro — 27 Oct 2026
- Rendered and inspected 10-second 30-fps desktop (1920×1080) and portrait (1080×1920) clips; original separated foreground, sky and cloud assets.
- Verified fresh desktop visit: navbar hidden/inert during film, natural completion at 10 seconds, Lenis lands exactly at hero anchor (scrollY 720 at 1280×720), navbar visible.
- Verified mobile 390×700 iframe visually: portrait scene is readable, no cut-off headline; completion reveals mobile navbar and original hero.
- Verified Pause stops playback. Reduced-motion preference persists through reload, removes video entirely, shows static poster and Continue; Continue lands at hero and reveals navbar.
- Browser console: no warnings/errors on completed desktop playback.
- Fixed existing scroll-padding offset by using an absolute numeric target for the film handoff. Added early manual browser scroll restoration to coordinate reloads.
- Build and Sites packaging tests passed; no deployment or real operational action.


## Quick responsive QA — 27 Oct 2026
- Real browser viewport checks at 320×740, 390×844, 768×1024, and 1440×900; sampled homepage, Repair Desk, pricing, sign-in, pilot request and supervisor demo. Results: docs/responsive-qa-results.json.
- No page-level horizontal overflow or broken loaded images in sampled checks. Narrow-phone form controls fit. Mobile menu fits viewport and exposes 17 route links in its scrollable area. No browser console warnings/errors during sampled route checks.
- Fixed tablet hero artwork overlapping CTA copy at 601–850px by moving the building below the copy while preserving the evidence-card anchors and desktop layout.
- Fixed portrait tablet film selection: orientation/aspect ratio now selects the portrait asset rather than a phone-width cutoff. Verified 768px tablet selects mobile film and Skip reaches exact hero anchor, with navbar visible.
- Screenshot: docs/responsive-qa-tablet.png. Build and four Sites tests passed. This is a quick responsive spot-check, not a full cross-browser/accessibility certification.
