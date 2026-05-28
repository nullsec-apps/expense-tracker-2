import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { BudgetRing } from './BudgetRing'
import { Pencil, Check, X } from 'lucide-react'
import { formatCurrency } from '../lib/currency'
import { useStore } from '../hooks/useStore'

export function BudgetTracker({ spent, projected }: { spent: number; projected: number }) {
  const { budget, setTotalBudget } = useStore()
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(String(budget.total))
  const remaining = budget.total - spent
  const pct = budget.total ? (spent / budget.total) * 100 : 0
  const over = spent > budget.total
  const save = () => { const n = parseFloat(draft); if (!isNaN(n) && n >= 0) setTotalBudget(n); setEditing(false) }
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Monthly Budget</CardTitle>
        {!editing ? (
          <Button size="icon" variant="ghost" onClick={() => { setDraft(String(budget.total)); setEditing(true) }}><Pencil size={16} /></Button>
        ) : (
          <div className="flex items-center gap-1">
            <Input className="h-8 w-24" value={draft} onChange={e => setDraft(e.target.value)} type="number" autoFocus />
            <Button size="icon" variant="ghost" onClick={save}><Check size={16} className="text-[#30D158]" /></Button>
            <Button size="icon" variant="ghost" onClick={() => setEditing(false)}><X size={16} /></Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="relative">
            <BudgetRing value={spent} max={budget.total} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xs text-black/40">{over ? 'Over by' : 'Remaining'}</span>
              <span className="font-display font-bold text-2xl tracking-tight" style={{ color: over ? '#FF453A' : '#1D1D1F' }}>{formatCurrency(Math.abs(remaining))}</span>
              <span className="text-xs text-black/40 mt-0.5">of {formatCurrency(budget.total)}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 w-full mt-6">
            <div className="rounded-2xl bg-black/[0.03] p-3 text-center">
              <div className="text-xs text-black/40 mb-1">Spent</div>
              <div className="font-display font-semibold">{formatCurrency(spent)} <span className="text-xs text-black/40">({pct.toFixed(0)}%)</span></div>
            </div>
            <div className="rounded-2xl bg-black/[0.03] p-3 text-center">
              <div className="text-xs text-black/40 mb-1">Projected</div>
              <div className="font-display font-semibold" style={{ color: projected > budget.total ? '#FF9F0A' : '#1D1D1F' }}>{formatCurrency(projected)}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}