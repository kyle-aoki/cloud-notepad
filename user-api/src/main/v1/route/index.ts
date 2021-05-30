import express from 'express';
import Middleware from '../../middleware';
import V1Handler from '../handler';
import userRouter from './user';

const v1Routes = express.Router();

// ---------------------------- Auth Middleware ----------------------------------------------------------------
v1Routes.use(Middleware.ApiKeyAuthentication);
v1Routes.use(Middleware.ValidateRequestSchema);

v1Routes.post('/create-user', V1Handler.createUser);
v1Routes.post('/log-in', V1Handler.logIn);

v1Routes.use('/user', userRouter);

export default v1Routes;
