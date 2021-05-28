import { Request, Response, NextFunction } from 'express';
import Logger, { Severity } from '../../log';
import sendResponse from '../../response-entity'
import { CreateUserResponse } from '../../response-entity/create-user-response';

/**
 * @api {POST} /create-user Create User
 * @apiName Create User
 * @apiGroup Base Routes
 *
 * @apiParam  {String} username The username of the new user.
 * @apiParam  {String} password The password of the new user.
 *
 * @apiSuccess {boolean} ok Whether or not the request was successful.
 * @apiSuccess {String} message Information about the success of the request.
 *
 * @apiSuccessExample Success-Response:
 *     200 OK
 *     {
 *       "ok": true,
 *       "message": "User creation successful."
 *     }
 *
 * @apiUse IncorrectApiKey
 * @apiUse MissingApiKey
 * @apiSampleRequest off
 */
const createUser = (req: Request, res: Response, next: NextFunction) => {

  Logger.warn('watch out...')

  sendResponse(res, CreateUserResponse);
};

export default createUser;
