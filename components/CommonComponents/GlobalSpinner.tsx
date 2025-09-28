"use client";

import React from "react";
import { useAppStore } from "@/store/useAppStore";
import LoadingSpinner from "./LoadingSpinner";

function GlobalSpinner() {
  const loading = useAppStore((state) => state.loading);

  if (!loading) return null;

  return <LoadingSpinner />;
}

export default GlobalSpinner;
