import sha256 from "crypto-js/sha256";
import Log from "../log";
import Err from "../response/err";

const salt = process.env.PASS_HASH_SALT;

if (!salt) {
  Log.error("Password Hashing Salt environment variable missing.");
  process.exit(1);
}

export default function hashPassword(password: string) {
  try {
    const saltedPassword = salt + password;
    const hashDigest = sha256(saltedPassword);
    return hashDigest.toString();
  } catch (error) {
    Log.error("Error hashing passwords.", error);
    throw Err.GenericError();
  }
}
