import express from "express";
import UserHandler from "../handler/user";
import Middleware from "../../middleware";

const userRouter = express.Router();

userRouter.post("/check-username", UserHandler.CheckUsername);
userRouter.post("/create-user", UserHandler.CreateUser, UserHandler.LogIn);
userRouter.post("/log-in", UserHandler.LogIn);

userRouter.post("/authenticate", Middleware.SessionTokenAuthorization, UserHandler.AuthenticateWithSessionToken);
userRouter.delete("/delete-user", Middleware.SessionTokenAuthorization, UserHandler.DeleteUser);

export default userRouter;
