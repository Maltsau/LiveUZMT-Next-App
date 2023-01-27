import ky from "ky";
import { useMutation, UseMutationResult, useQueryClient } from "react-query";

type AddMonthRequestType = {
  year: number;
  month: string | undefined;
  planOps: number;
  wishfullAverageLength: number;
};

export function useAddMonth({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: () => void;
}) {
  const queryClient = useQueryClient();
  return useMutation(
    "ADD_MONTH",
    async ({
      year,
      month,
      planOps,
      wishfullAverageLength,
    }: AddMonthRequestType) => {
      const res = await ky
        .put("/api/dataBaseApi", {
          json: {
            year,
            month,
            planOps,
            wishfullAverageLength,
          },
        })
        .json<{ message: string }>();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["REQUEST_DATA_BASE"]);
        onSuccess();
      },
      onError: () => {
        onError();
      },
    }
  );
}
