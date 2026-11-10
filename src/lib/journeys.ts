import { getPath } from '../content/paths'

export interface CareerJourney {
  id: string
  title: string
  summary: string
  outcomes: string[]
  stages: { pathId: string; purpose: string }[]
}

/** Curated routes through existing content. No lessons are duplicated. */
export const journeys: CareerJourney[] = [
  { id: 'developer', title: 'Software Developer', summary: 'Practice programming syntax and the command line used in development.', outcomes: ['Read and type code in several languages', 'Use shell basics while debugging'], stages: [{ pathId: 'programming', purpose: 'Programming fundamentals and syntax' }, { pathId: 'linux', purpose: 'Command-line workflows' }] },
  { id: 'soc', title: 'Cybersecurity / SOC Analyst', summary: 'Build defensive investigation habits with synthetic evidence.', outcomes: ['Inspect Linux and Windows evidence', 'Explain a triage decision'], stages: [{ pathId: 'linux', purpose: 'Linux foundations' }, { pathId: 'powershell', purpose: 'Windows investigation commands' }, { pathId: 'networking', purpose: 'Network fundamentals' }, { pathId: 'cybersecurity', purpose: 'Defensive scenarios' }] },
  { id: 'network', title: 'Network Support Engineer', summary: 'Work from addressing and DNS to device troubleshooting.', outcomes: ['Reason about connectivity failures', 'Inspect Cisco IOS sample outputs'], stages: [{ pathId: 'networking', purpose: 'IP, DNS, and troubleshooting' }, { pathId: 'linux-networking', purpose: 'Host network tools' }, { pathId: 'cisco-ios', purpose: 'Device inspection' }] },
  { id: 'cloud', title: 'Cloud & DevOps Engineer', summary: 'Study shell, networking, and automation concepts available in CodeRush.', outcomes: ['Use Linux and PowerShell commands', 'Explain network dependencies'], stages: [{ pathId: 'linux', purpose: 'Shell and systems basics' }, { pathId: 'linux-networking', purpose: 'Networking tools' }, { pathId: 'powershell', purpose: 'Windows automation basics' }] },
  { id: 'sysadmin', title: 'Linux System Administrator', summary: 'Navigate files, inspect processes and services, and investigate logs.', outcomes: ['Inspect simulated systems safely', 'Practice common administration commands'], stages: [{ pathId: 'linux', purpose: 'Files, permissions, processes, and services' }, { pathId: 'linux-security', purpose: 'Logs and defensive inspection' }, { pathId: 'linux-networking', purpose: 'Network diagnosis' }] },
]

export function getJourney(id: string) { return journeys.find((j) => j.id === id) }
export function journeyPaths(j: CareerJourney) { return j.stages.map((s) => ({ ...s, path: getPath(s.pathId)! })) }
