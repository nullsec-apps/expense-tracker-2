import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Wallet, Calendar, PieChart } from 'lucide-react'
import { formatCurrency, formatCompact } from '../lib/currency'
import { getCategory } from '../lib/categories'
import { CatAgg } from '../lib/aggregate'

interface Props { spent: number; lastSpent: number; remaining: number; dailyAvg: number; topCat?: CatAgg }

export function SummaryStats({ spent, lastSpent, remaining, dailyAvg, topCat }: Props) {
  const trend = lastSpent ? ((spent - lastSpent) / lastSpent) * 100 : 0
  const up = trend >= 0
  const cat = topCat ? getCategory(topCat.category) : null
  const stats = [
    { label: 'Spent this month', value: formatCurrency(spent), icon: Wallet, color: '#0A84FF', extra: lastSpent ? <Badge className={up ? 'bg-[#FF453A]/10 text-[#FF453A]' : 'bg-[#30D158]/10 text-[#30D158]'}>{up ? <TrendingUp size={12}/> : <TrendingDown size={12}/>}<span className="ml-1">{Math.abs(trend).toFixed(0)}%</span></Badge> : null },
    { label: 'Remaining budget', value: formatCurrency(Math.max(0, remaining)), icon: PieChart, color: remaining < 0 ? '#FF453A' : '#30D158', extra: <Badge className="bg-black/5 text-black/50">{remaining < 0 ? 'Over' : 'Left'}</Badge> },
    { label: 'Daily average', value: formatCurrency(dailyAvg), icon: Calendar, color: '#BF5AF2', extra: null },
    { label: 'Top category', value: cat ? cat.label : '—', icon: cat?.icon || Wallet, color: cat?.color || '#8E8E93', extra: topCat ? <Badge className="bg-black/5 text-black/50">{formatCompact(topCat.amount)}</Badge> : null },
  ]
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      {stats.map((s, i) => (
        <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06, type: 'spring', stiffness: 300, damping: 26 }}>
          <Card className="p-4 md:p-5 h-full">
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-2xl flex items-center justify-center" style={{ background: `${s.color}1a` }}>
                <s.icon size={18} style={{ color: s.color }} strokeWidth={2} />
              </div>
              {s.extra}
            </div>
            <div className="text-xs text-black/40 mb-1">{s.label}</div>
            <div className="font-display font-bold text-lg md:text-2xl tracking-tight truncate">{s.value}</div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}