import { pythonTrack } from './python'
import { javascriptTrack } from './javascript'
import { javaTrack } from './java'
import { cppTrack } from './cpp'
import { htmlcssTrack } from './html-css'
import { sqlTrack } from './sql'
import { bashTrack } from './bash'
import { typescriptTrack } from './typescript'
import { goTrack } from './go'
import type { LanguageTrack, CodeLesson } from '../types'

export const languageTracks: LanguageTrack[] = [pythonTrack, javascriptTrack, javaTrack, cppTrack, htmlcssTrack, sqlTrack, bashTrack, typescriptTrack, goTrack]

export function getLanguageTrack(language: string): LanguageTrack | undefined {
  return languageTracks.find((t) => t.language === language)
}

export function getLesson(language: string, lessonId: string): CodeLesson | undefined {
  return getLanguageTrack(language)?.lessons.find((l) => l.id === lessonId)
}

export const codeLessonCount = languageTracks.reduce((n, t) => n + t.lessons.length, 0)
