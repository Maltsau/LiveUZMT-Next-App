import type { NextApiRequest, NextApiResponse } from "next";
import { checkUser } from "./cookie";
import {
  addRecord,
  deleteRecord,
  getDataBase,
  addMonth,
} from "../../dataBase/DataBase";

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
    res.status(200).json(getDataBase());
    res.status(500).json({ error: "Status 500" });
  } else if (req.method === "POST") {
    if (checkUser(req.cookies.secret)) {
      console.log(req.body);
      const dataBaseResponse = addRecord(
        req.body.startDay,
        req.body.startMonth,
        req.body.startYear,
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
        res.status(201).json({ message: "Month does not exist" });
      } else {
        res.status(200).json({ message: "Record added" });
      }
    } else {
      res.status(400).json({
        message: `Not allowed`,
      });
    }
  } else if (req.method === "DELETE" && checkUser(req.cookies.secret)) {
    console.log("DataBaseApi", req.body.dateTime);
    deleteRecord(req.body.id, req.body.year, req.body.month, req.body.dateTime);
    res.status(200).json({ message: "Deleted" });
  } else if (req.method === "PUT" && checkUser(req.cookies.secret)) {
    addMonth(
      req.body.year,
      req.body.month,
      req.body.planOps,
      req.body.wishfullAverageLength
    );
    res.status(200).json({ message: "Month added" });
  }
}
