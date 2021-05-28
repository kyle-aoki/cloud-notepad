import express from 'express';
import createUser from '../handler/create-user';
import requestSchemaMiddleware from '../../middleware/validate-payload';

const v1Routes = express.Router();

v1Routes.use(requestSchemaMiddleware);

v1Routes.post('/create-user', createUser);
v1Routes.post('/log-in');

export default v1Routes;
