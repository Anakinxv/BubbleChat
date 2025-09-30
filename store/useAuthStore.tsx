import { StateCreator } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  RegisterStepOneSchemaType,
  RegisterPasswordSchemaType,
} from "@/types/Auth.types";

export interface AuthStateInterface {
  user: {
    id: string;
    name: string;
    username: string;
    displayName: string;
    avatar: string | null;
    email: string;
    emailVerified: boolean | null;
    bio: string | null;
  };

  isloading: boolean;
  error: string | null;

  loginData: {
    email: string;
    password: string;
  };

  registerStepOneData: {
    name: string;
    lastName: string;
    email: string;
  };
  registerPasswordData: {
    password: string;
    confirmPassword: string;
  };

  verifyEmailData: {
    email: string;
    code: string;
  };

  setregisterStepOneData: (data: RegisterStepOneSchemaType) => void;
  setregisterPasswordData: (data: RegisterPasswordSchemaType) => void;
  setverifyEmailData: (data: { email: string; code: string }) => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
}

export const createAuthSlice: StateCreator<
  AuthStateInterface,
  [],
  [["zustand/persist", unknown]]
> = persist(
  (set, get) => {
    // Limpia el error después de 10 segundos
    const clearErrorAfterTimeout = () => {
      setTimeout(() => set({ error: null }), 10000);
    };

    return {
      user: {
        id: "",
        name: "",
        username: "",
        displayName: "",
        avatar: null,
        email: "",
        emailVerified: null,
        bio: null,
      },
      loginData: {
        email: "",
        password: "",
      },

      registerStepOneData: {
        name: "",
        lastName: "",
        email: "",
      },
      registerPasswordData: {
        password: "",
        confirmPassword: "",
      },

      error: null,
      isloading: false,

      verifyEmailData: {
        email: "",
        code: "",
      },

      setverifyEmailData: (data) => {
        set({ verifyEmailData: data });
      },
      setregisterStepOneData: (data) => {
        set({ registerStepOneData: data });
      },
      setregisterPasswordData: (data) => {
        set({ registerPasswordData: data });
      },
      setError: (error) => {
        set({ error });
        if (error) clearErrorAfterTimeout();
      },
      setLoading: (loading) => {
        set({ isloading: loading });
      },
    };
  },
  {
    name: "auth-storage",
    storage: createJSONStorage(() => sessionStorage),
  }
);
