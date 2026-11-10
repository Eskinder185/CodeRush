import type { LearningPath } from '../types'
import { q } from './helpers'

export const cicdDevopsPath: LearningPath = {
  id: 'cicd-devops',
  title: 'CI/CD and DevOps Engineering',
  tagline: 'Pipelines, containers, and infrastructure automation.',
  description: 'Master automated software delivery from code commit to container deployment. Build robust GitHub Actions workflows, package Docker images, run unit tests, manage secrets, and manage infrastructure as code.',
  difficulty: 'mixed',
  estimatedHours: 6,
  accent: 'cyan',
  icon: 'router',
  completion: 'Practice every CI/CD command, pass pipeline exercises, and complete each module quiz with at least 50%.',
  objectives: [
    'Author and debug GitHub Actions workflows and YAML pipeline syntax.',
    'Build and run containerized applications with Docker and Docker Compose.',
    'Automate Java and Python test suites in continuous integration.',
    'Apply Infrastructure as Code and Kubernetes deployment fundamentals.',
  ],
  prerequisites: ['Git version control basics and familiarity with the Linux command line.'],
  modules: [
    {
      id: 'cicd.actions-foundations',
      title: 'GitHub Actions and Pipeline Automation',
      level: 'intermediate',
      outcome: 'Trigger automated workflows with manual dispatch parameters and secure encrypted secrets.',
      summary: 'gh workflow run, secrets management, and pipeline event triggers.',
      concept: [
        'GitHub Actions executes automated workflows defined in .github/workflows/*.yml. Workflows consist of events, jobs running on virtual runners, and sequential steps.',
        'Manual workflow_dispatch events allow operators to execute parameterized pipelines on demand. Encrypted repository secrets keep cloud and registry credentials safe from accidental disclosure in commit logs.',
      ],
      commandIds: ['linux.gh-workflow-run', 'linux.gh-secret-set'],
      quiz: [
        q('cicd-found-1', 'Which YAML event allows manual pipeline triggers with custom input parameters?', ['push', 'pull_request', 'workflow_dispatch', 'schedule'], 2, 'workflow_dispatch enables manual execution from GitHub CLI or UI.'),
        q('cicd-found-2', 'Where should deployment tokens and API keys be stored for GitHub Actions?', ['Directly in YAML workflow files', 'In public git commit messages', 'In encrypted repository secrets', 'In a README file'], 2, 'Encrypted repository secrets provide secure access without exposing keys in source code.'),
      ],
      scenarioIds: [],
    },
    {
      id: 'cicd.containers',
      title: 'Containers and Multi-Service Compose',
      level: 'intermediate',
      outcome: 'Build reproducible container images and launch multi-service stacks with health dependencies.',
      summary: 'Docker image tagging, build context, and Compose service orchestration.',
      concept: [
        'Containers package an application with its exact operating system libraries and runtime environment. docker build compiles Dockerfile instructions into immutable OCI image layers.',
        'Docker Compose orchestrates multi-container applications (such as a backend API and a PostgreSQL database) with shared virtual networks and health check synchronization.',
      ],
      commandIds: ['linux.docker-build-t', 'linux.docker-compose-up'],
      quiz: [
        q('cicd-cont-1', 'What does the trailing period (.) in "docker build -t app:1.0 ." specify?', ['The target image name', 'The build context directory', 'Background mode', 'Silent execution'], 1, 'The dot specifies the local build context directory.'),
        q('cicd-cont-2', 'Why is --wait useful in "docker compose up -d --wait"?', ['It makes Docker faster', 'It blocks until services pass their defined health checks', 'It deletes old containers', 'It prompts for passwords'], 1, '--wait ensures dependencies are fully operational before continuing.'),
      ],
      scenarioIds: [],
    },
    {
      id: 'cicd.automated-testing',
      title: 'Automated Test Verification in CI',
      level: 'intermediate',
      outcome: 'Execute Java Maven build lifecycles and Python Pytest test suites with coverage thresholds.',
      summary: 'Maven clean verify, surefire test execution, and pytest line-coverage reporting.',
      concept: [
        'Continuous Integration demands that every commit and pull request automatically builds and executes automated tests. In Java, Maven runs unit and integration tests during the verify phase.',
        'In Python, pytest discovers and asserts test specifications, reporting coverage percentages to prevent regression bugs before merging.',
      ],
      commandIds: ['linux.mvn-verify', 'linux.pytest-cov'],
      quiz: [
        q('cicd-test-1', 'What risk occurs if -DskipTests=true is passed to Maven in a CI pipeline?', ['The build runs out of memory', 'Automated regression tests are bypassed, allowing broken code into main', 'The compiler fails', 'Docker stops working'], 1, 'Skipping tests disables the primary safety mechanism of CI.'),
        q('cicd-test-2', 'What does pytest --cov report measure?', ['How many seconds tests took', 'The percentage of code statements executed by automated tests', 'Network bandwidth', 'Memory usage'], 1, 'Code coverage measures which lines of application code were executed during test runs.'),
      ],
      scenarioIds: [],
    },
    {
      id: 'cicd.infrastructure-cloud',
      title: 'Infrastructure as Code and Kubernetes Rollouts',
      level: 'advanced',
      outcome: 'Generate deterministic Terraform execution plans and monitor containerized Kubernetes pods.',
      summary: 'Terraform plan review and kubectl production pod inspection.',
      concept: [
        'Infrastructure as Code (IaC) defines cloud resources (servers, databases, VPCs) in declarative configuration files. terraform plan evaluates proposed cloud modifications before applying them.',
        'Kubernetes coordinates and manages containerized microservices across server clusters. kubectl queries cluster state, deployment rollouts, restart counts, and node health.',
      ],
      commandIds: ['linux.terraform-plan', 'linux.kubectl-get-pods'],
      quiz: [
        q('cicd-infra-1', 'Why is saving a Terraform plan with -out=tfplan.binary a best practice in CI/CD?', ['It compresses files', 'It guarantees the exact reviewed plan is what gets applied without unexpected drifts', 'It generates passwords', 'It deletes stale servers'], 1, 'A saved binary plan prevents state discrepancies between review and execution.'),
        q('cicd-infra-2', 'In "kubectl get pods -n production", what does the -n flag specify?', ['Node count', 'Namespace', 'Network adapter', 'New deployment'], 1, '-n filters queries to a specific Kubernetes namespace.'),
      ],
      scenarioIds: [],
    },
  ],
}
