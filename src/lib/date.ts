export function monthKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}
export function monthLabel(key: string): string {
  const [y, m] = key.split('-').map(Number)
  return new Date(y, m - 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}
export function shiftMonth(key: string, delta: number): string {
  const [y, m] = key.split('-').map(Number)
  const d = new Date(y, m - 1 + delta)
  return monthKey(d)
}
export function daysInMonth(key: string): number {
  const [y, m] = key.split('-').map(Number)
  return new Date(y, m, 0).getDate()
}
export function daysElapsed(key: string): number {
  const [y, m] = key.split('-').map(Number)
  const now = new Date()
  if (now.getFullYear() === y && now.getMonth() + 1 === m) return now.getDate()
  return daysInMonth(key)
}
export function formatDay(iso: string): string {
  const d = new Date(iso)
  const today = new Date()
  const y = new Date(); y.setDate(today.getDate() - 1)
  if (d.toDateString() === today.toDateString()) return 'Today'
  if (d.toDateString() === y.toDateString()) return 'Yesterday'
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })
}