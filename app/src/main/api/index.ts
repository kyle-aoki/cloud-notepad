import express from "express";
import helmet from "helmet";
import errorResponse from "../response/error-handler";
import cookieParser from "cookie-parser";
import mainRouter from "../routes/router";
import { inDevelopment, inProduction, inStaging } from "../utility/environment";
import simulateDelay from "../utility/simulate-delay";
import HttpLogger from "../log/http-logger";
import reloadApp from '@cloud-notepad/reload-app';

const apiRouter = express.Router();

if (inDevelopment || inStaging) apiRouter.use(HttpLogger);
if (inDevelopment) apiRouter.use(simulateDelay);

if (inDevelopment || inStaging || inProduction) apiRouter.post('/reload', reloadApp);

apiRouter.use(helmet());
apiRouter.use(express.json());
apiRouter.use(cookieParser());

apiRouter.use("/", mainRouter);

apiRouter.use(errorResponse);

export default apiRouter;
