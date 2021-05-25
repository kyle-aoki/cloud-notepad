import express from "express";
import logger from "morgan";
import LOAD_ENV_VARS from "./env/load-env-vars";
import handleError from "./error-response/handler";
import v1Routes from "./routes-v1";
import path from "path";

const app = express();

LOAD_ENV_VARS();

if (process.env.NODE_ENV === "dev" || process.env.NODE_ENV === "stage") app.use(logger("dev"));

app.use(express.json());

const pathToDocSite = path.join(process.cwd(), "..", "user-api-doc-site", "build");
app.use(["/api-docs", "/documentation"], express.static(pathToDocSite));
app.use('/docs', (req, res, next) => res.redirect('/documentation'));

app.use("/v1", v1Routes);

app.use('/', (req, res, next) => {
  res.send("You've reached the User API. See '/documentation' for more info.")
});

app.use(handleError);

export default app;
