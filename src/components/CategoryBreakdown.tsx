import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'
import { CatAgg } from '../lib/aggregate'
import { getCategory } from '../lib/categories'
import { formatCurrency } from '../lib/currency'

export function CategoryBreakdown({ data, total }: { data: CatAgg[]; total: number }) {
  const [active, setActive] = useState<number | null>(null)
  if (!data.length) return null
  return (
    <Card>
      <CardHeader><CardTitle>Spending by Category</CardTitle></CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative w-44 h-44 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} dataKey="amount" innerRadius={58} outerRadius={80} paddingAngle={2} startAngle={90} endAngle={-270}>
                  {data.map((d, i) => (
                    <Cell key={d.category} fill={getCategory(d.category).color} stroke="none" opacity={active === null || active === i ? 1 : 0.35} style={{ transition: 'opacity 0.2s', transform: active === i ? 'scale(1.04)' : 'scale(1)', transformOrigin: 'center' }} onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[10px] text-black/40 uppercase tracking-wider">Total</span>
              <span className="font-display font-bold text-xl tracking-tight">{formatCurrency(active !== null ? data[active].amount : total)}</span>
            </div>
          </div>
          <div className="flex-1 w-full space-y-1.5 max-h-44 overflow-y-auto">
            {data.map((d, i) => {
              const c = getCategory(d.category)
              return (
                <motion.div key={d.category} onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)} className="flex items-center gap-3 px-2 py-1.5 rounded-xl cursor-default transition-colors" style={{ background: active === i ? `${c.color}12` : 'transparent' }}>
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: c.color }} />
                  <span className="text-sm flex-1 truncate">{c.label}</span>
                  <span className="text-sm font-medium">{formatCurrency(d.amount)}</span>
                  <span className="text-xs text-black/40 w-10 text-right">{d.percentage.toFixed(0)}%</span>
                </motion.div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}