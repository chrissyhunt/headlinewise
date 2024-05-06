"use client";
import { useState } from "react";
import { TwoWayToggle } from "./TwoWayToggle";
import { DataTable } from "./DataTable";
import { StackedBarChart } from "./StackedBarChart";
import { ModelAttributes } from "@/utils/report-data-reducers";

interface StackedBarChartWidgetProps {
  models: string[];
  modelAttributes: ModelAttributes;
}

export const StackedBarChartWidget = ({
  models,
  modelAttributes,
}: StackedBarChartWidgetProps) => {
  const [showChart, setShowChart] = useState<boolean>(true);
  return (
    <>
      <div className="mb-8 flex justify-between align-center space-x-4">
        <div className="flex-0">Switch</div>
        <TwoWayToggle
          value={showChart}
          setValue={setShowChart}
          id="table-chart-toggle"
          falseLabel="View Table"
          trueLabel="View Chart"
        />
      </div>
      {showChart ? (
        <StackedBarChart
          data={models.map((m) => ({
            name: m,
            approved: modelAttributes[m].approved,
            rejected: modelAttributes[m].rejected,
            needs_review: modelAttributes[m].needs_review,
          }))}
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
