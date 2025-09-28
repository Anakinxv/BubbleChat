// hooks/useGlobalError.ts
import { useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";

export function useGlobalError(
  errors: (Error | string | null)[],
  resets: (() => void)[]
) {
  const setError = useAppStore((state) => state.setError);
  const currentError = useAppStore((state) => state.error);

  useEffect(() => {
    const foundError = errors.find((err) => err !== null);

    if (foundError) {
      const errorMessage =
        foundError instanceof Error
          ? foundError.message
          : typeof foundError === "string"
          ? foundError
          : "Ocurrió un error durante el proceso";

      if (currentError !== errorMessage) {
        setError(errorMessage);
      }

      const timer = setTimeout(() => {
        setError(null);
        resets.forEach((reset) => reset());
      }, 5000);

      return () => clearTimeout(timer);
    } else if (currentError !== null) {
      setError(null);
    }
  }, [errors, resets, setError, currentError]);
}
