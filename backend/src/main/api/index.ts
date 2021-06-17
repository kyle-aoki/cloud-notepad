import express from "express";
import helmet from "helmet";
import errorResponse from "../response/error-handler";
import cookieParser from "cookie-parser";
import mainRouter from "../router";
import logger from "morgan";
import cors from "cors";
import { inDevelopment, inStaging } from "../utility/environment";

const apiRouter = express.Router();

if (inDevelopment || inStaging) apiRouter.use(logger("dev"));
if (inDevelopment) apiRouter.use(cors());

apiRouter.use(helmet());
apiRouter.use(express.json());
apiRouter.use(cookieParser());

apiRouter.use("/", mainRouter);

apiRouter.use(errorResponse);

export default apiRouter;
