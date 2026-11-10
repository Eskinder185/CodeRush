import { useSearchParams } from 'react-router-dom'
import { PageHeader, ButtonLink } from '../components/ui'
import { NetworkTopology } from '../components/graphics/NetworkTopology'
import { usePageMeta } from '../app/context'

export default function Topology() {
  const [params, setParams] = useSearchParams()
  const incident = params.get('incident') === 'dns' || params.get('incident') === 'vlan' ? params.get('incident') as 'dns' | 'vlan' : 'normal'
  usePageMeta('Network topology explorer', 'Explore a simulated branch network: routers, switches, VLANs, firewalls, DNS, and application servers.')
  return (
    <div className="page">
      <PageHeader
        eyebrow="Networking tool"
        title="Network topology explorer"
        lead="A simulated branch office with three VLANs. Select any device to see its routing table, VLAN membership, IP settings, or firewall policy, and how it fits the whole."
        actions={<ButtonLink to="/learn/networking" variant="secondary">Networking path</ButtonLink>}
      />
      <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="Topology scenario">
        {([['normal', 'Healthy network'], ['dns', 'DNS failure'], ['vlan', 'Wrong VLAN']] as const).map(([id, label]) => <button key={id} type="button" aria-pressed={incident === id} className={`rounded-md border px-3 py-2 text-sm ${incident === id ? 'border-accent bg-accent/10 text-accent' : 'border-line bg-surface text-fg-muted hover:text-fg'}`} onClick={() => setParams(id === 'normal' ? {} : { incident: id })}>{label}</button>)}
      </div>
      <NetworkTopology incident={incident} />
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          ['Follow a packet', 'PC-114 wants app.lab.example. It asks DNS1, which is in another VLAN, so the request goes to its gateway on R1, then down the trunk to VLAN 20.'],
          ['Why VLANs matter', 'Guests share the switch with staff but sit in VLAN 30. Without a route and firewall rule, they cannot reach staff devices.'],
          ['Read the policy', 'FW1 allows inside users out on web ports, allows HTTPS to APP1, and denies everything else, logging the rest.'],
        ].map(([t, b]) => (
          <div key={t} className="panel panel-pad">
            <h2 className="font-semibold">{t}</h2>
            <p className="mt-1 text-sm text-fg-muted">{b}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
