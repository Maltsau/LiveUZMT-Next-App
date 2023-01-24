import { create } from "zustand";
import { DataBaseType } from "../types/types";

type DataBaseStoreType = {
  dataBase: DataBaseType | [];
  //   getDataBase: (dataBase) => DataBaseType;
};

export const useDataBaseStore = create<DataBaseStoreType>((set) => ({
  dataBase: [],
  //   getDataBase: (dataBase) => set(() => ({ dataBase })),
}));
