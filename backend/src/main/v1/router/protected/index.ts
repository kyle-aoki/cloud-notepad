import express from "express";
import Middleware from "../../../middleware";
import RouteNotFound from "../../../utility/route-not-found";
import storageRouter from "./storage";
import userRouter from "./user";

const protectedRouter = express.Router();

protectedRouter.use(Middleware.SessionTokenAuthorization);

protectedRouter.use("/user", userRouter);
protectedRouter.use("/storage", storageRouter);

protectedRouter.use("/", RouteNotFound);

export default protectedRouter;
