import { create } from "zustand";
import { useMutation } from "react-query";
import ky from "ky";

type LoginRequestType = { login: string; password: string };

type UserStoreType =
  | {
      user: { userName: string; role: string };
      setUser: (userName: string, role: string) => void;
      // getUser: ({ login, password }: LoginRequestType) => {
      //   userName: string;
      //   role: string;
      // };
    }
  | undefined;

export const useUserStore = create<UserStoreType>((set) => ({
  user: { userName: "", role: "" },
  setUser: (userName, role) => set(() => ({ user: { userName, role } })),
  // getUser: ({ login, password }: LoginRequestType) =>
  //   set(({ login, password }: LoginRequestType) => {
  //     {
  //       userName, role;
  //     }
  //   }),
}));
