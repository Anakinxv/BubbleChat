import { StateCreator } from "zustand";

import type {
  RegisterStepOneSchemaType,
  RegisterPasswordSchemaType,
} from "@/types/Auth.types";

import { registerService } from "@/app/actions/auth/register";
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

  setregisterStepOneData: (data: RegisterStepOneSchemaType) => void;
  setregisterPasswordData: (data: RegisterPasswordSchemaType) => void;
  setregister: (
    data: RegisterStepOneSchemaType & RegisterPasswordSchemaType
  ) => Promise<void>;
}

export const createAuthSlice: StateCreator<AuthStateInterface> = (
  set,
  get
) => ({
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
      console.log(response);

      if (response.error) {
        set({ error: response.error });
      }
      set({ isloading: false });
    } catch (error) {
      if (error instanceof Error) {
        set({ error: error.message });
      } else {
        set({ error: "Ocurrió un error desconocido" });
      }
      set({ isloading: false });
      console.error("Error en setregister:", error);
    }
  },
});
