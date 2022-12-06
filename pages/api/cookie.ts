type SecretBaseType = string[];

const SecretBase: SecretBaseType = [];

export function postSecret(secret: string) {
  SecretBase.push(secret);
  console.log(SecretBase);
}

export function checkUser(secret: string) {
  return SecretBase.includes(secret);
}

export function deleteSecret(secret: string) {
  SecretBase.splice(SecretBase.indexOf(secret), 1);
}
