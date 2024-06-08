import { Meta, StoryObj } from '@storybook/react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './card'

const meta = {
  title: 'Custom ShadcnUI/Card',
  component: Card,
  tags: ['autodocs'],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof Card>

export const DefaultCard: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content</p>
      </CardContent>
      <CardFooter>
        <p>Card footer</p>
      </CardFooter>
    </Card>
  ),
}
