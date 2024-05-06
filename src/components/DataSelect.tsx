import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "./ui/label";

interface DataSelectProps {
  value: string;
  setValue: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
}

export const DataSelect = ({
  value,
  setValue,
  options,
  placeholder,
}: DataSelectProps) => {
  return (
    <div className="flex items-center space-x-2 pl-[60px]">
      <Label className="whitespace-nowrap">News Source: </Label>
      <div className="min-w-[300px]">
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
  );
};
