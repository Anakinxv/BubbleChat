// hooks/useGlobalLoading.ts
import { useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";

export function useGlobalLoading(isLoading: boolean) {
  const setLoading = useAppStore((state) => state.setLoading);
  const currentLoading = useAppStore((state) => state.loading);

  useEffect(() => {
    if (typeof setLoading === "function" && currentLoading !== isLoading) {
      setLoading(isLoading);
    }
  }, [isLoading, setLoading, currentLoading]);
}
