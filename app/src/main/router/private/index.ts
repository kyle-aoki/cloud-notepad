import express from "express";
import Middleware from "../../middleware";
import RouteNotFound from "../../utility/route-not-found";
import fileRouter from "./file";
import userRouter from "./user";

const privateRouter = express.Router();

privateRouter.use(Middleware.SessionTokenAuthorization);

privateRouter.use("/user", userRouter);
privateRouter.use("/file", fileRouter);

privateRouter.use("/", RouteNotFound);

export default privateRouter;
