import Pocketbase from "pocketbase";

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
  console.log("Added", record);
}

export async function deletePBSecret(secret: string) {
  const PBsecrets = await getCookies();
  const PBsecret = PBsecrets.find((doc) => doc.secret === secret);
  if (PBsecret) await pb.collection("secretBase").delete(PBsecret.id);
  console.log("Deleted", PBsecret);
}

export async function checkPBUser(secret: string) {
  const PBsecrets = await getCookies();
  const authorisedUser = PBsecrets.find((doc) => doc.secret === secret);
  console.log("Check", authorisedUser);
  return authorisedUser;
}
