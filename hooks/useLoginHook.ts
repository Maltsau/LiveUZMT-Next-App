import ky from "ky";
import { useMutation, useQueryClient } from "react-query";

export function useLogin({
  onSuccess,
  onError,
}: {
  onSuccess: (data: { userName: string; role: string }) => void;
  onError: () => void;
}) {
  return useMutation(
    "LOG_IN_REQUEST",
    ({ login, password }: { login: string; password: string }) => {
      return ky
        .post("/api/login2", {
          json: { login, password },
        })
        .json<{ userName: string; role: string }>();
    },
    {
      onSuccess: (data) => {
        onSuccess(data);
      },
      onError: () => {
        onError();
      },
    }
  );
}