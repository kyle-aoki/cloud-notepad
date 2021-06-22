import express from "express";
import Middleware from "../../../middleware";
import Handler from "../../../handler";

const storageRouter = express.Router();

storageRouter.use(Middleware.SessionTokenAuthorization);

storageRouter.get("/get-user-dir", Handler.GetUserDir);
storageRouter.post("/save-file", Handler.SaveFile);
storageRouter.post("/get-file", Handler.GetFile);

export default storageRouter;
