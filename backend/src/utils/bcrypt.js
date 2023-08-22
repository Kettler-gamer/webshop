import bcrypt from "bcrypt";

async function hashPassword(password) {
  const hash = await bcrypt.hash(password, Number(process.env.SALTROUNDS));
  return hash;
}

async function verifyPassword(password, hash) {
  const match = await bcrypt.compare(password, hash);

  return match;
}

export default { hashPassword, verifyPassword };
