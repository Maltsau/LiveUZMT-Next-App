import { create } from "zustand";
import MONTH_MAP from "../services/monthMap";

type MainStoreType = {
  year: number;
  month: string;
  setYear: (year: number) => void;
  setMonth: (month: string) => void;
};

const now = new Date();

export const useMainStore = create<MainStoreType>((set) => ({
  year: now.getFullYear(),
  month: [...MONTH_MAP.values()][now.getMonth()],
  setYear: (year) => set(() => ({ year })),
  setMonth: (month) => set(() => ({ month })),
}));
