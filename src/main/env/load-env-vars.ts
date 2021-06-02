import path from "path";
import fs from "fs";
import EnvironmentVariableError from "./error-messages";
import chalk from "chalk";

enum ENV {
  dev = "dev",
  stage = "stage",
  prod = "prod",
}

const ENV_ARRAY = [ENV.dev, ENV.stage, ENV.prod];

export default function LOAD_ENV_VARS () {
  console.log(chalk.yellow("Loading Environment Variables..."));

  const NODE_ENV = process.env.NODE_ENV as ENV;
  if (!NODE_ENV) {
    EnvironmentVariableError.MISSING_NODE_ENV();
    return process.exit(1);
  }

  if (!ENV_ARRAY.includes(NODE_ENV)) {
    EnvironmentVariableError.INCORRECT_NODE_ENV();
    return process.exit(1);
  }

  const envFileName = `env.${NODE_ENV}.json`;
  const envFilePath = path.join(process.cwd(), "env", envFileName);

  let envJSON;
  try {
    const fileContents = fs.readFileSync(envFilePath, "utf-8");
    envJSON = JSON.parse(fileContents);
  } catch (error) {
    EnvironmentVariableError.MISSING_ENV_FILE(envFileName, envFilePath);
    process.exit(1);
  }

  const requiredEnvFileName = `required-env.json`;
  const requiredEnvFilePath = path.join(process.cwd(), "env", requiredEnvFileName);

  let requiredEnv;
  try {
    const fileContents = fs.readFileSync(requiredEnvFilePath, "utf-8");
    requiredEnv = JSON.parse(fileContents);
  } catch (error) {
    EnvironmentVariableError.MISSING_REQUIRED_ENV_FILE(envFileName, envFilePath);
    process.exit(1);
  }

  const presentEnvVars = Object.keys(envJSON);
  for (const requiredEnvVar of requiredEnv) {
    if (!presentEnvVars.includes(requiredEnvVar)) {
      EnvironmentVariableError.MISSING_REQUIRED_ENV_VARIABLE(requiredEnvVar, envFileName);
      process.exit(1);
    }
  }

  for (const envVar of Object.keys(envJSON)) {
    process.env[envVar] = envJSON[envVar];
  }

  console.log(chalk.green("Loaded Environment Variables..."));
};
