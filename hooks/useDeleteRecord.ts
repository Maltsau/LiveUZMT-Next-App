import ky from "ky";
import { useMutation, UseMutationResult } from "react-query";

type DeleteRequestType = {
  id: string;
  year: number;
  month: string;
  dateTime?: string;
};

export function useDeleteRecord() {
  return useMutation(
    "DELETE_RECORD",
    async ({ id, year, month, dateTime }: DeleteRequestType) => {
      const res = await ky
        .delete("/api/dataBaseApi", {
          json: { id, year, month, dateTime },
        })
        .json<{ message: string }>();
      return res;
    }
  );
}
