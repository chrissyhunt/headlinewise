import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  );
};
