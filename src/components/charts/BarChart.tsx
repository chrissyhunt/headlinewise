import colors from 'tailwindcss/colors'
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { CustomToolTip } from './CustomToolTip'
import { chartColors, lineColor } from './chart-colors'

interface CustomAxisTickProps {
  x: number
  y: number
  stroke: string
  payload: { value: string }
}

export const CustomizedAxisTick = ({ x, y, payload }: CustomAxisTickProps) => {
  const words = payload.value.split(' ')
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={0}
        textAnchor="middle"
        fill={colors['black']}
        fontSize="0.8em"
      >
        {words.map((word: string, i: number) => (
          <tspan key={i} x={0} dy={16}>
            {word}
          </tspan>
        ))}
      </text>
    </g>
  )
}

interface BarChartProps {
  data: { name: string; [key: string]: string | number }[]
  bars: string[]
  yMax?: number
  isStacked?: boolean
  customCategoryLabel?: string
}

export const BarChart = ({
  data,
  bars,
  yMax,
  isStacked,
  customCategoryLabel,
}: BarChartProps) => {
  return (
    <ResponsiveContainer width="100%" minHeight={300}>
      <RechartsBarChart
        data={data}
        margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
        barGap={2}
      >
        <XAxis
          dataKey="name"
          axisLine={{ stroke: lineColor }}
          tickLine={false}
          height={80}
          tick={({ ...props }) => <CustomizedAxisTick {...props} />}
          interval={0}
        />
        <YAxis
          axisLine={{ stroke: lineColor }}
          tickLine={false}
          tick={{
            fill: colors['black'],
            fontSize: '1rem',
          }}
          domain={yMax ? [0, yMax] : undefined}
          interval="preserveEnd"
          width={40}
        />
        <CartesianGrid strokeDasharray="4 4" stroke={lineColor} />
        <Tooltip
          cursor={{ fill: colors['fuchsia']['100'], opacity: '80%' }}
          content={({ ...props }) => (
            <CustomToolTip
              {...props}
              barLabel={customCategoryLabel ?? 'Category'}
            />
          )}
        />
        <Legend
          formatter={(value: string) => (
            <span className="ml-1 mr-4 text-black">
              {value.replace('_', ' ')}
            </span>
          )}
        />
        {bars.map((b, i) => (
          <Bar
            key={b}
            dataKey={b}
            stackId={isStacked ? 'a' : undefined}
            fill={chartColors[i]}
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}
