import { ButtonHTMLAttributes } from 'react'
import { clsx } from 'clsx'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}
export default function Button({ className, variant = 'primary', size = 'md', ...props }: Props) {
  const base =
    'inline-flex items-center justify-center rounded-lg font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50'
  const sizes = { sm: 'px-3 py-1.5 text-sm', md: 'px-4 py-2', lg: 'px-5 py-3 text-lg' }
  const variants = {
    primary: 'bg-teal-600 text-white hover:bg-teal-700 focus:ring-teal-500',
    secondary:
      'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600',
    ghost: 'bg-transparent text-teal-600 hover:bg-teal-50 dark:hover:bg-gray-800',
  }
  return <button className={clsx(base, sizes[size], variants[variant], className)} {...props} />
}
