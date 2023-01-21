import { create } from "zustand";
import { useMutation } from "react-query";
import ky from "ky";

type UserStoreType =
  | {
      user: { userName: string; role: string };
      setUser: (userName: string, role: string) => void;
      // getUser: (
      //   login: string,
      //   password: string
      // ) => { userName: string; role: string };
    }
  | undefined;

export const useUserStore = create<UserStoreType>((set) => ({
  user: { userName: "", role: "" },
  setUser: (userName, role) => set(() => ({ user: { userName, role } })),
  // getUser: async (login, password) => set(() => {}),
}));
