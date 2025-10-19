
export type Status = 'Open' | 'In Progress' | 'Blocked' | 'Closed'
export type Category = 'Engineering' | 'Design' | 'Product' | 'QA' | 'Ops'

export interface Task {
  id: string
  title: string
  dueDate: string // ISO
  assignee: string
  status: Status
  category: Category
  estimatedHours: number
  updatedAt: string // ISO
  createdAt: string // ISO
}

export interface TaskFilters {
  q?: string
  status?: Status | 'All'
  category?: Category | 'All'
  sortBy?: 'title' | 'dueDate' | 'estimatedHours' | 'status' | 'category' | 'updatedAt'
  sortDir?: 'asc' | 'desc'
  page?: number
  pageSize?: number
}
