import path from "path";
import fs from "fs";
import {
  logIncorrectNODE_ENV,
  logMissingEnvFile,
  logMissingNODE_ENV,
  logMissingRequiredEnvVariable,
  logMissingRequiredEnvsFile,
} from "./error-messages";
import chalk from "chalk";

enum ENV {
  dev = "dev",
  stage = "stage",
  prod = "prod",
}

const ENV_ARRAY = [ENV.dev, ENV.stage, ENV.prod];

const loadEnvVars = () => {
  const NODE_ENV = process.env.NODE_ENV as ENV;
  if (!NODE_ENV) {
    logMissingNODE_ENV();
    return process.exit(1);
  }

  if (!ENV_ARRAY.includes(NODE_ENV)) {
    logIncorrectNODE_ENV();
    return process.exit(1);
  }

  const envFileName = `env.${NODE_ENV}.json`;
  const envFilePath = path.join(process.cwd(), "env", envFileName);

  let envJSON;
  try {
    const fileContents = fs.readFileSync(envFilePath, "utf-8");
    envJSON = JSON.parse(fileContents);
  } catch (error) {
    logMissingEnvFile(envFileName, envFilePath);
    process.exit(1);
  }
  const requiredEnvFileName = `required-env.json`;
  const requiredEnvFilePath = path.join(process.cwd(), "env", requiredEnvFileName);

  let requiredEnv;
  try {
    const fileContents = fs.readFileSync(requiredEnvFilePath, "utf-8");
    requiredEnv = JSON.parse(fileContents);
  } catch (error) {
    logMissingRequiredEnvsFile(envFileName, envFilePath);
    process.exit(1);
  }

  const presentEnvVars = Object.keys(envJSON);
  for (const requiredEnvVar of requiredEnv) {
    if (!presentEnvVars.includes(requiredEnvVar)) {
      logMissingRequiredEnvVariable(requiredEnvVar, envFileName);
      process.exit(1);
    }
  }

  for (const envVar of Object.keys(envJSON)) {
    process.env[envVar] = envJSON[envVar];
  }

  console.log(chalk.green('Loaded Environment Variables...'));
};

export default loadEnvVars;
