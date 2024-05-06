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

interface StackedBarChartProps {
  data: { [key: string]: number | string }[];
}

const modelColors = [
  colors["cyan"]["600"],
  colors["fuchsia"]["600"],
  colors["violet"]["600"],
];

export const StackedBarChart = ({ data }: StackedBarChartProps) => {
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
          tick={{ fill: colors["black"], fontSize: "1em" }}
          height={40}
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
        {Object.keys(data[0])
          .filter((i) => i !== "name")
          .map((key, i) => (
            <Bar key={key} dataKey={key} stackId="a" fill={modelColors[i]} />
          ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};
