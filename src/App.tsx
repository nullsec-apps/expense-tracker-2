import { useState } from 'react'
import { motion } from 'framer-motion'
import { StoreProvider, useStore } from './hooks/useStore'
import { Button } from './components/ui/button'
import { MonthSelector } from './components/MonthSelector'
import { SummaryStats } from './components/SummaryStats'
import { CategoryBreakdown } from './components/CategoryBreakdown'
import { BudgetTracker } from './components/BudgetTracker'
import { CategoryBudgets } from './components/CategoryBudgets'
import { ExpenseList } from './components/ExpenseList'
import { AddExpenseDialog } from './components/AddExpenseDialog'
import { EmptyState } from './components/EmptyState'
import { LayoutGrid, Receipt, PieChart, Wallet, Plus } from 'lucide-react'
import { expensesForMonth, total, aggregateByCategory, dailyAverage, projectedSpend } from './lib/aggregate'
import { shiftMonth, daysInMonth } from './lib/date'
import { Expense } from './lib/sampleData'
import { cn } from './lib/utils'

const NAV = [
  { id: 'overview', label: 'Overview', icon: LayoutGrid },
  { id: 'expenses', label: 'Expenses', icon: Receipt },
  { id: 'categories', label: 'Categories', icon: PieChart },
  { id: 'budget', label: 'Budget', icon: Wallet },
]

function Dashboard() {
  const { expenses, month } = useStore()
  const [tab, setTab] = useState('overview')
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Expense | null>(null)

  const monthExp = expensesForMonth(expenses, month)
  const lastExp = expensesForMonth(expenses, shiftMonth(month, -1))
  const spent = total(monthExp)
  const lastSpent = total(lastExp)
  const agg = aggregateByCategory(monthExp)
  const avg = dailyAverage(monthExp, month)
  const projected = projectedSpend(monthExp, month, daysInMonth(month))
  const { budget } = useStore()

  const openAdd = () => { setEditing(null); setOpen(true) }
  const openEdit = (e: Expense) => { setEditing(e); setOpen(true) }

  const empty = monthExp.length === 0

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-60 shrink-0 p-6 border-r border-black/[0.06]">
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="w-9 h-9 rounded-2xl bg-[#0A84FF] flex items-center justify-center"><Wallet size={20} className="text-white" /></div>
          <span className="font-display font-bold text-lg tracking-tight">Ledger</span>
        </div>
        <nav className="space-y-1">
          {NAV.map(n => (
            <button key={n.id} onClick={() => setTab(n.id)} className={cn('w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-medium transition-all', tab === n.id ? 'bg-white shadow-sm text-[#0A84FF]' : 'text-black/50 hover:text-black hover:bg-black/[0.03]')}>
              <n.icon size={18} strokeWidth={2} /> {n.label}
            </button>
          ))}
        </nav>
        <div className="mt-auto">
          <Button className="w-full" onClick={openAdd}><Plus size={18} /> Add Expense</Button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-x-hidden pb-24 md:pb-8">
        <div className="max-w-[1100px] mx-auto px-4 md:px-8 py-6 md:py-8">
          <header className="flex items-center justify-between gap-3 mb-6 md:mb-8">
            <div>
              <h1 className="font-display font-bold text-2xl md:text-3xl tracking-tight">{NAV.find(n => n.id === tab)?.label}</h1>
            </div>
            <div className="flex items-center gap-2">
              <MonthSelector />
              <Button className="hidden sm:flex md:hidden" onClick={openAdd}><Plus size={18} /> Add</Button>
            </div>
          </header>

          {empty ? <EmptyState onAdd={openAdd} /> : (
            <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              {tab === 'overview' && (
                <div className="space-y-4 md:space-y-6">
                  <SummaryStats spent={spent} lastSpent={lastSpent} remaining={budget.total - spent} dailyAvg={avg} topCat={agg[0]} />
                  <div className="grid lg:grid-cols-2 gap-4 md:gap-6">
                    <CategoryBreakdown data={agg} total={spent} />
                    <BudgetTracker spent={spent} projected={projected} />
                  </div>
                  <ExpenseList expenses={monthExp} onEdit={openEdit} />
                </div>
              )}
              {tab === 'expenses' && <ExpenseList expenses={monthExp} onEdit={openEdit} full />}
              {tab === 'categories' && (
                <div className="grid lg:grid-cols-2 gap-4 md:gap-6">
                  <CategoryBreakdown data={agg} total={spent} />
                  <CategoryBudgets data={agg} />
                </div>
              )}
              {tab === 'budget' && (
                <div className="grid lg:grid-cols-2 gap-4 md:gap-6">
                  <BudgetTracker spent={spent} projected={projected} />
                  <CategoryBudgets data={agg} />
                </div>
              )}
            </motion.div>
          )}
        </div>
      </main>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 glass border-t border-white/60 flex items-center justify-around px-2 py-2">
        {NAV.map(n => (
          <button key={n.id} onClick={() => setTab(n.id)} className={cn('flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-colors', tab === n.id ? 'text-[#0A84FF]' : 'text-black/40')}>
            <n.icon size={20} /> <span className="text-[10px] font-medium">{n.label}</span>
          </button>
        ))}
      </nav>
      <button onClick={openAdd} className="md:hidden fixed bottom-20 right-5 z-40 w-14 h-14 rounded-full bg-[#0A84FF] text-white shadow-lg flex items-center justify-center active:scale-90 transition-transform"><Plus size={26} /></button>

      <AddExpenseDialog open={open} onClose={() => setOpen(false)} editing={editing} />
    </div>
  )
}

export default function App() {
  return <StoreProvider><Dashboard /></StoreProvider>
}