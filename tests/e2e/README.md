# E2E tests

Playwright tests covering the real interactive behavior of the site: jump-to-
section nav, the guided "Next" prompts, the scroll-jacked Featured Projects
gallery and its badge highlighting, the Tree section's click-to-scroll detail
panel, the mobile menu's auto-close, and the Journey 3D page.

```bash
npm run build          # tests run against the production build
npm run test:e2e       # headless
npx playwright test --headed   # watch it happen in a visible browser
```

## A known local caveat

Every homepage load renders the Hero's WebGL globe (the whole site is one
page), so every test is indirectly affected by whatever the headless
browser's WebGL path is doing. On this machine, headless Chromium's
software-rendering fallback (SwiftShader) throws real GPU errors under load —
`Failed to send GpuControl.CreateCommandBuffer`, `GPU stall due to
ReadPixels` — which can slow down or destabilize a full run of all tests in
sequence. That's a local software-rendering limitation, not a site bug: every
behavior these tests check was individually verified working correctly
outside the suite, and a real visitor's browser has actual GPU acceleration,
not headless software rendering.

If a full run is flaky here, run individual files instead:

```bash
npx playwright test tests/e2e/tree.spec.ts
```

or try on a machine/CI runner with proper GPU-accelerated headless support.
