import type { NextApiRequest, NextApiResponse } from "next";
import {
  getSecretBase,
  deleteSecret,
  addSecret,
} from "../../dataBase/cookieBase";
import { addPBSecret, checkPBUser } from "../../dataBase/pocketbase";

type SecretBaseType =
  | [{ secret: string; userName: string; role: string; label: string }]
  | null;
type ResponseType = object | string;

// export async function postSecret(
//   secret: string,
//   userName: string,
//   role: string,
//   label: string
// ) {
//   await addPBSecret({ secret, userName, role, label });
//   addSecret(secret, userName, role, label);
//   const SecretBase: SecretBaseType = getSecretBase();
// }

export function checkUser(secret: string | undefined) {
  const SecretBase: SecretBaseType = getSecretBase();
  let user = SecretBase!.find((element) => element?.secret === secret);
  return user;
}

export function deleteSecretApi(secret: string | undefined) {
  deleteSecret(secret);
  const SecretBase: SecretBaseType = getSecretBase();
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    let authorisedUser;
    if (req.cookies.secret) {
      authorisedUser = await checkPBUser(req.cookies.secret);
    }
    if (authorisedUser) {
      // console.log("Check or not", authorisedUser);
      return res.status(200).json({
        userName: authorisedUser.userName,
        role: authorisedUser.role,
        label: authorisedUser.label,
      });
    } else return res.status(401).json({ message: "Not logged in" });

    // if (!checkUser(req.cookies.secret)) {
    //   return res.status(401).json({ message: "Not logged in" });
    // } else {
    //   console.log("Check or not", checkUser(req.cookies.secret));
    //   return res.status(200).json({
    //     userName: checkUser(req.cookies.secret)?.userName,
    //     role: checkUser(req.cookies.secret)?.role,
    //     label: checkUser(req.cookies.secret)?.label,
    //   });
    // }
  }
}
