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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const modelColors = [
  colors["cyan"]["600"],
  colors["fuchsia"]["600"],
  colors["violet"]["600"],
];

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
      const bar = { name };
      models.forEach((model) => {
        bar[model] = data[selectedSource]?.language?.[model]?.[name] || 0;
      });
      return bar;
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <div className="mb-14">
        <Select onValueChange={(value) => setSelectedSource(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select a news source" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>News Sources</SelectLabel>
              {sources.map((source) => (
                <SelectItem key={source} value={source}>
                  {source}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
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
            tick={{
              fill: colors["black"],
              fontSize: "0.9rem",
            }}
            // padding={{ left: 40, right: 10 }}
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
            // mirror
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
