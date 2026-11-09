/**
 * Lightweight SVG charts for the progress dashboard. Single series only, so the title names the
 * series and no legend box is drawn. Marks follow the data-viz specs: 2px lines, a 10% area wash,
 * bars at most 24px with 4px rounded data ends, hairline solid gridlines, end dots with a 2px
 * surface ring, a hover crosshair and tooltip, and a table view for every chart.
 */
import { useId, useMemo, useRef, useState, type ReactNode } from 'react'
import { Table2, LineChart as LineIcon } from 'lucide-react'

export interface Point {
  label: string
  value: number
}

interface FrameProps {
  title: string
  subtitle?: string
  unit?: string
  data: Point[]
  children: (w: number, h: number) => ReactNode
  height?: number
  empty?: string
}

function niceMax(v: number): number {
  if (v <= 0) return 10
  const p = 10 ** Math.floor(Math.log10(v))
  for (const m of [1, 2, 2.5, 5, 10]) if (m * p >= v) return m * p
  return 10 * p
}

function ChartFrame({ title, subtitle, unit = '', data, children, height = 200, empty }: FrameProps) {
  const [table, setTable] = useState(false)
  const id = useId()
  return (
    <figure className="panel panel-pad" aria-labelledby={`${id}-t`}>
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <figcaption id={`${id}-t`} className="text-h3 text-fg">
            {title}
          </figcaption>
          {subtitle && <p className="mt-0.5 text-sm text-fg-subtle">{subtitle}</p>}
        </div>
        {data.length > 0 && (
          <button
            type="button"
            onClick={() => setTable((t) => !t)}
            className="inline-flex h-9 items-center gap-1.5 rounded-md border border-line px-2.5 text-xs text-fg-muted interactive"
            aria-pressed={table}
          >
            {table ? <LineIcon className="h-3.5 w-3.5" aria-hidden /> : <Table2 className="h-3.5 w-3.5" aria-hidden />}
            {table ? 'Chart' : 'Table'}
          </button>
        )}
      </div>
      {data.length === 0 ? (
        <div className="flex items-center justify-center rounded-md border border-dashed border-line text-sm text-fg-subtle" style={{ height }}>
          {empty ?? 'No data yet.'}
        </div>
      ) : table ? (
        <div className="max-h-72 overflow-auto" tabIndex={0} aria-label={`${title} data table`}>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-fg-subtle">
                <th className="py-1.5 font-medium">Period</th>
                <th className="py-1.5 text-right font-medium">Value</th>
              </tr>
            </thead>
            <tbody className="tabular-nums">
              {data.map((d, i) => (
                <tr key={i} className="border-t border-line">
                  <td className="py-1.5 text-fg-muted">{d.label}</td>
                  <td className="py-1.5 text-right text-fg">
                    {d.value}
                    {unit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Measure height={height}>{children}</Measure>
      )}
    </figure>
  )
}

function Measure({ height, children }: { height: number; children: (w: number, h: number) => ReactNode }) {
  // A fixed viewBox scales to the container, which keeps the SVG responsive without resize observers.
  const w = 640
  return (
    <div className="relative w-full" style={{ aspectRatio: `${w} / ${height}` }}>
      {children(w, height)}
    </div>
  )
}

const PAD = { l: 40, r: 16, t: 12, b: 28 }

export function LineChart({ title, subtitle, data, unit = '', yMax, height = 200, empty }: { title: string; subtitle?: string; data: Point[]; unit?: string; yMax?: number; height?: number; empty?: string }) {
  return (
    <ChartFrame title={title} subtitle={subtitle} data={data} unit={unit} height={height} empty={empty}>
      {(w, h) => <LinePlot data={data} w={w} h={h} unit={unit} yMax={yMax} label={title} />}
    </ChartFrame>
  )
}

function LinePlot({ data, w, h, unit, yMax, label }: { data: Point[]; w: number; h: number; unit: string; yMax?: number; label: string }) {
  const [hover, setHover] = useState<number | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const max = yMax ?? niceMax(Math.max(...data.map((d) => d.value)))
  const iw = w - PAD.l - PAD.r
  const ih = h - PAD.t - PAD.b
  const x = (i: number) => PAD.l + (data.length === 1 ? iw / 2 : (i / (data.length - 1)) * iw)
  const y = (v: number) => PAD.t + ih - (v / max) * ih
  const path = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(d.value).toFixed(1)}`).join(' ')
  const area = `${path} L${x(data.length - 1).toFixed(1)},${PAD.t + ih} L${x(0).toFixed(1)},${PAD.t + ih} Z`
  const ticks = [0, max / 2, max]
  const labelEvery = Math.max(1, Math.ceil(data.length / 6))
  const last = data.length - 1

  const onMove = (clientX: number) => {
    const r = svgRef.current?.getBoundingClientRect()
    if (!r) return
    const px = ((clientX - r.left) / r.width) * w
    const i = Math.round(((px - PAD.l) / iw) * (data.length - 1))
    setHover(Math.max(0, Math.min(last, i)))
  }

  return (
    <>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${w} ${h}`}
        className="absolute inset-0 h-full w-full overflow-visible"
        role="img"
        aria-label={`${label}. ${data.length} points, latest ${data[last]!.value}${unit}.`}
        onMouseMove={(e) => onMove(e.clientX)}
        onMouseLeave={() => setHover(null)}
        onTouchMove={(e) => e.touches[0] && onMove(e.touches[0].clientX)}
        onTouchEnd={() => setHover(null)}
      >
        {ticks.map((t) => (
          <g key={t}>
            <line x1={PAD.l} x2={w - PAD.r} y1={y(t)} y2={y(t)} stroke="rgb(var(--line))" strokeWidth={1} />
            <text x={PAD.l - 8} y={y(t)} dy="0.32em" textAnchor="end" className="fill-fg-subtle text-[11px] tabular-nums">
              {Math.round(t)}
            </text>
          </g>
        ))}
        {data.map((d, i) =>
          i % labelEvery === 0 || i === last ? (
            <text key={i} x={x(i)} y={h - 8} textAnchor="middle" className="fill-fg-subtle text-[11px]">
              {d.label}
            </text>
          ) : null
        )}
        <path d={area} fill="rgb(var(--accent) / 0.10)" />
        <path d={path} fill="none" stroke="rgb(var(--accent))" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
        <circle cx={x(last)} cy={y(data[last]!.value)} r={4} fill="rgb(var(--accent))" stroke="rgb(var(--surface))" strokeWidth={2} />
        <text x={x(last)} y={y(data[last]!.value) - 10} textAnchor="end" className="fill-fg text-[12px] font-semibold tabular-nums">
          {data[last]!.value}
          {unit}
        </text>
        {hover !== null && (
          <g pointerEvents="none">
            <line x1={x(hover)} x2={x(hover)} y1={PAD.t} y2={PAD.t + ih} stroke="rgb(var(--fg-subtle))" strokeWidth={1} />
            <circle cx={x(hover)} cy={y(data[hover]!.value)} r={5} fill="rgb(var(--accent))" stroke="rgb(var(--surface))" strokeWidth={2} />
          </g>
        )}
        <rect x={PAD.l} y={PAD.t} width={iw} height={ih} fill="transparent" />
      </svg>
      {hover !== null && (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-md border border-line-strong bg-elevated px-2.5 py-1.5 text-xs shadow-e2"
          style={{ left: `${(x(hover) / w) * 100}%`, top: `${(y(data[hover]!.value) / h) * 100}%`, marginTop: -10 }}
        >
          <div className="text-fg-subtle">{data[hover]!.label}</div>
          <div className="font-semibold tabular-nums text-fg">
            {data[hover]!.value}
            {unit}
          </div>
        </div>
      )}
    </>
  )
}

export function BarChart({ title, subtitle, data, unit = '', height = 200, empty }: { title: string; subtitle?: string; data: Point[]; unit?: string; height?: number; empty?: string }) {
  return (
    <ChartFrame title={title} subtitle={subtitle} data={data} unit={unit} height={height} empty={empty}>
      {(w, h) => <BarPlot data={data} w={w} h={h} unit={unit} label={title} />}
    </ChartFrame>
  )
}

function BarPlot({ data, w, h, unit, label }: { data: Point[]; w: number; h: number; unit: string; label: string }) {
  const [hover, setHover] = useState<number | null>(null)
  const max = niceMax(Math.max(...data.map((d) => d.value)))
  const iw = w - PAD.l - PAD.r
  const ih = h - PAD.t - PAD.b
  const band = iw / data.length
  const bw = Math.min(24, band * 0.6)
  const y = (v: number) => PAD.t + ih - (v / max) * ih
  const r = 4
  const labelEvery = Math.max(1, Math.ceil(data.length / 8))
  const bars = useMemo(
    () =>
      data.map((d, i) => {
        const cx = PAD.l + band * i + band / 2
        const top = y(d.value)
        const height = PAD.t + ih - top
        const rr = Math.min(r, height)
        // Rounded data end, square at the baseline.
        const x0 = cx - bw / 2
        const x1 = cx + bw / 2
        const base = PAD.t + ih
        const p = height <= 0 ? '' : `M${x0},${base} L${x0},${top + rr} Q${x0},${top} ${x0 + rr},${top} L${x1 - rr},${top} Q${x1},${top} ${x1},${top + rr} L${x1},${base} Z`
        return { cx, top, p }
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, w, h]
  )
  return (
    <>
      <svg viewBox={`0 0 ${w} ${h}`} className="absolute inset-0 h-full w-full overflow-visible" role="img" aria-label={`${label}. ${data.length} bars.`}>
        {[0, max / 2, max].map((t) => (
          <g key={t}>
            <line x1={PAD.l} x2={w - PAD.r} y1={y(t)} y2={y(t)} stroke="rgb(var(--line))" strokeWidth={1} />
            <text x={PAD.l - 8} y={y(t)} dy="0.32em" textAnchor="end" className="fill-fg-subtle text-[11px] tabular-nums">
              {Math.round(t)}
            </text>
          </g>
        ))}
        {bars.map((b, i) => (
          <g key={i} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
            <rect x={PAD.l + band * i} y={PAD.t} width={band} height={ih} fill="transparent" />
            {b.p && <path d={b.p} fill={hover === i ? 'rgb(var(--accent))' : 'rgb(var(--accent) / 0.85)'} />}
            {(i % labelEvery === 0 || i === data.length - 1) && (
              <text x={b.cx} y={h - 8} textAnchor="middle" className="fill-fg-subtle text-[11px]">
                {data[i]!.label}
              </text>
            )}
          </g>
        ))}
      </svg>
      {hover !== null && (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-md border border-line-strong bg-elevated px-2.5 py-1.5 text-xs shadow-e2"
          style={{ left: `${(bars[hover]!.cx / w) * 100}%`, top: `${(bars[hover]!.top / h) * 100}%`, marginTop: -8 }}
        >
          <div className="text-fg-subtle">{data[hover]!.label}</div>
          <div className="font-semibold tabular-nums text-fg">
            {data[hover]!.value}
            {unit}
          </div>
        </div>
      )}
    </>
  )
}

/** Small inline sparkline for results panels. Decorative; the numbers are shown beside it. */
export function Sparkline({ values, height = 48 }: { values: number[]; height?: number }) {
  if (values.length < 2) return null
  const w = 240
  const max = Math.max(...values, 1)
  const pts = values.map((v, i) => `${((i / (values.length - 1)) * w).toFixed(1)},${(height - 4 - (v / max) * (height - 8)).toFixed(1)}`).join(' ')
  return (
    <svg viewBox={`0 0 ${w} ${height}`} className="h-12 w-full" aria-hidden preserveAspectRatio="none">
      <polyline points={pts} fill="none" stroke="rgb(var(--accent))" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}
