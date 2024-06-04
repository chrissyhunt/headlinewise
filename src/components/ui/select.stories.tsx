import { Meta, StoryObj } from '@storybook/react'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from './select'

const meta = {
  title: 'Custom ShadcnUI/Select',
  component: Select,
  tags: ['autodocs'],
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof Select>

export const Default: Story = {
  args: {
    children: 'Label text',
  },
  render: (args) => (
    <Select {...args}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="1">One</SelectItem>
          <SelectItem value="2">Two</SelectItem>
          <SelectItem value="3">Three</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
}
