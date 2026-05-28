import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { X } from 'lucide-react'
import { CATEGORIES } from '../lib/categories'
import { useStore } from '../hooks/useStore'
import { Expense } from '../lib/sampleData'
import { cn } from '@/lib/utils'

interface Props { open: boolean; onClose: () => void; editing?: Expense | null }

export function AddExpenseDialog({ open, onClose, editing }: Props) {
  const { addExpense, updateExpense } = useStore()
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('food')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [err, setErr] = useState('')

  useEffect(() => {
    if (open) {
      if (editing) { setAmount(String(editing.amount)); setCategory(editing.category); setDescription(editing.description); setDate(editing.date.slice(0, 10)) }
      else { setAmount(''); setCategory('food'); setDescription(''); setDate(new Date().toISOString().slice(0, 10)) }
      setErr('')
    }
  }, [open, editing])

  const submit = () => {
    const n = parseFloat(amount)
    if (isNaN(n) || n <= 0) { setErr('Enter a valid amount'); return }
    if (!description.trim()) { setErr('Add a description'); return }
    const payload = { amount: n, category, description: description.trim(), date: new Date(date + 'T12:00:00').toISOString() }
    if (editing) updateExpense(editing.id, payload); else addExpense(payload)
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <motion.div className="absolute inset-0 bg-black/20 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.div initial={{ scale: 0.92, opacity: 0, y: 40 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} transition={{ type: 'spring', stiffness: 320, damping: 28 }} className="relative w-full sm:max-w-md glass rounded-t-3xl sm:rounded-3xl border border-white/60 shadow-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display font-bold text-xl tracking-tight">{editing ? 'Edit Expense' : 'Add Expense'}</h2>
              <Button size="icon" variant="ghost" onClick={onClose}><X size={18} /></Button>
            </div>
            <div className="space-y-4">
              <div className="text-center py-2">
                <div className="relative inline-flex items-center">
                  <span className="text-3xl font-display font-bold text-black/30">$</span>
                  <input autoFocus value={amount} onChange={e => setAmount(e.target.value.replace(/[^0-9.]/g, ''))} placeholder="0" inputMode="decimal" className="text-5xl font-display font-bold tracking-tight bg-transparent text-center outline-none w-44 placeholder:text-black/20" />
                </div>
              </div>
              <div>
                <label className="text-xs text-black/40 mb-2 block">Category</label>
                <div className="grid grid-cols-5 gap-2">
                  {CATEGORIES.map(c => (
                    <button key={c.id} onClick={() => setCategory(c.id)} className={cn('flex flex-col items-center gap-1 p-2 rounded-2xl transition-all', category === c.id ? 'scale-105' : 'opacity-50 hover:opacity-100')} style={{ background: category === c.id ? `${c.color}1a` : 'transparent' }}>
                      <c.icon size={20} style={{ color: c.color }} />
                      <span className="text-[9px] text-black/50 leading-tight text-center">{c.label.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>
              <Input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
              <Input type="date" value={date} onChange={e => setDate(e.target.value)} />
              {err && <p className="text-xs text-[#FF453A] text-center">{err}</p>}
              <Button className="w-full h-12" onClick={submit}>{editing ? 'Save Changes' : 'Add Expense'}</Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}