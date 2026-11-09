/**
 * IPv4 subnetting math and deterministic exercise generation.
 * Usable hosts follow the classic rule (2^hostBits - 2) for /8 through /30. The trainer does not
 * generate /31 or /32, which have special meanings (RFC 3021 point-to-point links, host routes).
 */
import { rng } from './daily'

export function ipToInt(ip: string): number {
  const parts = ip.trim().split('.')
  if (parts.length !== 4) return NaN
  let n = 0
  for (const p of parts) {
    if (!/^\d{1,3}$/.test(p)) return NaN
    const v = Number(p)
    if (v > 255) return NaN
    n = n * 256 + v
  }
  return n >>> 0
}

export function intToIp(n: number): string {
  return [24, 16, 8, 0].map((s) => (n >>> s) & 255).join('.')
}

export function maskInt(prefix: number): number {
  return prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0
}

export function toBinary(n: number): string {
  return [24, 16, 8, 0].map((s) => ((n >>> s) & 255).toString(2).padStart(8, '0')).join('.')
}

export interface SubnetInfo {
  ip: string
  prefix: number
  mask: string
  wildcard: string
  network: string
  broadcast: string
  firstHost: string
  lastHost: string
  totalAddresses: number
  usableHosts: number
  blockSize: number
  /** Octet index (0..3) where the mask stops being 255. */
  interestingOctet: number
}

export function subnetInfo(ip: string, prefix: number): SubnetInfo {
  const addr = ipToInt(ip)
  const mask = maskInt(prefix)
  const network = (addr & mask) >>> 0
  const broadcast = (network | (~mask >>> 0)) >>> 0
  const total = 2 ** (32 - prefix)
  const interestingOctet = Math.min(3, Math.floor(prefix / 8))
  const maskOctet = (mask >>> (24 - interestingOctet * 8)) & 255
  return {
    ip,
    prefix,
    mask: intToIp(mask),
    wildcard: intToIp(~mask >>> 0),
    network: intToIp(network),
    broadcast: intToIp(broadcast),
    firstHost: intToIp(network + 1),
    lastHost: intToIp(broadcast - 1),
    totalAddresses: total,
    usableHosts: Math.max(0, total - 2),
    blockSize: prefix % 8 === 0 ? 256 : 256 - maskOctet,
    interestingOctet,
  }
}

export type SubnetField = 'mask' | 'network' | 'broadcast' | 'firstHost' | 'lastHost' | 'usableHosts'

export const FIELD_LABELS: Record<SubnetField, string> = {
  mask: 'Subnet mask',
  network: 'Network address',
  broadcast: 'Broadcast address',
  firstHost: 'First usable host',
  lastHost: 'Last usable host',
  usableHosts: 'Usable hosts',
}

export interface SubnetQuestion {
  ip: string
  prefix: number
  fields: SubnetField[]
}

const BASES = [
  [10, null, null, null],
  [172, 16, null, null],
  [192, 168, null, null],
  [192, 0, 2, null],
  [198, 51, 100, null],
  [203, 0, 113, null],
] as const

export function generateQuestion(seed: number, level: 'beginner' | 'intermediate' | 'advanced' = 'intermediate'): SubnetQuestion {
  const r = rng(seed)
  const base = BASES[Math.floor(r() * BASES.length)]!
  const octets = base.map((o) => (o === null ? Math.floor(r() * 254) + 1 : o))
  const ranges = { beginner: [24, 24], intermediate: [24, 30], advanced: [16, 30] } as const
  const [lo, hi] = ranges[level]
  let prefix = lo + Math.floor(r() * (hi - lo + 1))
  // Keep documentation /24s inside their /24.
  if (base[2] !== null) prefix = Math.max(prefix, 24)
  const fields: SubnetField[] =
    level === 'beginner' ? ['mask', 'network', 'broadcast'] : ['mask', 'network', 'broadcast', 'firstHost', 'lastHost', 'usableHosts']
  return { ip: octets.join('.'), prefix, fields }
}

export function checkAnswer(q: SubnetQuestion, field: SubnetField, answer: string): boolean {
  const info = subnetInfo(q.ip, q.prefix)
  const a = answer.trim()
  if (field === 'usableHosts') return /^\d+$/.test(a.replace(/,/g, '')) && Number(a.replace(/,/g, '')) === info.usableHosts
  const expected = info[field]
  const n = ipToInt(a)
  return !Number.isNaN(n) && intToIp(n) === expected
}

/** Step-by-step explanation shown after an answer is checked. */
export function explain(q: SubnetQuestion): string[] {
  const i = subnetInfo(q.ip, q.prefix)
  const hostBits = 32 - q.prefix
  const oct = i.interestingOctet
  const ipOct = Number(q.ip.split('.')[oct])
  const netOct = Number(i.network.split('.')[oct])
  const steps = [
    `/${q.prefix} means ${q.prefix} network bits and ${hostBits} host bits.`,
    `The mask has ${q.prefix} ones: ${toBinary(maskInt(q.prefix))}, which is ${i.mask}.`,
  ]
  if (q.prefix % 8 !== 0) {
    steps.push(
      `The interesting octet is octet ${oct + 1}. Block size = 256 - ${Number(i.mask.split('.')[oct])} = ${i.blockSize}.`,
      `${ipOct} falls in the block starting at ${netOct} (the largest multiple of ${i.blockSize} not above ${ipOct}), so the network is ${i.network}.`
    )
  } else {
    steps.push(`The prefix ends on an octet boundary, so the network keeps the first ${q.prefix / 8} octets: ${i.network}.`)
  }
  steps.push(
    `Broadcast is the last address in the block: ${i.broadcast}.`,
    `Usable hosts run from ${i.firstHost} to ${i.lastHost}: 2^${hostBits} - 2 = ${i.usableHosts.toLocaleString('en-US')}.`
  )
  return steps
}
