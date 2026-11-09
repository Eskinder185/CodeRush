import type { LearningPath, LearningModule } from '../types'
import { q } from './helpers'

type M = Omit<LearningModule, 'scenarioIds' | 'commandIds'> & { scenarioIds?: string[]; commandIds?: string[] }
const m = (x: M): LearningModule => ({ scenarioIds: [], commandIds: [], ...x })

export const networkingPath: LearningPath = {
  id: 'networking',
  title: 'Networking Fundamentals',
  tagline: 'From the OSI model to real troubleshooting.',
  description: 'A 24-module path for CCNA learners, help desk and network technicians, and security students. Concepts are paired with Windows, PowerShell, Linux, and Cisco IOS commands, a subnetting trainer, and an interactive topology.',
  difficulty: 'mixed',
  estimatedHours: 18,
  objectives: [
    'Explain how data moves through the OSI and TCP/IP models.',
    'Calculate subnets, gateways, and host ranges for IPv4.',
    'Describe switching, VLANs, routing, DNS, DHCP, NAT, and firewalls.',
    'Troubleshoot connectivity methodically with platform commands.',
  ],
  prerequisites: ['None. Comfort with a command line helps for the practice modules.'],
  accent: 'cyan',
  icon: 'network',
  completion: 'Score at least 50% on each module quiz and complete the troubleshooting scenarios.',
  modules: [
    m({
      id: 'net.fundamentals', title: 'Networking fundamentals', level: 'beginner',
      outcome: 'Describe what a network is and name the devices that build one.',
      summary: 'Hosts, links, switches, routers, and the internet.',
      concept: [
        'A network connects hosts, such as laptops and servers, so they can exchange data. Switches connect hosts inside one local network. Routers connect different networks together.',
        'The internet is a network of networks. Your traffic crosses many routers, each deciding the next hop toward the destination.',
      ],
      quiz: [
        q('nf-1', 'Which device connects different IP networks?', ['Switch', 'Router', 'Hub', 'Access point'], 1, 'Routers forward packets between networks.'),
        q('nf-2', 'Which device forwards frames within one local network using MAC addresses?', ['Router', 'Switch', 'Firewall', 'Modem'], 1, 'Switches learn MAC addresses and forward frames.'),
        q('nf-3', 'What is a host?', ['Any device that sends or receives data on the network', 'Only servers', 'Only routers', 'A cable'], 0, 'Laptops, phones, printers, and servers are all hosts.'),
      ],
      commandIds: ['win.hostname'],
      tools: ['topology'],
    }),
    m({
      id: 'net.osi', title: 'The OSI model', level: 'beginner',
      outcome: 'Name the seven OSI layers and place common problems on the right layer.',
      summary: 'Physical, Data Link, Network, Transport, Session, Presentation, Application.',
      concept: [
        'The OSI model splits networking into seven layers: 1 Physical, 2 Data Link, 3 Network, 4 Transport, 5 Session, 6 Presentation, 7 Application. Each layer relies on the one below it.',
        'Troubleshooters use it as a checklist. An unplugged cable is layer 1, a wrong VLAN is layer 2, a bad IP address or route is layer 3, a blocked port is layer 4, and a broken web page is layer 7.',
      ],
      quiz: [
        q('nosi-1', 'Which layer handles IP addressing and routing?', ['Layer 2', 'Layer 3', 'Layer 4', 'Layer 7'], 1, 'The Network layer is layer 3.'),
        q('nosi-2', 'At which layer do switches mainly operate?', ['Layer 1', 'Layer 2', 'Layer 3', 'Layer 4'], 1, 'Switches forward frames by MAC address at layer 2.'),
        q('nosi-3', 'TCP and UDP belong to which layer?', ['Network', 'Transport', 'Session', 'Application'], 1, 'Transport is layer 4.'),
      ],
    }),
    m({
      id: 'net.tcpip', title: 'The TCP/IP model', level: 'beginner',
      outcome: 'Map the four TCP/IP layers to the OSI model and to real protocols.',
      summary: 'Link, Internet, Transport, and Application.',
      concept: [
        'The TCP/IP model is what the internet actually implements. It has four layers: Link (Ethernet, Wi-Fi), Internet (IP), Transport (TCP, UDP), and Application (HTTP, DNS, SSH).',
        'Each layer wraps the data from the layer above, a process called encapsulation. A web request is HTTP inside TCP inside IP inside an Ethernet frame.',
      ],
      quiz: [
        q('ntcp-1', 'Which TCP/IP layer contains HTTP and DNS?', ['Link', 'Internet', 'Transport', 'Application'], 3, 'They are application protocols.'),
        q('ntcp-2', 'What is encapsulation?', ['Encrypting data', 'Wrapping data with each layer\'s header', 'Compressing packets', 'Splitting networks'], 1, 'Each layer adds its own header.'),
      ],
    }),
    m({
      id: 'net.ethernet', title: 'Ethernet and MAC addresses', level: 'beginner',
      outcome: 'Read MAC addresses and explain how switches learn them.',
      summary: 'Frames, MAC addresses, and the switch MAC table.',
      concept: [
        'A MAC address is a 48-bit hardware address, written like 8C-16-45-2A-91-0E. Ethernet frames carry a source and destination MAC.',
        'A switch learns which port each source MAC lives on and forwards frames only to the right port. Unknown destinations are flooded to all ports in the VLAN.',
      ],
      commandIds: ['win.getmac', 'win.arp-a', 'linux.ip-link-show', 'ios.show-mac-address-table'],
      quiz: [
        q('neth-1', 'How long is a MAC address?', ['32 bits', '48 bits', '64 bits', '128 bits'], 1, '48 bits, shown as 12 hexadecimal digits.'),
        q('neth-2', 'What does a switch do with a frame for an unknown MAC?', ['Drops it', 'Floods it to all ports in the VLAN except the source', 'Sends it to the router', 'Returns it'], 1, 'Unknown unicast is flooded.'),
      ],
    }),
    m({
      id: 'net.ipv4', title: 'IPv4 addressing', level: 'beginner',
      outcome: 'Read an IPv4 address with its prefix and recognize special ranges.',
      summary: 'Dotted decimal, prefixes, private and reserved ranges.',
      concept: [
        'An IPv4 address is 32 bits written as four decimal octets, such as 192.0.2.57. The prefix, such as /24, says how many leading bits identify the network.',
        'Private ranges (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) are used inside organizations. 127.0.0.0/8 is loopback, 169.254.0.0/16 is link-local, and 192.0.2.0/24, 198.51.100.0/24, and 203.0.113.0/24 are reserved for documentation, which is why CodeRush uses them.',
      ],
      commandIds: ['win.ipconfig', 'win.netsh-ipv4-config', 'linux.ip-addr-show', 'ps.get-netipaddress'],
      quiz: [
        q('nip4-1', 'Which address is private?', ['8.8.8.8', '172.20.4.1', '203.0.113.9', '93.184.215.14'], 1, '172.16.0.0/12 covers 172.16 to 172.31.'),
        q('nip4-2', 'In 192.0.2.57/24, how many bits identify the network?', ['8', '16', '24', '32'], 2, 'The prefix length is 24.'),
        q('nip4-3', 'What does a 169.254.x.x address on Windows usually mean?', ['Static IP', 'DHCP failed', 'Public IP', 'VPN'], 1, 'It is a self-assigned link-local address.'),
      ],
      tools: ['subnetting'],
    }),
    m({
      id: 'net.ipv6', title: 'IPv6 fundamentals', level: 'intermediate',
      outcome: 'Read IPv6 addresses and recognize link-local, global, and documentation prefixes.',
      summary: '128-bit addresses, shortening rules, and address types.',
      concept: [
        'IPv6 addresses are 128 bits, written as eight groups of four hex digits. Leading zeros in a group can be dropped, and one run of all-zero groups can be replaced with ::.',
        'fe80::/10 is link-local and exists on every IPv6 interface. 2000::/3 is global unicast. 2001:db8::/32 is reserved for documentation. Most LANs use /64 subnets.',
      ],
      quiz: [
        q('nip6-1', 'How many times may :: appear in one address?', ['Never', 'Once', 'Twice', 'Unlimited'], 1, 'More than once would be ambiguous.'),
        q('nip6-2', 'Which prefix is link-local?', ['2001:db8::/32', 'fe80::/10', 'ff00::/8', '::1/128'], 1, 'fe80::/10 is link-local. ff00::/8 is multicast and ::1 is loopback.'),
      ],
    }),
    m({
      id: 'net.subnetting', title: 'Subnetting', level: 'intermediate',
      outcome: 'Calculate network, broadcast, host range, and host count for any IPv4 prefix.',
      summary: 'Masks, block sizes, and the subnetting trainer.',
      concept: [
        'A subnet mask marks the network bits with 1s. /26 is 255.255.255.192. The remaining host bits decide the size: 2 to the power of host bits addresses, minus 2 for the network and broadcast addresses.',
        'The quick method is the block size: 256 minus the interesting mask octet. For /26 that is 64, so subnets start at .0, .64, .128, and .192.',
      ],
      quiz: [
        q('nsub-1', 'How many usable hosts are in a /26?', ['64', '62', '30', '126'], 1, '2^6 = 64 addresses, minus network and broadcast.'),
        q('nsub-2', 'What is the mask for /27?', ['255.255.255.224', '255.255.255.240', '255.255.255.192', '255.255.255.248'], 0, '27 bits: the last octet is 11100000 = 224.'),
        q('nsub-3', 'What is the broadcast address of 192.0.2.70/26?', ['192.0.2.63', '192.0.2.127', '192.0.2.255', '192.0.2.71'], 1, 'Block size 64: .64 to .127.'),
      ],
      tools: ['subnetting'],
    }),
    m({
      id: 'net.gateways', title: 'Default gateways', level: 'beginner',
      outcome: 'Explain when a host uses its gateway and find the gateway on any platform.',
      summary: 'Local versus remote destinations.',
      concept: [
        'A host compares the destination with its own subnet. If the destination is local, it sends directly. If not, it sends the packet to its default gateway, a router on the local subnet.',
        'A wrong or missing gateway gives a classic symptom: local hosts work, everything else fails.',
      ],
      commandIds: ['win.route-print', 'linux.ip-route-show', 'ps.get-netroute-default'],
      quiz: [
        q('ngw-1', 'A host can reach its subnet but nothing else. What is the likely cause?', ['Bad cable', 'Missing or wrong default gateway', 'DNS failure', 'Full disk'], 1, 'Off-subnet traffic depends on the gateway.'),
        q('ngw-2', 'Must the default gateway be on the host\'s own subnet?', ['No', 'Yes', 'Only for IPv6', 'Only on Linux'], 1, 'The host must reach it directly.'),
      ],
      scenarioIds: ['sc.net.linux-gateway'],
    }),
    m({
      id: 'net.switching', title: 'Switching concepts', level: 'intermediate',
      outcome: 'Describe MAC learning, forwarding, and why loops are dangerous.',
      summary: 'MAC tables, flooding, and loop prevention.',
      concept: [
        'Switches build a MAC address table from the source address of each frame. Broadcasts go to every port in the VLAN.',
        'Redundant links between switches can create loops where broadcasts circulate forever. Spanning Tree Protocol blocks redundant paths until they are needed.',
      ],
      commandIds: ['ios.show-mac-address-table', 'ios.show-interfaces-status'],
      quiz: [
        q('nsw-1', 'Which address does a switch learn from each incoming frame?', ['Destination IP', 'Source MAC', 'Destination port', 'Gateway'], 1, 'Source MAC addresses populate the table.'),
        q('nsw-2', 'What does Spanning Tree Protocol prevent?', ['Duplicate IPs', 'Layer 2 loops', 'DNS failures', 'Slow DHCP'], 1, 'STP blocks redundant paths.'),
      ],
      tools: ['topology'],
    }),
    m({
      id: 'net.vlans', title: 'VLAN fundamentals', level: 'intermediate',
      outcome: 'Explain access and trunk ports and diagnose VLAN mismatches.',
      summary: 'VLANs, 802.1Q tagging, and allowed lists.',
      concept: [
        'A VLAN splits one switch into separate layer 2 networks. Access ports belong to one VLAN. Trunk ports carry several VLANs between switches, tagged with 802.1Q.',
        'A VLAN must be allowed on every trunk along the path. Missing VLANs on a trunk cause "works on one floor, not the other" problems.',
      ],
      commandIds: ['ios.show-vlan-brief', 'ios.show-interfaces-trunk'],
      quiz: [
        q('nvl-1', 'Which port type carries several VLANs?', ['Access', 'Trunk', 'Console', 'Loopback'], 1, 'Trunks tag frames with the VLAN ID.'),
        q('nvl-2', 'Do devices in different VLANs talk directly at layer 2?', ['Yes', 'No, they need a router or layer 3 switch', 'Only on trunks', 'Only with DHCP'], 1, 'VLANs are separate broadcast domains.'),
      ],
      scenarioIds: ['sc.ios.vlan-trunk'],
      tools: ['topology'],
    }),
    m({
      id: 'net.routing', title: 'Routing concepts', level: 'intermediate',
      outcome: 'Read a routing table and explain longest-prefix match.',
      summary: 'Connected, static, and dynamic routes.',
      concept: [
        'Routers choose the most specific matching route, called longest-prefix match. A /24 route beats a /16, and anything beats the default 0.0.0.0/0.',
        'Routes come from connected interfaces, static configuration, or dynamic protocols such as OSPF. Administrative distance breaks ties between sources.',
      ],
      commandIds: ['ios.show-ip-route', 'ios.show-ip-protocols', 'linux.ip-route-get'],
      quiz: [
        q('nrt-1', 'Routes exist for 10.0.0.0/8 and 10.1.2.0/24. Which is used for 10.1.2.9?', ['10.0.0.0/8', '10.1.2.0/24', 'Both', 'The default route'], 1, 'Longest prefix wins.'),
        q('nrt-2', 'In show ip route, what does C mean?', ['Cisco', 'Connected', 'Candidate', 'Cached'], 1, 'C is a directly connected network.'),
      ],
      scenarioIds: ['sc.ios.no-route'],
      tools: ['topology'],
    }),
    m({
      id: 'net.static', title: 'Static routes', level: 'intermediate',
      outcome: 'Read static routes and recognize common mistakes.',
      summary: 'Manually configured paths and default routes.',
      concept: [
        'A static route tells a router or host exactly where to send traffic for a network. A static default route, 0.0.0.0/0, is common at branch sites.',
        'A typo in a static next hop sends traffic into a void. Static routes never adapt to failures by themselves.',
      ],
      commandIds: ['ios.show-ip-route', 'ios.show-running-config'],
      quiz: [
        q('nst-1', 'What does "ip route 0.0.0.0 0.0.0.0 198.51.100.1" configure?', ['A host route', 'A static default route', 'A DHCP pool', 'An ACL'], 1, '0.0.0.0/0 is the default.'),
      ],
      scenarioIds: ['sc.net.linux-gateway'],
    }),
    m({
      id: 'net.dns', title: 'DNS', level: 'beginner',
      outcome: 'Explain name resolution and test it on Windows and Linux.',
      summary: 'Records, resolvers, caching, and TTL.',
      concept: [
        'DNS translates names into addresses. A client asks a recursive resolver, which finds the answer from authoritative servers and caches it for the record\'s TTL.',
        'Common records: A (IPv4), AAAA (IPv6), CNAME (alias), MX (mail), TXT (text, often for verification). If an IP works but a name does not, suspect DNS.',
      ],
      commandIds: ['win.nslookup', 'ps.resolve-dnsname', 'linux.dig', 'win.ipconfig-displaydns', 'win.ipconfig-flushdns'],
      quiz: [
        q('ndns-1', 'Which record maps a name to an IPv6 address?', ['A', 'AAAA', 'MX', 'PTR'], 1, 'AAAA is IPv6.'),
        q('ndns-2', 'What does TTL control?', ['How many hops a query takes', 'How long an answer may be cached', 'The record size', 'Encryption'], 1, 'Time to live is the cache lifetime.'),
        q('ndns-3', 'Which UDP port does DNS normally use?', ['25', '53', '80', '443'], 1, 'DNS uses port 53, over UDP and TCP.'),
      ],
      scenarioIds: ['sc.net.bottom-up'],
    }),
    m({
      id: 'net.dhcp', title: 'DHCP', level: 'beginner',
      outcome: 'Describe how hosts get addresses automatically and fix lease problems.',
      summary: 'Discover, Offer, Request, Acknowledge.',
      concept: [
        'DHCP hands out addresses, masks, gateways, and DNS servers. The exchange is Discover, Offer, Request, Acknowledge, often remembered as DORA.',
        'DHCP discovery uses broadcasts, which routers do not forward. Networks with central DHCP servers use a relay on each VLAN.',
      ],
      commandIds: ['win.ipconfig-all', 'win.ipconfig-renew'],
      quiz: [
        q('ndh-1', 'What is the first DHCP message from a client?', ['Request', 'Offer', 'Discover', 'Acknowledge'], 2, 'D for Discover.'),
        q('ndh-2', 'Why is a DHCP relay needed?', ['To encrypt leases', 'Because routers do not forward broadcasts', 'To speed up DNS', 'To assign MACs'], 1, 'The relay forwards requests to the server.'),
      ],
      scenarioIds: ['sc.net.dhcp-renew', 'sc.ps.no-ip'],
    }),
    m({
      id: 'net.tcpudp', title: 'TCP and UDP', level: 'intermediate',
      outcome: 'Compare TCP and UDP and read connection tables.',
      summary: 'Connections, ports, and states.',
      concept: [
        'TCP sets up a connection with a three-way handshake (SYN, SYN-ACK, ACK), retransmits lost data, and delivers it in order. UDP sends independent datagrams with no handshake.',
        'Ports identify services: a connection is defined by source IP, source port, destination IP, and destination port. LISTEN means a service is waiting for connections.',
      ],
      commandIds: ['win.netstat-ano', 'ps.get-nettcpconnection-listen', 'ps.get-netudpendpoint', 'linux.ss-tuln'],
      quiz: [
        q('ntu-1', 'Which protocol uses a three-way handshake?', ['UDP', 'TCP', 'ICMP', 'ARP'], 1, 'SYN, SYN-ACK, ACK.'),
        q('ntu-2', 'Which suits live voice better, TCP or UDP?', ['TCP, because it retransmits', 'UDP, because late data is useless and retransmission adds delay', 'Neither', 'Both equally'], 1, 'Real-time media prefers UDP.'),
      ],
    }),
    m({
      id: 'net.nat', title: 'NAT', level: 'intermediate',
      outcome: 'Explain how private networks share public addresses.',
      summary: 'Source NAT, port address translation, and port forwarding.',
      concept: [
        'Network Address Translation rewrites addresses as packets cross a router. Port Address Translation (PAT) lets many private hosts share one public address by tracking source ports.',
        'Inbound connections need an explicit port forward, because the router does not know which inside host should receive them.',
      ],
      quiz: [
        q('nnat-1', 'Why can many home devices share one public IP?', ['DHCP', 'Port address translation', 'DNS', 'VLANs'], 1, 'PAT tracks each flow by port.'),
        q('nnat-2', 'Why does an inside web server need port forwarding?', ['To get an IP', 'So the router knows where to send unsolicited inbound connections', 'To use HTTPS', 'For DNS'], 1, 'Inbound flows have no existing translation.'),
      ],
    }),
    m({
      id: 'net.firewalls', title: 'Firewalls and ACLs', level: 'intermediate',
      outcome: 'Read firewall rules and ACLs and predict what traffic passes.',
      summary: 'Stateful firewalls, ACL order, and implicit deny.',
      concept: [
        'A stateful firewall tracks connections and lets replies back in automatically. ACLs on routers are evaluated top to bottom, and the first match wins.',
        'Every Cisco ACL ends with an invisible "deny any". Host firewalls on Windows and Linux add a second layer on each machine.',
      ],
      commandIds: ['ios.show-access-lists', 'ps.get-netfirewallprofile', 'linux.ufw-status'],
      quiz: [
        q('nfw-1', 'How are ACL entries evaluated?', ['All at once', 'Top to bottom, first match wins', 'Bottom to top', 'Most specific first'], 1, 'Order matters.'),
        q('nfw-2', 'What happens to traffic that matches no ACL entry?', ['Permitted', 'Denied by the implicit deny', 'Logged only', 'Sent to the CPU'], 1, 'Every ACL ends with an implicit deny.'),
      ],
      scenarioIds: ['sc.sec.firewall-review'],
    }),
    m({
      id: 'net.vpn', title: 'VPN concepts', level: 'intermediate',
      outcome: 'Explain site-to-site and remote access VPNs and their routing effects.',
      summary: 'Tunnels, split tunneling, and overlapping ranges.',
      concept: [
        'A VPN carries private traffic inside an encrypted tunnel across an untrusted network. Site-to-site VPNs link offices. Remote access VPNs connect individual devices.',
        'A VPN adds routes. Full tunnels send everything through the VPN. Split tunnels send only corporate networks. Overlapping address ranges cause routing conflicts.',
      ],
      quiz: [
        q('nvpn-1', 'In a split tunnel, which traffic uses the VPN?', ['All traffic', 'Only traffic to networks routed into the tunnel', 'Only DNS', 'None'], 1, 'Other traffic uses the local connection.'),
      ],
      scenarioIds: ['sc.net.wrong-route'],
    }),
    m({
      id: 'net.ports', title: 'Common ports and protocols', level: 'beginner',
      outcome: 'Recognize the well-known ports you will see in every connection table.',
      summary: '22, 25, 53, 80, 443, 445, 3389, and more.',
      concept: [
        'Some ports are worth memorizing: 22 SSH, 25 SMTP, 53 DNS, 67/68 DHCP, 80 HTTP, 123 NTP, 143 IMAP, 443 HTTPS, 445 SMB, 3389 RDP, 5985/5986 WinRM.',
        'A port number suggests a service but does not prove it. Anything can listen on any port.',
      ],
      quiz: [
        q('nport-1', 'Which port does RDP use?', ['22', '443', '3389', '5985'], 2, 'Remote Desktop uses TCP 3389.'),
        q('nport-2', 'Which port is SSH?', ['21', '22', '23', '25'], 1, '22 is SSH. 23 is Telnet.'),
        q('nport-3', 'Which port is SMB file sharing?', ['139 only', '445', '8080', '161'], 1, 'Modern SMB uses TCP 445.'),
      ],
    }),
    m({
      id: 'net.wireless', title: 'Wireless fundamentals', level: 'beginner',
      outcome: 'Read Wi-Fi signal, band, and security details.',
      summary: 'Bands, channels, signal strength, and WPA.',
      concept: [
        '2.4 GHz reaches farther but has few non-overlapping channels and more interference. 5 GHz and 6 GHz are faster with more channels but shorter range.',
        'Use WPA3 or WPA2 with AES. Weak signal causes low data rates and retransmissions, which feel like a slow network.',
      ],
      commandIds: ['win.netsh-wlan'],
      quiz: [
        q('nwl-1', 'Which band generally has longer range?', ['2.4 GHz', '5 GHz', '6 GHz', 'They are equal'], 0, 'Lower frequencies travel farther.'),
        q('nwl-2', 'Which Wi-Fi security is current best practice?', ['WEP', 'WPA', 'WPA3', 'Open'], 2, 'WPA3, or WPA2-AES where WPA3 is unavailable.'),
      ],
    }),
    m({
      id: 'net.diagnostics', title: 'Network diagnostics', level: 'intermediate',
      outcome: 'Pick the right diagnostic tool for each layer.',
      summary: 'ping, tracert, pathping, and port tests.',
      concept: [
        'ping tests reachability, tracert shows the path, pathping measures loss per hop, and a TCP port test proves a specific service answers.',
        'Loss that appears at one hop and continues to every later hop points at that link. Loss at a single middle hop only is often ICMP rate limiting.',
      ],
      commandIds: ['win.ping', 'win.tracert', 'win.pathping', 'ps.test-netconnection-port', 'linux.nc-z'],
      quiz: [
        q('ndg-1', 'Which tool measures per-hop loss over time on Windows?', ['ping', 'tracert', 'pathping', 'arp'], 2, 'pathping combines trace and loss statistics.'),
        q('ndg-2', 'A middle hop shows "* * *" but later hops reply. Is that hop broken?', ['Yes', 'Not necessarily, it may just not answer ICMP', 'Always', 'Only on Linux'], 1, 'Routers often deprioritize ICMP replies.'),
      ],
      scenarioIds: ['sc.net.packet-loss'],
    }),
    m({
      id: 'net.troubleshooting', title: 'Connectivity troubleshooting', level: 'intermediate',
      outcome: 'Apply a layered method to any "it does not connect" problem.',
      summary: 'Bottom-up troubleshooting.',
      concept: [
        'A reliable order: link, address, gateway, remote IP, DNS, port, application. Each check either passes, so you move up, or fails, so you dig in.',
        'Write down what each test proved. "Ping to gateway works" rules out the cable, VLAN, and address in one step.',
      ],
      quiz: [
        q('ntr-1', 'Ping to 8.8.8.8 works but names do not resolve. Which layer do you investigate?', ['Physical', 'Routing', 'DNS', 'Application'], 2, 'IP connectivity is fine. Names fail.'),
      ],
      scenarioIds: ['sc.net.bottom-up', 'sc.ps.no-ip', 'sc.net.linux-gateway'],
    }),
    m({
      id: 'net.monitoring', title: 'Security monitoring concepts', level: 'intermediate',
      outcome: 'Tie suspicious network activity to hosts and processes.',
      summary: 'Connections, processes, and packet capture.',
      concept: [
        'Monitoring starts with visibility: which hosts talk to which destinations, on which ports, and which process owns each connection.',
        'Packet capture gives the most detail and the most sensitive data. Capture only where you are authorized and keep filters tight.',
      ],
      commandIds: ['win.netstat-ano', 'win.tasklist-pid', 'linux.tcpdump'],
      quiz: [
        q('nmon-1', 'netstat -ano shows a connection with PID 4821. What is the next step?', ['Block the port', 'Identify the process with tasklist or Get-Process', 'Reboot', 'Ignore it'], 1, 'Turn the PID into a program first.'),
      ],
      scenarioIds: ['sc.net.which-process-port'],
    }),
    m({
      id: 'net.challenges', title: 'Real-world troubleshooting challenges', level: 'advanced',
      outcome: 'Solve tickets that span hosts, switches, routers, and VPNs.',
      summary: 'Mixed, multi-device scenarios.',
      concept: ['These tickets mix Windows, Linux, and Cisco IOS evidence. Use the layered method and confirm before recommending a change.'],
      quiz: [
        q('nch-1', 'A VLAN works on one switch but not across the uplink. What do you check?', ['DNS', 'The trunk allowed VLAN list', 'The PC firewall', 'NTP'], 1, 'The VLAN must be allowed on the trunk.'),
      ],
      scenarioIds: ['sc.ios.port-down', 'sc.ios.find-device', 'sc.net.wrong-route', 'sc.net.packet-loss'],
      tools: ['topology'],
    }),
  ],
}

export const ciscoPath: LearningPath = {
  id: 'cisco-ios',
  title: 'Cisco IOS Essentials',
  tagline: 'Vendor-specific: observe before you configure.',
  description: 'A clearly labelled vendor track using Cisco IOS-style commands on simulated devices. You will learn to read interfaces, VLANs, routes, and ACLs, and understand the difference between observing and modifying a configuration.',
  difficulty: 'intermediate',
  estimatedHours: 5,
  objectives: [
    'Read device, interface, VLAN, and routing information with show commands.',
    'Use IOS abbreviations confidently.',
    'Explain running versus startup configuration.',
    'Trace a host from IP to MAC to switch port.',
  ],
  prerequisites: ['Networking Fundamentals: OSI, IPv4, switching, VLANs, and routing modules.'],
  accent: 'amber',
  icon: 'router',
  completion: 'Complete each module quiz and the Cisco scenarios.',
  modules: [
    m({
      id: 'ios.basics', title: 'Device basics and configuration', level: 'beginner',
      outcome: 'Identify a device and tell running and startup configuration apart.',
      summary: 'show version, running-config, startup-config, and saving.',
      concept: [
        'IOS has modes. User EXEC (Router>) is for basic checks. Privileged EXEC (Router#) allows every show command. Global configuration (Router(config)#) changes the device.',
        'show commands observe. Configuration commands modify. Changes apply to the running-config immediately and survive a reboot only when copied to the startup-config.',
      ],
      commandIds: ['ios.show-version', 'ios.show-running-config', 'ios.show-startup-config', 'ios.copy-run-start'],
      quiz: [
        q('iosb-1', 'Which prompt is privileged EXEC mode?', ['Router>', 'Router#', 'Router(config)#', 'Router$'], 1, '# indicates privileged EXEC.'),
        q('iosb-2', 'A change works but disappears after reboot. Why?', ['IOS bug', 'It was not saved to the startup-config', 'The device is in user mode', 'NVRAM is full'], 1, 'Save with copy running-config startup-config.'),
      ],
    }),
    m({
      id: 'ios.interfaces', title: 'Interfaces and neighbors', level: 'beginner',
      outcome: 'Read interface status, counters, and connected neighbors.',
      summary: 'show ip interface brief, show interfaces, and CDP.',
      concept: [
        'show ip interface brief is the fastest overview. Status is layer 1, Protocol is layer 2. "administratively down" means the interface was shut down in configuration.',
        'Rising CRC or input errors point to cabling or duplex problems.',
      ],
      commandIds: ['ios.show-ip-int-brief', 'ios.show-interfaces', 'ios.show-cdp-neighbors'],
      quiz: [
        q('iosi-1', 'What does "administratively down" mean?', ['Cable unplugged', 'Interface disabled with shutdown', 'Duplex mismatch', 'No IP'], 1, 'Someone configured shutdown.'),
        q('iosi-2', 'Which abbreviation does IOS accept for show ip interface brief?', ['s i i b', 'sh ip int br', 'show-ipib', 'sib'], 1, 'Each word needs enough letters to be unique.'),
      ],
    }),
    m({
      id: 'ios.switching', title: 'Switching and VLANs', level: 'intermediate',
      outcome: 'Check port status, VLAN membership, trunks, and the MAC table.',
      summary: 'show interfaces status, show vlan brief, trunks, and MAC tables.',
      concept: [
        'Access ports appear in show vlan brief. Trunk ports appear in show interfaces trunk, with the VLANs allowed on each.',
        'The MAC address table tells you which port a device is on.',
      ],
      commandIds: ['ios.show-interfaces-status', 'ios.show-vlan-brief', 'ios.show-interfaces-trunk', 'ios.show-mac-address-table'],
      quiz: [
        q('ioss-1', 'Why does a trunk port not appear in show vlan brief?', ['It is down', 'The command lists access ports only', 'Trunks have no VLANs', 'It is a bug'], 1, 'Use show interfaces trunk.'),
        q('ioss-2', 'A port shows err-disabled. What happened?', ['No cable', 'The switch disabled it for a policy violation', 'It is a trunk', 'It is in VLAN 1'], 1, 'Port security or BPDU guard, for example.'),
      ],
      scenarioIds: ['sc.ios.port-down', 'sc.ios.vlan-trunk'],
      tools: ['topology'],
    }),
    m({
      id: 'ios.routing', title: 'Routing and diagnostics', level: 'intermediate',
      outcome: 'Read routing tables and protocol status, and test from the device.',
      summary: 'show ip route, show ip protocols, ARP, ping, and traceroute.',
      concept: [
        'show ip route lists every route with its source code. show ip protocols explains why dynamic routes are, or are not, being learned.',
        'Ping and traceroute from the router separate problems on the user side from problems beyond the router.',
      ],
      commandIds: ['ios.show-ip-route', 'ios.show-ip-protocols', 'ios.show-arp', 'ios.ping', 'ios.traceroute'],
      quiz: [
        q('iosr-1', 'Ping output ".!!!!" means what?', ['Total failure', 'First packet timed out, often for ARP, then four replies', 'Four timeouts', 'Packet loss of 80%'], 1, '! is a reply and . is a timeout.'),
        q('iosr-2', 'In [110/2], what is 110?', ['Metric', 'Administrative distance', 'Hop count', 'Port'], 1, '110 is the OSPF administrative distance.'),
      ],
      scenarioIds: ['sc.ios.no-route', 'sc.ios.find-device'],
      tools: ['topology'],
    }),
    m({
      id: 'ios.security', title: 'Access control lists', level: 'advanced',
      outcome: 'Read ACL entries and hit counters, and reason about first match and implicit deny.',
      summary: 'show access-lists.',
      concept: [
        'ACL hit counters show which entries actually match traffic. An entry with zero matches may be unnecessary or misordered.',
        'Remember the invisible deny at the end of every ACL.',
      ],
      commandIds: ['ios.show-access-lists'],
      quiz: [
        q('iosa-1', 'An ACL has "permit tcp any host 192.0.2.80 eq 443" and nothing else. Is SSH to 192.0.2.80 allowed?', ['Yes', 'No, the implicit deny blocks it', 'Only from inside', 'Only with logging'], 1, 'Only HTTPS matches a permit.'),
      ],
    }),
  ],
}
