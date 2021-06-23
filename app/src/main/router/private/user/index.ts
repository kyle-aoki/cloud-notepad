import express from "express";
import Handler from "../../../handler";

const userRouter = express.Router();

userRouter.post("/authenticate", Handler.AuthenticateWithSessionToken);
userRouter.delete("/delete-user", Handler.DeleteUser);

export default userRouter;
