
import { ReactNode, useEffect, useRef } from 'react'

export default function Modal({ open, onClose, children, title }:{ open:boolean, onClose:()=>void, children:ReactNode, title:string }) {
  const dialogRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    function onKey(e: KeyboardEvent){ if(e.key==='Escape') onClose() }
    if(open) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])
  useEffect(() => {
    if(open) dialogRef.current?.focus()
  }, [open])
  if(!open) return null
  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 grid place-items-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden="true"></div>
      <div ref={dialogRef} tabIndex={-1} className="relative w-full max-w-lg rounded-xl bg-white p-4 shadow-xl dark:bg-gray-900">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button aria-label="Close" onClick={onClose} className="rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-800">✕</button>
        </div>
        {children}
      </div>
    </div>
  )
}
