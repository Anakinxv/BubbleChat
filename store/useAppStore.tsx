import { create } from "zustand";
import { createAuthSlice, AuthStateInterface } from "./useAuthStore";
import { createUIGlobalSlice, UIGlobalState } from "./useUIGlobalStore";
export const useAppStore = create<AuthStateInterface & UIGlobalState>(
  (...a) => ({
    ...createAuthSlice(...a),
    ...createUIGlobalSlice(...a),
  })
);
