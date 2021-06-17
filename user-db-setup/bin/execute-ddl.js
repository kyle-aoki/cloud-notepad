const fs = require("fs");
const path = require("path");

const { Client } = require("pg");
const chalk = require("chalk");

const getConfig = require("../../obtain-config");
const { Console } = require("console");

async function Main() {
  const host = process.env.USER_DB_HOST;
  const port = process.env.USER_DB_PORT;
  const user = process.env.USER_DB_USERNAME;
  const password = process.env.USER_DB_PASSWORD;

  if (!(host && port && user && password)) {
    throw "Missing database environment variables.";
  }

  const portAsNumber = parseInt(port);

  const sqlConnectionConfig = {
    host: host,
    port: portAsNumber,
    user: user,
    password: password,
  };

  const ddlDirPath = path.join(process.cwd(), "ddl");
  const ddlFiles = fs.readdirSync(ddlDirPath);

  const allDdl = [];
  for (let i = 1; i <= ddlFiles.length; i += 1) {
    const filePath = path.join(process.cwd(), "ddl", `ddl${i}.sql`);
    const fileText = fs.readFileSync(filePath, "utf-8");
    allDdl.push(fileText);
  }

  console.log(chalk.blue("Attemping to connect to database..."));

  const sqlClient = new Client(sqlConnectionConfig);
  await sqlClient.connect();

  console.log("Connected to database.");
  console.log(chalk.blue("Executing DDL..."));

  try {
    for (const ddl of allDdl) await sqlClient.query(ddl);
  } catch (error) {
    writeToErrorLog(error);
    console.log(
      chalk.red(
        `Failed to execute DDL. Check ${errorFileName} for details on failure.`
      )
    );
    return await sqlClient.end();
  }

  console.log(chalk.green("Successfully executed DDL."));
  await sqlClient.end();
}

function writeToErrorLog(errorMessage) {
  const errorFileName = "error.log";
  const output = fs.createWriteStream(path.join(process.cwd(), errorFileName));
  const errorLogger = new Console(output);
  errorLogger.log(errorMessage);
}

Main();
