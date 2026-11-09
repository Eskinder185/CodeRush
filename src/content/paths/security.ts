import type { LearningPath, LearningModule } from '../types'
import { q } from './helpers'

type M = Omit<LearningModule, 'scenarioIds' | 'commandIds'> & { scenarioIds?: string[]; commandIds?: string[] }
const m = (x: M): LearningModule => ({ scenarioIds: [], commandIds: [], ...x })

export const securityPath: LearningPath = {
  id: 'cybersecurity',
  title: 'Defensive Cybersecurity',
  tagline: 'Monitor, investigate, and harden, ethically.',
  description: 'An ethical, defensive path covering security principles, logs, endpoint and network monitoring, integrity, triage, and hardening. Every exercise uses synthetic data and reserved addresses. Nothing attacks or scans a real system.',
  difficulty: 'mixed',
  estimatedHours: 12,
  objectives: [
    'Explain core principles: CIA, authentication, authorization, and least privilege.',
    'Read Windows and Linux security logs and recognize meaningful patterns.',
    'Collect triage evidence safely and hand it off correctly.',
    'Apply basic hardening checks on Windows and Linux.',
  ],
  prerequisites: ['Linux Command Line or Windows PowerShell beginner modules.'],
  accent: 'rose',
  icon: 'shield',
  completion: 'Score at least 50% on each quiz and complete every linked scenario.',
  modules: [
    m({
      id: 'sec.foundations', title: 'Cybersecurity foundations', level: 'beginner',
      outcome: 'Explain what defenders protect, from whom, and how risk is reasoned about.',
      summary: 'Assets, threats, vulnerabilities, and risk.',
      concept: [
        'Security protects assets such as data, systems, and accounts. A threat is something that could cause harm. A vulnerability is a weakness it could use. Risk combines how likely harm is with how bad it would be.',
        'Defenders reduce risk with layers: prevention, detection, and response. No single control is perfect.',
      ],
      quiz: [
        q('sf-1', 'An unpatched web server is best described as a:', ['Threat', 'Vulnerability', 'Asset', 'Control'], 1, 'It is a weakness that a threat could exploit.'),
        q('sf-2', 'What does defense in depth mean?', ['One very strong firewall', 'Multiple layers of controls so one failure is not fatal', 'Encrypting everything twice', 'Hiding systems'], 1, 'Layers compensate for each other.'),
      ],
    }),
    m({
      id: 'sec.cia', title: 'The CIA triad', level: 'beginner',
      outcome: 'Classify incidents and controls by confidentiality, integrity, and availability.',
      summary: 'Confidentiality, Integrity, Availability.',
      concept: [
        'Confidentiality keeps data from unauthorized people. Integrity keeps data accurate and unaltered. Availability keeps systems usable when needed.',
        'Controls map to these goals: encryption for confidentiality, hashes and signatures for integrity, backups and redundancy for availability.',
      ],
      quiz: [
        q('scia-1', 'Ransomware encrypting a file server mainly attacks:', ['Confidentiality', 'Integrity', 'Availability', 'None'], 2, 'The data becomes unusable. Many variants also steal data, which affects confidentiality too.'),
        q('scia-2', 'Comparing SHA-256 hashes protects which goal?', ['Confidentiality', 'Integrity', 'Availability', 'Authentication'], 1, 'Hashes detect changes.'),
      ],
    }),
    m({
      id: 'sec.authn-authz', title: 'Authentication and authorization', level: 'beginner',
      outcome: 'Tell proving identity apart from granting permission.',
      summary: 'Who you are versus what you may do.',
      concept: [
        'Authentication proves who you are: a password, a key, or a second factor. Authorization decides what that identity may do: groups, permissions, and sudo rules.',
        'Multi-factor authentication combines something you know, have, or are, so one stolen password is not enough.',
      ],
      commandIds: ['linux.id', 'linux.sudo-l'],
      quiz: [
        q('saa-1', 'Checking group membership before allowing a file write is:', ['Authentication', 'Authorization', 'Accounting', 'Encryption'], 1, 'It decides permission.'),
        q('saa-2', 'Which is a second factor?', ['A longer password', 'A code from an authenticator app', 'A security question', 'A username'], 1, 'Something you have.'),
      ],
    }),
    m({
      id: 'sec.least-privilege', title: 'Least privilege', level: 'beginner',
      outcome: 'Find excess privilege and recommend narrower access.',
      summary: 'Only the access needed, only while needed.',
      concept: [
        'Least privilege limits damage when an account is misused. Daily work uses standard accounts. Administrator rights are separate and used only when required.',
        'Regular reviews remove access that is no longer needed, such as old vendor accounts.',
      ],
      commandIds: ['ps.get-localgroupmember', 'linux.getent-group'],
      quiz: [
        q('slp-1', 'Which follows least privilege?', ['Everyone is a local admin for convenience', 'Admins use a separate privileged account only for admin tasks', 'Shared root password', 'chmod 777'], 1, 'Separate, limited use of privilege.'),
      ],
      scenarioIds: ['sc.ps.who-is-admin', 'sc.linux.permission-denied'],
    }),
    m({
      id: 'sec.logs', title: 'Security logs', level: 'beginner',
      outcome: 'Know which logs record security events on Windows and Linux.',
      summary: 'Event logs, the journal, and auth logs.',
      concept: [
        'Windows records sign-ins and policy changes in the Security log. Linux records authentication in the journal and, on Debian and Ubuntu with rsyslog, /var/log/auth.log.',
        'Logs are evidence. Protect them from tampering, keep them long enough, and synchronize clocks so timelines line up.',
      ],
      commandIds: ['linux.journalctl-unit', 'ps.get-winevent-system'],
      quiz: [
        q('slog-1', 'Why does accurate time matter for logs?', ['Smaller files', 'Events from different systems must line up in a timeline', 'Faster searches', 'It does not'], 1, 'Investigations correlate many sources.'),
      ],
    }),
    m({
      id: 'sec.threats', title: 'Common network threats', level: 'beginner',
      outcome: 'Recognize common threat types and the evidence each tends to leave.',
      summary: 'Phishing, password guessing, malware, and denial of service.',
      concept: [
        'Common threats include phishing that steals credentials, password guessing against exposed services, malware that runs on endpoints, and denial-of-service that exhausts resources.',
        'Each leaves different traces: unusual sign-ins, bursts of failed logons, unknown processes with outbound connections, or traffic spikes.',
      ],
      quiz: [
        q('sth-1', 'Hundreds of failed SSH logins for many usernames from one address suggest:', ['Phishing', 'Password guessing', 'Ransomware', 'A DNS outage'], 1, 'Automated guessing is the usual cause.'),
        q('sth-2', 'Which evidence suggests malware on an endpoint?', ['A Windows update', 'An unknown process in a Temp folder with an outbound connection', 'A slow website', 'A full Recycle Bin'], 1, 'Odd location plus unexpected network activity.'),
      ],
    }),
    m({
      id: 'sec.firewalls', title: 'Firewalls', level: 'intermediate',
      outcome: 'Read host firewall configuration and judge exposure.',
      summary: 'Default policies, allow rules, and profiles.',
      concept: [
        'A good baseline denies inbound traffic by default and allows only what each system must offer, from the narrowest sources possible.',
        'Compare firewall rules with what actually listens. Both views together describe the real exposure.',
      ],
      commandIds: ['linux.ufw-status', 'ps.get-netfirewallrule', 'ps.get-netfirewallprofile'],
      quiz: [
        q('sfw-1', 'Which is the strongest inbound baseline?', ['Allow all, deny known bad', 'Deny by default, allow specific needs', 'No firewall on servers', 'Allow all from inside'], 1, 'Default deny limits exposure.'),
      ],
      scenarioIds: ['sc.sec.firewall-review'],
    }),
    m({
      id: 'sec.dns', title: 'DNS security', level: 'intermediate',
      outcome: 'Explain how DNS can be abused and what defenders watch for.',
      summary: 'Spoofing, tunneling, and resolver hygiene.',
      concept: [
        'Attackers abuse DNS by redirecting names to malicious servers, registering look-alike domains, or hiding data inside DNS queries. DNSSEC signs records so resolvers can detect tampering.',
        'Defenders watch for unusual query volume, very long or random-looking names, and clients using resolvers other than the approved ones.',
      ],
      commandIds: ['linux.dig'],
      quiz: [
        q('sdns-1', 'What does DNSSEC provide?', ['Encryption of queries', 'Signed records so tampering can be detected', 'Faster lookups', 'Ad blocking'], 1, 'Integrity, not confidentiality.'),
        q('sdns-2', 'Which pattern deserves attention?', ['Queries for example.com', 'Thousands of long random subdomains of one domain', 'A cached A record', 'A TTL of 3600'], 1, 'That pattern can indicate DNS tunneling.'),
      ],
    }),
    m({
      id: 'sec.endpoint', title: 'Endpoint monitoring', level: 'intermediate',
      outcome: 'Check antivirus health and inspect processes on an endpoint.',
      summary: 'Defender status and process context.',
      concept: [
        'Endpoint monitoring watches processes, files, and connections on each device. Healthy protection means real-time scanning is on and signatures are current.',
        'A process is judged in context: its path, parent, command line, signer, and network activity.',
      ],
      commandIds: ['ps.get-mpcomputerstatus', 'ps.get-process-id', 'ps.cim-process'],
      quiz: [
        q('sep-1', 'Which detail most helps judge a process?', ['Its PID', 'Its path, parent, and command line', 'Its memory use alone', 'Its window title'], 1, 'Context explains behavior.'),
      ],
    }),
    m({
      id: 'sec.integrity', title: 'File integrity', level: 'beginner',
      outcome: 'Use hashes to detect changes and identify files safely.',
      summary: 'Baselines and hash comparison.',
      concept: [
        'Record hashes of important files when they are known to be good. Later, re-hash and compare. A mismatch proves change.',
        'Hashes also identify suspicious files without running them, so analysts can check them against threat intelligence.',
      ],
      commandIds: ['linux.sha256sum', 'linux.sha256sum-c', 'ps.get-filehash'],
      quiz: [
        q('sint-1', 'Why hash a suspicious executable?', ['To run it faster', 'To identify it without executing it', 'To delete it', 'To encrypt it'], 1, 'The hash can be looked up safely.'),
      ],
      scenarioIds: ['sc.sec.file-integrity'],
    }),
    m({
      id: 'sec.winevents', title: 'Windows event logs', level: 'intermediate',
      outcome: 'Query and interpret key Windows security events.',
      summary: '4624, 4625, 4740, 4672, and service events.',
      concept: [
        'Key IDs: 4624 successful logon, 4625 failed logon, 4740 account locked out, 4672 special privileges assigned at logon, 7045 new service installed.',
        'The logon type matters: 2 is interactive, 3 is network, 10 is Remote Desktop.',
      ],
      commandIds: ['ps.get-winevent-4625', 'ps.get-winevent-level'],
      quiz: [
        q('swe-1', 'Which ID records an account lockout?', ['4624', '4625', '4740', '7036'], 2, '4740.'),
        q('swe-2', 'Logon type 10 means:', ['Service', 'Network', 'Remote Desktop', 'Batch'], 2, 'RemoteInteractive, RDP.'),
      ],
      scenarioIds: ['sc.sec.windows-failed-logons'],
    }),
    m({
      id: 'sec.linuxauth', title: 'Linux authentication logs', level: 'intermediate',
      outcome: 'Review SSH and sudo activity on Linux.',
      summary: 'auth.log, the journal, last, and lastlog.',
      concept: [
        'sshd logs "Accepted" and "Failed" lines with the method, account, and source address. sudo logs every elevated command.',
        'A single failure is normal. A pattern across many accounts or at odd hours is worth escalating.',
      ],
      commandIds: ['linux.grep-auth', 'linux.last', 'linux.lastlog'],
      quiz: [
        q('sla-1', 'Does one failed login prove an attack?', ['Yes', 'No, people mistype passwords', 'Only for root', 'Only at night'], 1, 'Look for patterns.'),
      ],
      scenarioIds: ['sc.sec.auth-anomaly', 'sc.sec.suspicious-event'],
    }),
    m({
      id: 'sec.incidents', title: 'Security incident fundamentals', level: 'intermediate',
      outcome: 'Describe the incident response lifecycle and your role in it.',
      summary: 'Preparation, detection, containment, eradication, recovery, lessons learned.',
      concept: [
        'Incident response follows a lifecycle: prepare, detect and analyze, contain, eradicate, recover, and learn. Following an agreed plan prevents well-meant actions from making things worse.',
        'Escalate early with clear evidence. It is better to report something harmless than to sit on something real.',
      ],
      quiz: [
        q('sinc-1', 'What usually comes right after detection and analysis?', ['Eradication', 'Containment', 'Lessons learned', 'Preparation'], 1, 'Contain to limit damage first.'),
        q('sinc-2', 'You find something suspicious but are unsure. What should you do?', ['Wait a week', 'Escalate with your evidence', 'Delete it', 'Tell no one'], 1, 'Early escalation is encouraged.'),
      ],
    }),
    m({
      id: 'sec.triage', title: 'Basic incident triage', level: 'intermediate',
      outcome: 'Collect the first facts about a suspicious process or connection.',
      summary: 'Who, what, where, when, and talking to whom.',
      concept: [
        'Triage answers quick questions: which process, where it runs from, who started it, when, and what it connects to. Read-only commands answer all of them.',
        'Volatile evidence, such as connections and memory, disappears first, so capture it before files.',
      ],
      commandIds: ['linux.ss-tupn', 'ps.cim-process', 'ps.get-nettcpconnection-established'],
      quiz: [
        q('stri-1', 'Which evidence disappears fastest?', ['Disk files', 'Active network connections', 'Backups', 'Event logs'], 1, 'Connections and processes are volatile.'),
      ],
      scenarioIds: ['sc.sec.unexpected-connection', 'sc.ps.suspicious-process'],
    }),
    m({
      id: 'sec.netdiag', title: 'Network security diagnostics', level: 'intermediate',
      outcome: 'Inspect listening services, connections, and traffic for security reviews.',
      summary: 'Ports, connections, and authorized capture.',
      concept: [
        'Listening ports are the doors into a system. Established connections show who is talking now. Packet capture shows what is said.',
        'Only capture traffic you are authorized to monitor, and treat captures as sensitive data.',
      ],
      commandIds: ['linux.ss-tuln', 'ps.get-nettcpconnection-listen', 'linux.tcpdump'],
      quiz: [
        q('snd-1', 'Before running tcpdump on a network you need:', ['A fast laptop', 'Authorization to monitor it', 'Root on the router', 'Nothing'], 1, 'Monitoring without authorization is not acceptable.'),
      ],
      scenarioIds: ['sc.net.which-process-port'],
    }),
    m({
      id: 'sec.habits', title: 'Secure administration habits', level: 'beginner',
      outcome: 'Adopt habits that prevent mistakes and limit damage.',
      summary: 'Preview changes, use least privilege, and protect credentials.',
      concept: [
        'Preview destructive commands with -WhatIf or rm -i. Read paths twice before recursive operations. Use elevated rights only for the command that needs them.',
        'Never paste secrets into tickets or chat, and remove passwords before sharing configuration output.',
      ],
      commandIds: ['ps.remove-item-whatif', 'linux.rm-i', 'linux.sudo-l'],
      quiz: [
        q('shab-1', 'Before sharing show running-config output, you should:', ['Nothing', 'Remove passwords, keys, and community strings', 'Compress it', 'Convert it to PDF'], 1, 'Configurations often contain secrets.'),
      ],
    }),
    m({
      id: 'sec.evidence', title: 'Evidence handling concepts', level: 'intermediate',
      outcome: 'Preserve evidence so it stays trustworthy.',
      summary: 'Chain of custody, hashing, and minimal change.',
      concept: [
        'Evidence must be collected so others can trust it: record who collected what, when, and how. Hash collected files so later copies can be verified.',
        'Make as few changes as possible to the affected system. Every action you take can alter timestamps and logs.',
      ],
      quiz: [
        q('sev-1', 'Why hash collected evidence files?', ['To compress them', 'To prove later copies are unchanged', 'To hide them', 'It is not needed'], 1, 'Hashes support integrity.'),
        q('sev-2', 'What does chain of custody record?', ['Who handled evidence and when', 'File sizes', 'Network speed', 'Passwords'], 0, 'It documents every hand-off.'),
      ],
    }),
    m({
      id: 'sec.detection', title: 'Threat detection fundamentals', level: 'intermediate',
      outcome: 'Turn raw events into meaningful detections.',
      summary: 'Baselines, anomalies, and context.',
      concept: [
        'Detection compares activity with what is normal. A service account logging in interactively, or a login at 3 AM from a new country, stands out only if you know the baseline.',
        'Good detections combine several weak signals, which reduces false alarms.',
      ],
      quiz: [
        q('sdet-1', 'Why combine several signals in a detection?', ['To create more alerts', 'To reduce false positives', 'It is required by law', 'To slow attackers'], 1, 'Single signals are noisy.'),
      ],
      scenarioIds: ['sc.sec.suspicious-event'],
    }),
    m({
      id: 'sec.hardening', title: 'Security hardening concepts', level: 'intermediate',
      outcome: 'Run basic hardening checks and recommend improvements.',
      summary: 'Reduce attack surface on Windows and Linux.',
      concept: [
        'Hardening reduces the attack surface: remove unused software and accounts, close unneeded ports, patch promptly, and restrict permissions.',
        'Review autostart locations, world-writable files, and administrative group membership regularly.',
      ],
      commandIds: ['linux.find-perm', 'ps.get-executionpolicy', 'ps.run-keys', 'linux.apt-upgradable'],
      quiz: [
        q('shar-1', 'Which is a hardening step?', ['Enable every service', 'Remove unused accounts and software', 'Disable logging', 'Share admin passwords'], 1, 'Less software means less to attack.'),
      ],
      scenarioIds: ['sc.ps.persistence'],
    }),
  ],
}
