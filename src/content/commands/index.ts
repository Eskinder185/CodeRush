import type { CommandExercise, Platform } from '../types'
import { linuxCore } from './linux-core'
import { linuxNetwork } from './linux-network'
import { linuxSecurity } from './linux-security'
import { powershellCore } from './powershell-core'
import { powershellSystem } from './powershell-system'
import { powershellSecurity } from './powershell-security'
import { windowsCmd } from './windows-cmd'
import { ciscoIos } from './cisco-ios'
import { gitGithub } from './git-github'
import { aiModels } from './ai-models'
import { cicdDevops } from './cicd-devops'

export const commands: CommandExercise[] = [
  ...linuxCore,
  ...linuxNetwork,
  ...linuxSecurity,
  ...powershellCore,
  ...powershellSystem,
  ...powershellSecurity,
  ...windowsCmd,
  ...ciscoIos,
  ...gitGithub,
  ...aiModels,
  ...cicdDevops,
]

const byId = new Map(commands.map((c) => [c.id, c]))

export function getCommand(id: string): CommandExercise | undefined {
  return byId.get(id)
}

export function commandsFor(platform: Platform): CommandExercise[] {
  return commands.filter((c) => c.platform === platform)
}
