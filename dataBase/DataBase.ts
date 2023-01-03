import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";
import MONTH_MAP from "../services/monthMap";

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
            id?: string;
            date: string;
            department: number;
            number: string;
            field: string;
            duration?: number;
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

// db.read();
// db.data!.items.push({ name: "Test" });
// db.write();

export function getDataBase() {
  db.read();
  return db.data;
}

export function addRecord(
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
        return item.number === number && item.field === field;
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
          id: `${day}.${getMonthNumber(month)}.${year} ${number} ${field}`,
          date: `${day}.${getMonthNumber(month)}.${year}`,
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
            id: `${day}.${getMonthNumber(month)}.${year} ${number} ${field}`,
            date: `${day}.${getMonthNumber(month)}.${year}`,
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
              id: `${day}.${getMonthNumber(month)}.${year} ${number} ${field}`,
              date: `${day}.${getMonthNumber(month)}.${year}`,
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
