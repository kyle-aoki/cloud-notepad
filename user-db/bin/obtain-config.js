const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

function getConfig() {
  const NODE_ENV = process.env.NODE_ENV;
  if (!NODE_ENV) {
    throw new Error(chalk.bold.red("Missing NODE_ENV, use npm scripts in package.json to execute bin js scripts."));
  }

  const envPath = path.join(process.cwd(), "env", `env.${NODE_ENV}.json`);

  let envJSON;
  try {
    const envConfig = fs.readFileSync(envPath, "utf-8");
    envJSON = JSON.parse(envConfig);
  } catch (ignored) {
    console.log(chalk.bold.red(`Missing or invalid "env.${NODE_ENV}.json" file.`));
    throw new Error();
  }

  let requiredEnvJSON;
  try {
    const requiredEnvPath = path.join(process.cwd(), "env", "required-env.json");
    const requiredEnvFile = fs.readFileSync(requiredEnvPath, "utf-8");
    requiredEnvJSON = JSON.parse(requiredEnvFile);
  } catch (ignored) {
    console.log(chalk.bold.red('Missing or invalid "required-env.json" file.'));
    throw new Error();
  }

  const presentEnvVars = Object.keys(envJSON);
  for (const requiredEnvVar of requiredEnvJSON) {
    if (!presentEnvVars.includes(requiredEnvVar)) {
      console.log(chalk.bold.red(`Missing environment variable "${requiredEnvVar}" from "env.${NODE_ENV}.json" file.`));
      throw new Error();
    }
  }

  return envJSON;
}

module.exports = getConfig;
