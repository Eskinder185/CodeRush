import { define, man } from './helpers'

/**
 * Linux networking. Addresses use documentation ranges (RFC 5737, RFC 3849) or private ranges.
 * Commands that send traffic say so in `requirements`.
 */
export const linuxNetwork = define('linux', [
  {
    id: 'linux.ip-addr-show',
    command: 'ip addr show',
    title: 'Show interfaces and IP addresses',
    category: 'networking',
    subcategory: 'Interfaces',
    difficulty: 'beginner',
    objective: 'Find your IP addresses and see which interfaces exist.',
    summary: 'Shows network interfaces and their IP addresses on a Linux computer.',
    details: 'Each block is one interface. "inet" lines are IPv4 with a CIDR prefix, "inet6" lines are IPv6. "state UP" means the link is active. "lo" is the loopback interface.',
    whenToUse: 'When you need to find your IP address or check which network interfaces are available.',
    notice: 'Look for the interface name, its state, and the assigned IPv4 or IPv6 addresses.',
    syntax: [
      { token: 'ip', meaning: 'the iproute2 networking tool' },
      { token: 'addr', meaning: 'the address object; short for address' },
      { token: 'show', meaning: 'display, the default action' },
    ],
    sampleOutput: `1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
    inet6 ::1/128 scope host
2: enp0s3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether 08:00:27:4e:66:a1 brd ff:ff:ff:ff:ff:ff
    inet 192.0.2.25/24 brd 192.0.2.255 scope global dynamic enp0s3
       valid_lft 85912sec preferred_lft 85912sec
    inet6 2001:db8::25/64 scope global
    inet6 fe80::a00:27ff:fe4e:66a1/64 scope link`,
    mistakes: ['Using ifconfig, which is deprecated and missing from many modern installs.', 'Reading the loopback address 127.0.0.1 as the machine address.'],
    recallPrompt: 'Show every network interface and its IP addresses.',
    accepted: ['ip a', 'ip addr', 'ip address', 'ip address show', 'ip a show', 'ip addr list'],
    related: ['linux.ip-br-addr', 'linux.ip-link-show', 'linux.ip-route-show'],
    keywords: ['find ip address', 'my ip', 'ipconfig linux', 'ifconfig', 'network interfaces'],
    source: man('ip-address', 8),
  },
  {
    id: 'linux.ip-br-addr',
    command: 'ip -br addr',
    title: 'Brief interface summary',
    category: 'networking',
    subcategory: 'Interfaces',
    difficulty: 'beginner',
    objective: 'Get a one-line-per-interface overview of state and addresses.',
    summary: 'Prints each interface on one line with its state and addresses.',
    whenToUse: 'When you want a quick overview without the full detail of ip addr show.',
    syntax: [
      { token: 'ip', meaning: 'iproute2 tool' },
      { token: '-br', meaning: 'brief output' },
      { token: 'addr', meaning: 'addresses' },
    ],
    sampleOutput: `lo               UNKNOWN        127.0.0.1/8 ::1/128
enp0s3           UP             192.0.2.25/24 2001:db8::25/64 fe80::a00:27ff:fe4e:66a1/64
wlp2s0           DOWN`,
    mistakes: ['Putting -br after addr. Options go before the object.'],
    recallPrompt: 'Print a compact one-line summary of each interface and its addresses.',
    accepted: ['ip -br a', 'ip -brief addr', 'ip -brief address', 'ip -br address'],
    related: ['linux.ip-addr-show'],
    keywords: ['brief ip', 'quick ip summary'],
    source: man('ip', 8),
  },
  {
    id: 'linux.ip-link-show',
    command: 'ip link show',
    title: 'Show link layer status',
    category: 'networking',
    subcategory: 'Interfaces',
    difficulty: 'beginner',
    objective: 'Check whether interfaces are up and read their MAC addresses.',
    summary: 'Lists network interfaces with their link state, MTU, and MAC address, without IP information.',
    whenToUse: 'When a cable or Wi-Fi link might be down, or you need a MAC address.',
    notice: 'LOWER_UP means the physical link is detected. "state DOWN" means no link.',
    syntax: [
      { token: 'ip link', meaning: 'the link-layer object' },
      { token: 'show', meaning: 'display' },
    ],
    sampleOutput: `1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
2: enp0s3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP mode DEFAULT group default qlen 1000
    link/ether 08:00:27:4e:66:a1 brd ff:ff:ff:ff:ff:ff`,
    mistakes: ['Looking for IP addresses here. ip link shows layer 2 only.'],
    recallPrompt: 'Show each interface link state and MAC address, without IP addresses.',
    accepted: ['ip link', 'ip l', 'ip link list'],
    related: ['linux.ip-addr-show', 'linux.ip-s-link'],
    keywords: ['mac address', 'link status', 'interface up'],
    source: man('ip-link', 8),
  },
  {
    id: 'linux.ip-s-link',
    command: 'ip -s link show enp0s3',
    title: 'Show interface counters',
    category: 'networking',
    subcategory: 'Interfaces',
    difficulty: 'intermediate',
    objective: 'Read packet, error, and drop counters for one interface.',
    summary: 'Shows received and transmitted bytes, packets, errors, and drops for enp0s3.',
    whenToUse: 'When a connection is slow or unreliable and you suspect a physical or driver problem.',
    notice: 'Rising errors or dropped counts point to cabling, duplex mismatch, or driver issues.',
    syntax: [
      { token: '-s', meaning: 'include statistics' },
      { token: 'link show enp0s3', meaning: 'one interface' },
    ],
    sampleOutput: `2: enp0s3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP mode DEFAULT group default qlen 1000
    link/ether 08:00:27:4e:66:a1 brd ff:ff:ff:ff:ff:ff
    RX:  bytes packets errors dropped  missed   mcast
     918274511  712044      0      12       0    1021
    TX:  bytes packets errors dropped carrier collsns
      40218833  301118      0       0       0       0`,
    mistakes: ['Reading a single snapshot. Run it twice and compare to see whether errors are increasing.'],
    recallPrompt: 'Show packet and error counters for the enp0s3 interface.',
    accepted: ['ip -s link show dev enp0s3', 'ip -s link enp0s3', 'ip -s l show enp0s3'],
    related: ['linux.ip-link-show'],
    keywords: ['interface errors', 'dropped packets', 'counters'],
    source: man('ip-link', 8),
  },
  {
    id: 'linux.ip-route-show',
    command: 'ip route show',
    title: 'Show the routing table',
    category: 'networking',
    subcategory: 'Routing',
    difficulty: 'beginner',
    objective: 'Find the default gateway and see which networks are directly connected.',
    summary: 'Lists the routes the kernel uses to decide where to send packets.',
    details: 'The "default via" line is the default gateway, used for any destination without a more specific route. Lines with "proto kernel scope link" are networks the host is directly attached to.',
    whenToUse: 'When a host can reach its local network but nothing beyond it.',
    notice: 'Check that a default route exists and points to the right gateway.',
    syntax: [
      { token: 'ip route', meaning: 'the routing table object' },
      { token: 'show', meaning: 'display' },
    ],
    sampleOutput: `default via 192.0.2.1 dev enp0s3 proto dhcp src 192.0.2.25 metric 100
192.0.2.0/24 dev enp0s3 proto kernel scope link src 192.0.2.25 metric 100`,
    mistakes: ['Assuming no output means no routes. Check that you typed route, not root.'],
    recallPrompt: 'Display the routing table, including the default gateway.',
    accepted: ['ip route', 'ip r', 'ip route list', 'ip r show'],
    related: ['linux.ip-route-get', 'linux.ip-neigh-show'],
    keywords: ['routing table', 'default gateway', 'route print linux'],
    source: man('ip-route', 8),
  },
  {
    id: 'linux.ip-route-get',
    command: 'ip route get 198.51.100.10',
    title: 'Ask which route a packet would take',
    category: 'networking',
    subcategory: 'Routing',
    difficulty: 'intermediate',
    objective: 'See the exact interface, gateway, and source address used for one destination.',
    summary: 'Shows which route, interface, and source address the kernel would use to reach 198.51.100.10.',
    whenToUse: 'On hosts with several interfaces or VPNs, to confirm traffic goes the way you expect.',
    syntax: [
      { token: 'ip route get', meaning: 'resolve a route for one address' },
      { token: '198.51.100.10', meaning: 'destination to test' },
    ],
    sampleOutput: `198.51.100.10 via 192.0.2.1 dev enp0s3 src 192.0.2.25 uid 1000
    cache`,
    mistakes: ['Expecting it to send a packet. It only consults the routing table.'],
    recallPrompt: 'Ask the kernel which route it would use to reach 198.51.100.10.',
    accepted: ['ip r get 198.51.100.10'],
    related: ['linux.ip-route-show'],
    keywords: ['route lookup', 'which interface'],
    source: man('ip-route', 8),
  },
  {
    id: 'linux.ip-neigh-show',
    command: 'ip neigh show',
    title: 'Show the neighbor (ARP) table',
    category: 'networking',
    subcategory: 'ARP and neighbors',
    difficulty: 'intermediate',
    objective: 'See which IP addresses on the local network map to which MAC addresses.',
    summary: 'Lists the neighbor cache, the IPv4 ARP and IPv6 neighbor discovery entries this host knows.',
    whenToUse: 'When you can reach some local hosts but not others, or suspect a duplicate IP address.',
    notice: 'REACHABLE is healthy. FAILED or INCOMPLETE means the neighbor did not answer.',
    syntax: [
      { token: 'ip neigh', meaning: 'neighbor table, short for neighbour' },
      { token: 'show', meaning: 'display' },
    ],
    sampleOutput: `192.0.2.1 dev enp0s3 lladdr 52:54:00:12:35:02 REACHABLE
192.0.2.30 dev enp0s3 lladdr 08:00:27:9c:01:7d STALE
192.0.2.44 dev enp0s3 FAILED`,
    mistakes: ['Treating STALE as an error. It only means the entry needs revalidation.'],
    recallPrompt: 'Show the IP-to-MAC mappings this host has learned on the local network.',
    accepted: ['ip neigh', 'ip n', 'ip neighbor show', 'ip neighbour show', 'ip n show'],
    related: ['linux.ip-route-show', 'linux.ip-link-show'],
    keywords: ['arp table', 'arp -a linux', 'mac address table'],
    source: man('ip-neighbour', 8),
  },
  {
    id: 'linux.hostname-i',
    command: 'hostname -I',
    title: 'Print all host IP addresses',
    category: 'networking',
    subcategory: 'Interfaces',
    difficulty: 'beginner',
    objective: 'Get just the IP addresses, with no other detail.',
    summary: 'Prints every address assigned to the host, except loopback and link-local, on one line.',
    whenToUse: 'In scripts, or when you only need the address to share with someone.',
    syntax: [
      { token: 'hostname', meaning: 'show or set the host name' },
      { token: '-I', meaning: 'capital i: all addresses' },
    ],
    sampleOutput: '192.0.2.25 2001:db8::25',
    mistakes: ['Typing lowercase -i, which resolves the host name instead and may return 127.0.1.1.'],
    requirements: 'The -I option is in the Debian and Ubuntu hostname package. Some distributions do not provide it.',
    recallPrompt: 'Print only the IP addresses of this machine on one line.',
    related: ['linux.ip-addr-show'],
    keywords: ['ip only', 'my ip'],
    source: { label: 'hostname(1) manual page', url: 'https://manpages.debian.org/stable/hostname/hostname.1.en.html' },
  },
  {
    id: 'linux.ping-c',
    command: 'ping -c 4 192.0.2.1',
    title: 'Test reachability with ping',
    category: 'networking',
    subcategory: 'Connectivity testing',
    difficulty: 'beginner',
    objective: 'Check whether a host answers and measure round-trip time.',
    summary: 'Sends four ICMP echo requests to 192.0.2.1 and reports replies, packet loss, and timing.',
    details: 'Without -c, Linux ping runs until you press Ctrl+C. Many firewalls block ICMP, so no reply does not prove a host is down.',
    whenToUse: 'As a first test of whether you can reach your gateway or another host.',
    notice: 'Check "packet loss" and the time values. Test the gateway first, then a remote address.',
    syntax: [
      { token: 'ping', meaning: 'send ICMP echo requests' },
      { token: '-c 4', meaning: 'stop after 4 packets' },
      { token: '192.0.2.1', meaning: 'target address' },
    ],
    sampleOutput: `PING 192.0.2.1 (192.0.2.1) 56(84) bytes of data.
64 bytes from 192.0.2.1: icmp_seq=1 ttl=64 time=0.412 ms
64 bytes from 192.0.2.1: icmp_seq=2 ttl=64 time=0.388 ms
64 bytes from 192.0.2.1: icmp_seq=3 ttl=64 time=0.401 ms
64 bytes from 192.0.2.1: icmp_seq=4 ttl=64 time=0.395 ms

--- 192.0.2.1 ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 3059ms
rtt min/avg/max/mdev = 0.388/0.399/0.412/0.009 ms`,
    mistakes: ['Using -n 4 from Windows habit. On Linux, -n means numeric output, not count.', 'Concluding a server is down because ICMP is filtered.'],
    requirements: 'Sends network traffic. Only test hosts you are allowed to test.',
    recallPrompt: 'Send exactly four echo requests to the gateway at 192.0.2.1.',
    accepted: ['ping -c4 192.0.2.1'],
    related: ['linux.traceroute', 'linux.ip-route-show'],
    keywords: ['ping', 'reachability', 'is host up', 'latency'],
    source: man('ping', 8),
  },
  {
    id: 'linux.traceroute',
    command: 'traceroute example.com',
    title: 'Trace the path to a host',
    category: 'networking',
    subcategory: 'Connectivity testing',
    difficulty: 'intermediate',
    objective: 'See each router hop between you and a destination.',
    summary: 'Lists the routers along the path to example.com and the delay to each one.',
    details: 'traceroute sends probes with increasing TTL values. Each router that drops a probe replies, revealing itself. "* * *" means a hop did not reply, which is common and not always a fault.',
    whenToUse: 'When a remote host is unreachable or slow and you want to see where the problem starts.',
    syntax: [
      { token: 'traceroute', meaning: 'print the route packets take' },
      { token: 'example.com', meaning: 'destination' },
    ],
    sampleOutput: `traceroute to example.com (93.184.215.14), 30 hops max, 60 byte packets
 1  _gateway (192.0.2.1)  0.512 ms  0.488 ms  0.470 ms
 2  198.51.100.1 (198.51.100.1)  8.112 ms  8.097 ms  8.090 ms
 3  * * *
 4  203.0.113.65 (203.0.113.65)  14.902 ms  14.881 ms  14.870 ms
 5  93.184.215.14 (93.184.215.14)  15.330 ms  15.301 ms  15.297 ms`,
    mistakes: ['Typing tracert, which is the Windows command.', 'Treating a single non-responding hop as the failure point.'],
    requirements: 'Install the traceroute package on Debian and Ubuntu. tracepath is a common alternative. Sends network traffic.',
    recallPrompt: 'Show each router hop on the way to example.com.',
    accepted: ['tracepath example.com', 'mtr -r example.com'],
    related: ['linux.ping-c'],
    keywords: ['tracert linux', 'hops', 'path'],
    source: man('traceroute', 8),
  },
  {
    id: 'linux.dig',
    command: 'dig example.com',
    title: 'Query DNS with dig',
    category: 'dns',
    subcategory: 'Name resolution',
    difficulty: 'intermediate',
    objective: 'Look up DNS records and see which server answered.',
    summary: 'Asks your configured DNS server for the A record of example.com and prints the full response.',
    details: 'The ANSWER SECTION holds the records. "status: NOERROR" means the query succeeded. NXDOMAIN means the name does not exist. SERVER shows which resolver answered.',
    whenToUse: 'When a name does not resolve or resolves to the wrong address.',
    notice: 'Check status, the ANSWER SECTION, and the SERVER line.',
    syntax: [
      { token: 'dig', meaning: 'DNS lookup utility' },
      { token: 'example.com', meaning: 'name to look up; A record by default' },
    ],
    sampleOutput: `; <<>> DiG 9.18.28 <<>> example.com
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 41022
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1

;; QUESTION SECTION:
;example.com.			IN	A

;; ANSWER SECTION:
example.com.		3600	IN	A	93.184.215.14

;; Query time: 18 msec
;; SERVER: 127.0.0.53#53(127.0.0.53) (UDP)`,
    mistakes: ['Reading 127.0.0.53 as the real DNS server. On Ubuntu it is the local systemd-resolved stub.'],
    requirements: 'Install dnsutils on Debian and Ubuntu, or bind-utils on Fedora and RHEL. Sends a DNS query.',
    recallPrompt: 'Look up the A record for example.com and show the full DNS response.',
    accepted: ['dig example.com A', 'dig a example.com'],
    related: ['linux.dig-short', 'linux.nslookup', 'linux.resolvectl-status'],
    keywords: ['dns lookup', 'resolve name', 'dns query'],
    source: { label: 'BIND 9 dig manual', url: 'https://bind9.readthedocs.io/en/latest/manpages.html#dig-dns-lookup-utility' },
  },
  {
    id: 'linux.dig-short',
    command: 'dig +short MX example.com',
    title: 'Get just the DNS answer',
    category: 'dns',
    subcategory: 'Name resolution',
    difficulty: 'intermediate',
    objective: 'Query a specific record type and print only the answer.',
    summary: 'Prints only the mail exchanger (MX) records for example.com, without the headers.',
    whenToUse: 'In scripts, or when checking mail routing for a domain.',
    syntax: [
      { token: '+short', meaning: 'print answers only' },
      { token: 'MX', meaning: 'record type: mail exchanger' },
      { token: 'example.com', meaning: 'domain' },
    ],
    sampleOutput: '0 .',
    details: 'example.com publishes a "null MX" record, priority 0 and target ".", which states that the domain accepts no mail.',
    mistakes: ['Expecting +short output to explain an empty answer. Run without +short to see the status.'],
    requirements: 'dnsutils or bind-utils package. Sends a DNS query.',
    recallPrompt: 'Print only the MX records for example.com.',
    accepted: ['dig example.com MX +short', 'dig MX example.com +short', 'dig +short example.com MX'],
    related: ['linux.dig', 'linux.dig-server'],
    keywords: ['mx record', 'mail dns'],
    source: { label: 'BIND 9 dig manual', url: 'https://bind9.readthedocs.io/en/latest/manpages.html#dig-dns-lookup-utility' },
  },
  {
    id: 'linux.dig-server',
    command: 'dig @192.0.2.53 example.com',
    title: 'Query a specific DNS server',
    category: 'dns',
    subcategory: 'Name resolution',
    difficulty: 'advanced',
    objective: 'Compare answers from different DNS servers.',
    summary: 'Sends the query directly to the DNS server at 192.0.2.53 instead of the system default.',
    whenToUse: 'When you suspect one resolver is returning stale or wrong answers.',
    syntax: [
      { token: '@192.0.2.53', meaning: 'server to ask' },
      { token: 'example.com', meaning: 'name to look up' },
    ],
    sampleOutput: `;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 5120
;; ANSWER SECTION:
example.com.		1800	IN	A	93.184.215.14

;; SERVER: 192.0.2.53#53(192.0.2.53) (UDP)`,
    mistakes: ['Forgetting the @ sign, so dig treats the IP as a name to look up.'],
    requirements: 'dnsutils or bind-utils. Sends a DNS query to the named server.',
    recallPrompt: 'Ask the DNS server at 192.0.2.53 directly for example.com.',
    accepted: ['dig example.com @192.0.2.53'],
    related: ['linux.dig'],
    keywords: ['specific dns server', 'compare resolvers'],
    source: { label: 'BIND 9 dig manual', url: 'https://bind9.readthedocs.io/en/latest/manpages.html#dig-dns-lookup-utility' },
  },
  {
    id: 'linux.nslookup',
    command: 'nslookup example.com',
    title: 'Look up a name with nslookup',
    category: 'dns',
    subcategory: 'Name resolution',
    difficulty: 'beginner',
    objective: 'Resolve a name to an address with a tool that also exists on Windows.',
    summary: 'Shows which DNS server answered and the addresses for example.com.',
    whenToUse: 'For quick checks, especially when you switch between Linux and Windows.',
    syntax: [
      { token: 'nslookup', meaning: 'query name servers' },
      { token: 'example.com', meaning: 'name to look up' },
    ],
    sampleOutput: `Server:		127.0.0.53
Address:	127.0.0.53#53

Non-authoritative answer:
Name:	example.com
Address: 93.184.215.14`,
    mistakes: ['Reading "Non-authoritative answer" as an error. It means a resolver answered from cache or recursion.'],
    requirements: 'dnsutils or bind-utils. Sends a DNS query.',
    recallPrompt: 'Resolve example.com using the tool that exists on both Linux and Windows.',
    related: ['linux.dig', 'win.nslookup'],
    keywords: ['dns lookup', 'nslookup'],
    source: { label: 'BIND 9 nslookup manual', url: 'https://bind9.readthedocs.io/en/latest/manpages.html#nslookup-query-internet-name-servers-interactively' },
  },
  {
    id: 'linux.resolvectl-status',
    command: 'resolvectl status',
    title: 'Show DNS resolver configuration',
    category: 'dns',
    subcategory: 'Resolver configuration',
    difficulty: 'intermediate',
    objective: 'Find which DNS servers each interface actually uses.',
    summary: 'Shows systemd-resolved settings, including the DNS servers and search domains for each interface.',
    whenToUse: 'When names fail to resolve on Ubuntu or other systems using systemd-resolved.',
    notice: '/etc/resolv.conf often only points to 127.0.0.53. The real upstream servers are listed here.',
    syntax: [
      { token: 'resolvectl', meaning: 'control systemd-resolved' },
      { token: 'status', meaning: 'show global and per-link settings' },
    ],
    sampleOutput: `Global
       Protocols: -LLMNR -mDNS -DNSOverTLS DNSSEC=no/unsupported
resolv.conf mode: stub

Link 2 (enp0s3)
    Current Scopes: DNS
         Protocols: +DefaultRoute -LLMNR -mDNS -DNSOverTLS DNSSEC=no/unsupported
Current DNS Server: 192.0.2.53
       DNS Servers: 192.0.2.53 198.51.100.53
        DNS Domain: lab.example`,
    mistakes: ['Editing /etc/resolv.conf directly on systems where systemd-resolved manages it.'],
    requirements: 'Systems running systemd-resolved, such as Ubuntu.',
    recallPrompt: 'Show which DNS servers each interface is using through systemd-resolved.',
    accepted: ['systemd-resolve --status'],
    related: ['linux.dig', 'linux.cat-resolv'],
    keywords: ['dns servers', 'resolver', 'dns settings'],
    source: man('resolvectl'),
  },
  {
    id: 'linux.cat-resolv',
    command: 'cat /etc/resolv.conf',
    title: 'Read the resolver file',
    category: 'dns',
    subcategory: 'Resolver configuration',
    difficulty: 'beginner',
    objective: 'See the name servers and search domains programs read.',
    summary: 'Prints the resolver configuration file: name servers, search domains, and options.',
    whenToUse: 'On any Linux system when DNS behaves unexpectedly.',
    syntax: [
      { token: 'cat', meaning: 'print file' },
      { token: '/etc/resolv.conf', meaning: 'resolver configuration' },
    ],
    sampleOutput: `# This is /run/systemd/resolve/stub-resolv.conf managed by man:systemd-resolved(8).
nameserver 127.0.0.53
options edns0 trust-ad
search lab.example`,
    mistakes: ['Assuming 127.0.0.53 is broken. It is a local stub that forwards to the real servers.'],
    recallPrompt: 'Print the file that lists the name servers programs use.',
    related: ['linux.resolvectl-status'],
    keywords: ['resolv.conf', 'nameserver'],
    source: man('resolv.conf', 5),
  },
  {
    id: 'linux.cat-hosts',
    command: 'cat /etc/hosts',
    title: 'Check the local hosts file',
    category: 'dns',
    subcategory: 'Resolver configuration',
    difficulty: 'beginner',
    objective: 'Find static name overrides that bypass DNS.',
    summary: 'Prints /etc/hosts, a local list of names and addresses that is usually checked before DNS.',
    whenToUse: 'When one machine resolves a name differently from everyone else.',
    syntax: [
      { token: 'cat', meaning: 'print file' },
      { token: '/etc/hosts', meaning: 'static host table' },
    ],
    sampleOutput: `127.0.0.1	localhost
127.0.1.1	web01
192.0.2.80	app.lab.example app`,
    mistakes: ['Forgetting about an old test entry that overrides real DNS.'],
    recallPrompt: 'Print the local file of static name-to-address mappings.',
    related: ['linux.cat-resolv'],
    keywords: ['hosts file', 'static dns'],
    source: man('hosts', 5),
  },
  {
    id: 'linux.ss-tuln',
    command: 'ss -tuln',
    title: 'List listening ports',
    category: 'networking',
    subcategory: 'Ports and services',
    difficulty: 'intermediate',
    objective: 'See which TCP and UDP ports are open for incoming connections.',
    summary: 'Lists listening TCP and UDP sockets with numeric addresses and ports.',
    details: '0.0.0.0 or [::] in "Local Address" means the service listens on every interface. 127.0.0.1 means it only accepts local connections.',
    whenToUse: 'When checking whether a service is listening, or auditing which ports a server exposes.',
    notice: 'Check the Local Address:Port column and whether the address is loopback or all interfaces.',
    syntax: [
      { token: 'ss', meaning: 'socket statistics' },
      { token: '-t', meaning: 'TCP' },
      { token: '-u', meaning: 'UDP' },
      { token: '-l', meaning: 'listening sockets only' },
      { token: '-n', meaning: 'numeric, do not resolve names' },
    ],
    sampleOutput: `Netid State  Recv-Q Send-Q Local Address:Port  Peer Address:Port Process
udp   UNCONN 0      0      127.0.0.53%lo:53         0.0.0.0:*
tcp   LISTEN 0      4096   127.0.0.53%lo:53         0.0.0.0:*
tcp   LISTEN 0      128          0.0.0.0:22         0.0.0.0:*
tcp   LISTEN 0      511          0.0.0.0:80         0.0.0.0:*
tcp   LISTEN 0      244        127.0.0.1:5432       0.0.0.0:*
tcp   LISTEN 0      128             [::]:22            [::]:*`,
    mistakes: ['Forgetting -l and getting every connection instead of only listeners.', 'Using netstat, which may not be installed.'],
    recallPrompt: 'List all listening TCP and UDP ports with numeric addresses.',
    accepted: ['ss -lntu', 'ss -ltun', 'ss -tlnu', 'ss -nltu', 'ss -lnut', 'ss -utln'],
    related: ['linux.ss-tupn', 'linux.curl-i'],
    keywords: ['open ports', 'check open ports', 'listening ports', 'netstat linux'],
    source: man('ss', 8),
  },
  {
    id: 'linux.ss-tupn',
    command: 'sudo ss -tupn',
    title: 'Show connections with processes',
    category: 'networking',
    subcategory: 'Ports and services',
    difficulty: 'advanced',
    objective: 'Match each active network connection to the process that owns it.',
    summary: 'Lists established TCP and UDP connections with the program name and PID for each.',
    whenToUse: 'When investigating an unexpected outbound connection.',
    notice: 'The Process column shows users:(("name",pid=N,fd=N)). Root is needed to see other users\' processes.',
    syntax: [
      { token: '-t -u', meaning: 'TCP and UDP' },
      { token: '-p', meaning: 'show the owning process' },
      { token: '-n', meaning: 'numeric' },
    ],
    sampleOutput: `Netid State Recv-Q Send-Q   Local Address:Port    Peer Address:Port  Process
tcp   ESTAB 0      0          192.0.2.25:22    198.51.100.40:51522  users:(("sshd",pid=2299,fd=4))
tcp   ESTAB 0      0          192.0.2.25:44718  203.0.113.77:4444   users:(("python3",pid=3310,fd=3))
tcp   ESTAB 0      0          192.0.2.25:39012  192.0.2.80:443      users:(("curl",pid=3402,fd=5))`,
    mistakes: ['Running without sudo and seeing an empty Process column for other users.'],
    permissions: 'elevated',
    recallPrompt: 'With sudo, list active TCP and UDP connections and the processes that own them.',
    accepted: ['sudo ss -tunp', 'sudo ss -ptun', 'sudo ss -tpun', 'ss -tupn'],
    related: ['linux.ss-tuln', 'linux.ps-aux'],
    keywords: ['connections', 'which process', 'established connections'],
    source: man('ss', 8),
  },
  {
    id: 'linux.curl-i',
    command: 'curl -I https://example.com',
    title: 'Fetch HTTP headers',
    category: 'networking',
    subcategory: 'Network services',
    difficulty: 'intermediate',
    objective: 'Test a web service and read its status code and headers.',
    summary: 'Sends a HEAD request to https://example.com and prints the response status line and headers.',
    whenToUse: 'When checking whether a web service answers, redirects, or returns an error.',
    notice: 'The first line holds the status: 200 OK, 301 redirect, 404 not found, 5xx server errors.',
    syntax: [
      { token: 'curl', meaning: 'transfer data with URLs' },
      { token: '-I', meaning: 'HEAD request, headers only' },
      { token: 'https://example.com', meaning: 'URL' },
    ],
    sampleOutput: `HTTP/2 200
content-type: text/html
etag: "84238dfc8092e5d9c0dac8ef93371a07:1736799080.121134"
last-modified: Mon, 13 Jan 2025 20:11:20 GMT
cache-control: max-age=3058
date: Tue, 03 Mar 2026 09:22:10 GMT`,
    mistakes: ['Lowercase -i, which includes headers but also downloads the body.', 'Some servers handle HEAD differently from GET.'],
    requirements: 'Sends an HTTP request. curl is preinstalled on most distributions.',
    recallPrompt: 'Request only the HTTP response headers from https://example.com.',
    accepted: ['curl --head https://example.com'],
    related: ['linux.ss-tuln'],
    keywords: ['http headers', 'web check', 'status code'],
    source: { label: 'curl manual', url: 'https://curl.se/docs/manpage.html' },
  },
  {
    id: 'linux.nc-z',
    command: 'nc -zv 192.0.2.80 443',
    title: 'Test a TCP port',
    category: 'networking',
    subcategory: 'Connectivity testing',
    difficulty: 'intermediate',
    objective: 'Check whether one TCP port on one host accepts connections.',
    summary: 'Tries to open a TCP connection to port 443 on 192.0.2.80 and reports success or failure, without sending data.',
    whenToUse: 'When ping works but an application still cannot connect.',
    syntax: [
      { token: 'nc', meaning: 'netcat' },
      { token: '-z', meaning: 'scan mode: connect, send nothing' },
      { token: '-v', meaning: 'verbose result' },
      { token: '192.0.2.80 443', meaning: 'host and port' },
    ],
    sampleOutput: 'Connection to 192.0.2.80 443 port [tcp/https] succeeded!',
    mistakes: ['Pointing it at hosts you are not authorized to test.', 'Flag support differs between netcat variants.'],
    requirements: 'netcat-openbsd on Debian and Ubuntu, nmap-ncat on Fedora and RHEL. Test only systems you are authorized to test.',
    recallPrompt: 'Check whether TCP port 443 is open on 192.0.2.80 without sending any data.',
    accepted: ['nc -vz 192.0.2.80 443', 'nc -z -v 192.0.2.80 443'],
    related: ['ps.test-netconnection-port', 'linux.ss-tuln'],
    keywords: ['port test', 'test port', 'telnet port'],
    source: { label: 'nc(1) manual page, OpenBSD netcat', url: 'https://manpages.debian.org/stable/netcat-openbsd/nc.1.en.html' },
  },
  {
    id: 'linux.nmcli-device',
    command: 'nmcli device status',
    title: 'Show NetworkManager devices',
    category: 'networking',
    subcategory: 'NetworkManager',
    difficulty: 'beginner',
    objective: 'See each network device and whether NetworkManager has it connected.',
    summary: 'Lists devices with their type, state, and the connection profile applied to each.',
    whenToUse: 'On desktops and many servers that use NetworkManager, when a link is not coming up.',
    syntax: [
      { token: 'nmcli', meaning: 'NetworkManager command-line client' },
      { token: 'device status', meaning: 'list devices and their state' },
    ],
    sampleOutput: `DEVICE   TYPE      STATE                   CONNECTION
enp0s3   ethernet  connected               Wired connection 1
wlp2s0   wifi      disconnected            --
lo       loopback  connected (externally)  lo`,
    mistakes: ['Using nmcli on systems where NetworkManager is not running, such as some cloud images using netplan with networkd.'],
    requirements: 'Systems running NetworkManager.',
    recallPrompt: 'List network devices and their NetworkManager connection state.',
    accepted: ['nmcli dev status', 'nmcli d', 'nmcli device', 'nmcli d status'],
    related: ['linux.nmcli-connection'],
    keywords: ['networkmanager', 'wifi status'],
    source: man('nmcli'),
  },
  {
    id: 'linux.nmcli-connection',
    command: 'nmcli connection show',
    title: 'List connection profiles',
    category: 'networking',
    subcategory: 'NetworkManager',
    difficulty: 'intermediate',
    objective: 'See saved network profiles and which are active.',
    summary: 'Lists NetworkManager connection profiles with their UUID, type, and device.',
    whenToUse: 'Before changing settings, so you modify the right profile.',
    syntax: [
      { token: 'nmcli connection', meaning: 'connection profiles' },
      { token: 'show', meaning: 'list them' },
    ],
    sampleOutput: `NAME                UUID                                  TYPE      DEVICE
Wired connection 1  6f1c2d8e-91b2-4f0e-9a51-3d1d2b7e8c10  ethernet  enp0s3
lab-wifi            0d4a7c55-2e3f-4b8a-8f62-1a9b0c3d4e5f  wifi      --
lo                  a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d  loopback  lo`,
    mistakes: ['Confusing a connection profile with a device.'],
    requirements: 'Systems running NetworkManager.',
    recallPrompt: 'List the saved NetworkManager connection profiles.',
    accepted: ['nmcli con show', 'nmcli c show', 'nmcli connection', 'nmcli c'],
    related: ['linux.nmcli-device'],
    keywords: ['network profiles'],
    source: man('nmcli'),
  },
  {
    id: 'linux.tcpdump',
    command: 'sudo tcpdump -i enp0s3 -n port 53',
    title: 'Capture DNS packets',
    category: 'networking',
    subcategory: 'Packet analysis',
    difficulty: 'advanced',
    objective: 'Watch specific traffic on an interface to confirm what is really sent.',
    summary: 'Captures and prints packets on enp0s3 to or from port 53, the DNS port, without resolving names.',
    details: 'Packet capture can expose sensitive data. Capture only on networks you own or are authorized to monitor, and keep filters narrow.',
    whenToUse: 'When you need proof of whether DNS queries leave the host and whether replies come back.',
    syntax: [
      { token: 'tcpdump', meaning: 'packet capture tool' },
      { token: '-i enp0s3', meaning: 'interface' },
      { token: '-n', meaning: 'numeric, no name lookups' },
      { token: 'port 53', meaning: 'capture filter' },
    ],
    sampleOutput: `listening on enp0s3, link-type EN10MB (Ethernet), snapshot length 262144 bytes
09:23:01.102344 IP 192.0.2.25.48211 > 192.0.2.53.53: 31477+ A? example.com. (29)
09:23:01.120871 IP 192.0.2.53.53 > 192.0.2.25.48211: 31477 1/0/0 A 93.184.215.14 (45)`,
    mistakes: ['Capturing without a filter on a busy link.', 'Capturing on networks you are not authorized to monitor.'],
    permissions: 'elevated',
    safety: 'lab-only',
    requirements: 'tcpdump package and root. Authorized networks only.',
    recallPrompt: 'With sudo, capture DNS traffic on enp0s3 with numeric output.',
    accepted: ['sudo tcpdump -n -i enp0s3 port 53', 'sudo tcpdump -ni enp0s3 port 53'],
    related: ['linux.dig'],
    keywords: ['packet capture', 'sniff', 'wireshark'],
    source: { label: 'tcpdump manual', url: 'https://www.tcpdump.org/manpages/tcpdump.1.html' },
  },
])
