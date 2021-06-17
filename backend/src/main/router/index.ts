import express from "express";
import Middleware from "../middleware";
import RouteNotFound from "../utility/route-not-found";
import protectedRouter from "./protected";
import publicRouter from "./public";

const mainRouter = express.Router();

mainRouter.use(Middleware.ApiKeyAuthentication);

// Public Routes
mainRouter.use(publicRouter);

// Protected Routes
mainRouter.use("/protected", protectedRouter);

mainRouter.use("/", RouteNotFound);

export default mainRouter;
