import React, { ReactNode } from "react";
import { Button } from "../ui/button";

type VariantType =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";

type buttonProps = {
  id?: string;
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  variant?: VariantType;
};

function Primarybutton({
  id,
  children,
  onClick,
  disabled,
  className,
  variant = "default",
}: buttonProps) {
  return (
    <Button
      id={id}
      className={className}
      onClick={onClick}
      disabled={disabled}
      variant={variant}
    >
      {children}
    </Button>
  );
}

export default Primarybutton;
