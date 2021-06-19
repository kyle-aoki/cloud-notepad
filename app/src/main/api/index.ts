import express from "express";
import helmet from "helmet";
import errorResponse from "../response/error-handler";
import cookieParser from "cookie-parser";
import mainRouter from "../router";
import logger from "morgan";
import { inDevelopment, inStaging } from "../utility/environment";
import simulateDelay from "../utility/simulate-delay";

const apiRouter = express.Router();

if (inDevelopment || inStaging) apiRouter.use(logger("dev"));
if (inDevelopment) apiRouter.use(simulateDelay);

apiRouter.use(helmet());
apiRouter.use(express.json());
apiRouter.use(cookieParser());

apiRouter.use("/", mainRouter);

apiRouter.use(errorResponse);

export default apiRouter;
