import express from 'express';
import apiKeyAuthenticationMiddleware from '../../middleware/api-key-authentication';
import requestSchemaMiddleware from '../../middleware/validate-payload';
import V1Handler from '../handler';

const v1Routes = express.Router();

// ---------------------------- Auth Middleware ----------------------------------------------------------------
v1Routes.use(apiKeyAuthenticationMiddleware);
v1Routes.use(requestSchemaMiddleware);

v1Routes.post('/create-user', V1Handler.createUser);
v1Routes.post('/log-in');

export default v1Routes;
