import express from "express";
import FileHandler from "../handler/file";
import Middleware from "../../middleware";

const fileRouter = express.Router();

fileRouter.post("/create-file", Middleware.SessionTokenAuthorization, FileHandler.CreateFile);
fileRouter.post("/get-file", Middleware.SessionTokenAuthorization, FileHandler.GetFile);

export default fileRouter;
