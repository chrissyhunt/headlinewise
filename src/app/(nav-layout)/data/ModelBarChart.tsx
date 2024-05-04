"use client";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import colors from "tailwindcss/colors";

interface ModelData {
  name: string;
  approved: number;
  rejected: number;
  needs_review: number;
}

export const ModelBarChart = ({ data }: { data: ModelData[] }) => {
  return (
    <ResponsiveContainer width="100%" aspect={1.5}>
      <RechartsBarChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis
          dataKey="name"
          label={{ value: "Models", position: "insideBottom" }}
        />
        <YAxis
          label={{
            value: "Analysis Count",
            angle: -90,
            position: "insideLeft",
          }}
        />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Bar dataKey="approved" stackId="a" fill={colors["cyan"]?.["800"]} />
        <Bar dataKey="rejected" stackId="a" fill={colors["fuchsia"]?.["700"]} />
        <Bar
          dataKey="needs_review"
          stackId="a"
          fill={colors["violet"]?.["600"]}
        />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};
