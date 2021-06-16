import { ValidateFunction } from "ajv";
import ErrorResponse from "../../error-response/class";
import { Request } from "express";
import { createUserSchema } from "./create-user";
import { DeleteUserSchema } from "./delete-user";
import { DoesUserExistSchema } from "./does-user-exist";
import { logInSchema } from "./log-in";

export type PayloadValidator = (req: Request) => void;

// Returns a function which uses a route's AJV-created validator function
const createPayloadValidator = (validator: ValidateFunction) => {
  const validate: PayloadValidator = (req: Request) => {
    if (!validator(req.body)) throw ErrorResponse.InvalidRequestPayload(req.originalUrl);
  };
  return validate;
};

export default createPayloadValidator;

const schemas = [createUserSchema, DeleteUserSchema, DoesUserExistSchema, logInSchema];
