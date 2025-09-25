import { StateCreator } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  RegisterStepOneSchemaType,
  RegisterPasswordSchemaType,
  OtpSchemaType,
} from "@/types/Auth.types";
import { sendAndSaveCode } from "@/app/actions/auth/confirmationEmail/sendAndSaveCode";

import { registerService } from "@/app/actions/auth/register";
import { verifyEmailCode } from "@/app/actions/auth/confirmationEmail/CodeVerification";

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

  setregister: (
    data: RegisterStepOneSchemaType & RegisterPasswordSchemaType
  ) => Promise<void>;

  setReSendCode: (data: {
    email: string;
    type: "verification" | "reset";
  }) => Promise<void>;

  setVerifyEmailCode: (data: { email: string; code: string }) => Promise<void>;
}

export const createAuthSlice: StateCreator<
  AuthStateInterface,
  [],
  [["zustand/persist", unknown]]
> = persist(
  (set, get) => {
    // Mueve la función fuera del objeto de estado
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

      setregisterStepOneData: (data) => {
        set({
          registerStepOneData: data,
        });
      },
      setregisterPasswordData: (data) => {
        set({ registerPasswordData: data });
      },

      setregister: async (data) => {
        set({ isloading: true, error: null });
        try {
          const response = await registerService(data);
          if (response.success) {
            try {
              const response = await sendAndSaveCode({
                email: data.email,
                type: "verification",
              });
              set({
                verifyEmailData: { email: data.email, code: "" },
              });
              if (response.error) {
                set({ error: response.error });
                clearErrorAfterTimeout();
              }
            } catch (error) {
              if (error instanceof Error) {
                set({ error: error.message });
              } else {
                set({ error: "Ocurrió un error desconocido" });
              }
              clearErrorAfterTimeout();
              console.error("Error en sendAndSaveCode:", error);
            }
          }
          if (response.error) {
            set({ error: response.error });
            clearErrorAfterTimeout();
          }
          set({ isloading: false });
        } catch (error) {
          if (error instanceof Error) {
            set({ error: error.message });
          } else {
            set({ error: "Ocurrió un error desconocido" });
          }
          set({ isloading: false });
          clearErrorAfterTimeout();
          console.error("Error en setregister:", error);
        }
      },

      setVerifyEmailCode: async (data) => {
        set({ isloading: true, error: null });
        console.log(data);
        try {
          const response = await verifyEmailCode({
            email: data.email,
            code: data.code,
            type: "verification",
          });
          if (response.success) {
            set({
              registerStepOneData: { name: "", lastName: "", email: "" },
              registerPasswordData: { password: "", confirmPassword: "" },
            });
            set({ verifyEmailData: { email: "", code: "" } });
          }
          if (response.error) {
            set({ error: response.error });
            clearErrorAfterTimeout();
          }
          set({ isloading: false });
        } catch (error) {
          if (error instanceof Error) {
            set({ error: error.message });
          } else {
            set({ error: "Ocurrió un error desconocido" });
          }
          set({ isloading: false });
          clearErrorAfterTimeout();
          console.error("Error en setVerifyEmailCode:", error);
        }
      },

      setReSendCode: async (data) => {
        set({ isloading: true, error: null });
        try {
          const response = await sendAndSaveCode({
            email: data.email,
            type: data.type,
          });
          if (response.error) {
            set({ error: response.error });
            clearErrorAfterTimeout();
          }
          set({ isloading: false });
        } catch (error) {
          if (error instanceof Error) {
            set({ error: error.message });
          } else {
            set({ error: "Ocurrió un error desconocido" });
          }
          set({ isloading: false });
          clearErrorAfterTimeout();
          console.error("Error en setReSendCode:", error);
        }
      },
    };
  },

  {
    name: "auth-storage",
    storage: createJSONStorage(() => sessionStorage),
  }
);
