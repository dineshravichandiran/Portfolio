import { test, expect } from '@playwright/test'

test.describe('Journey 3D page', () => {
  test('loads with no console or page errors', async ({ page }) => {
    const errors: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text())
    })
    page.on('pageerror', (err) => errors.push(String(err)))

    await page.goto('/journey')
    await page.waitForTimeout(3000)

    expect(errors).toEqual([])
  })

  test('sets its own document title, distinct from the homepage', async ({ page }) => {
    await page.goto('/journey')
    await page.waitForTimeout(500)
    expect(await page.title()).toContain('3D Interactive Career Journey')
  })

  test('renders a canvas and the info panel UI', async ({ page }) => {
    test.slow() // WebGL init can be genuinely slower under a real GPU/compositor than headless.
    await page.goto('/journey')

    expect(await page.locator('canvas').count()).toBeGreaterThan(0)
    // Wait for the loader to actually finish rather than assuming a fixed delay is enough.
    await expect(page.locator('#journeyLoader')).toHaveClass(/hidden/, { timeout: 20000 })
    await expect(page.locator('#infoPanel')).toBeVisible()
    await expect(page.locator('#nextMilestoneBtn')).toBeVisible()
  })

  test('next/back milestone navigation updates the info panel', async ({ page }) => {
    await page.goto('/journey')
    await page.waitForTimeout(2000)

    const firstTitle = await page.locator('#infoTitle').textContent()
    await page.evaluate(() => document.getElementById('nextMilestoneBtn')?.click())
    await page.waitForTimeout(1000)
    const secondTitle = await page.locator('#infoTitle').textContent()

    expect(secondTitle).not.toBe(firstTitle)
  })
})
