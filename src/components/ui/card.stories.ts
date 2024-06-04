import { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
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
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link',
      ],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>
