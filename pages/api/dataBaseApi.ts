import type { NextApiRequest, NextApiResponse } from "next";
import { checkUser } from "./cookie";
import { getDataBase } from "../../dataBase/DataBase";

type ResponseType =
  | Array<any>
  | { message?: string }
  | null
  | { error?: string };

let DataBase = getDataBase();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    res.status(200).json(DataBase);
    res.status(500).json({ error: "Status 500" });
  } else if (req.method === "POST") {
    if (!checkUser(req.cookies.secret)) {
      res.status(403).json({ message: "Not allowed" });
    } else {
      res.status(200).json({
        message: `${checkUser(req.cookies.secret)} ${JSON.stringify(DataBase)}`,
      });
    }
  }
}
