'use client'
import { useState } from 'react'
import { SourceModelAttributes } from '@/utils/report-data'
import { DataSelect } from '@/components/DataSelect'
import { DataTable } from './charts/DataTable'
import { BarChart } from './charts/BarChart'
import { TwoWayToggle } from './TwoWayToggle'

interface FilterBarChartWidgetProps {
  data: SourceModelAttributes
  attributeParentKey: string
  bars: string[]
  sources: string[]
  sourceNames: { [key: string]: string }
  categories: string[]
  max?: number
  isStacked?: boolean
}

export const FilterBarChartWidget = ({
  data,
  attributeParentKey,
  bars,
  sources,
  sourceNames,
  categories,
  max,
  isStacked,
}: FilterBarChartWidgetProps) => {
  const [selectedSource, setSelectedSource] = useState<string>(sources[0])
  const [showChart, setShowChart] = useState<boolean>(true)

  const filteredData = categories.map((name) => {
    const bar: { name: string; [key: string]: string | number } = { name }
    bars.forEach((b) => {
      bar[b] = data[selectedSource]?.[attributeParentKey]?.[b]?.[name] || 0
    })
    return bar
  })

  return (
    <>
      <div className="mb-8 flex flex-col items-center sm:flex-row sm:justify-between sm:space-x-4">
        <div className="flex-0 mb-6 sm:mb-0">
          <DataSelect
            value={selectedSource}
            setValue={(value) => setSelectedSource(value)}
            options={sources.map((source) => ({
              value: source,
              label: sourceNames[source],
            }))}
            placeholder="Select a media organization"
          />
        </div>
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
          data={filteredData}
          bars={bars}
          yMax={max}
          isStacked={isStacked}
        />
      ) : (
        <DataTable
          cols={[
            { key: 'name', label: 'Category' },
            ...bars.map((b) => ({ key: b, label: b })),
          ]}
          rows={filteredData}
        />
      )}
    </>
  )
}
