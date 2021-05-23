import chalk from "chalk";

const red = (str: string): string => {
  return chalk.bold.red(str);
};

export const logMissingNODE_ENV = () => {
  console.log(red("NODE_ENV missing from environment variables."));
};

export const logIncorrectNODE_ENV = () => {
  console.log(red('NODE_ENV must equal "dev", "stage", or "prod".'));
};

export const logMissingEnvFile = (envFileName: string, envFilePath: string) => {
  console.log(
    red(`Could not find env vars in  "${envFileName}" at path: "${envFilePath}".
  You must have "env.dev.json", "env.stage.json", or "env.prod.json" in "./env".`)
  );
};

export const logMissingRequiredEnvsFile = (envFileName: string, envFilePath: string) => {
  console.log(
    red(`Could not find required env vars in "${envFileName}" at path: "${envFilePath}".
  You must have "required-env.json" in "./env". It takes the form of an array of strings,
  the strings being the name of the env vars.`)
  );
};

export const logMissingRequiredEnvVariable = (requiredEnvVar: string, envFileName: string) => {
  console.log(
    red(`Environment Variable "${requiredEnvVar}" is missing from ${envFileName}.
  Ensure required-env.json does not have superfluous required variables.`)
  );
};
