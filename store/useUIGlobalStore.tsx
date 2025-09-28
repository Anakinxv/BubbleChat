import { StateCreator } from "zustand";

export interface UIGlobalState {
  loading: boolean;
  error: string | null;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  resetUI: () => void;
}

export const createUIGlobalSlice: StateCreator<UIGlobalState> = (set) => ({
  loading: false,
  error: null,
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  resetUI: () => set({ loading: false, error: null }),
});
