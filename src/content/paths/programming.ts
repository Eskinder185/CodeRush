import type { LearningPath, LearningModule } from '../types'
import { languageTracks } from '../code'
import { q } from './helpers'

const quizzes: Record<string, LearningModule['quiz']> = {
  python: [
    q('py-q1', 'How does Python mark the body of an if statement?', ['Curly braces', 'Indentation after a colon', 'The keyword "end"', 'Semicolons'], 1, 'Python uses a colon followed by an indented block. Inconsistent indentation is a syntax error.'),
    q('py-q2', 'What does f"Age: {age}" produce when age is 25?', ['Age: {age}', 'Age: 25', 'f"Age: 25"', 'An error'], 1, 'An f-string replaces each {expression} with its value.'),
  ],
  javascript: [
    q('js-q1', 'Which declaration creates a variable that cannot be reassigned?', ['var', 'let', 'const', 'static'], 2, 'const prevents reassignment. The object it points to can still be changed.'),
    q('js-q2', 'What does `${name}` do inside backticks?', ['Nothing', 'Inserts the value of name', 'Declares a variable', 'Comments out name'], 1, 'Template literals interpolate expressions inside ${ }.'),
  ],
  java: [
    q('java-q1', 'Where must a public class named Account be saved?', ['Any .java file', 'Account.java', 'Main.java', 'account.class'], 1, 'A public top-level class must be in a file with the same name.'),
    q('java-q2', 'What ends most Java statements?', ['A newline', 'A colon', 'A semicolon', 'A period'], 2, 'Java statements end with a semicolon.'),
  ],
  cpp: [
    q('cpp-q1', 'What does #include <vector> do?', ['Defines a vector variable', 'Makes the standard vector header available', 'Links a library at runtime', 'Nothing in modern C++'], 1, 'The preprocessor inserts the header so std::vector can be used.'),
    q('cpp-q2', 'What does & mean in "void scale(vector<int>& v)"?', ['Address-of', 'Pass by reference', 'Bitwise AND', 'A pointer to a pointer'], 1, 'In a parameter type, & means the function receives a reference and can modify the caller\'s object.'),
  ],
  'html-css': [
    q('html-q1', 'Which CSS selector targets an element with id="nav"?', ['.nav', '#nav', 'nav', '*nav'], 1, '# selects by id, . selects by class, and a bare name selects by element type.'),
    q('html-q2', 'Which element should wrap a page\'s main navigation links?', ['<div>', '<nav>', '<span>', '<menu>'], 1, '<nav> gives assistive technology a navigation landmark.'),
  ],
  sql: [
    q('sql-q1', 'Which clause filters rows before grouping?', ['HAVING', 'WHERE', 'ORDER BY', 'GROUP BY'], 1, 'WHERE filters rows. HAVING filters groups after GROUP BY.'),
    q('sql-q2', 'What does an INNER JOIN return?', ['All rows from both tables', 'Only rows with matches in both tables', 'Only rows from the left table', 'No rows'], 1, 'An inner join keeps only rows where the join condition matches on both sides.'),
  ],
  bash: [
    q('bash-q1', 'Why quote "$file" in a Bash loop?', ['It is faster', 'So names containing spaces stay one argument', 'Quotes are required for all variables', 'It prevents the loop from running'], 1, 'Unquoted variables split on spaces, which breaks file names like "my notes.txt".'),
    q('bash-q2', 'What does $(date) do?', ['Prints the word date', 'Runs date and substitutes its output', 'Declares a variable named date', 'Starts a background job'], 1, 'Command substitution runs the command and inserts its output.'),
  ],
  typescript: [
    q('ts-q1', 'What does the ? in "email?: string" mean?', ['The value may be null only', 'The property is optional', 'The property is private', 'It is a ternary'], 1, 'A ? after a property name makes it optional.'),
    q('ts-q2', 'When are TypeScript types checked?', ['At runtime in the browser', 'At compile time', 'Only in tests', 'Never'], 1, 'Types are checked by the compiler and removed from the emitted JavaScript.'),
  ],
  go: [
    q('go-q1', 'What does := do in Go?', ['Compares two values', 'Declares and assigns a variable with an inferred type', 'Assigns to an existing variable only', 'Defines a constant'], 1, ':= is short variable declaration, allowed inside functions.'),
    q('go-q2', 'How does a Go function usually report errors?', ['It throws an exception', 'It returns an error value as the last result', 'It prints to stderr', 'It panics'], 1, 'Idiomatic Go returns (result, error) and callers check if err != nil.'),
  ],
}

const concepts: Record<string, string[]> = {
  python: ['Python favors readability. Blocks are defined by indentation, so consistent spaces matter as much as the characters themselves.', 'Typing Python builds fluency with colons, brackets, quotes, and f-string braces, which are the characters beginners miss most.'],
  javascript: ['JavaScript runs in every browser and on servers with Node.js. Its syntax is brace-heavy, with arrow functions, template literals, and object literals.', 'Practicing it builds accuracy with { } ( ) [ ] => and backticks.'],
  java: ['Java is strongly typed and class-based. Every statement ends with a semicolon and most code lives inside classes and methods.', 'Typing Java builds speed with long identifiers, generics in angle brackets, and consistent brace placement.'],
  cpp: ['C++ gives direct control over memory and performance. Its syntax mixes templates, references, pointers, and the standard library.', 'Typing C++ trains accuracy with :: < > & * and semicolons.'],
  'html-css': ['HTML describes structure and meaning. CSS describes presentation with selectors and declarations.', 'Typing them builds fluency with angle brackets, attributes in quotes, and the colon-semicolon rhythm of CSS.'],
  sql: ['SQL queries relational data. Clauses run in a logical order: FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY.', 'Typing SQL builds accuracy with commas, parentheses, quotes, and keywords.'],
  bash: ['Bash scripts automate the command line. Quoting, variables, and exit codes decide whether a script is reliable.', 'Typing Bash trains $ " | > and [ ] characters, which are the same ones used in the Command Lab.'],
  typescript: ['TypeScript adds static types to JavaScript. Interfaces, generics, and unions catch mistakes before code runs.', 'Typing it builds speed with colons, angle brackets, and union pipes.'],
  go: ['Go is a compiled language designed for simple, concurrent network services. It has few keywords and strict formatting.', 'Typing Go builds fluency with := , braces, and explicit error handling.'],
}

const difficultyRank = { beginner: 0, intermediate: 1, advanced: 2 } as const

export const programmingPath: LearningPath = {
  id: 'programming',
  title: 'Programming Syntax',
  tagline: 'Type real code in nine languages.',
  description: 'The original CodeRush library: structured lessons that build speed and accuracy with real programming syntax, from first variables to advanced patterns.',
  difficulty: 'mixed',
  estimatedHours: Math.round(languageTracks.reduce((n, t) => n + t.lessons.reduce((m, l) => m + l.expectedTime, 0), 0) / 60),
  objectives: [
    'Type common syntax in Python, JavaScript, TypeScript, Java, C++, Go, SQL, HTML and CSS, and Bash.',
    'Build accuracy with brackets, quotes, operators, and indentation.',
    'Recognize the core structures of each language.',
  ],
  prerequisites: ['None. Start with any language.'],
  accent: 'sky',
  icon: 'code',
  completion: 'Pass every lesson in a language module with an exact match, and score at least 50% on its quiz.',
  modules: languageTracks.map((t) => ({
    id: `programming.${t.language}`,
    title: t.languageName,
    level: [...t.lessons].sort((a, b) => difficultyRank[a.difficulty] - difficultyRank[b.difficulty])[0]?.difficulty ?? 'beginner',
    outcome: `Type ${t.languageName} syntax accurately, from beginner to advanced lessons.`,
    summary: t.description,
    concept: concepts[t.language] ?? [t.description],
    commandIds: [],
    lessonRefs: t.lessons.map((l) => `${t.language}/${l.id}`),
    quiz: quizzes[t.language] ?? [],
    scenarioIds: [],
  })),
}
