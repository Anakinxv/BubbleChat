"use client";

import React from "react";
import { useValidEmail } from "@/hooks/auth/useValidEmail";
function Global() {
  const { data, isLoading } = useValidEmail("emmanuel032503@gmail.com");

  console.log(data?.valueOf(), isLoading);

  if (isLoading) return <div>Loading...</div>;

  return <div>Email is {data ? "valid" : "invalid"}</div>;
}

export default Global;
