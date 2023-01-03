import type { NextApiRequest, NextApiResponse } from "next";
import { checkUser } from "./cookie";
import { addRecord, getDataBase } from "../../dataBase/DataBase";

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
    if (checkUser(req.cookies.secret)) {
      console.log(req.body);
      addRecord(
        req.body.day,
        req.body.month,
        req.body.year,
        req.body.hours,
        req.body.minutes,
        req.body.number,
        req.body.field,
        req.body.department,
        req.body.debitMass,
        req.body.density,
        req.body.watterRate,
        req.body.isFinal,
        req.body.duration
      );
      res.status(200).json({ message: "Record added" });
    } else {
      res.status(400).json({
        message: `Not allowed`,
      });
    }
  }
}
