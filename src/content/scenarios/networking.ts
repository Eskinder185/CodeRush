import type { Scenario } from '../types'

/** Network troubleshooting scenarios on Windows Command Prompt and Cisco IOS devices. Simulated data only. */
export const networkingScenarios: Scenario[] = [
  {
    id: 'sc.net.bottom-up',
    title: 'Work the problem from the bottom up',
    track: 'networking',
    platform: 'windows-cmd',
    difficulty: 'beginner',
    summary: 'Use the classic ipconfig, ping, and nslookup sequence.',
    context: 'A user on WS-LAB-07 says "the internet is down". You are on their machine in Command Prompt.',
    steps: [
      {
        kind: 'command',
        prompt: 'Show the IP address, subnet mask, and default gateway.',
        commandIds: ['win.ipconfig'],
        hint: 'The basic Windows IP configuration command.',
        explanation: 'Start with the local configuration. Without a valid address and gateway nothing else will work.',
      },
      {
        kind: 'command',
        prompt: 'The gateway is 192.0.2.1. Ping it.',
        commandIds: ['win.ping'],
        hint: 'ping followed by the gateway address.',
        explanation: 'Reaching the gateway proves the local network works.',
      },
      {
        kind: 'command',
        prompt: 'The gateway answers. Now check whether names resolve: look up example.com.',
        commandIds: ['win.nslookup'],
        hint: 'The classic DNS lookup tool on Windows.',
        output: `Server:  UnKnown
Address:  192.0.2.53

*** UnKnown can't find example.com: Server failed`,
        explanation: 'The DNS server responds, but it reports a failure for every name.',
      },
      {
        kind: 'choice',
        prompt: 'Which layer has the problem?',
        choices: [
          { label: 'Name resolution: the DNS server at 192.0.2.53 is failing', correct: true, why: 'IP connectivity works up to the gateway, but DNS returns Server failed.' },
          { label: 'Physical: the cable is unplugged', correct: false, why: 'The gateway answered ping, which needs a working link.' },
          { label: 'Routing: the default gateway is wrong', correct: false, why: 'The gateway replied and DNS responded too, so routing works.' },
        ],
        explanation: 'Testing each layer in order turns "the internet is down" into a specific fault.',
      },
    ],
    wrapUp: {
      meaning: '"The internet is down" is actually a failing DNS server.',
      nextStep: 'Escalate to whoever runs 192.0.2.53. As a test, "nslookup example.com 198.51.100.53" against another approved resolver shows whether the issue is limited to one server.',
    },
  },
  {
    id: 'sc.net.which-process-port',
    title: 'What is using port 4444?',
    track: 'networking',
    platform: 'windows-cmd',
    difficulty: 'intermediate',
    summary: 'Map a network connection to the program that owns it.',
    context: 'A firewall report shows WS-LAB-07 connecting to 203.0.113.77 on port 4444. Identify the program.',
    steps: [
      {
        kind: 'command',
        prompt: 'List all connections and listening ports with numeric addresses and process IDs.',
        commandIds: ['win.netstat-ano'],
        hint: 'netstat with -a, -n, and -o.',
        explanation: 'The -o flag adds the PID that owns each connection.',
      },
      {
        kind: 'command',
        prompt: 'The connection to 203.0.113.77:4444 belongs to PID 4821. Identify that process with tasklist.',
        commandIds: ['win.tasklist-pid'],
        hint: 'tasklist with a /FI filter on PID.',
        explanation: 'tasklist turns a PID into an image name.',
      },
    ],
    wrapUp: {
      meaning: 'PID 4821, updtsvc.exe, holds the connection to 203.0.113.77:4444.',
      nextStep: 'Collect the process path and file hash in PowerShell, then escalate according to your incident response process.',
    },
  },
  {
    id: 'sc.net.wrong-route',
    title: 'Traffic goes out the VPN',
    track: 'networking',
    platform: 'windows-cmd',
    difficulty: 'advanced',
    summary: 'Read the routing table to explain unexpected traffic paths.',
    context: 'With the VPN connected, a user cannot reach the local printer at 192.0.2.40, though it works with the VPN off.',
    steps: [
      {
        kind: 'command',
        prompt: 'Print the IPv4 routing table.',
        commandIds: ['win.route-print'],
        hint: 'route print, limited to IPv4.',
        output: `Active Routes:
Network Destination        Netmask          Gateway       Interface  Metric
          0.0.0.0          0.0.0.0         10.8.0.1        10.8.0.12      5
          0.0.0.0          0.0.0.0        192.0.2.1      192.0.2.57     25
        192.0.2.0    255.255.255.0         10.8.0.1        10.8.0.12      5
        192.0.2.0    255.255.255.0         On-link       192.0.2.57    281`,
        explanation: 'Two routes match 192.0.2.0/24. The VPN route has the lower metric.',
      },
      {
        kind: 'choice',
        prompt: 'Why can the user not reach the printer?',
        choices: [
          { label: 'The VPN pushes a 192.0.2.0/24 route with a lower metric, so printer traffic goes into the tunnel', correct: true, why: 'With equal prefix lengths, the lower metric wins. The VPN side overlaps the home LAN.' },
          { label: 'The printer is off', correct: false, why: 'It works with the VPN off.' },
          { label: 'The default route is missing', correct: false, why: 'There are two default routes.' },
        ],
        explanation: 'Overlapping address ranges between a VPN and a local network cause exactly this.',
      },
    ],
    wrapUp: {
      meaning: 'The VPN advertises the same 192.0.2.0/24 range as the local network, and wins on metric.',
      nextStep: 'Report the overlap to the VPN team. Long-term, the corporate range or the local network should be renumbered so they do not collide.',
    },
  },
  {
    id: 'sc.net.dhcp-renew',
    title: 'Get a fresh DHCP lease',
    track: 'networking',
    platform: 'windows-cmd',
    difficulty: 'beginner',
    summary: 'Confirm DHCP details and renew the lease after a network fix.',
    context: 'The network team fixed a DHCP relay. A desktop still has a 169.254 address.',
    steps: [
      {
        kind: 'command',
        prompt: 'Show the full IP configuration, including whether DHCP is enabled.',
        commandIds: ['win.ipconfig-all'],
        hint: 'ipconfig with the switch for full detail.',
        output: `   DHCP Enabled. . . . . . . . . . . : Yes
   Autoconfiguration IPv4 Address. . : 169.254.18.40(Preferred)
   Subnet Mask . . . . . . . . . . . : 255.255.0.0
   Default Gateway . . . . . . . . . :`,
        explanation: 'DHCP is enabled but no lease was obtained, so Windows self-assigned an APIPA address.',
      },
      {
        kind: 'command',
        prompt: 'Request a new lease.',
        commandIds: ['win.ipconfig-renew'],
        hint: 'ipconfig with the renew switch.',
        explanation: 'Renewing asks the DHCP server again now that the relay works.',
      },
    ],
    wrapUp: {
      meaning: 'The desktop now has 192.0.2.57 with gateway 192.0.2.1 from DHCP.',
      nextStep: 'Confirm with ping 192.0.2.1 and nslookup example.com.',
    },
  },
  {
    id: 'sc.net.packet-loss',
    title: 'Video calls keep breaking up',
    track: 'networking',
    platform: 'windows-cmd',
    difficulty: 'advanced',
    summary: 'Use tracert and pathping to locate packet loss.',
    context: 'A branch office reports choppy video calls every afternoon.',
    steps: [
      {
        kind: 'command',
        prompt: 'Trace the route to example.com.',
        commandIds: ['win.tracert'],
        hint: 'The Windows spelling of traceroute.',
        explanation: 'tracert shows the path but only a few samples per hop.',
      },
      {
        kind: 'command',
        prompt: 'Measure per-hop loss to example.com without resolving names.',
        commandIds: ['win.pathping'],
        hint: 'pathping with -n.',
        explanation: 'pathping sends many probes and reports loss for each link.',
      },
      {
        kind: 'choice',
        prompt: 'The link between hop 1 (192.0.2.1) and hop 2 (198.51.100.1) shows 12% loss, and later hops show the same 12% in "Source to Here". Where is the problem?',
        choices: [
          { label: 'On the link from the branch router to the ISP, between hops 1 and 2', correct: true, why: 'Loss that starts at a link and carries through to every later hop points to that link.' },
          { label: 'At the destination server', correct: false, why: 'Loss appears long before the destination.' },
          { label: 'Nowhere, 12% is normal', correct: false, why: 'Real-time traffic suffers badly above about 1% loss.' },
        ],
        explanation: 'Loss that persists to all later hops identifies the faulty link. Loss at one hop only is often just ICMP rate limiting.',
      },
    ],
    wrapUp: {
      meaning: 'The branch uplink to the ISP drops about 12% of packets, probably due to afternoon congestion.',
      nextStep: 'Check interface counters on the branch router with show interfaces, and open a ticket with the ISP with the pathping evidence.',
    },
  },
  {
    id: 'sc.net.linux-gateway',
    title: 'Linux host reaches only its own subnet',
    track: 'networking',
    platform: 'linux',
    difficulty: 'intermediate',
    summary: 'Confirm routing and ARP for the gateway.',
    context: 'A Linux server can reach other servers in 192.0.2.0/24 but nothing else.',
    steps: [
      {
        kind: 'command',
        prompt: 'Display the routing table.',
        commandIds: ['linux.ip-route-show'],
        hint: 'ip route show.',
        output: `default via 192.0.2.254 dev enp0s3 proto static
192.0.2.0/24 dev enp0s3 proto kernel scope link src 192.0.2.25`,
        explanation: 'A default route exists, pointing at 192.0.2.254.',
      },
      {
        kind: 'command',
        prompt: 'Show the neighbor table to see whether the gateway answers ARP.',
        commandIds: ['linux.ip-neigh-show'],
        hint: 'ip neigh show.',
        output: `192.0.2.30 dev enp0s3 lladdr 08:00:27:9c:01:7d REACHABLE
192.0.2.254 dev enp0s3 FAILED`,
        explanation: 'The gateway never answered ARP.',
      },
      {
        kind: 'choice',
        prompt: 'The network diagram says the gateway is 192.0.2.1. What is wrong?',
        choices: [
          { label: 'The default route points to the wrong address, 192.0.2.254', correct: true, why: 'Nothing answers at .254, so every off-subnet packet is lost.' },
          { label: 'The subnet mask is wrong', correct: false, why: 'Local hosts work, so the /24 is right.' },
          { label: 'The interface is down', correct: false, why: 'Other local hosts are REACHABLE.' },
        ],
        explanation: 'A static default route with a typo is a common cause of "local only" connectivity.',
      },
    ],
    wrapUp: {
      meaning: 'The static default route points to 192.0.2.254, where no router exists.',
      nextStep: 'Correct the gateway to 192.0.2.1 in the persistent network configuration, apply it, and confirm with ip route show and ping -c 4 192.0.2.1.',
    },
  },
]

export const ciscoScenarios: Scenario[] = [
  {
    id: 'sc.ios.port-down',
    title: 'A desk port does not work',
    track: 'cisco',
    platform: 'cisco-ios',
    difficulty: 'beginner',
    summary: 'Check port status and VLAN on an access switch.',
    context: 'The user at desk 115 has no network. Their cable goes to Gi1/0/3 on BR-SW1.',
    steps: [
      {
        kind: 'command',
        prompt: 'Show every switch port with its status, VLAN, duplex, and speed.',
        commandIds: ['ios.show-interfaces-status'],
        hint: 'show interfaces status. Abbreviations are accepted.',
        explanation: 'This gives the status of every access port at once.',
      },
      {
        kind: 'choice',
        prompt: 'Gi1/0/3 shows "notconnect" in VLAN 10. What does that suggest?',
        choices: [
          { label: 'No link is detected: check the cable, the patch panel, and the PC network adapter', correct: true, why: 'notconnect means the switch sees no electrical link on the port.' },
          { label: 'The port is in the wrong VLAN', correct: false, why: 'VLAN 10 is the staff VLAN, which is correct for a desk.' },
          { label: 'The port was disabled by port security', correct: false, why: 'That would show err-disabled.' },
        ],
        explanation: 'Port status words have specific meanings. Learn them to save time.',
      },
    ],
    wrapUp: {
      meaning: 'The switch sees no link on Gi1/0/3.',
      nextStep: 'Test the cable and patching. If the PC adapter shows link at its end, check the patch panel mapping to Gi1/0/3.',
    },
  },
  {
    id: 'sc.ios.vlan-trunk',
    title: 'The guest VLAN does not reach the second floor',
    track: 'cisco',
    platform: 'cisco-ios',
    difficulty: 'intermediate',
    summary: 'Find a VLAN missing from a trunk.',
    context: 'Guest Wi-Fi works on the first floor switch but not on the second floor, which connects through Gi1/0/1.',
    steps: [
      {
        kind: 'command',
        prompt: 'List VLANs and their access ports.',
        commandIds: ['ios.show-vlan-brief'],
        hint: 'show vlan brief.',
        explanation: 'VLAN 30, GUEST, exists and is active.',
      },
      {
        kind: 'command',
        prompt: 'Show trunk ports and the VLANs allowed on them.',
        commandIds: ['ios.show-interfaces-trunk'],
        hint: 'show interfaces trunk.',
        explanation: 'The allowed list on Gi1/0/1 is 10,20,99.',
      },
      {
        kind: 'choice',
        prompt: 'Why does guest traffic not reach the second floor?',
        choices: [
          { label: 'VLAN 30 is not in the allowed list on the trunk Gi1/0/1', correct: true, why: 'Traffic for VLANs not allowed on a trunk is dropped at that trunk.' },
          { label: 'VLAN 30 does not exist', correct: false, why: 'show vlan brief listed it as active.' },
          { label: 'The native VLAN should be 30', correct: false, why: 'The native VLAN only carries untagged frames. Guest traffic needs to be allowed, not native.' },
        ],
        explanation: 'When one VLAN fails across switches while others work, check the trunk allowed list.',
      },
    ],
    wrapUp: {
      meaning: 'The uplink trunk does not allow VLAN 30.',
      nextStep: 'In an approved change, add the VLAN with "switchport trunk allowed vlan add 30" on both ends of the trunk. The "add" keyword matters; without it the list is replaced.',
    },
  },
  {
    id: 'sc.ios.no-route',
    title: 'Branch cannot reach the data center',
    track: 'cisco',
    platform: 'cisco-ios',
    difficulty: 'intermediate',
    summary: 'Read interfaces and the routing table on a branch router.',
    context: 'Users at the branch cannot reach 203.0.113.0/24 in the data center. The internet works.',
    steps: [
      {
        kind: 'command',
        prompt: 'Show a one-line summary of every interface and its status.',
        commandIds: ['ios.show-ip-int-brief'],
        hint: 'show ip interface brief, or sh ip int br.',
        explanation: 'Both LAN and WAN interfaces are up/up.',
      },
      {
        kind: 'command',
        prompt: 'Display the routing table.',
        commandIds: ['ios.show-ip-route'],
        hint: 'show ip route.',
        output: `Gateway of last resort is 198.51.100.1 to network 0.0.0.0

S*    0.0.0.0/0 [1/0] via 198.51.100.1
C        192.0.2.0/24 is directly connected, GigabitEthernet0/0
C        198.51.100.0/30 is directly connected, GigabitEthernet0/1`,
        explanation: 'There is no OSPF route for 203.0.113.0/24 today.',
      },
      {
        kind: 'command',
        prompt: 'Show which routing protocols are running.',
        commandIds: ['ios.show-ip-protocols'],
        hint: 'show ip protocols.',
        output: `Routing Protocol is "ospf 1"
  Router ID 10.255.0.1
  Routing for Networks:
    192.0.2.0 0.0.0.255 area 0
  Routing Information Sources:
    Gateway         Distance      Last Update`,
        explanation: 'OSPF does not include the WAN network 198.51.100.0/30, and it has no neighbors.',
      },
    ],
    wrapUp: {
      meaning: 'OSPF is not enabled on the WAN link, so no adjacency forms and the data center route is never learned. Default traffic still works through the static default route.',
      nextStep: 'Compare with the backup configuration. Restore the missing "network 198.51.100.0 0.0.0.3 area 0" statement in an approved change, then verify with show ip route.',
    },
  },
  {
    id: 'sc.ios.find-device',
    title: 'Find which port a device is on',
    track: 'cisco',
    platform: 'cisco-ios',
    difficulty: 'intermediate',
    summary: 'Trace an IP address to a MAC address and then to a switch port.',
    context: 'Security asks which switch port 192.0.2.57 is connected to.',
    steps: [
      {
        kind: 'command',
        prompt: 'On the router, show the ARP table to find the MAC address of 192.0.2.57.',
        commandIds: ['ios.show-arp'],
        hint: 'show arp.',
        explanation: '192.0.2.57 maps to 8c16.452a.910e.',
      },
      {
        kind: 'command',
        prompt: 'On the switch, show the MAC address table.',
        commandIds: ['ios.show-mac-address-table'],
        hint: 'show mac address-table.',
        explanation: '8c16.452a.910e is learned on Gi1/0/2 in VLAN 10.',
      },
    ],
    wrapUp: {
      meaning: '192.0.2.57 is the device on Gi1/0/2, VLAN 10, which is labelled Desk-114.',
      nextStep: 'Confirm with show interfaces status, and record the result in the ticket.',
    },
  },
]
