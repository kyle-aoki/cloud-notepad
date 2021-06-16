import express from "express";
import path from "path";

const reactAppBuildFolderPath = path.join(process.cwd(), "..", "ui", "build");
const ReactApp = express.static(reactAppBuildFolderPath);

export default ReactApp;
