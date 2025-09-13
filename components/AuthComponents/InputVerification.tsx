"use client";

import React, { useState } from "react";
import { Label } from "../ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "../ui/button";

type InputVerificationProps = {
  id?: string;
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  maxLength?: number;
  disabled?: boolean;
  error?: string;
  required?: boolean;
};

function InputVerification({
  id,
  label = "Código de verificación",
  value,
  onChange,
  maxLength = 6,
  disabled,
  error,
  required,
}: InputVerificationProps) {
  const [otpValue, setOtpValue] = useState(value || "");

  const handleChange = (newValue: string) => {
    setOtpValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className="w-full flex flex-col mb-4">
      <div className="flex justify-between items-center mb-1">
        <Label
          id={id}
          className="mb-1 text-left text-lg text-[var(--theme-text)]"
          htmlFor={id}
        >
          {label}
        </Label>
      </div>

      <div className="flex flex-col items-center">
        <InputOTP
          maxLength={maxLength}
          value={otpValue}
          onChange={handleChange}
          disabled={disabled}
        >
          <InputOTPGroup id={id} className="gap-6">
            {Array.from({ length: maxLength }).map((_, index) => (
              <InputOTPSlot
                key={index}
                index={index}
                className="
                  h-[60px] w-[60px] 
                  rounded-md
                  text-xl font-semibold
                  bg-[var(--theme-surface)] 
                  border border-[var(--theme-border)] 
                  text-[var(--theme-text)] 
                  focus:ring-0 
                  focus:border-[var(--theme-primary)]
                  data-[active=true]:border-[var(--theme-primary)]
                  data-[active=true]:ring-2
                  data-[active=true]:ring-[var(--theme-primary)]/20
                "
              />
            ))}
          </InputOTPGroup>
        </InputOTP>

        <div id={id} className="w-full flex justify-center mt-4 mb-4">
          <Button className="theme-text-purple" variant={"link"}>
            ¿No recibiste el correo electrónico?
          </Button>
        </div>
      </div>

      {error && (
        <span className="text-red-500 text-sm mt-1 text-center">{error}</span>
      )}
    </div>
  );
}

export default InputVerification;
