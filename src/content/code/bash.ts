import type { LanguageTrack } from '../types'

// Lesson text is preserved from CodeRush 1.x so saved progress keeps matching lesson ids.
export const bashTrack: LanguageTrack = {
  "language": "bash",
  "languageName": "Bash",
  "description": "Shell scripting for Linux and macOS automation.",
  "lessons": [
    {
      "id": "bash-basics-1",
      "title": "Basic Commands and Variables",
      "description": "Learn fundamental bash commands and variable usage",
      "difficulty": "beginner",
      "code": "#!/bin/bash\n\n# Basic commands and variables\necho \"Hello, World!\"\n\n# Variables\nname=\"Alice\"\nage=25\ncity=\"New York\"\n\necho \"Name: $name\"\necho \"Age: $age\"\necho \"City: $city\"\n\n# Command substitution\ncurrent_date=$(date)\necho \"Current date: $current_date\"\n\n# Environment variables\necho \"User: $USER\"\necho \"Home directory: $HOME\"\necho \"Current directory: $PWD\"\n\n# Basic file operations\necho \"Creating a test file...\"\necho \"This is a test file\" > test.txt\necho \"File created successfully\"\n\n# List files\necho \"Files in current directory:\"\nls -la\n\n# Remove test file\nrm test.txt\necho \"Test file removed\"",
      "expectedTime": 8,
      "concepts": [
        "echo",
        "variables",
        "command substitution",
        "environment variables",
        "file operations"
      ]
    },
    {
      "id": "bash-basics-2",
      "title": "Loops and Conditionals",
      "description": "Master bash loops and conditional statements",
      "difficulty": "beginner",
      "code": "#!/bin/bash\n\n# For loops\necho \"=== For Loop Examples ===\"\nfor i in {1..5}; do\n    echo \"Number: $i\"\ndone\n\n# For loop with array\nfruits=(\"apple\" \"banana\" \"orange\" \"grape\")\necho \"Fruits:\"\nfor fruit in \"${fruits[@]}\"; do\n    echo \"  - $fruit\"\ndone\n\n# While loop\necho \"=== While Loop Example ===\"\ncount=1\nwhile [ $count -le 3 ]; do\n    echo \"Count: $count\"\n    count=$((count + 1))\ndone\n\n# If-else statements\necho \"=== Conditional Examples ===\"\nnumber=10\n\nif [ $number -gt 5 ]; then\n    echo \"$number is greater than 5\"\nelif [ $number -eq 5 ]; then\n    echo \"$number equals 5\"\nelse\n    echo \"$number is less than 5\"\nfi\n\n# String comparison\nname=\"Alice\"\nif [ \"$name\" = \"Alice\" ]; then\n    echo \"Hello, Alice!\"\nelse\n    echo \"Hello, stranger!\"\nfi\n\n# File existence check\nif [ -f \"test.txt\" ]; then\n    echo \"test.txt exists\"\nelse\n    echo \"test.txt does not exist\"\nfi",
      "expectedTime": 10,
      "concepts": [
        "for loops",
        "while loops",
        "if-else",
        "comparisons",
        "arrays"
      ]
    },
    {
      "id": "bash-intermediate-1",
      "title": "Functions and Parameters",
      "description": "Create reusable functions and handle command-line parameters",
      "difficulty": "intermediate",
      "code": "#!/bin/bash\n\n# Function definition\ngreet() {\n    local name=$1\n    local time_of_day=$2\n    echo \"Good $time_of_day, $name!\"\n}\n\n# Function with return value\ncalculate_sum() {\n    local num1=$1\n    local num2=$2\n    local sum=$((num1 + num2))\n    echo $sum\n}\n\n# Function with multiple parameters\ncreate_user_info() {\n    local username=$1\n    local email=$2\n    local department=$3\n    \n    echo \"=== User Information ===\"\n    echo \"Username: $username\"\n    echo \"Email: $email\"\n    echo \"Department: $department\"\n    echo \"Created: $(date)\"\n}\n\n# Function that checks if a number is even\nis_even() {\n    local num=$1\n    if [ $((num % 2)) -eq 0 ]; then\n        return 0  # true\n    else\n        return 1  # false\n    fi\n}\n\n# Main script\necho \"=== Function Examples ===\"\n\n# Call functions\ngreet \"Alice\" \"morning\"\ngreet \"Bob\" \"evening\"\n\n# Use function return value\nresult=$(calculate_sum 15 25)\necho \"Sum of 15 and 25: $result\"\n\n# Create user info\ncreate_user_info \"john_doe\" \"john@company.com\" \"Engineering\"\n\n# Check if number is even\nnumber=8\nif is_even $number; then\n    echo \"$number is even\"\nelse\n    echo \"$number is odd\"\nfi\n\n# Command line parameters\necho \"=== Command Line Parameters ===\"\necho \"Script name: $0\"\necho \"Number of arguments: $#\"\necho \"All arguments: $@\"\n\nif [ $# -gt 0 ]; then\n    echo \"First argument: $1\"\n    echo \"Second argument: $2\"\nfi",
      "expectedTime": 12,
      "concepts": [
        "functions",
        "parameters",
        "return values",
        "local variables",
        "command line args"
      ]
    },
    {
      "id": "bash-intermediate-2",
      "title": "File Operations and Text Processing",
      "description": "Advanced file operations and text manipulation",
      "difficulty": "intermediate",
      "code": "#!/bin/bash\n\n# Create sample files for demonstration\necho \"Creating sample files...\"\necho -e \"apple\\nbanana\\norange\\ngrape\\nkiwi\" > fruits.txt\necho -e \"John,25,Engineer\\nJane,30,Designer\\nBob,28,Manager\" > employees.csv\n\n# File reading and processing\necho \"=== File Operations ===\"\n\n# Read file line by line\necho \"Fruits from file:\"\nwhile IFS= read -r line; do\n    echo \"  - $line\"\ndone < fruits.txt\n\n# Count lines in file\nline_count=$(wc -l < fruits.txt)\necho \"Number of fruits: $line_count\"\n\n# Search and replace in file\necho \"=== Text Processing ===\"\necho \"Original fruits:\"\ncat fruits.txt\n\n# Add prefix to each line\nsed 's/^/Fruit: /' fruits.txt > fruits_with_prefix.txt\necho \"Fruits with prefix:\"\ncat fruits_with_prefix.txt\n\n# Extract specific columns from CSV\necho \"=== CSV Processing ===\"\necho \"Employee names:\"\ncut -d',' -f1 employees.csv\n\necho \"Employee ages:\"\ncut -d',' -f2 employees.csv\n\n# Filter lines containing specific text\necho \"Fruits containing 'a':\"\ngrep 'a' fruits.txt\n\n# Sort and unique\necho \"Sorted unique fruits:\"\nsort fruits.txt | uniq\n\n# File permissions and ownership\necho \"=== File Management ===\"\necho \"Setting file permissions...\"\nchmod 644 fruits.txt\nchmod 755 employees.csv\n\necho \"File permissions:\"\nls -l fruits.txt employees.csv\n\n# Create directory and move files\nmkdir -p backup\ncp fruits.txt backup/\ncp employees.csv backup/\necho \"Files backed up to backup/ directory\"\n\n# Cleanup\nrm fruits.txt employees.csv fruits_with_prefix.txt\nrm -rf backup\necho \"Cleanup completed\"",
      "expectedTime": 12,
      "concepts": [
        "file reading",
        "text processing",
        "sed",
        "grep",
        "cut",
        "file permissions"
      ]
    },
    {
      "id": "bash-advanced-1",
      "title": "Advanced Scripting and Error Handling",
      "description": "Advanced bash features including error handling and process management",
      "difficulty": "advanced",
      "code": "#!/bin/bash\n\n# Error handling\nset -e  # Exit on any error\nset -u  # Exit on undefined variables\nset -o pipefail  # Exit on pipe failures\n\n# Custom error handling function\nhandle_error() {\n    echo \"Error occurred in line $1\"\n    echo \"Error code: $2\"\n    exit 1\n}\n\n# Set error trap\ntrap 'handle_error $LINENO $?' ERR\n\n# Logging function\nlog() {\n    echo \"[$(date '+%Y-%m-%d %H:%M:%S')] $1\" | tee -a script.log\n}\n\n# Function to check if command exists\ncommand_exists() {\n    command -v \"$1\" >/dev/null 2>&1\n}\n\n# Function to backup files with error handling\nbackup_files() {\n    local source_dir=$1\n    local backup_dir=$2\n    \n    if [ ! -d \"$source_dir\" ]; then\n        log \"ERROR: Source directory $source_dir does not exist\"\n        return 1\n    fi\n    \n    # Create backup directory if it doesn't exist\n    mkdir -p \"$backup_dir\"\n    \n    # Create timestamped backup\n    local timestamp=$(date +%Y%m%d_%H%M%S)\n    local backup_path=\"$backup_dir/backup_$timestamp\"\n    \n    log \"Starting backup from $source_dir to $backup_path\"\n    \n    if cp -r \"$source_dir\" \"$backup_path\"; then\n        log \"Backup completed successfully: $backup_path\"\n        return 0\n    else\n        log \"ERROR: Backup failed\"\n        return 1\n    fi\n}\n\n# Function to monitor system resources\nmonitor_system() {\n    log \"=== System Monitoring ===\"\n    \n    # Check disk usage\n    log \"Disk usage:\"\n    df -h | grep -E '^/dev/' | while read line; do\n        log \"  $line\"\n    done\n    \n    # Check memory usage\n    log \"Memory usage:\"\n    free -h | while read line; do\n        log \"  $line\"\n    done\n    \n    # Check running processes\n    log \"Top 5 processes by CPU usage:\"\n    ps aux --sort=-%cpu | head -6 | while read line; do\n        log \"  $line\"\n    done\n}\n\n# Function to send email notification (simulated)\nsend_notification() {\n    local message=$1\n    local recipient=${2:-\"admin@company.com\"}\n    \n    log \"Sending notification to $recipient: $message\"\n    # In real scenario, you would use mail command or curl to send email\n    echo \"Email notification: $message\" >> notifications.log\n}\n\n# Main execution\nmain() {\n    log \"Script started\"\n    \n    # Check required commands\n    if ! command_exists \"ps\"; then\n        log \"ERROR: ps command not found\"\n        exit 1\n    fi\n    \n    # Monitor system\n    monitor_system\n    \n    # Create test directory and files\n    test_dir=\"/tmp/bash_test_$$\"\n    mkdir -p \"$test_dir\"\n    echo \"Test file 1\" > \"$test_dir/file1.txt\"\n    echo \"Test file 2\" > \"$test_dir/file2.txt\"\n    \n    # Backup test directory\n    if backup_files \"$test_dir\" \"/tmp/backups\"; then\n        send_notification \"Backup completed successfully\"\n    else\n        send_notification \"Backup failed\" \"admin@company.com\"\n    fi\n    \n    # Cleanup\n    rm -rf \"$test_dir\"\n    log \"Script completed successfully\"\n}\n\n# Run main function\nmain \"$@\"",
      "expectedTime": 15,
      "concepts": [
        "error handling",
        "logging",
        "process monitoring",
        "system commands",
        "traps"
      ]
    }
  ]
}
