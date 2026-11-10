import type { LearningModule, LearningPath } from '../types'
import { q } from './helpers'

const m = (module: Omit<LearningModule, 'scenarioIds'>): LearningModule => ({ ...module, scenarioIds: [] })

export const gitGithubPath: LearningPath = {
  id: 'git-github', title: 'Git and GitHub', tagline: 'Track code, collaborate, and review changes.',
  description: 'Practice the essential local Git workflow and GitHub CLI commands with simulated output. Learn what each command changes before using it in a real repository.',
  difficulty: 'mixed', estimatedHours: 3, accent: 'sky', icon: 'code',
  objectives: ['Inspect working-tree changes before staging.', 'Create focused commits and work on a feature branch.', 'Publish a branch and read pull request checks.'],
  prerequisites: ['Basic familiarity with files and a terminal.'], completion: 'Practice every command and score at least 50% on each module quiz.',
  modules: [
    m({ id: 'git.inspect', title: 'Inspect before changing', level: 'beginner', outcome: 'Explain working-tree and index changes before making a commit.', summary: 'Status, diffs, and recent history.',
      concept: ['Git records snapshots of files. Your working tree holds edits; the index holds exactly what the next commit will include.', 'Check status first. Plain git diff shows unstaged changes. A compact log shows recent commits. Review output before staging or sharing.'],
      commandIds: ['linux.git-status', 'linux.git-diff', 'linux.git-log'], quiz: [
        q('git-inspect-1', 'What does plain git diff show by default?', ['Only staged edits', 'Unstaged working-tree changes', 'All remote commits', 'Deleted branches'], 1, 'Plain git diff compares the working tree with the index.'),
        q('git-inspect-2', 'Which area contains the content for the next commit?', ['The index', 'The remote', 'The README only', 'The branch name'], 0, 'The staging area, also called the index, supplies the commit content.'),
      ] }),
    m({ id: 'git.commit', title: 'Stage and commit', level: 'beginner', outcome: 'Stage one reviewed file and record a coherent local commit.', summary: 'Add a specific path, then commit the staged snapshot.',
      concept: ['git add copies selected file content into the index. A later edit to the same file is not included until you stage it again.', 'A commit is local. It does not publish work to GitHub by itself. Use a specific path to avoid sweeping unrelated files into a commit.'],
      commandIds: ['linux.git-add', 'linux.git-commit'], quiz: [
        q('git-commit-1', 'After git add README.md, what does git commit record?', ['All files on disk', 'The staged snapshot', 'Only remote changes', 'Nothing until push'], 1, 'Commit records staged content in the index.'),
        q('git-commit-2', 'Does git commit publish changes to GitHub?', ['Yes, automatically', 'Only on main', 'No, it creates a local commit', 'Only with -m'], 2, 'Publishing needs a separate push.'),
      ] }),
    m({ id: 'git.branches', title: 'Branches and remotes', level: 'intermediate', outcome: 'Create a feature branch, update safely, and publish it for review.', summary: 'Switch, fast-forward pull, and push with upstream tracking.',
      concept: ['A branch is a movable name pointing to a commit. Create one for a focused change so the default branch stays available.', 'A fast-forward pull updates only when histories have not diverged. Push sends local commits to a remote; -u records which remote branch this local branch tracks.'],
      commandIds: ['linux.git-switch-c', 'linux.git-pull-ff', 'linux.git-push'], quiz: [
        q('git-branch-1', 'What does --ff-only refuse?', ['A clean update', 'A pull requiring a merge or rebase', 'A local commit', 'A new branch'], 1, 'It accepts only fast-forward integration.'),
        q('git-branch-2', 'What does -u set during git push?', ['A username', 'An upstream tracking branch', 'A new repository license', 'A remote password'], 1, '-u associates the local branch with the remote branch.'),
      ] }),
    m({ id: 'github.review', title: 'GitHub CLI review flow', level: 'intermediate', outcome: 'Check account context, clone a repository, open a pull request, and inspect CI.', summary: 'Authenticated GitHub CLI commands and review checks.',
      concept: ['Git manages local history; GitHub hosts a remote repository and pull request workflow. gh uses its authenticated account to interact with GitHub.', 'A pull request asks for review. Inspect the target branch, title, body, diff, and check results. A queued check is not a pass.'],
      commandIds: ['linux.gh-auth-status', 'linux.gh-repo-clone', 'linux.gh-pr-create', 'linux.gh-pr-checks'], quiz: [
        q('github-review-1', 'What should you inspect before opening a pull request?', ['Only the branch name', 'Its diff and target branch', 'Only a green icon', 'The remote password'], 1, 'The diff and target branch determine what reviewers will see and where it will merge.'),
        q('github-review-2', 'What does a queued CI check mean?', ['Passed', 'Failed', 'Still awaiting a result', 'Merged'], 2, 'Wait for the check result before treating it as verified.'),
      ] }),
  ],
}

export const aiModelsPath: LearningPath = {
  id: 'ai-models', title: 'AI Models and LLMs', tagline: 'Discover, inspect, and run models with care.',
  description: 'Learn the practical model CLI workflow: discover model repositories, check metadata, download a selected file, run a local model, and inspect resource use. All terminal output in CodeRush is simulated.',
  difficulty: 'mixed', estimatedHours: 3, accent: 'violet', icon: 'terminal',
  objectives: ['Distinguish a model repository from a loaded local model.', 'Inspect model cards and resource requirements before use.', 'Run and stop a local model and identify the files being downloaded.'],
  prerequisites: ['Basic command-line skills. Installing Ollama or the hf CLI is needed only to repeat exercises on your own machine.'],
  completion: 'Practice every command and score at least 50% on each module quiz.',
  modules: [
    m({ id: 'ai.discover', title: 'Find and evaluate models', level: 'beginner', outcome: 'Search model repositories and inspect metadata before choosing one.', summary: 'Hub search, model cards, license, task, and limits.',
      concept: ['An LLM is a model trained to predict and generate text. A repository may contain model weights, configuration, tokenizer files, and a model card. A name alone does not establish quality or suitability.', 'Read the model card for intended use, license, limitations, and resource needs. Metadata can be incomplete, so inspect the full card before real deployment.'],
      commandIds: ['linux.hf-models-search', 'linux.hf-model-card'], quiz: [
        q('ai-discover-1', 'What should you inspect before using a Hub model?', ['Only download count', 'Model card, license, task, limitations, and resource needs', 'Only the name', 'Only the file size'], 1, 'The model card and requirements supply context that a name or popularity number cannot.'),
        q('ai-discover-2', 'Does absent license metadata prove unrestricted use?', ['Yes', 'No', 'Only for small models', 'Only for local models'], 1, 'Missing metadata is not a grant of rights.'),
      ] }),
    m({ id: 'ai.files', title: 'Download deliberately', level: 'intermediate', outcome: 'Differentiate a small configuration download from a full model snapshot.', summary: 'Fetch one named file or a selected local model.',
      concept: ['Model files can be large. A single configuration file is different from weights. Check the repository and requested filename before downloading.', 'Ollama pull stores a model locally. Available tags can differ in size and resource needs; check your hardware and the model’s terms before pulling.'],
      commandIds: ['linux.hf-download-config', 'linux.ollama-pull', 'linux.ollama-ls'], quiz: [
        q('ai-files-1', 'What does hf download gpt2 config.json request?', ['Every model weight', 'Only the named config file', 'A running model', 'A pull request'], 1, 'Naming the file limits this request to config.json.'),
        q('ai-files-2', 'What does ollama ls show?', ['Loaded models only', 'Downloaded local models', 'All Hub models', 'API keys'], 1, 'Use ollama ps for loaded models.'),
      ] }),
    m({ id: 'ai.local', title: 'Run and manage a local LLM', level: 'intermediate', outcome: 'Start a local model session, inspect loaded models, and free resources afterward.', summary: 'Interactive inference and local resource management.',
      concept: ['Running a model performs inference. It may need substantial memory and may download the model first if it is absent.', 'A local CLI session and a hosted API have different data paths. Check integrations and avoid sending sensitive prompts until you understand where requests are processed. Stop unloads a running model; it does not remove downloaded files.'],
      commandIds: ['linux.ollama-run', 'linux.ollama-ps', 'linux.ollama-stop'], quiz: [
        q('ai-local-1', 'Which command shows models currently loaded in memory?', ['ollama ls', 'ollama ps', 'ollama pull', 'hf download'], 1, 'ollama ps lists currently running models.'),
        q('ai-local-2', 'What does ollama stop do to downloaded model files?', ['Deletes them', 'Publishes them', 'Leaves them on disk', 'Changes their license'], 2, 'Stop unloads the model without removing the files.'),
      ] }),
  ],
}
