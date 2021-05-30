// First to execute
import LOAD_ENV_VARS from "./env/load-env-vars";
LOAD_ENV_VARS();

import express from "express";
import logger from "morgan";
import helmet from 'helmet';
import errorHandler from "./error-response/error-handler";
import v1Routes from "./v1/route";
import apiKeyAuthenticationMiddleware from "./middleware/api-key-authentication";
import welcome from "./misc/welcome";
import routeNotFound from "./misc/route-not-found";
import swaggerRouter from "./swagger";

const app = express();

if (process.env.NODE_ENV === "dev" || process.env.NODE_ENV === "stage") {
  app.use(logger("dev"));
}

app.use(helmet());
app.use(express.json());
app.use(swaggerRouter);

app.use(/\//, welcome);

app.use("/v1", v1Routes);

app.use('/', routeNotFound);

app.use(errorHandler);

export default app;
