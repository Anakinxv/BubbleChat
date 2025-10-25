import { StateCreator } from "zustand";

export interface UserInfoConfigState {
  userInfo: {
    profileURL: string;
    nombreCompleto: string;
    username: string;
    email: string;
    bio: string;
  };

  userChangePassword: {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  };

  setUserInfo: (data: {
    profileURL?: string;
    nombreCompleto?: string;
    username?: string;
    email?: string;
    bio?: string;
  }) => void;

  setUserChangePassword: (data: {
    currentPassword?: string;
    newPassword?: string;
    confirmNewPassword?: string;
  }) => void;
}

export const createUserInfoConfigSlice: StateCreator<
  UserInfoConfigState,
  [],
  [],
  UserInfoConfigState
> = (set) => ({
  userInfo: {
    profileURL: "",
    nombreCompleto: "",
    username: "",
    email: "",
    bio: "",
  },
  userChangePassword: {
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  },
  setUserInfo: (data) =>
    set((state) => ({
      userInfo: {
        ...state.userInfo,
        ...data,
      },
    })),
  setUserChangePassword: (data) =>
    set((state) => ({
      userChangePassword: {
        ...state.userChangePassword,
        ...data,
      },
    })),
});
