import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearTokens: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        accessToken: null,
        refreshToken: null,

        setTokens: (accessToken, refreshToken) => {
          set({ accessToken, refreshToken });
        },

        clearTokens: () => {
          set({ accessToken: null, refreshToken: null });
        },
      }),
      {
        name: "auth-storage",
      },
    ),
  ),
);
