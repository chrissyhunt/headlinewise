"use client";
import { updateAnalysisApproval } from "@/lib/supabase/actions";
import { usePathname } from "next/navigation";

interface ArticleApprovalStatus {
  analysisId: string;
  approved: boolean | null;
  isAdmin: boolean;
}

export const ArticleApprovalStatus = ({
  analysisId,
  approved,
  isAdmin,
}: ArticleApprovalStatus) => {
  const pathName = usePathname();
  if (approved === true) {
    return <span>Approved</span>;
  } else if (approved === false) {
    return <span>Rejected</span>;
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
    );
  }
  return <span>Needs Review</span>;
};
