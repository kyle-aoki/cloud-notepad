import { Request, Response, NextFunction } from 'express';
import logger from '../log';
import { ErrorMessageObject } from './error-response';

export interface ErrorResponseEntity {
  ok: false;
  message: string;
}

const handleError = (error: ErrorMessageObject, req: Request, res: Response, next: NextFunction) => {
  const errorResponseEntity: ErrorResponseEntity = {
    ok: false,
    message: error.message,
  }

  if (error.serverMessage) {
    logger.log(error.serverMessage.severity, error.serverMessage.message);
  }

  if (error.statusCode) res.status(error.statusCode);
  res.send(errorResponseEntity);
};

export default handleError;
