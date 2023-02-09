import type { NextApiRequest, NextApiResponse } from "next";
import { addSecret, deleteSecret } from "../../dataBase/cookieBase";
// import getUserBase from "../../dataBase/UserBase";
import { getUserFireBase, getAllFireBase } from "../../dataBase/fireBase";
import { DocumentData } from "firebase-admin/firestore";
import { getUserPB } from "../../dataBase/pocketbase";

// const USER_DATA = getUserBase();

// type userBaseType = {
//   userName: string;
//   password: string;
//   role: string;
//   label: string;
// }[];

type NewUserType = {
  login: string;
  password: string;
};

type ResponseType =
  | { userName: string; role: string; label: string }
  | { message: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "POST") {
    const PBusers: any = await getUserPB();
    console.log("PB", PBusers);
    // const usersFireBase: DocumentData = await getUserFireBase();
    // console.log("Login", usersFireBase);
    const newUser: NewUserType = req.body;
    const authorisedUser = PBusers?.find(
      (userObj: any) =>
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
