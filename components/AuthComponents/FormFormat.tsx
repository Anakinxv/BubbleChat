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
  email?: string;
};

function FormFormat({
  title,
  email,
  description,
  accent,
  className,
  children,
}: FormFormatProps) {
  return (
    <Card
      className={`w-full max-w-xs sm:max-w-lg bg-[var(--theme-background)] border-none shadow-none px-4 py-6 sm:px-8 sm:py-10 ${className}`}
    >
      <CardHeader className="flex flex-col items-center mb-4 w-full">
        <img
          id="logo"
          src="https://res.cloudinary.com/dy2wtanhl/image/upload/v1756175063/LogoBubble_aa2hml.png"
          alt="Logo"
          style={{ maxWidth: "100%", height: "auto" }}
          className="w-32 h-32 sm:w-64 sm:h-64 pointer-events-none"
        />
        <CardTitle
          id="title"
          className="flex flex-row flex-wrap justify-center items-baseline whitespace-nowrap text-3xl sm:text-5xl text-[var(--theme-text)]"
        >
          <span>{title}</span>
          <span className="ml-2 mixmatch text-[var(--theme-primary)]">
            <p>{accent}</p>
          </span>
        </CardTitle>

        {description && (
          <CardDescription
            id="description"
            className="flex flex-row flex-wrap w-full justify-center items-baseline text-lg sm:text-xl text-[var(--theme-textSecondary)]"
          >
            <span className="text-center">{description}</span>
            {email && (
              <span className="ml-2 underline text-[var(--theme-primary)]">
                <p>{email}</p>
              </span>
            )}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="w-full">{children}</CardContent>
    </Card>
  );
}

export default FormFormat;
