import { test, expect } from '@playwright/test'

test.describe('Featured Projects scroll gallery', () => {
  test('badge 01 is active on load without a premature blink', async ({ page }) => {
    await page.goto('/')
    await page.waitForTimeout(500)

    const firstBadgeClass = await page.evaluate(
      () => document.querySelectorAll('.project-badge')[0]?.getAttribute('class'),
    )
    expect(firstBadgeClass).toContain('badge-active')
    // The blink should only fire once the section is actually visible, not at page load.
    expect(firstBadgeClass).not.toContain('badge-blink')
  })

  test('badge blink fires once the section scrolls into view', async ({ page }) => {
    await page.goto('/')
    await page.waitForTimeout(500)

    // GSAP pins this section while scroll-jacking, which can confuse
    // scrollIntoViewIfNeeded's "wait for stable position" check — scroll
    // directly to its offset instead.
    await page.evaluate(() => {
      const section = [...document.querySelectorAll('section')].find((s) => s.textContent?.includes('Featured projects.'))
      section?.scrollIntoView({ block: 'start' })
    })
    await page.waitForTimeout(500)

    const firstBadgeClass = await page.evaluate(
      () => document.querySelectorAll('.project-badge')[0]?.getAttribute('class'),
    )
    expect(firstBadgeClass).toContain('badge-blink')
  })

  test('the last badge becomes active by the end of the scroll-jacked gallery', async ({ page }) => {
    await page.goto('/')
    await page.waitForTimeout(500)

    await page.evaluate(() => {
      const section = [...document.querySelectorAll('section')].find((s) => s.textContent?.includes('Featured projects.'))
      section?.scrollIntoView({ block: 'start' })
    })
    await page.waitForTimeout(1000)

    for (let i = 0; i < 35; i++) {
      await page.mouse.wheel(0, 300)
      await page.waitForTimeout(120)
    }
    await page.waitForTimeout(1500)

    const states = await page.evaluate(() =>
      [...document.querySelectorAll('.project-badge')].map((el) => el.classList.contains('badge-active')),
    )
    expect(states[states.length - 1]).toBe(true)
  })
})
