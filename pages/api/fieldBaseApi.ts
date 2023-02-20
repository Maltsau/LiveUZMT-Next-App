import type { NextApiRequest, NextApiResponse } from "next";
import { getFields, addField } from "../../dataBase/fieldBase";
import { getPBfields, addPBField } from "../../dataBase/pocketbase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string[] | { message: string }>
) {
  if (req.method === "GET") {
    const fields = await getPBfields();
    res.status(200).json(fields);
  }
  if (req.method === "POST") {
    const confirmation = await addPBField(req.body.field);
    if (confirmation) {
      res.status(201).json({ message: "Field added" });
    } else {
      res.status(202).json({ message: "Field exists" });
    }
  }
}
