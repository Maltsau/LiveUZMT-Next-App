import type { NextApiRequest, NextApiResponse } from "next";
import { checkUser } from "./cookie";
import {
  addRecord,
  deleteRecord,
  getDataBase,
  addMonth,
} from "../../dataBase/DataBase";
import { checkPBUser } from "../../dataBase/pocketbase";

type ResponseType =
  | Array<any>
  | { message?: string }
  | null
  | { error?: string };

let DataBase = getDataBase();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  let userConfirmation;
  if (req.cookies.secret) {
    userConfirmation = await checkPBUser(req.cookies.secret);
  }
  if (req.method === "GET") {
    res.status(200).json(getDataBase());
    res.status(500).json({ error: "Status 500" });
  } else if (req.method === "POST") {
    if (userConfirmation) {
      const dataBaseResponse = addRecord(
        req.body.startDay,
        req.body.startMonth,
        Number(req.body.startYear),
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
        req.body.duration,
        req.body.planOps,
        req.body.wishfullAverageLength
      );
      if (dataBaseResponse) {
        console.log("if does not", req.body);
        res.status(201).json({ message: "Month does not exist" });
      } else {
        res.status(200).json({ message: "Record added" });
      }
    } else {
      res.status(400).json({
        message: `Not allowed`,
      });
    }
  } else if (req.method === "DELETE" && userConfirmation) {
    if (req.cookies.secret)
      deleteRecord(
        req.body.id,
        req.body.year,
        req.body.month,
        req.body.dateTime
      );
    res.status(200).json({ message: "Deleted" });
  } else if (req.method === "PUT" && userConfirmation) {
    addMonth(
      req.body.year,
      req.body.month,
      req.body.planOps,
      req.body.wishfullAverageLength
    );
    res.status(200).json({ message: "Month added" });
  }
}
