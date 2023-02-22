import Pocketbase from "pocketbase";
import { getFields } from "./fieldBase";

const MONTH_MAP = new Map<number, string>([
  [0, "январь"],
  [1, "февраль"],
  [2, "март"],
  [3, "апрель"],
  [4, "май"],
  [5, "июнь"],
  [6, "июль"],
  [7, "август"],
  [8, "сентябрь"],
  [9, "октябрь"],
  [10, "ноябрь"],
  [11, "декабрь"],
]);

type userBaseType = {
  userName: string;
  password: string;
  role: string;
  label: string;
}[];

type SecretBaseType = {
  secret: string;
  userName: string;
  role: string;
  label: string;
};

const pb = new Pocketbase("http://127.0.0.1:8090");

async function getAuthData() {
  const authData = await pb.admins.authWithPassword(
    process.env.PB_EMAIL!,
    process.env.PB_PASSWORD!
  );
}

//users
export async function getUserPB() {
  await getAuthData();
  try {
    const PBusers = await pb.collection("usersPocketBase").getFullList(200, {
      sort: "-created",
    });
    return PBusers.map((doc) => {
      return {
        userName: doc.userName,
        password: doc.password,
        role: doc.role,
        label: doc.label,
      };
    });
  } catch (error) {
    return error;
  }
}

//cookies
async function getCookies() {
  await getAuthData();
  const PBsecrets = await pb.collection("secretBase").getFullList(200, {
    sort: "-created",
  });
  return PBsecrets;
}

export async function addPBSecret({
  secret,
  userName,
  role,
  label,
}: SecretBaseType) {
  await getAuthData();
  const data = {
    secret,
    userName,
    role,
    label,
  };
  const record = await pb.collection("secretBase").create(data);
}

export async function deletePBSecret(secret: string) {
  const PBsecrets = await getCookies();
  const PBsecret = PBsecrets.find((doc) => doc.secret === secret);
  if (PBsecret) await pb.collection("secretBase").delete(PBsecret.id);
}

export async function checkPBUser(secret: string) {
  const PBsecrets = await getCookies();
  const authorisedUser = PBsecrets.find((doc) => doc.secret === secret);
  return authorisedUser;
}

//fieldBase
// export async function setFieldBaseFromJSON() {
//   const fieldsJSON = getFields();
//   console.log("fields", fieldsJSON);
//   fieldsJSON.forEach((field) => pb.collection("fieldBase").create(field));
//   //   await pb.collection("fieldBase").create(fieldsJSON);
//}

// function getLDBFieldBase() {
//   return getFields();
// }

// export async function setAllFieldBase() {
//   const LDBFields = getLDBFieldBase();
//   for (let item of LDBFields) {
//     const data = { field: item };
//     console.log("type", typeof item);
//     const record = await pb.collection("oilFieldBase").create(data);
//   }
// }

export async function getPBfields() {
  await getAuthData();
  const oilFields = await pb.collection("oilFieldBase").getFullList(200, {
    sort: "-created",
  });
  const fields = oilFields.map((doc) => doc.field).reverse();
  return fields;
}

export async function addPBField(field: string) {
  const fields = await getPBfields();
  const confirmation = fields.find((fieldItem) => fieldItem === field);
  if (!confirmation) {
    const data = { field };
    const record = await pb.collection("oilFieldBase").create(data);
    return record;
  } else {
    return false;
  }
}

//main dataBase
const readDB = async () => {
  const months = await pb.collection("monthsBase").getFullList(200, {
    sort: "-created",
  });
  const ops = await pb.collection("opsBase").getFullList(200, {
    sort: "-created",
  });
  const results = await pb.collection("resultBase").getFullList(200, {
    sort: "-created",
  });
  return { months, ops, results };
};

export async function getPBMain() {
  const { months, ops, results } = await readDB();
  const yearsSet = new Set(months.map((monthItem) => monthItem.year));
  const dbObject: { year: number; months: any[] }[] = [...yearsSet]
    .sort((a: number, b: number) => {
      return a - b;
    })
    .map((yearItem) => {
      return { year: yearItem, months: [] };
    });

  months.forEach((monthItem) => {
    dbObject.forEach((yearItem) => {
      if (yearItem.year === monthItem.year) {
        yearItem.months.push({
          year: monthItem.year,
          month: monthItem.month,
          wishfullAverageLength: monthItem.wishfullAverageLength,
          planOps: monthItem.planOps,
          ops: [],
        });
      }
    });
  });

  ops.forEach((opsItem) => {
    dbObject.forEach((yearItem) => {
      yearItem.months.forEach((monthItem) => {
        if (
          monthItem.month ===
            MONTH_MAP.get(
              Number(opsItem.startDate.split(".")[1].slice(-1) - 1)
            ) &&
          monthItem.year === Number(opsItem.startDate.split(".")[2])
        ) {
          monthItem.ops.push({
            startDate: opsItem.startDate,
            department: opsItem.department,
            number: opsItem.number,
            field: opsItem.field,
            duration: opsItem.duration,
            result: [],
          });
        }
      });
    });
  });

  results.forEach((resultItem) => {
    dbObject.forEach((yearItem) => {
      yearItem.months.forEach((monthItem) => {
        monthItem.ops.forEach((opsItem: any) => {
          if (
            `${opsItem.startDate} ${opsItem.number} ${opsItem.field}` ===
            resultItem.index
          ) {
            opsItem.result.push({
              dateTime: resultItem.dateTime,
              isFinal: resultItem.isFinal,
              debitMass: resultItem.debitMass,
              density: resultItem.density,
              watterRate: resultItem.watterRate,
              index: resultItem.index,
            });
          }
        });
      });
    });
  });

  return dbObject;
}

export async function addPBMonth(
  month: string,
  wishfullAverageLength: number,
  planOps: number,
  year: number
) {
  const data = {
    month,
    wishfullAverageLength,
    planOps,
    year,
  };
  const { months } = await readDB();
  const monthPresense = months.find((monthItem) => {
    return monthItem.year === year && monthItem.month === month;
  });
  if (monthPresense) {
    await pb.collection("monthsBase").update(monthPresense.id, data);
  } else {
    await pb.collection("monthsBase").create(data);
  }
}

export async function addPBRecord({
  startDay,
  startMonth,
  startYear,
  day,
  month,
  year,
  hours,
  minutes,
  number,
  field,
  department,
  debitMass,
  density,
  watterRate,
  isFinal,
  duration,
  planOps,
  wishfullAverageLength,
}: {
  startDay: number;
  startMonth: string;
  startYear: number;
  day: number;
  month: string;
  year: number;
  hours: string;
  minutes: string;
  number: string;
  field: string;
  department: number;
  debitMass: number;
  density: number;
  watterRate: number;
  isFinal: boolean;
  duration?: number;
  planOps: number;
  wishfullAverageLength: number;
}) {
  const getMonthNumber = (monthString: string) => {
    const monthNumber = [...MONTH_MAP.keys()].find(
      (key) => MONTH_MAP.get(key) === monthString
    );
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
  const { months, ops, results } = await readDB();
  const newMonth = { month, wishfullAverageLength, planOps, year };
  const newOperation = {
    startDate: `${getProperTime(startDay.toString())}.${getMonthNumber(
      startMonth
    )}.${startYear}`,
    department,
    number,
    field,
    duration,
  };
  const newResult = {
    dateTime: `${getProperTime(day.toString())}.${getMonthNumber(
      month
    )}.${year} ${hours}:${minutes}`,
    isFinal,
    debitMass,
    density,
    watterRate,
    index: `${getProperTime(startDay.toString())}.${getMonthNumber(
      startMonth
    )}.${startYear} ${number} ${field}`,
  };

  const monthPresence = months.find((monthItem) => {
    return monthItem.year === Number(year) && monthItem.month === month;
  });
  //есть ли месяцГод
  if (monthPresence) {
    //месяцГод есть, ищем операцию
    const operationPresence = ops.find((operationItem) => {
      return (
        operationItem.startDate ===
          `${getProperTime(startDay.toString())}.${getMonthNumber(
            startMonth
          )}.${startYear}` &&
        operationItem.number === number &&
        operationItem.field === field
      );
    });
    if (operationPresence) {
      if (duration) {
        //если заполнено поле продолжительность, то обновляем найденную операцию
        await pb
          .collection("opsBase")
          .update(operationPresence.id, newOperation);
      }
      //операция есть, создаем результат
      await pb.collection("resultBase").create(newResult);
    } else {
      //нет операции, создаем операцию
      await pb.collection("opsBase").create(newOperation);
      //создаем результат
      await pb.collection("resultBase").create(newResult);
    }
  }
  //нет месяцаГода
  else {
    //заполнены ли поля planOps & wishfullAverageLength
    if (planOps && wishfullAverageLength) {
      //поля заполнены, создаем месяц
      await pb.collection("monthsBase").create(newMonth);
      //создаем операцию
      await pb.collection("opsBase").create(newOperation);
      //создаем результат
      await pb.collection("resultBase").create(newResult);
    } else {
      //поля не заполнены, возвращаем monthDoesNotExist
      const monthDoesNotExist = true;
      return monthDoesNotExist;
    }
  }
}

export async function DeletePBRecord({
  id,
  year,
  month,
  dateTime,
}: {
  id: string;
  year: number;
  month: string;
  dateTime?: string;
}) {
  const { months, ops, results } = await readDB();
  //если запрос на удаление результата
  if (dateTime) {
    //находим результат по датеВремени
    const resultPresence = results.find((resultItem) => {
      return resultItem.dateTime === dateTime;
    });
    if (resultPresence) {
      console.log("resultPresence", resultPresence);
      //результат найден, удаляем результат
      await pb.collection("resultBase").delete(resultPresence.id);
    }
    //снова вытягиваем базу
    const dataBase = await readDB();
    console.log("base again", dataBase);
    //проверяем есть ли еще операции с таким айди, то есть дата начала, номерб и месторождение
    const operationPresenceByResult = dataBase.results.find((resultItem) => {
      console.log(
        "searching empty",
        resultItem.index,
        id,
        resultItem.index === id
      );
      return resultItem.index === id;
    });
    console.log("operationPresenceByResult", operationPresenceByResult);
    if (!operationPresenceByResult) {
      //если не находим, ищем операцию, которая не имеет результатов, связанных с ней, по айди
      const emptyOperation = dataBase.ops.find((operationItem) => {
        return (
          `${operationItem.startDate} ${operationItem.number} ${operationItem.field}` ===
          id
        );
      });
      if (emptyOperation) {
        //если находим пустую операцию, удаляем
        await pb.collection("opsBase").delete(emptyOperation.id);
      }
    }
  }
  //если запрос на удаление всей операции
  else {
    //находим операцию
    console.log(
      "is operation found",
      ops.map((operation) => {
        return `${operation.startDate} ${operation.number} ${operation.field}`;
      })
    );
    const operationPresenceById = ops.find((operationItem) => {
      return (
        `${operationItem.startDate} ${operationItem.number} ${operationItem.field}` ===
        id
      );
    });
    if (operationPresenceById) {
      //если находим, удаляем операцию
      console.log("operation found", operationPresenceById);
      await pb.collection("opsBase").delete(operationPresenceById.id);
    }
    const resultPresenceByIndex = results.filter((resultItem) => {
      return resultItem.index === id;
    });
    for (let item of resultPresenceByIndex) {
      await pb.collection("resultBase").delete(item.id);
    }
  }
}
