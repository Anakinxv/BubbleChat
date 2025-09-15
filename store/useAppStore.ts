import { create } from "zustand";
import { createAuthSlice, type AuthStateType } from "./useAuthStore";

export const useAppStore = create<AuthStateType>((...a) => ({
  ...createAuthSlice(...a),
}));
