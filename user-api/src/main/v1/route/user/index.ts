import express from 'express';
import Middleware from '../../../middleware';
import V1Handler from '../../handler';

const userRouter = express.Router();

userRouter.use(Middleware.SessionTokenAuthorization);

userRouter.get('/authenticate', V1Handler.authenticateWithSessionToken);

export default userRouter;
