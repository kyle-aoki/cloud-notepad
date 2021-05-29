import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import fs from 'fs';
import path from 'path';

const swaggerJson = YAML.load(path.join(process.cwd(), 'swagger.yaml'));

const swaggerRouter = express.Router();

const options = {
  explorer: true,
}

swaggerRouter.use('/api-docs', swaggerUi.serve);
swaggerRouter.get('/api-docs', swaggerUi.setup(swaggerJson, options));

export default swaggerRouter;
