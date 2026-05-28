import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
const buttonVariants = cva('inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none active:scale-95', {
  variants: {
    variant: {
      default: 'bg-[#0A84FF] text-white hover:bg-[#0070dd] shadow-sm hover:shadow-md',
      destructive: 'bg-[#FF453A] text-white hover:bg-[#e03b30]',
      outline: 'border border-black/10 bg-white/60 hover:bg-white text-[#1D1D1F]',
      secondary: 'bg-black/5 text-[#1D1D1F] hover:bg-black/10',
      ghost: 'hover:bg-black/5 text-[#1D1D1F]',
      link: 'text-[#0A84FF] underline-offset-4 hover:underline',
    },
    size: { default: 'h-10 px-5 py-2', sm: 'h-8 px-3 text-xs', lg: 'h-12 px-7 text-base', icon: 'h-10 w-10' },
  },
  defaultVariants: { variant: 'default', size: 'default' },
})
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => (
  <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
))
Button.displayName = 'Button'
export { Button, buttonVariants }