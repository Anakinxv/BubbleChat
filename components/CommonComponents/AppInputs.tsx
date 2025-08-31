import React from "react";
import { Input } from "@/components/ui/input";

type AppInputsProps = {
  placeholder: string;
  icon?: React.ReactNode;
  type?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function AppInputs({ placeholder, type, className, onChange }: AppInputsProps) {
  return (
    <Input
      placeholder={placeholder}
      type={type}
      className="bg-[var(--theme-surface)] border border-[var(--theme-border)] placeholder:text-[var(--theme-textSecondary)] h-[60px] text-[var(--theme-text)] focus:ring-0 focus:border-[var(--theme-primary)] rounded-4xl"
      onChange={onChange}
    />
  );
}

export default AppInputs;
