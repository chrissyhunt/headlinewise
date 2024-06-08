import { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { Button } from './button'

const meta = {
  title: 'Custom ShadcnUI/Button',
  component: Button,
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
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultLarge: Story = {
  args: {
    variant: 'default',
    size: 'lg',
    children: 'Click Me',
  },
}

// TODO: Uncomment as variants are styled

// export const Destructive: Story = {
//   args: {
//     variant: 'destructive',
//     size: 'default',
//     children: 'Delete',
//   },
// }

// export const Outline: Story = {
//   args: {
//     variant: 'outline',
//     size: 'default',
//     children: 'Click Me',
//   },
// }

// export const Secondary: Story = {
//   args: {
//     variant: 'secondary',
//     size: 'default',
//     children: 'Click Me',
//   },
// }

// export const Ghost: Story = {
//   args: {
//     variant: 'ghost',
//     size: 'default',
//     children: 'Click Me',
//   },
// }

export const Link: Story = {
  args: {
    variant: 'link',
    size: 'default',
    children: 'Click Me',
  },
}

// export const Large: Story = {
//   args: {
//     variant: 'default',
//     size: 'lg',
//     children: 'Click Me',
//   },
// }

export const Small: Story = {
  args: {
    variant: 'default',
    size: 'sm',
    children: 'Click Me',
  },
}

export const Icon: Story = {
  args: {
    variant: 'default',
    size: 'icon',
    children: 'i',
  },
}
