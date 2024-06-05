import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from './ui/label'

interface DataSelectProps {
  label: string
  value: string
  setValue: (value: string) => void
  options: { value: string; label: string }[]
  placeholder: string
}

export const DataSelect = ({
  label,
  value,
  setValue,
  options,
  placeholder,
}: DataSelectProps) => {
  return (
    <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
      <Label className="whitespace-nowrap">{label}</Label>
      <div className="min-w-[250px]">
        <Select onValueChange={(value) => setValue(value)} value={value}>
          <SelectTrigger>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
