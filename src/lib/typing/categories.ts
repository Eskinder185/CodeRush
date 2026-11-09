/**
 * Mistake categories used by Smart Mistake Training.
 * A character position can belong to several categories, for example "-" in "ls -la" is both
 * a hyphen and part of a command parameter.
 */
export type MistakeCategory =
  | 'brackets'
  | 'braces'
  | 'parentheses'
  | 'quotes'
  | 'colon-semicolon'
  | 'hyphen'
  | 'parameters'
  | 'slash'
  | 'backslash'
  | 'pipe'
  | 'dollar'
  | 'underscore'
  | 'capitalization'
  | 'indentation'
  | 'digits'
  | 'operators'

export const CATEGORY_LABELS: Record<MistakeCategory, string> = {
  brackets: 'Square brackets [ ]',
  braces: 'Curly braces { }',
  parentheses: 'Parentheses ( )',
  quotes: 'Quotes \' " `',
  'colon-semicolon': 'Colons and semicolons',
  hyphen: 'Hyphens -',
  parameters: 'Command parameters (-x, --flag, -Name)',
  slash: 'Forward slashes /',
  backslash: 'Backslashes \\',
  pipe: 'Pipe symbol |',
  dollar: 'Dollar sign $',
  underscore: 'Underscores _',
  capitalization: 'Capital letters',
  indentation: 'Indentation',
  digits: 'Numbers',
  operators: 'Operators = < > + * & ! %',
}

/** Characters that make each category; used to score how much an exercise drills a weakness. */
export const CATEGORY_CHARS: Partial<Record<MistakeCategory, string>> = {
  brackets: '[]',
  braces: '{}',
  parentheses: '()',
  quotes: '\'"`',
  'colon-semicolon': ':;',
  hyphen: '-',
  slash: '/',
  backslash: '\\',
  pipe: '|',
  dollar: '$',
  underscore: '_',
  digits: '0123456789',
  operators: '=<>+*&!%',
}

function isLineIndent(target: string, index: number): boolean {
  const ch = target[index]
  if (ch !== ' ' && ch !== '\t') return false
  for (let i = index - 1; i >= 0; i--) {
    const c = target[i]
    if (c === '\n') return true
    if (c !== ' ' && c !== '\t') return false
  }
  return true
}

/** True when the character sits in a whitespace-delimited token that starts with "-", like -Port or --help. */
function isInParameterToken(target: string, index: number): boolean {
  let start = index
  while (start > 0 && !/\s/.test(target[start - 1]!)) start--
  if (target[start] !== '-') return false
  // A lone "-" between spaces is usually subtraction, not a parameter.
  const next = target[start + 1]
  return next !== undefined && /[A-Za-z-]/.test(next)
}

export function categoriesAt(target: string, index: number): MistakeCategory[] {
  const ch = target[index]
  if (ch === undefined) return []
  const out: MistakeCategory[] = []
  if (ch === '[' || ch === ']') out.push('brackets')
  else if (ch === '{' || ch === '}') out.push('braces')
  else if (ch === '(' || ch === ')') out.push('parentheses')
  else if (ch === "'" || ch === '"' || ch === '`') out.push('quotes')
  else if (ch === ':' || ch === ';') out.push('colon-semicolon')
  else if (ch === '-') out.push('hyphen')
  else if (ch === '/') out.push('slash')
  else if (ch === '\\') out.push('backslash')
  else if (ch === '|') out.push('pipe')
  else if (ch === '$') out.push('dollar')
  else if (ch === '_') out.push('underscore')
  else if (/[0-9]/.test(ch)) out.push('digits')
  else if ('=<>+*&!%'.includes(ch)) out.push('operators')
  else if (/[A-Z]/.test(ch)) out.push('capitalization')
  if (isLineIndent(target, index)) out.push('indentation')
  if (ch !== ' ' && isInParameterToken(target, index)) out.push('parameters')
  return out
}

/** Count how many characters of each category a text contains. */
export function categoryDensity(text: string): Partial<Record<MistakeCategory, number>> {
  const counts: Partial<Record<MistakeCategory, number>> = {}
  for (let i = 0; i < text.length; i++) {
    for (const c of categoriesAt(text, i)) counts[c] = (counts[c] ?? 0) + 1
  }
  return counts
}
