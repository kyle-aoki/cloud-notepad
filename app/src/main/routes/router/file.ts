import express from "express";
import FileHandler from "../handler/file";
import { Middleware } from "../../middleware";

const fileRouter = express.Router();

fileRouter.use(Middleware.SessionTokenAuthorization);
fileRouter.post("/create-file", FileHandler.CreateFile);
fileRouter.post("/get-file", FileHandler.GetFile);
fileRouter.get("/get-user-dir", FileHandler.GetUserDir);
fileRouter.delete("/delete-file", FileHandler.DeleteFile);
fileRouter.patch("/save-file", FileHandler.SaveFile);

export default fileRouter;
