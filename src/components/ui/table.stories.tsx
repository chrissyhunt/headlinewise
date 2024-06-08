import { Meta, StoryObj } from '@storybook/react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./table"

const meta = {
  title: 'Custom ShadcnUI/Table',
  component: Table,
  tags: ['autodocs'],
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof Table>

export const Default: Story = {
  render: (args) => (
    <Table {...args}>
      <TableCaption>
        Caption
      </TableCaption>
      <TableHead>
        <TableRow>
          <TableHeader>
            Header
          </TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>
            Cell
          </TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>
            Footer
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
}