import { create } from "zustand";

type AuthState = {
    token: string | null;
    setAuth: (token: string) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
    token: null,
    setAuth: (token) => set({ token })
}));