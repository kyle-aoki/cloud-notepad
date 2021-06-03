import { Request, Response, NextFunction } from "express";
import sendResponse from "../../success-response";
import SuccessResponse from "../../success-response/class";
import Query from "../../sql/query";
import hashPassword from "../../crypto/hash-password";
import Validator from "../../validation";
import generatePassword from "../../crypto/generate-password";
import ErrorResponse from "../../error-response/class";

const maxPassGenAttempts = 5;

export default async function CreateUser(req: Request, res: Response, next: NextFunction) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  const firstNameLowercase = firstName.toLowerCase();
  const lastNameLowercase = lastName.toLowerCase();

  const username = `${firstNameLowercase}-${lastNameLowercase}`;

  Validator.validateUsername(username);

  let passGenAttempts = 0;
  let password;
  while (passGenAttempts < maxPassGenAttempts) {
    const candidatePassword = generatePassword();
    const hashedCandidatePassword = hashPassword(candidatePassword);
    const userExists = await Query.doesUserExist(username, hashedCandidatePassword);
    if (!userExists) {
      password = candidatePassword;
      break;
    }
    passGenAttempts += 1;
  }

  if (passGenAttempts >= maxPassGenAttempts || !password) throw ErrorResponse.FailedToCreateUser();

  const hashedPassword = hashPassword(password);
  await Query.createUser(username, hashedPassword);

  const payload = { username, password };
  sendResponse(res, SuccessResponse.UserCreatedResponse(), { ...payload });
}
