import express from "express";
import V1Handler from "../../handler";

const publicRouter = express.Router();

publicRouter.post("/does-user-exist", V1Handler.DoesUserExist);
publicRouter.post("/create-user", V1Handler.CreateUser);
publicRouter.post("/log-in", V1Handler.LogIn);

export default publicRouter;
