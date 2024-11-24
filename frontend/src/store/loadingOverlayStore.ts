import { create } from "zustand";

interface LoadingOverlayStore {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const useLoadingOverlay = create<LoadingOverlayStore>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
}));
