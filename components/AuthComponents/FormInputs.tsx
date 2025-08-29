"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Eye, EyeOff } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
type FormInputsProps = {
  id?: string;
  type?: string;
  placeholder?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  label?: string;
};

function FormInputs({
  id,
  type = "text",
  placeholder,
  name = "",
  value,
  onChange,
  required,
  error,
  disabled,
  label,
}: FormInputsProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="w-full flex flex-col mb-4">
      <div className="flex justify-between items-center mb-1    ">
        <Label
          htmlFor={name}
          className="mb-1 text-left text-lg text-[var(--theme-text)] "
          id={id}
        >
          {label}
        </Label>{" "}
        {type === "password" && (
          <Button
            type="button"
            variant="ghost"
            className="  hover:bg-[var(--theme-secondary)]/10 rounded-2xl  text-[var(--theme-textSecondary)]"
            onClick={handleShowPassword}
            id={id}
          >
            {showPassword ? (
              <span className="flex items-center justify-center gap-1">
                {" "}
                <EyeOff size={18} />
                <p>Ocultar</p>
              </span>
            ) : (
              <span className="flex items-center justify-center gap-1">
                <Eye size={18} /> <p>Ocultar</p>
              </span>
            )}
          </Button>
        )}{" "}
      </div>

      <div className="relative">
        <Input
          id={id}
          name={name}
          placeholder={placeholder}
          type={type === "password" && showPassword ? "text" : type}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className="bg-[var(--theme-surface)] border border-[var(--theme-border)] placeholder:text-[var(--theme-textSecondary)] h-[60px] text-[var(--theme-text)] focus:ring-0 focus:border-[var(--theme-primary)  ] rounded-4xl "
        />
      </div>
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
}

export default FormInputs;
