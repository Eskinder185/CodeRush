import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, within, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
import { resetStoreCache, getData } from '../lib/storage/store'
import { resetSettingsCache } from '../lib/settings'

// jsdom does not implement <dialog>; give it the minimum the app uses.
beforeEach(() => {
  resetStoreCache()
  resetSettingsCache()
  HTMLDialogElement.prototype.showModal = vi.fn(function (this: HTMLDialogElement) {
    this.setAttribute('open', '')
  })
  HTMLDialogElement.prototype.close = vi.fn(function (this: HTMLDialogElement) {
    this.removeAttribute('open')
  })
  window.scrollTo = vi.fn() as unknown as typeof window.scrollTo
  Element.prototype.scrollTo = vi.fn() as unknown as typeof Element.prototype.scrollTo
})

function go(path: string) {
  window.history.pushState({}, '', path)
  return render(<App />)
}

describe('navigation and shell', () => {
  it('renders the homepage hero and primary actions', async () => {
    go('/')
    expect(await screen.findByRole('heading', { level: 1, name: /Master the Keyboard/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Start My Learning Journey/i })).toHaveAttribute('href', '/learn')
    expect(screen.getByRole('link', { name: /30-Second Typing Test/i })).toBeInTheDocument()
  })

  it('saves an optional three-step learning goal', async () => {
    localStorage.removeItem('coderush:preferences:v1')
    localStorage.removeItem('coderush:onboarding:skipped:v1')
    go('/')
    fireEvent.click(await screen.findByRole('button', { name: 'Start my learning journey' }))
    fireEvent.click(screen.getByRole('button', { name: 'Networking & IT Support' }))
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }))
    fireEvent.click(screen.getByRole('button', { name: 'Some experience' }))
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }))
    fireEvent.click(screen.getByRole('button', { name: '20 minutes' }))
    fireEvent.click(screen.getByRole('button', { name: 'See my path' }))
    expect(JSON.parse(localStorage.getItem('coderush:preferences:v1')!)).toMatchObject({ goal: 'network', level: 'Some experience', dailyMinutes: 20 })
    expect(screen.getByRole('link', { name: /Open recommended path/i })).toHaveAttribute('href', '/learn/networking')
  })

  it('opens and closes the mobile menu', async () => {
    go('/')
    await screen.findByRole('heading', { level: 1 })
    const btn = screen.getByRole('button', { name: /open menu/i })
    fireEvent.click(btn)
    const menu = document.getElementById('mobile-nav')!
    expect(within(menu).getByRole('link', { name: 'Command Lab' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /close menu/i }))
    expect(document.getElementById('mobile-nav')).toBeNull()
  })

  it('switches theme and persists it', async () => {
    go('/')
    await screen.findByRole('heading', { level: 1 })
    fireEvent.click(screen.getByRole('button', { name: /switch to light theme/i }))
    expect(document.documentElement.dataset.theme).toBe('light')
    expect(JSON.parse(localStorage.getItem('coderush:settings')!).theme).toBe('light')
  })

  it('redirects legacy /stats to the progress dashboard', async () => {
    go('/stats')
    expect(await screen.findByRole('heading', { level: 1, name: /Your progress/i })).toBeInTheDocument()
  })

  it('shows a helpful 404 page', async () => {
    go('/definitely/not/here')
    expect(await screen.findByRole('heading', { name: /does not exist/i })).toBeInTheDocument()
  })
})

describe('search', () => {
  it('opens with the / shortcut and finds commands by synonym', async () => {
    go('/')
    await screen.findByRole('heading', { level: 1 })
    fireEvent.keyDown(window, { key: '/' })
    const input = await screen.findByRole('combobox', { name: /search/i })
    fireEvent.change(input, { target: { value: 'find ip address' } })
    const list = await screen.findByRole('listbox')
    expect(within(list).getAllByRole('option').length).toBeGreaterThan(0)
    expect(list.textContent).toMatch(/ip addr show|ipconfig/i)
  })
})

describe('typing lesson', () => {
  it('records a pass only on an exact match and shows results', async () => {
    go('/languages/python/lesson/python-basics-1')
    await screen.findByRole('heading', { level: 1, name: /Hello World/i })
    const ta = screen.getByLabelText(/Python lesson/i) as HTMLTextAreaElement
    const { getLesson } = await import('../content/code')
    const code = getLesson('python', 'python-basics-1')!.code
    // Type the whole lesson one character at a time, as a keyboard would.
    let value = ''
    await act(async () => {
      for (const ch of code) {
        value += ch
        fireEvent.change(ta, { target: { value }, nativeEvent: { inputType: 'insertText' } })
      }
    })
    expect(await screen.findByRole('heading', { name: /Lesson passed/i })).toBeInTheDocument()
    const s = getData().sessions.at(-1)!
    expect(s.kind).toBe('lesson')
    expect(s.passed).toBe(true)
  })

  it('blocks paste in the typing surface', async () => {
    go('/languages/python/lesson/python-basics-1')
    await screen.findByRole('heading', { level: 1 })
    const ta = screen.getByLabelText(/Python lesson/i)
    fireEvent.paste(ta, { clipboardData: { getData: () => '# Hello World in Python' } })
    expect(await screen.findByText(/Pasting is turned off/i)).toBeInTheDocument()
    expect((ta as HTMLTextAreaElement).value).toBe('')
  })
})

describe('command lab', () => {
  it('runs the recall step and records mastery', async () => {
    go('/lab/command/linux.ip-addr-show')
    await screen.findByRole('heading', { level: 1, name: /Show interfaces/i })
    fireEvent.click(screen.getByRole('tab', { name: /Recall/i }))
    fireEvent.change(screen.getByLabelText(/your command/i), { target: { value: 'ip a' } })
    fireEvent.click(screen.getByRole('button', { name: 'Check' }))
    expect(await screen.findByText(/Correct, from memory/i)).toBeInTheDocument()
    expect(getData().commands['linux.ip-addr-show']!.recallSuccess).toBe(1)
  })

  it('logs a confusion when recall answers with another real command', async () => {
    go('/lab/command/linux.ip-route-show')
    await screen.findByRole('heading', { level: 1 })
    fireEvent.click(screen.getByRole('tab', { name: /Recall/i }))
    fireEvent.change(screen.getByLabelText(/your command/i), { target: { value: 'ip addr show' } })
    fireEvent.click(screen.getByRole('button', { name: 'Check' }))
    expect(await screen.findByText(/Not this time/i)).toBeInTheDocument()
    expect(getData().confusions[0]).toMatchObject({ expected: 'linux.ip-route-show', got: 'linux.ip-addr-show' })
  })

  it('never executes terminal input and explains unknown commands', async () => {
    go('/lab')
    await screen.findByRole('heading', { level: 1 })
    const input = screen.getByLabelText(/Command input/i)
    fireEvent.change(input, { target: { value: 'rm -rf / --no-preserve-root' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(await screen.findByText(/no recorded output/i)).toBeInTheDocument()
  })

  it('filters commands by platform tab', async () => {
    go('/lab?platform=cisco-ios')
    await screen.findByRole('heading', { level: 1 })
    expect(screen.getByText(/of 17 commands/)).toBeInTheDocument()
  })
})

describe('scenario', () => {
  it('accepts an approved alias, shows simulated output, and completes', async () => {
    const user = userEvent.setup()
    go('/lab/scenario/sc.linux.disk-full')
    await screen.findByRole('heading', { level: 1, name: /upload service/i })
    const input = screen.getByLabelText(/Command input/i)
    await user.type(input, 'df -h{Enter}')
    expect(await screen.findByText(/That command fits this step/i)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /Next step/i }))
    await user.click(screen.getByRole('button', { name: /100% used/i }))
    await user.click(screen.getByRole('button', { name: /Next step/i }))
    await user.type(screen.getByLabelText(/Command input/i), 'du -hs /var/log{Enter}')
    await user.click(await screen.findByRole('button', { name: /Finish scenario/i }))
    expect(await screen.findByRole('heading', { name: /Scenario complete/i })).toBeInTheDocument()
    expect(getData().scenarios['sc.linux.disk-full']).toMatchObject({ completed: true, bestFirstTry: 1 })
  })
})

describe('learning path module', () => {
  it('scores a quiz and saves the best result', async () => {
    const user = userEvent.setup()
    go('/learn/linux/linux.help')
    await screen.findByRole('heading', { level: 1, name: /Getting help/i })
    await user.click(screen.getByRole('button', { name: 'q' }))
    await user.click(screen.getByRole('button', { name: /Next question/i }))
    await user.click(screen.getByRole('button', { name: 'type cd' }))
    await user.click(screen.getByRole('button', { name: /See score/i }))
    expect(await screen.findByText(/2 of 2 correct/)).toBeInTheDocument()
    expect(getData().quizzes['linux.help']!.best).toBe(1)
  })
})

describe('practice', () => {
  it('offers every mode and the custom source box explains no execution', async () => {
    go('/practice?mode=custom')
    await screen.findByRole('heading', { level: 1, name: /Typing practice/i })
    for (const m of ['Speed Test', 'Timed Challenge', 'Accuracy Training', 'Command Practice', 'Syntax Training', 'Custom Practice', 'Recall Mode']) {
      expect(screen.getByText(m)).toBeInTheDocument()
    }
    expect(screen.getByText(/never run as code/i)).toBeInTheDocument()
  })
})

describe('progress import', () => {
  it('reports an invalid import file without changing data', async () => {
    go('/progress')
    await screen.findByRole('heading', { level: 1, name: /Your progress/i })
    const file = new File(['not json'], 'bad.json', { type: 'application/json' })
    Object.defineProperty(file, 'text', { value: () => Promise.resolve('not json') })
    fireEvent.change(screen.getByLabelText(/Choose a CodeRush export file/i), { target: { files: [file] } })
    await waitFor(() => expect(screen.getByText(/not valid JSON/i)).toBeInTheDocument())
    expect(getData().sessions).toHaveLength(0)
  })
})
