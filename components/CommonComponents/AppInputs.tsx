import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type AppInputsProps = {
  label?: string;
  placeholder: string;
  icon?: React.ReactNode;
  type?: string;
  className?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  id?: string;
  name?: string;
  value?: string;
};

function AppInputs({
  label,
  placeholder,
  type,
  className,
  onChange,
  id,
  name,
  value,
}: AppInputsProps) {
  return (
    <div className="w-full flex flex-col mb-4">
      {label && (
        <div className="flex justify-between items-center mb-1">
          <Label
            htmlFor={id || name}
            className="mb-1 text-left text-lg text-[var(--theme-text)]"
            id={id}
          >
            {label}
          </Label>
        </div>
      )}
      {type === "textarea" ? (
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          className={`bg-[var(--theme-surface)] border border-[var(--theme-border)] placeholder:text-[var(--theme-textSecondary)] min-h-[120px] text-[var(--theme-text)] rounded-4xl p-4 resize-none align-top focus:outline-none 
            
            focus:ring-0 focus:border-[var(--theme-primary)]
            ${className || ""}`}
          onChange={onChange}
          value={value}
          rows={5}
          style={{ verticalAlign: "top" }}
        />
      ) : (
        <Input
          id={id}
          name={name}
          placeholder={placeholder}
          type={type}
          className={`bg-[var(--theme-surface)] border border-[var(--theme-border)] placeholder:text-[var(--theme-textSecondary)] min-h-[60px] text-[var(--theme-text)] focus:ring-0 focus:border-[var(--theme-primary)] rounded-4xl p-4 ${
            className || ""
          }`}
          onChange={onChange}
          value={value}
        />
      )}
    </div>
  );
}

export default AppInputs;
