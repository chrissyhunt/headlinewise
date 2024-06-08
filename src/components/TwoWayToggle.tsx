import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

interface TwoWayToggleProps {
  value: boolean
  setValue: (value: boolean) => void
  id: string
  falseLabel: string
  trueLabel: string
  ariaLabel: string
}

export const TwoWayToggle = ({
  value,
  setValue,
  id,
  falseLabel,
  trueLabel,
  ariaLabel,
}: TwoWayToggleProps) => {
  return (
    <div className="!mt-0 flex items-center space-x-2">
      <Label htmlFor={id}>{falseLabel}</Label>
      <Switch
        id={id}
        checked={value}
        onCheckedChange={(value) => setValue(value)}
        aria-label={ariaLabel}
      />
      <Label htmlFor={id}>{trueLabel}</Label>
    </div>
  )
}
