import { useState, useEffect } from 'react'
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) as T : initial } catch { return initial }
  })
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(value)) } catch {} }, [key, value])
  return [value, setValue] as const
}