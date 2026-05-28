import { createContext, useContext, useState, ReactNode, useMemo } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { Expense, seedExpenses, seedBudget } from '../lib/sampleData'
import { monthKey } from '../lib/date'

interface Budget { total: number; categories: Record<string, number> }

interface Store {
  expenses: Expense[]
  addExpense: (e: Omit<Expense, 'id'>) => void
  updateExpense: (id: string, e: Omit<Expense, 'id'>) => void
  deleteExpense: (id: string) => void
  budget: Budget
  setTotalBudget: (n: number) => void
  setCategoryBudget: (cat: string, n: number) => void
  month: string
  setMonth: (m: string) => void
}

const Ctx = createContext<Store | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [expenses, setExpenses] = useLocalStorage<Expense[]>('ledger.expenses', seedExpenses())
  const [budget, setBudget] = useLocalStorage<Budget>('ledger.budget', seedBudget())
  const [month, setMonth] = useState(monthKey(new Date()))

  const value = useMemo<Store>(() => ({
    expenses,
    addExpense: (e) => setExpenses(prev => [{ ...e, id: `e-${Date.now()}-${Math.random().toString(36).slice(2, 6)}` }, ...prev]),
    updateExpense: (id, e) => setExpenses(prev => prev.map(x => x.id === id ? { ...e, id } : x)),
    deleteExpense: (id) => setExpenses(prev => prev.filter(x => x.id !== id)),
    budget,
    setTotalBudget: (n) => setBudget(b => ({ ...b, total: n })),
    setCategoryBudget: (cat, n) => setBudget(b => ({ ...b, categories: { ...b.categories, [cat]: n } })),
    month, setMonth,
  }), [expenses, budget, month, setExpenses, setBudget])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useStore() {
  const c = useContext(Ctx)
  if (!c) throw new Error('useStore must be inside StoreProvider')
  return c
}