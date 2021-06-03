import express from "express";
import logger from "morgan";
import helmet from "helmet";
import errorHandler from "./error-response/error-handler";
import v1Routes from "./v1/route";
import welcome from "./misc/welcome";
import RouteNotFound from "./misc/route-not-found";
import swaggerRouter from "./swagger";
import cookieParser from "cookie-parser";

const app = express();

if (process.env.NODE_ENV === "dev" || process.env.NODE_ENV === "stage") {
  app.use(logger("dev"));
}

app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(swaggerRouter);

app.use(/\//, welcome);

app.use("/v1", v1Routes);

app.use("/", RouteNotFound);

app.use(errorHandler);

export default app;