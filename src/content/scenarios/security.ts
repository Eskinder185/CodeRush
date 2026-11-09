import type { Scenario } from '../types'

/**
 * Defensive security scenarios. Logs and connections are synthetic, addresses are from
 * documentation ranges, and no step attacks or scans a third-party system.
 */
export const securityScenarios: Scenario[] = [
  {
    id: 'sc.sec.suspicious-event',
    title: 'Identify the suspicious event',
    track: 'security',
    platform: 'linux',
    difficulty: 'beginner',
    summary: 'Pick the log line that deserves investigation.',
    context: 'You are reviewing a synthetic authentication log from web01 during a routine check.',
    steps: [
      {
        kind: 'choice',
        prompt: 'Which entry deserves investigation first?',
        output: `Mar  3 08:58:02 web01 sshd[1720]: Accepted publickey for student from 198.51.100.40 port 50110 ssh2
Mar  3 09:01:13 web01 sudo:  student : TTY=pts/0 ; PWD=/home/student ; USER=root ; COMMAND=/usr/bin/apt update
Mar  3 03:12:44 web01 sshd[1601]: Accepted password for backup from 203.0.113.77 port 40210 ssh2
Mar  3 09:05:40 web01 CRON[1802]: pam_unix(cron:session): session opened for user root(uid=0)`,
        choices: [
          { label: 'The 03:12 password login for "backup" from 203.0.113.77', correct: true, why: 'A service account logging in interactively with a password, at night, from an external address, is unusual on several counts.' },
          { label: 'The publickey login for student at 08:58', correct: false, why: 'A normal working-hours login with a key from a known address.' },
          { label: 'student running apt update with sudo', correct: false, why: 'Routine administration by an authorized user.' },
          { label: 'The cron session for root', correct: false, why: 'Scheduled jobs run as root routinely.' },
        ],
        explanation: 'Context matters: who logged in, how, when, and from where.',
      },
      {
        kind: 'command',
        prompt: 'Review the 10 most recent login sessions to see what else backup did.',
        commandIds: ['linux.last'],
        hint: 'last with -n 10.',
        explanation: 'last shows session duration, which helps scope what happened.',
      },
    ],
    wrapUp: {
      meaning: 'The backup account, which normally uses scheduled jobs, logged in interactively from an external address at 03:12.',
      nextStep: 'Escalate. Check whether backup should allow password logins at all, and review what the session did with journalctl and the shell history of that account.',
    },
  },
  {
    id: 'sc.sec.auth-anomaly',
    title: 'Recognize an authentication anomaly',
    track: 'security',
    platform: 'linux',
    difficulty: 'intermediate',
    summary: 'Distinguish a pattern of failed logins from ordinary mistakes.',
    context: 'An alert fired for "multiple failed SSH logins" on web01.',
    steps: [
      {
        kind: 'command',
        prompt: 'Find every failed password line in /var/log/auth.log.',
        commandIds: ['linux.grep-auth'],
        hint: 'grep for "Failed password" in /var/log/auth.log.',
        explanation: 'grep pulls the relevant lines out of a busy log.',
      },
      {
        kind: 'choice',
        prompt: 'Synthetic results show 412 failures from 203.0.113.77 for accounts root, admin, oracle, test, and ubuntu within 10 minutes, plus 2 failures for student from 198.51.100.40. Which statement is most accurate?',
        choices: [
          { label: 'The 203.0.113.77 activity looks like automated password guessing. The two student failures are probably typos.', correct: true, why: 'Hundreds of attempts against many common account names in minutes is a guessing pattern. Two failures from a known address are ordinary.' },
          { label: 'Any failed login proves an attack', correct: false, why: 'People mistype passwords constantly. A single failure proves nothing.' },
          { label: 'Nothing to worry about, because none succeeded', correct: false, why: 'You have not checked for successes yet, and the guessing still signals exposure.' },
        ],
        explanation: 'Look at volume, spread across accounts, timing, and source. A pattern, not a single event, indicates a problem.',
      },
      {
        kind: 'command',
        prompt: 'Check today\'s SSH journal for any accepted login from the same source.',
        commandIds: ['linux.journalctl-unit'],
        hint: 'journalctl -u ssh --since today.',
        explanation: 'If any "Accepted" line shows 203.0.113.77, the situation becomes an incident.',
      },
    ],
    wrapUp: {
      meaning: 'An external address made hundreds of guesses. No accepted login from it appears in the synthetic journal.',
      nextStep: 'Recommend key-only SSH authentication, rate limiting such as fail2ban, and restricting SSH to known networks with the firewall.',
    },
  },
  {
    id: 'sc.sec.unexpected-connection',
    title: 'Investigate an unexpected connection',
    track: 'security',
    platform: 'linux',
    difficulty: 'intermediate',
    summary: 'Tie a network connection to a process and gather evidence.',
    context: 'Network monitoring shows web01 holding a connection to 203.0.113.77 on port 4444.',
    steps: [
      {
        kind: 'command',
        prompt: 'With sudo, list active TCP and UDP connections and the processes that own them.',
        commandIds: ['linux.ss-tupn'],
        hint: 'ss with -t -u -p -n, run with sudo.',
        explanation: 'The Process column links the connection to python3, PID 3310.',
      },
      {
        kind: 'command',
        prompt: 'Show the PID and full command line of every python3 process.',
        accepted: ['pgrep -a python3', 'pgrep -af python3'],
        hint: 'pgrep with -a, then the process name.',
        output: '3310 python3 /tmp/.cache/x.py 203.0.113.77 4444',
        explanation: 'pgrep -a shows full command lines, which explain what a process is running.',
      },
      {
        kind: 'choice',
        prompt: 'The script lives in a hidden /tmp folder and connects to 203.0.113.77 on port 4444. What should you do?',
        choices: [
          { label: 'Record the evidence and escalate before changing anything', correct: true, why: 'A script in a hidden /tmp folder connecting out to a high port is suspicious. Evidence first, then containment by the response team.' },
          { label: 'Delete /tmp/.cache/x.py immediately', correct: false, why: 'Deleting it destroys evidence and may not stop the process.' },
          { label: 'Scan 203.0.113.77 to see what it is', correct: false, why: 'Scanning systems you do not own is not appropriate. Use threat intelligence lookups instead.' },
        ],
        explanation: 'Defensive work collects evidence carefully and stays within authorization.',
      },
    ],
    wrapUp: {
      meaning: 'A Python script in a hidden temporary folder is holding an outbound connection to 203.0.113.77:4444.',
      nextStep: 'Hash the script with sha256sum, record the process details, and hand everything to the incident response team.',
    },
  },
  {
    id: 'sc.sec.firewall-review',
    title: 'Analyze firewall status',
    track: 'security',
    platform: 'linux',
    difficulty: 'intermediate',
    summary: 'Read firewall output and explain what is allowed.',
    context: 'An auditor asks what web01 allows inbound.',
    steps: [
      {
        kind: 'command',
        prompt: 'Show the UFW firewall state, default policies, and rules.',
        commandIds: ['linux.ufw-status'],
        hint: 'ufw status verbose, with sudo.',
        explanation: 'verbose includes the default policies, which matter as much as the rules.',
      },
      {
        kind: 'choice',
        prompt: 'Based on the output, who can reach SSH on port 22?',
        output: `Status: active
Default: deny (incoming), allow (outgoing), disabled (routed)

To                         Action      From
--                         ------      ----
22/tcp                     ALLOW IN    198.51.100.0/24
80,443/tcp                 ALLOW IN    Anywhere`,
        choices: [
          { label: 'Only hosts in 198.51.100.0/24', correct: true, why: 'The only rule for 22 allows that network. Everything else hits the default deny.' },
          { label: 'Anyone', correct: false, why: 'Anywhere applies only to 80 and 443.' },
          { label: 'Nobody, because the default is deny', correct: false, why: 'Explicit allow rules override the default for matching traffic.' },
        ],
        explanation: 'Read rules together with the default policy.',
      },
      {
        kind: 'command',
        prompt: 'Compare with what is actually listening: list listening TCP and UDP ports.',
        commandIds: ['linux.ss-tuln'],
        hint: 'ss -tuln.',
        explanation: 'A port that listens but is not allowed is protected by the firewall. A port that is allowed but not listening is harmless but untidy.',
      },
    ],
    wrapUp: {
      meaning: 'Inbound access is limited to SSH from 198.51.100.0/24 and web traffic from anywhere.',
      nextStep: 'Document this as the approved baseline, and review it whenever services change.',
    },
  },
  {
    id: 'sc.sec.file-integrity',
    title: 'Verify file integrity',
    track: 'security',
    platform: 'linux',
    difficulty: 'beginner',
    summary: 'Use hash comparison to detect a changed file.',
    context: 'You recorded hashes of key configuration files last week in SHA256SUMS. A change is suspected.',
    steps: [
      {
        kind: 'command',
        prompt: 'Compute the SHA-256 hash of sample.txt to see what a hash looks like.',
        commandIds: ['linux.sha256sum'],
        hint: 'sha256sum followed by the file name.',
        explanation: 'Any change to the file, even one character, gives a completely different hash.',
      },
      {
        kind: 'command',
        prompt: 'Verify every file listed in SHA256SUMS against its recorded hash.',
        commandIds: ['linux.sha256sum-c'],
        hint: 'sha256sum with the check flag.',
        explanation: 'Check mode reports OK or FAILED for each file.',
      },
      {
        kind: 'choice',
        prompt: 'config/app.conf reports FAILED. What does that tell you?',
        choices: [
          { label: 'Its contents changed since the hashes were recorded. It does not say who changed it or why.', correct: true, why: 'A hash proves change, not intent. Check change records and file timestamps next.' },
          { label: 'The server was hacked', correct: false, why: 'Legitimate changes also alter hashes.' },
          { label: 'The hash tool is broken', correct: false, why: 'The other file verified OK.' },
        ],
        explanation: 'Integrity checks are evidence of change. Investigation explains it.',
      },
    ],
    wrapUp: {
      meaning: 'config/app.conf changed after the baseline was taken.',
      nextStep: 'Run stat on the file for timestamps, compare it with the backup using diff -u, and check change tickets.',
    },
  },
  {
    id: 'sc.sec.windows-failed-logons',
    title: 'Lockouts on a workstation',
    track: 'security',
    platform: 'powershell',
    difficulty: 'advanced',
    summary: 'Query Security log events for failed sign-ins.',
    context: 'Help desk reports the account jsmith keeps getting locked out on WS-LAB-07.',
    steps: [
      {
        kind: 'command',
        prompt: 'Get the 10 newest failed logon events from the Security log.',
        commandIds: ['ps.get-winevent-4625'],
        hint: 'Get-WinEvent -FilterHashtable with LogName Security and Id 4625.',
        explanation: 'Event 4625 records each failed logon with the account and source.',
      },
      {
        kind: 'choice',
        prompt: 'The events show jsmith failing every 30 minutes from logon type 3 (network) with source process "OUTLOOK.EXE" on a laptop the user stopped using. What is the most likely cause?',
        choices: [
          { label: 'An old device with a saved password keeps retrying after a password change', correct: true, why: 'Regular intervals from one old client after a password change is the classic stale credential pattern.' },
          { label: 'A targeted attack against jsmith', correct: false, why: 'Attacks rarely come from the user\'s own old laptop on a precise schedule.' },
          { label: 'The domain controller is failing', correct: false, why: 'Other users are unaffected.' },
        ],
        explanation: 'Failed logons are evidence. Their pattern points to the explanation.',
      },
    ],
    wrapUp: {
      meaning: 'Stale saved credentials on an old laptop are locking out jsmith.',
      nextStep: 'Have the user update or remove the account on the old device, then confirm no new 4625 events appear.',
    },
  },
]
