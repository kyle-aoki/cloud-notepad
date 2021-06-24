import express from "express";
import CreateFile from "../../../handler/file/create-file";

const fileRouter = express.Router();

fileRouter.use("/create-file", CreateFile);

export default fileRouter;
