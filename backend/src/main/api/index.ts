import express from "express";
import helmet from "helmet";
import errorResponse from "../response/error-handler";
import inProduction from "../utility/in-production";
import RouteNotFound from "../utility/route-not-found";
import v1Routes from "../v1/router";
import logger from "morgan";

const apiRouter = express.Router();

if (!inProduction) apiRouter.use(logger("dev"));

// api.use(cors());
apiRouter.use(helmet());
apiRouter.use(express.json());

apiRouter.use("/v1", v1Routes);

apiRouter.use("/", RouteNotFound);

apiRouter.use(errorResponse);

export default apiRouter;
