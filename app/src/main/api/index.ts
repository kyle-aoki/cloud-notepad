import express from "express";
import helmet from "helmet";
import errorResponse from "../response/error-handler";
import cookieParser from "cookie-parser";
import mainRouter from "../routes/router";
import { inDevelopment, inStaging } from "../utility/environment";
import simulateDelay from "../utility/simulate-delay";
import HttpLogger from "../log/http-logger";

const apiRouter = express.Router();

if (inDevelopment || inStaging) apiRouter.use(HttpLogger);
if (inDevelopment) apiRouter.use(simulateDelay);

apiRouter.use(helmet());
apiRouter.use(express.json());
apiRouter.use(cookieParser());

apiRouter.use("/", mainRouter);

apiRouter.use(errorResponse);

export default apiRouter;
