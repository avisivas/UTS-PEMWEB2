import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
    user: string | null;
    isAuthenticated: boolean;

    login: (nim: string) => void;

    logout: () => void;
};

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,

            login: (nim) =>
                set({
                    user: nim,
                    isAuthenticated: true,
                }),

            logout: () =>
                set({
                    user: null,
                    isAuthenticated: false,
                }),
        }),
        {
            name: "auth-storage",
        }
    )
);