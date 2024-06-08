import { Meta, StoryObj } from '@storybook/react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet"

const meta = {
  title: 'Custom ShadcnUI/Sheet',
  component: Sheet,
  tags: ['autodocs'],
} satisfies Meta<typeof Sheet>

export default meta
type Story = StoryObj<typeof Sheet>

export const Default: Story = {
  render: (args) => (
    <Sheet {...args}>
      <SheetTrigger>
        Open
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Title</SheetTitle>
          <SheetClose />
        </SheetHeader>
        <SheetDescription>
          Description
        </SheetDescription>
        <SheetFooter>
          Footer
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
}