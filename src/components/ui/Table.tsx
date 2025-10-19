import { ReactNode } from 'react'

export function Table({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">{children}</table>
    </div>
  )
}
export function THead({ children }: { children: ReactNode }) {
  return <thead className="bg-gray-50 dark:bg-gray-800/60">{children}</thead>
}
export function TH({ children }: { children: ReactNode }) {
  return (
    <th scope="col" className="px-4 py-2 text-left text-sm font-semibold">
      {children}
    </th>
  )
}
export function TBody({ children }: { children: ReactNode }) {
  return <tbody className="divide-y divide-gray-200 dark:divide-gray-800">{children}</tbody>
}
export function TR({ children }: { children: ReactNode }) {
  return (
    <tr className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900 dark:even:bg-gray-800/50">
      {children}
    </tr>
  )
}
export function TD({ children }: { children: ReactNode }) {
  return <td className="whitespace-nowrap px-4 py-2 text-sm">{children}</td>
}
