import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";

type DataBaseType = [
  {
    year: number;
    months: [
      {
        month: string;
        wishfullAverageLength: number;
        planOps: number;
        ops: [
          {
            date: string;
            department: number;
            number: string;
            field: string;
            duration: number;
            result: [
              {
                isFinal: boolean;
                dateTime: string;
                debitMass: number;
                density: number;
                watterRate: number;
                files?: [string];
              }
            ];
          }
        ];
      }
    ];
  }
];

const db = new LowSync(
  new JSONFileSync<DataBaseType>(
    "/home/dzmitry/Documents/Work/New/my-app/dataBase/dataBase.json"
  )
);

db.read();
// db.data!.items.push({ name: "Test" });
db.write();

export function getDataBase() {
  return db.data;
}
