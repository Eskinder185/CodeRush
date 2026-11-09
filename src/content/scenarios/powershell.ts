import type { Scenario } from '../types'

/** PowerShell troubleshooting and triage scenarios. Simulated data only. */
export const powershellScenarios: Scenario[] = [
  {
    id: 'sc.ps.port-test',
    title: 'Identify a network connection problem',
    track: 'powershell',
    platform: 'powershell',
    difficulty: 'beginner',
    summary: 'Test whether an internal application port is reachable.',
    context: 'A user reports that their workstation cannot reach the internal application at app.lab.example on HTTPS. Other sites work.',
    steps: [
      {
        kind: 'command',
        prompt: 'Test whether example.com accepts TCP connections on port 443, to confirm general HTTPS access works.',
        commandIds: ['ps.test-netconnection-port'],
        hint: 'Test-NetConnection, the host, and -Port.',
        explanation: 'Testing a known-good target first tells you whether the workstation can make HTTPS connections at all.',
      },
      {
        kind: 'command',
        prompt: 'Now test app.lab.example on port 443.',
        accepted: ['Test-NetConnection app.lab.example -Port 443', 'Test-NetConnection -ComputerName app.lab.example -Port 443', 'tnc app.lab.example -Port 443'],
        commandIds: [],
        hint: 'Same cmdlet, different host.',
        output: `WARNING: TCP connect to (192.0.2.80 : 443) failed
ComputerName           : app.lab.example
RemoteAddress          : 192.0.2.80
RemotePort             : 443
InterfaceAlias         : Ethernet
SourceAddress          : 192.0.2.57
PingSucceeded          : True
TcpTestSucceeded       : False`,
        explanation: 'The name resolves and ping works, but TCP 443 fails.',
      },
      {
        kind: 'choice',
        prompt: 'What does PingSucceeded True with TcpTestSucceeded False tell you?',
        choices: [
          { label: 'The host is reachable, but nothing accepts connections on 443, or a firewall blocks it', correct: true, why: 'Ping proves routing works. The failure is specific to the port.' },
          { label: 'DNS is broken', correct: false, why: 'RemoteAddress shows the name resolved to 192.0.2.80.' },
          { label: 'The workstation has no network', correct: false, why: 'The example.com test succeeded, so the workstation network is fine.' },
        ],
        explanation: 'Separating reachability, name resolution, and port access narrows the problem quickly.',
      },
    ],
    wrapUp: {
      meaning: 'app.lab.example resolves and answers ping, but TCP 443 is closed or filtered.',
      nextStep: 'Ask the application owner to check that the web service is running and listening on 443, and check firewall rules between the workstation subnet and 192.0.2.80.',
    },
  },
  {
    id: 'sc.ps.suspicious-process',
    title: 'Inspect a suspicious process',
    track: 'powershell',
    platform: 'powershell',
    difficulty: 'intermediate',
    summary: 'Gather safe, read-only evidence about an unknown process.',
    context: 'Simulated EDR alert: "Unusual outbound connection from process ID 4821 on WS-LAB-07." Collect evidence before anyone stops the process.',
    steps: [
      {
        kind: 'command',
        prompt: 'Show the name, ID, path, and start time of process 4821.',
        commandIds: ['ps.get-process-id'],
        hint: 'Get-Process with -Id, piped to Select-Object with four properties.',
        explanation: 'The path and start time are the first facts to record.',
      },
      {
        kind: 'choice',
        prompt: 'What stands out in the result?',
        output: `Name     Id Path                                         StartTime
----     -- ----                                         ---------
updtsvc 4821 C:\\Users\\jsmith\\AppData\\Local\\Temp\\updtsvc.exe 3/3/2026 2:11:44 AM`,
        choices: [
          { label: 'It runs from a user Temp folder and started at 2:11 AM', correct: true, why: 'Legitimate updaters rarely run from Temp, and the start time is outside working hours.' },
          { label: 'The name contains "upd", so it is Windows Update', correct: false, why: 'Names are easy to fake. The Windows Update service runs inside svchost.exe.' },
          { label: 'Nothing; the process ID is normal', correct: false, why: 'Process IDs carry no meaning. The path and timing are what matter.' },
        ],
        explanation: 'Location and timing are strong context. Neither alone proves malice.',
      },
      {
        kind: 'command',
        prompt: 'Compute the SHA-256 hash of the executable so it can be checked against threat intelligence. Use the file C:\\Users\\jsmith\\AppData\\Local\\Temp\\updtsvc.exe.',
        accepted: [
          'Get-FileHash C:\\Users\\jsmith\\AppData\\Local\\Temp\\updtsvc.exe -Algorithm SHA256',
          'Get-FileHash -Path C:\\Users\\jsmith\\AppData\\Local\\Temp\\updtsvc.exe -Algorithm SHA256',
          'Get-FileHash C:\\Users\\jsmith\\AppData\\Local\\Temp\\updtsvc.exe',
        ],
        commandIds: [],
        hint: 'Get-FileHash, the full path, and -Algorithm SHA256.',
        output: `Algorithm       Hash                                                                   Path
---------       ----                                                                   ----
SHA256          4B1E0C9D7A2F6E3B8C5D1A0F9E8D7C6B5A4F3E2D1C0B9A8F7E6D5C4B3A2F1E0D       C:\\Users\\jsmith\\AppData\\Local\\Temp\\updtsvc.exe`,
        explanation: 'A hash identifies the exact file without running it, so analysts can look it up safely.',
      },
      {
        kind: 'command',
        prompt: 'List established TCP connections to see where it is talking.',
        commandIds: ['ps.get-nettcpconnection-established'],
        hint: 'Get-NetTCPConnection filtered by state.',
        explanation: 'The connection list ties the process to a remote address. Here PID 4821 connects to 203.0.113.77 on port 4444.',
      },
    ],
    wrapUp: {
      meaning: 'An executable in a user Temp folder, started at 2:11 AM, holds a connection to 203.0.113.77:4444. That warrants escalation, though it is not yet proof of compromise.',
      nextStep: 'Escalate to the incident response team with the path, hash, start time, and connection details. Follow the response plan for containment instead of deleting files yourself.',
    },
  },
  {
    id: 'sc.ps.dns-diagnose',
    title: 'Diagnose intermittent DNS failures',
    track: 'powershell',
    platform: 'powershell',
    difficulty: 'intermediate',
    summary: 'Inspect DNS configuration and test resolution against each server.',
    context: 'A workstation has intermittent name-resolution failures. Sometimes app.lab.example resolves, sometimes it does not.',
    steps: [
      {
        kind: 'command',
        prompt: 'List the IPv4 DNS servers configured on each interface.',
        commandIds: ['ps.get-dnsclientserveraddress'],
        hint: 'Get-DnsClientServerAddress with an address family filter.',
        explanation: 'Intermittent failures often mean one of several configured servers is bad.',
      },
      {
        kind: 'command',
        prompt: 'Ask the second server, 198.51.100.53, directly for the MX records of example.com to see whether it answers at all.',
        accepted: ['Resolve-DnsName example.com -Type MX -Server 198.51.100.53', 'Resolve-DnsName -Name example.com -Type MX -Server 198.51.100.53', 'Resolve-DnsName example.com -Server 198.51.100.53 -Type MX'],
        commandIds: [],
        hint: 'Resolve-DnsName with -Type and -Server.',
        output: 'Resolve-DnsName : example.com : This operation returned because the timeout period expired',
        explanation: 'The second server does not answer.',
      },
      {
        kind: 'choice',
        prompt: 'Why would resolution work only some of the time?',
        choices: [
          { label: 'The client sometimes tries the unresponsive second server', correct: true, why: 'Windows may switch the preferred server after timeouts. Lookups that hit the dead server fail.' },
          { label: 'app.lab.example changes IP address every few minutes', correct: false, why: 'Nothing indicates that. The failing step was a timeout from one server.' },
          { label: 'The DNS cache is too large', correct: false, why: 'Cache size does not cause timeouts.' },
        ],
        explanation: 'Testing each configured server individually isolates the faulty one.',
      },
    ],
    wrapUp: {
      meaning: 'One of the two configured DNS servers, 198.51.100.53, does not respond.',
      nextStep: 'Report it to the DNS team. Meanwhile, remove it from the DHCP scope options. Clearing the client cache with Clear-DnsClientCache can help afterwards.',
    },
  },
  {
    id: 'sc.ps.review-events',
    title: 'Review Windows events after a crash',
    track: 'powershell',
    platform: 'powershell',
    difficulty: 'intermediate',
    summary: 'Pick the right event log queries and interpret the results.',
    context: 'Users report that printing stopped at about 9:15 AM. You suspect the Print Spooler service crashed.',
    steps: [
      {
        kind: 'command',
        prompt: 'Get the 20 newest events from the System log.',
        commandIds: ['ps.get-winevent-system'],
        hint: 'Get-WinEvent with -LogName and -MaxEvents.',
        explanation: 'Service crashes are recorded by the Service Control Manager in the System log.',
      },
      {
        kind: 'choice',
        prompt: 'Which event confirms the suspicion?',
        output: `TimeCreated            Id LevelDisplayName Message
-----------            -- ---------------- -------
3/3/2026 9:15:12 AM  7031 Error            The Print Spooler service terminated unexpectedly. It has done this 1 time(s).
3/3/2026 8:02:40 AM  7036 Information      The Windows Update service entered the running state.`,
        choices: [
          { label: 'Event 7031 at 9:15:12 AM: the Print Spooler terminated unexpectedly', correct: true, why: '7031 is logged when a service crashes. The time matches the reports.' },
          { label: 'Event 7036: Windows Update entered the running state', correct: false, why: 'That is routine and happened an hour earlier.' },
        ],
        explanation: 'Matching the event time to the reported symptom is how you connect evidence to a problem.',
      },
      {
        kind: 'command',
        prompt: 'Check the current status of the Spooler service.',
        commandIds: ['ps.get-service-name'],
        hint: 'Get-Service with -Name.',
        explanation: 'Before restarting anything, confirm the current state.',
      },
    ],
    wrapUp: {
      meaning: 'The Print Spooler crashed at 9:15 and is now stopped.',
      nextStep: 'Restart it with Restart-Service -Name Spooler in an elevated session. If it crashes again, look for a faulty print driver in the Application log.',
    },
  },
  {
    id: 'sc.ps.no-ip',
    title: 'A laptop shows a 169.254 address',
    track: 'powershell',
    platform: 'powershell',
    difficulty: 'beginner',
    summary: 'Recognize a DHCP failure and check the adapter.',
    context: 'A laptop on the office wired network cannot reach anything.',
    steps: [
      {
        kind: 'command',
        prompt: 'Show each adapter IP configuration with PowerShell.',
        commandIds: ['ps.get-netipconfiguration'],
        hint: 'Get-NetIPConfiguration.',
        output: `InterfaceAlias       : Ethernet
InterfaceIndex       : 12
IPv4Address          : 169.254.18.40
IPv4DefaultGateway   :
DNSServer            :`,
        explanation: 'A 169.254.x.x address is assigned automatically when DHCP fails.',
      },
      {
        kind: 'command',
        prompt: 'Check whether the adapter actually has a link.',
        commandIds: ['ps.get-netadapter'],
        hint: 'Get-NetAdapter.',
        output: `Name        InterfaceDescription                    ifIndex Status       MacAddress         LinkSpeed
----        --------------------                    ------- ------       ----------         ---------
Ethernet    Intel(R) Ethernet Connection I219-LM         12 Up           8C-16-45-2A-91-0E   100 Mbps`,
        explanation: 'The link is up, so the cable and port work at layer 1.',
      },
      {
        kind: 'choice',
        prompt: 'Link is up but there is no DHCP address. What is the most useful next check?',
        choices: [
          { label: 'Check the switch port VLAN and whether a DHCP server serves that VLAN', correct: true, why: 'A port in the wrong VLAN, or a VLAN without a DHCP relay, gives exactly this symptom.' },
          { label: 'Replace the laptop', correct: false, why: 'The adapter is working. The problem is likely upstream.' },
          { label: 'Flush the DNS cache', correct: false, why: 'DNS has nothing to do with getting an address.' },
        ],
        explanation: 'Link up plus a 169.254 address points to DHCP or VLAN problems upstream.',
      },
    ],
    wrapUp: {
      meaning: 'The adapter has link but receives no DHCP lease.',
      nextStep: 'Ask the network team to check the port VLAN with show interfaces status, and the DHCP relay for that VLAN. Then run ipconfig /renew.',
    },
  },
  {
    id: 'sc.ps.who-is-admin',
    title: 'Who has administrator rights?',
    track: 'powershell',
    platform: 'powershell',
    difficulty: 'intermediate',
    summary: 'Perform a small least-privilege review on a workstation.',
    context: 'An audit asks you to confirm that only approved accounts have administrator rights on WS-LAB-07.',
    steps: [
      {
        kind: 'command',
        prompt: 'List every member of the local Administrators group.',
        commandIds: ['ps.get-localgroupmember'],
        hint: 'Get-LocalGroupMember with -Group.',
        explanation: 'Every member has full control of the machine.',
      },
      {
        kind: 'command',
        prompt: 'Show enabled local accounts with their last logon and password-last-set dates.',
        commandIds: ['ps.localuser-lastlogon'],
        hint: 'Get-LocalUser, filter on Enabled, select three properties.',
        explanation: 'This shows whether each enabled account is in use.',
      },
      {
        kind: 'choice',
        prompt: 'support2 is an administrator, labelled "Temporary vendor account", password set in 2024, never logged on. What should you report?',
        choices: [
          { label: 'A stale privileged account that should be reviewed and probably disabled', correct: true, why: 'An unused administrator account is risk with no benefit.' },
          { label: 'Nothing, because it never logged on', correct: false, why: 'Unused credentials can still be guessed or stolen.' },
          { label: 'Evidence of a breach', correct: false, why: 'Nothing indicates misuse. It is a hygiene finding.' },
        ],
        explanation: 'Least privilege means removing access that is no longer needed.',
      },
    ],
    wrapUp: {
      meaning: 'support2 is an enabled, unused administrator account from a past vendor engagement.',
      nextStep: 'Confirm with the account owner, then disable it through your change process and document the decision.',
    },
  },
  {
    id: 'sc.ps.persistence',
    title: 'Look for persistence',
    track: 'powershell',
    platform: 'powershell',
    difficulty: 'advanced',
    summary: 'Review common autostart locations with read-only commands.',
    context: 'After the suspicious process alert, the incident lead asks whether anything is set to relaunch it.',
    steps: [
      {
        kind: 'command',
        prompt: 'Read the machine-wide Run registry key.',
        commandIds: ['ps.run-keys'],
        hint: 'Get-ItemProperty on HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run, in quotes.',
        explanation: 'Run keys start programs at every sign-in.',
      },
      {
        kind: 'command',
        prompt: 'List scheduled tasks in the Ready state with their path and name.',
        commandIds: ['ps.get-scheduledtask'],
        hint: 'Get-ScheduledTask, Where-Object State -eq Ready, Select-Object TaskPath, TaskName.',
        explanation: 'Scheduled tasks are another common relaunch mechanism.',
      },
      {
        kind: 'command',
        prompt: 'Show what the scheduled task SysUpdater_k2j8 runs.',
        commandIds: ['ps.scheduledtask-action'],
        hint: 'Read the .Actions property of the task and select Execute and Arguments.',
        explanation: 'A hidden PowerShell window with an encoded command is a strong indicator to escalate.',
      },
    ],
    wrapUp: {
      meaning: 'A Run key entry (WinUpd) and a scheduled task (SysUpdater_k2j8) both look like persistence for the suspicious program.',
      nextStep: 'Record both, export them for the incident team, and let the responders remove them as part of containment.',
    },
  },
  {
    id: 'sc.ps.slow-machine',
    title: 'A workstation is slow',
    track: 'powershell',
    platform: 'powershell',
    difficulty: 'beginner',
    summary: 'Find the processes using the most CPU and check disk space.',
    context: 'A user says their PC has been very slow all morning.',
    steps: [
      {
        kind: 'command',
        prompt: 'List the five processes that have used the most CPU time.',
        commandIds: ['ps.top-cpu'],
        hint: 'Get-Process, Sort-Object CPU -Descending, Select-Object -First 5.',
        explanation: 'The pipeline sorts real objects, so no text parsing is needed.',
      },
      {
        kind: 'command',
        prompt: 'Check free space on each local fixed disk.',
        commandIds: ['ps.cim-disk'],
        hint: 'Get-CimInstance Win32_LogicalDisk filtered on DriveType 3.',
        explanation: 'Very low free space on C: causes paging and update problems.',
      },
      {
        kind: 'choice',
        prompt: 'C: has 9 GB free of 254 GB, and chrome has used 1,482 CPU seconds. What is the best first recommendation?',
        choices: [
          { label: 'Free disk space on C: and review heavy browser tabs or extensions', correct: true, why: 'Both findings plausibly contribute and both are safe to address.' },
          { label: 'Reinstall Windows', correct: false, why: 'Far too drastic for what the evidence shows.' },
          { label: 'Stop the MsMpEng process', correct: false, why: 'MsMpEng is Microsoft Defender. Stopping antivirus is not a performance fix.' },
        ],
        explanation: 'Recommend the least disruptive fix that addresses the evidence.',
      },
    ],
    wrapUp: {
      meaning: 'Low free disk space and a heavy browser session are the likely causes.',
      nextStep: 'Run Disk Cleanup or remove large unneeded files, then check whether a browser extension is consuming CPU.',
    },
  },
]
