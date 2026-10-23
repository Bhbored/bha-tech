# Skill index

Dictionary of the skills in `.cursor/skills/`. Read the matching `SKILL.md` before doing that work. Open only the entries that fit the task.

## GSAP

**gsap-core** — Tweens with `gsap.to()`, `from()`, and `fromTo()`: easing, duration, stagger, defaults, and `gsap.matchMedia()` for responsive and reduced-motion animation. Use for DOM or SVG motion, or when choosing GSAP as the animation library.

**gsap-react** — GSAP inside React: the `useGSAP` hook, refs, `gsap.context()`, and cleanup on unmount. Use for animation in this site’s React components.

**gsap-timeline** — Sequenced animation with `gsap.timeline()`, the position parameter, nested timelines, and playback control. Use when several tweens must run in a defined order.

**gsap-scrolltrigger** — Scroll-linked animation: triggers, pinning, scrub, and parallax. Use when motion should follow scroll position.

**gsap-plugins** — GSAP plugin registration and use: ScrollToPlugin, ScrollSmoother, Flip, Draggable, Inertia, Observer, SplitText, ScrambleText, SVG and physics plugins, CustomEase, EasePack, CustomWiggle, CustomBounce, and GSDevTools. Use when a task names one of these plugins.

**gsap-utils** — `gsap.utils` helpers: `clamp`, `mapRange`, `normalize`, `interpolate`, `random`, `snap`, `toArray`, `wrap`, and `pipe`. Use when a tween needs a numeric or value helper rather than a new animation API.

**gsap-performance** — Smooth GSAP motion: animate transforms, avoid layout thrashing, use `will-change` sparingly, and batch updates. Use when animation drops frames or needs to stay near 60fps.

**gsap-frameworks** — GSAP lifecycle, selector scoping, and unmount cleanup in Vue, Nuxt, Svelte, and SvelteKit. This site is React; use `gsap-react` for animation here.

## Three.js

**threejs-fundamentals** — Scene setup: cameras, the renderer, `Object3D` hierarchy, coordinate systems, and transforms. Use when creating or restructuring a 3D scene.

**threejs-geometry** — Built-in shapes, `BufferGeometry`, custom meshes, and instanced rendering. Use when creating or optimizing 3D shapes.

**threejs-materials** — Mesh appearance: PBR, basic, Phong, shader materials, and material properties. Use when styling a mesh or tuning how it responds to light.

**threejs-textures** — Texture types, UV mapping, environment maps, cubemaps, HDR images, and texture settings. Use when putting images on meshes or optimizing texture memory.

**threejs-lighting** — Light types, shadows, and image-based lighting. Use when adding or tuning lights and shadows.

**threejs-loaders** — Loading GLTF models, textures, images, and HDR environments, including progress and async loading. Use when bringing assets into a scene.

**threejs-animation** — Keyframe clips, skeletal animation, morph targets, and animation mixing. Use when playing or blending motion on a 3D object.

**threejs-interaction** — Raycasting, camera controls, mouse and touch input, and object selection. Use when the user clicks, drags, or otherwise interacts with a 3D scene.

**threejs-shaders** — GLSL, `ShaderMaterial`, uniforms, and custom vertex or fragment effects. Use when a built-in material cannot produce the effect.

**threejs-postprocessing** — `EffectComposer` and screen effects such as bloom, depth of field, blur, glow, and color grading. Use when the effect applies to the rendered frame rather than one mesh.

## React and data

**vercel-react-best-practices** — Performance patterns for React and Next.js: fewer waterfalls, smaller bundles, rendering cost, and data-fetching shape. Use when writing, reviewing, or refactoring React components for speed. This site is Vite, so apply the client and rendering guidance and skip Next.js server patterns.

**tanstack-query-best-practices** — TanStack Query for server state: queries, caching, mutations, and invalidation. Use when adding React Query data fetching. This site does not use TanStack Query today.

**tanstack-table** — Headless tables and data grids for TypeScript and React. Use when building a sortable, filterable, or virtualized table. This site does not use TanStack Table today.

**react-components** — Turn a Stitch design into modular Vite and React components, with AST checks. Use when implementing a Stitch export in this codebase.

**refactor** — Change structure without changing behavior: extract functions, rename, split large functions, tighten types, and remove duplication. Use for gradual cleanup. Leave behavior changes to a normal feature edit.

## Validation and interface

**zod** — Zod schemas, string checks, `safeParse`, `z.infer`, and error handling. Use when defining or parsing validation, including the contact form schema. Form-library wiring stays with the existing React Hook Form code.

**ui-ux-pro-max** — Design choices for web and mobile: styles, color, type, layout, spacing, and component patterns across common UI stacks. Use when planning or building interface work and the visual direction is still open. Read `DESIGN.md` before changing this site’s look.

**web-design-guidelines** — Review existing UI against the Web Interface Guidelines. Use when asked to review the interface, check accessibility, audit the design, or review UX.
