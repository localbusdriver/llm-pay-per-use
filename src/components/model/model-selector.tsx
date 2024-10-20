import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";

export default function ModelSelect({
    id,
    value,
    onChange,
    options,
    className,
}: {
    id: string;
    value: string;
    onChange: React.Dispatch<React.SetStateAction<string>>;
    options: string[];
    className?: string;
}) {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger
                id={id}
                className={cn(
                    "w-[150px] bg-white hover:bg-secondary/[0.8]",
                    className
                )}
            >
                <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent className="">
                {options
                    ? options.map((option, i) => (
                          <SelectItem key={option + i} value={option}>
                              {id === "model-select"
                                  ? option.charAt(0).toUpperCase() +
                                    option.slice(1)
                                  : option}
                          </SelectItem>
                      ))
                    : null}
            </SelectContent>
        </Select>
    );
}
