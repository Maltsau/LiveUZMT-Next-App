import Pocketbase from "pocketbase";
import { getFields } from "./fieldBase";

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
  // console.log("Added", record);
}

export async function deletePBSecret(secret: string) {
  const PBsecrets = await getCookies();
  const PBsecret = PBsecrets.find((doc) => doc.secret === secret);
  if (PBsecret) await pb.collection("secretBase").delete(PBsecret.id);
  // console.log("Deleted", PBsecret);
}

export async function checkPBUser(secret: string) {
  const PBsecrets = await getCookies();
  const authorisedUser = PBsecrets.find((doc) => doc.secret === secret);
  // console.log("Check", authorisedUser);
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
  // const fields = await pb.collection("fieldBase").getOne("czbx8e0cqinc2ss");
  const oilFields = await pb.collection("oilFieldBase").getFullList(200, {
    sort: "-created",
  });
  const fields = oilFields.map((doc) => doc.field).reverse();
  // console.log(
  //   "OilFields",
  //   oilFields.map((doc) => doc.field)
  // );
  return fields;
}

export async function addPBField(field: string) {
  const fields = await getPBfields();
  const confirmation = fields.find((fieldItem) => fieldItem === field);
  if (!confirmation) {
    console.log("does not exist");
    const data = { field };
    const record = await pb.collection("oilFieldBase").create(data);
    // var afterFields = fields.field1.push.field;
    // const toAdd = await pb
    //   .collection("fieldBase")
    //   .update("czbx8e0cqinc2ss", afterFields);
    // console.log("last", afterFields[afterFields.length - 1]);
    // console.log("toAdd", toAdd);
  } else {
    console.log("Field exists");
  }
}
