import { TooltipProps } from 'recharts'
import {
  ValueType,
  NameType,
} from 'recharts/types/component/DefaultTooltipContent'

type CustomToolTipProps = TooltipProps<ValueType, NameType> & {
  barLabel: string
}

export const CustomToolTip = ({
  active,
  payload,
  label,
  barLabel,
}: CustomToolTipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-md bg-fuchsia-50 p-4 shadow-md">
        <p className="mb-4">
          <span className="-mb-2 text-xs uppercase tracking-wide">
            {barLabel}
          </span>
          <br />
          <span className="text-lg font-bold">{label}</span>
        </p>
        <ul>
          {payload.map((p, index: number) => (
            <li key={index} className="text-sm">
              {p.name?.toString().replace('_', ' ')}:{' '}
              <span className="font-semibold">{p.value}</span>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
