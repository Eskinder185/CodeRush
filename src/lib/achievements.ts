/**
 * Achievements are computed from recorded activity every time; nothing is granted by hand.
 */
import { getPath, learningPaths } from '../content/paths'
import { getLanguageTrack } from '../content/code'
import { languageProgress, overallStats } from './progress'
import { commandMastery, moduleMastery, pathProgress } from './mastery'
import { dailyStreak } from './daily'
import { localDateKey } from './storage/store'
import type { AppData } from './storage/schema'

export interface Achievement {
  id: string
  title: string
  description: string
  icon: 'flag' | 'target' | 'zap' | 'code' | 'terminal' | 'powershell' | 'network' | 'shield' | 'calendar' | 'brackets' | 'trophy'
  /** 0..1 */
  progress: (d: AppData) => number
  detail: (d: AppData) => string
}

const ratio = (n: number, of: number) => Math.min(1, of === 0 ? 0 : n / of)
const masteredOn = (d: AppData, prefix: string) =>
  Object.entries(d.commands).filter(([id, p]) => id.startsWith(prefix) && commandMastery(p).level !== 'learning').length
const moduleDone = (d: AppData, pathId: string, moduleId: string) => {
  const m = getPath(pathId)?.modules.find((x) => x.id === moduleId)
  if (!m) return 0
  const s = moduleMastery(m, d).status
  return s === 'completed' || s === 'mastered' ? 1 : 0
}

export const achievements: Achievement[] = [
  {
    id: 'first-lesson', title: 'First Lesson', icon: 'flag',
    description: 'Pass any programming lesson with an exact match.',
    progress: (d) => ratio(overallStats(d).lessonsPassed, 1),
    detail: (d) => `${Math.min(1, overallStats(d).lessonsPassed)} of 1 lesson passed`,
  },
  {
    id: 'perfect-score', title: 'First Perfect Score', icon: 'target',
    description: 'Finish a session of 50 or more keystrokes with 100% accuracy.',
    progress: (d) => (d.sessions.some((s) => s.accuracy === 100 && s.keystrokes >= 50 && s.passed) ? 1 : 0),
    detail: (d) => `Best accuracy on a 50+ keystroke session: ${Math.max(0, ...d.sessions.filter((s) => s.keystrokes >= 50).map((s) => s.accuracy))}%`,
  },
  {
    id: 'speed-40', title: 'Steady 40', icon: 'zap',
    description: 'Reach 40 net WPM with at least 95% accuracy in a timed or speed test.',
    progress: (d) => ratio(Math.max(0, ...d.sessions.filter((s) => (s.kind === 'timed' || s.kind === 'speed') && s.accuracy >= 95).map((s) => s.wpm)), 40),
    detail: (d) => `Best qualifying WPM: ${Math.max(0, ...d.sessions.filter((s) => (s.kind === 'timed' || s.kind === 'speed') && s.accuracy >= 95).map((s) => s.wpm))}`,
  },
  {
    id: 'python-foundations', title: 'Python Foundations', icon: 'code',
    description: 'Pass every beginner Python lesson.',
    progress: (d) => {
      const passed = new Set(d.sessions.filter((s) => s.kind === 'lesson' && s.trackId === 'python' && s.passed).map((s) => s.itemId))
      const ids = (getLanguageTrack('python')?.lessons ?? []).filter((l) => l.difficulty === 'beginner').map((l) => l.id)
      return ratio(ids.filter((id) => passed.has(id)).length, ids.length)
    },
    detail: (d) => `${languageProgress(d, 'python').passed} of ${languageProgress(d, 'python').total} Python lessons passed overall`,
  },
  {
    id: 'polyglot', title: 'Polyglot', icon: 'brackets',
    description: 'Pass at least one lesson in three different languages.',
    progress: (d) => ratio(new Set(d.sessions.filter((s) => s.kind === 'lesson' && s.passed).map((s) => s.trackId)).size, 3),
    detail: (d) => `${new Set(d.sessions.filter((s) => s.kind === 'lesson' && s.passed).map((s) => s.trackId)).size} of 3 languages`,
  },
  {
    id: 'linux-explorer', title: 'Linux Explorer', icon: 'terminal',
    description: 'Bring 10 Linux commands to Practiced or Mastered.',
    progress: (d) => ratio(masteredOn(d, 'linux.'), 10),
    detail: (d) => `${masteredOn(d, 'linux.')} of 10 Linux commands`,
  },
  {
    id: 'powershell-apprentice', title: 'PowerShell Apprentice', icon: 'powershell',
    description: 'Bring 10 PowerShell commands to Practiced or Mastered.',
    progress: (d) => ratio(masteredOn(d, 'ps.'), 10),
    detail: (d) => `${masteredOn(d, 'ps.')} of 10 PowerShell commands`,
  },
  {
    id: 'networking-foundations', title: 'Networking Foundations', icon: 'network',
    description: 'Complete the OSI, TCP/IP, IPv4, and subnetting modules.',
    progress: (d) => (['net.osi', 'net.tcpip', 'net.ipv4', 'net.subnetting'].reduce((n, id) => n + moduleDone(d, 'networking', id), 0)) / 4,
    detail: (d) => `${['net.osi', 'net.tcpip', 'net.ipv4', 'net.subnetting'].reduce((n, id) => n + moduleDone(d, 'networking', id), 0)} of 4 modules`,
  },
  {
    id: 'subnet-solver', title: 'Subnet Solver', icon: 'network',
    description: 'Answer 25 subnetting fields correctly.',
    progress: (d) => ratio(d.subnet.correct, 25),
    detail: (d) => `${d.subnet.correct} of 25 correct answers`,
  },
  {
    id: 'defender', title: 'First Responder', icon: 'shield',
    description: 'Complete three security scenarios.',
    progress: (d) => ratio(Object.entries(d.scenarios).filter(([id, s]) => s.completed && (id.startsWith('sc.sec.') || id === 'sc.ps.suspicious-process' || id === 'sc.ps.persistence')).length, 3),
    detail: (d) => `${Object.entries(d.scenarios).filter(([id, s]) => s.completed && (id.startsWith('sc.sec.') || id === 'sc.ps.suspicious-process' || id === 'sc.ps.persistence')).length} of 3 scenarios`,
  },
  {
    id: 'command-master', title: 'Command Master', icon: 'trophy',
    description: 'Master 25 commands on any platform.',
    progress: (d) => ratio(Object.values(d.commands).filter((p) => commandMastery(p).level === 'mastered').length, 25),
    detail: (d) => `${Object.values(d.commands).filter((p) => commandMastery(p).level === 'mastered').length} of 25 commands mastered`,
  },
  {
    id: 'syntax-specialist', title: 'Syntax Specialist', icon: 'brackets',
    description: 'Complete a syntax drill of 100+ keystrokes at 97% accuracy or better.',
    progress: (d) => (d.sessions.some((s) => (s.kind === 'syntax' || s.kind === 'weakness') && s.keystrokes >= 100 && s.accuracy >= 97) ? 1 : 0),
    detail: () => 'Use Syntax Training or a recommended drill',
  },
  {
    id: 'consistent', title: 'Consistent Learner', icon: 'calendar',
    description: 'Complete the Daily Challenge on 5 days in a row.',
    progress: (d) => ratio(dailyStreak(d, localDateKey()), 5),
    detail: (d) => `Current streak: ${dailyStreak(d, localDateKey())} day${dailyStreak(d, localDateKey()) === 1 ? '' : 's'}`,
  },
  {
    id: 'path-complete', title: 'Path Finisher', icon: 'trophy',
    description: 'Complete every module in any learning path.',
    progress: (d) => Math.max(...learningPaths.map((p) => pathProgress(p, d).percent)) / 100,
    detail: (d) => `Best path progress: ${Math.max(...learningPaths.map((p) => pathProgress(p, d).percent))}%`,
  },
]

export function earned(d: AppData): Achievement[] {
  return achievements.filter((a) => a.progress(d) >= 1)
}
