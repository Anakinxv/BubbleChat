"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

type FormInputsProps = {
  id?: string;
  type?: string;
  placeholder?: string;
  name?: string;
  value?: string;
  required?: boolean;
  disabled?: boolean;
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  status?: "valid" | "invalid" | "pending";
  statusMessage?: string;
};

function FormInputs({
  id,
  type,
  placeholder,
  name = "",
  value,
  required,
  onChange,
  status,
  statusMessage,
  disabled,
  label,
}: FormInputsProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const {
    register,
    formState: { errors },
  } = useFormContext();

  const handleStatusColor = () => {
    switch (status) {
      case "valid":
        return "border-green-500";
      case "invalid":
        return "border-red-500";
      case "pending":
        return "border-yellow-500";
      default:
        return "border-[var(--theme-border)]";
    }
  };

  return (
    <div className="w-full flex flex-col mb-4 px-0 sm:px-2">
      <div className="flex flex-row justify-between items-center mb-1 gap-2">
        <Label
          htmlFor={name}
          className="text-left text-base sm:text-lg text-[var(--theme-text)]"
        >
          {label}
        </Label>
        {type === "password" && (
          <Button
            type="button"
            variant="ghost"
            className="hover:bg-[var(--theme-secondary)]/10 rounded-2xl text-[var(--theme-textSecondary)] px-2 py-1"
            onClick={handleShowPassword}
          >
            {showPassword ? (
              <span className="flex items-center gap-1">
                <EyeOff size={18} />
                <p className="hidden sm:inline">Ocultar</p>
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <Eye size={18} />
                <p className="hidden sm:inline">Mostrar</p>
              </span>
            )}
          </Button>
        )}
      </div>

      <div className="relative">
        <Input
          id={id}
          placeholder={placeholder}
          type={type === "password" && showPassword ? "text" : type}
          required={required}
          value={value}
          disabled={disabled}
          {...(() => {
            const field = register(name);
            return {
              ...field,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                field.onChange(e);
                onChange?.(e);
              },
            };
          })()}
          className={cn(
            "w-full bg-[var(--theme-surface)] border border-[var(--theme-border)] placeholder:text-[var(--theme-textSecondary)] h-12 sm:h-[60px] text-[var(--theme-text)] focus:ring-0 focus:border-[var(--theme-primary)] rounded-2xl sm:rounded-4xl px-3 sm:px-5",
            handleStatusColor()
          )}
        />
      </div>
      {/* Status message BELOW the input */}
      {statusMessage && (
        <span
          className={cn(
            "text-sm mt-1 block",
            status === "valid"
              ? "text-green-500"
              : status === "invalid"
              ? "text-red-500"
              : status === "pending"
              ? "text-yellow-500"
              : "text-[var(--theme-textSecondary)]"
          )}
        >
          {statusMessage}
        </span>
      )}
      {errors[name] && (
        <span className="text-red-500 text-sm mt-1">
          {String(errors[name]?.message)}
        </span>
      )}
    </div>
  );
}

export default FormInputs;
