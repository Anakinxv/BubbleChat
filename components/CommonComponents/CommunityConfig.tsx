import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type CommunityConfigProps = {
  options: {
    value: string;
    icon: React.ReactNode;
    title: string;
    description: string;
  }[];
  selected: string;
  onChange: (value: string) => void;
};

function CommunityConfig({
  options,
  selected,
  onChange,
}: CommunityConfigProps) {
  return (
    <RadioGroup
      value={selected}
      onValueChange={onChange}
      className="flex flex-col gap-4"
    >
      {options.map((option) => (
        <label
          key={option.value}
          htmlFor={option.value}
          className="flex items-center gap-8 p-4 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] cursor-pointer hover:border-[var(--theme-primary)] transition"
        >
          <RadioGroupItem
            value={option.value}
            id={option.value}
            className="theme-category theme-category-border   "
          />
          <div>{option.icon}</div>
          <div>
            <h3 className="font-semibold">{option.title}</h3>
            <p className="text-sm text-[var(--theme-textSecondary)]">
              {option.description}
            </p>
          </div>
        </label>
      ))}
    </RadioGroup>
  );
}

export default CommunityConfig;
