import ky from "ky";
import { useQuery, UseQueryResult } from "react-query";
import { DataBaseType } from "../types/types";

export function useDataBase({
  onError,
  onSuccess,
}: {
  onError?: (error: any) => void;
  onSuccess?: (data: DataBaseType) => void;
}): UseQueryResult<DataBaseType> {
  return useQuery(
    "REQUEST_DATA_BASE",
    async () => {
      const res = await ky.get("/api/dataBaseApi");
      return await res.json();
    },
    { cacheTime: 0 }
  );
}
