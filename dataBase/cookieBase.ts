import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";

type SecretBase = [{ secret: string; userName: string; role: string }];

const secretBase = new LowSync(
  new JSONFileSync<SecretBase>(
    "/home/dzmitry/Documents/Work/New/my-app/dataBase/cookieBase.json"
  )
);

export function getSecretBase() {
  secretBase.read();
  return secretBase.data;
}

export function addSecret(secret: string, userName: string, role: string) {
  secretBase.read();
  secretBase.data!.push({ secret, userName, role });
  secretBase.write();
}

export function deleteSecret(secret: string | undefined) {
  secretBase.read();
  let position = secretBase.data!.findIndex(
    (element: any) => element?.secret === secret
  );
  secretBase.data!.splice(position, 1);
  secretBase.write();
}
