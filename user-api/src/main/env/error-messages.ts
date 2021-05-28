import chalk from "chalk";

const PRINT_RED = (str: string) => {
  console.log(chalk.bold.red(str));
};

const MISSING_NODE_ENV = () => {
  PRINT_RED("NODE_ENV missing from environment variables.");
};

const INCORRECT_NODE_ENV = () => {
  PRINT_RED('NODE_ENV must equal "dev", "stage", or "prod".');
};

const MISSING_ENV_FILE = (envFileName: string, envFilePath: string) => {
  PRINT_RED(`Could not find env vars in  "${envFileName}" at path: "${envFilePath}".
  You must have "env.dev.json", "env.stage.json", or "env.prod.json" in "./env".`);
};

const MISSING_REQUIRED_ENV_FILE = (envFileName: string, envFilePath: string) => {
  PRINT_RED(`Could not find required env vars in "${envFileName}" at path: "${envFilePath}".
  You must have "required-env.json" in "./env". It takes the form of an array of strings,
  the strings being the name of the env vars.`);
};

const MISSING_REQUIRED_ENV_VARIABLE = (requiredEnvVar: string, envFileName: string) => {
  PRINT_RED(`Environment Variable "${requiredEnvVar}" is missing from ${envFileName}.
  Ensure required-env.json does not have superfluous required variables.`);
};

class EnvironmentVariableError {
  static MISSING_NODE_ENV = MISSING_NODE_ENV;
  static INCORRECT_NODE_ENV = INCORRECT_NODE_ENV;
  static MISSING_ENV_FILE = MISSING_ENV_FILE;
  static MISSING_REQUIRED_ENV_FILE = MISSING_REQUIRED_ENV_FILE;
  static MISSING_REQUIRED_ENV_VARIABLE = MISSING_REQUIRED_ENV_VARIABLE;
}

export default EnvironmentVariableError;
