import express from "express";
import Middleware from "../../middleware";
import RouteNotFound from "../../utility/route-not-found";
import protectedRouter from "./protected";
import publicRouter from "./public";

const v1Routes = express.Router();

v1Routes.use(Middleware.ApiKeyAuthentication);

// Public Routes
v1Routes.use(publicRouter);

// Protected Routes
v1Routes.use("/protected", protectedRouter);

v1Routes.use("/", RouteNotFound);

export default v1Routes;
