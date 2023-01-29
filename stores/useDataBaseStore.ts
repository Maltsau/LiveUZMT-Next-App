import { create } from "zustand";
import { DataBaseType } from "../types/types";

type DataBaseStoreType = {
  dataBase: DataBaseType | [];
  setDataBase: (dataBase: DataBaseType) => void;
};

export const useDataBaseStore = create<DataBaseStoreType>((set) => ({
  dataBase: [],
  setDataBase: (dataBase) => set(() => ({ dataBase })),
}));
