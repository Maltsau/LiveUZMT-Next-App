import ky from "ky";
import { useQuery, UseQueryResult } from "react-query";

export function useDataBase({
  onError,
  onSuccess,
}: {
  onError?: (error: any) => void;
  onSuccess?: (data: any) => void;
}): UseQueryResult<any, any> {
  return useQuery("REQUEST_DATA_BASE", async () => {
    const res = await ky.get("/api/dataBaseApi");
    return await res.json();
  });
}
