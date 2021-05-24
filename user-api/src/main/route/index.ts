import express from 'express';
import createUser from '../controller-v1/create-user';

const baseRoutes = express.Router();

baseRoutes.post('/create-user', createUser);
baseRoutes.post('/log-in');

export default baseRoutes;
