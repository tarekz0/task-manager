
import { ReactNode } from 'react'
export default function FormField({ label, error, children, htmlFor }:{ label:string, error?:string, children:ReactNode, htmlFor?:string }) {
  return (
    <div className="space-y-1">
      <label htmlFor={htmlFor} className="block text-sm font-medium">{label}</label>
      {children}
      {error ? <p role="alert" className="text-sm text-red-600">{error}</p> : null}
    </div>
  )
}
