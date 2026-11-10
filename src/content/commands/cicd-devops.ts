import { define, type CommandDraft } from './helpers'

const ghDocs = (slug: string) => ({
  label: 'GitHub Actions documentation',
  url: `https://docs.github.com/en/actions/${slug}`,
})

/** CI/CD and GitHub Actions pipeline commands practiced in the terminal. */
const exercises: CommandDraft[] = [
  {
    id: 'linux.gh-workflow-run',
    command: 'gh workflow run build.yml -f environment=staging',
    title: 'Trigger a workflow_dispatch event manually',
    category: 'automation',
    subcategory: 'GitHub Actions',
    difficulty: 'intermediate',
    objective: 'Dispatch an automated GitHub Actions pipeline with custom input parameters.',
    summary: 'Triggers the workflow_dispatch event for build.yml, passing environment=staging.',
    whenToUse: 'When testing a deployment pipeline or triggering ad-hoc smoke test jobs.',
    syntax: [
      { token: 'gh workflow run', meaning: 'trigger workflow run' },
      { token: 'build.yml', meaning: 'target workflow file' },
      { token: '-f', meaning: 'input field key=value' },
      { token: 'environment=staging', meaning: 'parameter value' },
    ],
    sampleOutput: '✓ Created workflow_dispatch event for build.yml at main\nTo see runs, try: gh run list --workflow=build.yml',
    mistakes: ['Forgetting that workflow_dispatch must be explicitly defined under "on:" in the YAML file.'],
    safety: 'changes-state',
    requirements: 'GitHub CLI authenticated; workflow_dispatch configured.',
    recallPrompt: 'Manually dispatch build.yml with the input parameter environment=staging.',
    source: ghDocs('managing-workflow-runs/manually-running-a-workflow'),
  },
  {
    id: 'linux.gh-secret-set',
    command: 'gh secret set DOCKER_TOKEN --body "token-sample-123"',
    title: 'Configure an encrypted repository secret',
    category: 'security',
    subcategory: 'CI/CD Secrets',
    difficulty: 'intermediate',
    objective: 'Store deployment tokens or credentials securely for pipeline execution.',
    summary: 'Encrypts and sets a repository-level secret accessible to GitHub Actions workflows.',
    whenToUse: 'When integrating container registries, cloud providers, or automated deploy keys.',
    syntax: [
      { token: 'gh secret set', meaning: 'create or update secret' },
      { token: 'DOCKER_TOKEN', meaning: 'secret identifier' },
      { token: '--body', meaning: 'secret value string' },
    ],
    sampleOutput: '✓ Set secret DOCKER_TOKEN for OWNER/REPO',
    mistakes: ['Printing secrets to workflow logs using echo; GitHub masks known secrets, but raw echoing risks leaks.'],
    safety: 'changes-state',
    requirements: 'GitHub CLI authenticated with admin or secret management permissions.',
    recallPrompt: 'Set an encrypted repository secret named DOCKER_TOKEN using GitHub CLI.',
    source: ghDocs('security-guides/encrypted-secrets'),
  },
  {
    id: 'linux.docker-build-t',
    command: 'docker build -t task-api:1.0.0 .',
    title: 'Build a container image with a tag',
    category: 'automation',
    subcategory: 'Docker',
    difficulty: 'intermediate',
    objective: 'Package an application and its runtime dependencies into a reproducible OCI image.',
    summary: 'Executes instructions in Dockerfile within current directory and tags the image as task-api:1.0.0.',
    whenToUse: 'In CI/CD build stages and local containerized testing.',
    syntax: [
      { token: 'docker build', meaning: 'build image from Dockerfile' },
      { token: '-t task-api:1.0.0', meaning: 'tag with name and version' },
      { token: '.', meaning: 'build context directory' },
    ],
    sampleOutput: `[+] Building 4.2s (8/8) FINISHED
 => [internal] load build definition from Dockerfile
 => => naming to docker.io/library/task-api:1.0.0`,
    mistakes: ['Omitting the trailing period which defines the build context directory.'],
    safety: 'changes-state',
    recallPrompt: 'Build a Docker image from the current directory and tag it task-api:1.0.0.',
    source: { label: 'Docker build reference', url: 'https://docs.docker.com/engine/reference/commandline/build/' },
  },
  {
    id: 'linux.docker-compose-up',
    command: 'docker compose up -d --wait',
    title: 'Launch multi-container application in background',
    category: 'automation',
    subcategory: 'Docker Compose',
    difficulty: 'intermediate',
    objective: 'Start application services, networks, and databases declared in compose.yml.',
    summary: 'Spawns containers in detached mode and waits until all health checks report healthy.',
    whenToUse: 'When running local integration tests with PostgreSQL and Redis dependencies.',
    syntax: [
      { token: 'docker compose up', meaning: 'create and start containers' },
      { token: '-d', meaning: 'detached background mode' },
      { token: '--wait', meaning: 'block until services pass health checks' },
    ],
    sampleOutput: `[+] Running 3/3
 ✔ Network app-net     Created
 ✔ Container db-srv    Healthy
 ✔ Container api-srv   Started`,
    mistakes: ['Starting dependent services without health checks, leading to connection race conditions.'],
    safety: 'changes-state',
    recallPrompt: 'Start Docker Compose services in detached mode and wait for health checks.',
    source: { label: 'Docker Compose CLI reference', url: 'https://docs.docker.com/compose/reference/' },
  },
  {
    id: 'linux.mvn-verify',
    command: 'mvn clean verify -DskipTests=false',
    title: 'Execute Maven build lifecycle through verification',
    category: 'automation',
    subcategory: 'Build Automation',
    difficulty: 'intermediate',
    objective: 'Compile code, run unit and integration tests, and package release artifacts.',
    summary: 'Runs the Maven clean lifecycle and proceeds through compile, test, package, and verify phases.',
    whenToUse: 'As the standard CI validation step for Java Spring Boot projects.',
    syntax: [
      { token: 'mvn', meaning: 'Apache Maven build tool' },
      { token: 'clean', meaning: 'delete target directory' },
      { token: 'verify', meaning: 'run checks to verify package quality' },
      { token: '-DskipTests=false', meaning: 'explicitly enforce test execution' },
    ],
    sampleOutput: `[INFO] --- maven-surefire-plugin:3.2.5:test (default-test) ---
[INFO] Tests run: 14, Failures: 0, Errors: 0, Skipped: 0
[INFO] BUILD SUCCESS
[INFO] Total time:  12.410 s`,
    mistakes: ['Using -DskipTests in CI pipelines, which hides failing regressions.'],
    recallPrompt: 'Run clean and verify phases in Maven while ensuring tests execute.',
    source: { label: 'Maven lifecycle reference', url: 'https://maven.apache.org/guides/introduction/introduction-to-the-lifecycle.html' },
  },
  {
    id: 'linux.pytest-cov',
    command: 'pytest --cov=src --cov-report=term-missing -v',
    title: 'Execute Python test suite with coverage report',
    category: 'automation',
    subcategory: 'Testing',
    difficulty: 'intermediate',
    objective: 'Run automated pytest assertions and calculate statement test coverage.',
    summary: 'Discovers tests, executes them with verbose logging, and reports coverage percentages per file.',
    whenToUse: 'In CI workflows to block merges when test coverage drops below target thresholds.',
    syntax: [
      { token: 'pytest', meaning: 'Python test runner' },
      { token: '--cov=src', meaning: 'measure coverage on src directory' },
      { token: '--cov-report=term-missing', meaning: 'list line numbers of uncovered code' },
      { token: '-v', meaning: 'verbose test names' },
    ],
    sampleOutput: `tests/test_health.py::test_health_status PASSED
tests/test_parser.py::test_log_regex PASSED
TOTAL coverage: 94% (missing lines: 42-45 in parser.py)`,
    mistakes: ['Treating 100% code coverage as proof that edge cases and error handling are correct.'],
    recallPrompt: 'Run pytest on src with verbose output and line-level missing coverage reporting.',
    source: { label: 'Pytest documentation', url: 'https://docs.pytest.org/' },
  },
  {
    id: 'linux.terraform-plan',
    command: 'terraform plan -out=tfplan.binary',
    title: 'Generate and save Terraform execution plan',
    category: 'automation',
    subcategory: 'Infrastructure as Code',
    difficulty: 'advanced',
    objective: 'Preview infrastructure changes safely before applying them to cloud providers.',
    summary: 'Compares configuration with state and outputs a deterministic binary plan file.',
    whenToUse: 'In CI pipelines before manual or automated deployment approval.',
    syntax: [
      { token: 'terraform plan', meaning: 'create execution plan' },
      { token: '-out=tfplan.binary', meaning: 'save plan to file for apply verification' },
    ],
    sampleOutput: `Terraform will perform the following actions:
  + aws_s3_bucket.artifacts will be created
Plan: 1 to add, 0 to change, 0 to destroy.
Saved the plan to: tfplan.binary`,
    mistakes: ['Running terraform apply directly without saving and reviewing the plan.'],
    recallPrompt: 'Create a Terraform execution plan and save it to tfplan.binary.',
    source: { label: 'Terraform CLI plan reference', url: 'https://developer.hashicorp.com/terraform/cli/commands/plan' },
  },
  {
    id: 'linux.kubectl-get-pods',
    command: 'kubectl get pods -n production -o wide',
    title: 'Inspect Kubernetes pods with node placement and status',
    category: 'system',
    subcategory: 'Kubernetes',
    difficulty: 'intermediate',
    objective: 'Check rollout status, restart counts, and node distribution for cluster pods.',
    summary: 'Lists pods in the production namespace with IP addresses, node names, and health states.',
    whenToUse: 'After deploying an updated container image or diagnosing CrashLoopBackOff.',
    syntax: [
      { token: 'kubectl get pods', meaning: 'query pod resources' },
      { token: '-n production', meaning: 'specify namespace' },
      { token: '-o wide', meaning: 'include IP and Node columns' },
    ],
    sampleOutput: `NAME                        READY   STATUS    RESTARTS   AGE   IP             NODE
task-api-7b8f99d86-a1b2c    1/1     Running   0          5m    192.0.2.140    node-pool-01
task-api-7b8f99d86-d3e4f    1/1     Running   0          5m    192.0.2.141    node-pool-02`,
    mistakes: ['Omitting the namespace (-n) when inspecting resources outside the default namespace.'],
    recallPrompt: 'List all pods in the production namespace with wide node information.',
    source: { label: 'Kubectl reference', url: 'https://kubernetes.io/docs/reference/kubectl/' },
  },
]

export const cicdDevops = define('linux', exercises)
