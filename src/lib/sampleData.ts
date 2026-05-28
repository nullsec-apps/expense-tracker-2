import { monthKey, shiftMonth } from './date'

export interface Expense { id: string; amount: number; category: string; description: string; date: string }

function makeDate(monthOffset: number, day: number): string {
  const k = shiftMonth(monthKey(new Date()), monthOffset)
  const [y, m] = k.split('-').map(Number)
  return new Date(y, m - 1, day, 12).toISOString()
}

export function seedExpenses(): Expense[] {
  let id = 0
  const mk = (amount: number, category: string, description: string, off: number, day: number): Expense => ({ id: `seed-${id++}`, amount, category, description, date: makeDate(off, day) })
  return [
    mk(1450, 'housing', 'Monthly Rent', 0, 1),
    mk(64.20, 'food', 'Whole Foods groceries', 0, 2),
    mk(12.50, 'food', 'Lunch — Sweetgreen', 0, 3),
    mk(89.99, 'shopping', 'Nike running shoes', 0, 4),
    mk(45.00, 'transport', 'Uber to airport', 0, 5),
    mk(120.00, 'utilities', 'Electricity bill', 0, 6),
    mk(15.99, 'entertainment', 'Netflix subscription', 0, 7),
    mk(8.75, 'food', 'Blue Bottle coffee', 0, 8),
    mk(220.00, 'health', 'Dentist checkup', 0, 9),
    mk(34.50, 'food', 'Dinner — Tacos', 0, 11),
    mk(199.00, 'shopping', 'AirPods Pro', 0, 12),
    mk(60.00, 'transport', 'Gas fill-up', 0, 13),
    mk(42.00, 'entertainment', 'Concert tickets', 0, 14),
    mk(18.20, 'food', 'Grocery run', 0, 15),
    mk(75.00, 'utilities', 'Internet & phone', 0, 16),
    mk(310.00, 'travel', 'Hotel — weekend trip', 0, 18),
    mk(28.00, 'food', 'Brunch with friends', 0, 19),
    mk(95.00, 'education', 'Online course', 0, 20),
    mk(1450, 'housing', 'Monthly Rent', -1, 1),
    mk(280, 'food', 'Groceries (month)', -1, 5),
    mk(150, 'shopping', 'Winter jacket', -1, 8),
    mk(110, 'transport', 'Monthly transit', -1, 10),
    mk(130, 'utilities', 'Utilities', -1, 12),
    mk(180, 'entertainment', 'Streaming & games', -1, 15),
    mk(90, 'health', 'Pharmacy', -1, 20),
  ]
}

export function seedBudget() {
  return {
    total: 3000,
    categories: { food: 500, shopping: 400, transport: 200, housing: 1500, utilities: 250, health: 300, entertainment: 200, travel: 400, education: 150, other: 150 } as Record<string, number>,
  }
}