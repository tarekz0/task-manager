import { SelectHTMLAttributes } from 'react'
export default function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={'w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-800 dark:border-gray-700 ' + (props.className ?? '')} />
}
