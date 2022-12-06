import type { NextApiRequest, NextApiResponse } from "next";

// type LogInData = Map<string, string>

// const LOG_IN: LogInData = new Map([
//     ["d.maltsev", "8604"],
//     ["p.chayka", "8424"],
//     ["v.fedyushko", "8425"],
//   ]);

const LOG_IN: Array<any> = [
  ["d.maltsev", "8604"],
  ["p.chayka", "8424"],
  ["v.fedyushko", "8425"],
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  res.status(200).json(LOG_IN);
}
