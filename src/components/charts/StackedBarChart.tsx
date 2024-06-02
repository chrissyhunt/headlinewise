'use client'
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
import colors from 'tailwindcss/colors'
import { CustomToolTip } from './CustomToolTip'
import { chartColors } from './chart-colors'

interface StackedBarChartProps {
  data: { [key: string]: number | string }[]
}

export const StackedBarChart = ({ data }: StackedBarChartProps) => {
  return (
    <ResponsiveContainer width="100%" minHeight={300}>
      <RechartsBarChart
        data={data}
        margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
      >
        <XAxis
          dataKey="name"
          axisLine={{ stroke: colors['fuchsia']?.['400'] }}
          tickLine={false}
          tick={{ fill: colors['black'], fontSize: '1em' }}
          height={40}
        />
        <YAxis
          axisLine={{ stroke: colors['fuchsia']?.['400'] }}
          tickLine={false}
          tick={{ fill: colors['black'], fontSize: '1rem' }}
          width={30}
        />
        <CartesianGrid
          strokeDasharray="4 4"
          stroke={colors['fuchsia']['400']}
        />
        <Tooltip
          cursor={{ fill: colors['fuchsia']['100'], opacity: '80%' }}
          content={<CustomToolTip barLabel="Model" />}
        />
        <Legend
          formatter={(value: string) => (
            <span className="text-black ml-1 mr-4">
              {value.replace('_', ' ')}
            </span>
          )}
        />
        {Object.keys(data[0])
          .filter((i) => i !== 'name')
          .map((key, i) => (
            <Bar key={key} dataKey={key} stackId="a" fill={chartColors[i]} />
          ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}
