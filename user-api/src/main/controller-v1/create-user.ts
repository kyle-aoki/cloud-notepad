import { Request, Response, NextFunction } from 'express';
import ErrorResponse from '../error-response/error-response';
import createUserValidator from '../request-schema/create-user-request-schema';
import sendResponse from '../response-entity'
import { CreateUserResponse } from '../response-entity/create-user-response';

const createUser = (req: Request, res: Response, next: NextFunction) => {
  const payload = req.body;
  const payloadIsValid = createUserValidator(payload);
  if (!payloadIsValid) return next(ErrorResponse.InvalidRequestPayload(req.url));

  sendResponse(res, CreateUserResponse);
};

export default createUser;
