import type { LearningModule, LearningPath } from '../types'
import { programmingPath } from './programming'
import { linuxPath, linuxNetworkingPath, linuxSecurityPath } from './linux'
import { powershellPath } from './powershell'
import { networkingPath, ciscoPath } from './networking'
import { securityPath } from './security'
import { gitGithubPath, aiModelsPath } from './git-ai'

export const learningPaths: LearningPath[] = [
  programmingPath,
  linuxPath,
  powershellPath,
  networkingPath,
  securityPath,
  linuxNetworkingPath,
  linuxSecurityPath,
  ciscoPath,
  gitGithubPath,
  aiModelsPath,
]

export function getPath(id: string): LearningPath | undefined {
  return learningPaths.find((p) => p.id === id)
}

export function findModule(moduleId: string): { path: LearningPath; module: LearningModule; index: number } | undefined {
  for (const path of learningPaths) {
    const index = path.modules.findIndex((m) => m.id === moduleId)
    if (index >= 0) return { path, module: path.modules[index]!, index }
  }
  return undefined
}
