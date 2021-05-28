import express from "express";
import path from "path";

const docsiteRoutes = express.Router();

const pathToDocSite = path.join(process.cwd(), "apidoc");

docsiteRoutes.use(["/docs", "/api-docs", "/documentation"], express.static(pathToDocSite));

export default docsiteRoutes;
