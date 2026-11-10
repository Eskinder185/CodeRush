import { test, expect, type Page } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const WIDTHS = [320, 360, 375, 390, 430, 768, 1024, 1440, 1920]
const PAGES = ['', 'today', 'journeys', 'journeys/network', 'missions', 'missions/internet-down', 'learn', 'learn/networking', 'learn/networking/net.subnetting', 'practice', 'lab', 'lab/command/linux.ip-addr-show', 'lab/scenario/sc.linux.dns-fail', 'tools/subnetting', 'tools/topology', 'challenges', 'progress', 'languages/python/lessons', 'about']

async function noHorizontalOverflow(page: Page) {
  return page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)
}

test.describe('GitHub Pages paths', () => {
  test('deep links load under /CodeRush/', async ({ page }) => {
    await page.goto('lab/command/linux.pwd')
    await expect(page.getByRole('heading', { level: 1, name: /working directory/i })).toBeVisible()
    await page.goto('languages/python/lesson/python-basics-1')
    await expect(page.getByRole('heading', { level: 1, name: /Hello World/i })).toBeVisible()
  })

  test('assets resolve from the subpath', async ({ page }) => {
    const failed: string[] = []
    page.on('requestfailed', (r) => failed.push(r.url()))
    page.on('response', (r) => r.status() >= 400 && failed.push(`${r.status()} ${r.url()}`))
    await page.goto('')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    expect(failed).toEqual([])
  })
})

test.describe('responsive layout', () => {
  for (const width of WIDTHS) {
    test(`no horizontal page overflow at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 })
      const bad: string[] = []
      for (const p of PAGES) {
        await page.goto(p)
        await page.getByRole('heading', { level: 1 }).first().waitFor()
        if (!(await noHorizontalOverflow(page))) bad.push(p || '/')
      }
      expect(bad, `pages that overflow at ${width}px`).toEqual([])
    })
  }

  test('captures screenshots for visual review', async ({ page }) => {
    for (const [w, name] of [[390, 'phone'], [768, 'tablet'], [1440, 'desktop']] as const) {
      await page.setViewportSize({ width: w, height: 900 })
      for (const p of ['', 'lab', 'learn/powershell', 'progress']) {
        await page.goto(p)
        await page.getByRole('heading', { level: 1 }).first().waitFor()
        await page.screenshot({ path: `e2e-report/screens/${name}-${p.replace(/\//g, '_') || 'home'}.png`, fullPage: true })
      }
    }
  })
})

test.describe('keyboard-only flows', () => {
  test('type a full lesson with the keyboard and pass it', async ({ page }) => {
    await page.goto('languages/python/lesson/python-basics-1')
    // Read the target from the rendered surface: every character is a span inside the code area.
    await page.getByRole('button', { name: /Click here, then start typing/i }).click()
    const target = await page.evaluate(() => {
      const lines = Array.from(document.querySelectorAll('[data-line]'))
      return lines
        .map((l) => Array.from(l.querySelectorAll('span.whitespace-pre > span')).filter((s) => s.textContent !== '↵').map((s) => s.textContent).join('').replace(/\u00a0$/, ''))
        .join('\n')
    })
    expect(target.length).toBeGreaterThan(50)
    await page.keyboard.type(target, { delay: 0 })
    await expect(page.getByRole('heading', { name: /Lesson passed/i })).toBeVisible()
  })

  test('Tab moves focus out of the typing surface when no indentation is expected', async ({ page }) => {
    await page.goto('practice?mode=command')
    await page.getByRole('button', { name: /Click here, then start typing/i }).click()
    await page.keyboard.press('Tab')
    const tag = await page.evaluate(() => document.activeElement?.tagName)
    expect(tag).not.toBe('TEXTAREA')
  })

  test('keyboard shortcut opens search and Escape closes it', async ({ page }) => {
    await page.goto('')
    await page.getByRole('heading', { level: 1 }).waitFor()
    await page.keyboard.press('/')
    const box = page.getByRole('combobox', { name: 'Search' })
    await expect(box).toBeFocused()
    await box.fill('check open ports')
    await expect(page.getByRole('listbox')).toContainText(/ss -tuln|netstat|Get-NetTCPConnection/)
    await page.keyboard.press('Escape')
    await expect(box).toBeHidden()
  })

  test('the simulated terminal supports history with arrow keys', async ({ page }) => {
    await page.goto('lab')
    const input = page.getByLabel(/Command input/)
    await input.fill('pwd')
    await input.press('Enter')
    await expect(page.getByRole('log')).toContainText('/home/student')
    await input.press('ArrowUp')
    await expect(input).toHaveValue('pwd')
  })

  test('onboarding recommends a real path and survives refresh', async ({ page }) => {
    await page.goto('')
    await page.getByRole('button', { name: 'Start my learning journey' }).click()
    await page.getByRole('button', { name: 'Networking & IT Support' }).click()
    await page.getByRole('button', { name: 'Continue' }).click()
    await page.getByRole('button', { name: 'Some experience' }).click()
    await page.getByRole('button', { name: 'Continue' }).click()
    await page.getByRole('button', { name: '20 minutes' }).click()
    await page.getByRole('button', { name: 'See my path' }).click()
    await expect(page.getByRole('link', { name: /Open recommended path/ })).toHaveAttribute('href', '/CodeRush/learn/networking')
    await page.reload()
    await expect(page.getByText('20 minutes a day', { exact: false })).toBeVisible()
  })

  test('terminal navigation changes the virtual working directory', async ({ page }) => {
    await page.goto('lab')
    const input = page.getByLabel(/Command input/)
    await input.fill('cd /var/log')
    await input.press('Enter')
    await expect(page.getByRole('log')).toContainText('Working directory: /var/log')
    await input.fill('pwd')
    await input.press('Enter')
    await expect(page.getByRole('log')).toContainText('student@coderush:/var/log$ pwd')
    await input.fill('cat syslog')
    await input.press('Enter')
    await expect(page.getByRole('log')).toContainText('resolver timed out')
  })

  test('mission accepts evidence in any order and saves its score', async ({ page }) => {
    await page.goto('missions/internet-down')
    await page.getByRole('button', { name: /Query DNS/ }).click()
    await page.getByRole('button', { name: /Test the gateway/ }).click()
    await page.getByRole('button', { name: /Inspect IP configuration/ }).click()
    await page.getByRole('button', { name: /Test DNS host connectivity/ }).click()
    await page.getByRole('button', { name: /The DNS service is failing/ }).click()
    await page.getByRole('button', { name: /Escalate the DNS failure/ }).click()
    await page.getByRole('button', { name: /Run verification/ }).click()
    await expect(page.getByRole('heading', { name: 'Mission complete · 100/100' })).toBeVisible()
    await page.goto('missions')
    await expect(page.getByText('Best score: 100/100')).toBeVisible()
  })
})

test.describe('accessibility', () => {
  for (const p of ['', 'today', 'journeys', 'journeys/network', 'missions', 'missions/internet-down', 'learn/linux', 'learn/linux/linux.navigation', 'practice', 'lab', 'lab/command/linux.ss-tuln', 'lab/scenario/sc.ps.port-test', 'tools/subnetting', 'progress', 'faq']) {
    test(`no serious axe violations on /${p}`, async ({ page }) => {
      await page.goto(p)
      await page.getByRole('heading', { level: 1 }).first().waitFor()
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()
      const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')
      expect(serious.map((v) => `${v.id}: ${v.nodes.length} node(s) ${v.nodes[0]?.target.join(' ')}`)).toEqual([])
    })
  }

  test('light theme also passes contrast checks on key pages', async ({ page }) => {
    await page.goto('')
    await page.evaluate(() => localStorage.setItem('coderush:settings', JSON.stringify({ theme: 'light' })))
    for (const p of ['', 'lab', 'practice']) {
      await page.goto(p)
      await page.getByRole('heading', { level: 1 }).first().waitFor()
      const r = await new AxeBuilder({ page }).withRules(['color-contrast']).analyze()
      expect(r.violations.map((v) => `${p}: ${v.nodes.length} ${v.nodes[0]?.target.join(' ')}`)).toEqual([])
    }
  })
})
