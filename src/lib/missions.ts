import type { Mission } from '../content/missions'

/** Evidence order does not affect the score. Wrong conclusions and hints do. */
export function missionScore(mission: Mission, viewed: ReadonlySet<string>, wrongChoices: number, hints: number): number {
  const relevant = mission.tools.filter((t) => t.relevant)
  const found = relevant.filter((t) => viewed.has(t.id)).length
  return Math.max(0, Math.round(40 + 25 * (relevant.length ? found / relevant.length : 1) + 20 + 15 - Math.min(20, wrongChoices * 5) - Math.min(15, hints * 5)))
}
