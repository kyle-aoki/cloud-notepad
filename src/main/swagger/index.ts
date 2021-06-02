import express from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";

const swaggerJson = YAML.load(path.join(process.cwd(), "swagger.yaml"));

const swaggerRouter = express.Router();

const options = {};

swaggerRouter.use(["/docs", "/api-docs", "/documentation"], swaggerUi.serve);
swaggerRouter.get(["/docs", "/api-docs", "/documentation"], swaggerUi.setup(swaggerJson, options));

export default swaggerRouter;
