import type { NextApiRequest, NextApiResponse } from "next";
import { postSecret } from "./cookie";

const USER_DATA = [
  { username: "d.maltsev", password: "8604", role: "ADMIN" },
  { username: "p.chayka", password: "8424", role: "EDITOR" },
  { username: "v.fedyushko", password: "8425", role: "EDITOR" },
];

const SecretBase = [];

type UserDataType = {
  login: string;
  password: string;
};

type ResponseType = { user: string; role: string } | { message: string };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "POST") {
    const newUser: UserDataType = req.body;
    console.log(newUser);
    console.log(newUser.login);
    console.log(newUser.password);
    USER_DATA.forEach((e) => console.log(e.username, e.password));
    const authorisedUser = USER_DATA.find(
      (userObj) =>
        newUser.login === userObj.username &&
        newUser.password === userObj.password
    );
    console.log(authorisedUser);
    if (authorisedUser) {
      const secret = String(new Date().getDate() * Math.random());
      res.setHeader("Set-Cookie", `secret=${secret}`);
      postSecret(secret);
      return res
        .status(200)
        .json({ user: authorisedUser.username, role: authorisedUser.role });
    } else {
      return res.status(401).json({ message: "Not logged in" });
    }
  }
}
