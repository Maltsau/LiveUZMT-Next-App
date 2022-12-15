import type { NextApiRequest, NextApiResponse } from "next";
import {
  getSecretBase,
  deleteSecret,
  addSecret,
} from "../../dataBase/cookieBase";

type SecretBaseType =
  | [{ secret: string; userName: string; role: string }]
  | null;
type ResponseType = object | string;

export function postSecret(secret: string, userName: string, role: string) {
  addSecret(secret, userName, role);
  const SecretBase: SecretBaseType = getSecretBase();
  console.log("Before", SecretBase);
}

export function checkUser(secret: string | undefined) {
  const SecretBase: SecretBaseType = getSecretBase();
  console.log("Check Base", secret, SecretBase);
  getSecretBase();
  let user = SecretBase!.find((element) => element?.secret === secret);
  console.log("Check User", user);
  return user;
}

export function deleteSecretApi(secret: string | undefined) {
  deleteSecret(secret);
  const SecretBase: SecretBaseType = getSecretBase();
  console.log("After Delete", SecretBase);
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    console.log(req.cookies.secret);
    console.log("GET", checkUser(req.cookies.secret));
    if (!checkUser(req.cookies.secret)) {
      console.log("Check or not", checkUser(req.cookies.secret));
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
          .json(JSON.stringify(checkUser(req.cookies.secret)))
      );
    }
  }
}
