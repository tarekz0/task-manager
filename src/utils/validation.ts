import { z } from 'zod'

export const taskSchema = z.object({
  title: z.string().min(1, { message: 'Required' }),
  assignee: z.string().min(1, { message: 'Required' }),
  dueDate: z.string().min(1, { message: 'Required' }),
  status: z.enum(['Open', 'In Progress', 'Blocked', 'Closed'], { required_error: 'Required' }),
  category: z.enum(['Engineering', 'Design', 'Product', 'QA', 'Ops'], { required_error: 'Required' }),
  estimatedHours: z
    .number({
      required_error: 'Estimated hours is required',
      invalid_type_error: 'Must be a number',
    })
    .min(0, { message: 'Estimated hours must be >= 0' }),
})

export type TaskFormValues = z.infer<typeof taskSchema>
