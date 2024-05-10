"use client";
import { useState } from "react";
import { TwoWayToggle } from "./TwoWayToggle";
import { DataTable } from "./charts/DataTable";
import { ModelAttributes } from "@/utils/report-data-reducers";
import { BarChart } from "./charts/BarChart";

interface ToggleBarChartWidgetProps {
  models: string[];
  modelAttributes: ModelAttributes;
  bars: string[];
  isStacked?: boolean;
  customCategoryLabel?: string;
}

export const ToggleBarChartWidget = ({
  models,
  modelAttributes,
  bars,
  isStacked,
  customCategoryLabel,
}: ToggleBarChartWidgetProps) => {
  const [showChart, setShowChart] = useState<boolean>(true);
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
            approved: modelAttributes[m].approved,
            rejected: modelAttributes[m].rejected,
            needs_review: modelAttributes[m].needs_review,
          }))}
          bars={bars}
          isStacked={isStacked}
          customCategoryLabel={customCategoryLabel}
        />
      ) : (
        <DataTable
          rows={models.map((m) => ({
            name: m,
            approved: modelAttributes[m].approved,
            rejected: modelAttributes[m].rejected,
            needs_review: modelAttributes[m].needs_review,
          }))}
          cols={[
            { key: "name", label: "Model" },
            { key: "approved", label: "Approved" },
            { key: "rejected", label: "Rejected" },
            { key: "needs_review", label: "Needs Review" },
          ]}
        />
      )}
    </>
  );
};
