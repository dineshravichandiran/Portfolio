import { test, expect } from '@playwright/test'

const SECTION_IDS = [
  'about', 'work', 'skills', 'projects', 'tree', 'timeline', 'credentials', 'contact',
]

test.describe('Homepage', () => {
  test('loads with no console or page errors', async ({ page }) => {
    const errors: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text())
    })
    page.on('pageerror', (err) => errors.push(String(err)))

    await page.goto('/')
    await page.waitForTimeout(1000)

    expect(errors).toEqual([])
  })

  test('every section anchor exists on the page', async ({ page }) => {
    await page.goto('/')
    await page.waitForTimeout(500)

    for (const id of SECTION_IDS) {
      const count = await page.locator(`#${id}`).count()
      expect(count, `expected #${id} to exist`).toBeGreaterThan(0)
    }
  })

  test('years-of-experience stat renders a plausible value', async ({ page }) => {
    await page.goto('/')
    await page.getByText('Years', { exact: true }).scrollIntoViewIfNeeded()
    await page.waitForTimeout(2200)

    const text = await page.evaluate(() => {
      const el = [...document.querySelectorAll('div')].find((e) => e.textContent?.trim() === 'Years')
      return el?.previousElementSibling?.textContent ?? ''
    })

    // Should look like "3.5+" or "4+" — a number followed by a plus sign, never "0.0+".
    expect(text).toMatch(/^\d+(\.\d+)?\+$/)
    expect(text).not.toBe('0.0+')
  })
})
