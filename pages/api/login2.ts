import type { NextApiRequest, NextApiResponse } from "next";
import { addSecret, deleteSecret } from "../../dataBase/cookieBase";
import getUserBase from "../../dataBase/UserBase";
import { getUserFireBase, getAllFireBase } from "../../dataBase/fireBase";

const USER_DATA = getUserBase();

type UserDataType = {
  login: string;
  password: string;
};

type ResponseType =
  | { userName: string; role: string; label: string }
  | { message: string };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "POST") {
    // console.log(
    //   "All Firebase",
    //   getAllFireBase()
    //     .then((res) => console.log("Promise", res.val()))
    //     .catch((err) => err)
    // );
    // console.log("Firebase", getUserFireBase());
    // getUserFireBase();
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
      addSecret(
        secret,
        authorisedUser.userName,
        authorisedUser.role,
        authorisedUser.label
      );
      return res.status(200).json({
        userName: authorisedUser.userName,
        role: authorisedUser.role,
        label: authorisedUser.label,
      });
    } else if (newUser.login === "Tweenpipe" && newUser.password === "Fuch") {
      deleteSecret(req.cookies.secret);
      res.setHeader("Set-Cookie", `secret=deleted; Max-Age=0`);
      return res.status(201).json({ userName: "", role: "", label: "" });
    } else {
      return res.status(401).json({ message: "Not logged in" });
    }
  }
}
