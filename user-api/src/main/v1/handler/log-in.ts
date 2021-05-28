import { Request, Response, NextFunction } from 'express';

/**
 * @api {POST} /log-in Log In
 * @apiName Log In
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
 *       "message": "User successfully logged in."
 *     }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */
const logIn = (req: Request, res: Response, next: NextFunction) => {

};

export default logIn;
