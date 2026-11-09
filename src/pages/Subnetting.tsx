import { useMemo, useState } from 'react'
import { CheckCircle2, XCircle, RefreshCw } from 'lucide-react'
import { Button, PageHeader, Segmented } from '../components/ui'
import { usePageMeta } from '../app/context'
import { checkAnswer, explain, FIELD_LABELS, generateQuestion, maskInt, subnetInfo, toBinary, ipToInt, type SubnetField } from '../lib/subnet'
import { recordSubnet, useAppData } from '../lib/storage/store'

type Level = 'beginner' | 'intermediate' | 'advanced'

function BinaryView({ ip, prefix }: { ip: string; prefix: number }) {
  const bits = toBinary(ipToInt(ip)).replace(/\./g, '')
  const mask = toBinary(maskInt(prefix)).replace(/\./g, '')
  const row = (b: string, label: string) => (
    <div className="flex items-center gap-3">
      <span className="w-14 shrink-0 text-right text-2xs text-fg-subtle">{label}</span>
      <span className="flex font-mono text-[13px]">
        {b.split('').map((x, i) => (
          <span key={i} className={`${i < prefix ? 'text-accent' : 'text-violet'} ${i % 8 === 7 && i < 31 ? 'mr-2' : ''}`}>
            {x}
          </span>
        ))}
      </span>
    </div>
  )
  return (
    <figure className="scroll-x rounded-md border border-line bg-sunken p-3" tabIndex={0} aria-label="Address and mask in binary">
      <div className="w-max space-y-1">
        {row(bits, 'Address')}
        {row(mask, 'Mask')}
      </div>
      <figcaption className="mt-2 text-2xs text-fg-subtle">
        <span className="text-accent">Network bits ({prefix})</span> · <span className="text-violet">Host bits ({32 - prefix})</span>
      </figcaption>
    </figure>
  )
}

export default function Subnetting() {
  usePageMeta('Subnetting trainer', 'Practice CIDR, subnet masks, network and broadcast addresses, and host ranges with step-by-step explanations.')
  const data = useAppData()
  const [level, setLevel] = useState<Level>('intermediate')
  const [seed, setSeed] = useState(() => Math.floor(Math.random() * 1e9))
  const q = useMemo(() => generateQuestion(seed, level), [seed, level])
  const [answers, setAnswers] = useState<Partial<Record<SubnetField, string>>>({})
  const [checked, setChecked] = useState<Partial<Record<SubnetField, boolean>> | null>(null)
  const info = subnetInfo(q.ip, q.prefix)

  const check = () => {
    const res: Partial<Record<SubnetField, boolean>> = {}
    for (const f of q.fields) {
      res[f] = checkAnswer(q, f, answers[f] ?? '')
      recordSubnet(!!res[f])
    }
    setChecked(res)
  }
  const next = () => {
    setSeed((s) => s + 1)
    setAnswers({})
    setChecked(null)
  }
  const correct = checked ? Object.values(checked).filter(Boolean).length : 0

  return (
    <div className="page max-w-5xl">
      <PageHeader
        eyebrow="Networking tool"
        title="Subnetting trainer"
        lead="Each exercise is generated, so you never run out. Answers are checked exactly, and every result comes with the working."
        actions={<span className="text-sm text-fg-subtle">All time: {data.subnet.correct} of {data.subnet.attempts} fields correct</span>}
      />
      <div className="mb-6">
        <Segmented
          label="Level"
          value={level}
          onChange={(v) => {
            setLevel(v)
            setAnswers({})
            setChecked(null)
          }}
          options={[
            { value: 'beginner', label: 'Beginner: /24' },
            { value: 'intermediate', label: 'Intermediate: /24–/30' },
            { value: 'advanced', label: 'Advanced: /16–/30' },
          ]}
        />
      </div>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="panel panel-pad">
          <p className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">Address</p>
          <p className="mt-1 break-all font-mono text-2xl font-semibold text-fg sm:text-3xl">
            {q.ip}
            <span className="text-accent">/{q.prefix}</span>
          </p>
          <form
            className="mt-6 grid gap-3"
            onSubmit={(e) => {
              e.preventDefault()
              if (checked) next()
              else check()
            }}
          >
            {q.fields.map((f) => (
              <label key={f} className="grid gap-1 sm:grid-cols-[10rem_1fr] sm:items-center">
                <span className="text-sm text-fg-muted">{FIELD_LABELS[f]}</span>
                <span className="relative">
                  <input
                    value={answers[f] ?? ''}
                    onChange={(e) => setAnswers((a) => ({ ...a, [f]: e.target.value }))}
                    readOnly={!!checked}
                    inputMode={f === 'usableHosts' ? 'numeric' : 'decimal'}
                    autoComplete="off"
                    className={`h-11 w-full rounded-md border bg-sunken px-3 pr-9 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 ${
                      checked ? (checked[f] ? 'border-ok' : 'border-err') : 'border-line-strong focus:border-accent'
                    }`}
                    placeholder={f === 'usableHosts' ? 'number of hosts' : 'a.b.c.d'}
                    aria-invalid={checked ? !checked[f] : undefined}
                  />
                  {checked && (checked[f] ? <CheckCircle2 className="absolute right-3 top-3.5 h-4 w-4 text-ok" aria-label="Correct" /> : <XCircle className="absolute right-3 top-3.5 h-4 w-4 text-err" aria-label="Incorrect" />)}
                </span>
                {checked && !checked[f] && (
                  <span className="text-xs text-fg-subtle sm:col-start-2">
                    Answer: <span className="font-mono text-fg">{f === 'usableHosts' ? info.usableHosts : info[f]}</span>
                  </span>
                )}
              </label>
            ))}
            <div className="mt-2 flex flex-wrap gap-2">
              {checked ? (
                <Button type="submit">
                  <RefreshCw className="h-4 w-4" aria-hidden /> Next exercise
                </Button>
              ) : (
                <>
                  <Button type="submit">Check answers</Button>
                  <Button variant="ghost" onClick={next}>Skip</Button>
                </>
              )}
            </div>
          </form>
        </div>
        <div className="space-y-4">
          <BinaryView ip={q.ip} prefix={q.prefix} />
          {checked && (
            <div className="panel panel-pad animate-fade-up" role="status">
              <p className={`font-semibold ${correct === q.fields.length ? 'text-ok' : 'text-fg'}`}>
                {correct} of {q.fields.length} correct
              </p>
              <h2 className="mt-3 text-sm font-semibold">Step by step</h2>
              <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-sm text-fg-muted">
                {explain(q).map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
            </div>
          )}
          {!checked && (
            <div className="rounded-lg border border-dashed border-line p-4 text-sm text-fg-subtle">
              Tip: find the block size first. It is 256 minus the mask value in the octet where the mask stops being 255.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
