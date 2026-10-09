import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('home, carousel, and FAQ respond to visitors', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('feel like you.')
  await expect(page.locator('.photo-controls')).toContainText('01 / 04')
  await page.getByRole('button', { name: 'Next outfit' }).click()
  await expect(page.locator('.photo-controls')).toContainText('02 / 04')
  await page.getByRole('button', { name: 'Previous outfit' }).click()
  await expect(page.locator('.photo-controls')).toContainText('01 / 04')
  const question = page.locator('summary', { hasText: 'Can I bring my own inspiration?' })
  await question.click()
  await expect(page.getByText('Absolutely. A photograph', { exact: false })).toBeVisible()
  await page.locator('summary', { hasText: 'Where do I start?' }).click()
  await expect(page.getByText('Absolutely. A photograph', { exact: false })).toBeHidden()
  expect(errors).toEqual([])
})

test('all four original outfit photographs load in the gallery', async ({ page }) => {
  await page.goto('/our-work')
  const images = page.locator('.look-photo img')
  await expect(images).toHaveCount(4)
  for (const image of await images.all()) {
    await image.scrollIntoViewIfNeeded()
    await expect.poll(() => image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth >= 700 && img.naturalHeight >= 900)).toBe(true)
    await expect(image).toBeVisible()
  }
  await expect(page.locator('.photo-placeholder')).toHaveCount(0)
})

test('gallery filters lead to a selected outfit enquiry', async ({ page }) => {
  await page.goto('/our-work')
  await expect(page.locator('.look-card')).toHaveCount(4)
  await page.getByRole('button', { name: 'Everyday', exact: true }).click()
  await expect(page.locator('.look-card')).toHaveCount(2)
  await expect(page.getByRole('heading', { name: 'The Emerald Statement' })).toBeVisible()
  await page.getByRole('button', { name: 'Occasion', exact: true }).click()
  await expect(page.locator('.look-card')).toHaveCount(2)
  await page.getByRole('link', { name: 'Discover The Golden Rhythm', exact: true }).click()
  await expect(page).toHaveURL(/\/our-work\/the-golden-rhythm$/)
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Golden')
  await page.getByRole('link', { name: 'Enquire about this look' }).click()
  await expect(page.getByLabel('A look you love')).toHaveValue('the-golden-rhythm')
})

test('an enquiry validates input and prepares the correct WhatsApp message', async ({ page }) => {
  await page.goto('/enquire?look=the-scarlet-bloom')
  await page.evaluate(() => {
    window.open = (url?: string | URL) => {
      ;(window as Window & { preparedEnquiry?: string }).preparedEnquiry = String(url)
      return null
    }
  })
  await page.getByRole('button', { name: 'Continue on WhatsApp' }).click()
  await expect(page.getByRole('status')).toHaveCount(0)
  await page.getByLabel('Your name').fill('Ada Okafor')
  await page.getByLabel('Email address').fill('ada@example.com')
  await page.getByLabel('The occasion').selectOption('Evening event')
  await page.getByLabel('Tell us a little about your idea').fill('I would love a scarlet dress with bell sleeves.')
  await page.getByRole('button', { name: 'Continue on WhatsApp' }).click()
  await expect(page.getByRole('status')).toContainText('Your enquiry is ready.')
  const prepared = await page.evaluate(() => (window as Window & { preparedEnquiry?: string }).preparedEnquiry)
  const url = new URL(prepared!)
  expect(url.hostname).toBe('wa.me')
  expect(url.pathname).toBe('/2349166742722')
  expect(url.searchParams.get('text')).toContain('Name: Ada Okafor')
  expect(url.searchParams.get('text')).toContain('Email: ada@example.com')
  expect(url.searchParams.get('text')).toContain('Occasion: Evening event')
  expect(url.searchParams.get('text')).toContain('Inspired by: The Scarlet Bloom')
  expect(url.searchParams.get('text')).toContain('I would love a scarlet dress with bell sleeves.')
  await expect(page.getByRole('link', { name: 'Open WhatsApp', exact: true })).toHaveAttribute('href', prepared!)
  await page.reload()
  await expect(page.getByLabel('Your name')).toHaveValue('Ada Okafor')
  await expect(page.getByLabel('Tell us a little about your idea')).toHaveValue('I would love a scarlet dress with bell sleeves.')
})

test('navigation works with a keyboard and on a small screen', async ({ page }, testInfo) => {
  await page.goto('/')
  if (testInfo.project.name === 'mobile') {
    await page.getByRole('button', { name: 'Open navigation menu' }).click()
    const dialog = page.getByRole('dialog', { name: 'Navigation menu' })
    await expect(dialog).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
    await page.getByRole('button', { name: 'Open navigation menu' }).click()
    await dialog.getByRole('link', { name: 'The experience' }).click()
    await expect(dialog).toBeHidden()
  } else {
    await page.getByRole('navigation', { name: 'Main navigation', exact: true }).getByRole('link', { name: 'The experience' }).click()
  }
  await expect(page).toHaveURL(/\/the-experience$/)
  await expect(page.getByRole('heading', { level: 1 })).toContainText('with you.')
  await expect(page.getByRole('heading', { name: 'Consider every detail', exact: true })).toBeVisible()
})

test('an empty idea and a past event date cannot prepare an enquiry', async ({ page }) => {
  await page.goto('/enquire')
  await page.getByLabel('Your name').fill('    ')
  await page.getByLabel('The occasion').selectOption('Birthday')
  await page.getByLabel('Tell us a little about your idea').fill('            ')
  await page.getByRole('button', { name: 'Continue on WhatsApp' }).click()
  await expect(page.getByRole('status')).toHaveCount(0)
  await expect(page.getByLabel('Your name')).toHaveJSProperty('validationMessage', 'Please enter your name.')
  await page.getByLabel('Your name').fill('Ada')
  await page.getByLabel('Tell us a little about your idea').fill('A bright birthday outfit with bell sleeves.')
  await page.getByLabel('Occasion date').fill('2000-01-01')
  await page.getByRole('button', { name: 'Continue on WhatsApp' }).click()
  await expect(page.getByRole('status')).toHaveCount(0)
  expect(await page.getByLabel('Occasion date').evaluate((input: HTMLInputElement) => input.validity.rangeUnderflow)).toBe(true)
})

test('pages fit the viewport and meet core accessibility checks', async ({ page }) => {
  for (const path of ['/', '/our-work', '/our-work/the-scarlet-bloom', '/the-experience', '/enquire']) {
    await page.goto(path)
    await page.evaluate(() => document.fonts.ready)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
    expect(results.violations.map(violation => ({ id: violation.id, nodes: violation.nodes.map(node => node.target) }))).toEqual([])
  }
})

test('unknown routes and unknown looks have a useful return path', async ({ page }) => {
  for (const path of ['/not-a-page', '/our-work/missing-look']) {
    await page.goto(path)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('way back.')
    await page.getByRole('link', { name: 'Back to home' }).click()
    await expect(page).toHaveURL(/\/$/)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('feel like you.')
  }
})
