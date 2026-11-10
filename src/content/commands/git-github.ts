import { define, type CommandDraft } from './helpers'

const git = (name: string) => ({ label: `Git ${name} reference`, url: `https://git-scm.com/docs/git-${name}` })
const gh = (name: string) => ({ label: `GitHub CLI ${name} manual`, url: `https://cli.github.com/manual/gh_${name.replaceAll(' ', '_')}` })

/** Cross-platform Git and GitHub CLI commands, practiced in the simulated Bash terminal. */
const exercises: CommandDraft[] = [
  {
    id: 'linux.git-status', command: 'git status', title: 'Check repository changes', category: 'version-control', subcategory: 'Inspect', difficulty: 'beginner',
    objective: 'See the branch and whether files are staged, modified, or untracked.', summary: 'Reports the current working tree and staging area.',
    whenToUse: 'Before adding or committing files, and after a merge.', syntax: [{ token: 'git', meaning: 'version control tool' }, { token: 'status', meaning: 'show repository status' }],
    sampleOutput: 'On branch feature/docs\nChanges not staged for commit:\n  modified: README.md', mistakes: ['Assuming a modified file is already staged.'],
    recallPrompt: 'Show which files changed and whether they are staged.', keywords: ['git changes', 'working tree', 'staged'], source: git('status'),
  },
  {
    id: 'linux.git-diff', command: 'git diff', title: 'Review unstaged changes', category: 'version-control', subcategory: 'Inspect', difficulty: 'beginner',
    objective: 'Inspect unstaged line changes before staging.', summary: 'Displays differences between the working tree and index.',
    whenToUse: 'Before deciding what to add to the next commit.', notice: 'Use git diff --staged for changes already staged.',
    syntax: [{ token: 'git', meaning: 'version control tool' }, { token: 'diff', meaning: 'show unstaged changes by default' }],
    sampleOutput: 'diff --git a/README.md b/README.md\n+Setup steps added', mistakes: ['Expecting plain git diff to show staged changes.'],
    recallPrompt: 'Inspect unstaged line changes in the working tree.', related: ['linux.git-status', 'linux.git-add'], source: git('diff'),
  },
  {
    id: 'linux.git-add', command: 'git add README.md', title: 'Stage one file', category: 'version-control', subcategory: 'Commit', difficulty: 'beginner',
    objective: 'Stage a reviewed file for the next commit.', summary: 'Adds the current contents of README.md to the index.',
    whenToUse: 'After reviewing the change and before committing.', syntax: [{ token: 'git add', meaning: 'stage content' }, { token: 'README.md', meaning: 'specific file to stage' }],
    sampleOutput: '(no output on success)', mistakes: ['Using git add . without reviewing unrelated changes first.'], safety: 'changes-state',
    recallPrompt: 'Stage only README.md for the next commit.', related: ['linux.git-diff', 'linux.git-commit'], source: git('add'),
  },
  {
    id: 'linux.git-commit', command: 'git commit -m "Document setup"', title: 'Commit staged changes', category: 'version-control', subcategory: 'Commit', difficulty: 'beginner',
    objective: 'Record a named snapshot of staged changes.', summary: 'Creates a local commit using the staged contents and a message.',
    whenToUse: 'After staging and reviewing a coherent change.', syntax: [{ token: 'git commit', meaning: 'create a local commit' }, { token: '-m', meaning: 'provide a message' }, { token: '"Document setup"', meaning: 'short description of the change' }],
    sampleOutput: '[feature/docs a1b2c3d] Document setup\n 1 file changed, 4 insertions(+)', mistakes: ['Expecting unstaged edits to be included.'], safety: 'changes-state',
    recallPrompt: 'Create a commit from staged changes with the message Document setup.', related: ['linux.git-add', 'linux.git-status'], source: git('commit'),
  },
  {
    id: 'linux.git-switch-c', command: 'git switch -c feature/docs', title: 'Create and switch to a branch', category: 'version-control', subcategory: 'Branches', difficulty: 'beginner',
    objective: 'Start a new branch without changing the default branch.', summary: 'Creates feature/docs at the current commit and checks it out.',
    whenToUse: 'Before starting isolated feature work.', syntax: [{ token: 'git switch', meaning: 'change branches' }, { token: '-c', meaning: 'create the branch first' }, { token: 'feature/docs', meaning: 'new branch name' }],
    sampleOutput: "Switched to a new branch 'feature/docs'", mistakes: ['Using an existing branch name with -c.'], safety: 'changes-state',
    recallPrompt: 'Create a new branch named feature/docs and switch to it.', related: ['linux.git-status', 'linux.git-push'], source: git('switch'),
  },
  {
    id: 'linux.git-log', command: 'git log --oneline -5', title: 'Inspect recent commits', category: 'version-control', subcategory: 'Inspect', difficulty: 'beginner',
    objective: 'Read the five newest commits in compact form.', summary: 'Prints abbreviated hashes and subjects for recent history.',
    whenToUse: 'When checking whether work was committed or which commit introduced a change.', syntax: [{ token: 'git log', meaning: 'show commit history' }, { token: '--oneline', meaning: 'compact one-line entries' }, { token: '-5', meaning: 'limit to five commits' }],
    sampleOutput: 'a1b2c3d Document setup\n9f8e7d6 Add project overview', mistakes: ['Treating a shortened hash as a branch name.'],
    recallPrompt: 'Show the five most recent commits in compact form.', source: git('log'),
  },
  {
    id: 'linux.git-push', command: 'git push -u origin feature/docs', title: 'Publish a feature branch', category: 'version-control', subcategory: 'Remote work', difficulty: 'intermediate',
    objective: 'Publish a local branch and set its upstream.', summary: 'Pushes feature/docs to origin and records its tracking branch.',
    whenToUse: 'After committing work that should be shared for review.', syntax: [{ token: 'git push', meaning: 'send commits to a remote' }, { token: '-u', meaning: 'set upstream tracking' }, { token: 'origin', meaning: 'remote name' }, { token: 'feature/docs', meaning: 'branch to publish' }],
    sampleOutput: 'new branch feature/docs -> feature/docs\nbranch feature/docs set up to track origin/feature/docs', mistakes: ['Pushing a branch before checking it contains only intended commits.'], safety: 'changes-state',
    recallPrompt: 'Publish feature/docs to origin and set its upstream.', prerequisites: ['linux.git-commit'], source: git('push'),
  },
  {
    id: 'linux.git-pull-ff', command: 'git pull --ff-only', title: 'Update without an automatic merge commit', category: 'version-control', subcategory: 'Remote work', difficulty: 'intermediate',
    objective: 'Fetch and fast-forward the current branch when possible.', summary: 'Fetches from the tracked branch, then updates only if a fast-forward is possible.',
    whenToUse: 'Before working on a shared branch when local history has not diverged.', syntax: [{ token: 'git pull', meaning: 'fetch and integrate tracked branch' }, { token: '--ff-only', meaning: 'reject a non-fast-forward integration' }],
    sampleOutput: 'Updating a1b2c3d..e4f5a6b\nFast-forward', mistakes: ['Assuming it resolves divergent histories automatically.'], safety: 'changes-state',
    recallPrompt: 'Update the current branch only when it can fast-forward.', source: git('pull'),
  },
  {
    id: 'linux.gh-auth-status', command: 'gh auth status', title: 'Check GitHub CLI authentication', category: 'version-control', subcategory: 'GitHub CLI', difficulty: 'beginner',
    objective: 'Confirm which GitHub account the CLI is using.', summary: 'Reports authentication status without printing the token.',
    whenToUse: 'Before cloning a private repository or opening a pull request.', syntax: [{ token: 'gh auth', meaning: 'GitHub CLI authentication' }, { token: 'status', meaning: 'show current account status' }],
    sampleOutput: 'github.com\n  Logged in as learner (credential stored securely)', mistakes: ['Using gh auth token in screenshots or shared logs.'], requirements: 'GitHub CLI installed; authentication for private resources.',
    recallPrompt: 'Check whether GitHub CLI is signed in and which account it uses.', source: gh('auth status'),
  },
  {
    id: 'linux.gh-repo-clone', command: 'gh repo clone OWNER/REPO', title: 'Clone a GitHub repository', category: 'version-control', subcategory: 'GitHub CLI', difficulty: 'beginner',
    objective: 'Copy a repository to a local directory.', summary: 'Clones the named GitHub repository using configured GitHub CLI credentials.',
    whenToUse: 'When starting work on a repository you can access.', syntax: [{ token: 'gh repo clone', meaning: 'clone through GitHub CLI' }, { token: 'OWNER/REPO', meaning: 'repository owner and name placeholder' }],
    sampleOutput: 'Cloning into REPO...\nDone.', mistakes: ['Typing OWNER/REPO literally instead of replacing it with a real repository name.'], safety: 'changes-state', requirements: 'GitHub CLI installed.',
    recallPrompt: 'Clone a repository identified by its owner and name.', source: gh('repo clone'),
  },
  {
    id: 'linux.gh-pr-create', command: 'gh pr create --fill', title: 'Open a pull request', category: 'version-control', subcategory: 'GitHub CLI', difficulty: 'intermediate',
    objective: 'Open a review request for the current published branch.', summary: 'Creates a pull request using commit information for its title and body.',
    whenToUse: 'After pushing a feature branch and checking its diff.', syntax: [{ token: 'gh pr create', meaning: 'create a GitHub pull request' }, { token: '--fill', meaning: 'use commit information for title and body' }],
    sampleOutput: 'https://github.com/OWNER/REPO/pull/12', mistakes: ['Opening the PR before reviewing its title, body, and target branch.'], safety: 'changes-state', requirements: 'Authenticated GitHub CLI and a pushed branch.',
    recallPrompt: 'Open a pull request from the current branch and fill its title and body from commits.', prerequisites: ['linux.git-push'], source: gh('pr create'),
  },
  {
    id: 'linux.gh-pr-checks', command: 'gh pr checks', title: 'Inspect pull request checks', category: 'version-control', subcategory: 'GitHub CLI', difficulty: 'intermediate',
    objective: 'See whether automated checks passed for a pull request.', summary: 'Lists CI check status for the pull request associated with the current branch.',
    whenToUse: 'Before asking for review or merging.', syntax: [{ token: 'gh pr', meaning: 'pull request commands' }, { token: 'checks', meaning: 'show check results' }],
    sampleOutput: 'build  pass  1m  https://github.com/OWNER/REPO/actions/runs/1', mistakes: ['Treating a queued check as a pass.'], requirements: 'Authenticated GitHub CLI and a pull request for this branch.',
    recallPrompt: 'Show CI check status for the current branch’s pull request.', prerequisites: ['linux.gh-pr-create'], source: gh('pr checks'),
  },
]

export const gitGithub = define('linux', exercises)
