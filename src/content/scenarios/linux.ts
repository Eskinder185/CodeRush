import type { Scenario } from '../types'

/** Linux troubleshooting scenarios. All output is simulated and uses documentation addresses. */
export const linuxScenarios: Scenario[] = [
  {
    id: 'sc.linux.disk-full',
    title: 'The upload service keeps failing',
    track: 'linux',
    platform: 'linux',
    difficulty: 'beginner',
    summary: 'Find out why a web server cannot write files.',
    context: 'Ticket #4412: "Uploads on web01 fail with a generic error since this morning. Nothing was deployed." You have a shell on web01.',
    steps: [
      {
        kind: 'command',
        prompt: 'Writes are failing. Check how full each file system is, in readable units.',
        commandIds: ['linux.df-h'],
        hint: 'The command name means "disk free". Add the flag for human-readable sizes.',
        explanation: 'A full disk is one of the most common reasons writes fail without a clear error. df -h shows every mounted file system at once.',
      },
      {
        kind: 'choice',
        prompt: 'Which line explains the failure?',
        output: `Filesystem      Size  Used Avail Use% Mounted on
/dev/sda2        40G   40G     0 100% /
/dev/sda1       511M  6.1M  505M   2% /boot/efi
tmpfs           2.0G     0  2.0G   0% /dev/shm`,
        choices: [
          { label: '/dev/sda2 mounted on / is 100% used', correct: true, why: 'With zero space left on the root file system, nothing under / can be written, including uploads and logs.' },
          { label: 'tmpfs on /dev/shm is 0% used', correct: false, why: 'An empty tmpfs is normal. It is memory-backed scratch space.' },
          { label: '/boot/efi is only 2% used', correct: false, why: 'The EFI partition is small and rarely changes. It does not affect uploads.' },
        ],
        explanation: 'Use% at 100 on / means every write under the root file system fails.',
      },
      {
        kind: 'command',
        prompt: 'Logs are a usual suspect. Measure the total size of /var/log.',
        commandIds: ['linux.du-sh'],
        hint: 'Use the "disk usage" command with summary and human-readable flags.',
        output: '31G\t/var/log',
        explanation: 'du -sh totals one directory. 31G of logs on a 40G disk points at log growth, often from a service stuck in an error loop or broken log rotation.',
      },
    ],
    wrapUp: {
      meaning: 'The root file system filled up because /var/log grew to 31G.',
      nextStep: 'Find the largest files with "du -ah /var/log | sort -rh | head", fix the noisy service, and confirm logrotate is running. Archive logs before deleting them if they may be needed.',
    },
  },
  {
    id: 'sc.linux.service-down',
    title: 'The API service will not start',
    track: 'linux',
    platform: 'linux',
    difficulty: 'beginner',
    summary: 'Use systemd tools to find why a service failed.',
    context: 'Monitoring alert: "app.service on web01 is not running." The service ran fine yesterday.',
    steps: [
      {
        kind: 'command',
        prompt: 'List every systemd unit that is in the failed state.',
        commandIds: ['linux.systemctl-failed'],
        hint: 'systemctl has a flag that lists only failed units.',
        explanation: 'systemctl --failed is a quick health check. It confirms which units failed, not just the one you were told about.',
      },
      {
        kind: 'command',
        prompt: 'Show only error-level and worse journal messages from the current boot.',
        commandIds: ['linux.journalctl-priority'],
        hint: 'journalctl filters by priority with -p, and by boot with -b.',
        explanation: 'Filtering by priority removes informational noise and usually surfaces the real failure message.',
      },
      {
        kind: 'choice',
        prompt: 'Based on the journal output, what is the most likely cause?',
        output: `Mar 03 09:15:12 web01 systemd[1]: Failed to start app.service - Inventory API.
Mar 03 09:15:12 web01 app[2251]: FATAL: could not connect to database at 10.0.2.15:5432`,
        choices: [
          { label: 'The application cannot reach its database at 10.0.2.15:5432', correct: true, why: 'The FATAL line names the exact dependency that failed.' },
          { label: 'systemd itself is broken', correct: false, why: 'systemd started the service and recorded its exit. It is working.' },
          { label: 'The disk is full', correct: false, why: 'Nothing in these lines mentions storage.' },
        ],
        explanation: 'The service starts, fails to reach its database, and exits. The problem is a dependency, not the service unit.',
      },
    ],
    wrapUp: {
      meaning: 'app.service exits because it cannot reach its database.',
      nextStep: 'Test the database port with "nc -zv 10.0.2.15 5432", then check the database host and any firewall between them.',
    },
  },
  {
    id: 'sc.linux.no-network',
    title: 'A new VM has no network access',
    track: 'linux',
    platform: 'linux',
    difficulty: 'beginner',
    summary: 'Work up the stack from interface to gateway.',
    context: 'A freshly created VM cannot install packages. "apt update" times out.',
    steps: [
      {
        kind: 'command',
        prompt: 'Show every interface and its IP addresses.',
        commandIds: ['linux.ip-addr-show', 'linux.ip-br-addr'],
        hint: 'Use the iproute2 tool with the address object.',
        output: `1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    inet 127.0.0.1/8 scope host lo
2: enp0s3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether 08:00:27:4e:66:a1 brd ff:ff:ff:ff:ff:ff
    inet 192.0.2.25/24 brd 192.0.2.255 scope global enp0s3`,
        explanation: 'The interface is UP and has 192.0.2.25/24, so layer 1 to 3 on the local link look fine.',
      },
      {
        kind: 'command',
        prompt: 'The address looks fine. Display the routing table.',
        commandIds: ['linux.ip-route-show'],
        hint: 'Same tool, route object.',
        output: '192.0.2.0/24 dev enp0s3 proto kernel scope link src 192.0.2.25',
        explanation: 'Only the directly connected network is listed.',
      },
      {
        kind: 'choice',
        prompt: 'What is missing?',
        choices: [
          { label: 'A default route ("default via ...")', correct: true, why: 'Without a default gateway the host can reach only 192.0.2.0/24. Every other destination has no route.' },
          { label: 'The loopback interface', correct: false, why: 'Loopback was present in the previous output and does not affect external traffic.' },
          { label: 'An IPv6 address', correct: false, why: 'IPv4 alone is enough to reach IPv4 mirrors.' },
        ],
        explanation: 'A host without a default route can talk only to its own subnet.',
      },
    ],
    wrapUp: {
      meaning: 'The VM has an address but no default gateway, so traffic to the internet has nowhere to go.',
      nextStep: 'Fix the gateway in the network configuration (netplan, NetworkManager, or DHCP) rather than adding a temporary route, then confirm with "ip route show" and "ping -c 4 192.0.2.1".',
    },
  },
  {
    id: 'sc.linux.dns-fail',
    title: 'IP works, names do not',
    track: 'linux',
    platform: 'linux',
    difficulty: 'intermediate',
    summary: 'Separate DNS problems from connectivity problems.',
    context: 'Your computer can reach an IP address, but a website name does not resolve. "ping 93.184.215.14" works, "curl https://example.com" fails with "Could not resolve host".',
    steps: [
      {
        kind: 'command',
        prompt: 'Which command would help you investigate DNS? Query DNS for example.com and show the full response.',
        commandIds: ['linux.dig', 'linux.nslookup'],
        hint: 'A DNS lookup utility whose name is three letters.',
        output: `; <<>> DiG 9.18.28 <<>> example.com
;; global options: +cmd
;; connection timed out; no servers could be reached`,
        explanation: 'dig asks the configured resolver directly, so a timeout here confirms the problem is DNS rather than the website.',
      },
      {
        kind: 'command',
        prompt: 'No servers answered. Show which DNS servers this Ubuntu system is using.',
        commandIds: ['linux.resolvectl-status', 'linux.cat-resolv'],
        hint: 'Ubuntu uses systemd-resolved. Its control tool has a status command.',
        output: `Link 2 (enp0s3)
    Current Scopes: DNS
Current DNS Server: 192.0.2.99
       DNS Servers: 192.0.2.99`,
        explanation: 'resolvectl status shows the real upstream server behind the 127.0.0.53 stub.',
      },
      {
        kind: 'choice',
        prompt: 'The network team says the DNS server is 192.0.2.53. What do you conclude?',
        choices: [
          { label: 'The host is configured with the wrong DNS server, 192.0.2.99', correct: true, why: 'Queries go to an address that does not run DNS, so they time out.' },
          { label: 'example.com is down', correct: false, why: 'The IP address answered ping. The site is up. Only name resolution fails.' },
          { label: 'The default gateway is missing', correct: false, why: 'Pinging an external IP worked, so routing is fine.' },
        ],
        explanation: 'Reaching an IP but not a name is the signature of a DNS configuration problem.',
      },
    ],
    wrapUp: {
      meaning: 'DNS queries time out because the host points at 192.0.2.99 instead of 192.0.2.53.',
      nextStep: 'Correct the DNS server in DHCP or the network configuration, then confirm with "dig example.com" and check that SERVER shows the right resolver.',
    },
  },
  {
    id: 'sc.linux.port-not-listening',
    title: 'The website refuses connections',
    track: 'linux',
    platform: 'linux',
    difficulty: 'intermediate',
    summary: 'Check whether a service is listening, and on which address.',
    context: 'Users get "connection refused" on http://192.0.2.25. The nginx service shows active (running).',
    steps: [
      {
        kind: 'command',
        prompt: 'List all listening TCP and UDP ports with numeric addresses.',
        commandIds: ['linux.ss-tuln'],
        hint: 'The socket statistics tool, with flags for TCP, UDP, listening, and numeric.',
        output: `Netid State  Recv-Q Send-Q Local Address:Port  Peer Address:Port Process
tcp   LISTEN 0      128          0.0.0.0:22         0.0.0.0:*
tcp   LISTEN 0      511        127.0.0.1:80         0.0.0.0:*`,
        explanation: 'ss -tuln shows exactly which address and port each listener is bound to.',
      },
      {
        kind: 'choice',
        prompt: 'Why can users not connect even though nginx listens on port 80?',
        choices: [
          { label: 'It listens only on 127.0.0.1, so it accepts local connections only', correct: true, why: 'Loopback-only listeners are unreachable from other machines. It must listen on 0.0.0.0 or the server address.' },
          { label: 'Port 80 is not a valid web port', correct: false, why: 'Port 80 is the standard HTTP port.' },
          { label: 'SSH on port 22 is blocking it', correct: false, why: 'Listeners on different ports do not block each other.' },
        ],
        explanation: '"Connection refused" from remote hosts plus a loopback-only listener is a classic binding mistake.',
      },
    ],
    wrapUp: {
      meaning: 'nginx is bound to 127.0.0.1:80, so only the server itself can reach it.',
      nextStep: 'Change the listen directive to "listen 80;" or the server address, test with "sudo nginx -t", reload, and recheck with "ss -tuln".',
    },
  },
  {
    id: 'sc.linux.high-load',
    title: 'The server is slow',
    track: 'linux',
    platform: 'linux',
    difficulty: 'intermediate',
    summary: 'Find what is consuming CPU and memory.',
    context: 'Users report web01 is slow. No change was announced.',
    steps: [
      {
        kind: 'command',
        prompt: 'Check how long the system has been up and its load averages.',
        commandIds: ['linux.uptime'],
        hint: 'One word: how long has it been up?',
        output: ' 10:02:44 up 41 days,  3:10,  1 user,  load average: 7.92, 7.40, 6.85',
        explanation: 'Load averages are compared with the number of CPU cores.',
      },
      {
        kind: 'command',
        prompt: 'How many CPUs does this machine have? Print the CPU details.',
        commandIds: ['linux.lscpu'],
        hint: 'The "list CPU" command.',
        output: `Architecture:            x86_64
CPU(s):                  2
Model name:              Intel(R) Xeon(R) CPU E5-2680 v4 @ 2.40GHz`,
        explanation: 'A load of about 8 on 2 CPUs means roughly four times more runnable work than the machine can do at once.',
      },
      {
        kind: 'command',
        prompt: 'List every process with CPU and memory columns.',
        commandIds: ['linux.ps-aux', 'linux.top'],
        hint: 'Process status, BSD-style options for all users with user format.',
        output: `USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
www-data    1180  1.2  1.1 210220 45012 ?        S    Jan21   2:11 nginx: worker process
backup      8810 96.4  2.0 412200 81920 ?        R    09:00  62:14 tar -czf /backup/full.tar.gz /srv
backup      8811 91.0  0.4 102400 16384 ?        R    09:00  58:40 gzip`,
        explanation: 'Two backup processes started at 09:00 are using almost all of both CPUs.',
      },
    ],
    wrapUp: {
      meaning: 'A full backup that started at 09:00 is saturating both CPUs during business hours.',
      nextStep: 'Move the backup schedule outside business hours, or run it with lower priority using nice and ionice. Do not kill it without checking with the backup owner.',
    },
  },
  {
    id: 'sc.linux.permission-denied',
    title: 'The deploy user cannot write logs',
    track: 'linux',
    platform: 'linux',
    difficulty: 'intermediate',
    summary: 'Read permissions and group membership to explain an access error.',
    context: 'The deploy account gets "Permission denied" writing /srv/app/logs/app.log.',
    steps: [
      {
        kind: 'command',
        prompt: 'Show the full metadata of /srv/app/logs/app.log, including octal permissions.',
        accepted: ['stat /srv/app/logs/app.log'],
        commandIds: ['linux.stat'],
        hint: 'The command that displays file status.',
        output: `  File: /srv/app/logs/app.log
  Size: 48210     	Blocks: 96         IO Block: 4096   regular file
Access: (0640/-rw-r-----)  Uid: (  998/  appsvc)   Gid: (  998/  appsvc)`,
        explanation: 'Only the owner appsvc can write. The appsvc group can read.',
      },
      {
        kind: 'command',
        prompt: 'Check which groups the deploy account belongs to.',
        accepted: ['groups deploy', 'id deploy'],
        commandIds: ['linux.groups'],
        hint: 'The command is the plural of "group", followed by the account name.',
        output: 'deploy : deploy docker',
        explanation: 'deploy is not the owner and not in the appsvc group.',
      },
      {
        kind: 'choice',
        prompt: 'What is the least-privilege fix?',
        choices: [
          { label: 'Have the app write logs as appsvc, or grant group write and add deploy to appsvc only if it truly needs to write', correct: true, why: 'This keeps access limited to the accounts that need it.' },
          { label: 'chmod 777 the log file', correct: false, why: 'That lets every account on the system modify the log, which defeats its value as evidence.' },
          { label: 'Run the deploy as root', correct: false, why: 'Using root to avoid a permission problem gives the deploy far more power than it needs.' },
        ],
        explanation: 'Permission errors should be fixed by granting the narrowest access that works.',
      },
    ],
    wrapUp: {
      meaning: 'deploy has no write permission: the file is 0640 owned by appsvc and deploy is not in that group.',
      nextStep: 'Decide which account should write the logs, then adjust ownership or group membership deliberately and document why.',
    },
  },
  {
    id: 'sc.linux.what-changed',
    title: 'What changed overnight?',
    track: 'linux',
    platform: 'linux',
    difficulty: 'intermediate',
    summary: 'Use find and grep to narrow down a change window.',
    context: 'The app on web01 started returning errors at 06:00. Nobody admits to changing anything. You need evidence of what changed in the last day.',
    steps: [
      {
        kind: 'command',
        prompt: 'List regular files under /var/log that were modified in the last 24 hours.',
        commandIds: ['linux.find-mtime'],
        hint: 'find with -type f and -mtime -1.',
        output: `/var/log/syslog
/var/log/dpkg.log
/var/log/apt/history.log
/var/log/app/app.log`,
        explanation: 'dpkg.log and apt/history.log changing overnight means packages were installed or upgraded.',
      },
      {
        kind: 'command',
        prompt: 'Search app.log for error lines, ignoring case.',
        commandIds: ['linux.grep-i'],
        hint: 'grep with the ignore-case flag, the word error, then the file.',
        output: `2026-03-03 06:00:14 ERROR ssl: unsupported protocol version in client handshake
2026-03-03 06:00:15 ERROR ssl: unsupported protocol version in client handshake`,
        explanation: 'The errors start at 06:00 and mention SSL.',
      },
      {
        kind: 'choice',
        prompt: 'apt/history.log shows "Upgrade: openssl" at 05:58. What is the best conclusion?',
        choices: [
          { label: 'The automatic openssl upgrade at 05:58 is the likely trigger and should be investigated first', correct: true, why: 'The timing matches and the errors are SSL-related. That is strong evidence, though it still needs confirming.' },
          { label: 'The app has a random bug unrelated to the upgrade', correct: false, why: 'Two minutes between an SSL library upgrade and SSL errors is too close to ignore.' },
          { label: 'Someone hacked the server', correct: false, why: 'Nothing here suggests unauthorized access. An unattended upgrade explains the evidence.' },
        ],
        explanation: 'Good troubleshooting connects timing and symptoms, then confirms before acting.',
      },
    ],
    wrapUp: {
      meaning: 'An unattended openssl upgrade at 05:58 lines up with SSL handshake errors from 06:00.',
      nextStep: 'Review the openssl changelog and the app TLS settings, test in staging, and decide whether to update the app configuration or pin the package temporarily.',
    },
  },
]
