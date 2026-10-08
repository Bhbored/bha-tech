# BHA Tech public website

Independent Vite frontend for the public BHA Tech website. It contains no authentication, database, portal, or server code.

## Commands

- `pnpm install`
- `pnpm dev`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test --run`
- `pnpm build`

## Browser checks

With `pnpm dev` running, run `pnpm test:browser`. The checks cover six viewport sizes, both themes, navigation, service disclosures, contact fields, motion preferences, and automated WCAG accessibility scans. Screenshots are saved in the ignored `artifacts/` directory.

The runner uses installed Microsoft Edge by default. Set `BROWSER_CHANNEL=chrome` to use installed Chrome, or install a supported Playwright browser. Set `PREVIEW_URL` to test a different local preview URL.

## Visual system

See `DESIGN.md` for the design direction and motion budget. The hero uses a procedural canvas ribbon with no external assets. It pauses offscreen, in hidden tabs, and for reduced-motion preferences. Company and product content lives in `src/app/shared/data/marketing.ts`.

Refresh `/` to see the percentage intro and hero entrance. The sequence takes about 2.3 seconds; Skip and Escape dismiss it. Reduced-motion preferences and direct section links bypass it. The navbar contracts when scrolling down and expands when scrolling up. Intro, navigation, and footer styling lives in `src/styles/shell.css`.

## Contact API

Set `VITE_API_BASE_URL` to the backend origin. The form sends `POST /api/contact` to that origin. The backend must allow the deployed frontend origin through CORS.

For an SPA deployment, configure the host to serve `index.html` for unknown application routes so direct visits to `/privacy` and `/terms` work.
