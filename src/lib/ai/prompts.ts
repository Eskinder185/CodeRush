import type { AIGenerationRequest, AIPracticeType } from './types'

export function getSystemPrompt(_practiceType?: AIPracticeType): string {
  return `You are CodeRush AI, an expert programming instructor, curriculum architect, and technical typing coach.
Your job is to generate educational, production-grade programming exercises and lessons.

CRITICAL INSTRUCTIONS:
1. Output valid, parseable JSON matching the requested schema EXACTLY.
2. Do not wrap output in conversational filler. Return ONLY the JSON object.
3. Code must be idiomatic, modern, correct, and educational.
4. For typing practice, format code cleanly with consistent indentation (4 spaces or standard language style) and no excessively long lines (>90 chars).
5. Never output harmful, malicious, or non-educational content.
6. Target code is for learning and typing practice in a browser. It is NEVER directly executed on a machine.`
}

export function getUserPrompt(req: AIGenerationRequest): string {
  const lengthGuide = {
    short: 'Brief and concise: 5 to 12 lines of code or 3 quiz questions.',
    medium: 'Standard depth: 12 to 25 lines of code or 5 quiz questions.',
    long: 'In-depth: 25 to 45 lines of code or 7 quiz questions.',
  }[req.length]

  const userContext = req.userPrompt ? `\nLearner Specific Request: "${req.userPrompt}"` : ''

  switch (req.practiceType) {
    case 'typing':
    case 'syntax':
    case 'command':
      return `Generate a technical typing exercise for:
Language: ${req.language}
Difficulty: ${req.difficulty}
Topic: ${req.topic}
Length: ${lengthGuide}${userContext}

Respond with JSON adhering to this schema:
{
  "type": "typing",
  "instructions": "Clear instruction for the learner on what this code does and what to focus on while typing.",
  "targetText": "Exact idiomatic ${req.language} code to type. Ensure proper indentation and newlines.",
  "explanation": "Brief explanation of the key language concepts, methods, or idioms used.",
  "hints": ["Helpful typing or conceptual hint 1", "Hint 2"]
}`

    case 'lesson':
      return `Generate a guided programming lesson for:
Language: ${req.language}
Difficulty: ${req.difficulty}
Topic: ${req.topic}
Length: ${lengthGuide}${userContext}

Respond with JSON adhering to this schema:
{
  "title": "Lesson title",
  "language": "${req.language}",
  "difficulty": "${req.difficulty}",
  "topic": "${req.topic}",
  "overview": "Clear 2-3 paragraph overview explaining the topic conceptually with analogies or real-world use cases.",
  "learningObjectives": [
    "Objective 1",
    "Objective 2"
  ],
  "exercises": [
    {
      "type": "typing",
      "instructions": "What to type and understand in this step",
      "targetText": "Executable, idiomatic ${req.language} snippet to practice",
      "explanation": "Why this snippet works and what it teaches",
      "hints": ["Hint for this step"]
    }
  ]
}`

    case 'quiz':
      return `Generate an interactive multiple-choice quiz for:
Language: ${req.language}
Difficulty: ${req.difficulty}
Topic: ${req.topic}
Length: ${lengthGuide}${userContext}

Respond with JSON adhering to this schema:
{
  "title": "Quiz Title",
  "language": "${req.language}",
  "difficulty": "${req.difficulty}",
  "topic": "${req.topic}",
  "questions": [
    {
      "id": "q1",
      "question": "Clear conceptual or code-prediction question",
      "codeSnippet": "Optional snippet if question is about code output or bug (or null/omit)",
      "options": [
        "First option",
        "Second option",
        "Third option",
        "Fourth option"
      ],
      "answerIndex": 0, // Integer 0 to 3 pointing to the correct option in options array
      "explanation": "Why this answer is correct and why the alternatives are incorrect."
    }
  ]
}`

    case 'debugging':
      return `Generate a code debugging exercise for:
Language: ${req.language}
Difficulty: ${req.difficulty}
Topic: ${req.topic}
Length: ${lengthGuide}${userContext}

Respond with JSON adhering to this schema:
{
  "title": "Debugging Challenge Title",
  "language": "${req.language}",
  "difficulty": "${req.difficulty}",
  "topic": "${req.topic}",
  "problemDescription": "Describe what the code is intended to do, and the error/misbehavior observed.",
  "buggyCode": "Code snippet containing a realistic bug (logic error, off-by-one, type issue, nil/null dereference, syntax error).",
  "expectedBehavior": "Exact expected output or behavior when fixed.",
  "hints": ["First subtle hint", "Second more specific hint"],
  "solutionCode": "Corrected code snippet with the bug fixed.",
  "solutionExplanation": "Detailed explanation of what caused the bug and how the fix resolves it."
}`

    case 'completion':
      return `Generate a code completion challenge for:
Language: ${req.language}
Difficulty: ${req.difficulty}
Topic: ${req.topic}
Length: ${lengthGuide}${userContext}

Respond with JSON adhering to this schema:
{
  "title": "Code Completion Challenge",
  "language": "${req.language}",
  "difficulty": "${req.difficulty}",
  "topic": "${req.topic}",
  "prompt": "Description of the logic needed to fill the blank.",
  "codePrefix": "Code preceding the missing logic (e.g. function signature, setup)",
  "expectedCompletion": "The exact idiom or expression that completes the logic",
  "codeSuffix": "Code following the missing logic (e.g. return statement, closing braces)",
  "explanation": "Explanation of the completed construct."
}`
  }
}

export function getRevisionPrompt(
  currentJSON: string,
  userInstruction: string
): string {
  return `The user is reviewing an existing CodeRush AI practice exercise:
\`\`\`json
${currentJSON}
\`\`\`

User revision request: "${userInstruction}"

Please revise the exercise to incorporate the user's request while keeping the same general topic, language, and JSON schema structure.
Output ONLY the updated JSON object.`
}

export function getTutorSystemPrompt(
  language: string,
  topic: string,
  exerciseContext: string
): string {
  return `You are CodeRush AI Tutor, a patient, encouraging, and highly knowledgeable programming mentor.
You are helping a learner practice ${language} on the topic of "${topic}".

Current exercise context:
${exerciseContext}

Guidelines:
1. Provide concise, direct answers that help the learner understand the concept without doing all the thinking for them.
2. When asked about an error or why an answer is wrong, explain the underlying mechanics clearly.
3. Use short code snippets when helpful.
4. Keep tone friendly and technical.
5. If asked for hints, give progressive clues rather than spoiling the whole answer immediately.`
}
