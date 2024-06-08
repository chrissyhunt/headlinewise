import { Meta, StoryObj } from '@storybook/react'
import { Label } from './label'

const meta = {
  title: 'Custom ShadcnUI/Label',
  component: Label,
  tags: ['autodocs'],
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof Label>

export const Default: Story = {
  args: {
    children: 'Label text',
  },
}
