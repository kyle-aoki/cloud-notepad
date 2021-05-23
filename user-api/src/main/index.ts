import express from "express";
import loadEnvVars from "./env/load-env-vars";
import logger from "morgan";

const app = express();

loadEnvVars();

if (process.env.NODE_ENV === "dev" || process.env.NODE_ENV === "stage") app.use(logger("dev"));

app.get(["/", "/docs", "/api-docs", "/documentation"], (req, res, next) => {
  res.send("https://github.com/kyle-aoki/user-api-monorepo");
});

export default app;
