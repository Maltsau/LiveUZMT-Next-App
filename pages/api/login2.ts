import type { NextApiRequest, NextApiResponse } from "next";
import { addSecret, deleteSecret } from "../../dataBase/cookieBase";
// import getUserBase from "../../dataBase/UserBase";
import { getUsers } from "../../dataBase/firebase";
import { DocumentData } from "firebase/firestore";

// const USER_DATA = getUserBase();
const users = getUsers();
let USER_FIREBASE: DocumentData[] = [];
users.then(
  (response) => {
    return (USER_FIREBASE = response);
  },
  (error) => {
    console.log(error);
  }
);

type UserRequestType = {
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
    const newUser: UserRequestType = req.body;
    const authorisedUser = USER_FIREBASE?.find(
      (userObj) =>
        newUser.login === userObj.userName &&
        newUser.password === userObj.password
    );
    console.log("Authorised", authorisedUser);
    console.log("Firebase", users);
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
