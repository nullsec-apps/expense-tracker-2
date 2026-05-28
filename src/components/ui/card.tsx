import * as React from 'react'
import { cn } from '@/lib/utils'
export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('rounded-3xl bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_2px_20px_rgba(0,0,0,0.04)]', className)} {...props} />
))
Card.displayName = 'Card'
export const CardHeader = ({ className, ...p }: React.HTMLAttributes<HTMLDivElement>) => <div className={cn('p-6 pb-2', className)} {...p} />
export const CardTitle = ({ className, ...p }: React.HTMLAttributes<HTMLHeadingElement>) => <h3 className={cn('font-display font-semibold text-lg tracking-tight', className)} {...p} />
export const CardContent = ({ className, ...p }: React.HTMLAttributes<HTMLDivElement>) => <div className={cn('p-6 pt-2', className)} {...p} />
export const CardFooter = ({ className, ...p }: React.HTMLAttributes<HTMLDivElement>) => <div className={cn('p-6 pt-0', className)} {...p} />