'use client'
import { useState } from 'react'
import { TwoWayToggle } from '../TwoWayToggle'
import { DataTable } from './DataTable'
import { ModelApprovalStatusCounts } from '@/utils/report-data'
import { BarChart } from './BarChart'

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
      <div className="align-center mb-8 flex justify-center space-x-4 sm:justify-end">
        <TwoWayToggle
          value={showChart}
          setValue={setShowChart}
          id="table-chart-toggle"
          falseLabel="View Table"
          trueLabel="View Chart"
          ariaLabel="Toggle between table and chart view"
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
