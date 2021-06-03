import { ValidateFunction } from "ajv";
import ErrorResponse from "../../error-response/class";
import { Request } from 'express';

export type Validator = (req: Request) => void;

// Returns a function which uses a route's AJV-created validator function
const createValidatorFunction = (validator: ValidateFunction) => {
  const validate: Validator = (req: Request) => {
    if (!validator(req.body)) throw ErrorResponse.InvalidRequestPayload(req.url);
  }
  return validate;
}

export default createValidatorFunction;
