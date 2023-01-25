import ky from "ky";
import { useMutation, UseMutationResult, useQueryClient } from "react-query";

type DeleteRequestType = {
  id: string;
  year: number;
  month: string | undefined;
  dateTime?: string;
};

export function useDeleteRecord() {
  const queryClient = useQueryClient();
  return useMutation(
    "DELETE_RECORD",
    async ({ id, year, month, dateTime }: DeleteRequestType) => {
      const res = await ky
        .delete("/api/dataBaseApi", {
          json: { id, year, month, dateTime },
        })
        .json<{ message: string }>();
      return res;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("REQUEST_DATA_BASE");
      },
    }
  );
}
