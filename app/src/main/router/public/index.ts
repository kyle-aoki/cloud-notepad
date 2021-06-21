import express from "express";
import V1Handler from "../../handler";

const publicRouter = express.Router();

publicRouter.post("/check-username", V1Handler.CheckUsername);
publicRouter.post("/create-user", V1Handler.CreateUser, V1Handler.LogIn);
publicRouter.post("/log-in", V1Handler.LogIn);

export default publicRouter;
