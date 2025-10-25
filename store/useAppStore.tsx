import { create } from "zustand";
import { createAuthSlice, AuthStateInterface } from "./useAuthStore";
import { createUIGlobalSlice, UIGlobalState } from "./useUIGlobalStore";
import {
  createUserInfoConfigSlice,
  UserInfoConfigState,
} from "./UseUserInfoConfig";
export const useAppStore = create<
  AuthStateInterface & UIGlobalState & UserInfoConfigState
>((...a) => ({
  ...createAuthSlice(...a),
  ...createUIGlobalSlice(...a),
  ...createUserInfoConfigSlice(...a),
}));
