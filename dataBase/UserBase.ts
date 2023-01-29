import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";
type UserBase = [
  { userName: string; password: string; role: string; label: string }
];

const db = new LowSync(
  new JSONFileSync<UserBase>(
    "/home/dzmitry/Documents/Work/New/my-app/dataBase/userBase.json"
  )
);

// db.data ||= { posts: [] }

// db.data.posts.push({ title: 'lowdb' })

// db.write()

export default function getUserBase() {
  db.read();
  return db.data;
}
