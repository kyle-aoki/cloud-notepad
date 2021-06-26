import express from "express";
import FileHandler from "../handler/file";
import Middleware from "../../middleware";

const fileRouter = express.Router();

fileRouter.use(Middleware.SessionTokenAuthorization);
fileRouter.post("/create-file", FileHandler.CreateFile);
fileRouter.post("/get-file", FileHandler.GetFile);
fileRouter.post("/get-user-dir", FileHandler.GetUserDir);
fileRouter.post("/delete-file", FileHandler.DeleteFile);

export default fileRouter;
