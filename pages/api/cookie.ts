import type { NextApiRequest, NextApiResponse } from "next";
import {
  getSecretBase,
  deleteSecret,
  addSecret,
} from "../../dataBase/cookieBase";

type SecretBaseType =
  | [{ secret: string; userName: string; role: string; label: string }]
  | null;
type ResponseType = object | string;

export function postSecret(
  secret: string,
  userName: string,
  role: string,
  label: string
) {
  addSecret(secret, userName, role, label);
  const SecretBase: SecretBaseType = getSecretBase();
}

export function checkUser(secret: string | undefined) {
  const SecretBase: SecretBaseType = getSecretBase();
  let user = SecretBase!.find((element) => element?.secret === secret);
  return user;
}

export function deleteSecretApi(secret: string | undefined) {
  deleteSecret(secret);
  const SecretBase: SecretBaseType = getSecretBase();
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    if (!checkUser(req.cookies.secret)) {
      return res.status(401).json({ message: "Not logged in" });
    } else {
      console.log("Check or not", checkUser(req.cookies.secret));
      return (
        res
          .status(200)
          // .setHeader(
          //   "Cache-Control",
          //   "no-cache, no-store, max-age=0, must-revalidate"
          // )
          .json({
            userName: checkUser(req.cookies.secret)?.userName,
            role: checkUser(req.cookies.secret)?.role,
            label: checkUser(req.cookies.secret)?.label,
          })
      );
    }
  }
}
