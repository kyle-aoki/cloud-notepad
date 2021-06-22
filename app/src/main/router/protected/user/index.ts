import express from "express";
import Middleware from "../../../middleware";
import Handler from "../../../handler";

const userRouter = express.Router();

userRouter.use(Middleware.SessionTokenAuthorization);

userRouter.post("/authenticate", Handler.AuthenticateWithSessionToken);
userRouter.delete("/delete-user", Handler.DeleteUser);

export default userRouter;
