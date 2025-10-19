
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import Modal from './Modal'
import Button from './Button'

const meta: Meta<typeof Modal> = { title: 'UI/Modal', component: Modal }
export default meta

export const Example: StoryObj<typeof Modal> = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div>
        <Button onClick={()=>setOpen(true)}>Open</Button>
        <Modal open={open} onClose={()=>setOpen(false)} title="Hello">
          <p>Content</p>
        </Modal>
      </div>
    )
  }
}
