import { motion } from 'framer-motion'
export function BudgetRing({ value, max, size = 180, stroke = 14 }: { value: number; max: number; size?: number; stroke?: number }) {
  const pct = max > 0 ? Math.min(value / max, 1) : 0
  const over = value > max
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const color = over ? '#FF453A' : pct > 0.85 ? '#FF9F0A' : '#30D158'
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth={stroke} />
      <motion.circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeDasharray={c} initial={{ strokeDashoffset: c }} animate={{ strokeDashoffset: c - c * pct }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} />
    </svg>
  )
}