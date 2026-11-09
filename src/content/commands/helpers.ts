import type { CommandExercise, Platform, SourceRef } from '../types'

/** Fields that usually take a default. Everything else must be written for each command. */
type Defaulted = 'platform' | 'shell' | 'practice' | 'review' | 'permissions' | 'safety'
export type CommandDraft = Omit<CommandExercise, Defaulted> & Partial<Pick<CommandExercise, Defaulted>>

const SHELL: Record<Platform, CommandExercise['shell']> = {
  linux: 'bash',
  powershell: 'powershell',
  'windows-cmd': 'cmd',
  'cisco-ios': 'ios',
}

export function define(platform: Platform, drafts: CommandDraft[]): CommandExercise[] {
  return drafts.map((d) => ({
    platform,
    shell: SHELL[platform],
    practice: ['type', 'recall'],
    review: 'author-checked',
    permissions: 'standard',
    safety: 'read-only',
    ...d,
  }))
}

/** Linux man page on man7.org, the Linux man-pages project. */
export const man = (name: string, section = 1, page = name): SourceRef => ({
  label: `${name}(${section}) manual page`,
  url: `https://man7.org/linux/man-pages/man${section}/${page}.${section}.html`,
})

/** Microsoft Learn reference for a PowerShell cmdlet. */
export const ps = (module: string, cmdlet: string): SourceRef => ({
  label: `${cmdlet} on Microsoft Learn`,
  url: `https://learn.microsoft.com/powershell/module/${module.toLowerCase()}/${cmdlet.toLowerCase()}`,
})

/** Microsoft Learn reference for a Windows command. */
export const wincmd = (name: string): SourceRef => ({
  label: `${name} on Microsoft Learn`,
  url: `https://learn.microsoft.com/windows-server/administration/windows-commands/${name.toLowerCase()}`,
})

export const ios = (topic: string): SourceRef => ({
  label: `Cisco IOS command reference: ${topic}`,
  url: 'https://www.cisco.com/c/en/us/support/ios-nx-os-software/ios-15-4m-t/products-command-reference-list.html',
})

export const bashRef: SourceRef = {
  label: 'GNU Bash Reference Manual',
  url: 'https://www.gnu.org/software/bash/manual/bash.html',
}
