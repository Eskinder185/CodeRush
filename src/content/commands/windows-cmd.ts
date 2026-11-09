import { define, wincmd } from './helpers'

/** Classic Windows networking commands. They also run inside PowerShell. */
export const windowsCmd = define('windows-cmd', [
  {
    id: 'win.ipconfig',
    command: 'ipconfig',
    title: 'Show basic IP configuration',
    category: 'networking',
    subcategory: 'IP configuration',
    difficulty: 'beginner',
    objective: 'Find a Windows computer IP address, subnet mask, and default gateway.',
    summary: 'Shows the IPv4 and IPv6 address, subnet mask, and default gateway of each adapter.',
    whenToUse: 'The first command for almost any Windows network problem.',
    notice: 'An address starting with 169.254 means the computer did not get one from DHCP.',
    syntax: [{ token: 'ipconfig', meaning: 'display IP configuration' }],
    sampleOutput: `Windows IP Configuration

Ethernet adapter Ethernet:

   Connection-specific DNS Suffix  . : lab.example
   IPv6 Address. . . . . . . . . . . : 2001:db8::57
   Link-local IPv6 Address . . . . . : fe80::4c1d:2e11:9a0f:13b2%12
   IPv4 Address. . . . . . . . . . . : 192.0.2.57
   Subnet Mask . . . . . . . . . . . : 255.255.255.0
   Default Gateway . . . . . . . . . : 192.0.2.1`,
    mistakes: ['Typing ifconfig, which is the old Unix command.'],
    recallPrompt: 'Show the IP address, subnet mask, and gateway on Windows.',
    related: ['win.ipconfig-all', 'ps.get-netipconfiguration'],
    keywords: ['ip address windows', 'find ip address', 'my ip'],
    source: wincmd('ipconfig'),
  },
  {
    id: 'win.ipconfig-all',
    command: 'ipconfig /all',
    title: 'Show full IP configuration',
    category: 'networking',
    subcategory: 'IP configuration',
    difficulty: 'beginner',
    objective: 'See MAC address, DHCP status, lease times, and DNS servers.',
    summary: 'Shows every adapter in detail: physical address, DHCP, lease times, DNS servers, and more.',
    whenToUse: 'When you need DNS servers, the DHCP server, or a MAC address.',
    syntax: [
      { token: 'ipconfig', meaning: 'IP configuration' },
      { token: '/all', meaning: 'full detail' },
    ],
    sampleOutput: `Ethernet adapter Ethernet:

   Description . . . . . . . . . . . : Intel(R) Ethernet Connection I219-LM
   Physical Address. . . . . . . . . : 8C-16-45-2A-91-0E
   DHCP Enabled. . . . . . . . . . . : Yes
   IPv4 Address. . . . . . . . . . . : 192.0.2.57(Preferred)
   Subnet Mask . . . . . . . . . . . : 255.255.255.0
   Lease Obtained. . . . . . . . . . : Tuesday, March 3, 2026 8:01:02 AM
   Lease Expires . . . . . . . . . . : Wednesday, March 4, 2026 8:01:02 AM
   Default Gateway . . . . . . . . . : 192.0.2.1
   DHCP Server . . . . . . . . . . . : 192.0.2.2
   DNS Servers . . . . . . . . . . . : 192.0.2.53
                                       198.51.100.53`,
    mistakes: ['Writing "ipconfig all" without the slash.'],
    recallPrompt: 'Show the full Windows IP configuration including DNS servers and MAC address.',
    accepted: ['ipconfig -all'],
    related: ['win.ipconfig', 'win.getmac'],
    keywords: ['dns servers windows', 'dhcp server', 'mac address'],
    source: wincmd('ipconfig'),
  },
  {
    id: 'win.ipconfig-displaydns',
    command: 'ipconfig /displaydns',
    title: 'Show the DNS cache',
    category: 'dns',
    subcategory: 'DNS cache',
    difficulty: 'intermediate',
    objective: 'See which names Windows has cached and what they resolved to.',
    summary: 'Prints the contents of the DNS client resolver cache.',
    whenToUse: 'When a name keeps pointing to an old address.',
    syntax: [
      { token: 'ipconfig', meaning: 'IP configuration' },
      { token: '/displaydns', meaning: 'show the DNS cache' },
    ],
    sampleOutput: `Windows IP Configuration

    app.lab.example
    ----------------------------------------
    Record Name . . . . . : app.lab.example
    Record Type . . . . . : 1
    Time To Live  . . . . : 211
    Data Length . . . . . : 4
    Section . . . . . . . : Answer
    A (Host) Record . . . : 192.0.2.80`,
    mistakes: ['Expecting record type names. Type 1 is A, 28 is AAAA, 5 is CNAME.'],
    recallPrompt: 'Print the contents of the Windows DNS cache with ipconfig.',
    related: ['win.ipconfig-flushdns', 'ps.get-dnsclientcache'],
    keywords: ['dns cache', 'displaydns'],
    source: wincmd('ipconfig'),
  },
  {
    id: 'win.ipconfig-flushdns',
    command: 'ipconfig /flushdns',
    title: 'Flush the DNS cache',
    category: 'dns',
    subcategory: 'DNS cache',
    difficulty: 'beginner',
    objective: 'Clear cached DNS answers.',
    summary: 'Empties the DNS client cache so the next lookup goes to the DNS server.',
    whenToUse: 'After a DNS record change, when this computer still uses the old address.',
    syntax: [
      { token: 'ipconfig', meaning: 'IP configuration' },
      { token: '/flushdns', meaning: 'clear the DNS cache' },
    ],
    sampleOutput: `Windows IP Configuration

Successfully flushed the DNS Resolver Cache.`,
    mistakes: ['Expecting it to fix a wrong answer that the DNS server itself returns.'],
    permissions: 'elevated',
    safety: 'changes-state',
    recallPrompt: 'Clear the Windows DNS cache using ipconfig.',
    related: ['win.ipconfig-displaydns', 'ps.clear-dnsclientcache'],
    keywords: ['flush dns', 'clear dns cache'],
    source: wincmd('ipconfig'),
  },
  {
    id: 'win.ipconfig-renew',
    command: 'ipconfig /renew',
    title: 'Renew a DHCP lease',
    category: 'networking',
    subcategory: 'IP configuration',
    difficulty: 'intermediate',
    objective: 'Ask the DHCP server for a fresh address.',
    summary: 'Requests a new DHCP lease for every adapter configured for DHCP.',
    whenToUse: 'When an adapter has a 169.254 address after the network was fixed.',
    syntax: [
      { token: 'ipconfig', meaning: 'IP configuration' },
      { token: '/renew', meaning: 'renew the DHCP lease' },
    ],
    sampleOutput: `Windows IP Configuration

Ethernet adapter Ethernet:

   IPv4 Address. . . . . . . . . . . : 192.0.2.57
   Subnet Mask . . . . . . . . . . . : 255.255.255.0
   Default Gateway . . . . . . . . . : 192.0.2.1`,
    mistakes: ['Running /release over a remote session, which disconnects you.'],
    safety: 'lab-only',
    recallPrompt: 'Request a new DHCP lease on Windows.',
    related: ['win.ipconfig-all'],
    keywords: ['dhcp', 'renew ip', 'new ip address'],
    source: wincmd('ipconfig'),
  },
  {
    id: 'win.ping',
    command: 'ping 192.0.2.1',
    title: 'Ping on Windows',
    category: 'networking',
    subcategory: 'Connectivity testing',
    difficulty: 'beginner',
    objective: 'Test reachability and latency to a host.',
    summary: 'Sends four ICMP echo requests to 192.0.2.1 and reports replies and round-trip times.',
    details: 'Windows ping sends four requests by default. Use -n to change the count and -t to ping until stopped.',
    whenToUse: 'To test the gateway first, then a remote address, then a name.',
    syntax: [
      { token: 'ping', meaning: 'ICMP echo' },
      { token: '192.0.2.1', meaning: 'target' },
    ],
    sampleOutput: `Pinging 192.0.2.1 with 32 bytes of data:
Reply from 192.0.2.1: bytes=32 time<1ms TTL=64
Reply from 192.0.2.1: bytes=32 time<1ms TTL=64
Reply from 192.0.2.1: bytes=32 time=1ms TTL=64
Reply from 192.0.2.1: bytes=32 time<1ms TTL=64

Ping statistics for 192.0.2.1:
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),`,
    mistakes: ['Using -c from Linux habit. On Windows the count flag is -n.'],
    requirements: 'Sends network traffic.',
    recallPrompt: 'Ping the gateway at 192.0.2.1 from Command Prompt.',
    accepted: ['ping -n 4 192.0.2.1'],
    related: ['win.tracert', 'ps.test-connection'],
    keywords: ['ping', 'reachability'],
    source: wincmd('ping'),
  },
  {
    id: 'win.tracert',
    command: 'tracert example.com',
    title: 'Trace a route on Windows',
    category: 'networking',
    subcategory: 'Connectivity testing',
    difficulty: 'intermediate',
    objective: 'List the routers between you and a destination.',
    summary: 'Shows each hop on the path to example.com with three timing samples per hop.',
    whenToUse: 'When a remote site is unreachable or slow.',
    syntax: [
      { token: 'tracert', meaning: 'trace route, Windows spelling' },
      { token: 'example.com', meaning: 'destination' },
    ],
    sampleOutput: `Tracing route to example.com [93.184.215.14]
over a maximum of 30 hops:

  1    <1 ms    <1 ms    <1 ms  192.0.2.1
  2     8 ms     8 ms     8 ms  198.51.100.1
  3     *        *        *     Request timed out.
  4    15 ms    14 ms    15 ms  203.0.113.65
  5    15 ms    15 ms    15 ms  93.184.215.14

Trace complete.`,
    mistakes: ['Typing traceroute, which is the Linux spelling.'],
    requirements: 'Sends network traffic.',
    recallPrompt: 'Trace the route to example.com from Command Prompt.',
    accepted: ['tracert -d example.com'],
    related: ['win.ping', 'linux.traceroute', 'ps.test-netconnection-trace'],
    keywords: ['traceroute windows', 'hops'],
    source: wincmd('tracert'),
  },
  {
    id: 'win.pathping',
    command: 'pathping -n example.com',
    title: 'Measure loss along a path',
    category: 'networking',
    subcategory: 'Connectivity testing',
    difficulty: 'advanced',
    objective: 'Find which hop introduces packet loss.',
    summary: 'Traces the route to example.com, then measures loss at each hop over a period of time.',
    whenToUse: 'When a connection is intermittently slow and a single tracert is not enough.',
    syntax: [
      { token: 'pathping', meaning: 'combined trace and loss measurement' },
      { token: '-n', meaning: 'do not resolve hop names' },
      { token: 'example.com', meaning: 'destination' },
    ],
    sampleOutput: `Computing statistics for 125 seconds...
            Source to Here   This Node/Link
Hop  RTT    Lost/Sent = Pct  Lost/Sent = Pct  Address
  0                                           192.0.2.57
                                0/ 100 =  0%   |
  1    0ms     0/ 100 =  0%     0/ 100 =  0%  192.0.2.1
                               12/ 100 = 12%   |
  2    9ms    12/ 100 = 12%     0/ 100 =  0%  198.51.100.1`,
    mistakes: ['Stopping it early. It needs time to collect statistics.'],
    requirements: 'Sends network traffic for about two minutes.',
    recallPrompt: 'Measure per-hop packet loss to example.com without name resolution.',
    related: ['win.tracert'],
    keywords: ['packet loss', 'pathping'],
    source: wincmd('pathping'),
  },
  {
    id: 'win.nslookup',
    command: 'nslookup example.com',
    title: 'Look up a name on Windows',
    category: 'dns',
    subcategory: 'Name resolution',
    difficulty: 'beginner',
    objective: 'Check what a name resolves to and which DNS server answered.',
    summary: 'Asks the default DNS server for example.com and prints the server used and the addresses returned.',
    whenToUse: 'When a website name does not resolve, or resolves to the wrong address.',
    syntax: [
      { token: 'nslookup', meaning: 'query DNS servers' },
      { token: 'example.com', meaning: 'name to look up' },
    ],
    sampleOutput: `Server:  dns1.lab.example
Address:  192.0.2.53

Non-authoritative answer:
Name:    example.com
Addresses:  2606:2800:21f:cb07:6820:80da:af6b:8b2c
          93.184.215.14`,
    mistakes: ['Assuming nslookup uses the same path as applications. It queries DNS directly and ignores the hosts file.'],
    requirements: 'Sends a DNS query.',
    recallPrompt: 'Look up example.com with the classic Windows DNS tool.',
    accepted: ['nslookup example.com 192.0.2.53'],
    related: ['ps.resolve-dnsname', 'linux.nslookup'],
    keywords: ['dns lookup', 'resolve name'],
    source: wincmd('nslookup'),
  },
  {
    id: 'win.netstat-ano',
    command: 'netstat -ano',
    title: 'List connections with process IDs',
    category: 'networking',
    subcategory: 'Connections and ports',
    difficulty: 'intermediate',
    objective: 'See every connection and listening port with the owning process ID.',
    summary: 'Lists all TCP and UDP connections and listeners with numeric addresses and the process ID of each.',
    whenToUse: 'When finding which program uses a port, or spotting unexpected connections.',
    notice: 'Match the PID column with Task Manager or tasklist to identify the program.',
    syntax: [
      { token: 'netstat', meaning: 'network statistics' },
      { token: '-a', meaning: 'all connections and listening ports' },
      { token: '-n', meaning: 'numeric addresses and ports' },
      { token: '-o', meaning: 'owning process ID' },
    ],
    sampleOutput: `Active Connections

  Proto  Local Address          Foreign Address        State           PID
  TCP    0.0.0.0:135            0.0.0.0:0              LISTENING       980
  TCP    0.0.0.0:445            0.0.0.0:0              LISTENING       4
  TCP    0.0.0.0:5985           0.0.0.0:0              LISTENING       4
  TCP    192.0.2.57:52144       192.0.2.80:443         ESTABLISHED     7720
  TCP    192.0.2.57:52190       203.0.113.77:4444      ESTABLISHED     4821
  UDP    0.0.0.0:5353           *:*                                    2210`,
    mistakes: ['Leaving out -n, which makes netstat slow while it resolves names.'],
    recallPrompt: 'List all connections and listening ports with numeric addresses and process IDs.',
    accepted: ['netstat -aon', 'netstat -nao', 'netstat -noa'],
    related: ['ps.get-nettcpconnection-established', 'win.tasklist-pid'],
    keywords: ['open ports windows', 'netstat', 'connections', 'which process uses port'],
    source: wincmd('netstat'),
  },
  {
    id: 'win.tasklist-pid',
    command: 'tasklist /FI "PID eq 4821"',
    title: 'Identify a process by PID',
    category: 'processes',
    subcategory: 'Processes',
    difficulty: 'intermediate',
    objective: 'Turn a process ID from netstat into a program name.',
    summary: 'Shows the image name, PID, session, and memory use of process 4821.',
    whenToUse: 'Right after netstat -ano shows a PID you do not recognize.',
    syntax: [
      { token: 'tasklist', meaning: 'list processes' },
      { token: '/FI "PID eq 4821"', meaning: 'filter by process ID' },
    ],
    sampleOutput: `Image Name                     PID Session Name        Session#    Mem Usage
========================= ======== ================ =========== ============
updtsvc.exe                   4821 Console                    1     14,212 K`,
    mistakes: ['Forgetting the quotes around the filter expression.'],
    recallPrompt: 'Show which program has process ID 4821 using tasklist.',
    accepted: ['tasklist /fi "pid eq 4821"'],
    related: ['win.netstat-ano', 'ps.get-process-id'],
    keywords: ['tasklist', 'process id'],
    source: wincmd('tasklist'),
  },
  {
    id: 'win.route-print',
    command: 'route print -4',
    title: 'Print the routing table',
    category: 'networking',
    subcategory: 'Routing',
    difficulty: 'intermediate',
    objective: 'Read the Windows IPv4 routing table and interface list.',
    summary: 'Prints the interface list, active IPv4 routes, and persistent routes.',
    whenToUse: 'When traffic to one network goes the wrong way.',
    notice: 'The 0.0.0.0 network destination is the default route. Its Gateway column is the default gateway.',
    syntax: [
      { token: 'route', meaning: 'routing table tool' },
      { token: 'print', meaning: 'display' },
      { token: '-4', meaning: 'IPv4 only' },
    ],
    sampleOutput: `===========================================================================
IPv4 Route Table
===========================================================================
Active Routes:
Network Destination        Netmask          Gateway       Interface  Metric
          0.0.0.0          0.0.0.0        192.0.2.1      192.0.2.57     25
        127.0.0.0        255.0.0.0         On-link        127.0.0.1    331
        192.0.2.0    255.255.255.0         On-link       192.0.2.57    281
       192.0.2.57  255.255.255.255         On-link       192.0.2.57    281
===========================================================================
Persistent Routes:
  None`,
    mistakes: ['Confusing "On-link" with an error. It means the network is directly attached.'],
    recallPrompt: 'Print the IPv4 routing table on Windows.',
    accepted: ['route print', 'netstat -r'],
    related: ['ps.get-netroute', 'linux.ip-route-show'],
    keywords: ['routing table windows', 'default gateway', 'route print'],
    source: wincmd('route_ws2008'),
  },
  {
    id: 'win.arp-a',
    command: 'arp -a',
    title: 'Show the ARP cache',
    category: 'networking',
    subcategory: 'ARP',
    difficulty: 'beginner',
    objective: 'See IP-to-MAC mappings for the local network.',
    summary: 'Lists the ARP cache for each interface: IP address, physical address, and type.',
    whenToUse: 'When a local device is unreachable, or two devices might share an IP address.',
    syntax: [
      { token: 'arp', meaning: 'address resolution protocol cache' },
      { token: '-a', meaning: 'display all entries' },
    ],
    sampleOutput: `Interface: 192.0.2.57 --- 0xc
  Internet Address      Physical Address      Type
  192.0.2.1             52-54-00-12-35-02     dynamic
  192.0.2.53            52-54-00-1a-2b-53     dynamic
  192.0.2.255           ff-ff-ff-ff-ff-ff     static
  224.0.0.22            01-00-5e-00-00-16     static`,
    mistakes: ['Expecting remote hosts here. ARP covers only the local network segment.'],
    recallPrompt: 'Show the ARP cache on Windows.',
    accepted: ['arp -g'],
    related: ['ps.get-netneighbor', 'linux.ip-neigh-show'],
    keywords: ['arp table', 'mac address', 'neighbors'],
    source: wincmd('arp'),
  },
  {
    id: 'win.getmac',
    command: 'getmac /v',
    title: 'List MAC addresses',
    category: 'networking',
    subcategory: 'Adapters',
    difficulty: 'beginner',
    objective: 'Find the physical address of each adapter.',
    summary: 'Lists adapters with their connection name, physical (MAC) address, and transport name.',
    whenToUse: 'When registering a device for network access or a DHCP reservation.',
    syntax: [
      { token: 'getmac', meaning: 'list MAC addresses' },
      { token: '/v', meaning: 'verbose, include adapter names' },
    ],
    sampleOutput: `Connection Name Network Adapter Physical Address    Transport Name
=============== =============== =================== ==========================================================
Ethernet        Intel(R) Ethern 8C-16-45-2A-91-0E   \\Device\\Tcpip_{4F1C2A1B-7E2D-4C11-9A0F-2B3C4D5E6F70}
Wi-Fi           Intel(R) Wi-Fi  3C-58-C2-7F-11-A0   Media disconnected`,
    mistakes: ['Confusing a randomized Wi-Fi MAC with the hardware address.'],
    recallPrompt: 'List each adapter and its MAC address in verbose form.',
    accepted: ['getmac'],
    related: ['win.ipconfig-all', 'ps.get-netadapter'],
    keywords: ['mac address', 'physical address'],
    source: wincmd('getmac'),
  },
  {
    id: 'win.hostname',
    command: 'hostname',
    title: 'Print the computer name',
    category: 'system',
    subcategory: 'System information',
    difficulty: 'beginner',
    objective: 'Confirm which computer you are working on.',
    summary: 'Prints the host name of the computer.',
    whenToUse: 'Before running anything, when several remote sessions are open.',
    syntax: [{ token: 'hostname', meaning: 'print the host name' }],
    sampleOutput: 'WS-LAB-07',
    mistakes: ['Passing arguments. Windows hostname cannot set the name.'],
    recallPrompt: 'Print this computer host name from Command Prompt.',
    related: ['ps.env-var'],
    keywords: ['computer name', 'host name'],
    source: wincmd('hostname'),
  },
  {
    id: 'win.netsh-ipv4-config',
    command: 'netsh interface ipv4 show config',
    title: 'Show IPv4 settings with netsh',
    category: 'networking',
    subcategory: 'IP configuration',
    difficulty: 'intermediate',
    objective: 'See whether each interface uses DHCP or static settings.',
    summary: 'Shows each interface DHCP state, IP address, gateway, and DNS configuration.',
    whenToUse: 'When you need to know whether settings are static or DHCP-assigned.',
    syntax: [
      { token: 'netsh', meaning: 'network shell' },
      { token: 'interface ipv4', meaning: 'IPv4 interface context' },
      { token: 'show config', meaning: 'display configuration' },
    ],
    sampleOutput: `Configuration for interface "Ethernet"
    DHCP enabled:                         Yes
    IP Address:                           192.0.2.57
    Subnet Prefix:                        192.0.2.0/24 (mask 255.255.255.0)
    Default Gateway:                      192.0.2.1
    Gateway Metric:                       0
    InterfaceMetric:                      25
    DNS servers configured through DHCP:  192.0.2.53
                                          198.51.100.53`,
    mistakes: ['Using netsh set commands to look. show only reads, set changes configuration.'],
    recallPrompt: 'Show IPv4 configuration for every interface with netsh.',
    accepted: ['netsh int ipv4 show config', 'netsh interface ip show config'],
    related: ['win.ipconfig-all'],
    keywords: ['netsh', 'static ip', 'dhcp enabled'],
    source: wincmd('netsh-interface'),
  },
  {
    id: 'win.netsh-wlan',
    command: 'netsh wlan show interfaces',
    title: 'Show Wi-Fi connection details',
    category: 'networking',
    subcategory: 'Wireless',
    difficulty: 'intermediate',
    objective: 'Check signal strength, band, and channel of the current Wi-Fi connection.',
    summary: 'Shows the wireless interface state, SSID, radio type, channel, and signal quality.',
    whenToUse: 'When a laptop has slow or unstable Wi-Fi.',
    notice: 'Signal below about 60% often explains poor performance.',
    syntax: [
      { token: 'netsh wlan', meaning: 'wireless context' },
      { token: 'show interfaces', meaning: 'current wireless status' },
    ],
    sampleOutput: `    Name                   : Wi-Fi
    State                  : connected
    SSID                   : lab-wifi
    Radio type             : 802.11ax
    Authentication         : WPA3-Personal
    Band                   : 5 GHz
    Channel                : 36
    Receive rate (Mbps)    : 1201
    Signal                 : 54%`,
    mistakes: ['Expecting output on a desktop with no wireless adapter.'],
    requirements: 'Windows with a wireless adapter. Recent Windows versions may require location permission for some fields.',
    recallPrompt: 'Show the current Wi-Fi connection details with netsh.',
    related: ['ps.get-netadapter'],
    keywords: ['wifi signal', 'wireless', 'ssid'],
    source: { label: 'netsh wlan on Microsoft Learn', url: 'https://learn.microsoft.com/windows-server/networking/technologies/netsh/netsh-wlan' },
  },
])
