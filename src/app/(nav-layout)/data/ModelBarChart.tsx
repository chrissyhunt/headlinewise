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
  Label,
} from "recharts";
import colors from "tailwindcss/colors";
import { CustomToolTip } from "./CustomToolTip";

interface ModelData {
  name: string;
  approved: number;
  rejected: number;
  needs_review: number;
}

export const ModelBarChart = ({ data }: { data: ModelData[] }) => {
  return (
    <ResponsiveContainer width="100%" aspect={3}>
      <RechartsBarChart
        data={data}
        margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
      >
        <XAxis
          dataKey="name"
          axisLine={{ stroke: colors["fuchsia"]?.["400"] }}
          tickLine={false}
          tick={{ fill: colors["black"], fontSize: "1rem" }}
        />
        <YAxis
          axisLine={{ stroke: colors["fuchsia"]?.["400"] }}
          tickLine={false}
          tick={{ fill: colors["black"], fontSize: "1rem" }}
        />
        <CartesianGrid
          strokeDasharray="4 4"
          stroke={colors["fuchsia"]["400"]}
        />
        <Tooltip
          cursor={{ fill: colors["fuchsia"]["100"] }}
          content={<CustomToolTip />}
        />
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
