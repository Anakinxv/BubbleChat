import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";

type BubbleSelectsProps = {
  label?: string;
  options: Array<{
    value: string;
    label: string;
  }>;
  defaultValue?: string;
};

function BubbleSelects({ label, options, defaultValue }: BubbleSelectsProps) {
  return (
    <div className="w-full flex flex-col mb-4" style={{ zIndex: 1100 }}>
      {label && (
        <Label className="mb-1 text-left text-lg text-[var(--theme-text)]">
          {label}
        </Label>
      )}
      <Select>
        <SelectTrigger className="w-full theme-bg-surface theme-border shadow-lg rounded-4xl p-4 min-h-[60px] text-[var(--theme-text)] focus:ring-0 focus:border-[var(--theme-primary)] focus:outline-none placeholder:text-[var(--theme-textSecondary)]">
          <SelectValue
            placeholder="Select an option"
            defaultValue={defaultValue}
          />
        </SelectTrigger>
        <SelectContent className="theme-bg-surface theme-border  theme-text-primary shadow-lg rounded-2xl">
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default BubbleSelects;
