import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Pencil, Trash2 } from 'lucide-react'
import { Expense } from '../lib/sampleData'
import { getCategory, CATEGORIES } from '../lib/categories'
import { formatCurrency } from '../lib/currency'
import { groupByDay } from '../lib/aggregate'
import { formatDay } from '../lib/date'
import { useStore } from '../hooks/useStore'
import { cn } from '@/lib/utils'

export function ExpenseList({ expenses, onEdit, full }: { expenses: Expense[]; onEdit: (e: Expense) => void; full?: boolean }) {
  const { deleteExpense } = useStore()
  const [q, setQ] = useState('')
  const [filter, setFilter] = useState('all')
  const filtered = expenses.filter(e => (filter === 'all' || e.category === filter) && (!q || e.description.toLowerCase().includes(q.toLowerCase())))
  const groups = groupByDay(filtered)
  const limited = full ? groups : groups.slice(0, 3)
  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <CardTitle>{full ? 'All Expenses' : 'Recent Transactions'}</CardTitle>
        {full && (
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-black/30" />
              <Input className="pl-9 h-9 sm:w-48" placeholder="Search..." value={q} onChange={e => setQ(e.target.value)} />
            </div>
            <select value={filter} onChange={e => setFilter(e.target.value)} className="h-9 rounded-2xl border border-black/10 bg-white/80 px-3 text-sm outline-none">
              <option value="all">All categories</option>
              {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {!limited.length ? (
          <p className="text-center text-black/40 py-8 text-sm">No transactions found.</p>
        ) : (
          <div className="space-y-5">
            {limited.map(g => (
              <div key={g.day}>
                <div className="text-xs text-black/40 font-medium mb-2 px-1">{formatDay(g.day)}</div>
                <div className="space-y-1">
                  <AnimatePresence>
                    {g.items.map(e => {
                      const c = getCategory(e.category)
                      return (
                        <motion.div key={e.id} layout initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, height: 0, marginBottom: 0 }} transition={{ type: 'spring', stiffness: 400, damping: 32 }} className="group flex items-center gap-3 p-2.5 rounded-2xl hover:bg-black/[0.03] transition-colors">
                          <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0" style={{ background: `${c.color}1a` }}>
                            <c.icon size={18} style={{ color: c.color }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium truncate">{e.description}</div>
                            <div className="text-xs text-black/40">{c.label}</div>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className={cn('opacity-0 group-hover:opacity-100 transition-opacity flex gap-0.5', full && 'sm:flex')}>
                              <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => onEdit(e)}><Pencil size={14} /></Button>
                              <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => deleteExpense(e.id)}><Trash2 size={14} className="text-[#FF453A]" /></Button>
                            </div>
                            <div className="font-display font-semibold text-sm tabular-nums">{formatCurrency(e.amount)}</div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </AnimatePresence>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}