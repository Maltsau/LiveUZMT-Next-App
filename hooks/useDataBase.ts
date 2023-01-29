import ky from "ky";
import { useQuery, UseQueryResult } from "react-query";
import { useDataBaseStore } from "../stores/useDataBaseStore";
import { DataBaseType } from "../types/types";

export function useDataBase({
  onError,
  onSuccess,
}: {
  onError?: (error: any) => void;
  onSuccess?: (data: DataBaseType) => void;
}): UseQueryResult<DataBaseType> {
  const dataBase = useDataBaseStore();
  return useQuery(
    "REQUEST_DATA_BASE",
    async () => {
      const res = await ky.get("/api/dataBaseApi");
      return await res.json();
    },
    {
      onSuccess: (data) => {
        dataBase.setDataBase(data);
      },
    }
  );
}
