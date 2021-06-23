import express from "express";
import Middleware from "../middleware";
import RouteNotFound from "../utility/route-not-found";
import privateRouter from "./private";
import publicRouter from "./public";

const mainRouter = express.Router();

mainRouter.use(Middleware.ApiKeyAuthentication);

// Public Routes
mainRouter.use(publicRouter);

// Protected Routes
mainRouter.use("/private", privateRouter);

mainRouter.use("/", RouteNotFound);

export default mainRouter;
