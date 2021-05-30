import chalk from "chalk";
import { Pool, PoolConfig } from "pg";
import Logger from "../../log";

console.log(chalk.yellow("Collecting Env Vars for connection pool..."));

const env = process.env;

const host = env.USER_DB_HOST;
const port = env.USER_DB_PORT;
const user = env.USER_DB_USERNAME;
const password = env.USER_DB_PASSWORD;

if (!(host && port && user && password)) {
  Logger.error("Environment variables are missing.");
  process.exit(1);
}

const portNum = parseInt(port);
const poolConfig: PoolConfig = { host: host, port: portNum, user: user, password: password };

const SQL = new Pool(poolConfig);

console.log(chalk.green("Successfully created connection pool..."));
export default SQL;
