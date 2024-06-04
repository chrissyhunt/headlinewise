import { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { Input } from './input'

const meta = {
  title: 'Custom ShadcnUI/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    onClick: fn(),
    onChange: fn(),
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {},
}
