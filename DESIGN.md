# BHA Tech visual direction

## Design read

An independent engineering studio in Lebanon: expressive enough to attract ambitious founders, clear enough for an operations team buying software. The user's request for a bold, motion-led redesign supersedes the earlier restrained direction.

ENERGY 3 / RHYTHM 3 / MOTION 3. One moving sculpture, large editorial typography, contrasting section surfaces, and short scroll reveals establish the rhythm. The requested entrance sequence adds a skippable, approximately 2.3-second introduction.

## Decisions

- Charcoal and warm paper support both theme preferences. Copper identifies the hero, actions, and the process chapter. The product has a pale olive surface to separate BHA's services from Shabakat.
- System sans-serif gives headings a confident scale with no font download. Georgia italic adds a human counterpoint. A single self-hosted Latin JetBrains Mono file preserves the engineering character in section indices and artwork annotations.
- A twisted copper ribbon represents a continuous, adaptable system. It is procedural canvas artwork, not a product screenshot. Its shape responds gently to pointer movement. Thin orbital outlines belong to the sculpture and the product connection diagram.
- The Shabakat diagram visualizes the existing product's modules. It does not invent usage data or imply a real application screenshot.
- The transparent BHA mark appears in the navigation and footer, paired with a small TECH label. It stays blue in the light theme and switches to white for contrast in the dark theme. Founder names remain; monograms identify people without fabricated portraits. Product and service claims come from the repository's marketing data.
- Full-width service disclosures keep seven capabilities scannable. Native details elements provide keyboard and touch interaction. The expanded content leads to the contact section.
- Arrow icons indicate external destinations or movement to a section; plus icons indicate expandable content. There is no decorative icon grid.
- The intro counter measures the entrance sequence, not downloaded bytes. The copper line emblem introduces the ribbon's geometry, then the page settles into place through a zoom-out and staggered text entrance.
- The navbar's rounded capsule expresses its compact scroll state. It contracts on downward travel and expands upward, using a small direction threshold to prevent jitter. The single frosted surface separates navigation from moving page content.
- The footer closes with an actionable invitation, a compact directory, and the existing wordmark. Its return-to-top link replaces the floating control while visible.

## Performance and accessibility

- The hero is rendered immediately. Artwork is confined to the hero; the former Three.js background is no longer mounted or bundled.
- Canvas rendering is capped at 30 frames per second and 1.5 device pixel ratio. Intersection and visibility observers stop work when it cannot be seen. A pause button and live reduced-motion preference control movement.
- GSAP reveals use scoped cleanup and respect reduced motion. Native scrolling remains intact.
- The intro runs on an initial unanchored homepage visit only. In-page navigation, legal pages, and direct section links bypass it. Skip, Escape, live reduced-motion changes, and a safety timeout dismiss it. The content is inert during the sequence, and the animation context restores its styles when dismissed.
- Layout reflows at 600 and 1000 pixels; navigation changes at 1024 pixels. Typography is fluid. Focus indicators, labeled menus, form feedback, and both themes remain part of the page.
- Contact submission uses the existing configured endpoint. Without configuration, the form clearly reports unavailability and disables submission.
