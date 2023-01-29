import type { NextApiRequest, NextApiResponse } from "next";
import { getFields, addField } from "../../dataBase/fieldBase";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<string[] | { message: string }>
) {
  if (req.method === "GET") res.status(200).json(getFields());
  if (req.method === "POST") {
    const confirmation = addField(req.body.field);

    if (confirmation) {
      res.status(201).json({ message: "Field added" });
    } else {
      res.status(202).json({ message: "Field exists" });
    }
  }
}
