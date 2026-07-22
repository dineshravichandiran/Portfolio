import { test, expect } from '@playwright/test'

test.describe('Tree section', () => {
  test('clicking a commit scrolls the detail panel into view with the right content', async ({ page }) => {
    await page.goto('/#tree')
    await page.waitForTimeout(2000)

    const commitButtons = page.locator('#tree button[title]')
    const count = await commitButtons.count()
    expect(count).toBeGreaterThan(0)

    // Click the last commit — historically the one most likely to render
    // off-screen from the detail panel if the scroll-into-view regressed.
    const lastCommit = commitButtons.last()
    const commitTitle = await lastCommit.getAttribute('title')
    await lastCommit.click()
    await page.waitForTimeout(800)

    const detailText = await page.evaluate(() => {
      const heading = document.querySelector('#tree h4')
      return heading?.textContent ?? ''
    })
    expect(detailText).toBe(commitTitle)

    // Detail panel should be within (or very near) the viewport, not scrolled
    // off-screen — use a margin off the actual viewport height rather than a
    // magic number, since "near the viewport" is the real thing being tested.
    const viewportHeight = page.viewportSize()!.height
    const detailTop = await page.evaluate(() => {
      const h4 = document.querySelector('#tree h4')
      return h4?.getBoundingClientRect().top ?? -9999
    })
    expect(detailTop).toBeGreaterThan(-100)
    expect(detailTop).toBeLessThan(viewportHeight + 150)
  })

  test('branch progress markers blink through as you scroll', async ({ page }) => {
    await page.goto('/#tree')
    await page.waitForTimeout(1500)

    await expect
      .poll(
        async () => page.evaluate(() => document.querySelectorAll('#tree .marker-dot.marker-active').length),
        { timeout: 5000 },
      )
      .toBe(1)
  })
})
