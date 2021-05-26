// First to execute
import LOAD_ENV_VARS from "./env/load-env-vars";
LOAD_ENV_VARS();

import express from "express";
import logger from "morgan";
import errorHandler from "./error-response/error-handler";
import v1Routes from "./v1/route";
import apiKeyAuthenticationMiddleware from "./middleware/authentication-middleware";
import docsiteRoutes from "./docs";
import welcome from "./etc/welcome";
import routeNotFound from "./etc/route-not-found";

const app = express();

if (process.env.NODE_ENV === "dev" || process.env.NODE_ENV === "stage") {
  app.use(logger("dev"));
}

app.use(express.json());
app.use(docsiteRoutes);

app.use(/\//, welcome);

// ---------------------------- Auth Middleware ----------------------------------------------------------------
app.use(apiKeyAuthenticationMiddleware);

app.use("/v1", v1Routes);

app.use('/', routeNotFound);

app.use(errorHandler);

export default app;
