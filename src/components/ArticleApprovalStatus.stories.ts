import { Meta, StoryObj } from '@storybook/react'
import { ArticleApprovalStatus } from './ArticleApprovalStatus'

const meta = {
  title: 'Components/ArticleApprovalStatus',
  component: ArticleApprovalStatus,
  tags: ['autodocs'],
} satisfies Meta<typeof ArticleApprovalStatus>

export default meta
type Story = StoryObj<typeof meta>

export const Approved: Story = {
  args: {
    analysisId: '1',
    approved: true,
    isAdmin: false,
  },
}

export const Rejected: Story = {
  args: {
    analysisId: '1',
    approved: false,
    isAdmin: false,
  },
}

export const NeedsReview: Story = {
  args: {
    analysisId: '1',
    approved: null,
    isAdmin: false,
  },
}
