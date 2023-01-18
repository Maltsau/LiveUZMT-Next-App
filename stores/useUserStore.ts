import { create } from "zustand";

type UserStoreType =
  | {
      user: { userName: string; role: string };
      setUser: (userName: string, role: string) => void;
    }
  | undefined;

export const useUserStore = create<UserStoreType>((set) => ({
  user: { userName: "", role: "" },
  setUser: (userName, role) => set(() => ({ user: { userName, role } })),
}));
