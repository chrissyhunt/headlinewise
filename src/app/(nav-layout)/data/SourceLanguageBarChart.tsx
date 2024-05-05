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

const getUniqueLanguageKeys = (data: SourceData, models: string[]) => {
  const keys = new Set<string>();
  models.forEach((model) => {
    if (!data.language[model]) return;
    Object.keys(data.language?.[model]).forEach((key) => keys.add(key));
  });

  return Array.from(keys);
};

const modelColors = [
  colors["cyan"]["600"],
  colors["fuchsia"]["600"],
  colors["violet"]["600"],
];

export const SourceLanguageBarChart = ({
  data,
  models,
}: {
  data: SourceData;
  models: string[];
}) => {
  const languageColNames = getUniqueLanguageKeys(data, models);
  const chartData = languageColNames
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
        {models.map((model, i) => (
          <Bar key={model} dataKey={model} fill={modelColors[i]} />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};
