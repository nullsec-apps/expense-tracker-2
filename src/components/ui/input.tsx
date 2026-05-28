import * as React from 'react'
import { cn } from '@/lib/utils'
const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, type, ...props }, ref) => (
  <input type={type} className={cn('flex h-11 w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-2 text-sm transition-all placeholder:text-black/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A84FF]/40 focus-visible:border-[#0A84FF]', className)} ref={ref} {...props} />
))
Input.displayName = 'Input'
export { Input }