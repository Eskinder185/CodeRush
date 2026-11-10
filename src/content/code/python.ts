import type { LanguageTrack } from '../types'

// Lesson text is preserved from CodeRush 1.x so saved progress keeps matching lesson ids.
export const pythonTrack: LanguageTrack = {
  "language": "python",
  "languageName": "Python",
  "description": "High-level language for automation, data work, and web services.",
  "lessons": [
    {
      "id": "python-basics-1",
      "title": "Hello World & Variables",
      "description": "Learn basic Python syntax with print statements and variable assignments",
      "difficulty": "beginner",
      "code": "# Hello World in Python\nprint(\"Hello, World!\")\n\n# Variables and basic data types\nname = \"Alice\"\nage = 25\nheight = 5.6\nis_student = True\n\n# String formatting\nprint(f\"Name: {name}\")\nprint(f\"Age: {age}\")\nprint(f\"Height: {height} feet\")\nprint(f\"Is student: {is_student}\")",
      "expectedTime": 5,
      "concepts": [
        "print statements",
        "variables",
        "data types",
        "f-strings"
      ]
    },
    {
      "id": "python-basics-2",
      "title": "Lists and Loops",
      "description": "Master Python lists and basic loop structures",
      "difficulty": "beginner",
      "code": "# Creating and manipulating lists\nfruits = [\"apple\", \"banana\", \"orange\"]\nnumbers = [1, 2, 3, 4, 5]\n\n# Adding items to lists\nfruits.append(\"grape\")\nnumbers.insert(0, 0)\n\n# For loops\nfor fruit in fruits:\n    print(f\"I like {fruit}\")\n\n# List comprehensions\nsquared_numbers = [x**2 for x in numbers]\nprint(squared_numbers)\n\n# While loops\ncount = 0\nwhile count < 3:\n    print(f\"Count: {count}\")\n    count += 1",
      "expectedTime": 8,
      "concepts": [
        "lists",
        "for loops",
        "while loops",
        "list comprehensions"
      ]
    },
    {
      "id": "python-intermediate-1",
      "title": "Functions and Conditionals",
      "description": "Create reusable functions and implement conditional logic",
      "difficulty": "intermediate",
      "code": "def calculate_grade(score):\n    \"\"\"Calculate letter grade based on score\"\"\"\n    if score >= 90:\n        return \"A\"\n    elif score >= 80:\n        return \"B\"\n    elif score >= 70:\n        return \"C\"\n    elif score >= 60:\n        return \"D\"\n    else:\n        return \"F\"\n\ndef process_students(student_scores):\n    \"\"\"Process a list of student scores\"\"\"\n    results = []\n    for name, score in student_scores.items():\n        grade = calculate_grade(score)\n        results.append(f\"{name}: {score} -> {grade}\")\n    return results\n\n# Example usage\nstudents = {\"Alice\": 95, \"Bob\": 78, \"Charlie\": 82}\ngrades = process_students(students)\nfor grade in grades:\n    print(grade)",
      "expectedTime": 10,
      "concepts": [
        "functions",
        "conditionals",
        "dictionaries",
        "docstrings"
      ]
    },
    {
      "id": "python-intermediate-2",
      "title": "Error Handling and Imports",
      "description": "Handle errors gracefully and work with external modules",
      "difficulty": "intermediate",
      "code": "import math\nfrom datetime import datetime, timedelta\n\ndef safe_divide(a, b):\n    \"\"\"Safely divide two numbers with error handling\"\"\"\n    try:\n        result = a / b\n        return result\n    except ZeroDivisionError:\n        print(\"Error: Cannot divide by zero\")\n        return None\n    except TypeError:\n        print(\"Error: Invalid input types\")\n        return None\n\ndef calculate_circle_area(radius):\n    \"\"\"Calculate circle area with input validation\"\"\"\n    try:\n        if radius < 0:\n            raise ValueError(\"Radius cannot be negative\")\n        return math.pi * radius ** 2\n    except ValueError as e:\n        print(f\"Value error: {e}\")\n        return None\n\n# Working with dates\nnow = datetime.now()\nfuture_date = now + timedelta(days=30)\nprint(f\"Today: {now.strftime('%Y-%m-%d')}\")\nprint(f\"30 days from now: {future_date.strftime('%Y-%m-%d')}\")",
      "expectedTime": 12,
      "concepts": [
        "try-except",
        "imports",
        "datetime",
        "input validation"
      ]
    },
    {
      "id": "python-advanced-1",
      "title": "Classes and Objects",
      "description": "Object-oriented programming with classes and inheritance",
      "difficulty": "advanced",
      "code": "class Animal:\n    def __init__(self, name, species):\n        self.name = name\n        self.species = species\n        self.energy = 100\n    \n    def eat(self, food_amount):\n        self.energy += food_amount\n        print(f\"{self.name} ate and gained {food_amount} energy\")\n    \n    def make_sound(self):\n        return \"Some generic animal sound\"\n\nclass Dog(Animal):\n    def __init__(self, name, breed):\n        super().__init__(name, \"Canine\")\n        self.breed = breed\n    \n    def make_sound(self):\n        return \"Woof!\"\n    \n    def fetch(self):\n        if self.energy >= 20:\n            self.energy -= 20\n            return f\"{self.name} fetched the ball!\"\n        else:\n            return f\"{self.name} is too tired to fetch\"\n\n# Usage\nmy_dog = Dog(\"Buddy\", \"Golden Retriever\")\nprint(my_dog.make_sound())\nprint(my_dog.fetch())",
      "expectedTime": 15,
      "concepts": [
        "classes",
        "inheritance",
        "super()",
        "method overriding"
      ]
    },
    {
      "id": "python-career-pathlib",
      "title": "Modern File Systems with Pathlib",
      "description": "Navigate, inspect, and safely read configuration paths with standard pathlib.Path.",
      "difficulty": "intermediate",
      "code": "from pathlib import Path\nimport json\n\ndef load_app_config(config_dir: str) -> dict:\n    path = Path(config_dir) / \"settings.json\"\n    if not path.exists():\n        raise FileNotFoundError(f\"Config file missing: {path}\")\n    \n    content = path.read_text(encoding=\"utf-8\")\n    return json.loads(content)\n\n# Safely inspect current directory structure\nworkspace = Path(\".\")\nlog_files = sorted(workspace.glob(\"*.log\"))\nprint(f\"Discovered {len(log_files)} log files ready for archiving\")",
      "expectedTime": 10,
      "concepts": [
        "pathlib",
        "Path",
        "glob",
        "read_text",
        "file systems"
      ]
    },
    {
      "id": "python-career-json-csv",
      "title": "Structured Data: JSON and CSV Processing",
      "description": "Parse and export structured metrics using Python's standard json and csv modules.",
      "difficulty": "intermediate",
      "code": "import csv\nimport json\nfrom io import StringIO\n\ndef export_server_metrics(raw_json: str) -> str:\n    data = json.loads(raw_json)\n    output = StringIO()\n    writer = csv.DictWriter(output, fieldnames=[\"host\", \"cpu_pct\", \"status\"])\n    writer.writeheader()\n    \n    for node in data.get(\"nodes\", []):\n        status = \"HEALTHY\" if node.get(\"cpu_pct\", 0) < 85 else \"HIGH_LOAD\"\n        writer.writerow({\"host\": node[\"name\"], \"cpu_pct\": node[\"cpu_pct\"], \"status\": status})\n    \n    return output.getvalue()\n\npayload = '{\"nodes\": [{\"name\": \"app-01\", \"cpu_pct\": 42}, {\"name\": \"app-02\", \"cpu_pct\": 91}]}'\nprint(export_server_metrics(payload).strip())",
      "expectedTime": 12,
      "concepts": [
        "json.loads",
        "csv.DictWriter",
        "StringIO",
        "data transformation"
      ]
    },
    {
      "id": "python-career-argparse",
      "title": "CLI Tool Building with Argparse",
      "description": "Construct command-line utilities with typed arguments, flags, and help messages.",
      "difficulty": "intermediate",
      "code": "import argparse\nimport sys\n\ndef build_parser() -> argparse.ArgumentParser:\n    parser = argparse.ArgumentParser(description=\"System log analyzer CLI\")\n    parser.add_argument(\"--file\", required=True, help=\"Path to input log file\")\n    parser.add_argument(\"--threshold\", type=int, default=5, help=\"Error count trigger\")\n    parser.add_argument(\"--json\", action=\"store_true\", help=\"Output format in JSON\")\n    return parser\n\ndef main(args: list[str]) -> None:\n    parser = build_parser()\n    opts = parser.parse_args(args)\n    print(f\"Analyzing {opts.file} with error threshold {opts.threshold} (JSON={opts.json})\")\n\nif __name__ == \"__main__\":\n    main([\"--file\", \"/var/log/syslog\", \"--threshold\", \"10\"])",
      "expectedTime": 12,
      "concepts": [
        "argparse",
        "ArgumentParser",
        "CLI arguments",
        "flags"
      ]
    },
    {
      "id": "python-career-requests",
      "title": "HTTP Client with Retries and Timeouts",
      "description": "Make robust API calls with connection timeouts, error status handling, and backoff.",
      "difficulty": "intermediate",
      "code": "import urllib.request\nimport urllib.error\nimport json\nimport time\n\ndef fetch_service_health(endpoint: str, max_retries: int = 3, timeout_sec: float = 2.0) -> dict:\n    for attempt in range(1, max_retries + 1):\n        try:\n            req = urllib.request.Request(endpoint, headers={\"User-Agent\": \"CodeRushHealth/1.0\"})\n            with urllib.request.urlopen(req, timeout=timeout_sec) as resp:\n                if resp.status == 200:\n                    return json.loads(resp.read().decode(\"utf-8\"))\n        except (urllib.error.URLError, TimeoutError) as err:\n            if attempt == max_retries:\n                return {\"status\": \"DOWN\", \"error\": str(err), \"attempts\": attempt}\n            time.sleep(0.1 * attempt)\n    return {\"status\": \"UNKNOWN\"}",
      "expectedTime": 12,
      "concepts": [
        "urllib.request",
        "timeouts",
        "retries",
        "status codes",
        "safe error handling"
      ]
    },
    {
      "id": "python-career-pytest",
      "title": "Unit Testing and Fixtures with Pytest",
      "description": "Write automated test suites using pytest fixtures, assertions, and mock data.",
      "difficulty": "intermediate",
      "code": "import pytest\n\ndef calculate_error_rate(total_requests: int, failed_requests: int) -> float:\n    if total_requests <= 0:\n        raise ValueError(\"Total requests must be positive\")\n    return round((failed_requests / total_requests) * 100, 2)\n\n@pytest.fixture\ndef sample_traffic() -> dict[str, int]:\n    return {\"total\": 1000, \"failed\": 25}\n\ndef test_error_rate_calculation(sample_traffic):\n    rate = calculate_error_rate(sample_traffic[\"total\"], sample_traffic[\"failed\"])\n    assert rate == 2.50\n\ndef test_invalid_traffic_raises():\n    with pytest.raises(ValueError):\n        calculate_error_rate(0, 10)",
      "expectedTime": 10,
      "concepts": [
        "pytest",
        "@pytest.fixture",
        "assert",
        "pytest.raises"
      ]
    },
    {
      "id": "python-career-log-parser",
      "title": "Log Parsing and Regex Pattern Extraction",
      "description": "Parse synthetic web server logs to isolate HTTP 5xx errors and IP addresses.",
      "difficulty": "advanced",
      "code": "import re\nfrom collections import Counter\n\nLOG_PATTERN = re.compile(r'^(?P<ip>\\S+) - - \\[(?P<time>[^\\]]+)\\] \"(?P<method>\\S+) (?P<path>\\S+) [^\"]+\" (?P<status>\\d{3})')\n\ndef analyze_server_logs(log_lines: list[str]) -> dict:\n    errors = []\n    status_counts = Counter()\n    \n    for line in log_lines:\n        match = LOG_PATTERN.match(line)\n        if match:\n            status = int(match.group(\"status\"))\n            status_counts[status] += 1\n            if status >= 500:\n                errors.append({\"ip\": match.group(\"ip\"), \"path\": match.group(\"path\"), \"status\": status})\n    \n    return {\"total_errors\": len(errors), \"status_distribution\": dict(status_counts), \"errors\": errors}",
      "expectedTime": 14,
      "concepts": [
        "re.compile",
        "regex groups",
        "Counter",
        "log analysis"
      ]
    },
    {
      "id": "python-career-health-capstone",
      "title": "Python Capstone: System Health Monitoring CLI",
      "description": "End-to-end CLI tool measuring system metrics, parsing status, and generating structured JSON reports.",
      "difficulty": "advanced",
      "code": "import json\nimport sys\nfrom datetime import datetime\n\ndef generate_health_report(disk_pct: float, memory_pct: float, services: dict[str, bool]) -> dict:\n    healthy = disk_pct < 90.0 and memory_pct < 90.0 and all(services.values())\n    return {\n        \"timestamp\": datetime.utcnow().isoformat() + \"Z\",\n        \"status\": \"HEALTHY\" if healthy else \"DEGRADED\",\n        \"metrics\": {\"disk_used_percent\": disk_pct, \"memory_used_percent\": memory_pct},\n        \"services\": services,\n        \"alert_required\": not healthy\n    }\n\ndef main() -> int:\n    report = generate_health_report(disk_pct=72.4, memory_pct=58.1, services={\"nginx\": True, \"postgres\": True})\n    print(json.dumps(report, indent=2))\n    return 0 if report[\"status\"] == \"HEALTHY\" else 1\n\nif __name__ == \"__main__\":\n    sys.exit(main())",
      "expectedTime": 15,
      "concepts": [
        "Python Capstone",
        "CLI exit codes",
        "JSON reporting",
        "systems automation"
      ]
    }
  ]
}
