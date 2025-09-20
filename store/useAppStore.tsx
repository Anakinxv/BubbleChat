import { create } from "zustand";
import { createAuthSlice, AuthStateInterface } from "./useAuthStore";

export const useAppStore = create<AuthStateInterface>((...a) => ({
  ...createAuthSlice(...a),
}));
