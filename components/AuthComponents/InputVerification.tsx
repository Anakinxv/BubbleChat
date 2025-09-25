"use client";

import React from "react";
import { Label } from "../ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "../ui/button";
import { useFormContext, Controller } from "react-hook-form";

type InputVerificationProps = {
  id?: string;

  maxLength?: number;
  disabled?: boolean;
};

function InputVerification({
  id = "otp",

  maxLength = 6,
  disabled,
}: InputVerificationProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="w-full flex flex-col mb-4">
      <div className="flex flex-col items-center">
        <Controller
          name={id}
          control={control}
          render={({ field }) => (
            <InputOTP
              value={field.value || ""}
              onChange={field.onChange}
              maxLength={maxLength}
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
          )}
        />
        {errors[id] && (
          <p className="text-red-500 text-sm mt-2">
            {errors[id]?.message as string}
          </p>
        )}
      </div>
    </div>
  );
}

export default InputVerification;
