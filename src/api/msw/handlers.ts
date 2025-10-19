import { http, HttpResponse } from 'msw'
import type { Task } from '../../types'

let tasks: Task[] = []

const now = new Date().toISOString()
tasks = [
  {
    id: crypto.randomUUID(),
    title: 'Task 1',
    dueDate: new Date(Date.now() + 86400000).toISOString(),
    assignee: 'Employee',
    status: 'Open',
    category: 'Engineering',
    estimatedHours: 5,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: crypto.randomUUID(),
    title: 'Task 2',
    dueDate: new Date(Date.now() + 3 * 86400000).toISOString(),
    assignee: 'Employee 2',
    status: 'In Progress',
    category: 'Design',
    estimatedHours: 8,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: crypto.randomUUID(),
    title: 'Task 3',
    dueDate: new Date(Date.now() + 3 * 86400000).toISOString(),
    assignee: 'Employee 3',
    status: 'Closed',
    category: 'Product',
    estimatedHours: 3,
    createdAt: now,
    updatedAt: now,
  },
]

export const handlers = [
  http.get('/api/tasks', ({ request }) => {
    const url = new URL(request.url)
    const q = url.searchParams.get('q')?.toLowerCase() ?? ''
    const status = url.searchParams.get('status') ?? 'All'
    const category = url.searchParams.get('category') ?? 'All'
    const sortBy = (url.searchParams.get('sortBy') ?? 'updatedAt') as keyof Task
    const sortDir = (url.searchParams.get('sortDir') ?? 'desc') as 'asc' | 'desc'
    const page = parseInt(url.searchParams.get('page') ?? '1', 10)
    const pageSize = parseInt(url.searchParams.get('pageSize') ?? '10', 10)

    let filtered = tasks.filter(
      (t) =>
        (!q || t.title.toLowerCase().includes(q) || t.assignee.toLowerCase().includes(q)) &&
        (status === 'All' || t.status === status) &&
        (category === 'All' || t.category === category),
    )

    filtered = filtered.sort((a, b) => {
      const A = a[sortBy] as any,
        B = b[sortBy] as any
      if (A < B) return sortDir === 'asc' ? -1 : 1
      if (A > B) return sortDir === 'asc' ? 1 : -1
      return 0
    })

    const total = filtered.length
    const start = (page - 1) * pageSize
    const end = start + pageSize
    const items = filtered.slice(start, end)

    return HttpResponse.json({ items, total, page, pageSize })
  }),

  http.post('/api/tasks', async ({ request }) => {
    const body = (await request.json()) as Omit<Task, 'id' | 'createdAt' | 'updatedAt'>
    const now = new Date().toISOString()
    const task: Task = { id: crypto.randomUUID(), createdAt: now, updatedAt: now, ...body }
    tasks.unshift(task)
    return HttpResponse.json(task, { status: 201 })
  }),

  http.put('/api/tasks/:id', async ({ params, request }) => {
    const id = params.id as string
    const body = (await request.json()) as Partial<Task>
    const idx = tasks.findIndex((t) => t.id === id)
    if (idx === -1) return HttpResponse.json({ message: 'Not found' }, { status: 404 })
    tasks[idx] = { ...tasks[idx], ...body, updatedAt: new Date().toISOString(), id }
    return HttpResponse.json(tasks[idx])
  }),

  http.delete('/api/tasks/:id', async ({ params }) => {
    const id = params.id as string
    const before = tasks.length
    tasks = tasks.filter((t) => t.id !== id)
    if (tasks.length === before) return HttpResponse.json({ message: 'Not found' }, { status: 404 })
    return HttpResponse.json({ ok: true })
  }),
]
