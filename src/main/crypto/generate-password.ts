import crypto from "crypto";
import ErrorResponse from "../error-response/class";
import Logger from "../log";
import addDashes from "./add-dashes";

type GeneratedPassword = string;

export default function generatePassword(): GeneratedPassword {
  try {
    const password = crypto.randomBytes(64).toString("hex");
    const passwordWithDashes = addDashes(password);
    return passwordWithDashes;
  } catch (error) {
    Logger.error('Error generating session password.', error);
    throw ErrorResponse.GenericError();
  }
}
