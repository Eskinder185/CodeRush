import type { Scenario } from '../types'
import { linuxScenarios } from './linux'
import { powershellScenarios } from './powershell'
import { networkingScenarios, ciscoScenarios } from './networking'
import { securityScenarios } from './security'

export const scenarios: Scenario[] = [
  ...linuxScenarios,
  ...powershellScenarios,
  ...networkingScenarios,
  ...ciscoScenarios,
  ...securityScenarios,
]

const byId = new Map(scenarios.map((s) => [s.id, s]))

export function getScenario(id: string): Scenario | undefined {
  return byId.get(id)
}
