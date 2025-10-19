import { useEffect, useMemo, useState } from 'react'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Select from '../components/ui/Select'
import { Table, TBody, TD, TH, THead, TR } from '../components/ui/Table'
import Card from '../components/ui/Card'
import Modal from '../components/ui/Modal'
import FormField from '../components/ui/FormField'
import { useTasksStore } from '../state/useTasksStore'
import type { Category, Status, Task } from '../types'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { type TaskFormValues, taskSchema } from '../utils/validation'
import { Edit2, Trash2 } from 'lucide-react'

const statuses: Status[] = ['Open', 'In Progress', 'Blocked', 'Closed']
const categories: Category[] = ['Engineering', 'Design', 'Product', 'QA', 'Ops']

export default function Tasks() {
  const { items, total, page, pageSize, fetch, create, update, remove } = useTasksStore()
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Task | undefined>()

  useEffect(() => {
    fetch()
  }, [fetch])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      assignee: '',
      category: 'Engineering',
      status: 'Open',
      estimatedHours: 1,
      dueDate: new Date().toISOString().slice(0, 10),
    },
  })

  function openCreate() {
    setEditing(undefined)
    reset()
    setOpen(true)
  }
  function openEdit(t: Task) {
    setEditing(t)
    reset({
      title: t.title,
      assignee: t.assignee,
      category: t.category,
      status: t.status,
      estimatedHours: t.estimatedHours,
      dueDate: t.dueDate.slice(0, 10),
    })
    setOpen(true)
  }

  const onSubmit = handleSubmit(async (data) => {
    const payload = { ...data, dueDate: new Date(data.dueDate).toISOString() }
    if (editing) await update(editing.id, payload as any)
    else await create(payload as any)
    setOpen(false)
  })

  const pages = useMemo(() => Math.ceil(total / pageSize), [total, pageSize])

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="grid gap-2 sm:grid-cols-4">
            <Input
              placeholder="Search…"
              onChange={(e) => fetch({ q: e.target.value, page: 1 })}
              aria-label="Search tasks"
            />
            <Select
              aria-label="Filter status"
              defaultValue="All"
              onChange={(e) => fetch({ status: e.target.value as any, page: 1 })}
            >
              <option>All</option>
              {statuses.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </Select>
            <Select
              aria-label="Filter category"
              defaultValue="All"
              onChange={(e) => fetch({ category: e.target.value as any, page: 1 })}
            >
              <option>All</option>
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </Select>
            <Select
              aria-label="Sort by"
              defaultValue="updatedAt"
              onChange={(e) => fetch({ sortBy: e.target.value as any })}
            >
              <option value="updatedAt">Sort: Updated</option>
              <option value="title">Sort: Title</option>
              <option value="dueDate">Sort: Due</option>
              <option value="estimatedHours">Sort: Est. Hours</option>
            </Select>
          </div>
          <Button onClick={openCreate}>Add Task</Button>
        </div>
      </Card>

      <div className="hidden md:block">
        <Table>
          <THead>
            <tr>
              <TH>Title</TH>
              <TH>Assignee</TH>
              <TH>Status</TH>
              <TH>Category</TH>
              <TH>Est. Hours</TH>
              <TH>Due</TH>
              <TH>Actions</TH>
            </tr>
          </THead>
          <TBody>
            {items.map((t) => (
              <TR key={t.id}>
                <TD>{t.title}</TD>
                <TD>{t.assignee}</TD>
                <TD>{t.status}</TD>
                <TD>{t.category}</TD>
                <TD>{t.estimatedHours}</TD>
                <TD>{new Date(t.dueDate).toLocaleDateString()}</TD>
                <TD>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => openEdit(t)}
                    title="Edit task"
                    className="p-2"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => remove(t.id)}
                    title="Delete task"
                    className="p-2 text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TD>
              </TR>
            ))}
          </TBody>
        </Table>
      </div>

      <div className="grid gap-3 md:hidden">
        {items.map((t) => (
          <Card key={t.id}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{t.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {t.assignee} • {t.status} • {t.category}
                </p>
                <p className="text-sm">
                  Est: {t.estimatedHours}h • Due: {new Date(t.dueDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" onClick={() => openEdit(t)}>
                  Edit
                </Button>
                <Button variant="ghost" size="sm" onClick={() => remove(t.id)}>
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm">
          Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, total)} of {total}
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            disabled={page <= 1}
            onClick={() => fetch({ page: page - 1 })}
          >
            Prev
          </Button>
          <span className="text-sm">
            Page {page} / {Math.max(1, pages)}
          </span>
          <Button
            variant="secondary"
            size="sm"
            disabled={page >= pages}
            onClick={() => fetch({ page: page + 1 })}
          >
            Next
          </Button>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? 'Edit Task' : 'Add Task'}>
        <form className="space-y-3" onSubmit={onSubmit} noValidate>
          <FormField label="Title" error={errors.title?.message} htmlFor="title">
            <Input id="title" {...register('title')} name="title" />
          </FormField>

          <div className="grid gap-3 sm:grid-cols-2">
            <FormField label="Assignee" error={errors.assignee?.message} htmlFor="assignee">
              <Input id="assignee" {...register('assignee')} name="assignee" />
            </FormField>
            <FormField label="Due Date" error={errors.dueDate?.message} htmlFor="dueDate">
              <Input id="dueDate" type="date" {...register('dueDate')} name="dueDate" />
            </FormField>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <FormField label="Status" error={errors.status?.message}>
              <Select {...register('status')} name="status">
                {statuses.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </Select>
            </FormField>

            <FormField label="Category" error={errors.category?.message}>
              <Select {...register('category')} name="category">
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </Select>
            </FormField>

            <FormField
              label="Estimated Hours"
              error={errors.estimatedHours?.message}
              htmlFor="estimatedHours"
            >
              <Input
                id="estimatedHours"
                type="number"
                step="0.1"
                min="0"
                {...register('estimatedHours', {
                  setValueAs: (v) => {
                    if (v === '' || v === null || v === undefined) return undefined
                    const num = parseFloat(v)
                    return Number.isNaN(num) ? undefined : num
                  },
                })}
                name="estimatedHours"
              />
            </FormField>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
