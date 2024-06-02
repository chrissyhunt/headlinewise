import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

interface TwoWayToggleProps {
  value: boolean
  setValue: (value: boolean) => void
  id: string
  falseLabel: string
  trueLabel: string
}

export const TwoWayToggle = ({
  value,
  setValue,
  id,
  falseLabel,
  trueLabel,
}: TwoWayToggleProps) => {
  return (
    <div className="flex items-center space-x-2 !mt-0">
      <Label htmlFor={id}>{falseLabel}</Label>
      <Switch
        id={id}
        checked={value}
        onCheckedChange={(value) => setValue(value)}
        aria-label="Toggle between table and chart view"
      />
      <Label htmlFor={id}>{trueLabel}</Label>
    </div>
  )
}
