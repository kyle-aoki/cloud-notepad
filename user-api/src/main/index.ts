import express from "express";
import logger from "morgan";
import loadEnvVars from "./env/load-env-vars";
import handleError from "./error-response/handler";
import baseRoutes from "./routes-v1";
import path from "path";

const app = express();

loadEnvVars();

if (process.env.NODE_ENV === "dev" || process.env.NODE_ENV === "stage") app.use(logger("dev"));

app.use(express.json());

const pathToDocSite = path.join(process.cwd(), "..", "user-api-doc-site", "build");
app.use(["/docs", "/api-docs", "/documentation"], express.static(pathToDocSite));

app.use(["/", "/v1"], baseRoutes);

app.use(handleError);

export default app;
