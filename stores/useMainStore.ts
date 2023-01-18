import { create } from "zustand";
import MONTH_MAP from "../services/monthMap";

type MainStoreType = {
  year: number;
  month: string;
  operation: string;
  setYear: (year: number) => void;
  setMonth: (month: string) => void;
  setOperation: (month: string) => void;
};

const now = new Date();

export const useMainStore = create<MainStoreType>((set) => ({
  year: now.getFullYear(),
  month: [...MONTH_MAP.values()][now.getMonth()],
  operation: "",
  setYear: (year) => set(() => ({ year })),
  setMonth: (month) => set(() => ({ month })),
  setOperation: (operation) => set(() => ({ operation })),
}));
