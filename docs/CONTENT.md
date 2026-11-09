# Adding content

All curriculum lives in `src/content` as typed data. The schema is in `src/content/types.ts`. Run `npm run validate:content` after any change. The validation tests fail on missing fields, duplicate ids or commands, broken references, unlabelled state-changing commands, public IP addresses in sample output, and orphaned commands or scenarios.

## Command exercise

Add an entry to the right file in `src/content/commands/`. `define()` fills `platform`, `shell`, `practice`, `review`, `permissions: 'standard'`, and `safety: 'read-only'`, so set the last two whenever they differ.

Rules:

- **id**: `<platform prefix>.<slug>`, where the prefix is `linux.`, `ps.`, `win.`, or `ios.`. Never reuse or rename an id, because saved progress refers to it.
- **command**: the canonical form. A command must not repeat another on the same platform.
- **recallPrompt**: describe the goal without containing the command.
- **accepted**: other correct answers. Each must identify only this command; a terminal test checks that.
- **sampleOutput**: curated and realistic. Use `192.0.2.0/24`, `198.51.100.0/24`, `203.0.113.0/24`, `2001:db8::/32`, private ranges, or `example.com`.
- **source**: link the official documentation. Use the helpers `man()`, `ps()`, `wincmd()`, or `ios()`.
- **review**: use `'needs-review'` when you could not verify syntax against the source. The lesson then shows a notice.
- **safety**: `changes-state` for anything that writes files or settings. `lab-only` for anything that could disrupt a system, such as restarts, kills, or saving device configuration.

Then add the id to at least one module's `commandIds` in `src/content/paths/`.

## Scenario

Add to a file in `src/content/scenarios/`. Each step is either:

- `command`: list library commands in `commandIds`, or explicit answers in `accepted`, or both. Output defaults to the first command's sample output, or set `output`.
- `choice`: exactly one correct option, and every option needs a `why`.

Every scenario needs a `wrapUp` with what the evidence means and the next step. Link it from a module's `scenarioIds`.

## Module

Add to a path in `src/content/paths/`. Every module needs an `outcome` ("After this module you can…"), `concept` paragraphs, and at least one quiz question with a valid `answer` index.

## Matching rules

These rules are implemented in `src/lib/terminal/match.ts`:

- **bash**: case-sensitive, and bundled short flags are order-independent, so `-la` equals `-al`.
- **powershell**: case-insensitive, named parameters can appear in any order, and spacing around `{ } ( ) ,` is normalized.
- **cmd**: case-insensitive.
- **ios**: case-insensitive, and each word may be abbreviated to two letters or more.
- **All shells**: extra spaces, a trailing semicolon, spacing around `|`, and simple single or double quotes are normalized.
