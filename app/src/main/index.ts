import express from "express";
import ReactApp from "./static";
import apiRouter from "./api";

const app = express();

app.use("/api", apiRouter);

app.use(ReactApp);

export default app;
