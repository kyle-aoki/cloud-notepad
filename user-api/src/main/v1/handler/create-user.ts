import { Request, Response, NextFunction } from 'express';
import Logger, { Severity } from '../../log';
import sendResponse from '../../response-entity'
import { CreateUserResponse } from '../../response-entity/create-user-response';

const createUser = (req: Request, res: Response, next: NextFunction) => {

  Logger.warn('watch out...')

  sendResponse(res, CreateUserResponse);
};

export default createUser;
