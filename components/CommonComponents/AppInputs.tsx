import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type AppInputsProps = {
  label?: string;
  placeholder: string;
  icon?: React.ReactNode;
  type?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  name?: string;
};

function AppInputs({
  label,
  placeholder,
  type,
  className,
  onChange,
  id,
  name,
}: AppInputsProps) {
  return (
    <div className="w-full flex flex-col mb-4">
      {label && (
        <div className="flex justify-between items-center mb-1">
          <Label
            htmlFor={id || name}
            className="mb-1 text-left text-m text-[var(--theme-text)]"
            id={id}
          >
            {label}
          </Label>
        </div>
      )}
      <Input
        id={id}
        name={name}
        placeholder={placeholder}
        type={type}
        className={`bg-[var(--theme-surface)] border border-[var(--theme-border)] placeholder:text-[var(--theme-textSecondary)] h-[60px] text-[var(--theme-text)] focus:ring-0 focus:border-[var(--theme-primary)] rounded-4xl ${
          className || ""
        }`}
        onChange={onChange}
      />
    </div>
  );
}

export default AppInputs;
