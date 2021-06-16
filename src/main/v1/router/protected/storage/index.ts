import express from "express";
import Middleware from "../../../../middleware";
import V1Handler from "../../../handler";

const storageRouter = express.Router();

storageRouter.use(Middleware.SessionTokenAuthorization);

storageRouter.get("/get-user-dir", V1Handler.GetUserDir);
storageRouter.post("/save-file", V1Handler.SaveFile);
storageRouter.post("/get-file", V1Handler.GetFile);

export default storageRouter;
