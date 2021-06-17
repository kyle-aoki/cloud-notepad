import crypto from "crypto";
import Log from "../log";
import Err from "../response/err";

type SessionToken = string;

export default function generateSessionToken(): SessionToken {
  try {
    return crypto.randomBytes(64).toString("hex");
  } catch (error) {
    Log.error("Error generating session token.", error);
    throw Err.GenericError();
  }
}
