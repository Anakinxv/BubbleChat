import { StateCreator } from "zustand";

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
});
