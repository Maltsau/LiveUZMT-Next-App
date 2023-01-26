import type { NextApiRequest, NextApiResponse } from "next";
import { addSecret, deleteSecret } from "../../dataBase/cookieBase";
import getUserBase from "../../dataBase/UserBase";

const USER_DATA = getUserBase();

type UserDataType = {
  login: string;
  password: string;
};

type ResponseType = { userName: string; role: string } | { message: string };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "POST") {
    const newUser: UserDataType = req.body;
    const authorisedUser = USER_DATA?.find(
      (userObj) =>
        newUser.login === userObj.userName &&
        newUser.password === userObj.password
    );
    console.log("Authorised", authorisedUser);
    if (authorisedUser) {
      const secret = String(new Date().getDate() * Math.random());
      res.setHeader("Set-Cookie", `secret=${secret}`);
      addSecret(secret, authorisedUser.userName, authorisedUser.role);
      return res
        .status(200)
        .json({ userName: authorisedUser.userName, role: authorisedUser.role });
    } else if (newUser.login === "Tweenpipe" && newUser.password === "Fuch") {
      deleteSecret(req.cookies.secret);
      res.setHeader("Set-Cookie", `secret=deleted; Max-Age=0`);
      return res.status(201).json({ userName: "", role: "" });
    } else {
      return res.status(401).json({ message: "Not logged in" });
    }
  }
}
