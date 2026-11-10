import type { Platform } from './types'

export interface Mission {
  id: string
  title: string
  summary: string
  platform: Platform
  incident: string
  tools: { id: string; command: string; label: string; output: string; relevant: boolean }[]
  diagnoses: { label: string; correct: boolean; explanation: string }[]
  resolutions: { label: string; correct: boolean; explanation: string }[]
  verification: { command: string; output: string; explanation: string }
  lesson: string
}

/** All records and addresses are synthetic. Every accepted tool has fixed, allowlisted output. */
export const missions: Mission[] = [
  {
    id: 'internet-down', title: 'The internet is down', platform: 'windows-cmd',
    summary: 'Find the layer that failed before proposing a fix.',
    incident: 'WS-LAB-07 can reach local services but staff report that websites do not load. Investigate its configuration and the DNS service.',
    tools: [
      { id: 'config', command: 'ipconfig /all', label: 'Inspect IP configuration', output: 'IPv4 Address: 192.0.2.57/25\nDefault Gateway: 192.0.2.1\nDNS Servers: 192.0.2.53\nDHCP Enabled: Yes', relevant: true },
      { id: 'gateway', command: 'ping 192.0.2.1', label: 'Test the gateway', output: 'Reply from 192.0.2.1: bytes=32 time=1ms TTL=64\n4 sent, 4 received', relevant: true },
      { id: 'dns', command: 'nslookup app.example.test', label: 'Query DNS', output: 'Server: 192.0.2.53\n*** app.example.test: Server failed (SERVFAIL)', relevant: true },
      { id: 'dns-host', command: 'ping 192.0.2.53', label: 'Test DNS host connectivity', output: 'Reply from 192.0.2.53: bytes=32 time=2ms TTL=64\n4 sent, 4 received', relevant: true },
    ],
    diagnoses: [
      { label: 'The DNS service is failing even though the host is reachable.', correct: true, explanation: 'The gateway and DNS host answer, but the DNS query returns SERVFAIL.' },
      { label: 'The workstation has no valid IP address.', correct: false, explanation: 'It has an assigned address and reaches the gateway.' },
      { label: 'The network cable is disconnected.', correct: false, explanation: 'Successful pings prove the local link is working.' },
    ],
    resolutions: [
      { label: 'Escalate the DNS failure and use an approved alternate resolver while the service is repaired.', correct: true, explanation: 'This addresses name resolution without changing a healthy gateway.' },
      { label: 'Replace the workstation default gateway.', correct: false, explanation: 'The configured gateway responds.' },
      { label: 'Disable the workstation firewall.', correct: false, explanation: 'The evidence does not support a local firewall fault.' },
    ],
    verification: { command: 'nslookup app.example.test 198.51.100.53', output: 'Server: 198.51.100.53\nName: app.example.test\nAddress: 192.0.2.140', explanation: 'The approved alternate resolver returns the expected synthetic address.' },
    lesson: 'A successful ping to a DNS server proves reachability, not that its DNS service is healthy. Test the name lookup itself.',
  },
  {
    id: 'slow-server', title: 'A slow Linux server', platform: 'linux',
    summary: 'Compare CPU, memory, disk, and logs before diagnosing latency.',
    incident: 'LAB-SRV-02 responds slowly. You have read-only access to synthetic performance snapshots.',
    tools: [
      { id: 'cpu', command: 'top -b -n 1', label: 'Inspect CPU and processes', output: 'CPU: 14% user, 4% system, 82% idle\nTop process: nginx 8% CPU', relevant: true },
      { id: 'memory', command: 'free -h', label: 'Inspect memory', output: 'Mem: 8.0Gi total, 3.1Gi used, 3.7Gi available', relevant: true },
      { id: 'disk', command: 'df -h', label: 'Inspect disk capacity', output: '/dev/vda1 40G 21G 19G 53% /\n/dev/vdb1 10G 10G 0G 100% /var', relevant: true },
      { id: 'logs', command: 'tail /var/log/syslog', label: 'Inspect recent logs', output: 'lab-srv-02: write failed: No space left on device\nlab-srv-02: repeated application debug output', relevant: true },
    ],
    diagnoses: [
      { label: '/var is full because application logs are growing.', correct: true, explanation: 'The capacity check shows 100% use on /var and the log shows failed writes.' },
      { label: 'CPU saturation is slowing every request.', correct: false, explanation: 'The CPU snapshot is mostly idle.' },
      { label: 'The server is out of RAM.', correct: false, explanation: 'Several GiB remain available.' },
    ],
    resolutions: [
      { label: 'Follow the approved log rotation and cleanup procedure, then fix excessive debug logging.', correct: true, explanation: 'Restore capacity safely and address the source of growth.' },
      { label: 'Kill every process on the server.', correct: false, explanation: 'This is disruptive and does not address the full filesystem.' },
      { label: 'Increase CPU allocation only.', correct: false, explanation: 'CPU is not the bottleneck shown by the evidence.' },
    ],
    verification: { command: 'df -h /var', output: '/dev/vdb1 10G 6.3G 3.7G 63% /var', explanation: 'The simulated remediation restored free space on /var.' },
    lesson: 'A slow server needs resource evidence. Check CPU, memory, disk, and logs before making a change.',
  },
  {
    id: 'suspicious-windows', title: 'Suspicious Windows activity', platform: 'powershell',
    summary: 'Correlate a process, connection, event, and task using synthetic records.',
    incident: 'WS-LAB-12 has a new outbound connection to a documentation-range address. Investigate defensively; preserve evidence.',
    tools: [
      { id: 'process', command: 'Get-Process', label: 'Inspect processes', output: 'Id   ProcessName\n4821 sync-helper\n1104 explorer', relevant: true },
      { id: 'network', command: 'Get-NetTCPConnection', label: 'Inspect connections', output: 'LocalAddress  LocalPort RemoteAddress RemotePort OwningProcess\n192.0.2.62    51820     203.0.113.77  4444       4821', relevant: true },
      { id: 'events', command: 'Get-WinEvent -LogName Microsoft-Windows-TaskScheduler/Operational -MaxEvents 5', label: 'Inspect task events', output: 'Event 106: Task \\LabSync created at 09:12 by LAB\\temp-user\nEvent 200: Action sync-helper.exe started at 09:13', relevant: true },
      { id: 'task', command: 'Get-ScheduledTask', label: 'Inspect scheduled tasks', output: 'TaskName: LabSync\nAction: C:\\Lab\\sync-helper.exe\nState: Running\nCreated: today 09:12', relevant: true },
    ],
    diagnoses: [
      { label: 'A newly created scheduled task launched the process that owns the unexpected connection.', correct: true, explanation: 'The task event, process ID, and network connection correlate.' },
      { label: 'The DNS server is unavailable.', correct: false, explanation: 'The evidence concerns a process and outbound connection, not failed name resolution.' },
      { label: 'The workstation has a disk capacity problem.', correct: false, explanation: 'No storage evidence points to this.' },
    ],
    resolutions: [
      { label: 'Isolate the host under incident procedure, preserve logs and task details, and escalate to the response team.', correct: true, explanation: 'Containment and evidence preservation fit an untrusted process. Do not destroy evidence.' },
      { label: 'Delete all event logs immediately.', correct: false, explanation: 'That destroys evidence needed for investigation.' },
      { label: 'Ignore the connection because the process has a friendly name.', correct: false, explanation: 'Names alone do not establish trust.' },
    ],
    verification: { command: 'Get-NetTCPConnection', output: 'No connection to 203.0.113.77:4444 after synthetic containment. The incident team is reviewing preserved evidence.', explanation: 'This confirms the observed connection stopped in the simulation; it does not certify the host as clean.' },
    lesson: 'Correlate process IDs, task creation, and network records. Preserve evidence and follow approved containment procedures.',
  },
]

export function getMission(id: string) { return missions.find((m) => m.id === id) }
