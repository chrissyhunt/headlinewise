"use client";
import { useState } from "react";
import { SourceModelAttributes } from "@/utils/report-data-reducers";
import { DataSelect } from "@/components/DataSelect";
import { DataTable } from "./charts/DataTable";
import { GroupedBarChart } from "./charts/GroupedBarChart";
import { TwoWayToggle } from "./TwoWayToggle";

export const GroupedBarChartWidget = ({
  data,
  attributeParentKey,
  bars,
  sources,
  sourceNames,
  categories,
  max,
}: {
  data: SourceModelAttributes;
  attributeParentKey: string;
  bars: string[];
  sources: string[];
  sourceNames: { [key: string]: string };
  categories: string[];
  max: number;
}) => {
  const [selectedSource, setSelectedSource] = useState<string>(sources[0]);
  const [showChart, setShowChart] = useState<boolean>(true);

  const filteredData = categories.map((name) => {
    const bar: { name: string; [key: string]: string | number } = { name };
    bars.forEach((b) => {
      bar[b] = data[selectedSource]?.[attributeParentKey]?.[b]?.[name] || 0;
    });
    return bar;
  });

  return (
    <>
      <div className="mb-8 flex flex-col sm:flex-row sm:justify-between items-center sm:space-x-4">
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
        <GroupedBarChart
          chartData={filteredData}
          bars={bars}
          max={max}
          selectedSource={selectedSource}
        />
      ) : (
        <DataTable
          cols={[
            { key: "name", label: "Category" },
            ...bars.map((b) => ({ key: b, label: b })),
          ]}
          rows={filteredData}
        />
      )}
    </>
  );
};
