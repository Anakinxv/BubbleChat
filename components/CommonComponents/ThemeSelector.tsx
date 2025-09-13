"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

export function ThemeSelector() {
  const { theme, setTheme } = useTheme(); // aquí viene directamente de next-themes
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Evita el renderizado hasta que el componente esté montado
  }
  return (
    <div className="w-48 absolute top-4 right-4 z-10">
      <Select value={theme} onValueChange={(value) => setTheme(value)}>
        <SelectTrigger className="w-full bg-[var(--theme-surface)] border-[var(--theme-border)] text-[var(--theme-text)]">
          <SelectValue placeholder="Selecciona un tema" />
        </SelectTrigger>
        <SelectContent className="bg-[var(--theme-surface)] border-[var(--theme-border)]">
          <SelectItem value="light">Light Mode</SelectItem>
          <SelectItem value="dark">Dark Mode</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
export default ThemeSelector;
