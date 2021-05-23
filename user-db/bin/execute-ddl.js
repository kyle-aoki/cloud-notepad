const fs = require("fs");
const path = require("path");

const { Client } = require("pg");
const chalk = require("chalk");

const getConfig = require("./obtain-config");
const { Console } = require("console");

async function Main() {
  let envJSON;
  try {
    envJSON = getConfig();
  } catch (ignored) {
    return;
  }

  const sqlConnectionConfig = {
    host: envJSON["user-db-host"],
    port: envJSON["user-db-port"],
    user: envJSON["user-db-username"],
    password: envJSON["user-db-password"],
  };

  const ddlDirPath = path.join(process.cwd(), "ddl");
  const ddlFiles = fs.readdirSync(ddlDirPath);

  const allDdl = [];
  for (let i = 1; i <= ddlFiles.length; i += 1) {
    const filePath = path.join(process.cwd(), "ddl", `ddl${i}.sql`);
    const fileText = fs.readFileSync(filePath, "utf-8");
    allDdl.push(fileText);
  }

  console.log(chalk.bold.blue("Attemping to connect to database..."));

  const sqlClient = new Client(sqlConnectionConfig);
  await sqlClient.connect();

  console.log("Connected to database.");
  console.log(chalk.bold.blue("Executing DDL..."));

  try {
    for (const ddl of allDdl) await sqlClient.query(ddl);
  } catch (error) {
    const errorFileName = "error.log";
    const output = fs.createWriteStream(path.join(process.cwd(), errorFileName));
    const errorLogger = new Console(output);
    errorLogger.log(error);

    console.log(chalk.bold.red(`Failed to execute DDL. Check ${errorFileName} for details on failure.`));
    return await sqlClient.end();
  }

  console.log(chalk.bold.green("Successfully executed DDL."));
  await sqlClient.end();
}

Main();
