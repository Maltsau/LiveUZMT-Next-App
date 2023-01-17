import type { NextApiRequest, NextApiResponse } from "next";
import { searchField, getFields } from "../../dataBase/fieldBase";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<string[]>
) {
  //   if (req.method === "GET") res.status(200).json(searchField(req.body));
  if (req.method === "GET") res.status(200).json(getFields());
}
