import express from "express";
import Middleware from "../../../middleware";
import V1Handler from "../../handler";

const userRouter = express.Router();

userRouter.use(Middleware.SessionTokenAuthorization);

userRouter.post("/authenticate", V1Handler.AuthenticateWithSessionToken);
userRouter.delete("/delete-user", V1Handler.DeleteUser);

export default userRouter;
