import * as bcrypt from 'bcrypt';

export async function hashCheck(string, hash) {
  const isMatch = await bcrypt.compare(string, hash);
  return isMatch;
}
