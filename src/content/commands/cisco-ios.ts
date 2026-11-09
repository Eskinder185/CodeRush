import { define, ios } from './helpers'

/**
 * Cisco IOS-style commands on simulated devices. This is a vendor-specific track.
 * show commands observe; configuration commands change the running configuration and are lab-only.
 * IOS accepts unique abbreviations, for example "sh ip int br", which the simulator understands.
 */
export const ciscoIos = define('cisco-ios', [
  {
    id: 'ios.show-ip-int-brief',
    command: 'show ip interface brief',
    title: 'Summarize interfaces and addresses',
    category: 'device',
    subcategory: 'Interfaces',
    difficulty: 'beginner',
    objective: 'See every interface, its IP address, and its status in one table.',
    summary: 'Lists each interface with its IP address and its layer 1 and layer 2 status.',
    whenToUse: 'The first command on almost any router or switch you troubleshoot.',
    notice: '"Status" is layer 1, "Protocol" is layer 2. "administratively down" means someone shut the interface.',
    syntax: [
      { token: 'show', meaning: 'display, from privileged EXEC mode' },
      { token: 'ip interface', meaning: 'IP information for interfaces' },
      { token: 'brief', meaning: 'one line per interface' },
    ],
    sampleOutput: `Interface              IP-Address      OK? Method Status                Protocol
GigabitEthernet0/0     192.0.2.1       YES NVRAM  up                    up
GigabitEthernet0/1     198.51.100.2    YES NVRAM  up                    up
GigabitEthernet0/2     unassigned      YES NVRAM  administratively down down
Loopback0              10.255.0.1      YES NVRAM  up                    up`,
    mistakes: ['Reading "up/down" as healthy. Protocol down usually means a layer 2 problem such as an encapsulation mismatch.'],
    recallPrompt: 'Show a one-line summary of every interface with its IP address and status.',
    accepted: ['sh ip int br', 'sh ip int brief', 'show ip int brief', 'show ip int br'],
    related: ['ios.show-interfaces', 'ios.show-ip-route'],
    keywords: ['interface status', 'ip interface brief', 'router interfaces'],
    source: ios('show ip interface'),
  },
  {
    id: 'ios.show-interfaces-status',
    command: 'show interfaces status',
    title: 'Show switch port status',
    category: 'device',
    subcategory: 'Switching',
    difficulty: 'beginner',
    objective: 'See every switch port with its VLAN, duplex, and speed.',
    summary: 'Lists switch ports with description, connection status, VLAN, duplex, speed, and type.',
    whenToUse: 'When a user says their wired connection does not work.',
    notice: '"err-disabled" means the switch shut the port for a policy reason, such as port security.',
    syntax: [
      { token: 'show interfaces', meaning: 'interface information' },
      { token: 'status', meaning: 'port summary, on Catalyst switches' },
    ],
    sampleOutput: `Port      Name               Status       Vlan       Duplex  Speed Type
Gi1/0/1   Uplink-Core        connected    trunk      a-full a-1000 10/100/1000BaseTX
Gi1/0/2   Desk-114           connected    10         a-full  a-100 10/100/1000BaseTX
Gi1/0/3   Desk-115           notconnect   10           auto   auto 10/100/1000BaseTX
Gi1/0/4   Printer-2F         err-disabled 20           auto   auto 10/100/1000BaseTX`,
    mistakes: ['Running it on a router, where the command may not exist.'],
    requirements: 'Cisco Catalyst switches.',
    recallPrompt: 'Show every switch port with its status, VLAN, duplex, and speed.',
    accepted: ['sh int status', 'sh interfaces status', 'show int status'],
    related: ['ios.show-vlan-brief', 'ios.show-mac-address-table'],
    keywords: ['switch ports', 'port status', 'err-disabled'],
    source: ios('show interfaces status'),
  },
  {
    id: 'ios.show-vlan-brief',
    command: 'show vlan brief',
    title: 'List VLANs and their ports',
    category: 'device',
    subcategory: 'Switching',
    difficulty: 'beginner',
    objective: 'See which VLANs exist and which access ports belong to each.',
    summary: 'Lists each VLAN ID, name, status, and the access ports assigned to it.',
    whenToUse: 'When a device lands in the wrong network after being plugged in.',
    notice: 'Trunk ports do not appear in this list. Use show interfaces trunk for those.',
    syntax: [
      { token: 'show vlan', meaning: 'VLAN database' },
      { token: 'brief', meaning: 'summary view' },
    ],
    sampleOutput: `VLAN Name                             Status    Ports
---- -------------------------------- --------- -------------------------------
1    default                          active    Gi1/0/24
10   STAFF                            active    Gi1/0/2, Gi1/0/3, Gi1/0/5
20   PRINTERS                         active    Gi1/0/4
30   GUEST                            active    Gi1/0/10, Gi1/0/11
99   MGMT                             active`,
    mistakes: ['Looking for trunk ports here.'],
    requirements: 'Cisco Catalyst switches.',
    recallPrompt: 'List VLANs and the access ports assigned to each.',
    accepted: ['sh vlan brief', 'sh vlan br', 'show vlan br'],
    related: ['ios.show-interfaces-trunk', 'ios.show-interfaces-status'],
    keywords: ['vlan', 'vlans', 'access ports'],
    source: ios('show vlan'),
  },
  {
    id: 'ios.show-interfaces-trunk',
    command: 'show interfaces trunk',
    title: 'Show trunk ports',
    category: 'device',
    subcategory: 'Switching',
    difficulty: 'intermediate',
    objective: 'See which ports carry multiple VLANs and which VLANs are allowed on them.',
    summary: 'Lists trunk ports with their mode, encapsulation, native VLAN, and allowed and active VLANs.',
    whenToUse: 'When devices in one VLAN cannot reach the same VLAN on another switch.',
    syntax: [
      { token: 'show interfaces', meaning: 'interface information' },
      { token: 'trunk', meaning: 'trunking ports only' },
    ],
    sampleOutput: `Port        Mode             Encapsulation  Status        Native vlan
Gi1/0/1     on               802.1q         trunking      99

Port        Vlans allowed on trunk
Gi1/0/1     10,20,99

Port        Vlans allowed and active in management domain
Gi1/0/1     10,20,99`,
    mistakes: ['Missing that VLAN 30 is not in the allowed list, so it cannot cross this trunk.'],
    requirements: 'Cisco Catalyst switches.',
    recallPrompt: 'Show trunk ports and the VLANs allowed on them.',
    accepted: ['sh int trunk', 'sh interfaces trunk', 'show int trunk'],
    related: ['ios.show-vlan-brief'],
    keywords: ['trunk', '802.1q', 'allowed vlans'],
    source: ios('show interfaces trunk'),
  },
  {
    id: 'ios.show-ip-route',
    command: 'show ip route',
    title: 'Display the routing table',
    category: 'device',
    subcategory: 'Routing',
    difficulty: 'intermediate',
    objective: 'Read how a router reaches each network and where its default route points.',
    summary: 'Shows the IPv4 routing table with route source codes, networks, next hops, and exit interfaces.',
    details: 'Codes: C connected, L local, S static, O OSPF, D EIGRP, * candidate default. "Gateway of last resort" is the default route.',
    whenToUse: 'When a network is unreachable from a router.',
    syntax: [
      { token: 'show ip route', meaning: 'IPv4 routing table' },
    ],
    sampleOutput: `Codes: L - local, C - connected, S - static, R - RIP, O - OSPF, D - EIGRP
       * - candidate default

Gateway of last resort is 198.51.100.1 to network 0.0.0.0

S*    0.0.0.0/0 [1/0] via 198.51.100.1
      192.0.2.0/24 is variably subnetted, 2 subnets, 2 masks
C        192.0.2.0/24 is directly connected, GigabitEthernet0/0
L        192.0.2.1/32 is directly connected, GigabitEthernet0/0
      198.51.100.0/24 is variably subnetted, 2 subnets, 2 masks
C        198.51.100.0/30 is directly connected, GigabitEthernet0/1
L        198.51.100.2/32 is directly connected, GigabitEthernet0/1
O     203.0.113.0/24 [110/2] via 198.51.100.1, 00:41:12, GigabitEthernet0/1`,
    mistakes: ['Ignoring the administrative distance and metric in brackets, [110/2].'],
    recallPrompt: 'Display the IPv4 routing table on the router.',
    accepted: ['sh ip route', 'sh ip ro', 'show ip ro'],
    related: ['ios.show-ip-protocols', 'ios.show-ip-int-brief'],
    keywords: ['routing table', 'routes', 'gateway of last resort'],
    source: ios('show ip route'),
  },
  {
    id: 'ios.show-ip-protocols',
    command: 'show ip protocols',
    title: 'Show routing protocol settings',
    category: 'device',
    subcategory: 'Routing',
    difficulty: 'advanced',
    objective: 'See which routing protocols run and which networks they advertise.',
    summary: 'Shows each active routing protocol, its router ID, the networks it routes, and its neighbors.',
    whenToUse: 'When a route is missing and you suspect a routing protocol configuration problem.',
    syntax: [{ token: 'show ip protocols', meaning: 'routing protocol parameters and status' }],
    sampleOutput: `Routing Protocol is "ospf 1"
  Outgoing update filter list for all interfaces is not set
  Incoming update filter list for all interfaces is not set
  Router ID 10.255.0.1
  Number of areas in this router is 1. 1 normal 0 stub 0 nssa
  Routing for Networks:
    192.0.2.0 0.0.0.255 area 0
    198.51.100.0 0.0.0.3 area 0
  Routing Information Sources:
    Gateway         Distance      Last Update
    10.255.0.2           110      00:41:12
  Distance: (default is 110)`,
    mistakes: ['Expecting OSPF network statements to use subnet masks. They use wildcard masks.'],
    recallPrompt: 'Show which routing protocols are running and what networks they cover.',
    accepted: ['sh ip protocols', 'sh ip prot', 'show ip prot'],
    related: ['ios.show-ip-route'],
    keywords: ['ospf', 'eigrp', 'routing protocol'],
    source: ios('show ip protocols'),
  },
  {
    id: 'ios.show-running-config',
    command: 'show running-config',
    title: 'Display the active configuration',
    category: 'device',
    subcategory: 'Configuration',
    difficulty: 'beginner',
    objective: 'Read the configuration the device is using right now.',
    summary: 'Prints the running configuration held in memory, which takes effect immediately.',
    details: 'The running-config is lost at reboot unless saved to the startup-config. Comparing the two shows unsaved changes.',
    whenToUse: 'Before and after any change, and when documenting a device.',
    syntax: [{ token: 'show running-config', meaning: 'current configuration in RAM' }],
    sampleOutput: `Building configuration...

Current configuration : 1844 bytes
!
hostname BR-RTR1
!
interface GigabitEthernet0/0
 description LAN
 ip address 192.0.2.1 255.255.255.0
!
interface GigabitEthernet0/1
 description WAN
 ip address 198.51.100.2 255.255.255.252
!
ip route 0.0.0.0 0.0.0.0 198.51.100.1
!
end`,
    mistakes: ['Sharing the output without removing passwords, keys, and SNMP communities.'],
    permissions: 'elevated',
    requirements: 'Privileged EXEC mode, the # prompt.',
    recallPrompt: 'Display the configuration the device is running right now.',
    accepted: ['sh run', 'show run', 'sh running-config', 'show running'],
    related: ['ios.show-startup-config'],
    keywords: ['running config', 'show run', 'configuration'],
    source: ios('show running-config'),
  },
  {
    id: 'ios.show-startup-config',
    command: 'show startup-config',
    title: 'Display the saved configuration',
    category: 'device',
    subcategory: 'Configuration',
    difficulty: 'intermediate',
    objective: 'Read the configuration the device will load at the next boot.',
    summary: 'Prints the startup configuration stored in NVRAM.',
    whenToUse: 'When checking whether recent changes were saved.',
    syntax: [{ token: 'show startup-config', meaning: 'saved configuration in NVRAM' }],
    sampleOutput: `Using 1790 out of 262136 bytes
!
hostname BR-RTR1
!
interface GigabitEthernet0/0
 description LAN
 ip address 192.0.2.1 255.255.255.0
!
end`,
    mistakes: ['Assuming it matches the running-config. Unsaved changes exist only in running-config.'],
    permissions: 'elevated',
    requirements: 'Privileged EXEC mode.',
    recallPrompt: 'Display the configuration the device will load at its next reboot.',
    accepted: ['sh start', 'show start', 'sh startup-config'],
    related: ['ios.show-running-config', 'ios.copy-run-start'],
    keywords: ['startup config', 'saved config', 'nvram'],
    source: ios('show startup-config'),
  },
  {
    id: 'ios.show-mac-address-table',
    command: 'show mac address-table',
    title: 'Show learned MAC addresses',
    category: 'device',
    subcategory: 'Switching',
    difficulty: 'intermediate',
    objective: 'Find which switch port a device is connected to.',
    summary: 'Lists MAC addresses the switch has learned, with their VLAN and port.',
    whenToUse: 'When tracing a device by MAC address to a physical port.',
    syntax: [
      { token: 'show mac address-table', meaning: 'the switch forwarding table' },
    ],
    sampleOutput: `          Mac Address Table
-------------------------------------------

Vlan    Mac Address       Type        Ports
----    -----------       --------    -----
  10    8c16.452a.910e    DYNAMIC     Gi1/0/2
  10    3c58.c27f.11a0    DYNAMIC     Gi1/0/5
  20    0019.b9aa.4410    DYNAMIC     Gi1/0/4
  99    5254.0012.3502    DYNAMIC     Gi1/0/1
Total Mac Addresses for this criterion: 4`,
    mistakes: ['Assuming a MAC on the uplink port is directly connected. It is learned through another switch.'],
    requirements: 'Cisco Catalyst switches. Older IOS versions use show mac-address-table.',
    recallPrompt: 'Show the MAC addresses the switch has learned and their ports.',
    accepted: ['sh mac address-table', 'show mac-address-table', 'sh mac add'],
    related: ['ios.show-interfaces-status', 'ios.show-arp'],
    keywords: ['mac table', 'cam table', 'find port'],
    source: ios('show mac address-table'),
  },
  {
    id: 'ios.show-arp',
    command: 'show arp',
    title: 'Show the device ARP table',
    category: 'device',
    subcategory: 'Routing',
    difficulty: 'intermediate',
    objective: 'Map IP addresses to MAC addresses from the router\'s point of view.',
    summary: 'Lists IP-to-MAC mappings the router has learned, with age and interface.',
    whenToUse: 'Combined with the MAC address table, to locate a host by IP address.',
    syntax: [{ token: 'show arp', meaning: 'ARP cache' }],
    sampleOutput: `Protocol  Address          Age (min)  Hardware Addr   Type   Interface
Internet  192.0.2.1               -   5254.0012.3502  ARPA   GigabitEthernet0/0
Internet  192.0.2.57              4   8c16.452a.910e  ARPA   GigabitEthernet0/0
Internet  198.51.100.1           12   0050.56a1.0002  ARPA   GigabitEthernet0/1`,
    mistakes: ['Reading "-" in Age as an error. It marks the router\'s own address.'],
    recallPrompt: 'Show the router ARP table.',
    accepted: ['sh arp', 'show ip arp', 'sh ip arp'],
    related: ['ios.show-mac-address-table'],
    keywords: ['arp', 'ip to mac'],
    source: ios('show arp'),
  },
  {
    id: 'ios.show-version',
    command: 'show version',
    title: 'Show software and hardware details',
    category: 'device',
    subcategory: 'Device information',
    difficulty: 'beginner',
    objective: 'Identify the IOS version, uptime, model, and last reload reason.',
    summary: 'Shows software version, uptime, reason for last reload, hardware model, memory, and configuration register.',
    whenToUse: 'When checking for vulnerable versions or an unexpected reboot.',
    syntax: [{ token: 'show version', meaning: 'system hardware and software status' }],
    sampleOutput: `Cisco IOS Software, ISR Software (X86_64_LINUX_IOSD-UNIVERSALK9-M), Version 15.9(3)M8, RELEASE SOFTWARE (fc2)
BR-RTR1 uptime is 41 days, 2 hours, 7 minutes
System returned to ROM by power-on
System image file is "flash:isr4300-universalk9.bin"
cisco ISR4331/K9 (1RU) processor with 1795979K/6147K bytes of memory.
3 Gigabit Ethernet interfaces
Configuration register is 0x2102`,
    mistakes: ['Ignoring the reload reason, which explains unplanned restarts.'],
    recallPrompt: 'Show the IOS version, uptime, and hardware model.',
    accepted: ['sh ver', 'sh version', 'show ver'],
    related: ['ios.show-running-config'],
    keywords: ['ios version', 'uptime', 'model'],
    source: ios('show version'),
  },
  {
    id: 'ios.show-interfaces',
    command: 'show interfaces GigabitEthernet0/1',
    title: 'Show detailed interface counters',
    category: 'device',
    subcategory: 'Interfaces',
    difficulty: 'intermediate',
    objective: 'Read errors, drops, and utilization on one interface.',
    summary: 'Shows detailed status, MTU, bandwidth, load, and error counters for Gi0/1.',
    whenToUse: 'When a link is slow or flapping.',
    notice: 'Rising input errors or CRC counts point to cabling or duplex problems.',
    syntax: [
      { token: 'show interfaces', meaning: 'interface detail' },
      { token: 'GigabitEthernet0/1', meaning: 'one interface' },
    ],
    sampleOutput: `GigabitEthernet0/1 is up, line protocol is up
  Hardware is ISR4331-3x1GE, address is 0050.56a1.0102
  Description: WAN
  Internet address is 198.51.100.2/30
  MTU 1500 bytes, BW 1000000 Kbit/sec, DLY 10 usec,
     reliability 255/255, txload 12/255, rxload 31/255
  Full Duplex, 1000Mbps
  5 minute input rate 121842000 bits/sec, 10920 packets/sec
     48211 input errors, 48190 CRC, 0 frame, 0 overrun, 0 ignored
     0 output errors, 0 collisions, 2 interface resets`,
    mistakes: ['Checking counters once. Clear or compare them over time to see whether errors are increasing.'],
    recallPrompt: 'Show detailed counters for GigabitEthernet0/1.',
    accepted: ['sh int g0/1', 'sh interfaces GigabitEthernet0/1', 'show int g0/1', 'show interfaces g0/1', 'sh int gi0/1'],
    related: ['ios.show-ip-int-brief'],
    keywords: ['interface errors', 'crc', 'counters'],
    source: ios('show interfaces'),
  },
  {
    id: 'ios.show-cdp-neighbors',
    command: 'show cdp neighbors',
    title: 'Discover directly connected devices',
    category: 'device',
    subcategory: 'Device information',
    difficulty: 'intermediate',
    objective: 'Identify Cisco devices connected to each local port.',
    summary: 'Lists directly connected Cisco devices with their local and remote ports, capability, and platform.',
    whenToUse: 'When mapping a network or confirming which device sits at the other end of a cable.',
    syntax: [{ token: 'show cdp neighbors', meaning: 'Cisco Discovery Protocol neighbors' }],
    sampleOutput: `Capability Codes: R - Router, T - Trans Bridge, B - Source Route Bridge
                  S - Switch, H - Host, I - IGMP, r - Repeater, P - Phone

Device ID        Local Intrfce     Holdtme    Capability  Platform  Port ID
BR-SW1           Gig 0/0           151             S I    WS-C3850  Gig 1/0/1
ISP-EDGE         Gig 0/1           128             R      ASR1001   Gig 0/0/2`,
    mistakes: ['Expecting non-Cisco devices. Use LLDP, show lldp neighbors, for multi-vendor networks.'],
    recallPrompt: 'List the directly connected Cisco devices on each port.',
    accepted: ['sh cdp nei', 'sh cdp neighbors', 'show cdp nei'],
    related: ['ios.show-interfaces-status'],
    keywords: ['cdp', 'neighbors', 'lldp', 'topology'],
    source: ios('show cdp neighbors'),
  },
  {
    id: 'ios.show-access-lists',
    command: 'show access-lists',
    title: 'Show access control lists',
    category: 'device',
    subcategory: 'Security',
    difficulty: 'advanced',
    objective: 'Read ACL entries and how many packets matched each.',
    summary: 'Lists every access list with its entries and match counters.',
    details: 'ACLs are processed top to bottom, first match wins, and every ACL ends with an implicit deny that does not appear in the output.',
    whenToUse: 'When traffic is blocked or allowed unexpectedly.',
    syntax: [{ token: 'show access-lists', meaning: 'all ACLs with hit counts' }],
    sampleOutput: `Extended IP access list WAN-IN
    10 permit tcp any host 192.0.2.80 eq 443 (18422 matches)
    20 permit tcp 198.51.100.0 0.0.0.255 host 192.0.2.10 eq 22 (311 matches)
    30 deny ip any any log (912 matches)`,
    mistakes: ['Forgetting the implicit deny at the end of every ACL.'],
    recallPrompt: 'Show every access list with its match counts.',
    accepted: ['sh access-lists', 'sh access-list', 'show access-list', 'sh ip access-lists'],
    related: ['ios.show-running-config'],
    keywords: ['acl', 'access list', 'firewall rules'],
    source: ios('show access-lists'),
  },
  {
    id: 'ios.copy-run-start',
    command: 'copy running-config startup-config',
    title: 'Save the configuration',
    category: 'device',
    subcategory: 'Configuration',
    difficulty: 'intermediate',
    objective: 'Make configuration changes survive a reboot.',
    summary: 'Copies the running configuration to NVRAM as the startup configuration.',
    details: 'This changes what the device loads at boot. In production, follow change control and keep a backup of the previous configuration.',
    whenToUse: 'After verifying a change works, in an approved change window.',
    syntax: [
      { token: 'copy', meaning: 'copy a file or configuration' },
      { token: 'running-config', meaning: 'source: active configuration' },
      { token: 'startup-config', meaning: 'destination: saved configuration' },
    ],
    sampleOutput: `Destination filename [startup-config]?
Building configuration...
[OK]`,
    mistakes: ['Reversing the arguments, which overwrites your changes with the old saved configuration.'],
    permissions: 'elevated',
    safety: 'lab-only',
    recallPrompt: 'Save the running configuration so it survives a reboot.',
    accepted: ['copy run start', 'wr', 'write memory', 'wr mem'],
    related: ['ios.show-startup-config'],
    keywords: ['save config', 'write memory'],
    source: ios('copy'),
  },
  {
    id: 'ios.ping',
    command: 'ping 203.0.113.10',
    title: 'Ping from a router',
    category: 'device',
    subcategory: 'Diagnostics',
    difficulty: 'beginner',
    objective: 'Test reachability from the device itself.',
    summary: 'Sends five ICMP echoes from the router to 203.0.113.10. Each ! is a reply and each . is a timeout.',
    whenToUse: 'To find out whether a problem is between the router and the destination or between the user and the router.',
    syntax: [
      { token: 'ping', meaning: 'ICMP echo from the device' },
      { token: '203.0.113.10', meaning: 'destination' },
    ],
    sampleOutput: `Type escape sequence to abort.
Sending 5, 100-byte ICMP Echos to 203.0.113.10, timeout is 2 seconds:
.!!!!
Success rate is 80 percent (4/5), round-trip min/avg/max = 1/2/4 ms`,
    mistakes: ['Worrying about a first dot. It is usually ARP resolution on the first packet.'],
    recallPrompt: 'From the router, send ICMP echo requests to 203.0.113.10.',
    related: ['ios.traceroute'],
    keywords: ['router ping'],
    source: ios('ping'),
  },
  {
    id: 'ios.traceroute',
    command: 'traceroute 203.0.113.10',
    title: 'Trace a route from a router',
    category: 'device',
    subcategory: 'Diagnostics',
    difficulty: 'intermediate',
    objective: 'See the hops from the device toward a destination.',
    summary: 'Lists each hop from the router to 203.0.113.10 with timing.',
    whenToUse: 'When a remote network is reachable from some sites but not others.',
    syntax: [
      { token: 'traceroute', meaning: 'trace from the device' },
      { token: '203.0.113.10', meaning: 'destination' },
    ],
    sampleOutput: `Type escape sequence to abort.
Tracing the route to 203.0.113.10
VRF info: (vrf in name/id, vrf out name/id)
  1 198.51.100.1 1 msec 1 msec 1 msec
  2 203.0.113.65 6 msec 5 msec 6 msec
  3 203.0.113.10 7 msec *  6 msec`,
    mistakes: ['Expecting Windows tracert syntax.'],
    recallPrompt: 'From the router, trace the route to 203.0.113.10.',
    accepted: ['trace 203.0.113.10'],
    related: ['ios.ping', 'ios.show-ip-route'],
    keywords: ['router traceroute'],
    source: ios('traceroute'),
  },
])
