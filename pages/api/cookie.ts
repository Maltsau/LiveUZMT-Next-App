type SecretBaseType = [{ secret: string; role: string }?];

const SecretBase: SecretBaseType = [];

export function postSecret(secret: string, role: string) {
  SecretBase.push({ secret, role });
  console.log("Before", SecretBase);
}

export function checkUser(secret: string | undefined) {
  let user = SecretBase.find((element) => element?.secret === secret);
  if (user) return user.role;
  else return false;
}

export function deleteSecret(secret: string | undefined) {
  let position = SecretBase.findIndex((element) => element?.secret === secret);
  SecretBase.splice(position, 1);
  console.log("After", SecretBase);
}
