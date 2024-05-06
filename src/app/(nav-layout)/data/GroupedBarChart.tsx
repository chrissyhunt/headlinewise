import colors from "tailwindcss/colors";
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
import { CustomToolTip } from "./CustomToolTip";

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

export const GroupedBarChart = ({
  chartData,
  bars,
  max,
  selectedSource,
}: {
  chartData: { name: string; [key: string]: string | number }[];
  bars: string[];
  max: number;
  selectedSource: string;
}) => {
  return (
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
          width={30}
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
        {bars.map((b, i) => (
          <Bar key={b} dataKey={b} fill={modelColors[i]} />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};
