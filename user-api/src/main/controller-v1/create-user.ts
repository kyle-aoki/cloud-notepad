import { Request, Response, NextFunction } from 'express';
import sendResponse from '../response-entity'
import { CreateUserResponse } from '../response-entity/create-user-response';

const createUser = (req: Request, res: Response, next: NextFunction) => {

  sendResponse(res, CreateUserResponse);
};

export default createUser;
