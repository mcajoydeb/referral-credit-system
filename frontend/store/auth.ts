// frontend/store/auth.ts
import { create } from "zustand";

type AuthState = {
  token: string | null;
  userId: string | null;
  referralCode: string | null;
  setAuth: (token: string | null, userId: string | null, referralCode: string | null) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  userId: null,
  referralCode: null,
  setAuth: (token, userId, referralCode) =>
    set({ token, userId, referralCode }),
  clearAuth: () => set({ token: null, userId: null, referralCode: null }),
}));
