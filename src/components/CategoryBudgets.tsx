import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Pencil, Check } from 'lucide-react'
import { CATEGORIES, getCategory } from '../lib/categories'
import { formatCurrency } from '../lib/currency'
import { useStore } from '../hooks/useStore'
import { CatAgg } from '../lib/aggregate'
import { motion } from 'framer-motion'

export function CategoryBudgets({ data }: { data: CatAgg[] }) {
  const { budget, setCategoryBudget } = useStore()
  const [edit, setEdit] = useState<string | null>(null)
  const [draft, setDraft] = useState('')
  const spentMap = new Map(data.map(d => [d.category, d.amount]))
  const items = CATEGORIES.filter(c => budget.categories[c.id] || spentMap.get(c.id))
  return (
    <Card>
      <CardHeader><CardTitle>Category Budgets</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        {items.map(c => {
          const cap = budget.categories[c.id] || 0
          const spent = spentMap.get(c.id) || 0
          const pct = cap ? Math.min((spent / cap) * 100, 100) : 0
          const over = cap > 0 && spent > cap
          const warn = cap > 0 && spent > cap * 0.85
          const color = over ? '#FF453A' : warn ? '#FF9F0A' : c.color
          return (
            <div key={c.id}>
              <div className="flex items-center gap-2 mb-1.5">
                <c.icon size={16} style={{ color: c.color }} />
                <span className="text-sm flex-1">{c.label}</span>
                {edit === c.id ? (
                  <div className="flex items-center gap-1">
                    <Input className="h-7 w-20 text-xs" type="number" value={draft} onChange={e => setDraft(e.target.value)} autoFocus />
                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => { const n = parseFloat(draft); if (!isNaN(n)) setCategoryBudget(c.id, n); setEdit(null) }}><Check size={14} className="text-[#30D158]" /></Button>
                  </div>
                ) : (
                  <button onClick={() => { setDraft(String(cap)); setEdit(c.id) }} className="text-xs text-black/50 hover:text-black flex items-center gap-1 transition-colors">
                    {formatCurrency(spent)} / {formatCurrency(cap)} <Pencil size={11} />
                  </button>
                )}
              </div>
              <div className="h-2 rounded-full bg-black/[0.06] overflow-hidden">
                <motion.div className="h-full rounded-full" style={{ background: color }} initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} />
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}