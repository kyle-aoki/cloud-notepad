import express from "express";
import helmet from "helmet";
import errorResponse from "../response/error-handler";
import cookieParser from "cookie-parser";
import v1Routes from "../router";
import logger from "morgan";
import cors from "cors";
import { inProduction, inStageOrProduction } from "../utility/environment";

const apiRouter = express.Router();

if (!inProduction) apiRouter.use(logger("dev"));
if (!inStageOrProduction) apiRouter.use(cors());

apiRouter.use(helmet());
apiRouter.use(express.json());
apiRouter.use(cookieParser());

apiRouter.use("/", v1Routes);

apiRouter.use(errorResponse);

export default apiRouter;
