# Redesign validation

## Automated checks

- PASS: `pnpm lint` and `pnpm typecheck`.
- PASS: `pnpm test --run`, two contact-schema tests.
- PASS: `pnpm build`, 146.27 kB gzipped JavaScript, 8.64 kB gzipped CSS, one 40.40 kB self-hosted font.
- PASS: `pnpm test:browser` in headless Microsoft Edge. Viewports: 320, 390, 600, 768, 1024, and 1440 pixels, each in light and dark mode.
- PASS: both themes at 200% zoom; no horizontal overflow.
- PASS: axe WCAG 2 A/AA and 2.1 AA scans in both themes, with no violations reported. Automated scans are not a complete accessibility certification.
- PASS: animated and paused canvas frames, live reduced-motion changes, desktop section links, service disclosures, contact fields, disabled unconfigured submission, mobile menu, Escape focus restoration, back-to-top, and legal routes. No browser runtime errors.
- PASS: intro percentage advances to 100; automatic completion, Skip, Escape, and changing to reduced motion release the overlay and scroll lock. Direct section links bypass the intro.
- PASS: the navbar contracts into its floating capsule on downward scroll and expands on upward scroll. The footer's return-to-top link works, and the floating button yields when that link is visible.

## Design delivery gate

- Hard gate PASS: source content supplies product, service, and founder information; no fabricated customer counts, testimonials, portraits, or performance claims appear in the site.
- Hard gate PASS: all five navigation sections exist; disclosure controls expand; links have destinations; contact unavailability is explicitly displayed.
- Hard gate PASS: responsive and zoom checks above found no overflow; both themes pass the automated contrast scan. Visible focus styles and menu keyboard handling are present.
- Hard gate PASS: production build and interaction checks completed; screenshots were visually reviewed. Application routes remain `/`, `/privacy`, and `/terms`.
- Purpose gate PASS: `DESIGN.md` records the purposes of color, typography, artwork, arrows, section structure, and motion. The ribbon and diagram express connected systems; there are no decorative status badges, fabricated interfaces, or stock logo strips.
- Liveliness PASS: ENERGY 3 / RHYTHM 3 / MOTION 3. Oversized hero type, a pointer-responsive sculpture, a pale product chapter, copper process chapter, and a large footer wordmark create distinct focal points and varied section rhythm.
- Craftsmanship PASS: mobile layouts reflow; original content remains identifiable; service rows use native disclosure controls; artwork stops outside the viewport and while the tab is hidden. Frame geometry reuses typed arrays, and canvas density is capped.
- Craftsmanship PASS: repeated same-anchor navigation works after service expansion. Intersection observers keep reveals accurate when content height changes.
- Purpose gate PASS: the requested loading-style counter explicitly describes introduction progress; the timeline brings in the first section with a zoom-out and staggered entrance. `DESIGN.md` records the capsule navigation and footer decisions.

## Artifacts and limits

Screenshots are generated under ignored `artifacts/`: the percentage intro, compact navbar, desktop and mobile previews, full-page light and dark captures, and both footer themes. The browser checks are reproducible in `tests/browser-check.mjs`.

Contact delivery needs `VITE_API_BASE_URL` and an existing backend; no message was sent during validation. Real-device and other browser-engine testing were not performed. `AGENTS.md` was left unchanged.
