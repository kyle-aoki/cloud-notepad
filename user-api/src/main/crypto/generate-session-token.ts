import crypto from "crypto";

type SessionToken = string;

export default function generateSessionToken(): SessionToken {
  return crypto.randomBytes(64).toString("hex");
}
