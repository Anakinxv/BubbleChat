import { StateCreator } from "zustand";
import { registerService } from "@/services/auth-service";
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

  register: (data: {
    name: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => Promise<void>;
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

  register: async (data) => {
    set({
      isloading: true,
      error: null,
    });

    try {
      console.log("Sending registration data:", data);
      const response = await registerService(data);
      console.log("Registration successful:", response);
      set({ isloading: false });
    } catch (error: any) {
      // Extraer el mensaje de error específico del backend
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Error al registrar usuario";

      set({
        error: errorMessage,
        isloading: false,
      });

      console.error("Registration failed:", errorMessage);
      throw new Error(errorMessage); // Re-lanzar con mensaje específico
    }
  },
});
