import express from "express";
import Middleware from "../../middleware";
import RouteNotFound from "../../misc/route-not-found";
import V1Handler from "../handler";
import userRouter from "./user";

const v1Routes = express.Router();

// ---------------------------- Auth Middleware ----------------------------------------------------------------
v1Routes.use(Middleware.ApiKeyAuthentication);
v1Routes.use(Middleware.ValidateRequest);

v1Routes.post("/create-user", V1Handler.CreateUser);
v1Routes.post("/log-in", V1Handler.LogIn);
v1Routes.post("/does-user-exist", V1Handler.DoesUserExist);

v1Routes.use("/user", userRouter);

v1Routes.use("/", RouteNotFound);

export default v1Routes;
