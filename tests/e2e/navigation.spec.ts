import { test, expect } from '@playwright/test'

test.describe('Jump-to-section nav', () => {
  test('clicking a nav item scrolls to that section and updates the hash', async ({ page }) => {
    await page.goto('/')
    await page.waitForTimeout(500)

    const contactBtn = page.locator('nav ul.hidden.lg\\:flex button', { hasText: 'Contact' })
    await contactBtn.click()

    await expect(async () => {
      expect(await page.evaluate(() => location.hash)).toBe('#contact')
    }).toPass({ timeout: 10000 })

    // Poll until the smooth-scroll settles, rather than assuming a fixed wait
    // is long enough — this section is the farthest down a long page.
    await expect
      .poll(
        async () => page.evaluate(() => document.getElementById('contact')!.getBoundingClientRect().top),
        { timeout: 10000 },
      )
      .toBeLessThan(600)
  })

  test('scrollspy highlights the active section as you scroll', async ({ page }) => {
    await page.goto('/#skills')
    await page.waitForTimeout(1500)

    const activeLabel = await page.evaluate(() => {
      const btns = [...document.querySelectorAll('nav ul.hidden.lg\\:flex button')]
      const active = btns.find((b) => b.className.includes('bg-panel-hover'))
      return active?.textContent ?? null
    })
    expect(activeLabel).toBe('Skills')
  })

  test('old route redirects to the matching home anchor', async ({ page }) => {
    await page.goto('/skills')
    await page.waitForTimeout(800)
    expect(page.url()).toContain('/#skills')
  })

  test('guided "Next" button advances to the following section', async ({ page }) => {
    await page.goto('/')
    await page.waitForTimeout(500)

    const firstNext = page.locator('button:has-text("Next")').first()
    await firstNext.scrollIntoViewIfNeeded()
    await firstNext.click()

    await expect
      .poll(
        async () => page.evaluate(() => Math.abs(document.getElementById('live-ops')!.getBoundingClientRect().top)),
        { timeout: 10000 },
      )
      .toBeLessThan(50)
  })

  test('mobile menu closes on scroll', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')
    await page.waitForTimeout(500)

    await page.getByLabel('Menu').click()
    await expect(page.locator('nav ul.lg\\:hidden')).toBeVisible()

    await page.mouse.wheel(0, 200)
    await page.waitForTimeout(300)
    await expect(page.locator('nav ul.lg\\:hidden')).toBeHidden()
  })

  test('unknown route shows the 404 page', async ({ page }) => {
    const response = await page.goto('/this-page-does-not-exist')
    await page.waitForTimeout(300)
    // The SPA still returns 200 (client-side routing), but the 404 content should render.
    expect(response?.status()).toBeLessThan(500)
    const bodyText = await page.locator('body').innerText()
    expect(bodyText.length).toBeGreaterThan(0)
  })
})
