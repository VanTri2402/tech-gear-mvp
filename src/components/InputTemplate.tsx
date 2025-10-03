import { Input } from "./ui/input";
import { Label } from "./ui/label";

export const InputTemplate = ({
    label,
    name,
    type = "text",
    required = true,
    defaultValue = "",
  }: {
    label: string;
    name: string;
    type?: string;
    required?: boolean;
    defaultValue: string;
  }) => {
    return (
      <div className="grid grid-cols-4 items-center gap-4 ">
        <Label htmlFor={name} className="text-right">
          {label}
        </Label>
        <Input
          id={name}
          name={name}
          type={type}
          className="col-span-3"
          required={required}
          defaultValue={defaultValue}
        />
      </div>
    );
}
