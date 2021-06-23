import express from "express";
import Middleware from "../../middleware";
import RouteNotFound from "../../utility/route-not-found";
import userRouter from "./user";

const privateRouter = express.Router();

privateRouter.use(Middleware.SessionTokenAuthorization);

privateRouter.use("/user", userRouter);

privateRouter.use("/", RouteNotFound);

export default privateRouter;
