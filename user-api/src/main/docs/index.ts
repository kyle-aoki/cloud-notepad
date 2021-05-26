import express from "express";
import path from "path";

const docsiteRoutes = express.Router();

const pathToDocSite = path.join(process.cwd(), "..", "user-api-doc-site", "build");

docsiteRoutes.use("/documentation", express.static(pathToDocSite));

docsiteRoutes.use(["/docs", "/api-docs"], (req, res, next) => res.redirect("/documentation"));

export default docsiteRoutes;
