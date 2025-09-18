import React, { ReactNode } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
type VariantType =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";

type buttonProps = {
  id?: string;
  icon?: ReactNode;
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  variant?: VariantType;
  type?: "button" | "submit" | "reset";
};

function Primarybutton({
  id,
  icon,
  children,
  onClick,
  disabled,
  className,
  type,
  variant = "default",
}: buttonProps) {
  return (
    <Button
      id={id}
      type={type}
      className={cn(
        "theme-bg-primary text-white w-full hover:opacity-90 text-lg h-[52px] sm:h-[60px] rounded-4xl font-semibold cursor-pointer",
        className
      )}
      onClick={onClick}
      disabled={disabled}
      variant={variant}
    >
      {icon} {children}
    </Button>
  );
}

export default Primarybutton;
