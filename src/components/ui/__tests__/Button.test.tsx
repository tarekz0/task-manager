
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from '../../Button'

test('fires onClick', async () => {
  const user = userEvent.setup()
  const onClick = vi.fn()
  render(<Button onClick={onClick}>Press</Button>)
  await user.click(screen.getByText('Press'))
  expect(onClick).toHaveBeenCalled()
})
