import express from "express";
import { Middleware } from "../../middleware";
import UserHandler from "../handler/user";

const userRouter = express.Router();

userRouter.post("/check-username", UserHandler.CheckUsername);
userRouter.post("/check-password", UserHandler.CheckPassword);
userRouter.post("/create-user", UserHandler.CreateUser, UserHandler.LogIn);
userRouter.post("/log-in", UserHandler.LogIn);

userRouter.post("/authenticate", Middleware.SessionTokenAuthorization, UserHandler.AuthenticateWithSessionToken);
userRouter.delete("/delete-user", Middleware.SessionTokenAuthorization, UserHandler.DeleteUser);

export default userRouter;
