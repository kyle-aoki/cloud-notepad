import express from "express";
import logger from "morgan";
import loadEnvVars from "./env/load-env-vars";
import handleError from "./error-response/handler";
import baseRoutes from "./route";

const app = express();

loadEnvVars();

if (process.env.NODE_ENV === "dev" || process.env.NODE_ENV === "stage") app.use(logger("dev"));

app.use(express.json());

app.get(["/", "/docs", "/api-docs", "/documentation"], (req, res, next) => {
  res.send("https://github.com/kyle-aoki/user-api-monorepo");
});

app.use('/', baseRoutes);

app.use(handleError);

export default app;
