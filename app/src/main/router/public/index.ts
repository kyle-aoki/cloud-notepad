import express from "express";
import Handler from "../../handler";

const publicRouter = express.Router();

publicRouter.post("/check-username", Handler.CheckUsername);
publicRouter.post("/create-user", Handler.CreateUser, Handler.LogIn);
publicRouter.post("/log-in", Handler.LogIn);

export default publicRouter;
