import express from "express";
import logger from "morgan";
import helmet from "helmet";
import errorHandler from "./error-response/error-handler";
import v1Routes from "./v1/router";
import ReactApp from "./static";
import inProduction from "./utility/in-production";

const app = express();

app.use("/", ReactApp);

if (!inProduction) app.use(logger("dev"));

// app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/v1", v1Routes);

app.use(errorHandler);

export default app;
