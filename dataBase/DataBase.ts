import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";
import MONTH_MAP from "../services/monthMap";
import { DataBaseType } from "../types/types";

const db = new LowSync(
  new JSONFileSync<DataBaseType>(
    "/home/dzmitry/Documents/Work/New/my-app/dataBase/dataBase.json"
  )
);

// db.read();
// db.data!.items.push({ name: "Test" });
// db.write();

export function getDataBase() {
  db.read();
  return db.data;
}

export function addRecord(
  startDay: number,
  startMonth: string,
  startYear: number,
  day: number,
  month: string,
  year: number,
  hours: string,
  minutes: string,
  number: string,
  field: string,
  department: number,
  debitMass: number,
  density: number,
  watterRate: number,
  isFinal: boolean,
  duration: number
) {
  const getMonthNumber = (monthString: string) => {
    const monthNumber = [...MONTH_MAP.keys()].find(
      (key) => MONTH_MAP.get(key) === monthString
    );
    console.log(monthString, monthNumber);
    if (monthNumber! > 9) {
      return String(monthNumber! + 1);
    } else {
      return `0${monthNumber! + 1}`;
    }
  };
  const getProperTime = (hoursMinutes: string) => {
    if (Number(hoursMinutes) > 9) {
      return hoursMinutes;
    } else {
      return `0${hoursMinutes}`;
    }
  };
  db.read();
  const requiredYear = db.data!.find((item) => {
    return item.year === year;
  });
  if (requiredYear) {
    const requiredMonth = requiredYear.months?.find((item) => {
      return item.month === month;
    });
    if (requiredMonth) {
      const requredOperation = requiredMonth.ops?.find((item) => {
        return (
          item.id ===
          `${startDay}.${getMonthNumber(
            startMonth
          )}.${startYear} ${number} ${field}`
        );
      });
      if (requredOperation) {
        requredOperation.result.push({
          isFinal,
          dateTime: `${day}.${getMonthNumber(month)}.${year} ${getProperTime(
            hours
          )}:${getProperTime(minutes)}`,
          debitMass: Number(debitMass),
          density: Number(density),
          watterRate: Number(watterRate),
        });
        db.write();
      } else {
        requiredMonth.ops.push({
          id: `${startDay}.${getMonthNumber(
            startMonth
          )}.${startYear} ${number} ${field}`,
          date: `${startDay}.${getMonthNumber(startMonth)}.${startYear}`,
          department,
          number,
          field,
          duration: duration ? Number(duration) : undefined,
          result: [
            {
              isFinal,
              dateTime: `${day}.${getMonthNumber(
                month
              )}.${year} ${getProperTime(hours)}:${getProperTime(minutes)}`,
              debitMass: Number(debitMass),
              density: Number(density),
              watterRate: Number(watterRate),
            },
          ],
        });
        db.write();
      }
    } else {
      requiredYear.months?.push({
        month,
        wishfullAverageLength: 19,
        planOps: 23,
        ops: [
          {
            id: `${startDay}.${getMonthNumber(
              startMonth
            )}.${startYear} ${number} ${field}`,
            date: `${startDay}.${getMonthNumber(startMonth)}.${startYear}`,
            department,
            number,
            field,
            duration: duration ? Number(duration) : undefined,
            result: [
              {
                isFinal,
                dateTime: `${day}.${getMonthNumber(
                  month
                )}.${year} ${getProperTime(hours)}:${getProperTime(minutes)}`,
                debitMass: Number(debitMass),
                density: Number(density),
                watterRate: Number(watterRate),
              },
            ],
          },
        ],
      });
      db.write();
    }
  } else {
    db.data!.push({
      year,
      months: [
        {
          month,
          wishfullAverageLength: 19,
          planOps: 23,
          ops: [
            {
              id: `${startDay}.${getMonthNumber(
                startMonth
              )}.${startYear} ${number} ${field}`,
              date: `${startDay}.${getMonthNumber(startMonth)}.${startYear}`,
              department,
              number,
              field,
              duration: duration ? duration : undefined,
              result: [
                {
                  isFinal,
                  dateTime: `${day}.${getMonthNumber(
                    month
                  )}.${year} ${getProperTime(hours)}:${getProperTime(minutes)}`,
                  debitMass: Number(debitMass),
                  density: Number(density),
                  watterRate: Number(watterRate),
                },
              ],
            },
          ],
        },
      ],
    });
    db.write();
  }
}

export function deleteRecord(id: string, year: number, month: string) {
  db.read();
  const requiredMonth = db
    .data!.find((yearItem) => yearItem.year === year)
    ?.months.find((monthItem) => monthItem.month === month)?.ops;
  const requiredOperationIndex = requiredMonth?.findIndex(
    (operationItem) => operationItem.id === id
  );
  requiredMonth?.splice(requiredOperationIndex!);
  db.write();
}
