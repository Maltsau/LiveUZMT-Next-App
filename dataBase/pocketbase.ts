import Pocketbase from "pocketbase";

type userBaseType = {
  userName: string;
  password: string;
  role: string;
  label: string;
}[];

const pb = new Pocketbase("http://127.0.0.1:8090");

async function getAuthData() {
  const authData = await pb.admins.authWithPassword(
    process.env.PB_EMAIL!,
    process.env.PB_PASSWORD!
  );
}

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
