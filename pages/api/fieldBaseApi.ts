import type { NextApiRequest, NextApiResponse } from "next";
import { getFields, addField } from "../../dataBase/fieldBase";
import { getPBfields, addPBField } from "../../dataBase/pocketbase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string[] | { message: string }>
) {
  if (req.method === "GET") {
    const fields = await getPBfields();
    // console.log("Get Fields", fields);
    res.status(200).json(fields.field1);
  }
  if (req.method === "POST") {
    const confirmation = addField(req.body.field);
    const AfterFields = await addPBField(req.body.field);
    // console.log("After", AfterFields);
    if (confirmation) {
      res.status(201).json({ message: "Field added" });
    } else {
      res.status(202).json({ message: "Field exists" });
    }
  }
}
