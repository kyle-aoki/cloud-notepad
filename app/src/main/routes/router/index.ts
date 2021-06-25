import express from "express";
import Middleware from "../../middleware";
import RouteNotFound from "../../utility/route-not-found";
import fileRouter from "./file";
import userRouter from "./user";

const mainRouter = express.Router();

mainRouter.use(Middleware.ApiKeyAuthentication);

mainRouter.use("/user", userRouter);
mainRouter.use("/file", fileRouter);

mainRouter.use("/", RouteNotFound);

export default mainRouter;
