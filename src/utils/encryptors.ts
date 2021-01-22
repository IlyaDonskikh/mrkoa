import * as bcrypt from 'bcrypt';

export function encryptBySimpleBcrypt({ value }: { value: string }) {
  const saltRounds = 10;
  const encryptedValue = bcrypt.hashSync(value, saltRounds);

  return encryptedValue;
}
