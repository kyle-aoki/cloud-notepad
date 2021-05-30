import sha256 from "crypto-js/sha256";
import Logger from "../log";

const salt = process.env.PASS_HASH_SALT;

if (!salt) {
  Logger.error("Password Hashing Salt environment variable missing.");
  process.exit(1);
}

export default function hashPassword(password: string) {
  const saltedPassword = salt + password;
  const hashDigest = sha256(saltedPassword);
  return hashDigest.toString();
}
