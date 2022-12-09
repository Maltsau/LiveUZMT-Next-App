import type { NextApiRequest, NextApiResponse } from "next";

type SecretBaseType = [{ secret: string; userName: string; role: string }?];
type ResponseType = object | string;

const SecretBase: SecretBaseType = [];

export function postSecret(secret: string, userName: string, role: string) {
  SecretBase.push({ secret, userName, role });
  console.log("Before", SecretBase);
}

export function checkUser(secret: string | undefined) {
  console.log("Check Base", secret, SecretBase);
  let user = SecretBase.find((element) => element?.secret === secret);
  console.log("Check User", user);
  return user;
}

export function deleteSecret(secret: string | undefined) {
  let position = SecretBase.findIndex((element) => element?.secret === secret);
  SecretBase.splice(position, 1);
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
      return res.status(401).json({ message: "Not logged in" });
    } else
      return (
        res
          // .status(200)
          // .setHeader(
          //   "Cache-Control",
          //   "no-cache, no-store, max-age=0, must-revalidate"
          // )
          .json({ message: JSON.stringify(checkUser(req.cookies.secret)) })
      );
  }
}
