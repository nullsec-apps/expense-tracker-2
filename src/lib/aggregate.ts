import { Expense } from './sampleData'
import { monthKey, daysElapsed } from './date'

export function expensesForMonth(all: Expense[], key: string): Expense[] {
  return all.filter(e => monthKey(new Date(e.date)) === key).sort((a, b) => +new Date(b.date) - +new Date(a.date))
}

export function total(expenses: Expense[]): number {
  return expenses.reduce((s, e) => s + e.amount, 0)
}

export interface CatAgg { category: string; amount: number; percentage: number; count: number }

export function aggregateByCategory(expenses: Expense[]): CatAgg[] {
  const map = new Map<string, { amount: number; count: number }>()
  for (const e of expenses) {
    const cur = map.get(e.category) || { amount: 0, count: 0 }
    map.set(e.category, { amount: cur.amount + e.amount, count: cur.count + 1 })
  }
  const t = total(expenses) || 1
  return Array.from(map.entries()).map(([category, v]) => ({ category, amount: v.amount, count: v.count, percentage: (v.amount / t) * 100 })).sort((a, b) => b.amount - a.amount)
}

export function groupByDay(expenses: Expense[]): { day: string; items: Expense[] }[] {
  const map = new Map<string, Expense[]>()
  for (const e of expenses) {
    const k = new Date(e.date).toDateString()
    if (!map.has(k)) map.set(k, [])
    map.get(k)!.push(e)
  }
  return Array.from(map.entries()).map(([day, items]) => ({ day: items[0].date, items })).sort((a, b) => +new Date(b.day) - +new Date(a.day))
}

export function dailyAverage(expenses: Expense[], key: string): number {
  const elapsed = daysElapsed(key) || 1
  return total(expenses) / elapsed
}

export function projectedSpend(expenses: Expense[], key: string, monthDays: number): number {
  return dailyAverage(expenses, key) * monthDays
}