"use client";
import { useState } from "react";
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
import { SourceModelAttributes } from "@/utils/report-data-reducers";
import { DataSelect } from "@/components/DataSelect";

const modelColors = [
  colors["cyan"]["600"],
  colors["fuchsia"]["600"],
  colors["violet"]["600"],
];

export const CustomizedAxisTick = ({ x, y, stroke, payload }: any) => {
  const words = payload.value.split(" ");
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={0}
        textAnchor="middle"
        fill={colors["black"]}
        fontSize="0.8em"
      >
        {words.map((word: string, i: number) => (
          <tspan key={i} x={0} dy={16}>
            {word}
          </tspan>
        ))}
      </text>
    </g>
  );
};

export const SourceLanguageBarChart = ({
  data,
  models,
  sources,
  languageKeys,
  max,
}: {
  data: SourceModelAttributes;
  models: string[];
  sources: string[];
  languageKeys: string[];
  max: number;
}) => {
  const [selectedSource, setSelectedSource] = useState<string>(sources[0]);

  const chartData = languageKeys
    .map((name) => {
      const bar: { name: string; [key: string]: string | number } = { name };
      models.forEach((model) => {
        bar[model] = data[selectedSource]?.language?.[model]?.[name] || 0;
      });
      return bar;
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <div className="mb-14">
        <DataSelect
          value={selectedSource}
          setValue={(value) => setSelectedSource(value)}
          options={sources.map((source) => ({ value: source, label: source }))}
          placeholder="Select a media organization"
        />
      </div>
      <ResponsiveContainer width="100%" aspect={3}>
        <RechartsBarChart
          data={chartData}
          margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
          key={selectedSource}
          barGap={2}
        >
          <XAxis
            dataKey="name"
            axisLine={{ stroke: colors["fuchsia"]?.["400"] }}
            tickLine={false}
            height={80}
            tick={<CustomizedAxisTick />}
            interval={0}
          />
          <YAxis
            axisLine={{ stroke: colors["fuchsia"]?.["400"] }}
            tickLine={false}
            tick={{
              fill: colors["black"],
              fontSize: "1rem",
            }}
            domain={[0, max]}
            interval="preserveEnd"
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
    </>
  );
};
