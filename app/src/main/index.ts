import express from "express";
import ReactApp from "./static";
import apiRouter from "./api";
import RouteNotFound from "./utility/route-not-found";

const app = express();

app.use("/api", apiRouter);

app.use(ReactApp);

export default app;
