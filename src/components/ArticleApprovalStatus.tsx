'use client'
import { updateAnalysisApproval } from '@/lib/supabase/actions'
import { usePathname } from 'next/navigation'

interface ArticleApprovalStatusProps {
  analysisId: string
  approved: boolean | null
  isAdmin: boolean
}

export const ArticleApprovalStatus = ({
  analysisId,
  approved,
  isAdmin,
}: ArticleApprovalStatusProps) => {
  const pathName = usePathname()
  if (approved === true) {
    return <span data-test="review-status">Approved</span>
  } else if (approved === false) {
    return <span data-test="review-status">Rejected</span>
  } else if (isAdmin) {
    return (
      <>
        <button
          className="p-1"
          onClick={() =>
            updateAnalysisApproval({ id: analysisId, approved: true }, pathName)
          }
        >
          👍 <span className="sr-only">Approve analysis</span>
        </button>
        <button
          className="p-1"
          onClick={() =>
            updateAnalysisApproval(
              { id: analysisId, approved: false },
              pathName
            )
          }
        >
          👎 <span className="sr-only">Reject analysis</span>
        </button>
      </>
    )
  }
  return <span data-test="review-status">Needs Review</span>
}
