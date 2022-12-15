import type { NextApiRequest, NextApiResponse } from "next";
import { checkUser } from "./cookie";
import { getDataBase } from "../../dataBase/DataBase";

type ResponseType = Array<any> | { message?: string } | null;

let DataBase = getDataBase();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    res.status(200).json(DataBase);
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
