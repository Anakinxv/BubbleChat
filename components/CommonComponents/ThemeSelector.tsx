"use client";

import React from "react";
import { useTheme } from "./ThemeProvider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function ThemeSelector() {
  const { themes, setTheme, currentTheme, mounted } = useTheme();

  if (!mounted) {
    return null;
  }

  return (
    <div className="w-48 absolute top-4 right-4 z-10">
      <Select
        value={currentTheme.id}
        onValueChange={(value) => setTheme(value)}
      >
        <SelectTrigger className="w-full bg-[var(--theme-surface)] border-[var(--theme-border)] text-[var(--theme-text)]">
          <SelectValue placeholder="Selecciona un tema" />
        </SelectTrigger>
        <SelectContent className="bg-[var(--theme-surface)] border-[var(--theme-border)]">
          {themes.map((theme) => (
            <SelectItem
              key={theme.id}
              value={theme.id}
              className="text-[var(--theme-text)] hover:bg-[var(--theme-background)]"
            >
              {theme.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default ThemeSelector;
