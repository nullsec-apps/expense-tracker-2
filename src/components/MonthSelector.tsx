import { Button } from './ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useStore } from '../hooks/useStore'
import { monthLabel, shiftMonth, monthKey } from '../lib/date'
export function MonthSelector() {
  const { month, setMonth } = useStore()
  const isCurrent = month === monthKey(new Date())
  return (
    <div className="flex items-center gap-1 rounded-full glass border border-white/60 p-1 shadow-sm">
      <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setMonth(shiftMonth(month, -1))}><ChevronLeft size={18} /></Button>
      <span className="font-display font-semibold text-sm px-2 min-w-[7.5rem] text-center">{monthLabel(month)}</span>
      <Button size="icon" variant="ghost" className="h-8 w-8" disabled={isCurrent} onClick={() => setMonth(shiftMonth(month, 1))}><ChevronRight size={18} /></Button>
    </div>
  )
}