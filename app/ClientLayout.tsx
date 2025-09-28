"use client";
import { useAppStore } from "@/store/useAppStore";
import LoadingSpinner from "@/components/CommonComponents/LoadingSpinner";
import { useEffect, useState } from "react";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);
  const isLoading = useAppStore((state) => state.loading);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <>{children}</>;
  if (isLoading) return <LoadingSpinner />;

  return <>{children}</>;
};

ClientLayout.displayName = "ClientLayout";

export default ClientLayout;
