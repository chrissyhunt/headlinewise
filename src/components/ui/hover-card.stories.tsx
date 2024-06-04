import { Meta, StoryObj } from '@storybook/react'
import { HoverCard, HoverCardTrigger, HoverCardContent } from './hover-card'

const meta = {
  title: 'Custom ShadcnUI/Hover Card',
  component: HoverCard,
  tags: ['autodocs'],
} satisfies Meta<typeof HoverCard>

export default meta
type Story = StoryObj<typeof HoverCard>

export const DefaultCard: Story = {
  render: (args) => (
    <HoverCard {...args}>
      <HoverCardTrigger>
        <button>Hover me</button>
      </HoverCardTrigger>
      <HoverCardContent>
        <p>Card content</p>
      </HoverCardContent>
    </HoverCard>
  ),
}
