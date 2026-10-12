# Redesign validation

## Automated checks

- `pnpm lint`, `pnpm typecheck`, `pnpm test --run`, and `pnpm build` validate the application and two contact-schema unit tests.
- `pnpm test:browser` runs 13 independent Playwright tests in headless Microsoft Edge. The runner starts its own Vite server and stores failure traces and screenshots under ignored `artifacts/playwright/`.
- Browser checks cover the introduction sequence, reduced-motion behavior, animated artwork, section navigation, mobile menu keyboard handling, service disclosures, contact fields, footer links, and legal routes.
- Responsive checks cover 320, 390, 600, 768, 1024, and 1440-pixel viewports in both themes. Both themes are also scanned with axe WCAG 2 A/AA and 2.1 AA rules at desktop width and checked for overflow at 200% zoom. Automated scans do not replace a manual accessibility review.

## Delivery notes

The public routes are `/`, `/privacy`, and `/terms`. The contact form requires `VITE_API_BASE_URL` and a running backend before it can deliver messages. Browser checks validate the unavailable state when no endpoint is configured; they do not submit a message. Real-device and other browser-engine testing remain outside this validation. `AGENTS.md` remains unchanged.
