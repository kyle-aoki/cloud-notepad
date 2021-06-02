import path from "path";
import fs from "fs";
import Logger from "../log";
import ini from "ini";

const dotenvTemplatePath = path.join(process.cwd(), "env", "DOTENV_TEMPLATE.txt");

export default function checkEnvVars() {
  if (!process.env.NODE_ENV) {
    Logger.error("Missing NODE_ENV environment variable.");
    process.exit(1);
  }

  let dotenvTemplate;
  try {
    dotenvTemplate = fs.readFileSync(dotenvTemplatePath, "utf-8");
  } catch (error) {
    Logger.error("Could not find or read DOTENV_TEMPLATE.txt in ./env");
    process.exit(1);
  }

  const templateEnvVars = ini.parse(dotenvTemplate);
  const envVarNames = Object.keys(templateEnvVars);

  for (const envVarName of envVarNames) {
    if (!process.env[envVarName]) {
      Logger.error(
        `Environment variable ${envVarName} is missing.
        Check your .env file and ensure it follows the format of ./env/DOTENV_TEMPLATE.txt.`
      );
      process.exit(1);
    }
  }
}
