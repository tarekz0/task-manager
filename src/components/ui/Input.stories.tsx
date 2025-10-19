
import type { Meta, StoryObj } from '@storybook/react'
import Input from './Input'
const meta: Meta<typeof Input> = { title: 'UI/Input', component: Input }
export default meta
export const Basic: StoryObj<typeof Input> = { args: { placeholder: 'Type…' } }
