'use client'
import { useState } from 'react'
import { TwoWayToggle } from './TwoWayToggle'
import { DataTable } from './charts/DataTable'
import { ModelApprovalStatusCounts } from '@/utils/report-data'
import { BarChart } from './charts/BarChart'

interface ModelReviewDataVizProps {
  models: string[]
  modelApprovalStatusCounts: ModelApprovalStatusCounts
  bars: string[]
  isStacked?: boolean
  customCategoryLabel?: string
}

export const ModelReviewDataViz = ({
  models,
  modelApprovalStatusCounts,
  bars,
  isStacked,
  customCategoryLabel,
}: ModelReviewDataVizProps) => {
  const [showChart, setShowChart] = useState<boolean>(true)
  return (
    <>
      <div className="mb-8 flex justify-center sm:justify-end align-center space-x-4">
        <TwoWayToggle
          value={showChart}
          setValue={setShowChart}
          id="table-chart-toggle"
          falseLabel="View Table"
          trueLabel="View Chart"
        />
      </div>
      {showChart ? (
        <BarChart
          data={models.map((m) => ({
            name: m,
            approved: modelApprovalStatusCounts[m].approved,
            rejected: modelApprovalStatusCounts[m].rejected,
            needs_review: modelApprovalStatusCounts[m].needs_review,
          }))}
          bars={bars}
          isStacked={isStacked}
          customCategoryLabel={customCategoryLabel}
        />
      ) : (
        <DataTable
          rows={models.map((m) => ({
            name: m,
            approved: modelApprovalStatusCounts[m].approved,
            rejected: modelApprovalStatusCounts[m].rejected,
            needs_review: modelApprovalStatusCounts[m].needs_review,
          }))}
          cols={[
            { key: 'name', label: 'Model' },
            { key: 'approved', label: 'Approved' },
            { key: 'rejected', label: 'Rejected' },
            { key: 'needs_review', label: 'Needs Review' },
          ]}
        />
      )}
    </>
  )
}
