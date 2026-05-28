import { Card } from './ui/card'
import { Button } from './ui/button'
import { Receipt, Plus } from 'lucide-react'
import { motion } from 'framer-motion'
export function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
      <Card className="py-16 flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-3xl bg-[#0A84FF]/10 flex items-center justify-center mb-5">
          <Receipt size={36} className="text-[#0A84FF]" strokeWidth={1.5} />
        </div>
        <h3 className="font-display font-bold text-xl mb-1">No expenses yet</h3>
        <p className="text-black/40 text-sm mb-6 max-w-xs">Start tracking your spending for this month by logging your first expense.</p>
        <Button onClick={onAdd}><Plus size={18} /> Add your first expense</Button>
      </Card>
    </motion.div>
  )
}