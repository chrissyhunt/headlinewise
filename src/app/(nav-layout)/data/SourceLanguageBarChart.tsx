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
import { CustomToolTip } from "./CustomToolTip";

interface SourceData {
  language: {
    [model: string]: {
      [key: string]: number;
    };
  };
  political_bias: {
    [model: string]: {
      [key: string]: number;
    };
  };
}

const modelColors = [
  colors["cyan"]["600"],
  colors["fuchsia"]["600"],
  colors["violet"]["600"],
];

export const SourceLanguageBarChart = ({
  data,
  models,
  languageKeys,
  max,
}: {
  data: SourceData;
  models: string[];
  languageKeys: string[];
  max: number;
}) => {
  const chartData = languageKeys
    .map((name) => {
      const bar = { name };
      models.forEach((model) => {
        bar[model] = data.language?.[model]?.[name] || 0;
      });
      return bar;
    })
    .sort((a, b) => a.name.localeCompare(b.name));
  return (
    <ResponsiveContainer width="100%" aspect={2}>
      <RechartsBarChart
        data={chartData}
        margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
      >
        <XAxis
          dataKey="name"
          axisLine={{ stroke: colors["fuchsia"]?.["400"] }}
          tickLine={false}
          tick={{
            fill: colors["black"],
            fontSize: "0.75rem",
          }}
        />
        <YAxis
          axisLine={{ stroke: colors["fuchsia"]?.["400"] }}
          tickLine={false}
          tick={{ fill: colors["black"], fontSize: "1rem" }}
          // domain={[0, max]}
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
        {models.map((model, i) => (
          <Bar key={model} dataKey={model} fill={modelColors[i]} />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};
