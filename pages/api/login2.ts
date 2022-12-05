import type { NextApiRequest, NextApiResponse } from "next";

const DATA = [
  { username: "d.maltsev", password: "8604", role: "ADMIN" },
  { username: "p.chayka", password: "8424", role: "EDITOR" },
  { username: "v.fedyushko", password: "8425", role: "EDITOR" },
];

type UserDataType = {
  user: string;
  password: string;
};

type ResponseType = { user: string; role: string } | { message: string };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "POST") {
    const newUser: UserDataType = JSON.parse(req.body);
    const authorisedUser = DATA.find((userObj) => {
      newUser.user === userObj.username &&
        newUser.password === userObj.password;
    });
    if (authorisedUser) {
      return res
        .status(200)
        .json({ user: authorisedUser.username, role: authorisedUser.role });
    } else {
      return res.status(401).json({ message: "Not logged in" });
    }
  }
}
