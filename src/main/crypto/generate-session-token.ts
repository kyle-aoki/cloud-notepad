import crypto from "crypto";
import ErrorResponse from "../error-response/class";
import Logger from "../log";

type SessionToken = string;

export default function generateSessionToken(): SessionToken {
  try {
    return crypto.randomBytes(64).toString("hex");
  } catch (error) {
    Logger.error('Error generating session token.', error);
    throw ErrorResponse.GenericError();
  }
}
