
import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Link, Outlet, NavLink } from 'react-router-dom'
import './styles/index.css'
import { worker } from './api/msw/browser'

// Enable MSW in all environments for the task
worker.start()

const Dashboard = lazy(() => import('./pages/Dashboard'))
const Tasks = lazy(() => import('./pages/Tasks'))

function Layout() {
  return (
    <div>
      <header className="border-b border-gray-200 bg-white/60 backdrop-blur dark:border-gray-800 dark:bg-gray-900/60">
        <div className="container flex items-center justify-between py-3">
          <Link to="/" className="text-lg font-semibold">Tasks Manager</Link>
          <nav className="flex gap-3">
            <NavLink to="/" end className={({isActive}) => isActive ? 'underline' : 'hover:underline'}>Dashboard</NavLink>
            <NavLink to="/tasks" className={({isActive}) => isActive ? 'underline' : 'hover:underline'}>Tasks</NavLink>
          </nav>
        </div>
      </header>
      <main className="container py-6">
        <Suspense fallback={<p>Loading…</p>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  )
}

const router = createBrowserRouter([
  { path: '/', element: <Layout />, children: [
    { index: true, element: <Dashboard /> },
    { path: 'tasks', element: <Tasks /> }
  ]}
])

ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />)
