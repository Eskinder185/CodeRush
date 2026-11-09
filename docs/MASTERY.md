# Scoring and mastery

CodeRush measures typing and knowledge separately. Typing speed never changes a mastery score. The implementation is in `src/lib/mastery.ts`, `src/lib/typing/engine.ts`, and `src/lib/progress.ts`, and the tests in `src/lib/learning.test.ts` and `src/lib/typing/engine.test.ts` pin every rule below.

## Typing metrics

| Metric | Definition |
| --- | --- |
| Keystroke | One character you inserted. Indentation filled automatically in Forgiving mode is not a keystroke. |
| Net WPM | Correct characters currently in the text, excluding auto-filled ones, divided by 5, per minute of active time. |
| Raw WPM | All keystrokes divided by 5, per minute, including keystrokes later deleted. |
| Accuracy | Correct keystrokes divided by all keystrokes. Mistakes fixed with Backspace still count against it. |
| Uncorrected errors | Positions that are wrong when the attempt ends. |
| Corrected errors | Error keystrokes whose position is correct when the attempt ends. |
| Missing | Target characters never reached, which applies to timed tests. |
| Excess | Keys pressed after the end of the text. They are ignored. |
| Active time | Starts at the first keystroke. Paused time is excluded. |

Pasting into a scored surface is rejected, and so is any single insertion longer than 3 characters that is not an IME composition. Custom Practice accepts pasted text into a separate source box only.

## Lesson completion

A programming lesson **passes only when the final text matches the lesson exactly**. An attempt that reaches the end with wrong characters is saved, but it does not complete the lesson. Per-language progress is lessons passed divided by lessons in the library.

CodeRush 1.x saved a row only when the learner reached the end, and its `mistakes` field counted wrong characters left in the text. Migrated rows are therefore marked passed only when `mistakes` was 0.

## Command mastery (0 to 100)

| Part | Weight | Value |
| --- | --- | --- |
| Typing | 30% | Best accuracy on a perfect typed attempt. 0 if no attempt was perfect. |
| Recall | 40% | Successful recalls from memory, capped at 2. |
| Repetition | 30% | Distinct local dates with a success, capped at 3. |

Levels:

- **Not started**: no attempts.
- **Learning**: attempted, score under 40.
- **Practiced**: score 40 to 79.
- **Mastered**: score 80 or more **and** at least one successful recall.

Typing alone tops out at 60. Mastery requires recalling the command.

## Module mastery

A module combines the parts it has, reweighted so the weights sum to 100%:

| Part | Base weight |
| --- | --- |
| Commands (average command mastery) or lessons (share passed) | 60% |
| Quiz (best score) | 25% |
| Scenarios (share completed) | 15% |

A module is **complete** when the quiz best is at least 50%, every command is Practiced or Mastered, every lesson is passed, and every scenario is completed. It is **mastered** when complete with a score of 85 or more. Earlier beginner modules that are incomplete are shown as recommendations. They never block access.

## Daily challenge score

`score = round(netWPM × (accuracy / 100)² × 10)`. For example, 50 WPM at 100% scores 500, while 60 WPM at 85% scores 434.

## Smart mistake training

From your 30 most recent sessions with keystroke detail, a character group becomes a recommended drill when it has at least 15 attempts and an error rate of at least 6%. Drills are the library lines with the highest density of that group. A recall answer that matches a different library command is logged as a confusion, and two or more of the same pair produce a review suggestion.
