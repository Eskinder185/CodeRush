import { useState, type KeyboardEvent } from 'react'
import { FlaskConical } from 'lucide-react'
import { prefersReducedMotion, useSettings } from '../../lib/settings'

type NodeId = 'internet' | 'fw' | 'r1' | 'sw1' | 'pc' | 'guest' | 'dns' | 'app'
export type TopologyIncident = 'normal' | 'dns' | 'vlan'

interface NodeDef {
  id: NodeId
  label: string
  role: string
  x: number
  y: number
  kind: 'cloud' | 'firewall' | 'router' | 'switch' | 'client' | 'server'
  vlan?: string
  details: { title: string; text: string }[]
  explain: string
}

/** A fictional branch network. Every address is from a documentation or private range. */
const NODES: NodeDef[] = [
  {
    id: 'internet', label: 'Internet', role: 'ISP uplink', x: 360, y: 46, kind: 'cloud',
    details: [{ title: 'Upstream', text: 'ISP gateway 198.51.100.1/30\nPublic services reached through the firewall' }],
    explain: 'The internet is a network of networks. Everything beyond the ISP gateway is reached through the default route.',
  },
  {
    id: 'fw', label: 'FW1', role: 'Firewall', x: 360, y: 128, kind: 'firewall',
    details: [
      { title: 'Interfaces', text: 'outside  198.51.100.2/30\ninside   10.0.0.1/30' },
      { title: 'Policy (simulated)', text: '10  allow  inside → any        tcp 80,443\n20  allow  any → 192.0.2.140   tcp 443\n30  allow  inside → any        udp 53 (from 192.0.2.130 only)\n99  deny   any → any          log' },
    ],
    explain: 'A stateful firewall evaluates rules top to bottom and lets reply traffic back in automatically. The final rule denies everything else.',
  },
  {
    id: 'r1', label: 'R1', role: 'Router', x: 360, y: 210, kind: 'router',
    details: [
      { title: 'show ip route (simulated)', text: 'S*  0.0.0.0/0 [1/0] via 10.0.0.1\nC   10.0.0.0/30 is directly connected, Gi0/0\nC   192.0.2.0/25 is directly connected, Gi0/1.10\nC   192.0.2.128/26 is directly connected, Gi0/1.20\nC   203.0.113.0/24 is directly connected, Gi0/1.30' },
      { title: 'Gateways', text: 'VLAN 10 Staff    192.0.2.1\nVLAN 20 Servers  192.0.2.129\nVLAN 30 Guest    203.0.113.1' },
    ],
    explain: 'The router connects the three VLANs with one subinterface each and sends everything else to the firewall through its default route.',
  },
  {
    id: 'sw1', label: 'SW1', role: 'Access switch', x: 360, y: 292, kind: 'switch',
    details: [
      { title: 'show vlan brief (simulated)', text: 'VLAN Name     Ports\n10   STAFF    Gi1/0/2-12\n20   SERVERS  Gi1/0/20-22\n30   GUEST    Gi1/0/30-40' },
      { title: 'Trunk', text: 'Gi1/0/1 to R1, 802.1Q, allowed VLANs 10,20,30' },
    ],
    explain: 'The switch keeps each VLAN separate at layer 2. Traffic between VLANs must go up the trunk to the router.',
  },
  {
    id: 'pc', label: 'PC-114', role: 'Staff workstation', x: 110, y: 380, kind: 'client', vlan: 'VLAN 10',
    details: [{ title: 'IP configuration (simulated)', text: 'IPv4 Address  192.0.2.57/25\nGateway       192.0.2.1\nDNS server    192.0.2.130\nSwitch port   Gi1/0/2 (VLAN 10)' }],
    explain: 'To reach the DNS server in another subnet, the PC sends packets to its gateway, 192.0.2.1, which routes them to VLAN 20.',
  },
  {
    id: 'guest', label: 'Guest', role: 'Guest laptop', x: 270, y: 380, kind: 'client', vlan: 'VLAN 30',
    details: [{ title: 'IP configuration (simulated)', text: 'IPv4 Address  203.0.113.20/24\nGateway       203.0.113.1\nDNS server    192.0.2.130\nSwitch port   Gi1/0/31 (VLAN 30)' }],
    explain: 'Guests share the switch but sit in their own VLAN, so they cannot reach staff devices at layer 2.',
  },
  {
    id: 'dns', label: 'DNS1', role: 'DNS server', x: 450, y: 380, kind: 'server', vlan: 'VLAN 20',
    details: [
      { title: 'IP configuration (simulated)', text: 'IPv4 Address  192.0.2.130/26\nGateway       192.0.2.129\nListening     udp/53, tcp/53' },
      { title: 'Zone lab.example', text: 'app   A     192.0.2.140\ndns1  A     192.0.2.130\nwww   CNAME app.lab.example.' },
    ],
    explain: 'Every client asks this server to resolve names. If it fails, IP connectivity still works but names do not.',
  },
  {
    id: 'app', label: 'APP1', role: 'Application server', x: 610, y: 380, kind: 'server', vlan: 'VLAN 20',
    details: [{ title: 'Listening ports (simulated)', text: 'tcp  0.0.0.0:443    LISTEN  nginx\ntcp  127.0.0.1:5432 LISTEN  postgres\ntcp  0.0.0.0:22     LISTEN  sshd' }],
    explain: 'The database listens on loopback only, so other hosts cannot reach it even though it runs on this server.',
  },
]

const LINKS: [NodeId, NodeId, string][] = [
  ['internet', 'fw', 'WAN'],
  ['fw', 'r1', '10.0.0.0/30'],
  ['r1', 'sw1', 'trunk 10,20,30'],
  ['sw1', 'pc', ''],
  ['sw1', 'guest', ''],
  ['sw1', 'dns', ''],
  ['sw1', 'app', ''],
]

const VLAN_COLOR: Record<string, string> = { 'VLAN 10': '#38BDF8', 'VLAN 20': '#A78BFA', 'VLAN 30': '#FBBF24' }

function Glyph({ n }: { n: NodeDef }) {
  const stroke = 'rgb(var(--fg-muted))'
  switch (n.kind) {
    case 'cloud':
      return <path d="M-26 8 a12 12 0 0 1 4-22 a16 16 0 0 1 30-4 a12 12 0 0 1 20 10 a10 10 0 0 1 -2 16 z" fill="rgb(var(--elevated))" stroke={stroke} strokeWidth="1.5" />
    case 'firewall':
      return (
        <g>
          <rect x="-22" y="-16" width="44" height="32" rx="4" fill="rgb(var(--elevated))" stroke="#FB7185" strokeWidth="1.5" />
          {[-8, 0, 8].map((y) => (
            <line key={y} x1="-22" x2="22" y1={y} y2={y} stroke="#FB7185" strokeOpacity="0.6" />
          ))}
          <line x1="-6" x2="-6" y1="-16" y2="-8" stroke="#FB7185" strokeOpacity="0.6" />
          <line x1="8" x2="8" y1="-8" y2="0" stroke="#FB7185" strokeOpacity="0.6" />
          <line x1="-4" x2="-4" y1="0" y2="8" stroke="#FB7185" strokeOpacity="0.6" />
        </g>
      )
    case 'router':
      return (
        <g>
          <circle r="20" fill="rgb(var(--elevated))" stroke="#38BDF8" strokeWidth="1.5" />
          <path d="M-9 -4 l9 -8 l9 8 M-9 4 l9 8 l9 -8" fill="none" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
        </g>
      )
    case 'switch':
      return (
        <g>
          <rect x="-30" y="-12" width="60" height="24" rx="4" fill="rgb(var(--elevated))" stroke="#34D399" strokeWidth="1.5" />
          {[-20, -12, -4, 4, 12, 20].map((x) => (
            <rect key={x} x={x - 2.5} y="-3" width="5" height="6" rx="1" fill="#34D399" fillOpacity="0.6" />
          ))}
        </g>
      )
    case 'client':
      return (
        <g>
          <rect x="-18" y="-14" width="36" height="24" rx="3" fill="rgb(var(--elevated))" stroke={VLAN_COLOR[n.vlan!]} strokeWidth="1.5" />
          <line x1="-8" x2="8" y1="16" y2="16" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
        </g>
      )
    case 'server':
      return (
        <g>
          {[-14, -2, 10].map((y) => (
            <rect key={y} x="-16" y={y} width="32" height="10" rx="2" fill="rgb(var(--elevated))" stroke={VLAN_COLOR[n.vlan!]} strokeWidth="1.5" />
          ))}
          {[-9, 3, 15].map((y) => (
            <circle key={y} cx="10" cy={y} r="1.6" fill="#34D399" />
          ))}
        </g>
      )
  }
}

export function NetworkTopology({ compact = false, incident = 'normal' }: { compact?: boolean; incident?: TopologyIncident }) {
  const settings = useSettings()
  const motion = !prefersReducedMotion(settings)
  const [selected, setSelected] = useState<NodeId>('pc')
  const nodes = NODES.map((n): NodeDef => {
    if (incident === 'vlan' && n.id === 'pc') return {
      ...n, vlan: 'VLAN 30',
      details: [{ title: 'Port assignment (simulated)', text: 'Intended VLAN 10 Staff\nObserved Gi1/0/2 VLAN 30 Guest\nPhysical link: connected\nGuest isolation blocks staff access' }],
      explain: 'The workstation is physically connected, but its access port is in guest VLAN 30. Its traffic enters the wrong broadcast domain and cannot reach staff services under the guest policy.',
    }
    if (incident === 'dns' && n.id === 'dns') return {
      ...n, details: [{ title: 'DNS service (simulated)', text: 'Host 192.0.2.130 responds to ping\nDNS query for app.lab.example: SERVFAIL\nService requires investigation' }],
      explain: 'The DNS host is reachable, but the resolver returns SERVFAIL. A ping tests host reachability; it does not prove the DNS service is healthy.',
    }
    return n
  })
  const node = nodes.find((n) => n.id === selected)!
  const pos = Object.fromEntries(nodes.map((n) => [n.id, n])) as Record<NodeId, NodeDef>
  const affected = incident === 'dns' ? 'dns' : incident === 'vlan' ? 'pc' : null
  const packetFlow = incident === 'dns'
    ? 'PC-114 → gateway R1 → VLAN 20 → DNS1: the host answers at its IP, but the DNS query returns SERVFAIL. Name lookup stops here; no application address is returned.'
    : incident === 'vlan'
      ? 'PC-114 → SW1 Gi1/0/2 → guest VLAN 30: the port is connected, but the frame enters the wrong VLAN. Guest isolation prevents the intended staff path. Move the port to its approved VLAN and renew the lease.'
      : 'PC-114 → gateway R1 → VLAN 20 → DNS1 → APP1: DNS returns an address, then the client can open a separate connection to the application.'

  const onKey = (e: KeyboardEvent, id: NodeId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setSelected(id)
    }
  }

  return (
    <div className={`grid gap-4 ${compact ? '' : 'lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]'}`}>
      <div className="panel overflow-hidden bg-sunken p-2">
        <svg viewBox="0 0 720 430" className="h-auto w-full" role="group" aria-label="Interactive branch network diagram. Select a device to see its simulated details.">
          {/* VLAN zones */}
          {[
            { x: 50, w: 120, v: 'VLAN 10' },
            { x: 210, w: 120, v: 'VLAN 30' },
            { x: 390, w: 280, v: 'VLAN 20' },
          ].map((z) => (
            <g key={z.v}>
              <rect x={z.x} y={338} width={z.w} height={84} rx={10} fill={incident === 'vlan' && z.v === 'VLAN 10' ? '#FB7185' : VLAN_COLOR[z.v]} fillOpacity={0.06} stroke={incident === 'vlan' && z.v === 'VLAN 10' ? '#FB7185' : VLAN_COLOR[z.v]} strokeOpacity={0.35} strokeDasharray="4 4" />
              <text x={z.x + 10} y={354} className="text-[10px] font-semibold" fill={incident === 'vlan' && z.v === 'VLAN 10' ? '#FB7185' : VLAN_COLOR[z.v]}>
                {incident === 'vlan' && z.v === 'VLAN 10' ? 'VLAN 30 · wrong' : z.v}
              </text>
            </g>
          ))}
          {LINKS.map(([a, b, label]) => {
            const A = pos[a]
            const B = pos[b]
            const d = `M${A.x},${A.y} L${B.x},${B.y}`
            const active = selected === a || selected === b
            const disrupted = (incident === 'dns' && b === 'dns') || (incident === 'vlan' && b === 'pc')
            return (
              <g key={`${a}-${b}`}>
                <path d={d} stroke={disrupted ? '#FB7185' : active ? 'rgb(var(--accent))' : 'rgb(var(--line-strong))'} strokeWidth={active || disrupted ? 2 : 1.5} strokeDasharray={disrupted ? '5 4' : undefined} fill="none" />
                {motion && (
                  <circle r="3" fill="rgb(var(--accent))" opacity="0.85">
                    <animateMotion dur={`${2.4 + (A.x % 7) * 0.2}s`} repeatCount="indefinite" path={d} />
                  </circle>
                )}
                {label && (
                  <text x={(A.x + B.x) / 2 + 10} y={(A.y + B.y) / 2 + 3} className="fill-fg-subtle text-[10px]">
                    {label}
                  </text>
                )}
              </g>
            )
          })}
          {nodes.map((n) => {
            const sel = n.id === selected
            return (
              <g
                key={n.id}
                transform={`translate(${n.x},${n.y})`}
                role="button"
                tabIndex={0}
                aria-pressed={sel}
                aria-label={`${n.label}, ${n.role}${n.vlan ? `, ${n.vlan}` : ''}`}
                onClick={() => setSelected(n.id)}
                onKeyDown={(e) => onKey(e, n.id)}
                className="cursor-pointer outline-none [&:focus-visible>circle.focus]:opacity-100"
              >
                <circle className="focus" r="34" fill="none" stroke={affected === n.id ? '#FB7185' : 'rgb(var(--accent))'} strokeWidth="2" opacity={sel || affected === n.id ? 1 : 0} />
                <circle r="34" fill="transparent" />
                <Glyph n={n} />
                <text y={n.kind === 'cloud' ? 26 : 34} textAnchor="middle" className="fill-fg text-[11px] font-semibold">
                  {n.label}
                </text>
              </g>
            )
          })}
        </svg>
      </div>
      <aside className="panel panel-pad" aria-live="polite">
        <p className="mb-3 rounded-md border border-line bg-sunken p-3 text-sm text-fg-muted"><span className="font-semibold text-fg">Simulated packet path:</span> {packetFlow}</p>
        <div className="mb-1 flex items-center gap-2 text-2xs font-semibold uppercase tracking-wider text-fg-subtle">
          <FlaskConical className="h-3.5 w-3.5" aria-hidden /> Simulated device
        </div>
        <h3 className="text-h3">
          {node.label} <span className="font-normal text-fg-subtle">· {node.role}</span>
        </h3>
        {node.vlan && <p className="mt-1 text-sm text-fg-subtle">{node.vlan}</p>}
        <p className="mt-3 text-sm text-fg-muted">{node.explain}</p>
        <div className="mt-4 space-y-3">
          {node.details.map((d) => (
            <div key={d.title}>
              <div className="mb-1 text-xs font-medium text-fg-subtle">{d.title}</div>
              <pre className="scroll-x rounded-md border border-line bg-term px-3 py-2 font-mono text-[12px] leading-relaxed text-term-fg" tabIndex={0} aria-label={d.title}>{d.text}</pre>
            </div>
          ))}
        </div>
        {!compact && <p className="mt-4 text-xs text-fg-subtle">Select a device with a click, or Tab to it and press Enter.</p>}
      </aside>
    </div>
  )
}
