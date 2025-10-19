
import { create } from 'zustand'
import type { Task, TaskFilters } from '../types'
import { api } from '../api/client'

interface TasksState {
  items: Task[]
  total: number
  page: number
  pageSize: number
  loading: boolean
  error?: string
  filters: TaskFilters
  fetch: (filters?: Partial<TaskFilters>) => Promise<void>
  create: (t: Omit<Task, 'id'|'createdAt'|'updatedAt'>) => Promise<void>
  update: (id: string, patch: Partial<Task>) => Promise<void>
  remove: (id: string) => Promise<void>
}

const defaultFilters: TaskFilters = {
  page: 1, pageSize: 10, sortBy: 'updatedAt', sortDir: 'desc', status: 'All', category: 'All'
}

export const useTasksStore = create<TasksState>((set, get) => ({
  items: [], total: 0, page: 1, pageSize: 10, loading: false, filters: defaultFilters,
  async fetch(filters) {
    set({ loading: true, error: undefined })
    const f = { ...get().filters, ...filters }
    const params = new URLSearchParams()
    if (f.q) params.set('q', f.q)
    params.set('status', String(f.status ?? 'All'))
    params.set('category', String(f.category ?? 'All'))
    params.set('sortBy', String(f.sortBy ?? 'updatedAt'))
    params.set('sortDir', String(f.sortDir ?? 'desc'))
    params.set('page', String(f.page ?? 1))
    params.set('pageSize', String(f.pageSize ?? 10))
    try {
      const res = await api<{ items: Task[]; total: number; page: number; pageSize: number }>(`/api/tasks?${params}`)
      set({ items: res.items, total: res.total, page: res.page, pageSize: res.pageSize, filters: f, loading: false })
    } catch (e: any) {
      set({ error: e.message, loading: false })
    }
  },
  async create(t) {
    set({ loading: true })
    try {
      await api<Task>('/api/tasks', { method: 'POST', body: JSON.stringify(t) })
      await get().fetch({ page: 1 })
    } catch (e: any) {
      set({ error: e.message })
    } finally {
      set({ loading: false })
    }
  },
  async update(id, patch) {
    set({ loading: true })
    try {
      await api<Task>(`/api/tasks/${id}`, { method: 'PUT', body: JSON.stringify(patch) })
      await get().fetch()
    } catch (e: any) {
      set({ error: e.message })
    } finally {
      set({ loading: false })
    }
  },
  async remove(id) {
    set({ loading: true })
    try {
      await api(`/api/tasks/${id}`, { method: 'DELETE' })
      await get().fetch()
    } catch (e: any) {
      set({ error: e.message })
    } finally {
      set({ loading: false })
    }
  },
}))
