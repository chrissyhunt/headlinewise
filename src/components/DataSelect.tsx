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
  value: string
  setValue: (value: string) => void
  options: { value: string; label: string }[]
  placeholder: string
}

export const DataSelect = ({
  value,
  setValue,
  options,
  placeholder,
}: DataSelectProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
      <Label className="whitespace-nowrap">News Source: </Label>
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
