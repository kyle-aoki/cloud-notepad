import express from "express";
import RouteNotFound from "../../utility/route-not-found";
import fileRouter from "./file";
import userRouter from "./user";

const mainRouter = express.Router();

mainRouter.use("/user", userRouter);
mainRouter.use("/file", fileRouter);

mainRouter.use("/", RouteNotFound);

export default mainRouter;
