
import { act } from '@testing-library/react'
import { useTasksStore } from '../useTasksStore'

test('updates filters and pagination via fetch()', async () => {
  await act(async () => { await useTasksStore.getState().fetch({ page: 2, pageSize: 5 }) })
  const s = useTasksStore.getState()
  expect(s.page).toBe(2)
  expect(s.pageSize).toBe(5)
})
