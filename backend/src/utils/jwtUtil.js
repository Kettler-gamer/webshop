import Jwt from "jsonwebtoken";
import { readFileSync } from "fs";

const privateKey = readFileSync("secrets/private-key.pem");
const publicKey = readFileSync("secrets/public-key.pem");

function createToken(payload) {
  const token = Jwt.sign(payload, privateKey, { algorithm: "RS256" });

  return token;
}

function verifyToken(token) {
  const payload = Jwt.verify(token, publicKey);

  return payload;
}

export default { createToken, verifyToken };
