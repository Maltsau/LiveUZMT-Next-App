import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";
type UserBase = [{ userName: string; password: string; role: string }];

const db = new LowSync(
  new JSONFileSync<UserBase>(
    "/home/dzmitry/Documents/Work/New/my-app/dataBase/userBase.json"
  )
);

db.read();
// db.data ||= { posts: [] }

// db.data.posts.push({ title: 'lowdb' })

// db.write()

export default function getUserBase() {
  return db.data;
}
