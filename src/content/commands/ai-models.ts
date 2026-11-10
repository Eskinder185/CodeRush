import { define, type CommandDraft } from './helpers'

const ollama = { label: 'Ollama CLI reference', url: 'https://docs.ollama.com/cli' }
const hf = { label: 'Hugging Face Hub CLI guide', url: 'https://huggingface.co/docs/huggingface_hub/guides/cli' }

/** These exercises compare local model management with Hub discovery. Outputs are illustrative. */
const exercises: CommandDraft[] = [
  {
    id: 'linux.ollama-ls', command: 'ollama ls', title: 'List downloaded local models', category: 'ai-models', subcategory: 'Local models', difficulty: 'beginner',
    objective: 'See which models are stored on this computer.', summary: 'Lists models available locally through Ollama.',
    whenToUse: 'Before running a model or checking which tags are installed.', syntax: [{ token: 'ollama', meaning: 'local model CLI' }, { token: 'ls', meaning: 'list downloaded models' }],
    sampleOutput: 'NAME       ID           SIZE\ngemma4     abc123def456  4.2 GB', mistakes: ['Confusing downloaded models with models currently loaded in memory.'], requirements: 'Ollama installed.',
    recallPrompt: 'List the models downloaded on this machine.', related: ['linux.ollama-ps', 'linux.ollama-pull'], source: ollama,
  },
  {
    id: 'linux.ollama-pull', command: 'ollama pull gemma4', title: 'Download a model', category: 'ai-models', subcategory: 'Local models', difficulty: 'beginner',
    objective: 'Download a named model for local use.', summary: 'Fetches the gemma4 model and its files from Ollama’s registry.',
    whenToUse: 'When the model is not already present locally. Check model size and license first.', syntax: [{ token: 'ollama pull', meaning: 'download a model' }, { token: 'gemma4', meaning: 'model name from the registry' }],
    sampleOutput: 'pulling manifest\npulling layers ... 100%\nsuccess', mistakes: ['Assuming all model tags need the same RAM, disk, or GPU capacity.'], safety: 'changes-state', requirements: 'Ollama installed, network access, and adequate disk space.',
    recallPrompt: 'Download gemma4 for local use.', related: ['linux.ollama-ls', 'linux.ollama-run'], source: ollama,
  },
  {
    id: 'linux.ollama-run', command: 'ollama run gemma4', title: 'Chat with a local model', category: 'ai-models', subcategory: 'Inference', difficulty: 'beginner',
    objective: 'Start an interactive prompt session with a named model.', summary: 'Runs gemma4 in an interactive Ollama session; it may fetch a missing model first.',
    whenToUse: 'For local experiments after checking the model’s license and resource needs.', syntax: [{ token: 'ollama run', meaning: 'start model inference' }, { token: 'gemma4', meaning: 'model to run' }],
    sampleOutput: '>>> Send a message (/? for help)', mistakes: ['Entering private data without checking where the model and integration send requests.'], safety: 'changes-state', requirements: 'Ollama installed; sufficient memory for the selected model.',
    recallPrompt: 'Start an interactive local session with gemma4.', related: ['linux.ollama-pull', 'linux.ollama-ps'], source: ollama,
  },
  {
    id: 'linux.ollama-ps', command: 'ollama ps', title: 'Inspect models in memory', category: 'ai-models', subcategory: 'Local models', difficulty: 'beginner',
    objective: 'Identify which models are currently loaded and using resources.', summary: 'Lists running or loaded Ollama models.',
    whenToUse: 'When checking memory or GPU use before starting another model.', syntax: [{ token: 'ollama ps', meaning: 'list currently running models' }],
    sampleOutput: 'NAME     SIZE    PROCESSOR    UNTIL\ngemma4   4.2 GB  100% CPU     4 minutes', mistakes: ['Expecting this to show every downloaded model; ollama ls does that.'], requirements: 'Ollama installed.',
    recallPrompt: 'Show models currently loaded in memory.', related: ['linux.ollama-ls', 'linux.ollama-stop'], source: ollama,
  },
  {
    id: 'linux.ollama-stop', command: 'ollama stop gemma4', title: 'Unload a running model', category: 'ai-models', subcategory: 'Local models', difficulty: 'intermediate',
    objective: 'Free resources used by a loaded model.', summary: 'Stops the named Ollama model without deleting its downloaded files.',
    whenToUse: 'After a local experiment when memory is needed elsewhere.', syntax: [{ token: 'ollama stop', meaning: 'stop a loaded model' }, { token: 'gemma4', meaning: 'model to stop' }],
    sampleOutput: '(no output on success)', mistakes: ['Confusing stop with rm, which removes the local model.'], safety: 'changes-state', requirements: 'Ollama installed and model loaded.',
    recallPrompt: 'Unload gemma4 from memory without deleting its files.', related: ['linux.ollama-ps', 'linux.ollama-ls'], source: ollama,
  },
  {
    id: 'linux.hf-models-search', command: 'hf models ls --search bert --limit 2', title: 'Search model repositories', category: 'ai-models', subcategory: 'Model discovery', difficulty: 'intermediate',
    objective: 'Find model repositories by a search term.', summary: 'Lists up to two Hub models matching bert.',
    whenToUse: 'When comparing model options before checking model cards, licenses, and intended tasks.', syntax: [{ token: 'hf models ls', meaning: 'list Hub models' }, { token: '--search bert', meaning: 'search term' }, { token: '--limit 2', meaning: 'show at most two results' }],
    sampleOutput: 'google-bert/bert-base-uncased\nbert-base-multilingual-cased', mistakes: ['Selecting a model by name alone without reviewing its model card.'], requirements: 'Current Hugging Face hf CLI installed.',
    recallPrompt: 'Search Hub models for bert and show no more than two results.', related: ['linux.hf-model-card', 'linux.hf-download-config'], source: hf,
  },
  {
    id: 'linux.hf-model-card', command: 'hf models card gpt2 --metadata', title: 'Inspect model-card metadata', category: 'ai-models', subcategory: 'Model discovery', difficulty: 'intermediate',
    objective: 'Read metadata before using a model.', summary: 'Prints metadata from the gpt2 model card, such as license and task tags when present.',
    whenToUse: 'Before downloading or deploying a model; read the full card for limitations and intended use.', syntax: [{ token: 'hf models card', meaning: 'display a model card' }, { token: 'gpt2', meaning: 'repository ID' }, { token: '--metadata', meaning: 'show frontmatter metadata only' }],
    sampleOutput: 'license: mit\ntags:\n- text-generation', mistakes: ['Treating missing metadata as proof that a model has no restrictions.'], requirements: 'Current Hugging Face hf CLI installed.',
    recallPrompt: 'Inspect metadata from the gpt2 model card.', related: ['linux.hf-models-search', 'linux.hf-download-config'], source: hf,
  },
  {
    id: 'linux.hf-download-config', command: 'hf download gpt2 config.json', title: 'Download one model file', category: 'ai-models', subcategory: 'Model files', difficulty: 'intermediate',
    objective: 'Fetch a small named file from a model repository.', summary: 'Downloads only config.json from gpt2 to the local Hub cache.',
    whenToUse: 'When inspecting a model configuration without downloading all model weights.', syntax: [{ token: 'hf download', meaning: 'fetch Hub content' }, { token: 'gpt2', meaning: 'repository ID' }, { token: 'config.json', meaning: 'single filename' }],
    sampleOutput: '/home/student/.cache/huggingface/hub/models--gpt2/snapshots/example/config.json', mistakes: ['Omitting the filename and unintentionally downloading a much larger repository snapshot.'], safety: 'changes-state', requirements: 'Current Hugging Face hf CLI installed and network access.',
    recallPrompt: 'Download only config.json from the gpt2 model repository.', related: ['linux.hf-model-card'], source: hf,
  },
]

export const aiModels = define('linux', exercises)
