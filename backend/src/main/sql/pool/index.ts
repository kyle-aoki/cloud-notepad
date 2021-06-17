import { Pool, PoolConfig } from "pg";
import Log from "../../log";

const host = process.env.USER_DB_HOST;
const port = process.env.USER_DB_PORT;
const user = process.env.USER_DB_USERNAME;
const password = process.env.USER_DB_PASSWORD;

if (!(host && port && user && password)) {
  Log.error("One or more database environment variables are missing (host, port, user, password).");
  process.exit(1);
}

const portAsNumber = parseInt(port);
const poolConfig: PoolConfig = {
  host: host,
  port: portAsNumber,
  user: user,
  password: password,
};

const SQL = new Pool(poolConfig);

Log.info("Successfully created connection pool...");
export default SQL;
