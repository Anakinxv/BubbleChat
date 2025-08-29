import React from "react";

import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
} from "../ui/card";

type FormFormatProps = {
  className?: string;
  title: string;
  description?: string;
  accent?: string;
  children: React.ReactNode;
};

function FormFormat({
  title,
  description,
  accent,
  className,
  children,
}: FormFormatProps) {
  return (
    <Card
      className={`w-full max-w-lg bg-[var(--theme-background)] border-none shadow-none ${className}`}
    >
      <CardHeader className="flex flex-col items-center mb-4 w-full">
        <img
          id="logo"
          src="https://res.cloudinary.com/dy2wtanhl/image/upload/v1756175063/LogoBubble_aa2hml.png"
          alt="Logo"
          style={{ maxWidth: "100%", height: "auto" }}
          className="w-64 h-64 pointer-events-none "
        />
        <CardTitle
          id="title"
          className="flex flex-row items-baseline whitespace-nowrap text-5xl text-[var(--theme-text)]"
        >
          <span>{title}</span>
          <span className="ml-2 mixmatch text-[var(--theme-primary)]">
            <p>{accent}</p>
          </span>
        </CardTitle>

        {description && (
          <CardDescription
            id="description"
            className="text-[var(--theme-textSecondary)]"
          >
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="w-full">{children}</CardContent>
    </Card>
  );
}

export default FormFormat;
