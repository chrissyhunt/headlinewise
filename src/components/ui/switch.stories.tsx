import { Meta, StoryObj } from '@storybook/react'
import {
  Switch
} from "./switch"

const meta = {
  title: 'Custom ShadcnUI/Switch',
  component: Switch,
  tags: ['autodocs'],
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof Switch>

export const Default: Story = {}