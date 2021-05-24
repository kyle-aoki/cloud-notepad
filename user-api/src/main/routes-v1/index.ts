import express from 'express';
import createUser from '../controller-v1/create-user';
import requestSchemaMiddleware from '../middleware/request-schema-middleware-v1';

const baseRoutes = express.Router();

baseRoutes.use(requestSchemaMiddleware);

baseRoutes.post('/create-user', createUser);
baseRoutes.post('/log-in');

export default baseRoutes;
