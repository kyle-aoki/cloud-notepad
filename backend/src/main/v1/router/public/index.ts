import express from "express";
import Middleware from "../../../middleware";
import V1Handler from "../../handler";

const publicRouter = express.Router();

publicRouter.post("/create-user", V1Handler.CreateUser);
publicRouter.post("/log-in", V1Handler.LogIn);
publicRouter.post("/does-user-exist", V1Handler.DoesUserExist);

export default publicRouter;
